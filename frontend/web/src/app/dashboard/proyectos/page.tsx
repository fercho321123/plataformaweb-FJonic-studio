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
  FiTag,
  FiFileText,
  FiCreditCard
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

  const eliminarProyecto = async (idOriginal: any) => {
    // ELIMINACIÓN DE ERROR "numeric string is expected":
    // Forzamos que el ID sea una cadena de texto plana.
    const idParaBorrar = String(idOriginal);

    if (!confirm('¿Terminar misión? Esta acción es irreversible.')) return;
    
    try {
      await apiFetch(`/proyectos/${idParaBorrar}`, { method: 'DELETE' });
      // Filtramos usando la misma lógica de comparación de strings
      setProyectos(prev => prev.filter(p => String(p.id || p._id) !== idParaBorrar));
    } catch (err: any) {
      alert(`Fallo en purga: ${err.message}`);
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch(prioridad) {
      case 'Alta': return 'bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
      case 'Media': return 'bg-amber-500/10 border-amber-500/40 text-amber-400';
      case 'Baja': return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
      default: return 'bg-slate-500/10 border-slate-500/40 text-slate-400';
    }
  };

  const obtenerNombreCliente = (clienteId: string) => {
    const cliente = clientes.find(c => String(c.id || c._id) === String(clienteId));
    return cliente?.empresa || 'Sin cliente asignado';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-[#05ABCA]/30">
      
      <header className="relative pt-10 pb-10 px-6 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#05ABCA]/10 border border-[#05ABCA]/30 rounded-full text-[#05ABCA] text-[10px] font-black uppercase tracking-[0.2em]">Operaciones</span>
              <div className="w-2 h-2 rounded-full bg-[#05ABCA] animate-pulse shadow-[0_0_10px_#05ABCA]" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Control de Proyectos</h1>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 min-w-[140px] backdrop-blur-md">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Activos</p>
              <p className="text-3xl font-black text-[#05ABCA] leading-none">{proyectos.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 pb-20 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* PANEL DE REGISTRO */}
        <aside className="xl:col-span-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-lg shadow-[#05ABCA]/20">
                <FiPlus className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-tighter italic">Nueva Misión</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Configurar parámetros</p>
              </div>
            </div>

            <form onSubmit={manejarEnvio} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Proyecto</label>
                <div className="relative">
                  <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-[#05ABCA] outline-none transition-all" placeholder="Ej: Rediseño Web" value={datosForm.nombre} onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })} required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Cliente</label>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.clienteId} onChange={(e) => setDatosForm({ ...datosForm, clienteId: e.target.value })} required>
                  <option value="" className="bg-[#020617]">Seleccionar cliente...</option>
                  {clientes.map(c => <option key={c.id || c._id} value={c.id || c._id} className="bg-[#020617]">{c.empresa}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Tipo</label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.tipo} onChange={(e) => setDatosForm({ ...datosForm, tipo: e.target.value })}>
                    <option value="Marketing Digital" className="bg-[#020617]">Marketing</option>
                    <option value="Desarrollo Web" className="bg-[#020617]">Web</option>
                    <option value="Diseño" className="bg-[#020617]">Diseño</option>
                    <option value="Consultoría" className="bg-[#020617]">Consultoría</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Líder</label>
                  <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="Nombre líder" value={datosForm.liderProyecto} onChange={(e) => setDatosForm({ ...datosForm, liderProyecto: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Entrega</label>
                  <input type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.fechaEntrega} onChange={(e) => setDatosForm({ ...datosForm, fechaEntrega: e.target.value })} required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Inversión ($)</label>
                  <input type="number" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="0" value={datosForm.presupuestoTotal} onChange={(e) => setDatosForm({ ...datosForm, presupuestoTotal: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Pago</label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.estadoPago} onChange={(e) => setDatosForm({ ...datosForm, estadoPago: e.target.value })}>
                    <option value="Pendiente" className="bg-[#020617]">Pendiente</option>
                    <option value="Parcial" className="bg-[#020617]">Parcial</option>
                    <option value="Pagado" className="bg-[#020617]">Pagado</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Prioridad</label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.prioridad} onChange={(e) => setDatosForm({ ...datosForm, prioridad: e.target.value })}>
                    <option value="Alta" className="bg-[#020617]">Alta</option>
                    <option value="Media" className="bg-[#020617]">Media</option>
                    <option value="Baja" className="bg-[#020617]">Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Descripción</label>
                <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA] h-20 resize-none" placeholder="Alcance del proyecto..." value={datosForm.descripcion} onChange={(e) => setDatosForm({ ...datosForm, descripcion: e.target.value })} required />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#05ABCA]/20 hover:scale-[1.02] transition-all">
                <FiZap className="inline mr-2" /> Desplegar Proyecto
              </button>
              {error && <p className="text-rose-400 text-[10px] text-center font-bold uppercase tracking-widest">{error}</p>}
            </form>
          </motion.div>
        </aside>

        {/* LISTADO DE PROYECTOS */}
        <section className="xl:col-span-8 space-y-4">
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {proyectos.map((p, idx) => (
                <motion.div
                  key={p.id || p._id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl p-6 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-black text-white group-hover:text-[#05ABCA] transition-colors italic uppercase tracking-tighter">{p.nombre}</h3>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase tracking-widest ${obtenerColorPrioridad(p.prioridad)}`}>
                          {p.prioridad}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-slate-500">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"><FiTag className="text-[#05ABCA]" /> {p.tipo}</span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"><FiUser className="text-[#05ABCA]" /> {obtenerNombreCliente(p.clienteId)}</span>
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${p.estadoPago === 'Pagado' ? 'text-emerald-500' : ''}`}>
                          <FiCreditCard /> {p.estadoPago}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 lg:border-l lg:border-white/5 lg:pl-6">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Inversión</p>
                        <p className="text-sm font-black text-white">${Number(p.presupuestoTotal || 0).toLocaleString('es-CO')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Deadline</p>
                        <p className="text-sm font-black text-[#05ABCA] flex items-center gap-1"><FiCalendar size={12}/> {p.fechaEntrega}</p>
                      </div>
                      <button 
                        onClick={() => eliminarProyecto(p.id || p._id)} 
                        className="w-10 h-10 rounded-xl bg-rose-500/5 text-rose-500/30 hover:text-rose-500 hover:bg-rose-500/10 transition-all flex items-center justify-center border border-transparent hover:border-rose-500/20"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#05ABCA]/10 to-transparent" />
                </motion.div>
              ))}
            </AnimatePresence>

            {proyectos.length === 0 && !cargando && (
              <div className="py-32 flex flex-col items-center justify-center bg-white/[0.01] border border-dashed border-white/10 rounded-[2rem]">
                <FiCheckCircle className="text-white/5 mb-6" size={60} />
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Hangar Vacío - No hay misiones activas</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}