'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';
import ProjectProgress from '@/app/dashboard/components/ProjectProgress';

interface Cliente {
  id: string;
  nombre: string;
  activo: boolean; // ✅ Campo añadido para el filtro
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

  const esAdminOStaff =
    usuario?.rol === 'admin' || usuario?.rol === 'staff';

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

  const cargarProyectos = async () => {
    try {
      const data =
        usuario?.rol === 'cliente'
          ? await apiFetch('/proyectos/mis-proyectos')
          : await apiFetch('/proyectos');

      setProyectos(data);
    } catch {
      setError('No se pudieron cargar los proyectos');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    if (usuario?.rol === 'cliente') return;
    try {
      const data = await apiFetch('/clientes');
      // Aseguramos que el estado activo se maneje correctamente
      setClientes(data);
    } catch (err) {
      console.error("Error al cargar clientes");
    }
  };

  useEffect(() => {
    if (!usuario) return;
    cargarProyectos();
    cargarClientes();
  }, [usuario]);

  // 🔄 ACTUALIZAR ESTADO
  const actualizarEstado = async (
    proyectoId: string,
    nuevoEstado: Proyecto['estado']
  ) => {
    try {
      await apiFetch(`/proyectos/${proyectoId}`, {
        method: 'PATCH',
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      cargarProyectos();
    } catch {
      alert('Error al actualizar el estado');
    }
  };

  // 🗑️ ELIMINAR PROYECTO
  const eliminarProyecto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      await apiFetch(`/proyectos/${id}`, {
        method: 'DELETE',
      });
      setProyectos(proyectos.filter((p) => p.id !== id));
    } catch (err) {
      alert('No se pudo eliminar el proyecto');
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#0D3A66]">
        Proyectos
      </h1>

      {/* =========================
          FORMULARIO CREAR
      ========================= */}
      {esAdminOStaff && (
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
          className="bg-white p-6 rounded-2xl shadow max-w-2xl"
        >
          <h2 className="font-semibold text-[#0D3A66] mb-4">
            Crear proyecto
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-3">
              {error}
            </p>
          )}

          <div className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2 text-black"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <textarea
              className="w-full border rounded px-3 py-2 text-black"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <select
              className="w-full border rounded px-3 py-2 text-black"
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value as any)
              }
            >
              <option value="pendiente">Pendiente</option>
              <option value="iniciado">Iniciado</option>
              <option value="finalizado">Finalizado</option>
            </select>

            <select
              className="w-full border rounded px-3 py-2 text-black"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
            >
              <option value="">Seleccionar cliente</option>
              {/* ✅ FILTRO: Solo mostramos clientes que están activos */}
              {clientes
                .filter((c) => c.activo !== false) 
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
            </select>

            <button className="bg-[#0D3A66] text-white px-5 py-2 rounded hover:bg-[#175A8C] transition">
              Crear proyecto
            </button>
          </div>
        </form>
      )}

      {/* =========================
          LISTADO + PROGRESO
      ========================= */}
      <div className="grid md:grid-cols-2 gap-6">
        {proyectos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-2xl shadow space-y-5"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-[#0D3A66]">
                {p.nombre}
              </h3>

              <div className="flex items-center gap-3">
                {esAdminOStaff ? (
                  <>
                    <select
                      value={p.estado}
                      onChange={(e) =>
                        actualizarEstado(
                          p.id,
                          e.target.value as any
                        )
                      }
                      className="border rounded px-2 py-1 text-sm text-black"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="iniciado">Iniciado</option>
                      <option value="finalizado">Finalizado</option>
                    </select>

                    <button
                      onClick={() => eliminarProyecto(p.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Eliminar proyecto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <span className="text-sm font-medium text-[#0D3A66] capitalize">
                    {p.estado}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-800">
              {p.descripcion}
            </p>

            <ProjectProgress porcentaje={p.estado === 'finalizado' ? 100 : p.estado === 'iniciado' ? 50 : 0} />

            <div className="text-sm text-gray-700">
              Cliente:{' '}
              <strong>{p.cliente?.nombre}</strong>
            </div>

            <Link
              href={`/dashboard/proyectos/${p.id}/actualizaciones`}
              className="text-blue-600 hover:underline text-sm inline-block"
            >
              Ver timeline del proyecto →
            </Link>
          </div>
        ))}
      </div>

      {loading && <p>Cargando proyectos...</p>}
    </div>
  );
}