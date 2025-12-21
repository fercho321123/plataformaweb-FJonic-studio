'use client';

import React, { useState } from 'react';

// --- CONFIGURACIÓN ---
const WHATSAPP_NUMBER = "573001234567"; // 👈 CAMBIA ESTO POR TU NÚMERO (Ej: 573...)

// --- ICONOS ---
const CheckIcon = () => <svg className="w-5 h-5 text-[#05ABCA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const PlusIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

export default function PlanesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);

  // Función para enviar a WhatsApp
  const sendWhatsApp = (tipo: string, nombre: string) => {
    const mensaje = tipo === 'plan' 
      ? `Hola FJONIC Studio, me gustaría adquirir el *Plan de Contenido ${nombre}*. ¿Podrían darme más información?`
      : `Hola FJONIC Studio, estoy interesado en el servicio de *${nombre}*. Me gustaría conocer los detalles.`;

    const url = `https://wa.me/${573182602764}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const planesContenido = [
    { name: "Básico", cop: "1,000,000", usd: "260", features: ["6 Reels/TikToks", "Guionización", "Edición Premium", "Portadas y Copys", "1 Feedback mensual"] },
    { name: "Medio", cop: "2,000,000", usd: "520", features: ["12 Reels/TikToks", "Automatización IA", "Estrategia de crecimiento", "Soporte Prioritario", "2 Feedbacks mensuales"], highlight: true },
    { name: "Premium", cop: "4,000,000", usd: "1,000", features: ["Objetivos 1 a 1", "Promesa Ganar-Ganar", "Embudo de Ventas", "Ads Management", "Garantía de resultado*"] }
  ];

  const serviciosExtra = [
    { title: "Identidad Visual", desc: "Logotipo profesional y manual de marca.", price: "Desde $800k COP", icon: "🎨", detalles: ["Diseño de Logotipo", "Paleta de colores", "Manual de marca", "Papelería digital", "Formatos RRSS"] },
    { title: "Desarrollo Web", desc: "Sitios optimizados para vender.", price: "Desde $1.5M COP", icon: "🌐", detalles: ["Diseño UI/UX", "Velocidad Pro", "Certificado SSL", "Responsive", "Google Analytics"] },
    { title: "Automatización CRM", desc: "Chatbots y flujos inteligentes.", price: "Desde $600k COP", icon: "🤖", detalles: ["ManyChat Pro", "Filtro de leads", "Respuestas IA", "Base de Datos", "Reporte Automático"] },
    { title: "Google & Meta Ads", desc: "Tráfico pago de alta conversión.", price: "Gestión mensual", icon: "📈", detalles: ["Segmentación Pro", "Diseño de Ads", "Pixel & API", "A/B Testing", "Reporte ROAS"] },
    { title: "SEO & Copywriting", desc: "Posicionamiento y textos persuasivos.", price: "Bajo presupuesto", icon: "✍️", detalles: ["Keyword Research", "Blogs optimizados", "Sales Copy", "Auditoría Web", "Link Building"] },
    { title: "E-mail Marketing", desc: "Fidelización y recuperación de ventas.", price: "Mensual", icon: "📧", detalles: ["Plantillas Pro", "Automatización", "Carritos Abandonados", "Segmentación", "Reporte Clics"] }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-20">
      
      {/* HEADER */}
      <header className="bg-[#0A1F33] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-[10px]">Soluciones FJONIC 360°</span>
          <h1 className="text-4xl md:text-5xl font-black mt-4 mb-2">Planes y <span className="text-[#05ABCA]">Servicios</span></h1>
          <p className="text-slate-400 max-w-xl">Escala tu negocio con el respaldo técnico y creativo de nuestro equipo.</p>
        </div>
      </header>

      {/* PLANES DE CONTENIDO */}
      <section>
        <h2 className="text-2xl font-black text-[#0A1F33] mb-8 font-montserrat uppercase tracking-tight">01. Gestión de Contenido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planesContenido.map((plan, i) => (
            <div key={i} className={`p-8 rounded-[3rem] border border-slate-100 shadow-xl transition-all flex flex-col ${plan.highlight ? 'bg-[#0A1F33] text-white scale-105 z-10 border-none' : 'bg-white'}`}>
              <h3 className={`text-2xl font-black mb-1 ${plan.highlight ? 'text-[#05ABCA]' : 'text-[#0A1F33]'}`}>{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">${plan.cop}</span>
                <p className="text-[#05ABCA] text-[10px] font-black uppercase tracking-widest mt-1">COP / Mensual</p>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <CheckIcon /> <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => sendWhatsApp('plan', plan.name)}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.highlight ? 'bg-[#05ABCA] text-white hover:bg-white hover:text-[#0A1F33]' : 'bg-[#0A1F33] text-white hover:bg-[#05ABCA]'}`}
              >
                Solicitar este Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS ESPECIALIZADOS */}
      <section>
        <h2 className="text-2xl font-black text-[#0A1F33] mb-8 font-montserrat uppercase tracking-tight">02. Otros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviciosExtra.map((serv, i) => (
            <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
              <div className="text-4xl mb-6">{serv.icon}</div>
              <h4 className="text-xl font-black text-[#0A1F33] mb-2">{serv.title}</h4>
              <p className="text-slate-500 text-sm mb-6">{serv.desc}</p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50 text-[10px] font-black">
                <span className="text-[#05ABCA] uppercase tracking-widest">{serv.price}</span>
                <button 
                  onClick={() => setSelectedService(serv)}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-[#05ABCA] hover:text-white transition-all"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL CON WHATSAPP */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A1F33]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="bg-[#0A1F33] p-10 text-white text-center relative">
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><CloseIcon /></button>
              <div className="text-6xl mb-4">{selectedService.icon}</div>
              <h3 className="text-3xl font-black">{selectedService.title}</h3>
            </div>
            <div className="p-10">
              <ul className="space-y-4 mb-10">
                {selectedService.detalles.map((detalle: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#05ABCA]" /> {detalle}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => sendWhatsApp('servicio', selectedService.title)}
                className="w-full py-5 bg-[#0A1F33] text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-[#05ABCA] transition-all shadow-xl"
              >
                Me interesa este servicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASESOR PERSONALIZADO */}
      <footer className="bg-gradient-to-br from-[#0A1F33] to-[#0D3A66] p-12 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-4">¿Necesitas una solución a medida?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto font-medium">Nuestro equipo se sienta contigo para diseñar una estrategia que cumpla tus objetivos específicos.</p>
          <button 
            onClick={() => {
              const url = `https://wa.me/${573182602764}?text=${encodeURIComponent("Hola FJONIC, quiero agendar una consultoría para un proyecto personalizado.")}`;
              window.open(url, '_blank');
            }}
            className="px-12 py-5 bg-[#05ABCA] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-[#05ABCA]/20"
          >
            Hablar con un consultor
          </button>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(5,171,202,0.2),transparent)]"></div>
      </footer>
    </div>
  );
}