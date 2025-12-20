'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  activo?: boolean;
}

export default function ClientesPage() {
  const { token, usuario } = useAuth();

  const esAdminOStaff =
    usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');

  // filtros
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<'todos' | 'activos' | 'inactivos'>('todos');

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/clientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Error al cargar clientes');

      const data = await res.json();
      setClientes(
        data.map((c: Cliente) => ({
          ...c,
          activo: c.activo ?? true,
        }))
      );
    } catch (err) {
      setError('Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) cargarClientes();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esAdminOStaff) return;

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

      if (!res.ok) throw new Error('Error al crear cliente');

      setNombre('');
      setEmail('');
      setTelefono('');
      setEmpresa('');

      cargarClientes();
    } catch (err) {
      setError('Error al crear cliente');
    }
  };

  const clientesFiltrados = clientes.filter((c) => {
    const coincideBusqueda =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.empresa.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      estadoFiltro === 'todos' ||
      (estadoFiltro === 'activos' && c.activo) ||
      (estadoFiltro === 'inactivos' && !c.activo);

    return coincideBusqueda && coincideEstado;
  });

  const exportarCSV = () => {
    const encabezados = ['Nombre', 'Empresa', 'Email', 'Teléfono', 'Estado'];

    const filas = clientesFiltrados.map((c) => [
      c.nombre,
      c.empresa,
      c.email,
      c.telefono,
      c.activo ? 'Activo' : 'Inactivo',
    ]);

    const csv = [encabezados, ...filas].map((f) => f.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'clientes_fjonic.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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

    cargarClientes();
  } catch (err) {
    alert('Error al eliminar cliente');
  }
};

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#0D3A66]">
        Gestión de Clientes
      </h1>

      {/* CREAR CLIENTE */}
      {esAdminOStaff && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow max-w-xl"
        >
          <h2 className="text-lg font-semibold text-[#0D3A66] mb-4">
            Crear nuevo cliente
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {error}
            </p>
          )}

          <input
            className="w-full border p-2 rounded mb-3 text-black"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded mb-3 text-black"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded mb-3 text-black"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <input
            className="w-full border p-2 rounded mb-4 text-black"
            placeholder="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />

          <button className="bg-[#0D3A66] text-white px-4 py-2 rounded hover:bg-[#175A8C]">
            Crear cliente
          </button>
        </form>
      )}

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          placeholder="Buscar por nombre o empresa..."
          className="border p-2 rounded w-full md:w-1/2 text-black"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="border p-2 rounded text-black"
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value as any)}
        >
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>

        <button
          onClick={exportarCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar CSV
        </button>
      </div>

      {/* LISTADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-600">Cargando clientes...</p>
        ) : clientesFiltrados.length === 0 ? (
          <p className="text-gray-600">No hay clientes</p>
        ) : (
          clientesFiltrados.map((c) => (
            <div
              key={c.id}
              className="bg-white p-5 rounded-2xl shadow border"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-[#0D3A66]">
                  {c.nombre}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    c.activo
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {c.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <p className="text-sm text-gray-800">
                <strong>Empresa:</strong> {c.empresa}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Email:</strong> {c.email}
              </p>
              <p className="text-sm text-gray-800">
                <strong>Tel:</strong> {c.telefono}
              </p>

{esAdminOStaff && (
  <div className="mt-4 flex gap-2">
    <button
      onClick={() =>
        setClientes((prev) =>
          prev.map((cl) =>
            cl.id === c.id
              ? { ...cl, activo: !cl.activo }
              : cl
          )
        )
      }
      className="text-sm px-3 py-1 border rounded hover:bg-gray-900"
    >
      {c.activo ? 'Desactivar' : 'Activar'}
    </button>

    <button
      onClick={() => eliminarCliente(c.id)}
      className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Eliminar
    </button>
  </div>
)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
