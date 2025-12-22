'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURACIÓN ---
const WHATSAPP_NUMBER = "573182602764"; // 👈 TU NÚMERO AQUÍ

// --- ICONOS ---
const CheckIcon = () => <svg className="w-5 h-5 text-[#05ABCA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const PlusIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const WhatsAppIcon = () => (
  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 448 512">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.1 0-65.6-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.5-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.7 9.1 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function PlanesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showFab, setShowFab] = useState(false);
  const [showWaMenu, setShowWaMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFab(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const sendWhatsApp = (mensajeText: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeText)}`, '_blank');
    setShowWaMenu(false);
  };

  const planesContenido = [
    { name: "Básico", cop: "1.000.000", features: ["6 Reels / TikToks al mes", "Conceptualización y Guiones", "Edición Profesional", "Diseño de Portadas", "1 Sesión de Feedback"] },
    { name: "Medio", cop: "2.000.000", features: ["12 Reels / TikToks al mes", "Automatización de Mensajes", "Estrategia de Crecimiento", "Soporte Prioritario", "2 Sesiones de Feedback"], highlight: true },
    { name: "Premium", cop: "4.000.000", features: ["Contenido Ilimitado Enfocado", "Promesa Ganar o Ganar", "Embudo de Ventas Completo", "Gestión de Ads Incluida", "Garantía de Resultados*"] }
  ];

  const serviciosExtra = [
    { title: "Identidad Visual", desc: "Logotipo profesional y manual de marca.", price: "Desde $800k COP", icon: "🎨", detalles: ["Logotipo Original", "Paleta de Colores", "Tipografías", "Manual de Marca"] },
    { title: "Desarrollo Web", desc: "Sitios web rápidos y optimizados.", price: "Desde $1.5M COP", icon: "🌐", detalles: ["Diseño UX/UI", "Velocidad de Carga", "Certificado SSL", "SEO Básico"] },
    { title: "Automatización IA", desc: "Chatbots que venden por ti 24/7.", price: "Desde $600k COP", icon: "🤖", detalles: ["Flujos de Venta", "Respuestas con IA", "Filtro de Clientes", "Integración CRM"] }
  ];

  return (
    <div className="space-y-16 pb-24 max-w-6xl mx-auto px-4 relative">
      
      {/* 🟢 WIDGET DE WHATSAPP CON MENÚ */}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
        <AnimatePresence>
          {showWaMenu && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 w-72 mb-2 overflow-hidden"
            >
              <div className="bg-[#0A1F33] -m-6 p-6 mb-4">
                <p className="text-white font-black text-sm uppercase tracking-widest">FJONIC Studio</p>
                <p className="text-slate-400 text-[10px] font-bold">¿Cómo podemos ayudarte hoy?</p>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { label: "💰 Cotizar Planes", msg: "Hola, me gustaría cotizar uno de sus planes de contenido." },
                  { label: "🛠️ Soporte Técnico", msg: "Hola, necesito ayuda técnica con mi servicio actual." },
                  { label: "🚀 Nuevo Proyecto", msg: "Hola, tengo una idea para un nuevo proyecto y quiero asesoría." }
                ].map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => sendWhatsApp(opt.msg)}
                    className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-[#05ABCA] hover:text-white transition-all text-xs font-black uppercase tracking-tight text-[#0A1F33]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFab && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowWaMenu(!showWaMenu)}
              className={`p-4 rounded-full shadow-2xl flex items-center justify-center relative transition-colors ${showWaMenu ? 'bg-red-500 text-white' : 'bg-[#25D366] text-white'}`}
            >
              {showWaMenu ? <CloseIcon /> : <WhatsAppIcon />}
              {!showWaMenu && <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 🎬 HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#0A1F33] rounded-[2.5rem] p-10 md:p-16 text-white shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 max-w-2xl text-left">
          <span className="text-[#05ABCA] font-bold uppercase tracking-[0.3em] text-[11px] mb-3 block">PLANES FJONIC</span>
          <h1 className="text-3xl md:text-5xl font-black font-montserrat leading-tight mb-4">Servicios <span className="text-[#05ABCA]">Digitales</span></h1>
          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-md">Selecciona un plan o solicita un servicio especializado para comenzar a escalar.</p>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#05ABCA] rounded-full blur-[100px] opacity-10"></div>
      </motion.header>

      {/* 🚀 SECCIÓN 01: PLANES */}
      <section>
        <div className="flex items-center gap-4 mb-10"><h2 className="text-xl font-black text-[#0A1F33] uppercase tracking-tighter">Planes de Contenido</h2><div className="h-px flex-1 bg-slate-200"></div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planesContenido.map((plan, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] border-2 flex flex-col shadow-lg ${plan.highlight ? 'bg-[#0A1F33] text-white border-[#05ABCA]' : 'bg-white border-slate-50 text-[#0A1F33]'}`}
            >
              <h3 className="text-xl font-black mb-1">{plan.name}</h3>
              <div className="mb-6"><span className="text-3xl font-black font-montserrat">${plan.cop}</span><p className="text-[9px] font-bold uppercase tracking-widest opacity-50">COP / Mes</p></div>
              <ul className="space-y-4 mb-8 flex-1 text-sm font-bold">
                {plan.features.map((f, idx) => (<li key={idx} className="flex items-center gap-3"><CheckIcon /> <span className="opacity-80">{f}</span></li>))}
              </ul>
              <button 
                onClick={() => sendWhatsApp(`Hola, quiero el Plan de Contenido ${plan.name}`)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${plan.highlight ? 'bg-[#05ABCA] text-white' : 'bg-[#0A1F33] text-white'}`}
              >
                Solicitar Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛠️ SECCIÓN 02: OTROS SERVICIOS */}
      <section>
        <div className="flex items-center gap-4 mb-10"><h2 className="text-xl font-black text-[#0A1F33] uppercase tracking-tighter">Otros Servicios</h2><div className="h-px flex-1 bg-slate-200"></div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviciosExtra.map((serv, i) => (
            <div key={i} className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="text-3xl mb-4 transform group-hover:-rotate-12 transition-transform">{serv.icon}</div>
              <h4 className="text-lg font-black text-[#0A1F33] mb-2">{serv.title}</h4>
              <p className="text-slate-500 font-bold text-xs mb-6">{serv.desc}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[#05ABCA] font-black text-[9px] uppercase">{serv.price}</span>
                <button onClick={() => setSelectedService(serv)} className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-[#05ABCA] hover:text-white transition-colors"><PlusIcon /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📱 MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0A1F33]/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black uppercase text-[#0A1F33]">{selectedService.title}</h3>
                <button onClick={() => setSelectedService(null)} className="text-slate-400 hover:text-red-500 transition-colors"><CloseIcon /></button>
              </div>
              <ul className="space-y-4 mb-8">
                {selectedService.detalles.map((d: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-4 text-xs font-bold text-slate-700"><div className="w-1.5 h-1.5 rounded-full bg-[#05ABCA]" /> {d}</li>
                ))}
              </ul>
              <button 
                onClick={() => sendWhatsApp(`Hola, quiero más información sobre el servicio de ${selectedService.title}`)}
                className="w-full py-4 bg-[#0A1F33] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#05ABCA] transition-all"
              >
                Hablar con un asesor
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}