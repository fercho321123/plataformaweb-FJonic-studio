'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 font-sans">
      
      {/* Header con Alto Contraste */}
      <header className="flex justify-between items-center border-b-2 border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-[#0A1F33]">Control Financiero</h1>
          <p className="text-sm text-slate-700 font-bold italic">Gestión de capital • FJONIC Studio</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Balance Disponible</p>
          <p className="text-2xl font-black text-[#05ABCA] drop-shadow-sm">{formatoCOP(ingresos - gastos)}</p>
        </div>
      </header>

      {/* Tarjetas Informativas con bordes y textos más fuertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-md flex justify-between items-center">
          <div>
            <p className="text-[11px] font-black text-slate-600 uppercase">Ingresos Totales</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{formatoCOP(ingresos)}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-lg font-bold">↑</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border-2 border-rose-100 shadow-md flex justify-between items-center">
          <div>
            <p className="text-[11px] font-black text-slate-600 uppercase">Gastos Totales</p>
            <p className="text-2xl font-black text-rose-700 mt-1">{formatoCOP(gastos)}</p>
          </div>
          <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white text-lg font-bold">↓</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formulario con Inputs de alta visibilidad */}
        <div className="lg:col-span-4">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg space-y-5">
            <h3 className="text-md font-black text-[#0A1F33] mb-4 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#05ABCA] rounded-full"></span>
              Nuevo Registro
            </h3>
            
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase ml-1">Concepto del movimiento</label>
              <input 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-sm text-[#0A1F33] font-bold focus:border-[#05ABCA] focus:ring-0 outline-none transition-all placeholder:text-slate-400"
                placeholder="Ej: Pago de Servidores"
                value={form.concepto}
                onChange={(e) => setForm({...form, concepto: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase ml-1">Monto en Pesos (COP)</label>
              <input 
                type="number"
                className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl p-4 text-lg text-[#0A1F33] font-black focus:border-[#05ABCA] focus:ring-0 outline-none"
                placeholder="0"
                value={form.monto}
                onChange={(e) => setForm({...form, monto: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-800 uppercase ml-1">Tipo</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-sm font-bold text-[#0A1F33] outline-none appearance-none"
                  value={form.tipo}
                  onChange={(e) => setForm({...form, tipo: e.target.value as any})}
                >
                  <option value="ingreso">Ingreso (+)</option>
                  <option value="gasto">Gasto (-)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-800 uppercase ml-1">Método</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-4 text-sm font-bold text-[#0A1F33] outline-none appearance-none"
                  value={form.metodoPago}
                  onChange={(e) => setForm({...form, metodoPago: e.target.value})}
                >
                  <option value="Transferencia">Transferencia</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-[#0A1F33] text-white p-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#05ABCA] transition-all shadow-xl active:scale-95 mt-4">
              Registrar Movimiento
            </button>
          </form>
        </div>

        {/* Tabla con textos reforzados */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b-2 border-slate-100 bg-[#0A1F33]">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Historial de Operaciones</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] text-slate-900 font-black uppercase bg-slate-50 border-b-2 border-slate-200">
                  <th className="px-8 py-5">Detalle / Fecha</th>
                  <th className="px-8 py-5">Método</th>
                  <th className="px-8 py-5 text-right">Monto</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {transacciones.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-8 py-16 text-center text-slate-500 font-bold italic text-sm">Esperando nuevos registros...</td>
                  </tr>
                ) : (
                  transacciones.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-[#0A1F33] uppercase">{t.concepto}</p>
                        <p className="text-[11px] text-slate-700 font-bold">{t.fecha}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-[#05ABCA]/10 text-[#05ABCA] px-3 py-1 rounded-lg font-black text-[10px] uppercase border border-[#05ABCA]/20">
                          {t.metodoPago}
                        </span>
                      </td>
                      <td className={`px-8 py-6 text-right text-base font-black ${t.tipo === 'ingreso' ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {t.tipo === 'ingreso' ? '+ ' : '- '} {formatoCOP(t.monto)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}