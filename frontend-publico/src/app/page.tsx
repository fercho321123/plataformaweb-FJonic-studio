'use client';
import React from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiZap, FiTarget, FiTrendingUp, FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';

export default function HomePage() {
  return (
    <main className="bg-[#0A1F33] text-white overflow-x-hidden">
      
      {/* 1️⃣ HERO / PORTADA (Mismo código anterior) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagenes/empresa.jpg" 
            alt="Socias FJONIC Studio"
            className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F33]/20 via-[#0A1F33]/60 to-[#0A1F33]" />
        </div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <h2 className="text-[#05ABCA] font-black tracking-[0.5em] uppercase text-xs mb-4">ESTUDIO ESTRATÉGICO</h2>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-8 uppercase italic">No creamos para hoy.<br /><span className="text-[#05ABCA]">PERMANECEMOS.</span></h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-10">
            <Link href="/planes" className="bg-[#05ABCA] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#0A1F33] transition-all">Iniciar Proyecto</Link>
          </div>
        </div>
      </section>

      {/* 4️⃣ QUÉ HACEMOS - CON IMÁGENES REFERENCIALES SELECCIONADAS */}
      <section className="py-32 px-6 bg-[#091929]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white">Qué <span className="text-[#05ABCA]">Hacemos</span></h2>
            <p className="text-slate-500 max-w-xs text-[10px] uppercase font-bold tracking-[0.2em] border-l-2 border-[#05ABCA] pl-4">Construimos marcas coherentes, sólidas y perdurables.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                t: 'Audiovisual', 
                d: 'Producción cinematográfica estratégica.', 
                img: '/imagenes/audiovisual.png' 
              },
              { 
                t: 'Publicidad', 
                d: 'Campañas creativas de alto impacto.', 
                img: '/imagenes/publicidad.png' 
              },
              { 
                t: 'Diseño Web', 
                d: 'Interfaces digitales de última generación.', 
                img: '/imagenes/web.jpg' 
              }
            ].map((serv, i) => (
              <Link href="/planes" key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 aspect-[4/5]">
                <img src={serv.img} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" alt={serv.t} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F33] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-2xl font-black uppercase mb-2 italic tracking-tighter">{serv.t}</h3>
                  <p className="text-slate-400 text-[10px] uppercase mb-6 tracking-widest">{serv.d}</p>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#05ABCA] group-hover:border-[#05ABCA] transition-all">
                    <span className="text-white text-xl"><FiArrowUpRight /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ FOOTER / CIERRE */}
      <footer className="bg-[#071626] pt-32 pb-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            {/* Lado izquierdo: CTA */}
            <div>
              <h2 className="text-5xl font-black tracking-tighter mb-8 uppercase italic">¿Listo para que tu marca <span className="text-[#05ABCA]">permanezca?</span></h2>
              <p className="text-slate-400 max-w-md mb-10">Estamos listos para transformar tu visión en una identidad atemporal con resultados medibles.</p>
              <Link href="https://wa.me/3182602764" target="_blank" className="inline-flex items-center gap-4 bg-[#05ABCA] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#05ABCA]/20">
                Contactar por WhatsApp <FiArrowUpRight />
              </Link>
            </div>

            {/* Lado derecho: Datos */}
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[#05ABCA] font-black uppercase text-[10px] tracking-[0.3em] mb-4">Síguenos</h4>
                  <Link href="https://www.instagram.com/fjonic_studio?igsh=MTJ3MzdlcmJrOHR1ZA==" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                    <span className="text-xl group-hover:text-[#05ABCA] transition-colors"><FiInstagram /></span> FJONICSTUDIO
                  </Link>
                </div>
                <div>
                  <h4 className="text-[#05ABCA] font-black uppercase text-[10px] tracking-[0.3em] mb-4">Escríbenos</h4>
                  <Link href="mailto:hola@fjonic.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                    <span className="text-xl group-hover:text-[#05ABCA] transition-colors"><FiMail /></span> fjonicstudio@gmail.com
                  </Link>
                </div>
              </div>
              
              <div className="mt-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                  <span className="text-[#05ABCA]"><FiMapPin /></span> Ubicación
                </p>
                <p className="text-white font-bold">Ubate, Cundinamarca - Colombia</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-2xl font-black italic tracking-tighter uppercase">FJONIC <span className="text-[#05ABCA]">STUDIO</span></span>
            <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest">© 2026 FJONIC STUDIO - TODOS LOS DERECHOS RESERVADOS</p>
            <div className="flex gap-6">
              {['Privacidad', 'Términos'].map(item => (
                <span key={item} className="text-slate-600 text-[10px] uppercase font-bold hover:text-white cursor-pointer transition-colors">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}