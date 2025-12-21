'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  creadaEn: string;
}

export default function NotificationBell() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [open, setOpen] = useState(false);

  const cargar = async () => {
    const data = await apiFetch('/notificaciones/mias');
    setNotificaciones(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        🔔
        {noLeidas > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl z-50">
          <div className="p-3 font-semibold text-[#0D3A66]">
            Notificaciones
          </div>

          <ul className="max-h-96 overflow-auto">
            {notificaciones.length === 0 && (
              <li className="p-3 text-gray-500 text-sm">
                No hay notificaciones
              </li>
            )}

            {notificaciones.map(n => (
              <li
                key={n.id}
                className={`p-3 border-b cursor-pointer ${
                  n.leida ? 'bg-gray-50' : 'bg-blue-50'
                }`}
                onClick={async () => {
                  await apiFetch(`/notificaciones/${n.id}/leida`, {
                    method: 'PATCH',
                  });
                  cargar();
                }}
              >
                <p className="font-medium text-sm">
                  {n.titulo}
                </p>
                <p className="text-xs text-gray-600">
                  {n.mensaje}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
