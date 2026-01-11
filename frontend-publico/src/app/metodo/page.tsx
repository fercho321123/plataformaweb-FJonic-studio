import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export default function MetodoPage() {
  return (
    <main className="bg-[#0A1F33] text-white pt-32">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* 7️⃣ NUESTRO ENFOQUE */}
        <section className="mb-40 text-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase">Creamos con <span className="text-[#05ABCA]">Intención</span></h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            <div className="aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center italic text-slate-600">
              <img src="/imagenes/audiovisual.png" alt="Audiovisual" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xl text-slate-300 leading-relaxed mb-6 italic">"La creatividad no es solo estética: es una herramienta para comunicar mejor."</p>
              <p className="text-slate-500">Cada proyecto parte de una estrategia clara, objetivos definidos y métricas que permiten evaluar resultados.</p>
            </div>
          </div>
        </section>

        {/* 1️⃣1️⃣ MANIFIESTO FJONIC */}
        <section className="py-32 border-y border-white/5 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
             <h3 className="text-[#05ABCA] font-black tracking-[0.5em] uppercase text-xs">Manifiesto</h3>
             <p className="text-2xl md:text-4xl font-light leading-relaxed">
               No creemos en lo pasajero. Creemos en las marcas con identidad. 
               No creamos por crear. Creamos con <span className="text-white font-black italic">intención, estrategia y visión.</span>
             </p>
             <div className="h-20 w-px bg-gradient-to-b from-[#05ABCA] to-transparent mx-auto"></div>
             <p className="text-xl text-slate-400">Porque una marca que permanece es una marca bien construida.</p>
          </div>
        </section>

        {/* 1️⃣2️⃣ FRASE FINAL / CTA */}
        <section className="py-40 text-center">
          <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter opacity-10 absolute left-0 w-full pointer-events-none uppercase">CREAR</h2>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 relative z-10">Creer es <span className="text-[#05ABCA]">crear</span></h2>
          <button className="bg-white text-[#0A1F33] px-12 py-6 rounded-2xl font-black uppercase text-sm tracking-[0.3em] hover:bg-[#05ABCA] hover:text-white transition-all">
            Hablemos de tu marca
          </button>
        </section>

      </div>
    </main>
  );
}