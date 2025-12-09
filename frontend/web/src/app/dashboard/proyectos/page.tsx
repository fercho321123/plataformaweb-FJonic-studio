'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
}

interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'pendiente' | 'iniciado' | 'finalizado';
  fechaInicio: string;
  fechaFin?: string;
  cliente: {
    id: string;
    nombre: string;
  };
}


export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // FORMULARIO
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [clienteId, setClienteId] = useState('');

  // CARGAR PROYECTOS
  const cargarProyectos = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/proyectos');
      setProyectos(data);
    } catch {
      setError('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  // CARGAR CLIENTES
  const cargarClientes = async () => {
    try {
      const data = await apiFetch('/clientes');
      setClientes(data);
    } catch {
      console.error('Error al cargar clientes');
    }
  };

  useEffect(() => {
    cargarProyectos();
    cargarClientes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await apiFetch('/proyectos', {
        method: 'POST',
        body: JSON.stringify({
          nombre,
          descripcion,
          estado,
          fechaInicio: fechaInicio || null,
          fechaFin: fechaFin || null,
          clienteId,
        }),
      });

      setNombre('');
      setDescripcion('');
      setEstado('pendiente');
      setFechaInicio('');
      setFechaFin('');
      setClienteId('');

      await cargarProyectos();
    } catch {
      setError('Error al crear proyecto');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Proyectos</h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl"
      >
        <h2 className="text-lg font-semibold mb-4">Crear proyecto</h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 rounded mb-3"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="iniciado">Iniciado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded mb-3"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full border p-2 rounded mb-3"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

{/* SELECT DE CLIENTES (AUTOMÁTICO) */}
<label className="block text-sm font-medium mb-1">Cliente</label>
<select
  className="w-full border p-2 rounded mb-3"
  value={clienteId}
  onChange={(e) => setClienteId(e.target.value)}
  required
>
  <option value="">-- Selecciona un cliente --</option>
  {clientes.map((c) => (
    <option key={c.id} value={c.id}>
      {c.nombre} — {c.email} ({c.id.slice(0, 8)})
    </option>
  ))}
</select>


        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Crear Proyecto
        </button>
      </form>



      {/* LISTADO DE PROYECTOS */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Listado de Proyectos</h2>

        {loading ? (
          <p>Cargando proyectos...</p>
        ) : proyectos.length === 0 ? (
          <p>No hay proyectos registrados</p>
        ) : (
          <table className="w-full border text-sm">
            <thead>
  <tr className="bg-gray-100">
    <th className="border p-2">Proyecto</th>
    <th className="border p-2">Descripción</th>
    <th className="border p-2">Estado</th>
    <th className="border p-2">Inicio</th>
    <th className="border p-2">Fin</th>
    <th className="border p-2">Cliente</th>
  </tr>
</thead>

            <tbody>
              {proyectos.map((proyecto) => (
               <tr key={proyecto.id}>
  <td className="border p-2">{proyecto.nombre}</td>
  <td className="border p-2">{proyecto.descripcion}</td>
  <td className="border p-2 capitalize">{proyecto.estado}</td>
  <td className="border p-2">
    {proyecto.fechaInicio?.slice(0, 10)}
  </td>
  <td className="border p-2">
    {proyecto.fechaFin
      ? proyecto.fechaFin.slice(0, 10)
      : '—'}
  </td>
  <td className="border p-2">{proyecto.cliente?.nombre}</td>
</tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
