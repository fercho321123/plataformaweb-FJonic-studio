'use client';

import React, { useState } from 'react';

// --- ICONOS SVG PREMIUM ---
const IconVision = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>;
const IconMision = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>;
const IconValues = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.52-8.52 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const IconChevron = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function NosotrosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const equipo = [
    { 
      name: "Brayan Fernando Jimenez Murcia", 
      role: "CEO & Director Creativo", 
      color: "from-blue-600 to-blue-400",
      image: "/equipo/fernando.png",
      animation: "slide-in-from-left-20"
    },
    { 
      name: "Yuli Johana Rodriguez Benitez", 
      role: "Lead Developer", 
      color: "from-[#05ABCA] to-cyan-400",
      image: "/equipo/yuli.png",
      animation: "slide-in-from-right-20"
    },
  ];

  const tecnologias = [
    { name: "React", color: "text-blue-400" },
    { name: "Next.js", color: "text-slate-900" },
    { name: "Tailwind", color: "text-cyan-400" },
    { name: "TypeScript", color: "text-blue-600" },
    { name: "Node.js", color: "text-green-500" },
    { name: "Figma", color: "text-purple-500" }
  ];

  const faqs = [
    {
      q: "¿Cuánto tiempo toma desarrollar un proyecto?",
      a: "Depende de la complejidad. Un sitio web corporativo suele tomar de 2 a 4 semanas, mientras que una plataforma personalizada puede llevar de 2 a 3 meses."
    },
    {
      q: "¿Ofrecen mantenimiento después del lanzamiento?",
      a: "Sí, en FJONIC Studio ofrecemos planes de soporte continuo para asegurar que tu tecnología siempre esté actualizada y segura."
    },
    {
      q: "¿Trabajan con clientes fuera de Colombia?",
      a: "¡Totalmente! Gracias a nuestra infraestructura digital, colaboramos con empresas de toda Latinoamérica y Estados Unidos sin barreras."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* 🏆 HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A1F33] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 max-w-3xl text-balance">
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-xs font-montserrat">Agencia Creativa</span>
          <h1 className="text-4xl md:text-6xl font-black font-montserrat mt-4 mb-6 leading-tight">
            Impulsando la <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05ABCA] to-blue-400">
              Transformación Digital
            </span>
          </h1>
          <p className="text-slate-300 text-lg font-open-sans leading-relaxed">
            En <strong className="text-white">FJONIC Studio</strong>, fusionamos arte y tecnología para crear experiencias digitales que no solo se ven bien, sino que funcionan.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#05ABCA] rounded-full blur-[120px] opacity-20"></div>
      </section>

      {/* 🚀 MISIÓN, VISIÓN Y VALORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Nuestra Misión", desc: "Democratizar el acceso a tecnología de vanguardia y diseño de clase mundial.", icon: <IconMision />, bg: "bg-blue-50", text: "text-[#0D3A66]" },
          { title: "Nuestra Visión", desc: "Ser el estudio creativo referente en Latinoamérica por la calidad humana y técnica.", icon: <IconVision />, bg: "bg-cyan-50", text: "text-[#05ABCA]" },
          { title: "Valores", desc: "Integridad, pasión por los detalles y un compromiso real con nuestros clientes.", icon: <IconValues />, bg: "bg-rose-50", text: "text-rose-500" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300">
            <div className={`w-14 h-14 ${item.bg} ${item.text} rounded-2xl flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-black font-montserrat text-[#0D3A66] mb-4">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-open-sans">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 👥 EL EQUIPO */}
      <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black font-montserrat text-[#0A1F33]">El Cerebro detrás de FJONIC</h2>
          <p className="text-slate-500 mt-2 font-open-sans">Mentes creativas trabajando para tu negocio.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-16">
          {equipo.map((member, i) => (
            <div key={i} className={`group text-center max-w-[220px] animate-in fade-in ${member.animation} duration-1000 delay-${i * 200}`}>
              <div className={`relative w-40 h-40 mx-auto rounded-full bg-gradient-to-tr ${member.color} p-1.5 mb-6 shadow-xl transform group-hover:scale-110 transition-all duration-500`}>
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 border-4 border-white flex items-center justify-center">
                  {member.image && (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center text-[#0D3A66] text-4xl font-black -z-10">
                    {member.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h4 className="font-black font-montserrat text-[#0D3A66] text-lg leading-tight mb-1">{member.name}</h4>
              <p className="text-[11px] font-bold text-[#05ABCA] uppercase tracking-[0.2em]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠️ TECNOLOGÍAS */}
      <section className="text-center py-6">
        <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-[0.4em] mb-8">Stack Tecnológico</h3>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {tecnologias.map((tech, i) => (
            <div key={i} className={`flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-${i * 100}`}>
              <span className={`text-lg md:text-xl font-black ${tech.color} opacity-80 hover:opacity-100 transition-opacity cursor-default font-montserrat`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ SECCIÓN FAQ (NUEVA) */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black font-montserrat text-[#0A1F33]">Preguntas Frecuentes</h2>
          <div className="w-12 h-1 bg-[#05ABCA] mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/50 transition-colors"
              >
                <span className="font-bold text-[#0D3A66] pr-4">{faq.q}</span>
                <IconChevron isOpen={openFaq === index} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-6 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📍 CONTACTO RÁPIDO */}
      <section className="bg-gradient-to-r from-[#0D3A66] to-[#0A1F33] rounded-[2.5rem] p-10 text-center text-white relative shadow-2xl overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-2xl font-black font-montserrat mb-4">¿Quieres ser parte de nuestra historia?</h3>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto font-open-sans text-sm">
            Estamos siempre en busca de nuevos retos y colaboraciones que cambien el juego.
            </p>
            <button className="bg-[#05ABCA] hover:bg-white hover:text-[#05ABCA] text-white px-10 py-4 rounded-2xl font-black text-sm transition-all shadow-xl active:scale-95">
            Escríbenos hoy mismo
            </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
      </section>
    </div>
  );
}