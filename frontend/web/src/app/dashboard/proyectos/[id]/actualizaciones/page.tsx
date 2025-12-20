'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import CrearComentario from './CrearComentario';
import ProjectTimeline from '@/app/dashboard/components/ProjectTimeline'; // 🔹 Nueva importación

interface Actualizacion {
  id: string;
  titulo: string;
  descripcion: string;
  creadoEn: string;
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

  // formulario actualización (admin / staff)
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [success, setSuccess] = useState('');

  // 🔹 cargar actualizaciones
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

      if (!res.ok) {
        throw new Error('Error al cargar actualizaciones');
      }

      const data = await res.json();
      setActualizaciones(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las actualizaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && proyectoId) {
      cargarActualizaciones();
    }
  }, [token, proyectoId]);

  // 🔐 crear actualización (solo admin / staff)
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
          body: JSON.stringify({
            titulo,
            descripcion,
          }),
        }
      );

      if (!res.ok) {
        throw new Error('Error al crear la actualización');
      }

      setTitulo('');
      setDescripcion('');
      setSuccess('Actualización creada correctamente');
      await cargarActualizaciones();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error inesperado');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        Actualizaciones del proyecto
      </h1>

      {/* 🔐 SOLO ADMIN / STAFF */}
      {esAdminOStaff && (
        <div className="max-w-xl bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
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

          <form onSubmit={handleSubmit}>
            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Título de la actualización"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />

            <textarea
              className="w-full border p-2 rounded mb-4"
              placeholder="Describe avances, cambios o notas..."
              rows={5}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Guardar actualización
            </button>
          </form>
        </div>
      )}

      {/* 📋 TIMELINE ROADMAP - REEMPLAZADO */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-xl font-semibold text-[#0D3A66]">
          Timeline del proyecto
        </h2>

        {loading ? (
          <p className="text-gray-700">
            Cargando timeline...
          </p>
        ) : actualizaciones.length === 0 ? (
          <p className="text-gray-600">
            Aún no hay avances registrados.
          </p>
        ) : (
          <ProjectTimeline items={actualizaciones} />
        )}
      </div>
    </div>
  );
}