'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowUpRight, FiInstagram, FiMail, FiMapPin, FiMenu, FiX,
  FiMonitor, FiTrendingUp, FiCamera, FiPenTool, FiTarget,
  FiCode, FiLayout, FiUsers, FiAward, FiCheckCircle,
  FiPlay, FiStar, FiZap, FiLayers, FiBarChart2
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',      // Azul Oscuro Corporativo
  mediumBlue: '#0D3A66',    // Azul Medio
  lightBlue: '#175A8C',     // Azul Claro
  brightBlue: '#1C75BC',    // Azul Brillante
  cyan: '#05ABC4',          // Celeste Vivido (primary)
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img 
                src="/imagenes/logoblanco.png" 
                alt="FJONIC Studio Logo"
                className="h-10 w-auto transform group-hover:scale-110 transition-all duration-300"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Inicio</Link>
              <Link href="/servicios" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Servicios</Link>
              <Link href="/portafolio" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Portafolio</Link>
              <Link href="/nosotros" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Nosotros</Link>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Blog</Link>
              <Link href="/contacto" className="bg-[#05ABC4] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] hover:scale-105 transition-all shadow-lg shadow-[#05ABC4]/30">
                Iniciar Proyecto
              </Link>
            </div>

            {/* Mobile Menu Button */}
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
            <Link href="/portafolio" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Portafolio</Link>
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagenes/empresa.jpg" 
            alt="FJONIC Studio Team"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F33] via-[#0A1F33]/95 to-[#0A1F33]" />
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#05ABC4 1px, transparent 1px), linear-gradient(90deg, #05ABC4 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }}></div>
          </div>

          {/* Animated Circles */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#05ABC4]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#05ABC4] rounded-full animate-float opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#175A8C] rounded-full animate-float opacity-40" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#05ABC4] rounded-full animate-float opacity-50" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-[#1C75BC] rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 order-1 lg:order-1">
              {/* Decorative Line */}
              <div className="flex items-center gap-4">
                <div className="h-1 w-20 bg-gradient-to-r from-[#05ABC4] to-transparent rounded-full"></div>
                <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Marketing Digital</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Soluciones de<br />
                <span className="text-[#05ABC4] italic">Marketing Digital</span><br />
                Que Impulsan<br />
                <span className="text-[#1C75BC]">Resultados</span>
              </h1>

              <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                En FJONIC Studio, combinamos tecnología de vanguardia con conocimientos profundos del sector para ofrecer soluciones de marketing digital que no solo resuelven problemas, sino que impulsan la eficiencia, aceleran el crecimiento empresarial y transforman tu presencia digital. Nuestra innovación está enfocada en resultados medibles que te ayudan a alcanzar el éxito.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/portafolio" className="group bg-white text-black px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#05ABC4] hover:text-white transition-all shadow-xl flex items-center gap-2">
                  Ver Portafolio
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    <FiPlay />
                  </span>
                </Link>
                <Link href="/contacto" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-all">
                  Contrátanos
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#05ABC4] rounded-full animate-pulse"></div>
                  <span className="font-bold uppercase text-xs tracking-wider">Respuesta en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#05ABC4]">
                    <FiCheckCircle size={16} />
                  </span>
                  <span className="font-bold uppercase text-xs tracking-wider">100% Satisfacción</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#05ABC4]">
                    <FiAward size={16} />
                  </span>
                  <span className="font-bold uppercase text-xs tracking-wider">Calidad Premium</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-[#05ABC4] mb-2">1K+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">Proyectos Completados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-[#05ABC4] mb-2">10+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">Industrias Conectadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-[#05ABC4] mb-2">8+</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">Años de Experiencia</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:order-2 order-2 mt-8 lg:mt-0">
              <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
                <div className="absolute -inset-8 bg-[#05ABC4] rounded-full opacity-20 blur-3xl"></div>
                
                {/* Decorative Corner Accent */}
                <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-[#05ABC4] rounded-tr-3xl z-30 opacity-50"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-[#175A8C] rounded-bl-3xl z-30 opacity-50"></div>
                
                <img 
                  src="/imagenes/empresa.jpg" 
                  alt="Marketing Team" 
                  className="relative z-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 w-full"
                />
                
                {/* Floating Badges */}
                <div className="absolute -top-4 -left-4 bg-white text-black px-6 py-3 rounded-2xl shadow-xl transform hover:rotate-3 transition-all z-20">
                  <div className="text-xs uppercase font-black tracking-wider">UI/UX Design</div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#05ABC4] text-white px-6 py-3 rounded-2xl shadow-xl transform hover:rotate-3 transition-all z-20">
                  <div className="text-xs uppercase font-black tracking-wider">Product Design</div>
                </div>
              </div>
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

      {/* SERVICES TICKER */}
      <section className="bg-[#05ABC4] py-4 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="text-white font-black uppercase text-lg flex items-center gap-4">
                <span className="inline-block"><FiMonitor size={24} /></span> Diseño de Apps
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white font-black uppercase text-lg flex items-center gap-4">
                <span className="inline-block"><FiLayout size={24} /></span> Wireframes
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white font-black uppercase text-lg flex items-center gap-4">
                <span className="inline-block"><FiCode size={24} /></span> Diseño Web
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white font-black uppercase text-lg flex items-center gap-4">
                <span className="inline-block"><FiBarChart2 size={24} /></span> Dashboard
              </span>
              <span className="text-white text-2xl">•</span>
              <span className="text-white font-black uppercase text-lg flex items-center gap-4">
                <span className="inline-block"><FiPenTool size={24} /></span> Diseño de Logos
              </span>
              <span className="text-white text-2xl">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-32 px-6 bg-[#0D3A66] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #05ABC4 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#05ABC4] rounded-full"></div>
                <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Servicios</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
                Entregando Valor A Través<br />
                De <span className="text-[#05ABC4] italic">Nuestros Servicios</span>
              </h2>
              <p className="text-slate-400 max-w-xl text-sm">
                Soluciones integrales de marketing digital diseñadas para impulsar tu crecimiento
              </p>
            </div>
            <Link href="/servicios" className="text-[#05ABC4] hover:text-white transition-colors font-bold uppercase text-sm tracking-wider flex items-center gap-2 group bg-[#05ABC4]/10 px-6 py-3 rounded-full hover:bg-[#05ABC4] hover:text-white">
              Ver Todos Los Servicios
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
                <FiArrowUpRight />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiMonitor size={32} />,
                title: 'UI/UX Design',
                desc: 'Diseñamos interfaces intuitivas y amigables que mejoran la experiencia del usuario e impulsan resultados medibles.',
                color: '#05ABC4',
                img: '/imagenes/web.jpg'
              },
              {
                icon: <FiCode size={32} />,
                title: 'Diseño de Apps',
                desc: 'Diseñamos aplicaciones móviles elegantes y fáciles de usar que ofrecen experiencias fluidas y mantienen a los usuarios comprometidos.',
                color: '#175A8C',
                img: '/imagenes/publicidad.png'
              },
              {
                icon: <FiLayout size={32} />,
                title: 'Diseño Web',
                desc: 'Creamos sitios web receptivos y modernos que se ven geniales y funcionan perfectamente en todos los dispositivos.',
                color: '#05ABC4',
                img: '/imagenes/audiovisual.png'
              },
              {
                icon: <FiCamera size={32} />,
                title: 'Producción Audiovisual',
                desc: 'Contenido cinematográfico de alta calidad que cuenta tu historia y conecta emocionalmente con tu audiencia.',
                color: '#1C75BC',
                img: '/imagenes/empresa.jpg'
              },
              {
                icon: <FiTrendingUp size={32} />,
                title: 'Marketing Digital',
                desc: 'Estrategias integrales de marketing digital que aumentan tu visibilidad online y generan conversiones reales.',
                color: '#05ABC4',
                img: '/imagenes/publicidad.png'
              },
              {
                icon: <FiTarget size={32} />,
                title: 'Branding & Estrategia',
                desc: 'Construcción de marcas coherentes y memorables con estrategias que aseguran tu posicionamiento en el mercado.',
                color: '#175A8C',
                img: '/imagenes/web.jpg'
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group relative bg-[#0A1F33] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                }}
              >
                {/* Service Number Badge */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center text-xs font-black text-white/30 z-10">
                  0{i + 1}
                </div>

                {/* Service Image Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <img src={service.img} className="w-full h-full object-cover" alt={service.title} />
                </div>

                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white font-bold"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight group-hover:text-[#05ABC4] transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>

                  {/* Read More Link */}
                  <Link 
                    href="/servicios"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:text-[#05ABC4] transition-colors"
                    style={{ color: service.color }}
                  >
                    Leer Más
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
                      <FiArrowUpRight />
                    </span>
                  </Link>
                </div>

                {/* Hover Effect Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${service.color}, transparent 70%)`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-32 px-6 bg-[#0A1F33] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Side - Image */}
            <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#05ABC4]/20 to-[#1C75BC]/20 rounded-full blur-3xl -z-10"></div>
              <div className="relative max-w-lg mx-auto">
                <img 
                  src="/imagenes/empresa.jpg" 
                  alt="FJONIC Team" 
                  className="rounded-full w-full shadow-2xl transform hover:scale-105 transition-all duration-500"
                />
                
                {/* Stats Overlay */}
                <div className="absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-black/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 z-10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#05ABC4]">1K+</div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1">Proyectos</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#05ABC4]">10+</div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1">Industrias</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#05ABC4]">8+</div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mt-1">Años</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#05ABC4] rounded-full"></div>
                <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Nosotros</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
                La Historia Detrás De<br />
                <span className="text-[#05ABC4] italic">FJONIC Solutions</span>
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed">
                FJONIC Studio comenzó con una misión simple: convertir ideas en soluciones impactantes. Hoy, ayudamos a empresas a crecer con diseño inteligente, innovación y un enfoque de vanguardia. Nuestro compromiso es construir marcas que no solo existen, sino que permanecen en la mente de las personas.
              </p>

              <p className="text-slate-400 leading-relaxed">
                Desde sitios web responsivos hasta campañas de marketing digital completas, combinamos creatividad con tecnología de punta para entregar resultados medibles. Cada proyecto es una oportunidad para superar expectativas y crear experiencias digitales memorables.
              </p>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  'Diseño Centrado en el Usuario',
                  'Desarrollo Web Moderno',
                  'Estrategias de Marketing',
                  'Soporte 24/7'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#05ABC4] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">
                        <FiCheckCircle size={14} />
                      </span>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/nosotros" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#05ABC4] to-[#1C75BC] text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:scale-105 transition-all shadow-xl shadow-[#05ABC4]/30"
              >
                Conoce Más Sobre Nosotros
                <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0D3A66] to-[#0A1F33] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Proceso</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Cómo <span className="text-[#05ABC4] italic">Trabajamos</span>
            </h2>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
              Nuestro proceso probado asegura resultados excepcionales en cada proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Descubrimiento',
                desc: 'Analizamos tus objetivos, audiencia y competencia para crear una estrategia sólida.',
                icon: <FiTarget size={32} />
              },
              {
                num: '02',
                title: 'Diseño',
                desc: 'Creamos conceptos visuales únicos que capturan la esencia de tu marca.',
                icon: <FiPenTool size={32} />
              },
              {
                num: '03',
                title: 'Desarrollo',
                desc: 'Construimos tu solución con las últimas tecnologías y mejores prácticas.',
                icon: <FiCode size={32} />
              },
              {
                num: '04',
                title: 'Lanzamiento',
                desc: 'Lanzamos tu proyecto y proporcionamos soporte continuo para el éxito.',
                icon: <FiZap size={32} />
              }
            ].map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector Line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#05ABC4] to-transparent"></div>
                )}
                
                <div className="bg-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 hover:transform hover:-translate-y-2 relative z-10">
                  {/* Number */}
                  <div className="text-6xl font-black text-[#05ABC4]/20 mb-4">{step.num}</div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{step.title}</h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#05ABC4] rounded-full"></div>
                <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Portafolio</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
                Proyectos <span className="text-[#05ABC4] italic">Destacados</span>
              </h2>
            </div>
            <Link href="/portafolio" className="text-[#05ABC4] hover:text-white transition-colors font-bold uppercase text-sm tracking-wider flex items-center gap-2 group bg-[#05ABC4]/10 px-6 py-3 rounded-full hover:bg-[#05ABC4] hover:text-white">
              Ver Todo el Portafolio
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
                <FiArrowUpRight />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'E-Commerce Revolucionario',
                category: 'Diseño Web & Desarrollo',
                img: '/imagenes/web.jpg',
                tags: ['React', 'Next.js', 'Stripe']
              },
              {
                title: 'Campaña Social Media',
                category: 'Marketing Digital',
                img: '/imagenes/publicidad.png',
                tags: ['Instagram', 'TikTok', 'Ads']
              },
              {
                title: 'Video Corporativo Premium',
                category: 'Producción Audiovisual',
                img: '/imagenes/audiovisual.png',
                tags: ['4K', 'Motion Graphics', 'Edición']
              },
              {
                title: 'App Móvil Innovadora',
                category: 'UI/UX Design',
                img: '/imagenes/empresa.jpg',
                tags: ['iOS', 'Android', 'Figma']
              }
            ].map((project, i) => (
              <Link 
                href="/portafolio" 
                key={i}
                className="group relative bg-[#0D3A66] rounded-3xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-500 block"
              >
                {/* Project Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3A66] via-[#0D3A66]/70 to-transparent z-10"></div>
                
                  {/* Project Info - Positioned over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                    <span className="text-[#05ABC4] text-xs uppercase font-black tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 group-hover:text-[#05ABC4] transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project Button */}
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#05ABC4] group-hover:gap-4 transition-all">
                      Ver Proyecto
                      <span className="group-hover:rotate-45 transition-transform inline-block">
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0D3A66] to-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Testimonios</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Lo Que Dicen Nuestros <span className="text-[#05ABC4] italic">Clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                position: 'CEO, TechStart',
                text: 'FJONIC transformó completamente nuestra presencia digital. Su equipo es profesional, creativo y siempre entrega a tiempo.',
                rating: 5
              },
              {
                name: 'Carlos Ramírez',
                position: 'Director, InnovaHub',
                text: 'El mejor estudio de diseño con el que hemos trabajado. Entendieron nuestra visión y la llevaron al siguiente nivel.',
                rating: 5
              },
              {
                name: 'Ana Martínez',
                position: 'Fundadora, GreenLife',
                text: 'Profesionalismo excepcional y resultados increíbles. Nuestras ventas aumentaron un 300% después de trabajar con ellos.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-[#05ABC4]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#05ABC4" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-300 italic leading-relaxed mb-8">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center text-xl font-black">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black uppercase text-sm">{testimonial.name}</div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Ventajas</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              ¿Por Qué Elegirnos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiAward size={32} />,
                title: 'Calidad Premium',
                desc: 'Cada proyecto recibe atención meticulosa a los detalles y estándares de calidad excepcionales.'
              },
              {
                icon: <FiUsers size={32} />,
                title: 'Equipo Experto',
                desc: 'Profesionales certificados con años de experiencia en sus campos especializados.'
              },
              {
                icon: <FiZap size={32} />,
                title: 'Entregas Rápidas',
                desc: 'Cumplimos con los plazos sin comprometer la calidad del trabajo final.'
              },
              {
                icon: <FiTrendingUp size={32} />,
                title: 'Resultados Medibles',
                desc: 'Enfoque basado en datos con métricas claras de éxito y ROI comprobado.'
              },
              {
                icon: <FiLayers size={32} />,
                title: 'Soluciones Integrales',
                desc: 'Desde estrategia hasta implementación, cubrimos todas tus necesidades digitales.'
              },
              {
                icon: <FiCheckCircle size={32} />,
                title: 'Soporte Continuo',
                desc: 'Acompañamiento post-lanzamiento para garantizar el éxito de tu proyecto.'
              }
            ].map((advantage, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-[#0D3A66] to-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{advantage.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 text-white">
            ¿Listo Para Empezar<br />
            Tu <span className="italic">Próximo Proyecto?</span>
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto">
            Transformemos tu visión en realidad con soluciones digitales que generan resultados reales
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            <Link 
              href="/contacto" 
              className="bg-white text-[#0A1F33] px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              Iniciar Proyecto Ahora
              <span className="text-xl"><FiArrowUpRight /></span>
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
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/imagenes/logoblanco.png" 
                  alt="FJONIC Studio Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Estudio estratégico de marketing digital y producción audiovisual. Construimos marcas coherentes, sólidas y perdurables que no solo existen, sino que permanecen.
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

            {/* Quick Links */}
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

            {/* Contact Info */}
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

          {/* Bottom Bar */}
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

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}