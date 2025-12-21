'use client';

import { useState } from 'react';

// --- TIPOS ---
interface Publicacion {
  id: string;
  cliente: string;
  titulo: string;
  // ✅ Añadimos LinkedIn y otras plataformas comunes para evitar el error
  plataforma: 'Instagram' | 'Facebook' | 'TikTok' | 'Web' | 'LinkedIn' | 'Twitter' | 'YouTube';
  tipo: 'Reel' | 'Post' | 'Story' | 'Blog' | 'Video';
  hora: string;
  estado: 'Programado' | 'Pendiente' | 'Publicado';
  color: string;
}

// --- DATA INICIAL ---
const CONTENIDO_DATA: Record<string, Publicacion[]> = {
  'Lunes 22': [
    { id: '1', cliente: 'The Burger Station', titulo: 'Promo Lunes de Combos', plataforma: 'Instagram', tipo: 'Post', hora: '12:00', estado: 'Publicado', color: '#EAB308' },
    { id: '2', cliente: 'La Tertulia', titulo: 'Mood Vitivinícola', plataforma: 'Instagram', tipo: 'Story', hora: '18:00', estado: 'Publicado', color: '#05ABCA' },
  ],
  'Martes 23': [
    // ✅ Ahora "LinkedIn" es válido porque lo incluimos en el tipo arriba
    { id: '3', cliente: 'FJONIC Studio', titulo: 'Tips de UI/UX para ventas', plataforma: 'LinkedIn', tipo: 'Post', hora: '09:00', estado: 'Programado', color: '#0D3A66' },
    { id: '4', cliente: 'The Burger Station', titulo: 'Detrás de cámaras cocina', plataforma: 'TikTok', tipo: 'Reel', hora: '20:00', estado: 'Pendiente', color: '#EAB308' },
  ],
  'Miércoles 24': [
    { id: '5', cliente: 'La Tertulia', titulo: 'Reserva para Navidad', plataforma: 'Facebook', tipo: 'Post', hora: '10:00', estado: 'Programado', color: '#05ABCA' },
  ],
  'Jueves 25': [],
  'Viernes 26': [
    { id: '6', cliente: 'The Burger Station', titulo: 'Weekend Vibe', plataforma: 'Instagram', tipo: 'Reel', hora: '19:00', estado: 'Programado', color: '#EAB308' },
  ]
};

export default function CalendarioPage() {
  const [semanaActual] = useState(['Lunes 22', 'Martes 23', 'Miércoles 24', 'Jueves 25', 'Viernes 26']);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-[10px] font-montserrat">Content Planning</span>
          <h1 className="text-4xl font-black font-montserrat text-[#0A1F33] mt-2">Calendario Global</h1>
        </div>
        <button className="bg-[#0A1F33] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#05ABCA] transition-all shadow-lg shadow-blue-900/20">
          + Agendar Contenido
        </button>
      </div>

      {/* GRID DE LA SEMANA */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {semanaActual.map((dia) => (
          <div key={dia} className="space-y-4">
            {/* Cabecera del Día */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dia.split(' ')[0]}</p>
              <p className="text-xl font-black text-[#0A1F33] font-montserrat">{dia.split(' ')[1]}</p>
            </div>

            {/* Lista de Cards del Día */}
            <div className="space-y-3 min-h-[400px] bg-slate-50/50 rounded-[2rem] p-2 border border-dashed border-slate-200">
              {CONTENIDO_DATA[dia]?.length > 0 ? (
                CONTENIDO_DATA[dia].map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 rounded-2xl shadow-sm border-l-4 hover:shadow-md transition-all cursor-pointer group"
                    style={{ borderLeftColor: item.color }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">
                        {item.hora} • {item.plataforma}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        item.estado === 'Publicado' ? 'bg-emerald-500' : 
                        item.estado === 'Programado' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></div>
                    </div>
                    <h4 className="text-xs font-black text-[#0A1F33] leading-tight mb-1 group-hover:text-[#05ABCA] transition-colors">
                      {item.titulo}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {item.cliente}
                    </p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold italic">
                           #{item.tipo}
                        </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-20 text-slate-300">
                  <span className="text-[10px] font-black uppercase tracking-widest">Vacío</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* LEYENDA Y ESTADOS */}
      <div className="bg-[#0A1F33] p-8 rounded-[2.5rem] text-white flex flex-wrap items-center justify-around gap-6 shadow-xl">
          <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Publicado</span>
          </div>
          <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Programado</span>
          </div>
          <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Pendiente de Aprobación</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <p className="text-[10px] text-blue-300 font-medium italic">
            Total de publicaciones esta semana: <span className="text-white font-black">{Object.values(CONTENIDO_DATA).flat().length}</span>
          </p>
      </div>
    </div>
  );
}