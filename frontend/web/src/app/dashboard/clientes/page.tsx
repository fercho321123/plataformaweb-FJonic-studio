'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
}

export default function ClientesPage() {
  const { token, usuario } = useAuth();
  const esAdminOStaff =
    usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔍 búsqueda y filtros
  const [busqueda, setBusqueda] = useState('');
  const [empresaFiltro, setEmpresaFiltro] = useState('todas');

  // formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/clientes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setClientes(data);
    } catch {
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
        body: JSON.stringify({ nombre, email, telefono, empresa }),
      });

      if (!res.ok) throw new Error();

      setNombre('');
      setEmail('');
      setTelefono('');
      setEmpresa('');
      cargarClientes();
    } catch {
      setError('Error al crear cliente');
    }
  };

  const eliminarCliente = async (id: string) => {
    if (!confirm('¿Eliminar cliente?')) return;

    await fetch(`http://localhost:3001/clientes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    cargarClientes();
  };

  // 🧠 CLIENTES FILTRADOS
  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const texto = busqueda.toLowerCase();

      const coincideBusqueda =
        c.nombre.toLowerCase().includes(texto) ||
        c.email.toLowerCase().includes(texto) ||
        c.empresa.toLowerCase().includes(texto);

      const coincideEmpresa =
        empresaFiltro === 'todas' ||
        c.empresa === empresaFiltro;

      return coincideBusqueda && coincideEmpresa;
    });
  }, [clientes, busqueda, empresaFiltro]);

  const empresasUnicas = Array.from(
    new Set(clientes.map((c) => c.empresa))
  );

  return (
    <div className="space-y-10 text-gray-900">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#0D3A66]">
          Gestión de clientes
        </h1>
        <p className="text-gray-700">
          Busca, filtra y administra tus clientes
        </p>
      </div>

      {/* 🔍 BUSCADOR + FILTROS */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Buscar por nombre, empresa o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-3
                     text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <select
          value={empresaFiltro}
          onChange={(e) => setEmpresaFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="todas">Todas las empresas</option>
          {empresasUnicas.map((emp) => (
            <option key={emp} value={emp}>
              {emp}
            </option>
          ))}
        </select>
      </div>

      {/* FORMULARIO */}
      {esAdminOStaff && (
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl">
          <h2 className="font-semibold mb-4">
            Registrar nuevo cliente
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input"
              required
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="input"
              required
            />
            <input
              placeholder="Empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="input"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-[#0D3A66] text-white py-3 rounded-lg font-semibold hover:bg-[#175A8C]"
            >
              Crear cliente
            </button>
          </form>
        </div>
      )}

      {/* LISTADO */}
      {loading ? (
        <p>Cargando clientes...</p>
      ) : clientesFiltrados.length === 0 ? (
        <p className="text-gray-700">
          No se encontraron clientes con esos filtros
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clientesFiltrados.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold">{c.nombre}</h3>
                <p className="text-sm text-gray-700">{c.empresa}</p>
                <p className="text-sm">📧 {c.email}</p>
                <p className="text-sm">📞 {c.telefono}</p>
              </div>

              {esAdminOStaff && (
                <button
                  onClick={() => eliminarCliente(c.id)}
                  className="text-sm text-red-600 hover:underline mt-4 self-end"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
