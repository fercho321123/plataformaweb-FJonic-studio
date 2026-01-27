'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowLeft, FiArrowUpRight, FiInstagram, FiMail, FiMapPin, 
  FiMenu, FiX, FiPlay, FiAward, FiTrendingUp, FiEye,
  FiTarget, FiHeart, FiZap, FiCheckCircle
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',
  mediumBlue: '#0D3A66',
  lightBlue: '#175A8C',
  brightBlue: '#1C75BC',
  cyan: '#05ABC4',
};

// CASOS DE ÉXITO
const casosExito = [
  {
    id: 1,
    titulo: 'The Smoky Legacy',
    subtitulo: 'Hamburguesería al Barril',
    categoria: 'Branding & Producción Audiovisual',
    tagline: 'Tradición artesanal convertida en experiencia sensorial',
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=800&fit=crop',
    desafio: {
      titulo: 'El Desafío',
      descripcion: 'Una hamburguesería con técnica artesanal única necesitaba diferenciarse en un mercado saturado. Su proceso de cocción al barril y el característico humo no se traducían en una identidad visual memorable ni en contenido que captara la atención digital.',
      puntos: [
        'Falta de identidad visual cohesiva',
        'Ausencia de contenido audiovisual profesional',
        'Baja diferenciación frente a competidores',
        'Desconexión entre la experiencia física y digital'
      ]
    },
    solucion: {
      titulo: 'Nuestra Estrategia',
      descripcion: 'Desarrollamos un ecosistema de marca que celebra el arte culinario. Creamos una identidad visual atemporal inspirada en la técnica del fuego lento, complementada con spots cinematográficos que capturan la magia del humo y el barril.',
      puntos: [
        'Sistema de identidad visual premium con enfoque en texturas orgánicas',
        'Producción audiovisual 4K con técnicas de slow motion',
        'Paleta cromática inspirada en brasas y maderas nobles',
        'Estrategia de contenido enfocada en el proceso artesanal'
      ]
    },
    resultados: {
      titulo: 'El Legado',
      descripcion: 'Una marca que trasciende el concepto de comida rápida para posicionarse como experiencia gastronómica premium.',
      metricas: [
        { label: 'Incremento en reconocimiento', valor: '340%' },
        { label: 'Engagement en redes', valor: '+285%' },
        { label: 'Alcance audiovisual', valor: '2.5M' },
        { label: 'Crecimiento en ventas', valor: '+156%' }
      ]
    },
    tags: ['Branding', 'Video 4K', 'Storytelling', 'Identidad Visual'],
    color: '#FF6B35'
  },
  {
    id: 2,
    titulo: 'Morning Essence',
    subtitulo: 'Desayunos Saludables Premium',
    categoria: 'Marketing Digital & Social Strategy',
    tagline: 'Emociones que nutren, contenido que conecta',
    imagen: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&h=800&fit=crop',
    desafio: {
      titulo: 'El Desafío',
      descripcion: 'Una marca de desayunos saludables con productos excepcionales enfrentaba invisibilidad digital. Su presencia en Instagram carecía de estrategia emocional y no lograba generar la conexión necesaria con una audiencia consciente de su bienestar.',
      puntos: [
        'Contenido genérico sin conexión emocional',
        'Bajo engagement y crecimiento estancado',
        'Ausencia de narrativa de marca consistente',
        'Oportunidad desaprovechada en Instagram como canal principal'
      ]
    },
    solucion: {
      titulo: 'Nuestra Estrategia',
      descripcion: 'Diseñamos una estrategia de contenido centrada en momentos emotivos del día. Transformamos cada publicación en una invitación a rituales matutinos conscientes, elevando el desayuno de necesidad a experiencia de autocuidado.',
      puntos: [
        'Narrativa emocional enfocada en bienestar integral',
        'Fotografía lifestyle con paleta cálida y acogedora',
        'Reels cinematográficos destacando texturas y momentos',
        'Community management proactivo con enfoque en historias reales'
      ]
    },
    resultados: {
      titulo: 'El Impacto',
      descripcion: 'Una comunidad comprometida que encuentra en cada post inspiración para comenzar mejor el día.',
      metricas: [
        { label: 'Crecimiento de seguidores', valor: '+425%' },
        { label: 'Tasa de engagement', valor: '8.7%' },
        { label: 'Alcance mensual', valor: '890K' },
        { label: 'Conversión a ventas', valor: '+312%' }
      ]
    },
    tags: ['Instagram Strategy', 'Content Creation', 'Emotional Branding', 'Photography'],
    color: '#4ECDC4'
  }
];

export default function PortafolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [casoActivo, setCasoActivo] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#0A1F33] text-white overflow-x-hidden">
      
      {/* NAVIGATION BAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A1F33]/95 backdrop-blur-lg shadow-2xl shadow-black/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/imagenes/logoblanco.png" 
                alt="FJONIC Studio Logo"
                className="h-10 w-auto transform group-hover:scale-110 transition-all duration-300"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Inicio</Link>
              <Link href="/servicios" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Servicios</Link>
              <Link href="/portafolio" className="text-sm font-bold uppercase tracking-wider text-[#05ABC4]">Portafolio</Link>
              <Link href="/nosotros" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Nosotros</Link>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Blog</Link>
              <Link href="/contacto" className="bg-[#05ABC4] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] hover:scale-105 transition-all shadow-lg shadow-[#05ABC4]/30">
                Iniciar Proyecto
              </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl">
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-[#0A1F33]/98 backdrop-blur-lg border-t border-white/10 transition-all duration-300 ${menuOpen ? 'opacity-100 visible max-h-screen' : 'opacity-0 invisible max-h-0'} overflow-hidden z-40`}>
          <div className="px-6 py-6 space-y-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Inicio</Link>
            <Link href="/servicios" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Servicios</Link>
            <Link href="/portafolio" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-[#05ABC4] py-2">Portafolio</Link>
            <Link href="/nosotros" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Nosotros</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Blog</Link>
            <Link href="/contacto" onClick={() => setMenuOpen(false)} className="block bg-[#05ABC4] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] text-center mt-4">
              Iniciar Proyecto
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F33] via-[#0D3A66] to-[#0A1F33]" />
          
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#05ABC4 1px, transparent 1px), linear-gradient(90deg, #05ABC4 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          <div className="absolute top-20 right-20 w-96 h-96 bg-[#05ABC4]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
            <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Portafolio</span>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
            Historias De<br />
            <span className="text-[#05ABC4] italic">Transformación</span>
          </h1>

          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Cada proyecto es una oportunidad para construir legados.<br />
            Marcas que no solo existen, sino que <span className="text-[#05ABC4] font-bold">permanecen</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-black text-[#05ABC4] mb-2">1K+</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Proyectos Completados</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#05ABC4] mb-2">10+</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Industrias Conectadas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#05ABC4] mb-2">98%</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Satisfacción Cliente</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Scroll</span>
          </div>
        </div>
      </section>

      {/* CASOS DE ÉXITO */}
      {casosExito.map((caso, index) => (
        <section 
          key={caso.id} 
          className={`py-32 px-6 relative overflow-hidden ${index % 2 === 0 ? 'bg-[#0D3A66]' : 'bg-[#0A1F33]'}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, #05ABC4 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header del Caso */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-[#05ABC4] rounded-full"></div>
                <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">{caso.categoria}</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-4 leading-tight">
                {caso.titulo}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl text-slate-400">{caso.subtitulo}</span>
              </div>
              <p className="text-xl text-slate-300 italic max-w-3xl">"{caso.tagline}"</p>
            </div>

            {/* Grid: Imagen + Info */}
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Imagen Principal */}
              <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#05ABC4]/20 to-[#1C75BC]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <img 
                    src={caso.imagen}
                    alt={caso.titulo}
                    className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F33] via-transparent to-transparent opacity-60"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-all">
                      <div className="text-[#0A1F33] text-2xl ml-1">
                        <FiPlay />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {caso.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-[#05ABC4]/10 hover:border-[#05ABC4]/30 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Métricas Destacadas */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <div className="grid grid-cols-2 gap-6">
                  {caso.resultados.metricas.map((metrica, i) => (
                    <div 
                      key={i}
                      className="bg-[#0A1F33] border border-white/10 rounded-2xl p-6 hover:border-[#05ABC4] transition-all duration-500 group"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                      }}
                    >
                      <div className="text-4xl md:text-5xl font-black text-[#05ABC4] mb-2 group-hover:scale-110 transition-transform">
                        {metrica.valor}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-bold leading-tight">
                        {metrica.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* El Desafío */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center">
                    <div className="text-white">
                      <FiTarget />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">{caso.desafio.titulo}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  {caso.desafio.descripcion}
                </p>
                <ul className="space-y-3">
                  {caso.desafio.puntos.map((punto, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400">
                      <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                        <div className="text-red-400 text-sm">
                          <FiX />
                        </div>
                      </div>
                      <span className="text-sm">{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* La Solución */}
            <div className="grid lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center">
                    <div className="text-white">
                      <FiZap />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">{caso.solucion.titulo}</h3>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <p className="text-slate-300 text-lg leading-relaxed">
                  {caso.solucion.descripcion}
                </p>
                <ul className="space-y-3">
                  {caso.solucion.puntos.map((punto, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0">
                        <div className="text-white text-sm">
                          <FiCheckCircle />
                        </div>
                      </div>
                      <span className="text-sm font-medium">{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* El Legado/Impacto */}
            <div className="bg-gradient-to-br from-[#05ABC4]/10 to-[#1C75BC]/10 border border-[#05ABC4]/30 rounded-3xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center">
                  <div className="text-white">
                    <FiAward />
                  </div>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">{caso.resultados.titulo}</h3>
              </div>
              <p className="text-slate-200 text-xl leading-relaxed italic">
                "{caso.resultados.descripcion}"
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* OTROS PROYECTOS DESTACADOS */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Más Proyectos</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Otros <span className="text-[#05ABC4] italic">Legados</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                titulo: 'E-Commerce Premium',
                categoria: 'Diseño Web & Desarrollo',
                imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                tags: ['React', 'Next.js', 'Stripe']
              },
              {
                titulo: 'Campaña Social Media',
                categoria: 'Marketing Digital',
                imagen: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                tags: ['Instagram', 'TikTok', 'Ads']
              },
              {
                titulo: 'Video Corporativo',
                categoria: 'Producción Audiovisual',
                imagen: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop',
                tags: ['4K', 'Motion Graphics']
              }
            ].map((proyecto, i) => (
              <div 
                key={i}
                className="group relative bg-[#0D3A66] rounded-3xl overflow-hidden border border-white/10 hover:border-[#05ABC4] transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3A66] via-[#0D3A66]/70 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[#05ABC4] text-xs uppercase font-black tracking-wider mb-2 block">
                      {proyecto.categoria}
                    </span>
                    <h3 className="text-2xl font-black uppercase mb-3 group-hover:text-[#05ABC4] transition-colors">
                      {proyecto.titulo}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proyecto.tags.map((tag, j) => (
                        <span key={j} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#05ABC4]">
                      Ver Proyecto
                      <FiArrowUpRight />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0D3A66] to-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Metodología</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Cómo Construimos <span className="text-[#05ABC4] italic">Legados</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', titulo: 'Descubrimiento', icon: <FiTarget size={32} /> },
              { num: '02', titulo: 'Estrategia', icon: <FiZap size={32} /> },
              { num: '03', titulo: 'Ejecución', icon: <FiHeart size={32} /> },
              { num: '04', titulo: 'Legado', icon: <FiAward size={32} /> }
            ].map((step, i) => (
              <div key={i} className="relative group">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#05ABC4] to-transparent"></div>
                )}
                
                <div className="bg-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 hover:transform hover:-translate-y-2 relative z-10">
                  <div className="text-6xl font-black text-[#05ABC4]/20 mb-4">{step.num}</div>
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight">{step.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 text-white leading-tight">
            Construyamos Tu<br />
            <span className="italic">Próximo Legado</span>
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Cada gran marca comienza con una conversación.<br />
            ¿Listo para escribir tu historia de éxito?
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            <Link 
              href="/contacto" 
              className="bg-white text-[#0A1F33] px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              Iniciar Proyecto
              <FiArrowUpRight />
            </Link>
            <Link 
              href="https://wa.me/3182602764" 
              target="_blank"
              className="bg-[#0A1F33] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white hover:text-[#0A1F33] transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#071626] pt-32 pb-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/imagenes/logoblanco.png" 
                  alt="FJONIC Studio Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Estudio estratégico de marketing digital y producción audiovisual. Construimos marcas coherentes, sólidas y perdurables.
              </p>
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/fjonic_studio" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#05ABC4] flex items-center justify-center transition-all group">
                  <span className="text-xl group-hover:scale-110 transition-transform inline-block">
                    <FiInstagram />
                  </span>
                </Link>
                <Link href="mailto:fjonicstudio@gmail.com" className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#05ABC4] flex items-center justify-center transition-all group">
                  <span className="text-xl group-hover:scale-110 transition-transform inline-block">
                    <FiMail />
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em] mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4">
                {['Servicios', 'Portafolio', 'Nosotros', 'Blog', 'Contacto'].map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase()}`} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em] mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#05ABC4] mt-1 flex-shrink-0">
                    <FiMapPin />
                  </span>
                  <span className="text-slate-400 text-sm">Ubaté, Cundinamarca<br />Colombia</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#05ABC4] mt-1 flex-shrink-0">
                    <FiMail />
                  </span>
                  <Link href="mailto:fjonicstudio@gmail.com" className="text-slate-400 hover:text-white transition-colors text-sm">
                    fjonicstudio@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs uppercase font-bold tracking-widest">
              © 2026 FJONIC STUDIO - TODOS LOS DERECHOS RESERVADOS
            </p>
            <div className="flex gap-8">
              <Link href="/privacidad" className="text-slate-600 text-xs uppercase font-bold hover:text-white cursor-pointer transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-slate-600 text-xs uppercase font-bold hover:text-white cursor-pointer transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}