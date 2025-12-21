'use client';

import { useState } from 'react';

export type Hito = {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: string;
  completado: boolean;
};

export default function ProjectTimeline({
  hitos,
  editable,
  onAdd,
  onToggle,
}: {
  hitos: Hito[];
  editable: boolean;
  onAdd?: (hito: Omit<Hito, 'id'>) => void;
  onToggle?: (id: string) => void;
}) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0D3A66]">
        Timeline del proyecto
      </h3>

      {/* LISTA */}
      <div className="relative border-l-2 border-[#0D3A66] pl-6 space-y-6">
        {hitos.map((hito) => (
          <div key={hito.id} className="relative">
            <span
              className={`absolute -left-[10px] top-1.5 w-4 h-4 rounded-full ${
                hito.completado
                  ? 'bg-green-600'
                  : 'bg-yellow-500'
              }`}
            />

            <div className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-[#0D3A66]">
                  {hito.titulo}
                </h4>

                {editable && (
                  <button
                    onClick={() => onToggle?.(hito.id)}
                    className="text-xs px-3 py-1 rounded-full bg-[#0D3A66] text-white hover:bg-[#175A8C]"
                  >
                    {hito.completado
                      ? 'Marcar pendiente'
                      : 'Marcar completado'}
                  </button>
                )}
              </div>

              {hito.descripcion && (
                <p className="text-gray-800 mt-1">
                  {hito.descripcion}
                </p>
              )}

              <p className="text-sm text-gray-600 mt-2">
                📅 {hito.fecha}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* AGREGAR HITO */}
      {editable && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!titulo || !fecha) return;

            onAdd?.({
              titulo,
              descripcion,
              fecha,
              completado: false,
            });

            setTitulo('');
            setDescripcion('');
            setFecha('');
          }}
          className="bg-gray-50 p-4 rounded-xl space-y-3"
        >
          <h4 className="font-semibold text-[#0D3A66]">
            Nuevo hito
          </h4>

          <input
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Título del hito"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <textarea
            className="w-full border rounded px-3 py-2 text-black"
            placeholder="Descripción (opcional)"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <input
            type="date"
            className="w-full border rounded px-3 py-2 text-black"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <button className="bg-[#0D3A66] text-white px-4 py-2 rounded hover:bg-[#175A8C] transition">
            Agregar hito
          </button>
        </form>
      )}
    </div>
  );
}
