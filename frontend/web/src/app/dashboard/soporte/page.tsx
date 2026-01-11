'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMessageSquare,
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiClock,
  FiUser,
  FiMail,
  FiFileText,
  FiSearch,
  FiFilter,
  FiCheckCircle
} from 'react-icons/fi';

export default function SoportePage() {
  const { usuario } = useAuth();
  const esAdmin = usuario?.rol === 'admin';

  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mostrandoExito, setMostrandoExito] = useState(false);
  const [busqueda, setBusqueda] = useState('');

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
        setMensajeRespuesta('');
      }, 2000);
    } finally {
      setEnviando(false);
    }
  };

  const enviarTicketCliente = async () => {
    setEnviando(true);
    try {
      await apiFetch('/soporte', {
        method: 'POST',
        body: JSON.stringify(formCliente)
      });
      setMostrandoExito(true);
      setFormCliente({ ...formCliente, asunto: '', mensaje: '' });
      setTimeout(() => setMostrandoExito(false), 4000);
    } finally {
      setEnviando(false);
    }
  };

  const ticketsFiltrados = tickets.filter(t => 
    t.usuarioNombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    t.mensaje.toLowerCase().includes(busqueda.toLowerCase())
  );

  // VISTA ADMINISTRADOR
  if (esAdmin) {
    return (
      <div className="min-h-screen relative">
        <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-8">
          
          {/* HEADER */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-1 h-12 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                    Centro de Soporte
                  </h1>
                  <p className="text-[#05ABCA]/60 text-sm font-medium">
                    Gestión de tickets y atención al cliente
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl border border-[#05ABCA]/20 rounded-xl px-6 py-3">
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="text-amber-500" size={18} />
                    <div>
                      <p className="text-xs text-slate-400">Tickets Pendientes</p>
                      <p className="text-xl font-bold text-white">{tickets.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-[#05ABCA]/50 via-[#05ABCA]/20 to-transparent" />
          </header>

          {/* BUSCADOR */}
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar tickets..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all"
            />
          </div>

          {/* TABLA DE TICKETS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#05ABCA]/10">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Usuario
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Asunto
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Mensaje
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs text-center">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {ticketsFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-xl bg-[#05ABCA]/10 border border-[#05ABCA]/20 flex items-center justify-center">
                              <FiMessageSquare className="text-[#05ABCA]" size={24} />
                            </div>
                            <p className="text-slate-400 font-medium">
                              {busqueda ? 'No se encontraron tickets' : 'No hay tickets pendientes'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ticketsFiltrados.map((t: any, index) => (
                        <motion.tr
                          key={t.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-[#05ABCA]/5 hover:bg-[#05ABCA]/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center text-white font-bold shadow-lg shadow-[#05ABCA]/30">
                                {t.usuarioNombre?.charAt(0) || 'U'}
                              </div>
                              <span className="text-sm font-semibold text-white">{t.usuarioNombre}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-white">{t.titulo}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-300 line-clamp-2 max-w-md">"{t.mensaje}"</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => { setTicketSeleccionado(t); setModalAbierto(true); }}
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all"
                            >
                              <FiSend size={14} />
                              Responder
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* MODAL ADMIN */}
        <AnimatePresence>
          {modalAbierto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
              onClick={() => !mostrandoExito && setModalAbierto(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-[#0d2640] to-[#0A1F33] w-full max-w-2xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
                
                {mostrandoExito ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <FiCheck className="text-emerald-500" size={48} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-3">¡Solución Enviada!</h2>
                    <p className="text-slate-400">El ticket ha sido marcado como resuelto</p>
                  </motion.div>
                ) : (
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                          <FiMessageSquare className="text-white" size={18} />
                        </div>
                        <div>
                          <p className="text-xs text-[#05ABCA] uppercase tracking-wider font-semibold">Respuesta a ticket</p>
                          <h2 className="text-xl font-bold text-white">{ticketSeleccionado?.usuarioNombre}</h2>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-[#0A1F33]/50 border border-[#05ABCA]/10 rounded-xl">
                        <p className="text-xs text-[#05ABCA] font-semibold mb-1">Asunto:</p>
                        <p className="text-sm text-white font-medium mb-3">{ticketSeleccionado?.titulo}</p>
                        <p className="text-xs text-[#05ABCA] font-semibold mb-1">Mensaje:</p>
                        <p className="text-sm text-slate-300 italic">"{ticketSeleccionado?.mensaje}"</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                        Solución
                      </label>
                      <textarea
                        rows={6}
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all resize-none"
                        placeholder="Escribe la solución detallada..."
                        value={mensajeRespuesta}
                        onChange={(e) => setMensajeRespuesta(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => setModalAbierto(false)}
                        className="flex-1 bg-[#0A1F33]/50 border border-[#05ABCA]/20 text-slate-400 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={enviarSolucionFinal}
                        disabled={enviando || !mensajeRespuesta.trim()}
                        className="flex-1 bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {enviando ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <FiCheckCircle size={16} />
                            Confirmar Solución
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // VISTA CLIENTE
  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-6">
      <div className="max-w-3xl w-full">
        
        {/* HEADER CLIENTE */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#05ABCA]/10 to-[#1C75BC]/10 border border-[#05ABCA]/30 text-[#05ABCA] px-6 py-2 rounded-full mb-6">
            <FiMessageSquare size={16} />
            <span className="font-bold uppercase tracking-wider text-xs">FJONIC Help Center</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="text-slate-400 text-lg">
            Nuestro equipo está listo para asistirte
          </p>
        </motion.header>

        {/* FORMULARIO CLIENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-3xl border border-[#05ABCA]/20 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
          
          {mostrandoExito ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <FiCheck className="text-emerald-500" size={48} />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">¡Ticket Recibido!</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed mb-8">
                Hemos recibido tu solicitud. Te notificaremos cuando tengamos una respuesta.
              </p>
              <button
                onClick={() => setMostrandoExito(false)}
                className="text-sm font-bold text-[#05ABCA] uppercase tracking-wider hover:underline"
              >
                Enviar otro ticket
              </button>
            </motion.div>
          ) : (
            <div className="p-8 md:p-12 space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* NOMBRE */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                    <FiUser size={12} />
                    Tu Nombre
                  </label>
                  <input
                    className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                    value={formCliente.usuarioNombre}
                    onChange={(e) => setFormCliente({...formCliente, usuarioNombre: e.target.value})}
                    required
                  />
                </div>

                {/* ASUNTO */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                    <FiFileText size={12} />
                    Asunto
                  </label>
                  <input
                    className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                    value={formCliente.asunto}
                    onChange={(e) => setFormCliente({...formCliente, asunto: e.target.value})}
                    placeholder="Ej: Acceso a servicios"
                    required
                  />
                </div>
              </div>

              {/* MENSAJE */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                  <FiMessageSquare size={12} />
                  Detalles del Problema
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-4 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all resize-none"
                  value={formCliente.mensaje}
                  onChange={(e) => setFormCliente({...formCliente, mensaje: e.target.value})}
                  placeholder="Explícanos tu situación..."
                  required
                />
              </div>

              {/* BOTÓN */}
              <button
                type="button"
                onClick={enviarTicketCliente}
                disabled={enviando}
                className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <FiSend size={16} />
                    Enviar Ticket de Soporte
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        <footer className="mt-8 text-center">
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            Atención profesional FJONIC STUDIO
          </p>
        </footer>
      </div>
    </div>
  );
}