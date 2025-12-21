'use client';

import { useState } from 'react';

// --- TIPOS ---
interface Transaccion {
  id: string;
  concepto: string;
  cliente?: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  fecha: string;
  estado: 'pagado' | 'pendiente';
}

// --- DATA SIMULADA ---
const TRANSACCIONES_DATA: Transaccion[] = [
  { id: '1', concepto: 'Desarrollo Web E-commerce', cliente: 'The Burger Station', monto: 1200, tipo: 'ingreso', fecha: '2025-12-15', estado: 'pagado' },
  { id: '2', concepto: 'Suscripción Adobe Creative Cloud', monto: 55, tipo: 'gasto', fecha: '2025-12-10', estado: 'pagado' },
  { id: '3', concepto: 'Branding Identidad Visual', cliente: 'La Tertulia', monto: 850, tipo: 'ingreso', fecha: '2025-12-18', estado: 'pendiente' },
  { id: '4', concepto: 'Hosting Servidores AWS', monto: 120, tipo: 'gasto', fecha: '2025-12-05', estado: 'pagado' },
  { id: '5', concepto: 'Asesoría Estratégica', cliente: 'Glow Estética', monto: 400, tipo: 'ingreso', fecha: '2025-12-20', estado: 'pagado' },
];

export default function FinanzasPage() {
  const [filtro, setFiltro] = useState<'todos' | 'ingreso' | 'gasto'>('todos');

  const ingresosTotales = TRANSACCIONES_DATA.filter(t => t.tipo === 'ingreso').reduce((acc, t) => acc + t.monto, 0);
  const gastosTotales = TRANSACCIONES_DATA.filter(t => t.tipo === 'gasto').reduce((acc, t) => acc + t.monto, 0);
  const balanceNeto = ingresosTotales - gastosTotales;

  const transaccionesFiltradas = filtro === 'todos' 
    ? TRANSACCIONES_DATA 
    : TRANSACCIONES_DATA.filter(t => t.tipo === filtro);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER FINANCIERO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-[10px] font-montserrat">Financial Control</span>
          <h1 className="text-4xl font-black font-montserrat text-[#0A1F33] mt-2">Flujo de Caja</h1>
        </div>
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {['todos', 'ingreso', 'gasto'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f as any)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                filtro === f ? 'bg-[#0A1F33] text-white' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {f}s
            </button>
          ))}
        </div>
      </div>

      {/* TARJETAS DE MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ingresos Brutos</p>
            <h3 className="text-3xl font-black text-[#0A1F33] mt-2 font-montserrat">${ingresosTotales.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs">
              <span className="bg-emerald-100 p-1 rounded-lg">↑</span> +15.4% este mes
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50"></div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Gastos Operativos</p>
            <h3 className="text-3xl font-black text-rose-500 mt-2 font-montserrat">${gastosTotales.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-slate-400 font-bold text-xs">
              <span className="bg-slate-100 p-1 rounded-lg">↓</span> 8.2% del presupuesto
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-50 rounded-full opacity-50"></div>
        </div>

        <div className="bg-[#0A1F33] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-300/60 text-[10px] font-black uppercase tracking-widest">Balance Neto (Profit)</p>
            <h3 className="text-3xl font-black mt-2 font-montserrat">${balanceNeto.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-2 text-[#05ABCA] font-bold text-xs">
              Mantenimiento saludable
            </div>
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#05ABCA] rounded-full blur-[80px] opacity-20"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TABLA DE MOVIMIENTOS */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h4 className="font-black text-[#0A1F33] uppercase text-sm tracking-tighter">Últimos Movimientos</h4>
            <button className="text-[10px] font-black text-[#05ABCA] uppercase hover:underline">Exportar Reporte</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-slate-50/50">
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Concepto / Cliente</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Monto</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transaccionesFiltradas.map((t) => (
                  <tr key={t.id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-[#0A1F33]">{t.concepto}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.cliente || 'FJONIC Studio'}</p>
                    </td>
                    <td className="px-8 py-5 text-sm font-black">
                      <span className={t.tipo === 'ingreso' ? 'text-emerald-500' : 'text-rose-500'}>
                        {t.tipo === 'ingreso' ? '+' : '-'} ${t.monto}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                        t.estado === 'pagado' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {t.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DISTRIBUCIÓN DE GASTOS (Visual Simple) */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h4 className="font-black text-[#0A1F33] uppercase text-sm tracking-tighter mb-8 text-center">Distribución Mensual</h4>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-500">Servicios Cloud</span>
                <span className="text-[#0A1F33]">45%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#05ABCA] w-[45%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-500">Sueldos Staff</span>
                <span className="text-[#0A1F33]">30%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0D3A66] w-[30%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                <span className="text-slate-500">Marketing</span>
                <span className="text-[#0A1F33]">15%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[15%]"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-[#F8FAFC] rounded-3xl border border-dashed border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Próximo Pago Crítico</p>
            <p className="text-sm font-black text-[#0A1F33]">Enero 05 - Servidores AWS</p>
            <p className="text-xs text-rose-500 font-bold mt-1">$120.00 USD</p>
          </div>
        </div>
      </div>
    </div>
  );
}