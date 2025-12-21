'use client';

interface Props {
  porcentaje: number;
}

export default function ProjectProgress({ porcentaje }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium text-[#0D3A66]">
        <span>Progreso del proyecto</span>
        <span>{porcentaje}%</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#0D3A66] transition-all duration-700 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      <p className="text-xs text-gray-600">
        Basado en hitos completados
      </p>
    </div>
  );
}

