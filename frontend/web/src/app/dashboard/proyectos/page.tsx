'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { apiFetch } from '@/lib/api'; // Asegúrate de tener este helper para no repetir headers

export default function ProyectosPage() {
  const { usuario } = useAuth();
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProyectos = async () => {
      if (!usuario) return;

      try {
        // 🟢 LÓGICA INTELIGENTE:
        // Si es admin, pedimos todos a '/proyectos'
        // Si es cliente, pedimos solo los suyos a '/proyectos/mis-proyectos'
        const endpoint = usuario.rol === 'admin' ? '/proyectos' : '/proyectos/mis-proyectos';
        
        const data = await apiFetch(endpoint);
        
        if (data) {
          setProyectos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error cargando proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [usuario]); // Se ejecuta cuando el usuario carga

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#05ABCA] rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-black uppercase tracking-widest text-[10px]">Sincronizando Proyectos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      {/* Cabecera Dinámica */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-[#0A1F33] font-montserrat tracking-tight uppercase">
            {usuario?.rol === 'admin' ? 'Gestión de' : 'Mis'} <span className="text-[#05ABCA]">Proyectos</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            {usuario?.rol === 'admin' 
              ? 'Panel de control administrativo. Supervisa todos los procesos activos.' 
              : `Bienvenido, ${usuario?.nombre}. Sigue el avance de tus servicios en tiempo real.`}
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">
            {usuario?.rol === 'admin' ? 'Total Global' : 'Mis Proyectos'}
          </span>
          <span className="text-2xl font-black text-[#0A1F33]">{proyectos.length}</span>
        </div>
      </header>

      {proyectos.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-20 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-400 italic font-montserrat">
            {usuario?.rol === 'admin' ? 'No hay proyectos en la base de datos.' : 'No tienes proyectos asignados todavía.'}
          </h3>
          <p className="text-slate-400 text-sm mt-2">
            {usuario?.rol === 'admin' ? 'Crea un proyecto para comenzar.' : 'En cuanto comencemos a trabajar, aparecerán aquí.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <motion.div 
              key={proyecto.id}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="px-4 py-1.5 bg-[#05ABCA]/10 text-[#05ABCA] text-[9px] font-black uppercase tracking-widest rounded-full w-fit">
                      {proyecto.estado}
                    </span>
                    {/* 🟢 Si es admin, mostramos a qué cliente pertenece el proyecto */}
                    {usuario?.rol === 'admin' && (
                      <span className="text-[10px] font-bold text-slate-400 ml-1">
                        Cliente: {proyecto.cliente?.nombre || 'Desconocido'}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Avance</p>
                    <p className="text-xl font-black text-[#0A1F33]">{proyecto.progreso || 0}%</p>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-[#0A1F33] font-montserrat leading-tight group-hover:text-[#05ABCA] transition-colors">
                  {proyecto.nombre}
                </h3>
                
                <p className="text-slate-400 text-sm mt-4 line-clamp-2 italic">
                  {proyecto.descripcion || 'Sin descripción disponible.'}
                </p>

                <div className="mt-8 mb-8 h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${proyecto.progreso || 0}%` }}
                    className="h-full bg-[#05ABCA] rounded-full shadow-[0_0_8px_rgba(5,171,202,0.4)]"
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-[#0A1F33] flex items-center justify-center text-[10px] text-white font-bold border-2 border-white uppercase">
                        {proyecto.nombre.charAt(0)}
                      </div>
                   </div>
                   
                   <button 
                    onClick={() => router.push(`/dashboard/proyectos/${proyecto.id}/actualizaciones`)}
                    className="flex items-center gap-2 bg-[#0A1F33] hover:bg-[#05ABCA] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                   >
                     {usuario?.rol === 'admin' ? 'Gestionar' : 'Abrir Bitácora'}
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}