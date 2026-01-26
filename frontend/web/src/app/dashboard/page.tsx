'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { apiFetch } from '@/lib/api';
import { 
  FiUsers, FiMonitor, FiTrendingUp, FiZap,
  FiCheckCircle, FiActivity, FiClock,
  FiTarget, FiLayers, FiMenu, FiCpu
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

  const cards = [
    { title: 'Cuentas Activas', value: stats.clientes, Icon: FiUsers, gradient: 'from-[#05ABCA] to-[#1C75BC]', trend: '+12%' },
    { title: 'Proyectos Activos', value: stats.proyectos, Icon: FiLayers, gradient: 'from-slate-700 to-slate-900', trend: '+8%' },
    { title: 'ROI Promedio', value: `${stats.roiPromedio}%`, Icon: FiTrendingUp, gradient: 'from-emerald-500 to-teal-600', trend: '+5.2%' },
    { title: 'Campañas Live', value: stats.campanasActivas, Icon: FiZap, gradient: 'from-[#05ABCA] via-[#1C75BC] to-[#0A1F33]', trend: 'ONLINE' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] space-y-4">
      <motion.div
        className="w-16 h-16 border-2 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-[10px] uppercase tracking-[0.4em] text-[#05ABCA] font-black animate-pulse">Sincronizando Terminal Elite</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden font-sans selection:bg-[#05ABCA]/30">
      
      {/* FONDO TECNOLÓGICO DINÁMICO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#05ABCA]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1C75BC]/10 blur-[120px] rounded-full"></div>
        {/* Grid de líneas tecnológicas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10 pb-20">
        
        {/* HEADER RESPONSIVO */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] backdrop-blur-xl shadow-2xl">
          <div className="space-y-3 w-full lg:w-auto text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#05ABCA] rounded-lg shadow-[0_0_15px_rgba(5,171,202,0.4)]">
                <FiCpu className="text-white text-sm" />
              </div>
              <span className="px-3 py-1 bg-[#05ABCA]/10 text-[#05ABCA] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#05ABCA]/20">
                FJonic Core v4.0
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              FJonic<span className="text-[#05ABCA] not-italic">.</span>Studio
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              Terminal de Control: <span className="text-white font-bold">{usuario?.nombre}</span>
            </p>
          </div>

          <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none flex items-center gap-3 bg-black/40 border border-white/10 px-5 py-3 rounded-2xl">
              <FiClock className="text-[#05ABCA] text-lg sm:text-xl" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-mono font-bold text-white leading-none">
                  {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[8px] text-slate-500 uppercase font-black tracking-tighter">System Time</span>
              </div>
            </div>
          </div>
        </header>

        {/* METRICAS - GRID ADAPTATIVO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0f172a]/60 border border-white/5 hover:border-[#05ABCA]/50 p-6 rounded-[2rem] backdrop-blur-sm transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-2xl shadow-black/50`}>
                  <card.Icon size={22} />
                </div>
                <span className="text-[9px] font-black text-[#05ABCA] bg-[#05ABCA]/10 px-2 py-1 rounded-md uppercase">{card.trend}</span>
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{card.value}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{card.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECCION INFERIOR - RESPONSIVA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* PANEL DE ACCIÓN */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative overflow-hidden bg-gradient-to-br from-[#0d2640] via-[#020617] to-[#0A1F33] border border-[#05ABCA]/30 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl group"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#05ABCA]/20 rounded-full border border-[#05ABCA]/30 text-[9px] font-black text-white uppercase tracking-[0.2em]">
                     <FiTarget className="text-[#05ABCA] animate-pulse" /> Operaciones Activas
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                    Despliegue <br /> <span className="text-[#05ABCA]">Estratégico</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <button onClick={() => window.location.href='/dashboard/proyectos'} className="px-8 py-4 bg-[#05ABCA] hover:scale-105 text-[#020617] font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_10px_30px_rgba(5,171,202,0.3)]">
                      Lanzar Proyecto
                    </button>
                    <button onClick={() => window.location.href='/dashboard/clientes'} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-white/10 transition-all backdrop-blur-md">
                      Base de Datos
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex w-1/3 justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <FiMonitor className="text-9xl text-[#05ABCA] drop-shadow-[0_0_30px_rgba(5,171,202,0.5)]" />
                </div>
              </div>
            </motion.div>

            {/* ACTIVIDAD - LISTA MOVIL */}
            <div className="bg-[#0f172a]/40 border border-white/5 p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] backdrop-blur-md">
              <div className="flex justify-between items-center mb-8 italic uppercase font-black text-white tracking-tighter text-lg sm:text-xl">
                <h3>Live Feed</h3>
                <FiActivity className="text-[#05ABCA] animate-spin-slow" />
              </div>
              <div className="space-y-3">
                {[
                  { a: 'Estrategia Aprobada', c: 'TechCorp', t: '2m', color: 'bg-[#05ABCA]' },
                  { a: 'Reporte Enviado', c: 'Fashion Brand', t: '15m', color: 'bg-emerald-500' },
                  { a: 'Nuevo Cliente', c: 'StartUp Inc', t: '1h', color: 'bg-purple-500' }
                ].map((act, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all">
                    <div className={`w-1 h-8 ${act.color} rounded-full`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{act.a}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{act.c}</p>
                    </div>
                    <span className="text-[9px] font-mono text-[#05ABCA] font-bold whitespace-nowrap">{act.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA - OBJETIVOS */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-[#0f172a]/80 border border-[#05ABCA]/20 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiTarget size={60} className="text-white" />
              </div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Monthly Goals</h3>
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end text-[10px] font-black text-white uppercase tracking-widest">
                    <span>Performance Web</span>
                    <span className="text-[#05ABCA]">80%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] shadow-[0_0_10px_#05ABCA]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-6 border-t border-white/5">
                  {['Google Audit', 'SEO Pro', 'Ads Live'].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase text-white/70">
                      <FiCheckCircle className={i < 2 ? "text-[#05ABCA]" : "text-slate-800"} />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}