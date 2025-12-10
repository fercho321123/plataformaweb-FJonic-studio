'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

export default function ClientesPage() {
  const { token, usuario } = useAuth(); // ✅ AHORA USAMOS EL USUARIO

  const esAdminOStaff =
    usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');

  const cargarClientes = async () => {
    try {
      setError('');
      setLoading(true);

      const res = await fetch('http://localhost:3001/clientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      cargarClientes();
    }
  }, [token]);

  // ✅ SOLO ADMIN Y STAFF PUEDEN CREAR
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdminOStaff) return;

    setError('');

    try {
      const res = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          empresa,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al crear cliente');
      }

      setNombre('');
      setEmail('');
      setTelefono('');
      setEmpresa('');

      await cargarClientes();
    } catch (err: any) {
      console.error('ERROR REAL AL CREAR CLIENTE:', err);
      setError(err?.message || 'Error al crear cliente');
    }
  };

  // ✅ SOLO ADMIN Y STAFF PUEDEN ELIMINAR
  const eliminarCliente = async (id: string) => {
    if (!esAdminOStaff) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este cliente?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al eliminar cliente');
      }

      await cargarClientes();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar cliente');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Clientes</h1>

      {/* ✅ FORMULARIO SOLO PARA ADMIN Y STAFF */}
      {esAdminOStaff && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Crear nuevo cliente</h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <input
            className="w-full border p-2 rounded mb-4"
            placeholder="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Crear cliente
          </button>
        </form>
      )}

      {/* ✅ LISTADO (CLIENTE SOLO VE) */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Listado de clientes</h2>

        {loading ? (
          <p>Cargando clientes...</p>
        ) : clientes.length === 0 ? (
          <p>No hay clientes registrados</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Teléfono</th>
                <th className="border p-2">Empresa</th>

                {esAdminOStaff && (
                  <th className="border p-2">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="border p-2">{cliente.nombre}</td>
                  <td className="border p-2">{cliente.email}</td>
                  <td className="border p-2">{cliente.telefono}</td>
                  <td className="border p-2">{cliente.empresa}</td>

                  {esAdminOStaff && (
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => eliminarCliente(cliente.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
