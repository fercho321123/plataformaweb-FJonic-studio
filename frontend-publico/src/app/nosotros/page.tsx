'use client';

import React from 'react';
import { FiTarget, FiEye, FiHeart, FiAward, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <main className="bg-[#0A1F33] text-white pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-[#05ABCA] font-bold mb-12 hover:opacity-70 transition-all">
          <span><FiArrowLeft /></span> Volver al Inicio
        </Link>

        {/* 2️⃣ QUIÉNES SOMOS */}
        <section className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="animate-fade-in">
            <h2 className="text-[#05ABCA] font-black tracking-widest uppercase text-xs mb-6">Autoridad + Visión</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight italic uppercase">
              MARCAS QUE <br /><span className="text-[#05ABCA]">PERMANECEN.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Somos un estudio creativo donde la estrategia y la creatividad se unen para dar vida a marcas sólidas, coherentes y duraderas.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed uppercase tracking-widest font-bold">
              No seguimos tendencias: diseñamos con visión de futuro.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-[#0d2640]">
              <img 
                src="/imagenes/NOSTROS 2.png" 
                alt="FJONIC Studio Workspace" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* 4, 5, 6: PROPÓSITO, MISIÓN, VISIÓN */}
        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {[
            { t: 'Propósito', d: 'Conectar emocionalmente y evolucionar sin perder la esencia.', i: <FiHeart />, img: 'http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_6' },
            { t: 'Misión', d: 'Diseñar marcas con enfoque en resultados medibles e intención.', i: <FiTarget />, img: 'http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_8' },
            { t: 'Visión', d: 'Ser el referente reconocido por crear marcas que perduran.', i: <FiEye />, img: 'http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_4' }
          ].map((item, idx) => (
            <div key={idx} className="relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden group hover:border-[#05ABCA]/30 transition-all">
               <div className="relative z-10">
                 <span className="text-[#05ABCA] text-3xl mb-6 block group-hover:scale-110 transition-transform">
                    {item.i}
                 </span>
                 <h4 className="font-black uppercase tracking-widest mb-4">{item.t}</h4>
                 <p className="text-slate-400 text-xs leading-relaxed uppercase">{item.d}</p>
               </div>
               <img 
                 src={item.img} 
                 className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity" 
                 alt={item.t}
               />
            </div>
          ))}
        </div>

        {/* 9️⃣ PRINCIPIOS FJONIC - VERSIÓN TECH */}
        <section className="py-32 border-t border-white/5 relative">
          <div className="text-center mb-20">
            <h2 className="text-sm font-black tracking-[0.5em] text-[#05ABCA] uppercase mb-4">Core Values</h2>
            <h3 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase">
              Principios <span className="text-[#05ABCA]">FJONIC</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[280px]">
            
            {/* 01. ATEMPORALIDAD */}
            <div className="md:col-span-4 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-[#05ABCA]/40 transition-all">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="text-[#05ABCA] font-mono text-sm tracking-widest">01 // CONCEPTO</span>
                  <h4 className="text-4xl font-black uppercase mt-2">Atemporalidad</h4>
                  <p className="text-slate-400 max-w-sm mt-4 text-sm leading-relaxed uppercase">
                    Nuestra estética ignora las modas para asegurar relevancia perpetua.
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full">
                <img src="http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_0" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="Tech" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A1F33]" />
              </div>
            </div>

            {/* 02. ESTRATEGIA */}
            <div className="md:col-span-2 bg-[#05ABCA] rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative">
              <img src="http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_9" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20" alt="Strategy" />
              <span className="text-white text-4xl relative z-10"><FiTarget /></span>
              <div className="relative z-10">
                <h4 className="text-white font-black text-2xl uppercase leading-tight mb-2">Estrategia</h4>
                <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold">Decisiones con propósito.</p>
              </div>
            </div>

            {/* 03. AUTENTICIDAD */}
            <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden group">
              <div className="h-1/2 w-full overflow-hidden">
                <img src="http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_2" className="w-full h-full object-cover group-hover:scale-110 transition-duration-700" alt="Authentic" />
              </div>
              <div className="p-8">
                <span className="text-[#05ABCA] font-mono text-[10px]">03 // ESENCIA</span>
                <h4 className="text-lg font-black uppercase mt-1">Autenticidad</h4>
                <p className="text-slate-500 text-[10px] mt-2 uppercase">Marcas reales.</p>
              </div>
            </div>

            {/* 04. MOVIMIENTO */}
            <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[#05ABCA] font-mono text-[10px]">04 // DINAMISMO</span>
                <h4 className="text-xl font-black uppercase mt-1">Movimiento</h4>
                <p className="text-slate-500 text-[10px] mt-2 uppercase italic">Evolución constante.</p>
              </div>
              <img src="http://googleusercontent.com/image_collection/image_retrieval/2049146301386275722_7" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:rotate-6 transition-transform duration-1000" alt="Motion" />
            </div>

            {/* 05. EXCELENCIA */}
            <div className="md:col-span-2 border-2 border-[#05ABCA]/30 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:bg-[#05ABCA]/5 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#05ABCA] text-2xl shrink-0">
                <FiAward />
              </div>
              <div>
                <h4 className="font-black uppercase text-sm">Excelencia</h4>
                <p className="text-slate-500 text-[9px] uppercase mt-1">Calidad máxima.</p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}