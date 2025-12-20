'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

/* ======================
   TIPOS
====================== */
interface Cliente {
  id: string;
  nombre: string;
}

interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'pendiente' | 'iniciado' | 'finalizado';
  progreso?: number;
  fechaInicio?: string;
  fechaFin?: string;
  cliente: {
    id: string;
    nombre: string;
  };
}

/* ======================
   ESTILOS DE ESTADO
====================== */
const estadoColor = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  iniciado: 'bg-blue-100 text-blue-800',
  finalizado: 'bg-green-100 text-green-800',
};

/* ======================
   PROGRESS BAR
====================== */
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 bg-blue-600 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/* ======================
   PAGE
====================== */
export default function ProyectosPage() {
  const { usuario } = useAuth();

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // FORM CREAR
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] =
    useState<'pendiente' | 'iniciado' | 'finalizado'>('pendiente');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [clienteId, setClienteId] = useState('');

  /* ======================
     DATA
  ====================== */
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
    const data = await apiFetch('/clientes');
    setClientes(data);
  };

  useEffect(() => {
    if (!usuario) return;
    cargarProyectos();
    cargarClientes();
  }, [usuario]);

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#0D3A66]">
        Gestión de Proyectos
      </h1>

      {/* ======================
          CREAR PROYECTO
      ====================== */}
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
          className="bg-white p-6 rounded-2xl shadow max-w-2xl"
        >
          <h2 className="text-lg font-semibold text-[#0D3A66] mb-4">
            Crear nuevo proyecto
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-3">
              {error}
            </p>
          )}

          <div className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2 text-gray-800"
              placeholder="Nombre del proyecto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <textarea
              className="w-full border rounded px-3 py-2 text-gray-800"
              placeholder="Descripción del proyecto"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <select
              className="w-full border rounded px-3 py-2 text-gray-800"
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value as any)
              }
            >
              <option value="pendiente">Pendiente</option>
              <option value="iniciado">Iniciado</option>
              <option value="finalizado">Finalizado</option>
            </select>

            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-gray-800"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />

            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-gray-800"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />

            <select
              className="w-full border rounded px-3 py-2 text-gray-800"
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

            <button className="bg-[#0D3A66] text-white px-5 py-2 rounded hover:bg-[#175A8C] transition">
              Crear proyecto
            </button>
          </div>
        </form>
      )}

      {/* ======================
          LISTADO PROYECTOS
      ====================== */}
      <div className="grid md:grid-cols-2 gap-6">
        {proyectos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-2xl shadow space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-[#0D3A66]">
                {p.nombre}
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full ${estadoColor[p.estado]}`}
              >
                {p.estado}
              </span>
            </div>

            {/* PROGRESO */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-700">
                <span>Progreso</span>
                <span>{p.progreso ?? 0}%</span>
              </div>
              <ProgressBar value={p.progreso ?? 0} />
            </div>

            <p className="text-gray-800">
              {p.descripcion}
            </p>

            <p className="text-sm text-gray-700">
              Cliente: <strong>{p.cliente?.nombre}</strong>
            </p>

            {/* ACCIONES */}
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href={`/dashboard/proyectos/${p.id}/actualizaciones`}
                className="text-blue-600 hover:underline"
              >
                Ver timeline del proyecto
              </Link>

              {/* SLIDER PROGRESO */}
              {usuario?.rol !== 'cliente' && (
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={p.progreso ?? 0}
                  onChange={async (e) => {
                    await apiFetch(`/proyectos/${p.id}/progreso`, {
                      method: 'PATCH',
                      body: JSON.stringify({
                        progreso: Number(e.target.value),
                      }),
                    });
                    cargarProyectos();
                  }}
                />
              )}

              {/* ELIMINAR */}
              {usuario?.rol === 'admin' && (
                <button
                  onClick={async () => {
                    if (!confirm('¿Eliminar proyecto?')) return;
                    await apiFetch(`/proyectos/${p.id}`, {
                      method: 'DELETE',
                    });
                    cargarProyectos();
                  }}
                  className="text-red-600 hover:underline text-left"
                >
                  Eliminar proyecto
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-gray-700">
          Cargando proyectos...
        </p>
      )}
    </div>
  );
}
