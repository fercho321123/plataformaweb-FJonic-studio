'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api'; // Importación vital para producción
import {
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiLayers,
  FiCheckCircle,
  FiZap,
  FiActivity
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

  // 1. CARGA DE DATOS (Sincronizada)
  const cargarTodo = async () => {
    try {
      setCargando(true);
      // Usamos apiFetch para evitar problemas de URL y Token manual
      const [dataProyectos, dataClientes] = await Promise.all([
        apiFetch('/proyectos'),
        apiFetch('/clientes')
      ]);

      setProyectos(Array.isArray(dataProyectos) ? dataProyectos : []);
      setClientes(Array.isArray(dataClientes) ? dataClientes : []);
    } catch (err: any) {
      setError('Error al sincronizar con el centro de mando');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarTodo();
  }, [token]);

  // 2. CREACIÓN DE PROYECTO
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

  // 3. ELIMINACIÓN
  const eliminarProyecto = async (id: string) => {
    if (!confirm('¿Borrar este proyecto? Se perderá todo el historial.')) return;
    
    try {
      await apiFetch(`/proyectos/${id}`, { method: 'DELETE' });
      setProyectos(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch(prioridad) {
      case 'Alta': return 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400';
      case 'Media': return 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400';
      case 'Baja': return 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400';
      default: return 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400';
    }
  };

  const obtenerNombreCliente = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente?.empresa || 'Sin cliente';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F33] via-[#0d2640] to-[#0A1F33]">
      
      {/* GRID DE FONDO TECNOLÓGICO */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#05ABCA 1px, transparent 1px), linear-gradient(90deg, #05ABCA 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* HEADER FUTURISTA */}
      <header className="relative border-b border-[#05ABCA]/10 bg-[#0A1F33]/40 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
                <h1 className="text-3xl font-bold text-white tracking-tight">Proyectos</h1>
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#05ABCA]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-[#05ABCA]/60 text-sm font-medium ml-4">
                Gestión inteligente de operaciones - FJonic Studio
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-[#05ABCA]">{proyectos.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">En Curso</div>
              </div>
              <div className="w-px h-12 bg-[#05ABCA]/20" />
              <FiActivity className="text-[#05ABCA] animate-pulse" size={24} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1600px] mx-auto px-8 py-10 grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* PANEL DE CREACIÓN */}
        <aside className="xl:col-span-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-6">
            <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden">
              <div className="p-6 border-b border-[#05ABCA]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-lg shadow-[#05ABCA]/20">
                    <FiPlus className="text-white" size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-white">Nuevo Proyecto</h2>
                </div>
              </div>

              <form onSubmit={manejarEnvio} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase flex items-center gap-2"><FiLayers size={12} /> Nombre</label>
                  <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" value={datosForm.nombre} onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })} required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase flex items-center gap-2"><FiUser size={12} /> Cliente</label>
                  <select className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.clienteId} onChange={(e) => setDatosForm({ ...datosForm, clienteId: e.target.value })} required>
                    <option value="" className="bg-[#0A1F33]">Seleccionar cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id} className="bg-[#0A1F33]">{c.empresa}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase">Tipo</label>
                    <select className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.tipo} onChange={(e) => setDatosForm({ ...datosForm, tipo: e.target.value })}>
                      <option className="bg-[#0A1F33]">Marketing Digital</option>
                      <option className="bg-[#0A1F33]">Desarrollo Web</option>
                      <option className="bg-[#0A1F33]">Branding</option>
                      <option className="bg-[#0A1F33]">Pauta Publicitaria</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase">Prioridad</label>
                    <select className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" value={datosForm.prioridad} onChange={(e) => setDatosForm({ ...datosForm, prioridad: e.target.value })}>
                      <option value="Alta" className="bg-[#0A1F33]">Alta</option>
                      <option value="Media" className="bg-[#0A1F33]">Media</option>
                      <option value="Baja" className="bg-[#0A1F33]">Baja</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase flex items-center gap-2"><FiCalendar size={12} /> Entrega</label>
                  <input type="date" className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none" value={datosForm.fechaEntrega} onChange={(e) => setDatosForm({ ...datosForm, fechaEntrega: e.target.value })} required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#05ABCA] uppercase flex items-center gap-2"><FiDollarSign size={12} /> Presupuesto</label>
                  <input type="number" className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none" value={datosForm.presupuestoTotal} onChange={(e) => setDatosForm({ ...datosForm, presupuestoTotal: e.target.value })} />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-[#05ABCA]/40 transition-all">
                  <FiZap size={18} /> Inicializar Proyecto
                </button>
                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
              </form>
            </div>
          </motion.div>
        </aside>

        {/* LISTADO DE PROYECTOS */}
        <section className="xl:col-span-8">
          <div className="bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-[#05ABCA]/10 text-[#05ABCA] text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Proyecto</th>
                    <th className="px-6 py-5">Cliente</th>
                    <th className="px-6 py-5">Prioridad</th>
                    <th className="px-6 py-5">Entrega</th>
                    <th className="px-6 py-5">Inversión</th>
                    <th className="px-6 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#05ABCA]/5">
                  <AnimatePresence mode="popLayout">
                    {proyectos.map((p) => (
                      <motion.tr key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group hover:bg-[#05ABCA]/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{p.nombre}</div>
                          <div className="text-[10px] text-slate-400">{p.tipo}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300">{obtenerNombreCliente(p.clienteId)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${obtenerColorPrioridad(p.prioridad)}`}>
                            {p.prioridad}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-[#05ABCA]">{p.fechaEntrega}</td>
                        <td className="px-6 py-4 font-bold text-white text-sm">${Number(p.presupuestoTotal || 0).toLocaleString('es-CO')}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => eliminarProyecto(p.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors"><FiTrash2 size={16} /></button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              
              {proyectos.length === 0 && !cargando && (
                <div className="py-20 text-center">
                  <FiCheckCircle className="mx-auto text-[#05ABCA]/20 mb-4" size={48} />
                  <p className="text-slate-500 text-sm italic">No hay misiones activas en este momento</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}