'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowUpRight, FiInstagram, FiMail, FiMapPin, 
  FiMenu, FiX, FiTarget, FiHeart, FiZap, FiAward,
  FiTrendingUp, FiUsers, FiEye, FiCompass, FiStar,
  FiLayers, FiCoffee, FiSunrise, FiShield
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',
  mediumBlue: '#0D3A66',
  lightBlue: '#175A8C',
  brightBlue: '#1C75BC',
  cyan: '#05ABC4',
};

// VALORES CORE
const valores = [
  {
    icono: <FiHeart size={40} />,
    titulo: 'Pasión',
    descripcion: 'Cada proyecto es una obra de arte. No trabajamos solo por resultados, trabajamos por legados que permanezcan en el tiempo.',
    color: '#FF6B6B'
  },
  {
    icono: <FiZap size={40} />,
    titulo: 'Innovación',
    descripcion: 'Combinamos creatividad y tecnología de vanguardia para crear experiencias que rompen esquemas y superan expectativas.',
    color: '#05ABC4'
  },
  {
    icono: <FiShield size={40} />,
    titulo: 'Integridad',
    descripcion: 'Transparencia y honestidad en cada conversación. Tu confianza es nuestro activo más valioso.',
    color: '#4ECDC4'
  },
  {
    icono: <FiTrendingUp size={40} />,
    titulo: 'Resultados',
    descripcion: 'Las métricas importan, pero el verdadero éxito se mide en el impacto que generamos en tu audiencia.',
    color: '#95E1D3'
  },
  {
    icono: <FiUsers size={40} />,
    titulo: 'Colaboración',
    descripcion: 'Tu visión + nuestra experiencia. Trabajamos contigo, no solo para ti. Construimos juntos.',
    color: '#F38181'
  },
  {
    icono: <FiStar size={40} />,
    titulo: 'Excelencia',
    descripcion: 'No nos conformamos con lo bueno. Buscamos lo extraordinario en cada detalle, en cada entrega.',
    color: '#FFC947'
  }
];

// EQUIPO
const equipo = [
  {
    nombre: 'Equipo Creativo',
    rol: 'Diseño & Estrategia Visual',
    descripcion: 'Mentes creativas que transforman ideas en identidades visuales memorables.',
    imagen: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop'
  },
  {
    nombre: 'Equipo Audiovisual',
    rol: 'Producción & Post-producción',
    descripcion: 'Expertos en contar historias a través de imágenes en movimiento que conectan.',
    imagen: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=600&fit=crop'
  },
  {
    nombre: 'Equipo Digital',
    rol: 'Marketing & Redes Sociales',
    descripcion: 'Estrategas digitales que convierten seguidores en comunidades comprometidas.',
    imagen: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop'
  },
  {
    nombre: 'Equipo Técnico',
    rol: 'Desarrollo & Tecnología',
    descripcion: 'Desarrolladores que construyen experiencias web potentes y escalables.',
    imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=600&fit=crop'
  }
];

// MILESTONES
const milestones = [
  { año: '2020', titulo: 'Fundación', descripcion: 'Nace FJONIC Studio con la visión de revolucionar el marketing digital en Colombia.' },
  { año: '2021', titulo: 'Expansión', descripcion: 'Alcanzamos 100+ proyectos completados y expandimos nuestros servicios audiovisuales.' },
  { año: '2022', titulo: 'Reconocimiento', descripcion: 'Premiados como agencia emergente del año en marketing digital regional.' },
  { año: '2023', titulo: 'Innovación', descripcion: 'Lanzamos nuestro estudio de producción 4K y plataforma de gestión de proyectos.' },
  { año: '2024', titulo: 'Consolidación', descripcion: 'Más de 1000 proyectos completados, 10+ industrias y presencia en 3 países.' },
  { año: '2025', titulo: 'Transformación', descripcion: 'Evolución hacia un ecosistema integral de soluciones digitales y audiovisuales.' }
];

export default function NosotrosPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
              <Link href="/portafolio" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Portafolio</Link>
              <Link href="/nosotros" className="text-sm font-bold uppercase tracking-wider text-[#05ABC4]">Nosotros</Link>
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
            <Link href="/portafolio" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Portafolio</Link>
            <Link href="/nosotros" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-[#05ABC4] py-2">Nosotros</Link>
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
                <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Nosotros</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
                Construimos<br />
                <span className="text-[#05ABC4] italic">Legados Digitales</span>
              </h1>

              <p className="text-slate-300 text-xl leading-relaxed mb-12">
                Somos más que una agencia. Somos un colectivo de estrategas, creativos y visionarios que transforman marcas ordinarias en experiencias extraordinarias.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/contacto" 
                  className="bg-[#05ABC4] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#1C75BC] hover:scale-105 transition-all shadow-lg shadow-[#05ABC4]/30 inline-flex items-center justify-center gap-3"
                >
                  Trabajemos Juntos
                  <div><FiArrowUpRight /></div>
                </Link>
                <Link 
                  href="/portafolio" 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white/10 hover:border-[#05ABC4] transition-all inline-flex items-center justify-center"
                >
                  Ver Portafolio
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-[#05ABC4]/20 to-[#1C75BC]/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
                  alt="FJONIC Studio Team"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F33] via-transparent to-transparent opacity-60"></div>
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

      {/* NUESTRA HISTORIA */}
      <section className="py-32 px-6 bg-[#0D3A66]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Nuestra Historia</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              De Una <span className="text-[#05ABC4] italic">Visión</span> a un Movimiento
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                FJONIC Studio nació en 2020 con una misión clara: democratizar el acceso a marketing digital de clase mundial para empresas de todos los tamaños. En medio de la transformación digital acelerada por la pandemia, vimos la oportunidad de ayudar a las marcas no solo a sobrevivir, sino a prosperar.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Lo que comenzó como un pequeño equipo de creativos apasionados ha evolucionado en un estudio integral que combina estrategia, diseño, producción audiovisual y tecnología de vanguardia. Hemos trabajado con más de 1000 marcas, desde emprendimientos locales hasta empresas consolidadas.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Pero más allá de los números, nuestro verdadero legado son las historias de transformación: negocios que triplicaron sus ventas, marcas que encontraron su voz, emprendedores que hicieron realidad sus sueños. <span className="text-[#05ABC4] font-bold">Esas historias son nuestra razón de ser.</span>
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#05ABC4]/20 to-[#1C75BC]/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-[#0A1F33] border border-white/10 rounded-3xl p-8">
                <div className="space-y-8">
                  <div>
                    <div className="text-6xl font-black text-[#05ABC4] mb-2">5+</div>
                    <div className="text-sm uppercase tracking-wider text-slate-400 font-bold">Años de Experiencia</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-[#05ABC4] mb-2">1000+</div>
                    <div className="text-sm uppercase tracking-wider text-slate-400 font-bold">Proyectos Completados</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-[#05ABC4] mb-2">98%</div>
                    <div className="text-sm uppercase tracking-wider text-slate-400 font-bold">Clientes Satisfechos</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-[#05ABC4] mb-2">10+</div>
                    <div className="text-sm uppercase tracking-wider text-slate-400 font-bold">Industrias Impactadas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-24">
            <h3 className="text-4xl font-black uppercase text-center mb-16">
              Nuestro <span className="text-[#05ABC4] italic">Viaje</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="relative bg-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 group"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-7xl font-black text-[#05ABC4]/20 mb-4 group-hover:text-[#05ABC4]/30 transition-colors">
                    {milestone.año}
                  </div>
                  <h4 className="text-2xl font-black uppercase mb-3 group-hover:text-[#05ABC4] transition-colors">
                    {milestone.titulo}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {milestone.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Nuestros Valores</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Los Pilares de <span className="text-[#05ABC4] italic">FJONIC</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6">
              Estos valores no son solo palabras en una pared. Son decisiones diarias, conversaciones difíciles y el compromiso constante con la excelencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valores.map((valor, index) => (
              <div 
                key={index}
                className="bg-[#0D3A66] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 group hover:transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${valor.color}40, ${valor.color}20)`
                  }}
                >
                  <div style={{ color: valor.color }}>
                    {valor.icono}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 group-hover:text-[#05ABC4] transition-colors">
                  {valor.titulo}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {valor.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#0D3A66] to-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-[#0A1F33] border border-white/10 rounded-3xl p-12 hover:border-[#05ABC4] transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    <FiTarget size={32} />
                  </div>
                </div>
                <h3 className="text-4xl font-black uppercase">Misión</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Empoderar a las marcas a través de estrategias digitales y producción audiovisual excepcional, creando experiencias memorables que generan conexiones auténticas con sus audiencias.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Transformamos visiones en realidades tangibles, combinando creatividad, tecnología y estrategia para construir marcas que no solo existen, sino que <span className="text-[#05ABC4] font-bold">permanecen</span>.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-[#0A1F33] border border-white/10 rounded-3xl p-12 hover:border-[#05ABC4] transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    <FiEye size={32} />
                  </div>
                </div>
                <h3 className="text-4xl font-black uppercase">Visión</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Ser reconocidos como el estudio creativo de referencia en Latinoamérica, liderando la transformación digital y estableciendo nuevos estándares de excelencia en marketing y producción audiovisual.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Aspiramos a crear un ecosistema donde cada marca, sin importar su tamaño, tenga acceso a soluciones de clase mundial que <span className="text-[#05ABC4] font-bold">impulsen su crecimiento</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Nuestro Equipo</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              El Talento Detrás de los <span className="text-[#05ABC4] italic">Legados</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-6">
              Un equipo multidisciplinario de expertos apasionados por crear experiencias que trascienden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipo.map((miembro, index) => (
              <div 
                key={index}
                className="group relative bg-[#0D3A66] rounded-3xl overflow-hidden border border-white/10 hover:border-[#05ABC4] transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3A66] via-[#0D3A66]/70 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase mb-2 group-hover:text-[#05ABC4] transition-colors">
                    {miembro.nombre}
                  </h3>
                  <p className="text-[#05ABC4] text-sm font-bold uppercase tracking-wider mb-3">
                    {miembro.rol}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {miembro.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURA */}
      <section className="py-32 px-6 bg-[#0D3A66]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Cultura FJONIC</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mt-4">
              Cómo <span className="text-[#05ABC4] italic">Trabajamos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icono: <FiCoffee size={40} />,
                titulo: 'Creatividad sin Límites',
                descripcion: 'Fomentamos un ambiente donde las ideas fluyen libremente y no hay preguntas tontas, solo oportunidades de innovar.'
              },
              {
                icono: <FiSunrise size={40} />,
                titulo: 'Crecimiento Continuo',
                descripcion: 'Invertimos en el desarrollo de nuestro equipo porque sabemos que su crecimiento es nuestro crecimiento.'
              },
              {
                icono: <FiLayers size={40} />,
                titulo: 'Trabajo Colaborativo',
                descripcion: 'Creemos en el poder del trabajo en equipo. Los mejores resultados nacen cuando diferentes perspectivas se unen.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-[#0A1F33] border border-white/10 rounded-3xl p-8 hover:border-[#05ABC4] transition-all duration-500 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {item.icono}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 group-hover:text-[#05ABC4] transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {item.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 text-white leading-tight">
            ¿Listo Para Crear Tu<br />
            <span className="italic">Próximo Legado?</span>
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Trabajemos juntos para transformar tu visión en una marca que inspire, conecte y perdure.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            <Link 
              href="/contacto" 
              className="bg-white text-[#0A1F33] px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              Iniciar Proyecto
              <div><FiArrowUpRight /></div>
            </Link>
            <Link 
              href="/portafolio" 
              className="bg-[#0A1F33] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white hover:text-[#0A1F33] transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center"
            >
              Ver Portafolio
            </Link>
          </div>
        </div>
      </section>

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