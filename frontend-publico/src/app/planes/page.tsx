'use client';

import React, { useState, useMemo } from 'react';
import { FiCheck, FiShoppingCart, FiArrowLeft, FiSettings } from 'react-icons/fi';
import Link from 'next/link';

// BASE DE DATOS DE SERVICIOS
const SERVICIOS_FJONIC = [
  // AUDIOVISUAL
  { id: 'av_p1', cat: 'Audiovisual', nom: 'Paquete 1: Sesión Única', pre: 250000, desc: 'Ideal para una necesidad puntual.', items: ['1 sesión fotográfica (3h)', '15 fotos editadas', 'Entrega digital', '1 ronda de ajustes'] },
  { id: 'av_p2', cat: 'Audiovisual', nom: 'Paquete 2: 2 Sesiones', pre: 500000, desc: 'Para crear contenido continuo.', items: ['2 sesiones fotográficas (3h cada una)', '30 fotos editadas', 'Entrega digital', '1 ronda de ajustes por sesión'] },
  { id: 'av_p3', cat: 'Audiovisual', nom: 'Paquete 3: 3 Sesiones', pre: 750000, desc: 'Para marcas activas en redes.', items: ['3 sesiones fotográficas (3h cada una)', '45 fotos editadas', 'Entrega digital', '1 ronda de ajustes por sesión'] },
  
  // PUBLICIDAD & BRANDING
  { id: 'br_l1', cat: 'Publicidad', nom: 'Logo Básico', pre: 120000, desc: 'Esencia mínima profesional.', items: ['Diseño de concepto único', 'Entrega en alta resolución', '1 versión de color'] },
  { id: 'br_l2', cat: 'Publicidad', nom: 'Logo Completo', pre: 200000, desc: 'Identidad versátil para todo medio.', items: ['Variaciones de logo', 'Formatos vectoriales', 'Fondo transparente'] },
  { id: 'br_c1', cat: 'Publicidad', nom: 'Colores de Marca', pre: 80000, desc: 'Psicología y armonía visual.', items: ['Paleta cromática HEX/RGB', 'Guía de aplicación'] },
  { id: 'br_t1', cat: 'Publicidad', nom: 'Tipografías', pre: 70000, desc: 'Jerarquía y personalidad textual.', items: ['Selección de fuentes título/cuerpo', 'Licencias recomendadas'] },
  { id: 'br_r1', cat: 'Publicidad', nom: 'Rediseño de Marca', pre: 150000, desc: 'Evolución visual estratégica.', items: ['Modernización de concepto', 'Optimización de trazos'] },
  { id: 'pb_m1', cat: 'Publicidad', nom: 'Manual de Marca Básico', pre: 300000, desc: 'Esencia visual para tu negocio.', items: ['Logo Profesional', 'Paleta de Colores', 'Tipografías', 'Estilo Visual'] },
  { id: 'pb_m2', cat: 'Publicidad', nom: 'Manual de Marca Completo', pre: 600000, desc: 'Identidad total de marca.', items: ['Logo + Variaciones', 'Aplicaciones reales', 'Mockups premium'] },
  
  // WEB
  { id: 'wb_p1', cat: 'Diseño Web', nom: 'Web Esencial', pre: 700000, desc: 'Presencia online rápida.', items: ['Landing Page (1 página)', 'Diseño Responsive', 'WhatsApp integrado'] },
  { id: 'wb_p2', cat: 'Diseño Web', nom: 'Web Profesional', pre: 1300000, desc: 'Para emprendedores y PYMES.', items: ['Hasta 5 páginas', 'SEO básico', 'Adaptación de marca'] },
  { id: 'wb_p4', cat: 'Diseño Web', nom: 'E-commerce Básico', pre: 2800000, desc: 'Tu tienda virtual lista.', items: ['Hasta 10 productos', 'Pasarela de pagos', 'Gestión de pedidos'] },
];

const EXTRAS = [
  { id: 'ex1', cat: 'Audiovisual', nom: 'Reel (1 min)', pre: 80000 },
  { id: 'ex2', cat: 'Audiovisual', nom: 'Video (1-3 min)', pre: 150000 },
  { id: 'ex5', cat: 'Web', nom: 'Mantenimiento Mensual', pre: 150000 },
];

export default function PlanesPage() {
  const [showCustom, setShowCustom] = useState(false);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const toggleServicio = (id: string) => {
    setSeleccionados(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const total = useMemo(() => {
    const todos = [...SERVICIOS_FJONIC, ...EXTRAS];
    return seleccionados.reduce((acc, id) => acc + (todos.find(s => s.id === id)?.pre || 0), 0);
  }, [seleccionados]);

  const format = (v: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

  return (
    <div className="min-h-screen bg-[#0A1F33] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* BOTÓN VOLVER - CORREGIDO PARA TS */}
        <Link 
          href="/" 
          className="relative z-50 inline-flex items-center gap-2 text-[#05ABCA] font-bold mb-12 hover:text-white transition-all group"
        >
          <span className="flex items-center gap-2">
            <span className="group-hover:-translate-x-1 transition-transform">
                <FiArrowLeft />
            </span>
            Volver al Inicio
          </span>
        </Link>

        {!showCustom ? (
          <div className="animate-fade-in">
            <header className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">PLANES <span className="text-[#05ABCA]">FJONIC</span></h1>
              <p className="text-slate-400 text-lg">Soluciones integrales para marcas que buscan permanencia.</p>
            </header>

            {['Audiovisual', 'Publicidad', 'Diseño Web'].map((categoria) => (
              <div key={categoria} className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-white/10"></div>
                  <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-[#05ABCA]">{categoria}</h2>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICIOS_FJONIC.filter(s => s.cat === categoria).map((plan) => (
                    <div key={plan.id} className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] flex flex-col hover:border-[#05ABCA]/50 transition-all group">
                      <h3 className="text-xl font-bold mb-2">{plan.nom}</h3>
                      <p className="text-slate-500 text-[10px] mb-6 uppercase tracking-widest font-bold">{plan.desc}</p>
                      
                      <div className="flex-1 space-y-4 mb-8">
                        {plan.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="text-[#05ABCA]"><FiCheck /></span> {item}
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-white/5 mt-auto text-center">
                        <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Inversión desde</p>
                        <p className="text-3xl font-black mb-6">{format(plan.pre)}</p>
                        <button 
                          onClick={() => { setSeleccionados([plan.id]); setShowCustom(true); }}
                          className="w-full bg-white text-[#0A1F33] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#05ABCA] hover:text-white transition-all shadow-lg"
                        >
                          Elegir Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-r from-[#05ABCA]/20 to-transparent border border-[#05ABCA]/30 text-center">
              <h3 className="text-3xl font-black mb-4 uppercase">¿Buscas algo diferente?</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">Creamos presupuestos a medida según los servicios específicos que necesites.</p>
              <button 
                onClick={() => setShowCustom(true)}
                className="inline-flex items-center gap-3 bg-[#05ABCA] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all"
              >
                <span><FiSettings /></span> Personalizar mi plan
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <button onClick={() => setShowCustom(false)} className="text-slate-500 text-sm mb-6 hover:text-white flex items-center gap-2">
                <FiArrowLeft /> Volver a los paquetes
              </button>
              <h2 className="text-4xl font-black mb-10 uppercase italic">Arma tu <span className="text-[#05ABCA]">Presupuesto</span></h2>
              
              <div className="space-y-12">
                {['Audiovisual', 'Publicidad', 'Diseño Web'].map(cat => (
                  <section key={cat}>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#05ABCA] mb-6 border-l-4 border-[#05ABCA] pl-4">{cat}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[...SERVICIOS_FJONIC, ...EXTRAS].filter(s => s.cat.includes(cat)).map(s => (
                        <div 
                          key={s.id}
                          onClick={() => toggleServicio(s.id)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                            seleccionados.includes(s.id) ? 'border-[#05ABCA] bg-[#05ABCA]/10' : 'border-white/5 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-sm mb-1">{s.nom}</p>
                            <p className="text-[#05ABCA] font-black text-sm">{format(s.pre)}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${seleccionados.includes(s.id) ? 'bg-[#05ABCA] border-[#05ABCA]' : 'border-white/20'}`}>
                            {seleccionados.includes(s.id) && <span className="text-white text-[10px]"><FiCheck /></span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-[#0d2640] border-2 border-[#05ABCA] p-8 rounded-[2.5rem] shadow-2xl">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3 uppercase italic text-white">
                   <FiShoppingCart /> Inversión
                </h3>
                <div className="space-y-4 mb-8 overflow-y-auto max-h-[300px] pr-2">
                  {seleccionados.length === 0 ? (
                    <p className="text-slate-500 text-xs italic text-center py-4">Selecciona tus servicios</p>
                  ) : (
                    seleccionados.map(id => {
                      const s = [...SERVICIOS_FJONIC, ...EXTRAS].find(x => x.id === id);
                      return (
                        <div key={id} className="flex justify-between text-[11px] border-b border-white/5 pb-2">
                          <span className="text-slate-400 font-medium uppercase tracking-tighter">{s?.nom}</span>
                          <span className="font-bold text-[#05ABCA]">{format(s?.pre || 0)}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="flex justify-between items-end mb-8 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
                  <span className="text-4xl font-black text-white">{format(total)}</span>
                </div>
                <button 
                  disabled={seleccionados.length === 0}
                  onClick={() => {
                    const lista = seleccionados.map(id => [...SERVICIOS_FJONIC, ...EXTRAS].find(x => x.id === id)?.nom).join('%0A- ');
                    window.open(`https://wa.me/3182602764?text=Hola FJONIC! 👋 Quiero este plan personalizado:%0A- ${lista}%0A%0ATotal: ${format(total)}`, '_blank');
                  }}
                  className="w-full bg-[#05ABCA] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] transition-all disabled:opacity-20 shadow-lg shadow-[#05ABCA]/20"
                >
                  Confirmar Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}