'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

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
  fechaInicio?: string;
  fechaFin?: string;
  cliente: {
    id: string;
    nombre: string;
  };
}

export default function ProyectosPage() {
  const { usuario } = useAuth();

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // CREAR
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] =
    useState<'pendiente' | 'iniciado' | 'finalizado'>('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [clienteId, setClienteId] = useState('');

  // EDITAR
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editClienteId, setEditClienteId] = useState('');

  const cargarProyectos = async () => {
    try {
      let data;

      if (usuario?.rol === 'cliente') {
        data = await apiFetch('/proyectos/mis-proyectos');
      } else {
        data = await apiFetch('/proyectos');
      }

      setProyectos(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    if (usuario?.rol === 'cliente') return;

    try {
      const data = await apiFetch('/clientes');
      setClientes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!usuario) return;
    cargarProyectos();
    cargarClientes();
  }, [usuario]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Proyectos</h1>

      {/* ==========================
          FORMULARIO CREAR
      ========================== */}
      {usuario?.rol !== 'cliente' && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');

            try {
              await apiFetch('/proyectos', {
                method: 'POST',
                body: JSON.stringify({
                  nombre,
                  descripcion,
                  estado,
                  fechaInicio,
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

              cargarProyectos();
            } catch {
              setError('Error al crear proyecto');
            }
          }}
          className="bg-white p-6 rounded mb-10 max-w-xl"
        >
          <h2 className="font-semibold mb-4">Crear Proyecto</h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
              {error}
            </p>
          )}

          <input
            className="w-full border p-2 mb-3"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 mb-3"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <select
            className="w-full border p-2 mb-3"
            value={estado}
            onChange={(e) =>
              setEstado(
                e.target.value as 'pendiente' | 'iniciado' | 'finalizado'
              )
            }
          >
            <option value="pendiente">Pendiente</option>
            <option value="iniciado">Iniciado</option>
            <option value="finalizado">Finalizado</option>
          </select>

          <input
            type="date"
            className="w-full border p-2 mb-3"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-2 mb-3"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />

          <select
            className="w-full border p-2 mb-4"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <button className="bg-black text-white px-4 py-2 rounded">
            Crear proyecto
          </button>
        </form>
      )}

      {/* ==========================
          LISTADO
      ========================== */}
      <div className="bg-white p-6 rounded">
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id}>
                <td>{proyecto.nombre}</td>
                <td>{proyecto.descripcion}</td>
                <td>{proyecto.estado}</td>
                <td>{proyecto.fechaInicio?.slice(0, 10)}</td>
                <td>{proyecto.fechaFin?.slice(0, 10) || '—'}</td>
                <td>{proyecto.cliente?.nombre}</td>

                <td className="space-y-2">
                  {/* 🔹 LINK A ACTUALIZACIONES */}
                  <Link
                    href={`/dashboard/proyectos/${proyecto.id}/actualizaciones`}
                    className="block text-blue-600 underline"
                  >
                    Ver actualizaciones
                  </Link>

                  {usuario?.rol !== 'cliente' && (
                    <button
                      onClick={() => {
                        setEditandoId(proyecto.id);
                        setEditNombre(proyecto.nombre);
                        setEditDescripcion(proyecto.descripcion);
                        setEditClienteId(proyecto.cliente.id);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>
                  )}

                  {usuario?.rol === 'admin' && (
                    <button
                      onClick={async () => {
                        if (!confirm('¿Eliminar proyecto?')) return;
                        await apiFetch(`/proyectos/${proyecto.id}`, {
                          method: 'DELETE',
                        });
                        cargarProyectos();
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className="mt-4">Cargando proyectos...</p>}
      </div>
    </div>
  );
}
