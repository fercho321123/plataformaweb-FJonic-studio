'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CrearComentario from './CrearComentario';

import EditableTimeline from '@/app/dashboard/components/EditableTimeline';
import ProjectProgress from '@/app/dashboard/components/ProjectProgress';

interface Actualizacion {
  id: string;
  titulo: string;
  descripcion: string;
  creadoEn: string;
}

interface TimelineItem {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  completado: boolean;
}

export default function ActualizacionesProyectoPage() {
  const params = useParams();
  const proyectoId = params.id as string;

  const { token, usuario } = useAuth();

  const esAdminOStaff =
    usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [actualizaciones, setActualizaciones] = useState<Actualizacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // 🔹 convertir actualizaciones → timeline
  const timeline: TimelineItem[] = actualizaciones.map((a, index) => ({
    id: a.id,
    titulo: a.titulo,
    descripcion: a.descripcion,
    fecha: a.creadoEn,
    completado: index < actualizaciones.length - 1,
  }));

  // 🔹 estado del proyecto
  const estadoProyecto: 'pendiente' | 'iniciado' | 'finalizado' =
    actualizaciones.length === 0
      ? 'pendiente'
      : actualizaciones.length >= 5
      ? 'finalizado'
      : 'iniciado';

  const cargarActualizaciones = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(
        `http://localhost:3001/actualizaciones/proyecto/${proyectoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setActualizaciones(data);
    } catch {
      setError('No se pudieron cargar las actualizaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && proyectoId) cargarActualizaciones();
  }, [token, proyectoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(
        `http://localhost:3001/actualizaciones/proyecto/${proyectoId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ titulo, descripcion }),
        }
      );

      if (!res.ok) throw new Error();

      setTitulo('');
      setDescripcion('');
      setSuccess('Actualización creada correctamente');
      cargarActualizaciones();
    } catch {
      setError('Error al crear la actualización');
    }
  };

  // ✅ nombre correcto del handler
  const toggleHito = (id: string) => {
    console.log('Toggle hito:', id);
  };
const totalHitos = timeline.length;
const completados = timeline.filter(h => h.completado).length;

const progreso =
  totalHitos === 0
    ? 0
    : Math.round((completados / totalHitos) * 100);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-[#0D3A66]">
        Actualizaciones del proyecto
      </h1>

      {/* FORMULARIO */}
      {esAdminOStaff && (
        <div className="max-w-xl bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-[#0D3A66] mb-4">
            Nueva actualización
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-3">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-700 p-2 rounded mb-3">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full border rounded px-3 py-2 text-gray-900"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />

            <textarea
              className="w-full border rounded px-3 py-2 text-gray-900"
              placeholder="Describe avances o notas..."
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <button className="bg-[#0D3A66] text-white px-4 py-2 rounded hover:bg-[#175A8C]">
              Guardar actualización
            </button>
          </form>
        </div>
      )}

      {/* PROGRESO */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <ProjectProgress porcentaje={progreso} />
      </div>

      {/* TIMELINE */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-[#0D3A66]">
          Timeline del proyecto
        </h2>

        {loading ? (
          <p className="text-gray-700">Cargando timeline...</p>
        ) : timeline.length === 0 ? (
          <p className="text-gray-600">Aún no hay avances registrados.</p>
        ) : (
          timeline.map((item) => (
            <EditableTimeline
              key={item.id}
              item={item}
              editable={esAdminOStaff}
              onToggle={toggleHito} // ✅ PROP CORRECTO
            />
          ))
        )}
      </div>

      {/* COMENTARIOS */}
      {actualizaciones.map((a) => (
        <div key={a.id} className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h3 className="font-semibold text-[#0D3A66]">{a.titulo}</h3>
          <p className="text-gray-800">{a.descripcion}</p>
          <p className="text-xs text-gray-500">
            {new Date(a.creadoEn).toLocaleString()}
          </p>

          <CrearComentario
            actualizacionId={a.id}
            onSuccess={cargarActualizaciones}
          />
        </div>
      ))}
    </div>
  );
}
