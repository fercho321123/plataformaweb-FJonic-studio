'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Props {
  actualizacionId: string;
  onSuccess: () => void;
}

export default function CrearComentario({
  actualizacionId,
  onSuccess,
}: Props) {
  const { token } = useAuth();
  const [contenido, setContenido] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contenido.trim()) return;

    try {
      setLoading(true);

      const res = await fetch('http://localhost:3001/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          actualizacionId,
          contenido,
        }),
      });

      if (!res.ok) {
        throw new Error('No se pudo enviar el comentario');
      }

      setContenido('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al comentar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </p>
      )}

      <textarea
        className="w-full border rounded p-2 text-sm"
        rows={3}
        placeholder="Escribe un comentario..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Comentar'}
      </button>
    </form>
  );
}
