'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// 🟢 Definición de Props para que TypeScript no de error
interface ComentariosProps {
  actualizacionId: string;
}

interface Comentario {
  id: string;
  contenido: string;
  creadoEn: string;
  usuario: {
    nombre: string;
    rol: string;
  };
}

export default function ComentariosActualizacion({ actualizacionId }: ComentariosProps) {
  const { token } = useAuth();
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarComentarios = async () => {
      if (!token || !actualizacionId) return;
      try {
        const res = await fetch(`http://localhost:3001/comentarios/actualizacion/${actualizacionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setComentarios(data);
        }
      } catch (error) {
        console.error("Error cargando comentarios:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarComentarios();
  }, [token, actualizacionId]);

  if (loading) return <p className="text-[9px] uppercase tracking-widest text-slate-400 animate-pulse">Cargando hilo...</p>;

  return (
    <div className="space-y-4">
      {comentarios.map((c) => (
        <div key={c.id} className="flex gap-3 items-start bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${c.usuario.rol === 'admin' ? 'bg-[#0A1F33]' : 'bg-[#05ABCA]'}`}>
            {c.usuario.nombre.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-[#0A1F33] uppercase">{c.usuario.nombre}</span>
              <span className="text-[8px] text-slate-300">{new Date(c.creadoEn).toLocaleDateString()}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-tight">{c.contenido}</p>
          </div>
        </div>
      ))}
    </div>
  );
}