'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiCreditCard,
  FiPlus,
  FiTrash2,
  FiFilter,
  FiPieChart,
  FiActivity,
  FiZap
} from 'react-icons/fi';

interface Transaccion {
  id: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  categoria: string;
  metodoPago: string;
  fecha: string;
}

export default function FinanzasPage() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'ingreso' | 'gasto'>('todos');

  const [form, setForm] = useState({
    concepto: '',
    monto: '',
    tipo: 'ingreso',
    categoria: 'Servicios',
    metodoPago: 'Transferencia'
  });

  const formatoCOP = (valor: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const ingresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastos = transacciones.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);
  const balance = ingresos - gastos;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.concepto || !form.monto) return;

    const nueva: Transaccion = {
      id: Math.random().toString(36).substr(2, 9),
      ...form,
      monto: Number(form.monto),
      fecha: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }),
      tipo: form.tipo as 'ingreso' | 'gasto'
    };
    setTransacciones([nueva, ...transacciones]);
    setForm({ ...form, concepto: '', monto: '' });
  };

  const eliminarTransaccion = (id: string) => {
    if (confirm('¿Ejecutar purga de este registro contable?')) {
      setTransacciones(prev => prev.filter(t => t.id !== id));
    }
  };

  const transaccionesFiltradas = transacciones.filter(t => 
    filtroTipo === 'todos' ? true : t.tipo === filtroTipo
  );

  const estadisticasPorMetodo = transacciones.reduce((acc, t) => {
    if (!acc[t.metodoPago]) acc[t.metodoPago] = { ingresos: 0, gastos: 0 };
    if (t.tipo === 'ingreso') acc[t.metodoPago].ingresos += t.monto;
    else acc[t.metodoPago].gastos += t.monto;
    return acc;
  }, {} as Record<string, { ingresos: number; gastos: number }>);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-amber-500/30">
      
      {/* GLOW DECORATIVO */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-8 py-12 relative z-10">
        
        {/* HEADER ESTRATÉGICO */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] rounded">Fiscal_Unit_V1</span>
                <FiZap className="text-amber-500 animate-pulse" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                Cash <span className="text-amber-500">Intelligence</span>
              </h1>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition" />
              <div className="relative bg-[#0d2640] border border-white/10 px-10 py-6 rounded-[2rem] backdrop-blur-xl">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2 text-center">Net Capital Balance</p>
                <p className={`text-4xl font-black italic tracking-tighter ${balance >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {formatoCOP(balance)}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'Inflow Total', val: ingresos, icon: FiTrendingUp, color: 'emerald', ops: transacciones.filter(t => t.tipo === 'ingreso').length },
            { label: 'Outflow Total', val: gastos, icon: FiTrendingDown, color: 'rose', ops: transacciones.filter(t => t.tipo === 'gasto').length },
            { label: 'Movimientos', val: transacciones.length, icon: FiActivity, color: 'amber', ops: 'Registros totales' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-${item.color}-500/[0.03] border border-${item.color}-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-${item.color}-500/40 transition-all`}
            >
              <item.icon className={`absolute -right-4 -bottom-4 text-8xl text-${item.color}-500/5 group-hover:scale-110 transition-transform`} />
              <p className={`text-[10px] font-black text-${item.color}-500 uppercase tracking-[0.3em] mb-4`}>{item.label}</p>
              <p className="text-3xl font-black text-white italic mb-2">
                {typeof item.val === 'number' && item.label !== 'Movimientos' ? formatoCOP(item.val) : item.val}
              </p>
              <div className={`text-[10px] font-bold text-slate-500 flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-${item.color}-500`} />
                {item.ops} {typeof item.ops === 'number' ? 'Operaciones' : ''}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* TERMINAL DE ENTRADA */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 sticky top-10 backdrop-blur-3xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <FiPlus className="text-amber-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Nueva Entrada</h3>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Data Input</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Concepto</label>
                  <input 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-amber-500/50 outline-none transition-all"
                    placeholder="Descripción del flujo..."
                    value={form.concepto}
                    onChange={(e) => setForm({...form, concepto: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest text-amber-500">Monto Operativo (COP)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input 
                      type="number"
                      className="w-full bg-white/[0.05] border border-amber-500/20 rounded-2xl py-5 pl-12 pr-6 text-xl text-white font-black outline-none focus:border-amber-500 transition-all"
                      placeholder="0"
                      value={form.monto}
                      onChange={(e) => setForm({...form, monto: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Vector</label>
                    <select 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-xs font-bold text-white outline-none cursor-pointer"
                      value={form.tipo}
                      onChange={(e) => setForm({...form, tipo: e.target.value as any})}
                    >
                      <option value="ingreso" className="bg-[#020617]">Ingreso (+)</option>
                      <option value="gasto" className="bg-[#020617]">Gasto (-)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Vía</label>
                    <select 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-xs font-bold text-white outline-none"
                      value={form.metodoPago}
                      onChange={(e) => setForm({...form, metodoPago: e.target.value})}
                    >
                      <option value="Transferencia" className="bg-[#020617]">Bancaria</option>
                      <option value="Efectivo" className="bg-[#020617]">Cash</option>
                      <option value="Tarjeta" className="bg-[#020617]">Tarjeta</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-500 text-[#020617] py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 italic"
                >
                  <FiZap size={18} /> Inyectar a Ledger
                </button>
              </form>
            </div>
          </div>

          {/* HISTORIAL Y ANALÍTICA */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* FILTROS CYBER */}
            <div className="flex items-center gap-4 px-4">
              <FiFilter className="text-amber-500" />
              <div className="flex bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl">
                {['todos', 'ingreso', 'gasto'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltroTipo(f as any)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filtroTipo === f 
                        ? 'bg-amber-500 text-[#020617] shadow-lg shadow-amber-500/20' 
                        : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    {f === 'todos' ? 'Full' : f === 'ingreso' ? 'In' : 'Out'}
                  </button>
                ))}
              </div>
            </div>

            {/* TABLA DE ALTA PRECISIÓN */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Detalle de Operación</th>
                      <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Método</th>
                      <th className="px-8 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Monto Final</th>
                      <th className="px-8 py-6 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    <AnimatePresence mode="popLayout">
                      {transaccionesFiltradas.map((t, i) => (
                        <motion.tr
                          key={t.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="group hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-8 py-6">
                            <p className="text-white font-black text-sm uppercase italic tracking-tighter group-hover:text-amber-500 transition-colors">{t.concepto}</p>
                            <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">{t.fecha} • Log_ID_{t.id.slice(0,4)}</p>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {t.metodoPago}
                            </span>
                          </td>
                          <td className={`px-8 py-6 text-right font-black italic text-lg ${t.tipo === 'ingreso' ? 'text-emerald-400' : 'text-rose-500'}`}>
                            {t.tipo === 'ingreso' ? '+' : '-'} {formatoCOP(t.monto)}
                          </td>
                          <td className="px-8 py-6 text-center">
                            <button onClick={() => eliminarTransaccion(t.id)} className="p-3 text-slate-700 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
                              <FiTrash2 size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                
                {transaccionesFiltradas.length === 0 && (
                  <div className="py-32 text-center">
                    <FiPieChart className="mx-auto text-white/5 mb-4" size={48} />
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Sin registros detectados</p>
                  </div>
                )}
              </div>
            </div>

            {/* SEGMENTACIÓN POR CANAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(estadisticasPorMetodo).map(([metodo, stats]) => (
                <div key={metodo} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl group hover:border-amber-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <FiCreditCard className="text-amber-500" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{metodo}</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Inflow</span>
                      <span className="text-xs font-black text-emerald-400 italic">{formatoCOP(stats.ingresos)}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500/40" style={{ width: stats.ingresos > 0 ? '100%' : '0%' }} />
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Outflow</span>
                      <span className="text-xs font-black text-rose-500 italic">{formatoCOP(stats.gastos)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}