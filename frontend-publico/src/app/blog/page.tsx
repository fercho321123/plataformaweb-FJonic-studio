'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowUpRight, FiInstagram, FiMail, FiMapPin, 
  FiMenu, FiX, FiClock, FiUser, FiTag, FiArrowRight,
  FiTrendingUp, FiBookOpen, FiVideo, FiImage, FiCode
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',
  mediumBlue: '#0D3A66',
  lightBlue: '#175A8C',
  brightBlue: '#1C75BC',
  cyan: '#05ABC4',
};

// CATEGORÍAS
const categorias = [
  { nombre: 'Todos', slug: 'todos', icono: <FiBookOpen /> },
  { nombre: 'Marketing Digital', slug: 'marketing', icono: <FiTrendingUp /> },
  { nombre: 'Branding', slug: 'branding', icono: <FiImage /> },
  { nombre: 'Producción Audiovisual', slug: 'video', icono: <FiVideo /> },
  { nombre: 'Desarrollo Web', slug: 'web', icono: <FiCode /> },
];

// ARTÍCULOS DEL BLOG
const articulos = [
  {
    id: 1,
    titulo: '5 Tendencias de Marketing Digital que Dominarán en 2026',
    slug: '5-tendencias-marketing-digital-2026',
    extracto: 'El panorama digital evoluciona constantemente. Descubre las estrategias que marcarán la diferencia este año y cómo implementarlas en tu negocio.',
    contenido: 'Desde la inteligencia artificial generativa hasta el marketing de influencers nano, exploramos las tendencias que están transformando la forma en que las marcas se conectan con sus audiencias...',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    categoria: 'marketing',
    autor: 'Equipo FJONIC',
    fecha: '15 de Enero, 2026',
    tiempoLectura: '8 min',
    tags: ['Marketing', 'Tendencias', 'Social Media', 'IA'],
    destacado: true
  },
  {
    id: 2,
    titulo: 'Cómo Crear una Identidad Visual que Conecte con tu Audiencia',
    slug: 'crear-identidad-visual-audiencia',
    extracto: 'Tu identidad visual es mucho más que un logo. Es la personalidad de tu marca traducida en elementos tangibles que generan reconocimiento y confianza.',
    contenido: 'Una identidad visual efectiva combina psicología del color, tipografía estratégica y elementos gráficos coherentes que hablan directamente a tu público objetivo...',
    imagen: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
    categoria: 'branding',
    autor: 'Equipo Creativo',
    fecha: '12 de Enero, 2026',
    tiempoLectura: '6 min',
    tags: ['Branding', 'Diseño', 'Identidad Visual', 'Psicología del Color'],
    destacado: true
  },
  {
    id: 3,
    titulo: 'El Poder del Video Marketing: Por Qué tu Marca lo Necesita',
    slug: 'poder-video-marketing',
    extracto: 'El contenido audiovisual genera 1200% más engagement que texto e imágenes combinados. Descubre cómo aprovecharlo para tu marca.',
    contenido: 'El video se ha convertido en el formato preferido por los consumidores. Desde stories hasta contenido de formato largo, exploramos cómo crear videos que conviertan...',
    imagen: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop',
    categoria: 'video',
    autor: 'Equipo Audiovisual',
    fecha: '10 de Enero, 2026',
    tiempoLectura: '7 min',
    tags: ['Video', 'Producción', 'Marketing', 'Storytelling'],
    destacado: true
  },
  {
    id: 4,
    titulo: 'Instagram en 2026: Estrategias que Funcionan',
    slug: 'instagram-estrategias-2026',
    extracto: 'Con más de 2 mil millones de usuarios activos, Instagram sigue siendo una plataforma clave. Aprende a destacar en medio del ruido digital.',
    contenido: 'Desde Reels hasta contenido colaborativo, descubre las tácticas que están generando resultados reales para marcas de todos los tamaños...',
    imagen: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
    categoria: 'marketing',
    autor: 'Equipo Digital',
    fecha: '8 de Enero, 2026',
    tiempoLectura: '5 min',
    tags: ['Instagram', 'Social Media', 'Reels', 'Engagement'],
    destacado: false
  },
  {
    id: 5,
    titulo: 'Branding Emocional: Más Allá del Logo',
    slug: 'branding-emocional',
    extracto: 'Las marcas más exitosas no venden productos, venden emociones. Descubre cómo construir conexiones auténticas con tu audiencia.',
    contenido: 'El branding emocional se trata de crear experiencias memorables que resuenan con los valores y aspiraciones de tus clientes...',
    imagen: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    categoria: 'branding',
    autor: 'Equipo Estratégico',
    fecha: '5 de Enero, 2026',
    tiempoLectura: '9 min',
    tags: ['Branding', 'Estrategia', 'Psicología', 'Experiencia'],
    destacado: false
  },
  {
    id: 6,
    titulo: 'Producción 4K: ¿Vale la Pena la Inversión?',
    slug: 'produccion-4k-inversion',
    extracto: 'La calidad del video puede hacer o romper la percepción de tu marca. Analizamos los pros y contras de la producción en ultra alta definición.',
    contenido: 'Con el aumento de pantallas 4K y la expectativa de contenido de alta calidad, exploramos cuándo tiene sentido invertir en producción 4K...',
    imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop',
    categoria: 'video',
    autor: 'Equipo Audiovisual',
    fecha: '3 de Enero, 2026',
    tiempoLectura: '6 min',
    tags: ['Video', '4K', 'Producción', 'Calidad'],
    destacado: false
  },
  {
    id: 7,
    titulo: 'Diseño Web que Convierte: Principios Fundamentales',
    slug: 'diseno-web-convierte',
    extracto: 'Tu sitio web es tu vendedor 24/7. Aprende los principios de diseño que transforman visitantes en clientes.',
    contenido: 'Desde la arquitectura de información hasta los microinteracciones, descubre cómo crear experiencias web que guían al usuario hacia la conversión...',
    imagen: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop',
    categoria: 'web',
    autor: 'Equipo Técnico',
    fecha: '1 de Enero, 2026',
    tiempoLectura: '10 min',
    tags: ['Web', 'UX/UI', 'Conversión', 'Diseño'],
    destacado: false
  },
  {
    id: 8,
    titulo: 'SEO Local: Cómo Dominar tu Mercado Regional',
    slug: 'seo-local-mercado-regional',
    extracto: 'El 46% de las búsquedas en Google tienen intención local. Aprende a optimizar tu presencia para clientes cercanos.',
    contenido: 'El SEO local es crucial para negocios con ubicación física. Descubre estrategias probadas para aparecer en búsquedas locales y Google Maps...',
    imagen: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=800&fit=crop',
    categoria: 'marketing',
    autor: 'Equipo Digital',
    fecha: '28 de Diciembre, 2025',
    tiempoLectura: '7 min',
    tags: ['SEO', 'Local', 'Google', 'Marketing'],
    destacado: false
  },
  {
    id: 9,
    titulo: 'Storytelling Visual: El Arte de Contar Historias con Imágenes',
    slug: 'storytelling-visual',
    extracto: 'Las mejores historias no se cuentan con palabras. Descubre cómo usar elementos visuales para crear narrativas poderosas.',
    contenido: 'El storytelling visual combina fotografía, diseño y narrativa para crear experiencias que cautivan y permanecen en la memoria...',
    imagen: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&h=800&fit=crop',
    categoria: 'branding',
    autor: 'Equipo Creativo',
    fecha: '25 de Diciembre, 2025',
    tiempoLectura: '8 min',
    tags: ['Storytelling', 'Visual', 'Fotografía', 'Narrativa'],
    destacado: false
  }
];

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [articulosFiltrados, setArticulosFiltrados] = useState(articulos);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (categoriaActiva === 'todos') {
      setArticulosFiltrados(articulos);
    } else {
      setArticulosFiltrados(articulos.filter(art => art.categoria === categoriaActiva));
    }
  }, [categoriaActiva]);

  const articulosDestacados = articulos.filter(art => art.destacado);
  const articuloPrincipal = articulosDestacados[0];

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
              <Link href="/nosotros" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Nosotros</Link>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-wider text-[#05ABC4]">Blog</Link>
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
            <Link href="/nosotros" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Nosotros</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-[#05ABC4] py-2">Blog</Link>
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
            <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Blog</span>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
            Conocimiento Que<br />
            <span className="text-[#05ABC4] italic">Transforma</span>
          </h1>

          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            Insights, estrategias y tendencias del mundo del marketing digital,<br />
            branding y producción audiovisual. <span className="text-[#05ABC4] font-bold">Aprende con los expertos.</span>
          </p>

          {/* Search Bar (decorativo por ahora) */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-2 flex items-center gap-4 hover:border-[#05ABC4] transition-all">
              <input 
                type="text" 
                placeholder="Buscar artículos..."
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-slate-400 outline-none"
              />
              <button className="bg-[#05ABC4] text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-[#1C75BC] transition-all">
                Buscar
              </button>
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

      {/* ARTÍCULO DESTACADO PRINCIPAL */}
      {articuloPrincipal && (
        <section className="py-20 px-6 bg-[#0D3A66]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">Artículo Destacado</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#05ABC4]/20 to-[#1C75BC]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative overflow-hidden rounded-3xl">
                  <img 
                    src={articuloPrincipal.imagen}
                    alt={articuloPrincipal.titulo}
                    className="w-full aspect-[16/10] object-cover transform group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F33] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#05ABC4]/20 text-[#05ABC4] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                    {categorias.find(c => c.slug === articuloPrincipal.categoria)?.nombre}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <div><FiClock size={16} /></div>
                    <span>{articuloPrincipal.tiempoLectura}</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase mb-6 leading-tight hover:text-[#05ABC4] transition-colors cursor-pointer">
                  {articuloPrincipal.titulo}
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {articuloPrincipal.extracto}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center">
                      <div className="text-white text-sm">
                        <FiUser />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{articuloPrincipal.autor}</div>
                      <div className="text-xs text-slate-400">{articuloPrincipal.fecha}</div>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/blog/${articuloPrincipal.slug}`}
                  className="inline-flex items-center gap-3 bg-[#05ABC4] text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#1C75BC] hover:scale-105 transition-all shadow-lg shadow-[#05ABC4]/30"
                >
                  Leer Artículo Completo
                  <div><FiArrowRight /></div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORÍAS */}
      <section className="py-12 px-6 bg-[#0A1F33] sticky top-[72px] z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categorias.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategoriaActiva(cat.slug)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all ${
                  categoriaActiva === cat.slug
                    ? 'bg-[#05ABC4] text-white shadow-lg shadow-[#05ABC4]/30'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <div>{cat.icono}</div>
                <span>{cat.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID DE ARTÍCULOS */}
      <section className="py-32 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulosFiltrados.map((articulo, index) => (
              <article 
                key={articulo.id}
                className="group bg-[#0D3A66] rounded-3xl overflow-hidden border border-white/10 hover:border-[#05ABC4] transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={articulo.imagen}
                    alt={articulo.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3A66] via-[#0D3A66]/50 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#05ABC4]/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                      {categorias.find(c => c.slug === articulo.categoria)?.nombre}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <div><FiClock size={14} /></div>
                      <span>{articulo.tiempoLectura}</span>
                    </div>
                    <span>•</span>
                    <span>{articulo.fecha}</span>
                  </div>

                  <h3 className="text-xl font-black uppercase mb-3 leading-tight group-hover:text-[#05ABC4] transition-colors line-clamp-2">
                    {articulo.titulo}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {articulo.extracto}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {articulo.tags.slice(0, 3).map((tag, i) => (
                      <span 
                        key={i}
                        className="bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link 
                    href={`/blog/${articulo.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#05ABC4] hover:gap-3 transition-all"
                  >
                    Leer Más
                    <div><FiArrowRight /></div>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-white/5 backdrop-blur-sm border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#05ABC4] hover:border-[#05ABC4] transition-all">
              Cargar Más Artículos
            </button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <div className="text-white text-3xl">
              <FiMail />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white leading-tight">
            No Te Pierdas<br />
            <span className="italic">Ningún Insight</span>
          </h2>
          
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Recibe las mejores estrategias de marketing, tendencias y casos de éxito directamente en tu inbox. Una vez por semana, sin spam.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-1 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full text-white placeholder-white/60 outline-none border border-white/20 focus:border-white/40 transition-all"
              />
              <button className="bg-white text-[#0A1F33] px-10 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl">
                Suscribirme
              </button>
            </div>
            <p className="text-white/60 text-xs mt-4">
              🔒 Tus datos están seguros. Nunca compartimos información con terceros.
            </p>
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