'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { apiFetch } from '@/lib/api';
import { 
  FiUsers, FiMonitor, FiTrendingUp, FiBarChart2, FiZap,
  FiArrowUpRight, FiCheckCircle, FiActivity, FiClock,
  FiDollarSign, FiTarget, FiAward, FiLayers
} from 'react-icons/fi';

export default function DashboardPage() {
  const { usuario } = useAuth();
  const [stats, setStats] = useState({
    clientes: 0,
    proyectos: 0,
    campanasActivas: 0,
    roiPromedio: 0
  });
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const [c, p] = await Promise.all([
          apiFetch('/clientes'),
          apiFetch('/proyectos')
        ]);
        
        setStats({
          clientes: Array.isArray(c) ? c.length : 0,
          proyectos: Array.isArray(p) ? p.length : 0,
          campanasActivas: Array.isArray(p) ? p.filter((item: any) => item.estado === 'iniciado').length : 0,
          roiPromedio: 24.5
        });
      } catch (error) {
        console.error("Error cargando datos de agencia", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencyData();
  }, []);

  // Lista de métricas con componentes de iconos corregidos para TS
  const cards = [
    { 
      title: 'Cuentas Activas', 
      value: stats.clientes, 
      Icon: FiUsers, 
      gradient: 'from-[#05ABCA] to-[#1C75BC]',
      desc: 'Clientes integrados',
      trend: '+12%'
    },
    { 
      title: 'Proyectos Activos', 
      value: stats.proyectos, 
      Icon: FiLayers, 
      gradient: 'from-slate-700 to-slate-900',
      desc: 'En fase de ejecución',
      trend: '+8%'
    },
    { 
      title: 'ROI Promedio', 
      value: `${stats.roiPromedio}%`, 
      Icon: FiTrendingUp, 
      gradient: 'from-emerald-500 to-teal-600',
      desc: 'Performance global',
      trend: '+5.2%'
    },
    { 
      title: 'Campañas Live', 
      value: stats.campanasActivas, 
      Icon: FiZap, 
      gradient: 'from-[#05ABCA] via-[#1C75BC] to-[#0A1F33]',
      desc: 'Tráfico en tiempo real',
      trend: 'ONLINE'
    },
  ];

  const recentActivity = [
    { action: 'Nueva estrategia aprobada', client: 'TechCorp Solutions', time: '2 min', type: 'project' },
    { action: 'Reporte mensual enviado', client: 'Fashion Brand Co', time: '15 min', type: 'invoice' },
    { action: 'Onboarding completado', client: 'StartUp Inc', time: '1 h', type: 'client' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      <motion.div
        className="w-12 h-12 border-2 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#05ABCA] font-bold animate-pulse">Sincronizando Terminal</span>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* HEADER FJONIC ELITE */}
      <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#05ABCA]/10 text-[#05ABCA] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#05ABCA]/20">
              Agencia v3.0
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            FJonic<span className="text-[#05ABCA] not-italic">.</span>Studio
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Bienvenido, <span className="text-white font-bold">{usuario?.nombre}</span>. El sistema está operando.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center gap-4 bg-black/40 border border-white/5 px-6 py-4 rounded-3xl">
            <FiClock className="text-[#05ABCA] text-xl" />
            <div className="flex flex-col">
              <span className="text-xl font-mono font-bold text-white leading-none">
                {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Hora Local</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 bg-[#05ABCA]/5 border border-[#05ABCA]/20 px-6 py-4 rounded-3xl">
             <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
             </div>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">Sistema Online</span>
          </div>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-[#111827] border border-white/5 hover:border-[#05ABCA]/40 p-6 rounded-[2rem] transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-xl`}>
                <card.Icon size={24} />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-[#05ABCA] uppercase tracking-tighter">{card.trend}</span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-white tracking-tighter">{card.value}</h3>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{card.title}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
               <span className="text-[10px] text-slate-400 font-medium italic">{card.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* CENTRAL OPERATIVA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#0d2640] to-[#0A1F33] border border-[#05ABCA]/20 p-10 rounded-[3rem] shadow-2xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
                   <FiTarget className="text-[#05ABCA]" /> Misión Crítica
                </div>
                <h2 className="text-4xl font-black text-white leading-none tracking-tighter uppercase italic">
                  Estrategia <br /> de Crecimiento
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Supervisa proyectos y gestiona la pauta digital de tus clientes desde una sola terminal.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button onClick={() => window.location.href='/dashboard/proyectos'} className="px-8 py-4 bg-[#05ABCA] hover:bg-[#1C75BC] text-[#0A1F33] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg shadow-[#05ABCA]/20">
                    Nuevo Proyecto
                  </button>
                  <button onClick={() => window.location.href='/dashboard/clientes'} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-white/10 transition-all">
                    Directorio
                  </button>
                </div>
              </div>
              <div className="hidden md:flex w-1/3 justify-center">
                <FiMonitor className="text-8xl text-white opacity-20" />
              </div>
            </div>
          </motion.div>

          {/* LOG DE ACTIVIDAD */}
          <div className="bg-[#111827] border border-white/5 p-8 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-8 italic uppercase font-black text-white tracking-tighter text-xl">
              <h3>Log de Actividad</h3>
              <FiActivity className="text-[#05ABCA]" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 bg-white/[0.02] border border-white/5 rounded-3xl transition-all">
                  <div className="w-2 h-10 bg-[#05ABCA]/20 rounded-full overflow-hidden">
                    <div className="w-full h-1/2 bg-[#05ABCA]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{act.action}</p>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{act.client}</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 font-bold">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPIs LATERALES */}
        <div className="space-y-8">
          <div className="bg-[#111827] border border-white/5 p-8 rounded-[2.5rem]">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Objetivos del Mes</h3>
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="flex justify-between items-end text-[11px] font-bold text-white uppercase">
                  <span>Entregables Web</span>
                  <span className="text-[#05ABCA]">80%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC]" />
                </div>
              </div>
              <div className="space-y-4 border-t border-white/5 pt-8 text-[11px] font-bold uppercase tracking-tighter">
                {['Google Ads Audit', 'SEO On-Page', 'Content Calendar'].map((task, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FiCheckCircle className={i < 2 ? "text-[#05ABCA]" : "text-slate-700"} />
                    <span className={i < 2 ? "text-white" : "text-slate-600"}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111827] to-black border border-white/5 p-8 rounded-[2.5rem]">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Estado Financiero</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Facturación</p>
                 <p className="text-lg font-black text-white">$45.2M</p>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                 <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Conversión</p>
                 <p className="text-lg font-black text-[#05ABCA]">18.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}