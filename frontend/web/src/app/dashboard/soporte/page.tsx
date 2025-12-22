'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function SoportePage() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === 'admin';

  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);
  
  // Estado para la animación de éxito
  const [mostrandoExito, setMostrandoExito] = useState(false);

  const [formCliente, setFormCliente] = useState({
    usuarioNombre: usuario?.nombre || '',
    asunto: '',
    mensaje: ''
  });

  const cargarTicketsAdmin = async () => {
    try {
      const data = await apiFetch('/soporte/admin/tickets');
      if (data) setTickets(data);
    } catch (e) {
      console.error("Error al cargar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (esAdmin) cargarTicketsAdmin();
    else setLoading(false);
  }, [esAdmin]);

  const enviarSolucionFinal = async () => {
    if (!mensajeRespuesta.trim()) return;
    setEnviando(true);
    try {
      await apiFetch(`/soporte/admin/tickets/${ticketSeleccionado.id}/responder`, {
        method: 'POST',
        body: JSON.stringify({ mensaje: mensajeRespuesta })
      });
      setMostrandoExito(true);
      setTimeout(() => {
        setMostrandoExito(false);
        setModalAbierto(false);
        setTickets(prev => prev.filter(t => t.id !== ticketSeleccionado.id));
      }, 2000);
    } finally {
      setEnviando(false);
    }
  };

  const enviarTicketCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await apiFetch('/soporte', {
        method: 'POST',
        body: JSON.stringify(formCliente)
      });
      setMostrandoExito(true);
      setFormCliente({ ...formCliente, asunto: '', mensaje: '' });
      // Después de 3 segundos, permitimos enviar otro si desea
      setTimeout(() => setMostrandoExito(false), 4000);
    } finally {
      setEnviando(false);
    }
  };

  // --- VISTA ADMINISTRADOR ---
  if (esAdmin) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#0A1F33] tracking-tighter">CENTRO DE GESTIÓN</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Soporte Técnico Especializado</p>
          </div>
          <div className="bg-slate-100 px-6 py-2 rounded-2xl">
            <span className="text-[10px] font-black text-slate-500 uppercase">Tickets Pendientes: {tickets.length}</span>
          </div>
        </header>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0A1F33] text-white">
              <tr>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em]">Detalles del Requerimiento</th>
                <th className="p-8 text-right text-[10px] font-black uppercase tracking-[0.2em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((t: any) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-all">
                  <td className="p-8">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#05ABCA] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#05ABCA]/20">
                          {t.usuarioNombre}
                        </span>
                        <h3 className="font-black text-lg text-[#0A1F33]">{t.titulo}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium italic">"{t.mensaje}"</p>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button 
                      onClick={() => { setTicketSeleccionado(t); setModalAbierto(true); }}
                      className="bg-[#0A1F33] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#05ABCA] hover:-translate-y-1 transition-all duration-300 shadow-xl active:scale-95"
                    >
                      Responder Ahora
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL ADMIN CON ANIMACIÓN DE ÉXITO */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-[#0A1F33]/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
            <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl animate-in zoom-in duration-300 overflow-hidden relative">
              {mostrandoExito ? (
                <div className="py-10 text-center animate-in zoom-in duration-500">
                   <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-black text-[#0A1F33] uppercase">¡Solución Enviada!</h2>
                  <p className="text-slate-400 font-bold mt-2">El ticket ha sido marcado como resuelto.</p>
                </div>
              ) : (
                <>
                  <span className="text-[#05ABCA] font-black text-[10px] uppercase tracking-widest">Resolución de Ticket</span>
                  <h2 className="text-3xl font-black text-[#0A1F33] mb-8 mt-2">Enviar Solución a {ticketSeleccionado?.usuarioNombre}</h2>
                  <textarea 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 text-sm font-medium focus:border-[#05ABCA] focus:ring-0 outline-none min-h-[200px] transition-all"
                    placeholder="Escribe las instrucciones detalladas..."
                    value={mensajeRespuesta}
                    onChange={(e) => setMensajeRespuesta(e.target.value)}
                  />
                  <div className="flex gap-4 mt-10">
                    <button onClick={() => setModalAbierto(false)} className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Cancelar</button>
                    <button onClick={enviarSolucionFinal} disabled={enviando} className="flex-1 bg-[#05ABCA] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#05ABCA]/30 hover:scale-105 transition-all">
                      {enviando ? 'Enviando...' : 'Confirmar Solución'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VISTA CLIENTE ---
  return (
    <div className="min-h-screen bg-slate-50/50 py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-block bg-[#05ABCA]/10 text-[#05ABCA] px-6 py-2 rounded-full mb-4">
            <span className="font-black uppercase tracking-[0.3em] text-[10px]">FJONIC HELP CENTER</span>
          </div>
          <h1 className="text-5xl font-black text-[#0A1F33] tracking-tighter mb-4">¿En qué podemos apoyarte hoy?</h1>
          <p className="text-slate-400 font-medium text-lg">Nuestro equipo técnico está listo para asistirte.</p>
        </header>

        <div className="bg-white rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
          {mostrandoExito ? (
            <div className="p-20 text-center animate-in fade-in zoom-in duration-700">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-[#0A1F33] mb-4">¡Ticket Recibido!</h2>
              <p className="text-slate-400 font-bold text-lg max-w-md mx-auto leading-relaxed">
                Hemos recibido tu solicitud. Te notificaremos en la campana de tu perfil cuando tengamos una respuesta.
              </p>
              <button 
                onClick={() => setMostrandoExito(false)}
                className="mt-10 text-[10px] font-black text-[#05ABCA] uppercase tracking-widest hover:underline"
              >
                Enviar otro requerimiento
              </button>
            </div>
          ) : (
            <form onSubmit={enviarTicketCliente} className="p-12 md:p-16 space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[#0A1F33] uppercase tracking-widest ml-6">Tu Identificación</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-8 py-5 text-sm font-bold text-slate-700 focus:bg-white focus:border-[#05ABCA] outline-none transition-all"
                    value={formCliente.usuarioNombre}
                    onChange={(e) => setFormCliente({...formCliente, usuarioNombre: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[#0A1F33] uppercase tracking-widest ml-6">Motivo de Consulta</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-8 py-5 text-sm font-bold text-slate-700 focus:bg-white focus:border-[#05ABCA] outline-none transition-all"
                    value={formCliente.asunto}
                    onChange={(e) => setFormCliente({...formCliente, asunto: e.target.value})}
                    placeholder="Ej: Acceso a servicios"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-[#0A1F33] uppercase tracking-widest ml-6">Detalles del Problema</label>
                <textarea 
                  rows={6}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-8 py-8 text-sm font-bold text-slate-700 focus:bg-white focus:border-[#05ABCA] outline-none transition-all"
                  value={formCliente.mensaje}
                  onChange={(e) => setFormCliente({...formCliente, mensaje: e.target.value})}
                  placeholder="Explícanos tu situación..."
                  required
                />
              </div>

              <button 
                disabled={enviando}
                className="w-full bg-[#0A1F33] text-white py-6 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[#05ABCA] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl shadow-[#0A1F33]/20"
              >
                {enviando ? 'Procesando Envío...' : 'Enviar Solicitud de Soporte'}
              </button>
            </form>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Atención profesional FJONIC STUDIO</p>
        </footer>
      </div>
    </div>
  );
}