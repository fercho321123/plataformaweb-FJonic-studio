'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { apiFetch } from '@/lib/api';
import { 
  FiUsers, 
  FiMonitor, 
  FiTrendingUp, 
  FiBarChart2, 
  FiZap,
  FiArrowUpRight,
  FiCheckCircle,
  FiActivity,
  FiClock,
  FiDollarSign,
  FiTarget,
  FiAward
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
    { 
      title: 'Cuentas Activas', 
      value: stats.clientes, 
      icon: <FiUsers />, 
      gradient: 'from-blue-500 to-blue-600',
      desc: 'Clientes en cartera',
      trend: '+12%'
    },
    { 
      title: 'Proyectos/Kits', 
      value: stats.proyectos, 
      icon: <FiMonitor />, 
      gradient: 'from-[#05ABCA] to-[#1C75BC]',
      desc: 'En desarrollo',
      trend: '+8%'
    },
    { 
      title: 'ROI Promedio', 
      value: `${stats.roiPromedio}%`, 
      icon: <FiTrendingUp />, 
      gradient: 'from-emerald-500 to-emerald-600',
      desc: 'Rendimiento',
      trend: '+5.2%'
    },
    { 
      title: 'Campañas Live', 
      value: stats.campanasActivas, 
      icon: <FiZap />, 
      gradient: 'from-amber-500 to-amber-600',
      desc: 'En tiempo real',
      trend: 'Activas'
    },
  ];

  const recentActivity = [
    { action: 'Nuevo proyecto creado', client: 'TechCorp Solutions', time: '2 min ago', type: 'project' },
    { action: 'Factura generada', client: 'Fashion Brand Co', time: '15 min ago', type: 'invoice' },
    { action: 'Cliente registrado', client: 'StartUp Inc', time: '1 hora ago', type: 'client' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        className="w-16 h-16 border-4 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* HEADER FUTURISTA */}
      <header className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-10 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
              <h1 className="text-4xl font-bold text-white tracking-tight">
                FJONIC <span className="text-[#05ABCA]">Command Center</span>
              </h1>
            </div>
            <p className="text-slate-400 text-sm font-medium ml-4">
              Bienvenido, <span className="text-[#05ABCA] font-semibold">{usuario?.nombre}</span>. Sistema operativo activo.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* RELOJ DIGITAL */}
            <div className="bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl border border-[#05ABCA]/20 rounded-xl px-6 py-3">
              <div className="flex items-center gap-3">
                <FiClock className="text-[#05ABCA]" size={18} />
                <div className="text-right">
                  <div className="text-xl font-bold text-white tabular-nums">
                    {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {time.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* STATUS */}
            <div className="bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl border border-[#05ABCA]/20 rounded-xl px-5 py-3 flex items-center gap-3">
              <motion.div
                className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest">Sistema Online</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-[#05ABCA]/50 via-[#05ABCA]/20 to-transparent mt-6" />
      </header>

      {/* MÉTRICAS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden group hover:border-[#05ABCA]/40 transition-all"
          >
            {/* GLOW TOP */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-xl shadow-lg`}>
                  {card.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                  {card.trend}
                </span>
              </div>
              
              <p className="text-[10px] font-semibold uppercase text-[#05ABCA] tracking-widest mb-2">
                {card.title}
              </p>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-black text-white">{card.value}</h2>
                <span className="text-xs text-slate-400 font-medium mb-1">{card.desc}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PANEL PRINCIPAL */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* CENTRAL DE ESTRATEGIAS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-gradient-to-br from-[#0d2640] to-[#0A1F33] rounded-2xl border border-[#05ABCA]/20 overflow-hidden shadow-2xl shadow-black/20"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
            
            {/* PATTERN BACKGROUND */}
            <div className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `linear-gradient(#05ABCA 1px, transparent 1px), linear-gradient(90deg, #05ABCA 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}
            />
            
            <div className="relative z-10 p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                  <FiTarget className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Central de Estrategias</h3>
                  <p className="text-xs text-[#05ABCA]/60 uppercase tracking-wider">Control operativo</p>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm mb-8 max-w-xl leading-relaxed">
                Supervisa el flujo de trabajo del equipo creativo, revisa el estado de los kits de marca y aprueba presupuestos de pauta digital.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.location.href='/dashboard/proyectos'} 
                  className="bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] hover:shadow-lg hover:shadow-[#05ABCA]/30 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <FiZap size={16} />
                  Nuevo Proyecto
                  <FiArrowUpRight size={14} />
                </button>
                <button 
                  onClick={() => window.location.href='/dashboard/clientes'} 
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Ver Clientes
                </button>
                <button 
                  onClick={() => window.location.href='/dashboard/facturacion'} 
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Facturación
                </button>
              </div>
            </div>
            
            {/* CÍRCULO DECORATIVO */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#05ABCA]/10 rounded-full blur-3xl" />
          </motion.div>

          {/* ACTIVIDAD RECIENTE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA]/20 to-[#1C75BC]/20 border border-[#05ABCA]/30 flex items-center justify-center">
                  <FiActivity className="text-[#05ABCA]" size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Actividad Reciente</h3>
                  <p className="text-xs text-[#05ABCA]/60">Últimas acciones del sistema</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    className="flex items-center gap-4 p-4 bg-[#0A1F33]/40 border border-[#05ABCA]/10 rounded-xl hover:border-[#05ABCA]/30 transition-all"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'project' ? 'bg-blue-500' :
                      activity.type === 'invoice' ? 'bg-emerald-500' :
                      'bg-amber-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{activity.action}</p>
                      <p className="text-xs text-slate-400 truncate">{activity.client}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SIDEBAR DERECHO */}
        <div className="space-y-8">
          
          {/* KPI TRACKER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                  <FiBarChart2 className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Objetivos del Mes</h3>
                  <p className="text-xs text-[#05ABCA]/60">Progreso general</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-3">
                    <span className="text-slate-400 uppercase tracking-wider">Entregables</span>
                    <span className="text-[#05ABCA]">80%</span>
                  </div>
                  <div className="h-3 bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] rounded-full"
                    />
                  </div>
                </div>
                
                <div className="pt-4 space-y-4 border-t border-[#05ABCA]/10">
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                    <span className="text-xs font-medium text-slate-300">Landing Pages completas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={18} />
                    <span className="text-xs font-medium text-slate-300">Auditorías SEO realizadas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-[#05ABCA]/30 flex-shrink-0" />
                    <span className="text-xs font-medium text-slate-500">Campañas de Meta Ads</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
                  <FiAward className="text-amber-500" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Performance</h3>
                  <p className="text-xs text-[#05ABCA]/60">Esta semana</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0A1F33]/40 border border-[#05ABCA]/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-emerald-500" size={16} />
                    <span className="text-xs text-slate-300 font-medium">Ingresos</span>
                  </div>
                  <span className="text-sm font-bold text-white">$45.2M</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#0A1F33]/40 border border-[#05ABCA]/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="text-blue-500" size={16} />
                    <span className="text-xs text-slate-300 font-medium">Conversión</span>
                  </div>
                  <span className="text-sm font-bold text-white">18.5%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[#0A1F33]/40 border border-[#05ABCA]/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-[#05ABCA]" size={16} />
                    <span className="text-xs text-slate-300 font-medium">Nuevos Leads</span>
                  </div>
                  <span className="text-sm font-bold text-white">342</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}