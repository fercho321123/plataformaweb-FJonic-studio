'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationBell() {
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [abierto, setAbierto] = useState(false);

  // 1. Cargar notificaciones al iniciar
  const cargarNotificaciones = async () => {
    try {
      const data = await apiFetch('/notificaciones/mias');
      if (data) setNotificaciones(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando notificaciones");
    }
  };

  useEffect(() => {
    cargarNotificaciones();
    // Opcional: Recargar cada 30 segundos
    const interval = setInterval(cargarNotificaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  // 2. FUNCIÓN CLAVE: Marcar todas como leídas
  const marcarTodasComoLeidas = async () => {
    try {
      await apiFetch('/notificaciones/marcar-todas-leidas', {
        method: 'PATCH',
      });

      // Actualización visual inmediata
      setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
    } catch (error) {
      console.error("No se pudieron marcar como leídas", error);
    }
  };

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return (
    <div className="relative">
      {/* Icono de la Campana */}
      <button 
        onClick={() => setAbierto(!abierto)}
        className="relative p-2 text-slate-400 hover:text-[#05ABCA] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {noLeidas > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
            {noLeidas}
          </span>
        )}
      </button>

      {/* Panel Desplegable */}
      <AnimatePresence>
        {abierto && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-50 overflow-hidden z-50"
          >
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0A1F33]">Notificaciones</h3>
              
              {/* BOTÓN DE MARCAR TODAS */}
              {noLeidas > 0 && (
                <button 
                  onClick={marcarTodasComoLeidas}
                  className="text-[9px] font-black uppercase text-[#05ABCA] hover:underline"
                >
                  Marcar todo como leído
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notificaciones.length === 0 ? (
                <div className="p-10 text-center text-slate-300 text-xs font-medium">
                  No tienes mensajes nuevos
                </div>
              ) : (
                notificaciones.map((n) => (
                  <div key={n.id} className={`p-6 border-b border-slate-50 transition-colors ${!n.leida ? 'bg-slate-50/50' : ''}`}>
                    <p className="text-[10px] font-black text-[#0A1F33] uppercase mb-1">{n.titulo}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{n.mensaje}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}