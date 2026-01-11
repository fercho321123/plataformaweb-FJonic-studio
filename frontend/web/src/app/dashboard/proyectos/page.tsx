'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
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

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [resProyectos, resClientes] = await Promise.all([
        fetch('http://localhost:3001/proyectos', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:3001/clientes', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      const dataProyectos = await resProyectos.json();
      const dataClientes = await resClientes.json();

      setProyectos(Array.isArray(dataProyectos) ? dataProyectos : []);
      setClientes(Array.isArray(dataClientes) ? dataClientes : []);
    } catch {
      setError('Error al conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarTodo();
  }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/proyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(datosForm),
      });

      if (res.ok) {
        setDatosForm({
          nombre: '', clienteId: '', tipo: 'Marketing Digital',
          prioridad: 'Media', liderProyecto: '', fechaEntrega: '',
          presupuestoTotal: '', descripcion: '', estadoPago: 'Pendiente'
        });
        cargarTodo();
      }
    } catch {
      setError('No se pudo crear el proyecto');
    }
  };

  const eliminarProyecto = async (id: string) => {
    if (!confirm('¿Borrar este proyecto? Se perderá todo el historial.')) return;
    await fetch(`http://localhost:3001/proyectos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setProyectos(prev => prev.filter(p => p.id !== id));
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
      <div className="fixed inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#05ABCA 1px, transparent 1px), linear-gradient(90deg, #05ABCA 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* LÍNEAS BRILLANTES ANIMADAS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent"
          style={{ width: '100%', top: '20%' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-px bg-gradient-to-b from-transparent via-[#1C75BC]/50 to-transparent"
          style={{ height: '100%', left: '30%' }}
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* HEADER FUTURISTA */}
      <header className="relative border-b border-[#05ABCA]/10 bg-[#0A1F33]/40 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Proyectos
                </h1>
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#05ABCA]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-[#05ABCA]/60 text-sm font-medium ml-4">
                Gestión inteligente de proyectos y operaciones
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-[#05ABCA]">{proyectos.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Activos</div>
              </div>
              <div className="w-px h-12 bg-[#05ABCA]/20" />
              <FiActivity className="text-[#05ABCA] animate-pulse" size={24} />
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-[1600px] mx-auto px-8 py-10 grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* PANEL DE CREACIÓN FUTURISTA */}
        <aside className="xl:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-6"
          >
            <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden">
              
              {/* GLOW EFFECT */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
              
              {/* HEADER */}
              <div className="relative p-6 border-b border-[#05ABCA]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                    <FiPlus className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Nuevo Proyecto</h2>
                    <p className="text-xs text-[#05ABCA]/60">Inicializar configuración</p>
                  </div>
                </div>
              </div>

              {/* FORMULARIO */}
              <div className="p-6">
                <div className="space-y-5">
                  
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiLayers size={12} />
                      Nombre del Proyecto
                    </label>
                    <input
                      placeholder="Proyecto Alpha..."
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                      value={datosForm.nombre}
                      onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })}
                      required
                    />
                  </div>

                  {/* Cliente */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiUser size={12} />
                      Cliente Asignado
                    </label>
                    <select
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all cursor-pointer"
                      value={datosForm.clienteId}
                      onChange={(e) => setDatosForm({ ...datosForm, clienteId: e.target.value })}
                      required
                    >
                      <option value="" className="bg-[#0A1F33]">Seleccionar cliente...</option>
                      {clientes.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#0A1F33]">{c.empresa}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tipo y Prioridad */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                        Tipo
                      </label>
                      <select
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all cursor-pointer"
                        value={datosForm.tipo}
                        onChange={(e) => setDatosForm({ ...datosForm, tipo: e.target.value })}
                      >
                        <option className="bg-[#0A1F33]">Marketing Digital</option>
                        <option className="bg-[#0A1F33]">Desarrollo Web</option>
                        <option className="bg-[#0A1F33]">Branding</option>
                        <option className="bg-[#0A1F33]">Pauta Publicitaria</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                        Prioridad
                      </label>
                      <select
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all cursor-pointer"
                        value={datosForm.prioridad}
                        onChange={(e) => setDatosForm({ ...datosForm, prioridad: e.target.value })}
                      >
                        <option value="Alta" className="bg-[#0A1F33]">Alta</option>
                        <option value="Media" className="bg-[#0A1F33]">Media</option>
                        <option value="Baja" className="bg-[#0A1F33]">Baja</option>
                      </select>
                    </div>
                  </div>

                  {/* Responsable */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                      Responsable
                    </label>
                    <input
                      placeholder="Nombre del líder..."
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all"
                      value={datosForm.liderProyecto}
                      onChange={(e) => setDatosForm({ ...datosForm, liderProyecto: e.target.value })}
                    />
                  </div>

                  {/* Fecha */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiCalendar size={12} />
                      Fecha de Entrega
                    </label>
                    <input
                      type="date"
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all"
                      value={datosForm.fechaEntrega}
                      onChange={(e) => setDatosForm({ ...datosForm, fechaEntrega: e.target.value })}
                      required
                    />
                  </div>

                  {/* Presupuesto */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiDollarSign size={12} />
                      Presupuesto Total
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA] font-bold">$</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all"
                        value={datosForm.presupuestoTotal}
                        onChange={(e) => setDatosForm({ ...datosForm, presupuestoTotal: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Botón Submit */}
                  <motion.button
                    type="button"
                    onClick={manejarEnvio}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#05ABCA]/20 hover:shadow-[#05ABCA]/40 transition-all"
                  >
                    <FiZap size={16} />
                    Inicializar Proyecto
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* TABLA FUTURISTA */}
        <section className="xl:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
          >
            
            {/* GLOW TOP */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />

            {/* TABLA */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#05ABCA]/10">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Proyecto
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Cliente
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Tipo
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Prioridad
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Responsable
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Entrega
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">
                      Presupuesto
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {proyectos.map((p, index) => (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-[#05ABCA]/5 hover:bg-[#05ABCA]/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{p.nombre}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{p.tipo}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {obtenerNombreCliente(p.clienteId)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1C75BC]/20 text-[#1C75BC] border border-[#1C75BC]/30">
                            {p.tipo}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r border ${obtenerColorPrioridad(p.prioridad)}`}>
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-current"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            {p.prioridad}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">
                          {p.liderProyecto || '—'}
                        </td>
                        <td className="px-6 py-4 text-[#05ABCA] font-medium">
                          {p.fechaEntrega}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          ${Number(p.presupuestoTotal).toLocaleString('es-CO')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => eliminarProyecto(p.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              {proyectos.length === 0 && (
                <div className="py-32 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#05ABCA]/20 to-[#1C75BC]/20 border border-[#05ABCA]/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <FiCheckCircle className="text-[#05ABCA]" size={36} />
                  </motion.div>
                  <p className="text-slate-400 font-medium text-lg mb-2">
                    Sin proyectos activos
                  </p>
                  <p className="text-slate-500 text-sm">
                    Inicializa tu primer proyecto para comenzar
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}