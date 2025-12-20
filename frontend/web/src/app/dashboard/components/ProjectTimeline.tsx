'use client';

interface TimelineItem {
  id: string;
  titulo: string;
  descripcion: string;
  creadoEn: string;
}

const estadoStyles = {
  pendiente: 'border-gray-300 bg-gray-100',
  iniciado: 'border-blue-500 bg-blue-100',
  finalizado: 'border-green-500 bg-green-100',
};

export default function ProjectTimeline({
  items,
}: {
  items: TimelineItem[];
}) {
  return (
    <div className="relative border-l-2 border-gray-300 pl-6 space-y-8">
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          {/* DOT */}
          <span className="absolute -left-[11px] top-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />

          {/* CARD */}
          <div className="bg-white rounded-xl shadow p-5 space-y-2">
            <h3 className="text-lg font-semibold text-[#0D3A66]">
              {item.titulo}
            </h3>

            <p className="text-gray-800 text-sm leading-relaxed">
              {item.descripcion}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(item.creadoEn).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
