'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// --- DATA DE EMPRESAS ---
const empresas = [
  {
    id: 'burger-station',
    nombre: 'The Burger Station',
    logo: '/logos/theburgerstation.png',
    categoria: 'Branding & Social Media',
    descripcion: 'Desarrollo de identidad visual y contenido gastronómico de alto impacto.',
    color: '#EAB308', // Dorado/Amarillo Burger
    imagenes: [
      '/servicios/station 1.png', '/servicios/station 2.png', '/servicios/station 3.png',
      '/servicios/station 4.png', '/servicios/station 5.png', '/servicios/station 6.png',
      '/servicios/station 7.png', '/servicios/station 8.png', '/servicios/station 9.png',
    ],
  },
  {
    id: 'la-tertulia',
    nombre: 'La Tertulia',
    logo: '/logos/tertulia.png',
    categoria: 'Gestión Integral & Diseño',
    descripcion: 'Estrategia digital completa y curación de contenido para marca premium.',
    color: '#05ABCA', // Celeste FJONIC
    imagenes: [
      '/servicios/tertulia 1.png', '/servicios/tertulia 2.png', '/servicios/tertulia 3.png',
      '/servicios/tertulia 4.png', '/servicios/tertulia 5.png', '/servicios/tertulia 6.png',
      '/servicios/tertulia 7.png', '/servicios/tertulia 8.png', '/servicios/tertulia 9.png',
      '/servicios/tertulia 10.png', '/servicios/tertulia 11.png', '/servicios/tertulia 12.png',
      '/servicios/tertulia 13.png', '/servicios/tertulia 14.png', '/servicios/tertulia 15.png',
      '/servicios/tertulia 16.png',
    ],
  }
];

// --- COMPONENTE DE TARJETA DE PROYECTO ---
function ProyectoCard({ proyecto, alAbrir }: { proyecto: typeof empresas[0], alAbrir: () => void }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % proyecto.imagenes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [proyecto.imagenes.length, hover]);

  return (
    <div 
      className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* HEADER CARD */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-slate-50 rounded-xl p-2 border border-slate-100">
            <img src={proyecto.logo} alt={proyecto.nombre} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-sm font-black font-montserrat text-[#0A1F33] uppercase tracking-tighter leading-none">
              {proyecto.nombre}
            </h3>
            <span className="text-[10px] font-bold text-[#05ABCA] uppercase tracking-widest">{proyecto.categoria}</span>
          </div>
        </div>
        <span className="text-[9px] bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-black uppercase">Proyecto Real</span>
      </div>

      {/* VISUALIZADOR TIPO CELULAR */}
      <div 
        onClick={alAbrir}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-[#0A1F33] cursor-pointer ring-4 ring-slate-50 shadow-inner"
      >
        {proyecto.imagenes.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${proyecto.nombre} ${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ))}
        {/* Overlay al hacer hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white border border-white/30">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path></svg>
            </div>
        </div>
      </div>

      <p className="mt-6 text-slate-500 text-xs font-open-sans leading-relaxed px-2 line-clamp-2">
        {proyecto.descripcion}
      </p>

      {/* INDICADORES MINIMALISTAS */}
      <div className="flex justify-center gap-1.5 mt-6">
        {proyecto.imagenes.slice(0, 8).map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index % 8 ? 'w-6 bg-[#05ABCA]' : 'w-2 bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function PortafolioPage() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<typeof empresas[0] | null>(null);

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700">
      
      {/* TÍTULO DE SECCIÓN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-xs font-montserrat">Showcase</span>
          <h1 className="text-4xl md:text-5xl font-black font-montserrat text-[#0A1F33] mt-2">
            Nuestro Portafolio
          </h1>
        </div>
        <p className="max-w-md text-slate-500 text-sm font-open-sans border-l-4 border-[#05ABCA] pl-4">
          Una mirada detallada a las marcas que han confiado en <strong>FJONIC Studio</strong> para elevar su presencia digital.
        </p>
      </div>

      {/* GRID DE PROYECTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {empresas.map((proy) => (
          <ProyectoCard 
            key={proy.id} 
            proyecto={proy} 
            alAbrir={() => setProyectoSeleccionado(proy)} 
          />
        ))}

        {/* Placeholder para nuevo proyecto */}
        <div className="border-4 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-slate-400 group hover:border-[#05ABCA] hover:text-[#05ABCA] transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#05ABCA]/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <span className="font-black font-montserrat text-sm uppercase tracking-widest">Próximo Caso de Éxito</span>
        </div>
      </div>

      {/* MODAL DE GALERÍA FULLSCREEN */}
      {proyectoSeleccionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-[#0A1F33]/95 backdrop-blur-xl"
            onClick={() => setProyectoSeleccionado(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl p-2 border border-slate-100">
                    <img src={proyectoSeleccionado.logo} alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-montserrat text-[#0A1F33] uppercase leading-none">{proyectoSeleccionado.nombre}</h2>
                  <p className="text-[#05ABCA] text-xs font-bold uppercase tracking-widest mt-1">Galería de Entregables</p>
                </div>
              </div>
              <button 
                onClick={() => setProyectoSeleccionado(null)}
                className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-rose-500 hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Grid de Imágenes Modal */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {proyectoSeleccionado.imagenes.map((img, i) => (
                  <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg border border-white hover:scale-[1.02] transition-transform duration-300">
                    <img src={img} alt="" className="w-full h-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-6 text-center bg-white border-t border-slate-100">
                <p className="text-slate-400 text-xs font-open-sans">FJONIC Studio © 2025 - Todos los derechos de imagen reservados para el cliente.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}