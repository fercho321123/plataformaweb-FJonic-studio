'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardCliente from './components/DashboardCliente';

export default function DashboardHome() {
  const { usuario } = useAuth();

  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* ✋ SECCIÓN HERO: SALUDO PERSONALIZADO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F33] to-[#0D3A66] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-black font-montserrat mb-4">
            Hola, {usuario?.email?.split('@')[0] ?? 'Usuario'} 👋
          </h1>
          <p className="text-blue-200 max-w-2xl font-open-sans text-lg">
            {esAdmin 
              ? 'Este es el centro de mando de FJONIC Studio. Aquí tienes el control total de la operación.' 
              : 'Bienvenido a tu panel de control. Aquí puedes gestionar tus proyectos y comunicarte con nosotros.'}
          </p>
        </div>
        {/* Decoración visual */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#05ABCA] rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
      </section>

      {/* 🚀 LÓGICA DE VISTAS SEGÚN ROL */}
      {esAdmin ? (
        <div className="space-y-8">
          {/* 📊 RESUMEN EJECUTIVO (KPIs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ingresos Mensuales</p>
              <h3 className="text-2xl font-black text-[#0A1F33] mt-2 font-montserrat">$12,450.00</h3>
              <span className="text-emerald-500 text-xs font-bold">+12% este mes</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Leads Nuevos</p>
              <h3 className="text-2xl font-black text-[#0A1F33] mt-2 font-montserrat">24</h3>
              <span className="text-blue-500 text-xs font-bold">8 pendientes</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Proyectos Activos</p>
              <h3 className="text-2xl font-black text-[#0A1F33] mt-2 font-montserrat">12</h3>
              <span className="text-slate-500 text-xs font-bold">4 en entrega</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Gastos Op.</p>
              <h3 className="text-2xl font-black text-rose-500 mt-2 font-montserrat">$3,200.00</h3>
              <span className="text-slate-500 text-xs font-bold">Fijos y variables</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 🗓️ CALENDARIO PRÓXIMAS PUBLICACIONES */}
            <section className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-[#0A1F33] font-montserrat">Planificación de Contenido</h3>
                  <button className="text-[#05ABCA] text-xs font-bold uppercase hover:underline">Ver Calendario</button>
               </div>
               <div className="space-y-4">
                  {[
                    { c: 'La Tertulia', d: 'Post: Especial Vinos', f: 'Hoy, 18:00', icon: '🍷' },
                    { c: 'Burger Station', d: 'Reel: Nueva Doble', f: 'Mañana, 12:00', icon: '🍔' },
                    { c: 'FJONIC Studio', d: 'Story: Tips UI/UX', f: 'Miércoles', icon: '💻' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <p className="text-sm font-black text-[#0A1F33] leading-none">{item.c}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.d}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.f}</span>
                    </div>
                  ))}
               </div>
            </section>

            {/* 👤 CRM: LEADS RECIENTES */}
            <section className="bg-[#0A1F33] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col">
               <h3 className="text-xl font-black font-montserrat mb-6">Nuevos Leads</h3>
               <div className="space-y-6 flex-1">
                  {[
                    { n: 'Ricardo Gómez', e: 'Desarrollo App', s: 'Nuevo' },
                    { n: 'Marina Soler', e: 'Branding E-commerce', s: 'Enviado' },
                    { n: 'Juan Valdés', e: 'Web Corporativa', s: 'Reunión' }
                  ].map((lead, i) => (
                    <div key={i} className="border-b border-white/10 pb-4 last:border-0">
                      <p className="font-bold text-sm">{lead.n}</p>
                      <p className="text-xs text-blue-300 mb-2">{lead.e}</p>
                      <span className="text-[9px] bg-[#05ABCA] px-2 py-0.5 rounded-full font-black uppercase">{lead.s}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                 Ver todos los prospectos
               </button>
            </section>
          </div>
        </div>
      ) : (
        /* 🏠 VISTA PARA CLIENTES / STAFF */
        <section className="animate-in slide-in-from-bottom-4 duration-1000">
           <DashboardCliente />
        </section>
      )}

    </div>
  );
}