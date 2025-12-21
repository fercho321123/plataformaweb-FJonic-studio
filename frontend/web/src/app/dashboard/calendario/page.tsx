'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Entrega {
  id: string;
  titulo: string;
  cliente: string;
  fecha: string;
  prioridad: 'baja' | 'media' | 'alta';
  estado: string;
}

export default function AgendaEntregasPage() {
  const { usuario, token } = useAuth();
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulación de carga de datos (Aquí conectarás con tu API de NestJS luego)
  useEffect(() => {
    const cargarEntregas = async () => {
      // Simulamos una pequeña espera
      setTimeout(() => {
        setEntregas([
          { id: '1', titulo: 'Logo FJONIC Update', cliente: 'Interno', fecha: '2023-10-25', prioridad: 'alta', estado: 'En proceso' },
          { id: '2', titulo: 'UI/UX E-commerce', cliente: 'Nike Store', fecha: '2023-10-27', prioridad: 'media', estado: 'Pendiente' },
          { id: '3', titulo: 'Campaña Social Media', cliente: 'Burger King', fecha: '2023-10-28', prioridad: 'baja', estado: 'Revisión' },
        ]);
        setLoading(false);
      }, 800);
    };
    cargarEntregas();
  }, []);

  const getPrioridadColor = (p: string) => {
    switch (p) {
      case 'alta': return 'bg-rose-500';
      case 'media': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  };

  return (
    <div className="animate-in fade-in duration-700 font-open-sans">
      {/* HEADER DE LA AGENDA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black font-montserrat text-[#0D3A66]">
            Agenda de Entregas
          </h1>
          <p className="text-slate-500 mt-1">
            Gestiona los tiempos de entrega y hitos de {usuario?.rol === 'admin' ? 'todo el estudio' : 'tus proyectos'}.
          </p>
        </div>
        
        <button className="px-6 py-3 bg-[#05ABCA] text-white rounded-2xl font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all text-sm">
          + Nueva Entrega
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* COLUMNA IZQUIERDA: CALENDARIO (Placeholder visual) */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-slate-100 min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-xl text-slate-800">Octubre 2023</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">←</button>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">→</button>
              </div>
            </div>

            {/* GRILLA DEL CALENDARIO (Simplificada) */}
            <div className="grid grid-cols-7 gap-2 flex-1">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(dia => (
                <div key={dia} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{dia}</div>
              ))}
              
              {/* Ejemplo de celdas */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className="group relative aspect-square border border-slate-50 rounded-2xl p-2 hover:bg-blue-50/50 transition-all cursor-pointer">
                  <span className="text-sm font-bold text-slate-400 group-hover:text-[#0D3A66]">{i + 1}</span>
                  {i === 24 && <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-rose-500 rounded-full"></div>}
                  {i === 26 && <div className="absolute bottom-2 left-2 right-2 h-1.5 bg-amber-500 rounded-full"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PRÓXIMAS ENTREGAS */}
        <div className="space-y-6">
          <div className="bg-[#0A1F33] rounded-[2.5rem] p-6 text-white shadow-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#05ABCA] rounded-full inline-block"></span>
              Próximas Entregas
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-400 text-sm animate-pulse">Cargando agenda...</p>
              ) : (
                entregas.map(entrega => (
                  <div key={entrega.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full text-white ${getPrioridadColor(entrega.prioridad)}`}>
                        {entrega.prioridad}
                      </span>
                      <span className="text-[10px] text-slate-400">{entrega.fecha}</span>
                    </div>
                    <p className="text-sm font-bold text-white group-hover:text-[#05ABCA] transition-colors">{entrega.titulo}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">{entrega.cliente}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Leyenda</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div> Crítico
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div> En proceso
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Completado
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}