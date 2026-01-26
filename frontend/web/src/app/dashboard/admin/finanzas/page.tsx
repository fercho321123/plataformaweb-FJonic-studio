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
  FiZap,
  FiCpu,
  FiBarChart2
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
    if (confirm('¿Desea eliminar este registro contable?')) {
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
    <div className="min-h-screen bg-[#020617] text-slate-400 selection:bg-[#38bdf8]/30">
      
      {/* LUZ DE FONDO SUTIL */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-[#38bdf8]/05 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 py-10 relative z-10">
        
        {/* HEADER MINIMALISTA */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <FiBarChart2 className="text-[#38bdf8] text-sm" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Sistema de Flujo de Caja</span>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Finanzas <span className="text-slate-500 font-light">FJonic</span>
              </h1>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 px-8 py-5 rounded-3xl backdrop-blur-md">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Balance Neto Actual</p>
              <p className={`text-3xl font-mono font-bold tracking-tighter ${balance >= 0 ? 'text-[#38bdf8]' : 'text-rose-400'}`}>
                {formatoCOP(balance)}
              </p>
            </div>
          </div>
        </header>

        {/* METRICS - COLORES SUAVES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Entradas', val: ingresos, icon: FiTrendingUp, color: '#38bdf8', bg: 'bg-[#38bdf8]/10' },
            { label: 'Salidas', val: gastos, icon: FiTrendingDown, color: '#94a3b8', bg: 'bg-slate-400/10' },
            { label: 'Movimientos', val: transacciones.length, icon: FiActivity, color: '#64748b', bg: 'bg-white/5' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] relative group"
            >
              <item.icon className="absolute right-6 top-6 text-2xl opacity-20" style={{ color: item.color }} />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{item.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">
                {typeof item.val === 'number' && item.label !== 'Movimientos' ? formatoCOP(item.val) : item.val}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* TERMINAL DE ENTRADA - MÁS LIMPIO */}
          <div className="lg:col-span-4">
            <div className="bg-white/[0.01] border border-white/10 rounded-[2.5rem] p-8 sticky top-10">
              <div className="flex items-center gap-3 mb-8">
                <FiCpu className="text-[#38bdf8]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Nuevo Registro</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">Descripción</label>
                  <input 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 px-5 text-sm text-white focus:border-[#38bdf8]/40 outline-none transition-all"
                    placeholder="Ej. Pago de servicios..."
                    value={form.concepto}
                    onChange={(e) => setForm({...form, concepto: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">Monto Total</label>
                  <div className="relative">
                    <input 
                      type="number"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-4 px-5 text-lg text-white font-mono font-bold outline-none focus:border-[#38bdf8]/50"
                      placeholder="0"
                      value={form.monto}
                      onChange={(e) => setForm({...form, monto: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">Tipo</label>
                    <select 
                      className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-3 px-3 text-xs text-slate-300 outline-none"
                      value={form.tipo}
                      onChange={(e) => setForm({...form, tipo: e.target.value as any})}
                    >
                      <option value="ingreso">Ingreso</option>
                      <option value="gasto">Gasto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest ml-1">Vía</label>
                    <select 
                      className="w-full bg-[#0d1117] border border-white/10 rounded-xl py-3 px-3 text-xs text-slate-300 outline-none"
                      value={form.metodoPago}
                      onChange={(e) => setForm({...form, metodoPago: e.target.value})}
                    >
                      <option value="Transferencia">Bancaria</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-[#020617] py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2"
                >
                  <FiPlus /> Registrar Operación
                </button>
              </form>
            </div>
          </div>

          {/* LISTADO - ESTILO SOFT DARK */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-2 rounded-2xl max-w-fit">
              {['todos', 'ingreso', 'gasto'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltroTipo(f as any)}
                  className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${
                    filtroTipo === f 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'todos' ? 'Ver Todo' : f === 'ingreso' ? 'Ingresos' : 'Gastos'}
                </button>
              ))}
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <th className="px-6 py-5 text-left text-[9px] font-bold text-slate-500 uppercase tracking-widest">Descripción</th>
                    <th className="px-6 py-5 text-left text-[9px] font-bold text-slate-500 uppercase tracking-widest">Vía</th>
                    <th className="px-6 py-5 text-right text-[9px] font-bold text-slate-500 uppercase tracking-widest">Valor</th>
                    <th className="px-6 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  <AnimatePresence mode="popLayout">
                    {transaccionesFiltradas.map((t) => (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group transition-colors hover:bg-white/[0.01]"
                      >
                        <td className="px-6 py-4">
                          <p className="text-slate-200 font-medium text-sm">{t.concepto}</p>
                          <p className="text-[10px] text-slate-600 font-mono mt-0.5">{t.fecha}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] text-slate-500 uppercase font-bold bg-white/5 px-2 py-1 rounded-md">
                            {t.metodoPago}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-mono font-bold ${t.tipo === 'ingreso' ? 'text-[#38bdf8]' : 'text-slate-500'}`}>
                          {t.tipo === 'ingreso' ? '+' : '-'} {formatoCOP(t.monto)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => eliminarTransaccion(t.id)} className="text-slate-700 hover:text-rose-400 p-2 transition-colors">
                            <FiTrash2 size={14} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              
              {transaccionesFiltradas.length === 0 && (
                <div className="py-20 text-center opacity-30 italic text-sm">
                  Sin registros en el sistema.
                </div>
              )}
            </div>

            {/* CANALES - ESTILO CARDS SUAVES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(estadisticasPorMetodo).map(([metodo, stats]) => (
                <div key={metodo} className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl">
                  <div className="flex items-center gap-2 mb-4">
                    <FiCreditCard className="text-slate-500 text-xs" />
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{metodo}</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-600">Entrada:</span>
                      <span className="text-[#38bdf8] font-mono font-bold">{formatoCOP(stats.ingresos)}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-600">Salida:</span>
                      <span className="text-slate-400 font-mono font-bold">{formatoCOP(stats.gastos)}</span>
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