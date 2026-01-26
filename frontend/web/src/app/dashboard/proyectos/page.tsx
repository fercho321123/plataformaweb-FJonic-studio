'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import {
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiLayers,
  FiCheckCircle,
  FiZap,
  FiActivity,
  FiSearch,
  FiTag,
  FiTarget,
  FiTrendingUp
} from 'react-icons/fi';

export default function PaginaProyectos() {
  const { token } = useAuth();
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [datosForm, setDatosForm] = useState({
    nombre: '',
    clienteId: '',
    tipo: 'Marketing Digital',
    prioridad: 'Media',
    liderProyecto: '',
    fechaEntrega: '',
    presupuestoTotal: '',
    descripcion: '',
    estadoPago: 'Pendiente'
  });

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [dataProyectos, dataClientes] = await Promise.all([
        apiFetch('/proyectos'),
        apiFetch('/clientes')
      ]);
      setProyectos(Array.isArray(dataProyectos) ? dataProyectos : []);
      setClientes(Array.isArray(dataClientes) ? dataClientes : []);
    } catch (err: any) {
      setError('Error de sincronización con el núcleo');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarTodo();
  }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/proyectos', {
        method: 'POST',
        body: JSON.stringify(datosForm),
      });
      setDatosForm({
        nombre: '', clienteId: '', tipo: 'Marketing Digital',
        prioridad: 'Media', liderProyecto: '', fechaEntrega: '',
        presupuestoTotal: '', descripcion: '', estadoPago: 'Pendiente'
      });
      cargarTodo();
    } catch (err: any) {
      setError(err.message || 'Error al inicializar proyecto');
    }
  };

  const eliminarProyecto = async (id: string) => {
    if (!confirm('¿Terminar misión? Esta acción es irreversible.')) return;
    try {
      await apiFetch(`/proyectos/${id}`, { method: 'DELETE' });
      setProyectos(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch(prioridad) {
      case 'Alta': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'Media': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Baja': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      default: return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const obtenerNombreCliente = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente?.empresa || 'Cliente No Identificado';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-[#05ABCA]/30">
      
      {/* DECORACIÓN DE FONDO */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-[#05ABCA]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-[#1C75BC]/5 rounded-full blur-[120px]" />
      </div>

      <header className="relative pt-12 pb-8 px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-gradient-to-r from-[#05ABCA]/20 to-transparent border-l-2 border-[#05ABCA] text-[#05ABCA] text-[10px] font-bold uppercase tracking-[0.3em]">
                System_OS / Proyectos
              </div>
              <FiTarget className="text-[#05ABCA] animate-spin-slow" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Control de <span className="text-[#05ABCA]">Misiones</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Activos Totales</p>
              <p className="text-4xl font-black text-white">{proyectos.length}</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="bg-[#05ABCA]/10 p-4 rounded-2xl border border-[#05ABCA]/20">
              <FiActivity className="text-[#05ABCA] text-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1600px] mx-auto px-8 pb-20 grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* PANEL LATERAL: CREACIÓN */}
        <aside className="xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-10"
          >
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl overflow-hidden relative group">
              {/* Efecto de luz al hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent opacity-50" />
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-xl shadow-[#05ABCA]/20 group-hover:scale-110 transition-transform">
                  <FiPlus className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase italic">Nuevo Registro</h3>
                  <p className="text-[#05ABCA] text-[9px] font-bold uppercase tracking-widest">Despliegue de parámetros</p>
                </div>
              </div>

              <form onSubmit={manejarEnvio} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Nombre del activo</label>
                  <div className="relative group">
                    <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#05ABCA] transition-colors" />
                    <input 
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#05ABCA]/50 focus:bg-[#05ABCA]/5 transition-all outline-none" 
                      placeholder="Identificador del proyecto..." 
                      value={datosForm.nombre} 
                      onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Asignar Cliente</label>
                  <select 
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm text-white appearance-none focus:border-[#05ABCA]/50 outline-none cursor-pointer" 
                    value={datosForm.clienteId} 
                    onChange={(e) => setDatosForm({ ...datosForm, clienteId: e.target.value })} 
                    required
                  >
                    <option value="" className="bg-[#020617]">Seleccionar entidad...</option>
                    {clientes.map(c => <option key={c.id} value={c.id} className="bg-[#020617]">{c.empresa}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Prioridad</label>
                    <select className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-4 text-sm text-white outline-none focus:border-[#05ABCA]/50" value={datosForm.prioridad} onChange={(e) => setDatosForm({ ...datosForm, prioridad: e.target.value })}>
                      <option value="Alta" className="bg-[#020617]">Alta</option>
                      <option value="Media" className="bg-[#020617]">Media</option>
                      <option value="Baja" className="bg-[#020617]">Baja</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Finalización</label>
                    <input type="date" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-4 text-sm text-white outline-none focus:border-[#05ABCA]/50" value={datosForm.fechaEntrega} onChange={(e) => setDatosForm({ ...datosForm, fechaEntrega: e.target.value })} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Inversión Estimada</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA]" />
                    <input type="number" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#05ABCA]/50" placeholder="0.00" value={datosForm.presupuestoTotal} onChange={(e) => setDatosForm({ ...datosForm, presupuestoTotal: e.target.value })} />
                  </div>
                </div>

                <button type="submit" className="w-full bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] hover:from-[#06c2e6] hover:to-[#218ae0] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-[#05ABCA]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                  <FiZap className="text-base" /> Iniciar Protocolo
                </button>
                {error && <p className="text-rose-500 text-[10px] font-bold text-center uppercase tracking-widest animate-bounce">{error}</p>}
              </form>
            </div>
          </motion.div>
        </aside>

        {/* CONTENIDO PRINCIPAL: LISTADO */}
        <section className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <FiTrendingUp className="text-[#05ABCA]" />
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Registros en tiempo real</h2>
            </div>
            <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {proyectos.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#05ABCA]/30 rounded-[2rem] p-8 transition-all duration-500 ease-out"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    {/* Info Principal */}
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${obtenerColorPrioridad(p.prioridad)}`}>
                          {p.prioridad}
                        </span>
                        <h3 className="text-2xl font-black text-white group-hover:text-[#05ABCA] transition-colors tracking-tighter italic uppercase">
                          {p.nombre}
                        </h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex items-center gap-2 text-slate-400">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <FiTag className="text-[#05ABCA] text-xs" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider">{p.tipo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                            <FiUser className="text-[#05ABCA] text-xs" />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider">{obtenerNombreCliente(p.clienteId)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats e Interacción */}
                    <div className="flex items-center gap-10">
                      <div className="text-right space-y-1">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Inversión</p>
                        <p className="text-xl font-black text-white tracking-tighter">
                          ${Number(p.presupuestoTotal || 0).toLocaleString('es-CO')}
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Entrega</p>
                        <div className="flex items-center justify-end gap-2 text-[#05ABCA] font-black italic text-sm">
                          <FiCalendar size={14} />
                          {p.fechaEntrega}
                        </div>
                      </div>

                      <button 
                        onClick={() => eliminarProyecto(p.id)} 
                        className="w-12 h-12 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-500/20 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/40 transition-all hover:rotate-12"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Línea de progreso decorativa */}
                  <div className="mt-8 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-transparent via-[#05ABCA]/40 to-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {proyectos.length === 0 && !cargando && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]"
              >
                <div className="relative mb-6">
                  <FiCheckCircle className="text-[#05ABCA]/10" size={100} />
                  <FiZap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#05ABCA] animate-pulse" size={40} />
                </div>
                <h3 className="text-white font-black uppercase tracking-[0.5em] italic">Sin misiones activas</h3>
                <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase">Esperando inicialización de sistema...</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}