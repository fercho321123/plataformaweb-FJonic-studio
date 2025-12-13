'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Proyecto {
  id: string;
  nombre: string;
  estado: string;
  descripcion?: string;
  actualizadoEn?: string;
}

export default function ClienteProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await apiFetch('/proyectos/mis-proyectos');
        setProyectos(data);
      } catch (err) {
        console.error('Error cargando proyectos', err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return <p>Cargando proyectos...</p>;
  }

  if (proyectos.length === 0) {
    return <p>No tienes proyectos asignados aún.</p>;
  }

  return (
    <div className="space-y-4">
      {proyectos.map((p) => (
        <div
          key={p.id}
          className="bg-white p-5 rounded shadow"
        >
          <h3 className="text-xl font-semibold">{p.nombre}</h3>
          <p className="text-gray-700">Estado: {p.estado}</p>

          {p.descripcion && (
            <p className="text-gray-600 mt-2">{p.descripcion}</p>
          )}

          {p.actualizadoEn && (
            <p className="text-sm text-gray-400 mt-2">
              Última actualización:{' '}
              {new Date(p.actualizadoEn).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
