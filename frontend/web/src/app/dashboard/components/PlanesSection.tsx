'use client';

import React from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#05ABCA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PlanesSection() {
  const planes = [
    {
      name: "Básico",
      priceCOP: "1,000,000",
      priceUSD: "260",
      description: "Ideal para marcas que inician su presencia digital.",
      features: [
        "6 Piezas de contenido (Reels/TikTok)",
        "Conceptualización de idea",
        "Guionización profesional",
        "Edición de video premium",
        "Diseño de portadas",
        "Copywriting para creativos",
        "1 Feedback mensual detallado"
      ],
      highlight: false,
      buttonText: "Empezar Plan Básico"
    },
    {
      name: "Medio",
      priceCOP: "2,000,000",
      priceUSD: "520",
      description: "Escala tu contenido con automatización inteligente.",
      features: [
        "12 Piezas de contenido (Reels/TikTok)",
        "Todo lo del Plan Básico",
        "Automatización de mensajes (IA)",
        "2 Feedbacks de resultados mensuales",
        "Estrategia de crecimiento acelerado",
        "Soporte prioritario"
      ],
      highlight: true,
      buttonText: "Elegir Plan Medio"
    },
    {
      name: "Premium",
      priceCOP: "4,000,000",
      priceUSD: "1,000",
      description: "Enfoque total en resultados garantizados por contrato.",
      features: [
        "Acompañamiento 1 a 1 personalizado",
        "Trazo de objetivos (Ventas/Vistas)",
        "Estrategia de Embudo Completo",
        "Promesa Ganar-Ganar",
        "Garantía de Satisfacción Total*",
        "Gestión de crisis y comunidad"
      ],
      highlight: false,
      buttonText: "Agendar Consultoría",
      note: "*Si en 3 meses no cumplimos el objetivo, trabajamos gratis hasta lograrlo."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 rounded-[3rem] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-xs">Inversión Estratégica</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F33] mt-4 mb-6 font-montserrat">
            Nuestros Planes de <span className="text-[#05ABCA]">Crecimiento</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-open-sans">
            Elige el nivel de impacto que quieres para tu marca. Desde contenido esencial hasta estrategias de alto rendimiento con garantía de resultados.
          </p>
        </div>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col p-8 rounded-[3rem] transition-all duration-500 hover:-translate-y-4 ${
                plan.highlight 
                ? 'bg-[#0A1F33] text-white shadow-2xl shadow-blue-900/40 scale-105 z-10' 
                : 'bg-white text-[#0A1F33] border border-slate-100 shadow-xl'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#05ABCA] text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-widest">
                  Más Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-black font-montserrat ${plan.highlight ? 'text-[#05ABCA]' : 'text-[#0A1F33]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-2 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-montserrat">${plan.priceCOP}</span>
                  <span className="text-xs font-bold opacity-60 uppercase">COP / Mes</span>
                </div>
                <p className="text-[#05ABCA] font-bold mt-1 text-sm">Aprox. ${plan.priceUSD} USD</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium">
                    <CheckIcon />
                    <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.note && (
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <p className="text-[11px] font-bold text-[#05ABCA] leading-relaxed italic">
                    {plan.note}
                  </p>
                </div>
              )}

              <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                plan.highlight 
                ? 'bg-[#05ABCA] hover:bg-white hover:text-[#0A1F33] text-white' 
                : 'bg-[#0A1F33] hover:bg-[#05ABCA] text-white'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Garantía Especial FJONIC */}
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-[#0A1F33] to-[#0D3A66] rounded-[3rem] text-center text-white border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4 font-montserrat">La Promesa Ganar-Ganar de FJONIC</h3>
            <p className="text-blue-200 max-w-3xl mx-auto leading-relaxed">
              En el plan <strong className="text-[#05ABCA]">Premium</strong>, no eres un cliente, eres un socio. Trazamos metas reales de ventas y vistas. 
              Si no cumplimos el objetivo propuesto en los primeros 3 meses, seguiremos trabajando arduamente **totalmente gratis** hasta que alcancemos la meta. 
              Nuestro compromiso es con tu éxito.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(5,171,202,0.1),transparent)] pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}