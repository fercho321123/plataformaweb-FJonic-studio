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

  const eliminarProyecto = async (id: string) => {
    if (!confirm('¿Terminar misión? Esta acción es irreversible.')) return;
    try {
      // Ajuste para asegurar que el ID sea el correcto (id o _id)
      await apiFetch(`/proyectos/${id}`, { method: 'DELETE' });
      setProyectos(prev => prev.filter(p => (p.id || p._id) !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch(prioridad) {
      case 'Alta': return 'bg-rose-500/10 border-rose-500/40 text-rose-400';
      case 'Media': return 'bg-amber-500/10 border-amber-500/40 text-amber-400';
      case 'Baja': return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
      default: return 'bg-slate-500/10 border-slate-500/40 text-slate-400';
    }
  };

  const obtenerNombreCliente = (clienteId: string) => {
    const cliente = clientes.find(c => (c.id || c._id) === clienteId);
    return cliente?.empresa || 'Sin cliente';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      
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
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 min-w-[140px]">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Activos</p>
              <p className="text-3xl font-black text-[#05ABCA] leading-none">{proyectos.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 pb-20 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* FORMULARIO */}
        <aside className="xl:col-span-4">
          <div className="sticky top-10 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-2xl">
            <form onSubmit={manejarEnvio} className="space-y-4">
              
              {/* Nombre y Cliente */}
              <div className="space-y-4">
                <div className="group">
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Proyecto</label>
                  <div className="relative">
                    <FiLayers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-[#05ABCA] outline-none" placeholder="Nombre..." value={datosForm.nombre} onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Cliente</label>
                  <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.clienteId} onChange={(e) => setDatosForm({ ...datosForm, clienteId: e.target.value })} required>
                    <option value="" className="bg-[#020617]">Seleccionar cliente...</option>
                    {clientes.map(c => <option key={c.id || c._id} value={c.id || c._id} className="bg-[#020617]">{c.empresa}</option>)}
                  </select>
                </div>
              </div>

              {/* Tipo y Líder */}
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

              {/* Fecha y Presupuesto */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Deadline</label>
                  <input type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.fechaEntrega} onChange={(e) => setDatosForm({ ...datosForm, fechaEntrega: e.target.value })} required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Presupuesto</label>
                  <input type="number" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="0" value={datosForm.presupuestoTotal} onChange={(e) => setDatosForm({ ...datosForm, presupuestoTotal: e.target.value })} required />
                </div>
              </div>

              {/* Estado de Pago y Prioridad */}
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

              {/* Descripción */}
              <div>
                <label className="text-[10px] font-black text-[#05ABCA] uppercase ml-1">Descripción</label>
                <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 px-4 text-sm text-white outline-none focus:border-[#05ABCA] h-20 resize-none" placeholder="Breve descripción..." value={datosForm.descripcion} onChange={(e) => setDatosForm({ ...datosForm, descripcion: e.target.value })} required />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                <FiZap className="inline mr-2" /> Inicializar Proyecto
              </button>
              {error && <p className="text-rose-400 text-[10px] text-center font-bold uppercase">{error}</p>}
            </form>
          </div>
        </aside>

        {/* LISTADO */}
        <section className="xl:col-span-8 space-y-4">
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {proyectos.map((p, idx) => (
                <motion.div key={p.id || p._id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">{p.nombre}</h3>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${obtenerColorPrioridad(p.prioridad)}`}>{p.prioridad}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-slate-500">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase"><FiTag className="text-[#05ABCA]" /> {p.tipo}</span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase"><FiUser className="text-[#05ABCA]" /> {obtenerNombreCliente(p.clienteId)}</span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase"><FiCreditCard className="text-[#05ABCA]" /> {p.estadoPago}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 lg:border-l lg:border-white/5 lg:pl-6">
                      <div className="text-right">
                        <p className="text-[9px] font-black text-slate-600 uppercase">Inversión</p>
                        <p className="text-sm font-black text-white italic">${Number(p.presupuestoTotal || 0).toLocaleString('es-CO')}</p>
                      </div>
                      <button onClick={() => eliminarProyecto(p.id || p._id)} className="w-10 h-10 rounded-xl bg-rose-500/5 text-rose-500/40 hover:text-rose-500 transition-all flex items-center justify-center">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}