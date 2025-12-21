'use client';

interface Props {
  item: {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    completado: boolean;
  };
  editable?: boolean;
  onToggle?: (id: string) => void;
}

export default function TimelineItem({
  item,
  editable = false,
  onToggle,
}: Props) {
  return (
    <div className="flex gap-4">
      {/* Línea */}
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full ${
            item.completado
              ? 'bg-green-500'
              : 'bg-gray-300'
          }`}
        />
        <div className="flex-1 w-px bg-gray-300" />
      </div>

      {/* Contenido */}
      <div className="bg-gray-50 rounded-xl p-4 flex-1 shadow">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-[#0D3A66]">
            {item.titulo}
          </h4>

          {editable && (
            <button
              onClick={() => onToggle?.(item.id)}
              className={`text-xs px-2 py-1 rounded ${
                item.completado
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {item.completado ? 'Completado' : 'Marcar'}
            </button>
          )}
        </div>

        <p className="text-gray-800 mt-2">
          {item.descripcion}
        </p>

        <p className="text-xs text-gray-500 mt-2">
          {new Date(item.fecha).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
