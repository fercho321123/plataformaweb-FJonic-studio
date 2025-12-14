'use client';

interface Comentario {
  id: string;
  contenido: string;
  creadoEn: string;
  usuario?: {
    nombre?: string;
    email?: string;
  };
}

interface Props {
  comentarios: Comentario[];
}

export default function ComentariosActualizacion({
  comentarios,
}: Props) {
  if (!comentarios || comentarios.length === 0) {
    return (
      <p className="text-gray-500 text-sm mt-3">
        No hay comentarios para esta actualización.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <h4 className="font-semibold text-sm text-gray-700">
        Comentarios
      </h4>

      {comentarios.map((comentario) => (
        <div
          key={comentario.id}
          className="border rounded p-3 bg-gray-50"
        >
          <p className="text-gray-800 text-sm mb-1">
            {comentario.contenido}
          </p>

          <p className="text-xs text-gray-500">
            {comentario.usuario?.nombre ||
              comentario.usuario?.email ||
              'Usuario'}
            {' · '}
            {new Date(comentario.creadoEn).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
