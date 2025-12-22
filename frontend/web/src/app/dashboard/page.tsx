'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

// --- ICONOS MINIMALISTAS CORREGIDOS (USANDO SPAN PARA EVITAR ERRORES DE ANIDAMIENTO) ---
const IconPlus = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path d="M12 4v16m8-8H4" />
  </svg>
);

const IconDot = () => (
  <span className="inline-block w-2 h-2 rounded-full bg-[#05ABCA] flex-shrink-0" />
);

export default function DashboardExclusivo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Configuración de animaciones profesional
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    animate: { 
      transition: { staggerChildren: 0.15 } 
    }
  };

  return (
    <motion.div 
      initial="initial" 
      animate="animate"
      variants={staggerContainer}
      className="space-y-24 pb-32 max-w-[1400px] mx-auto px-4 md:px-8"
    >
      
      {/* 🖤 SECCIÓN 1: EL MANIFIESTO */}
      <section className="relative pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.span variants={fadeInUp} className="text-[#05ABCA] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">
              Potencia Creativa
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-black text-[#0A1F33] leading-[0.9] font-montserrat tracking-tighter"
            >
              Diseñamos el <br /> 
              <span className="text-[#05ABCA]">Impacto Digital.</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 pb-4">
            <motion.div variants={fadeInUp} className="text-slate-500 text-lg leading-relaxed font-medium border-l-2 border-slate-100 pl-8">
              En <strong className="text-[#0A1F33]">FJONIC Studio</strong>, desafiamos lo convencional para elevar marcas al nivel de sofisticación que el mercado global exige.
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🚀 SECCIÓN 2: PILARES DE EXCELENCIA */}
      <section>
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50"
        >
          {[
            { 
              num: "01", 
              title: "Nuestra Misión", 
              desc: "Transformar la visión de nuestros clientes en ecosistemas digitales que definan el nuevo estándar de su industria.",
              label: "Estrategia" 
            },
            { 
              num: "02", 
              title: "Nuestra Visión", 
              desc: "Ser el epicentro global de la innovación creativa, donde cada proyecto sea una obra maestra técnica.",
              label: "Innovación"
            },
            { 
              num: "03", 
              title: "Valores Core", 
              desc: "Excelencia intransigente, transparencia absoluta y una obsesión por el detalle en cada desarrollo.",
              label: "Cultura"
            }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              whileHover={{ backgroundColor: "#F8FAFC" }}
              className="bg-white p-12 flex flex-col justify-between h-[400px] transition-colors group"
            >
              <div>
                <span className="text-4xl font-black text-slate-100 group-hover:text-[#05ABCA]/20 transition-colors font-montserrat">
                  {pillar.num}
                </span>
                <p className="text-[#05ABCA] text-[10px] font-black uppercase tracking-widest mt-4">{pillar.label}</p>
                <h3 className="text-2xl font-black text-[#0A1F33] mt-2 font-montserrat">{pillar.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 👥 SECCIÓN 3: LIDERAZGO EJECUTIVO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-4 sticky top-32">
          <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#0A1F33] font-montserrat tracking-tighter">Dirección <br />Estratégica.</motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 mt-6 text-sm font-medium leading-relaxed max-w-xs">
            Especialistas enfocados en la ejecución técnica y la dirección de proyectos de alto impacto.
          </motion.p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { name: "Brayan Fernando Jimenez", role: "CEO / Director Creativo", img: "/equipo/fernando.png", bio: "Estratega de marca con enfoque en disrupción visual y comercial." },
            { name: "Yuli Johana Rodriguez", role: "CTO / Líder Tecnológica", img: "/equipo/yuli.png", bio: "Arquitecta de software especializada en sistemas escalables." }
          ].map((m, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative aspect-[4/5] bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
                <img 
                   src={m.img} 
                   alt={m.name} 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F33] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#05ABCA] mb-2">Socio</p>
                  <h4 className="text-xl font-black font-montserrat">{m.name}</h4>
                </div>
              </div>
              <div className="mt-6 px-4">
                <p className="text-xs font-black text-[#0A1F33] uppercase tracking-widest">{m.role}</p>
                <p className="text-slate-400 text-xs mt-2 font-medium">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛠️ SECCIÓN 4: STACK TÉCNICO */}
      <motion.section 
        variants={fadeInUp}
        className="bg-[#0A1F33] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-md">
            <h3 className="text-3xl font-black font-montserrat mb-8">Ecosistema Tecnológico.</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-12">
              Arquitecturas modernas diseñadas para escalar sin límites, optimizadas para rendimiento y seguridad.
            </p>
            <div className="flex flex-wrap gap-4">
               {["Next.js", "TypeScript", "Node.js", "Tailwind"].map((t, i) => (
                 <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/10">{t}</span>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-12">
            {[
              { label: "Rendimiento", val: "100ms" },
              { label: "Disponibilidad", val: "99.9%" },
              { label: "Seguridad", val: "Nivel 4" },
              { label: "Respuesta", val: "Instante" }
            ].map((stat, i) => (
              <div key={i} className="border-l border-[#05ABCA] pl-8">
                <p className="text-3xl font-black font-montserrat text-white">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 📍 SECCIÓN 5: CONSULTAS (FAQ) CORREGIDA */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
           <h2 className="text-2xl font-black text-[#0A1F33] font-montserrat uppercase tracking-tighter">Análisis de Negocio</h2>
           <div className="h-px flex-1 bg-slate-100"></div>
        </div>
        
        <div className="space-y-8">
          {[
            { q: "¿Cómo se diferencia FJONIC Studio de otras agencias?", a: "Fusionamos análisis de datos con diseño emocional para crear activos comerciales que se traducen en resultados medibles." },
            { q: "¿Cuál es el proceso para un nuevo proyecto?", a: "Iniciamos con auditoría estratégica, seguida de prototipado de alta fidelidad y desarrollo ágil escalable." }
          ].map((item, i) => (
            <div 
              key={i} 
              className="cursor-pointer group border-b border-slate-50 pb-8"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                {/* CAMBIADO P POR DIV PARA EVITAR ERROR DE HIDRATACIÓN */}
                <div className="text-sm font-black text-[#0A1F33] uppercase tracking-widest flex items-center gap-3">
                  <IconDot /> 
                  <span>{item.q}</span>
                </div>
                <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-45 text-[#05ABCA]' : ''}`}>
                  <IconPlus />
                </div>
              </div>
              {openFaq === i && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-500 text-sm mt-4 leading-relaxed font-medium pl-5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  );
}