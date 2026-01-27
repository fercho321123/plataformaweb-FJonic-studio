'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowLeft, FiArrowUpRight, FiCheck, FiCamera, 
  FiTrendingUp, FiCode, FiPenTool, FiShoppingCart, 
  FiZap, FiAward, FiX, FiStar, FiPackage, FiHeart,
  FiInstagram, FiMail, FiMapPin, FiMenu
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',
  mediumBlue: '#0D3A66',
  lightBlue: '#175A8C',
  brightBlue: '#1C75BC',
  cyan: '#05ABC4',
};

// BASE DE DATOS DE SERVICIOS
const SERVICIOS_DETALLADOS = {
  audiovisual: {
    titulo: 'Producción Audiovisual',
    descripcion: 'Contenido visual de alta calidad que cuenta tu historia y conecta con tu audiencia',
    icono: <FiCamera size={28} />,
    color: '#05ABC4',
    gradient: 'from-[#05ABC4] via-[#0D3A66] to-[#175A8C]',
    servicios: [
      {
        id: 'av_p1',
        nombre: 'Paquete 1: Sesión Única',
        precio: 250000,
        descripcion: 'Ideal para una necesidad puntual de contenido visual profesional.',
        incluye: [
          '1 sesión fotográfica de 3 horas',
          '15 fotos editadas profesionalmente',
          'Entrega digital en alta resolución',
          '1 ronda de ajustes incluida',
          'Formatos optimizados para redes'
        ],
        destacado: false
      },
      {
        id: 'av_p2',
        nombre: 'Paquete 2: 2 Sesiones',
        precio: 500000,
        descripcion: 'Para crear contenido continuo y mantener presencia constante.',
        incluye: [
          '2 sesiones fotográficas de 3h cada una',
          '30 fotos editadas profesionalmente',
          'Entrega digital en alta resolución',
          '1 ronda de ajustes por sesión',
          'Planificación de contenido',
          'Calendario de publicación sugerido'
        ],
        destacado: true
      },
      {
        id: 'av_p3',
        nombre: 'Paquete 3: 3 Sesiones',
        precio: 750000,
        descripcion: 'Para marcas activas que necesitan contenido constante.',
        incluye: [
          '3 sesiones fotográficas de 3h cada una',
          '45 fotos editadas profesionalmente',
          'Entrega digital en alta resolución',
          '1 ronda de ajustes por sesión',
          'Estrategia de contenido visual',
          'Asesoría en storytelling visual',
          'Backup en nube incluido'
        ],
        destacado: false
      }
    ],
    extras: [
      { id: 'av_ex1', nombre: 'Reel para redes (1 min)', precio: 80000 },
      { id: 'av_ex2', nombre: 'Video promocional (1-3 min)', precio: 150000 },
      { id: 'av_ex3', nombre: 'Edición de video adicional', precio: 100000 },
      { id: 'av_ex4', nombre: 'Drone shots (si aplica)', precio: 200000 }
    ]
  },
  publicidad: {
    titulo: 'Publicidad & Branding',
    descripcion: 'Construcción de identidad visual coherente y memorable para tu marca',
    icono: <FiPenTool size={28} />,
    color: '#175A8C',
    gradient: 'from-[#175A8C] via-[#1C75BC] to-[#0D3A66]',
    servicios: [
      {
        id: 'br_l1',
        nombre: 'Logo Básico',
        precio: 120000,
        descripcion: 'La esencia visual de tu marca en su forma más pura.',
        incluye: [
          'Diseño de concepto único',
          'Entrega en alta resolución',
          '1 versión de color',
          'Archivos PNG y JPG',
          '2 rondas de ajustes'
        ],
        destacado: false
      },
      {
        id: 'br_l2',
        nombre: 'Logo Completo',
        precio: 200000,
        descripcion: 'Identidad versátil lista para cualquier aplicación.',
        incluye: [
          'Logo principal + variaciones',
          'Versiones en color y blanco/negro',
          'Formatos vectoriales (AI, EPS, SVG)',
          'Archivos con fondo transparente',
          'Guía básica de uso',
          '3 rondas de ajustes'
        ],
        destacado: false
      },
      {
        id: 'pb_m1',
        nombre: 'Manual de Marca Básico',
        precio: 300000,
        descripcion: 'Esencia visual completa para tu negocio.',
        incluye: [
          'Logo profesional completo',
          'Paleta de colores (HEX, RGB, CMYK)',
          'Tipografías seleccionadas',
          'Guía de estilo visual',
          'Documento PDF de 10-15 páginas',
          'Ejemplos de aplicación'
        ],
        destacado: false
      },
      {
        id: 'pb_m2',
        nombre: 'Manual de Marca Completo',
        precio: 600000,
        descripcion: 'Identidad total de marca lista para escalar.',
        incluye: [
          'Logo + todas las variaciones',
          'Sistema de colores completo',
          'Tipografías primarias y secundarias',
          'Iconografía personalizada',
          'Aplicaciones en mockups premium',
          'Papelería corporativa diseñada',
          'Documento PDF de 30-40 páginas',
          'Archivos editables'
        ],
        destacado: true
      }
    ],
    extras: [
      { id: 'br_ex1', nombre: 'Paleta de colores adicional', precio: 80000 },
      { id: 'br_ex2', nombre: 'Tipografías adicionales', precio: 70000 },
      { id: 'br_ex3', nombre: 'Rediseño de marca existente', precio: 150000 },
      { id: 'br_ex4', nombre: 'Iconos personalizados (set de 5)', precio: 120000 }
    ]
  },
  web: {
    titulo: 'Diseño Web',
    descripcion: 'Sitios web modernos, responsive y optimizados para conversión',
    icono: <FiCode size={28} />,
    color: '#1C75BC',
    gradient: 'from-[#1C75BC] via-[#05ABC4] to-[#175A8C]',
    servicios: [
      {
        id: 'wb_p1',
        nombre: 'Web Esencial',
        precio: 700000,
        descripcion: 'Presencia online profesional en tiempo récord.',
        incluye: [
          'Landing Page (1 página)',
          'Diseño 100% responsive',
          'WhatsApp integrado',
          'Formulario de contacto',
          'Optimización SEO básica',
          'Hosting por 1 año incluido',
          'SSL certificado'
        ],
        destacado: false
      },
      {
        id: 'wb_p2',
        nombre: 'Web Profesional',
        precio: 1300000,
        descripcion: 'Sitio completo para emprendedores y PYMES.',
        incluye: [
          'Hasta 5 páginas',
          'Diseño responsive premium',
          'SEO optimizado',
          'Integración con redes sociales',
          'Blog/Noticias',
          'Google Analytics configurado',
          'Hosting por 1 año',
          'Dominio .com incluido',
          '3 correos corporativos'
        ],
        destacado: true
      },
      {
        id: 'wb_p3',
        nombre: 'Web Corporativa',
        precio: 2000000,
        descripcion: 'Sitio robusto con funcionalidades avanzadas.',
        incluye: [
          'Hasta 10 páginas',
          'Diseño UX/UI avanzado',
          'SEO técnico completo',
          'Panel de administración',
          'Multi-idioma',
          'Integración con CRM',
          'Hosting premium por 1 año',
          'Dominio + 10 correos',
          'Soporte 24/7 primer mes'
        ],
        destacado: false
      },
      {
        id: 'wb_p4',
        nombre: 'E-commerce Básico',
        precio: 2800000,
        descripcion: 'Tu tienda virtual completa y lista para vender.',
        incluye: [
          'Hasta 10 productos',
          'Pasarela de pagos integrada',
          'Sistema de gestión de pedidos',
          'Carrito de compras optimizado',
          'Panel de administración',
          'Certificado SSL',
          'Hosting e-commerce por 1 año',
          'Capacitación de uso',
          'Soporte técnico 3 meses'
        ],
        destacado: false
      }
    ],
    extras: [
      { id: 'wb_ex1', nombre: 'Página adicional', precio: 150000 },
      { id: 'wb_ex2', nombre: 'Mantenimiento mensual', precio: 150000 },
      { id: 'wb_ex3', nombre: 'Productos adicionales (x10)', precio: 200000 },
      { id: 'wb_ex4', nombre: 'Integración con pasarela adicional', precio: 250000 }
    ]
  },
  marketing: {
    titulo: 'Marketing Digital',
    descripcion: 'Estrategias integrales para aumentar tu visibilidad y conversiones',
    icono: <FiTrendingUp size={28} />,
    color: '#05ABC4',
    gradient: 'from-[#05ABC4] via-[#1C75BC] to-[#0D3A66]',
    servicios: [
      {
        id: 'mk_p1',
        nombre: 'Gestión de Redes (Básico)',
        precio: 400000,
        descripcion: 'Presencia constante en redes sociales.',
        incluye: [
          '12 publicaciones al mes',
          '2 redes sociales',
          'Diseño gráfico de posts',
          'Calendario de contenido',
          'Reporte mensual básico'
        ],
        destacado: false
      },
      {
        id: 'mk_p2',
        nombre: 'Gestión de Redes (Premium)',
        precio: 800000,
        descripcion: 'Estrategia completa de social media.',
        incluye: [
          '20 publicaciones al mes',
          '3 redes sociales',
          'Diseño gráfico profesional',
          'Stories/Reels semanales',
          'Community management',
          'Estrategia de contenido',
          'Reportes detallados',
          'Análisis de competencia'
        ],
        destacado: true
      },
      {
        id: 'mk_p3',
        nombre: 'Campaña Publicitaria',
        precio: 600000,
        descripcion: 'Ads profesionales para Facebook e Instagram.',
        incluye: [
          'Estrategia de campaña',
          'Diseño de creatividades',
          'Configuración de anuncios',
          'Segmentación de audiencia',
          'Optimización diaria',
          'Presupuesto publicitario NO incluido',
          'Reporte semanal de resultados'
        ],
        destacado: false
      }
    ],
    extras: [
      { id: 'mk_ex1', nombre: 'Red social adicional', precio: 150000 },
      { id: 'mk_ex2', nombre: 'Video para ads (15-30s)', precio: 200000 },
      { id: 'mk_ex3', nombre: 'Análisis de métricas avanzado', precio: 100000 }
    ]
  }
};

export default function ServiciosPage() {
  const [categoriaActiva, setCategoriaActiva] = useState<keyof typeof SERVICIOS_DETALLADOS>('audiovisual');
  const [carrito, setCarrito] = useState<string[]>([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categoria = SERVICIOS_DETALLADOS[categoriaActiva];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agregarAlCarrito = (id: string) => {
    if (!carrito.includes(id)) {
      setCarrito([...carrito, id]);
      setMostrarCarrito(true);
    }
  };

  const quitarDelCarrito = (id: string) => {
    setCarrito(carrito.filter(item => item !== id));
  };

  const calcularTotal = () => {
    let total = 0;
    Object.values(SERVICIOS_DETALLADOS).forEach(cat => {
      cat.servicios.forEach(servicio => {
        if (carrito.includes(servicio.id)) total += servicio.precio;
      });
      cat.extras.forEach(extra => {
        if (carrito.includes(extra.id)) total += extra.precio;
      });
    });
    return total;
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const enviarWhatsApp = () => {
    const items = carrito.map(id => {
      let nombre = '';
      let precio = 0;
      Object.values(SERVICIOS_DETALLADOS).forEach(cat => {
        const servicio = cat.servicios.find(s => s.id === id);
        const extra = cat.extras.find(e => e.id === id);
        if (servicio) {
          nombre = servicio.nombre;
          precio = servicio.precio;
        } else if (extra) {
          nombre = extra.nombre;
          precio = extra.precio;
        }
      });
      return `- ${nombre}: ${formatearPrecio(precio)}`;
    }).join('%0A');

    const mensaje = `¡Hola FJONIC Studio! 👋%0A%0AEstoy interesado en los siguientes servicios:%0A%0A${items}%0A%0A*Total: ${formatearPrecio(calcularTotal())}*%0A%0AMe gustaría más información.`;
    window.open(`https://wa.me/3182602764?text=${mensaje}`, '_blank');
  };

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
              <Link href="/servicios" className="text-sm font-bold uppercase tracking-wider text-[#05ABC4]">Servicios</Link>
              <Link href="/portafolio" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Portafolio</Link>
              <Link href="/nosotros" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Nosotros</Link>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Blog</Link>
              
              <button
                onClick={() => setMostrarCarrito(!mostrarCarrito)}
                className="relative bg-[#05ABC4] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] hover:scale-105 transition-all shadow-lg flex items-center gap-2"
              >
                <FiShoppingCart />
                Carrito
                {carrito.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-red-500/50">
                    {carrito.length}
                  </span>
                )}
              </button>
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
            <Link href="/servicios" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider text-[#05ABC4] py-2">Servicios</Link>
            <Link href="/portafolio" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Portafolio</Link>
            <Link href="/nosotros" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Nosotros</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors py-2">Blog</Link>
            <button
              onClick={() => {
                setMostrarCarrito(!mostrarCarrito);
                setMenuOpen(false);
              }}
              className="block w-full bg-[#05ABC4] text-white px-6 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#1C75BC] text-center mt-4"
            >
              Ver Carrito ({carrito.length})
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Background */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
            <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Servicios</span>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
            Nuestros<br />
            <span className="text-[#05ABC4] italic">Servicios</span>
          </h1>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Soluciones profesionales adaptadas a las necesidades de tu marca.<br />
            Selecciona tus servicios y crea tu paquete personalizado.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#05ABC4] rounded-full animate-pulse"></div>
              <span className="font-bold uppercase text-xs tracking-wider">Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#05ABC4]">
                <FiCheck size={16} />
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
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-20 px-6 bg-[#0D3A66] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {(Object.keys(SERVICIOS_DETALLADOS) as Array<keyof typeof SERVICIOS_DETALLADOS>).map((key) => {
              const cat = SERVICIOS_DETALLADOS[key];
              const isActive = categoriaActiva === key;
              
              return (
                <button
                  key={key}
                  onClick={() => setCategoriaActiva(key)}
                  className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-br ' + cat.gradient + ' border-white/30 shadow-2xl shadow-' + cat.color + '/30 scale-105'
                      : 'bg-[#0A1F33] border-white/10 hover:border-white/20 hover:scale-102'
                  }`}
                >
                  <div className={`text-4xl mb-4 transition-all duration-300 ${
                    isActive ? 'scale-110 text-white' : 'text-slate-400 group-hover:scale-110 group-hover:text-white'
                  }`}>
                    {cat.icono}
                  </div>
                  <h3 className={`text-sm font-black uppercase tracking-tight ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  }`}>
                    {cat.titulo}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICIOS PRINCIPALES */}
      <section className="py-32 px-6 bg-[#0A1F33] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #05ABC4 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Category Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div 
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl`}
                style={{ backgroundColor: categoria.color }}
              >
                {categoria.icono}
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{categoria.titulo}</h2>
                <p className="text-slate-400 mt-2">{categoria.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {categoria.servicios.map((servicio, index) => (
              <div
                key={servicio.id}
                className={`group relative bg-[#0D3A66] rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:transform hover:-translate-y-2 flex flex-col ${
                  servicio.destacado
                    ? 'border-[#05ABC4] shadow-xl shadow-[#05ABC4]/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Badge */}
                {servicio.destacado && (
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xs flex items-center gap-2 shadow-lg z-10">
                    <FiStar />
                    MÁS POPULAR
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{servicio.nombre}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{servicio.descripcion}</p>
                  </div>

                  {/* Precio */}
                  <div className="mb-6">
                    <div className="text-4xl font-black text-[#05ABC4]">
                      {formatearPrecio(servicio.precio)}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Inversión única</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <p className="text-xs uppercase font-black tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                      <span className="text-[#05ABC4]">
                        <FiPackage />
                      </span>
                      Incluye:
                    </p>
                    <ul className="space-y-3">
                      {servicio.incluye.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0">
                            <span className="text-white">
                              <FiCheck size={12} />
                            </span>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => agregarAlCarrito(servicio.id)}
                    disabled={carrito.includes(servicio.id)}
                    className={`w-full py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                      carrito.includes(servicio.id)
                        ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-[#05ABC4] hover:text-white hover:shadow-xl hover:shadow-[#05ABC4]/50 hover:scale-105'
                    }`}
                  >
                    {carrito.includes(servicio.id) ? (
                      <>
                        <FiCheck /> Ya está en tu carrito
                      </>
                    ) : (
                      <>
                        <FiShoppingCart /> Agregar al Carrito
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EXTRAS */}
          {categoria.extras.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#05ABC4] text-2xl">
                  <FiZap />
                </span>
                <h3 className="text-3xl font-black uppercase">Servicios Complementarios</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoria.extras.map((extra, index) => (
                  <button
                    key={extra.id}
                    onClick={() => {
                      if (carrito.includes(extra.id)) {
                        quitarDelCarrito(extra.id);
                      } else {
                        agregarAlCarrito(extra.id);
                      }
                    }}
                    className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-1 ${
                      carrito.includes(extra.id)
                        ? 'bg-[#05ABC4]/10 border-[#05ABC4]'
                        : 'bg-[#0D3A66] border-white/10 hover:border-white/20'
                    }`}
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-bold flex-1 pr-2 leading-snug">{extra.nombre}</p>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          carrito.includes(extra.id)
                            ? 'bg-[#05ABC4] border-[#05ABC4] scale-110'
                            : 'border-white/30 group-hover:border-white/50'
                        }`}
                      >
                        {carrito.includes(extra.id) && (
                          <span className="text-white">
                            <FiCheck size={14} />
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xl font-black text-[#05ABC4]">
                      {formatearPrecio(extra.precio)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FLOATING CART */}
      {mostrarCarrito && carrito.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50 w-96 max-w-[calc(100vw-4rem)]">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#05ABC4] to-[#1C75BC] rounded-3xl blur-xl opacity-50"></div>
            
            <div className="relative bg-[#0A1F33] border-2 border-white/20 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#05ABC4] flex items-center justify-center">
                    <span className="text-white">
                      <FiShoppingCart />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase">Tu Carrito</h3>
                    <p className="text-xs text-slate-400">{carrito.length} items</p>
                  </div>
                </div>
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition-all flex items-center justify-center"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {carrito.map((id) => {
                  let item: any = null;
                  Object.values(SERVICIOS_DETALLADOS).forEach((cat) => {
                    const servicio = cat.servicios.find((s) => s.id === id);
                    const extra = cat.extras.find((e) => e.id === id);
                    if (servicio) item = servicio;
                    if (extra) item = extra;
                  });

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 group hover:bg-white/10"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-bold mb-1">{item?.nombre}</p>
                        <p className="text-xs font-black text-[#05ABC4]">
                          {formatearPrecio(item?.precio || 0)}
                        </p>
                      </div>
                      <button
                        onClick={() => quitarDelCarrito(id)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500 text-white/50 hover:text-white transition-all flex items-center justify-center ml-2"
                      >
                        <span className="text-sm">
                          <FiX />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-white/60 uppercase tracking-wider">Total</span>
                  <span className="text-3xl font-black text-[#05ABC4]">
                    {formatearPrecio(calcularTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={enviarWhatsApp}
                className="w-full bg-gradient-to-r from-[#05ABC4] to-[#1C75BC] text-white py-4 rounded-full font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-[#05ABC4]/50 transition-all flex items-center justify-center gap-2 group hover:scale-105"
              >
                <span>Solicitar Cotización</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block">
                  <FiArrowUpRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <span className="text-white">
                <FiHeart />
              </span>
              <span className="text-sm font-medium text-white">Soluciones a Medida</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 text-white leading-tight">
            ¿Necesitas Algo<br />
            <span className="italic">Diferente?</span>
          </h2>
          
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Creamos soluciones 100% personalizadas adaptadas a tus necesidades específicas
          </p>
          
          <Link
            href="https://wa.me/3182602764"
            target="_blank"
            className="inline-flex items-center gap-3 bg-white text-[#0A1F33] px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl hover:scale-105"
          >
            <FiAward />
            <span>Cotización Personalizada</span>
            <FiArrowUpRight />
          </Link>
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

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </main>
  );
}