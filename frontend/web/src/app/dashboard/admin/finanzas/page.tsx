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
    const nueva: Transaccion = {
      id: Math.random().toString(),
      ...form,
      monto: Number(form.monto),
      fecha: new Date().toLocaleDateString('es-CO'),
      tipo: form.tipo as 'ingreso' | 'gasto'
    };
    setTransacciones([nueva, ...transacciones]);
    setForm({ ...form, concepto: '', monto: '' });
  };

  const eliminarTransaccion = (id: string) => {
    if (confirm('¿Eliminar esta transacción?')) {
      setTransacciones(prev => prev.filter(t => t.id !== id));
    }
  };

  const transaccionesFiltradas = transacciones.filter(t => 
    filtroTipo === 'todos' ? true : t.tipo === filtroTipo
  );

  // Calcular estadísticas por método de pago
  const estadisticasPorMetodo = transacciones.reduce((acc, t) => {
    if (!acc[t.metodoPago]) {
      acc[t.metodoPago] = { ingresos: 0, gastos: 0 };
    }
    if (t.tipo === 'ingreso') {
      acc[t.metodoPago].ingresos += t.monto;
    } else {
      acc[t.metodoPago].gastos += t.monto;
    }
    return acc;
  }, {} as Record<string, { ingresos: number; gastos: number }>);

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-8">
        
        {/* HEADER FUTURISTA */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                  Control Financiero
                </h1>
                <p className="text-amber-500/60 text-sm font-medium">
                  Gestión de capital y flujo de caja
                </p>
              </div>
            </div>
            
            {/* BALANCE PRINCIPAL */}
            <div className="bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl px-8 py-4">
              <p className="text-[10px] font-bold uppercase text-amber-500 tracking-widest mb-1">Balance Disponible</p>
              <p className={`text-3xl font-black ${balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatoCOP(balance)}
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent" />
        </header>

        {/* TARJETAS DE RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* INGRESOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-xl rounded-2xl border border-emerald-500/30 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="p-6 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest mb-2">Ingresos Totales</p>
                <p className="text-3xl font-black text-white mb-1">{formatoCOP(ingresos)}</p>
                <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <FiTrendingUp size={12} />
                  {transacciones.filter(t => t.tipo === 'ingreso').length} operaciones
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <FiTrendingUp className="text-white" size={24} />
              </div>
            </div>
          </motion.div>

          {/* GASTOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl rounded-2xl border border-red-500/30 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <div className="p-6 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase text-red-400 tracking-widest mb-2">Gastos Totales</p>
                <p className="text-3xl font-black text-white mb-1">{formatoCOP(gastos)}</p>
                <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                  <FiTrendingDown size={12} />
                  {transacciones.filter(t => t.tipo === 'gasto').length} operaciones
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <FiTrendingDown className="text-white" size={24} />
              </div>
            </div>
          </motion.div>

          {/* TRANSACCIONES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-br from-[#05ABCA]/20 to-[#1C75BC]/10 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/30 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            <div className="p-6 flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#05ABCA] tracking-widest mb-2">Total Movimientos</p>
                <p className="text-3xl font-black text-white mb-1">{transacciones.length}</p>
                <p className="text-xs text-[#05ABCA] font-medium flex items-center gap-1">
                  <FiBarChart2 size={12} />
                  Este periodo
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] rounded-xl flex items-center justify-center shadow-lg shadow-[#05ABCA]/30">
                <FiPieChart className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORMULARIO */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-6 relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
              
              <div className="p-6 border-b border-[#05ABCA]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                    <FiPlus className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Nuevo Registro</h3>
                    <p className="text-xs text-[#05ABCA]/60">Operación financiera</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  
                  {/* CONCEPTO */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                      Concepto del movimiento
                    </label>
                    <input 
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                      placeholder="Pago de servicios..."
                      value={form.concepto}
                      onChange={(e) => setForm({...form, concepto: e.target.value})}
                      required
                    />
                  </div>

                  {/* MONTO */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiDollarSign size={12} />
                      Monto en Pesos (COP)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA] font-bold text-lg">$</span>
                      <input 
                        type="number"
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-8 pr-4 py-4 text-lg text-white font-bold placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all"
                        placeholder="0"
                        value={form.monto}
                        onChange={(e) => setForm({...form, monto: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* TIPO Y MÉTODO */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                        Tipo
                      </label>
                      <select 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm font-semibold text-white outline-none focus:border-[#05ABCA] cursor-pointer"
                        value={form.tipo}
                        onChange={(e) => setForm({...form, tipo: e.target.value as any})}
                      >
                        <option value="ingreso" className="bg-[#0A1F33]">Ingreso (+)</option>
                        <option value="gasto" className="bg-[#0A1F33]">Gasto (-)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-1">
                        <FiCreditCard size={10} />
                        Método
                      </label>
                      <select 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm font-semibold text-white outline-none focus:border-[#05ABCA] cursor-pointer"
                        value={form.metodoPago}
                        onChange={(e) => setForm({...form, metodoPago: e.target.value})}
                      >
                        <option value="Transferencia" className="bg-[#0A1F33]">Transferencia</option>
                        <option value="Efectivo" className="bg-[#0A1F33]">Efectivo</option>
                        <option value="Tarjeta" className="bg-[#0A1F33]">Tarjeta</option>
                      </select>
                    </div>
                  </div>

                  {/* BOTÓN */}
                  <button 
                    onClick={handleSubmit}
                    type="button"
                    className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <FiPlus size={16} />
                    Registrar Movimiento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TABLA DE TRANSACCIONES */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* FILTROS */}
            <div className="flex items-center gap-3">
              <FiFilter className="text-[#05ABCA]" size={18} />
              <div className="flex gap-2">
                <button
                  onClick={() => setFiltroTipo('todos')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filtroTipo === 'todos'
                      ? 'bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white'
                      : 'bg-[#0A1F33]/50 border border-[#05ABCA]/20 text-slate-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFiltroTipo('ingreso')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filtroTipo === 'ingreso'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#0A1F33]/50 border border-emerald-500/20 text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  Ingresos
                </button>
                <button
                  onClick={() => setFiltroTipo('gasto')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filtroTipo === 'gasto'
                      ? 'bg-red-500 text-white'
                      : 'bg-[#0A1F33]/50 border border-red-500/20 text-slate-400 hover:text-red-400'
                  }`}
                >
                  Gastos
                </button>
              </div>
            </div>

            {/* TABLA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
              
              <div className="p-6 border-b border-[#05ABCA]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA]/20 to-[#1C75BC]/20 border border-[#05ABCA]/30 flex items-center justify-center">
                    <FiCalendar className="text-[#05ABCA]" size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Historial de Operaciones</h3>
                    <p className="text-xs text-[#05ABCA]/60">{transaccionesFiltradas.length} registros</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#05ABCA]/10">
                    <tr className="text-left">
                      <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">Detalle</th>
                      <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">Método</th>
                      <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs text-right">Monto</th>
                      <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {transaccionesFiltradas.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-20 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-xl bg-[#05ABCA]/10 border border-[#05ABCA]/20 flex items-center justify-center">
                                <FiDollarSign className="text-[#05ABCA]" size={24} />
                              </div>
                              <p className="text-slate-400 font-medium">No hay transacciones registradas</p>
                              <p className="text-slate-500 text-xs">Comienza agregando un movimiento</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        transaccionesFiltradas.map((t, index) => (
                          <motion.tr
                            key={t.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-[#05ABCA]/5 hover:bg-[#05ABCA]/5 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <p className="text-sm font-bold text-white">{t.concepto}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{t.fecha}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#05ABCA]/10 text-[#05ABCA] border border-[#05ABCA]/20">
                                <FiCreditCard size={12} />
                                {t.metodoPago}
                              </span>
                            </td>
                            <td className={`px-6 py-4 text-right font-bold ${
                              t.tipo === 'ingreso' ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {t.tipo === 'ingreso' ? '+' : '-'} {formatoCOP(t.monto)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => eliminarTransaccion(t.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                              >
                                <FiTrash2 size={16} />
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

            {/* ESTADÍSTICAS POR MÉTODO */}
            {Object.keys(estadisticasPorMetodo).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {Object.entries(estadisticasPorMetodo).map(([metodo, stats]) => (
                  <div
                    key={metodo}
                    className="relative bg-gradient-to-br from-[#0d2640]/60 to-[#0A1F33]/60 backdrop-blur-xl rounded-xl border border-[#05ABCA]/10 p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <FiCreditCard className="text-[#05ABCA]" size={16} />
                      <h4 className="text-sm font-bold text-white">{metodo}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-emerald-400">Ingresos:</span>
                        <span className="text-white font-bold">{formatoCOP(stats.ingresos)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-red-400">Gastos:</span>
                        <span className="text-white font-bold">{formatoCOP(stats.gastos)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}