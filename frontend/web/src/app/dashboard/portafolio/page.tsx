'use client';

import { useEffect, useState } from 'react';

// --- DATA DE EMPRESAS (Tu contenido actual de carruseltertulia.tsx) ---
const proyectos = [
  {
    id: 'burger-station',
    nombre: 'The Burger Station',
    logo: '/logos/theburgerstation.png', // Asegúrate de que esta ruta exista
    categoria: 'Branding & Social Media',
    descripcion: 'Desarrollo de identidad visual y contenido gastronómico de alto impacto.',
    color: '#EAB308',
    imagenes: [
      '/servicios/station 1.png', '/servicios/station 2.png', '/servicios/station 3.png',
      '/servicios/station 4.png', '/servicios/station 5.png', '/servicios/station 6.png',
      '/servicios/station 7.png', '/servicios/station 8.png', '/servicios/station 9.png',
    ],
  },
  {
    id: 'la-tertulia',
    nombre: 'La Tertulia',
    logo: '/logos/tertulia.png', // Asegúrate de que esta ruta exista
    categoria: 'Gestión Integral & Diseño',
    descripcion: 'Estrategia digital completa y curación de contenido para marca premium.',
    color: '#05ABCA',
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

// --- COMPONENTE INTERNO: CARD DE PROYECTO ---
function ProyectoCard({ proyecto, onClick }: { proyecto: typeof proyectos[0], onClick: () => void }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % proyecto.imagenes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [proyecto.imagenes.length, isHovered]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Encabezado de la Tarjeta */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <div className="w-10 h-10 bg-slate-50 rounded-xl p-1.5 border border-slate-100 flex items-center justify-center">
          <img src={proyecto.logo} alt="" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-black font-montserrat text-[#0A1F33] uppercase leading-none tracking-tighter">
            {proyecto.nombre}
          </h3>
          <p className="text-[10px] font-bold text-[#05ABCA] uppercase tracking-widest mt-1">{proyecto.categoria}</p>
        </div>
      </div>

      {/* Frame de Visualización (Estilo Smartphone) */}
      <div 
        onClick={onClick}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-[#0A1F33] cursor-pointer shadow-inner border-[6px] border-slate-50"
      >
        {proyecto.imagenes.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          />
        ))}
        
        {/* Overlay de Interacción */}
        <div className="absolute inset-0 bg-[#0A1F33]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white border border-white/30">
                <span className="text-xs font-black font-montserrat uppercase tracking-widest">Ver Galería</span>
            </div>
        </div>
      </div>

      {/* Indicadores de imágenes */}
      <div className="flex justify-center gap-1 mt-6">
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
  const [selectedProject, setSelectedProject] = useState<typeof proyectos[0] | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* HEADER DE LA PÁGINA */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-[10px] font-montserrat">Case Studies</span>
          <h1 className="text-4xl md:text-5xl font-black font-montserrat text-[#0A1F33] mt-2">
            Portafolio <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0D3A66] to-[#05ABCA]">Empresarial</span>
          </h1>
        </div>
        <p className="max-w-xs text-slate-500 text-sm font-open-sans border-l-2 border-[#05ABCA] pl-4">
          Visualiza los resultados reales que hemos entregado a nuestros clientes exclusivos.
        </p>
      </header>

      {/* GRID DE PROYECTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {proyectos.map((proy) => (
          <ProyectoCard 
            key={proy.id} 
            proyecto={proy} 
            onClick={() => setSelectedProject(proy)} 
          />
        ))}

        {/* Tarjeta de "Tu proyecto aquí" */}
        <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-slate-300 group hover:border-[#05ABCA]/30 transition-all cursor-default">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
            <p className="font-bold font-montserrat text-[10px] uppercase tracking-[0.2em]">Siguiente marca</p>
        </div>
      </div>

      {/* MODAL DE GALERÍA (Se activa al hacer clic en una tarjeta) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0A1F33]/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-[#F8FAFC] w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
            {/* Header del Modal */}
            <div className="p-6 md:p-8 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl p-2 border border-slate-100">
                    <img src={selectedProject.logo} alt="" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-montserrat text-[#0A1F33] uppercase leading-none">{selectedProject.nombre}</h2>
                  <p className="text-[#05ABCA] text-[10px] font-bold uppercase tracking-widest mt-1">Exhibición de Activos Digitales</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Contenido de la Galería (Masonry Grid) */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {selectedProject.imagenes.map((img, i) => (
                  <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md border-4 border-white hover:scale-[1.03] transition-transform duration-300">
                    <img src={img} alt="" className="w-full h-auto block" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="p-4 bg-white border-t border-slate-100 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-montserrat">FJONIC Studio • Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}