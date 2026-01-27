'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiArrowUpRight, FiInstagram, FiMail, FiMapPin, 
  FiMenu, FiX, FiPhone, FiSend, FiCheckCircle,
  FiUser, FiBriefcase, FiFileText, FiDollarSign,
  FiCalendar, FiMessageSquare, FiAlertCircle
} from 'react-icons/fi';

// FJONIC Studio Official Color Palette
const colors = {
  darkBlue: '#0A1F33',
  mediumBlue: '#0D3A66',
  lightBlue: '#175A8C',
  brightBlue: '#1C75BC',
  cyan: '#05ABC4',
};


const servicios = [
  'Branding & Identidad Visual',
  'Producción Audiovisual 4K',
  'Marketing Digital & Redes Sociales',
  'Diseño & Desarrollo Web',
  'Fotografía Profesional',
  'Motion Graphics & Animación',
  'Estrategia de Contenido',
  'Community Management',
  'E-commerce',
  'Consultoría de Marketing',
  'Paquete Completo (Varios Servicios)',
  'Otro (Especificar en mensaje)'
];

const presupuestos = [
  'Menos de $500 USD',
  '$500 - $1,000 USD',
  '$1,000 - $3,000 USD',
  '$3,000 - $5,000 USD',
  '$5,000 - $10,000 USD',
  'Más de $10,000 USD',
  'Por definir'
];

const timelines = [
  'Urgente (1-2 semanas)',
  'Corto plazo (1 mes)',
  'Mediano plazo (2-3 meses)',
  'Largo plazo (3+ meses)',
  'Flexible'
];

export default function ContactoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombrePersona: '',
    nombreEmpresa: '',
    email: '',
    telefono: '',
    pais: '',
    ciudad: '',
    servicios: [] as string[],
    presupuesto: '',
    timeline: '',
    comoNosConociste: '',
    mensaje: '',
    aceptaTerminos: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleServicioToggle = (servicio: string) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones
    if (!formData.nombrePersona.trim() || !formData.email.trim() || !formData.telefono.trim()) {
      setError('Por favor completa todos los campos obligatorios');
      setLoading(false);
      return;
    }

    if (formData.servicios.length === 0) {
      setError('Por favor selecciona al menos un servicio');
      setLoading(false);
      return;
    }

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      /* 
      // OPCIÓN 1: Formspree (requiere desactivar CAPTCHA)
      const response = await fetch('https://formspree.io/f/meeglbow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombrePersona,
          empresa: formData.nombreEmpresa || 'No especificada',
          email: formData.email,
          telefono: formData.telefono,
          pais: formData.pais || 'No especificado',
          ciudad: formData.ciudad || 'No especificada',
          servicios: formData.servicios.join(', '),
          presupuesto: formData.presupuesto || 'No especificado',
          timeline: formData.timeline || 'No especificado',
          referencia: formData.comoNosConociste || 'No especificado',
          mensaje: formData.mensaje || 'Sin mensaje adicional',
          _subject: `Nuevo Proyecto: ${formData.nombreEmpresa || formData.nombrePersona}`
        }),
      });
      */

      // OPCIÓN 2: FormSubmit (funciona sin configuración, sin CAPTCHA)
      const formDataToSend = new FormData();
      formDataToSend.append('Nombre', formData.nombrePersona);
      formDataToSend.append('Empresa', formData.nombreEmpresa || 'No especificada');
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Telefono', formData.telefono);
      formDataToSend.append('Pais', formData.pais || 'No especificado');
      formDataToSend.append('Ciudad', formData.ciudad || 'No especificada');
      formDataToSend.append('Servicios', formData.servicios.join(', '));
      formDataToSend.append('Presupuesto', formData.presupuesto || 'No especificado');
      formDataToSend.append('Timeline', formData.timeline || 'No especificado');
      formDataToSend.append('Referencia', formData.comoNosConociste || 'No especificado');
      formDataToSend.append('Mensaje', formData.mensaje || 'Sin mensaje adicional');
      
      // Configuración del email
      formDataToSend.append('_subject', `Nuevo Proyecto: ${formData.nombreEmpresa || formData.nombrePersona}`);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');
      
      // AUTO-RESPUESTA AUTOMÁTICA
      formDataToSend.append('_autoresponse', `¡Hola ${formData.nombrePersona}!

Gracias por contactarnos. Hemos recibido exitosamente tu solicitud de proyecto.

📋 DETALLES DE TU SOLICITUD:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Nombre: ${formData.nombrePersona}
🏢 Empresa: ${formData.nombreEmpresa || 'No especificada'}
📧 Email: ${formData.email}
📱 Teléfono: ${formData.telefono}
📍 Ubicación: ${formData.ciudad ? formData.ciudad + ', ' : ''}${formData.pais || 'No especificada'}

🎯 SERVICIOS DE INTERÉS:
${formData.servicios.map(s => `• ${s}`).join('\n')}

💰 Presupuesto: ${formData.presupuesto || 'No especificado'}
⏱️ Timeline: ${formData.timeline || 'No especificado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¿QUÉ SIGUE?

✅ Nuestro equipo revisará tu solicitud en las próximas 24 horas
✅ Te contactaremos para agendar una videollamada de estrategia
✅ Prepararemos una propuesta personalizada para tu proyecto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 CONTACTO DIRECTO:
• WhatsApp: +57 318 260 2764
• Email: fjonicstudio@gmail.com
• Instagram: @fjonic_studio

¿Tienes alguna pregunta urgente? No dudes en escribirnos por WhatsApp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Saludos,
FJONIC STUDIO
Estudio Estratégico de Marketing Digital & Producción Audiovisual

www.fjonicstudio.com
`);

      const response = await fetch('https://formsubmit.co/ajax/fjonicstudio@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });

      // DEBUG: Ver el status de la respuesta
      console.log('✅ Response Status:', response.status);
      console.log('✅ Response OK:', response.ok);
      console.log('✅ Response Status Text:', response.statusText);

      // Verificar el status code directamente
      // Formspree retorna 200 o 201 cuando es exitoso, incluso si el body está vacío
      if (response.status === 200 || response.status === 201 || response.ok) {
        // ÉXITO - El formulario se envió correctamente
        console.log('🎉 ¡Formulario enviado exitosamente!');
        setEnviado(true);
        setFormData({
          nombrePersona: '',
          nombreEmpresa: '',
          email: '',
          telefono: '',
          pais: '',
          ciudad: '',
          servicios: [],
          presupuesto: '',
          timeline: '',
          comoNosConociste: '',
          mensaje: '',
          aceptaTerminos: false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // ERROR - Intentar obtener más información
        let data;
        try {
          const responseText = await response.text();
          data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          data = {};
        }
        
        console.error('Formspree error - Status:', response.status);
        console.error('Formspree error - Data:', data);
        
        const errorMessage = data.error || 
                           (data.errors && Array.isArray(data.errors) ? data.errors.map((e: any) => e.message).join(', ') : null) ||
                           `Error ${response.status}: No se pudo enviar el formulario`;
        setError(errorMessage);
      }
    } catch (err) {
      setError('Error de conexión. Por favor verifica tu internet e intenta de nuevo.');
      console.error('Error completo:', err);
    } finally {
      setLoading(false);
    }
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
              <Link href="/servicios" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Servicios</Link>
              <Link href="/portafolio" className="text-sm font-bold uppercase tracking-wider hover:text-[#05ABC4] transition-colors">Portafolio</Link>
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
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
            <span className="text-[#05ABC4] text-xs font-black uppercase tracking-[0.3em]">Iniciar Proyecto</span>
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#05ABC4] to-transparent rounded-full"></div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
            Construyamos Tu<br />
            <span className="text-[#05ABC4] italic">Próximo Legado</span>
          </h1>

          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Completa el formulario y nuestro equipo se pondrá en contacto contigo<br />
            en las próximas <span className="text-[#05ABC4] font-bold">24 horas</span> para comenzar a hacer realidad tu visión.
          </p>
        </div>
      </section>

      {/* MENSAJE DE ÉXITO */}
      {enviado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#0D3A66] border border-[#05ABC4] rounded-3xl p-12 max-w-2xl w-full text-center relative">
            <button 
              onClick={() => setEnviado(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>

            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center mx-auto mb-8">
              <div className="text-white text-4xl">
                <FiCheckCircle />
              </div>
            </div>

            <h2 className="text-4xl font-black uppercase mb-6">
              ¡Mensaje <span className="text-[#05ABC4]">Enviado!</span>
            </h2>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Gracias por confiar en FJONIC Studio. Hemos recibido tu solicitud y nuestro equipo la está revisando. 
              Nos pondremos en contacto contigo en las próximas 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setEnviado(false)}
                className="bg-[#05ABC4] text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#1C75BC] transition-all"
              >
                Cerrar
              </button>
              <Link 
                href="/portafolio"
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white/10 transition-all"
              >
                Ver Portafolio
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <section className="py-20 px-6 bg-[#0A1F33]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* INFORMACIÓN DE CONTACTO */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black uppercase mb-6">
                  Información de <span className="text-[#05ABC4]">Contacto</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  ¿Prefieres contactarnos directamente? Estamos disponibles por múltiples canales.
                </p>
              </div>

              {/* Datos de Contacto */}
              <div className="space-y-6">
                <a 
                  href="mailto:fjonicstudio@gmail.com"
                  className="flex items-start gap-4 p-6 bg-[#0D3A66] border border-white/10 rounded-2xl hover:border-[#05ABC4] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      <FiMail />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Email</div>
                    <div className="text-white font-bold group-hover:text-[#05ABC4] transition-colors">
                      fjonicstudio@gmail.com
                    </div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/3182602764"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-6 bg-[#0D3A66] border border-white/10 rounded-2xl hover:border-[#05ABC4] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      <FiPhone />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">WhatsApp</div>
                    <div className="text-white font-bold group-hover:text-[#05ABC4] transition-colors">
                      +57 318 260 2764
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-6 bg-[#0D3A66] border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      <FiMapPin />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Ubicación</div>
                    <div className="text-white font-bold">
                      Ubaté, Cundinamarca<br />
                      Colombia
                    </div>
                  </div>
                </div>

                <a 
                  href="https://www.instagram.com/fjonic_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-6 bg-[#0D3A66] border border-white/10 rounded-2xl hover:border-[#05ABC4] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <div className="text-white">
                      <FiInstagram />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-1 font-bold">Instagram</div>
                    <div className="text-white font-bold group-hover:text-[#05ABC4] transition-colors">
                      @fjonic_studio
                    </div>
                  </div>
                </a>
              </div>

              {/* Horarios */}
              <div className="bg-gradient-to-br from-[#05ABC4]/10 to-[#1C75BC]/10 border border-[#05ABC4]/30 rounded-2xl p-6">
                <h3 className="text-xl font-black uppercase mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lunes - Viernes:</span>
                    <span className="text-white font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sábados:</span>
                    <span className="text-white font-bold">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Domingos:</span>
                    <span className="text-white font-bold">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULARIO */}
            <div className="lg:col-span-2">
              <div className="bg-[#0D3A66] border border-white/10 rounded-3xl p-8 md:p-12">
                <h2 className="text-3xl font-black uppercase mb-2">
                  Formulario de <span className="text-[#05ABC4]">Contacto</span>
                </h2>
                <p className="text-slate-400 mb-8">Los campos marcados con <span className="text-red-400">*</span> son obligatorios</p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
                    <div className="text-red-400 mt-1">
                      <FiAlertCircle />
                    </div>
                    <div className="text-red-400 text-sm">{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Información Personal */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center text-sm">
                        1
                      </div>
                      Información Personal
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Nombre Completo <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="nombrePersona"
                          value={formData.nombrePersona}
                          onChange={handleInputChange}
                          required
                          placeholder="Juan Pérez"
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Nombre de la Empresa
                        </label>
                        <input
                          type="text"
                          name="nombreEmpresa"
                          value={formData.nombreEmpresa}
                          onChange={handleInputChange}
                          placeholder="Mi Empresa S.A.S."
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="juan@miempresa.com"
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Teléfono / WhatsApp <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          placeholder="+57 300 123 4567"
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          País
                        </label>
                        <input
                          type="text"
                          name="pais"
                          value={formData.pais}
                          onChange={handleInputChange}
                          placeholder="Colombia"
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          placeholder="Bogotá"
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información del Proyecto */}
                  <div className="space-y-6 pt-8 border-t border-white/10">
                    <h3 className="text-xl font-black uppercase flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center text-sm">
                        2
                      </div>
                      Información del Proyecto
                    </h3>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-4">
                        Servicios de Interés <span className="text-red-400">*</span>
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {servicios.map((servicio) => (
                          <button
                            key={servicio}
                            type="button"
                            onClick={() => handleServicioToggle(servicio)}
                            className={`text-left px-6 py-4 rounded-xl font-bold text-sm transition-all ${
                              formData.servicios.includes(servicio)
                                ? 'bg-[#05ABC4] text-white border border-[#05ABC4]'
                                : 'bg-[#0A1F33] text-slate-400 border border-white/10 hover:border-[#05ABC4] hover:text-white'
                            }`}
                          >
                            {servicio}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Presupuesto Estimado
                        </label>
                        <select
                          name="presupuesto"
                          value={formData.presupuesto}
                          onChange={handleInputChange}
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#05ABC4] transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Selecciona un rango</option>
                          {presupuestos.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                          Timeline del Proyecto
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#05ABC4] transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Selecciona un plazo</option>
                          {timelines.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                        ¿Cómo nos conociste?
                      </label>
                      <input
                        type="text"
                        name="comoNosConociste"
                        value={formData.comoNosConociste}
                        onChange={handleInputChange}
                        placeholder="Instagram, Google, Recomendación, etc."
                        className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                        Cuéntanos sobre tu proyecto
                      </label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        rows={6}
                        placeholder="Describe tu proyecto, objetivos, necesidades específicas y cualquier información relevante que quieras compartir..."
                        className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-[#05ABC4] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Términos y Envío */}
                  <div className="space-y-6 pt-8 border-t border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="aceptaTerminos"
                        checked={formData.aceptaTerminos}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-5 h-5 rounded border-2 border-white/20 bg-[#0A1F33] checked:bg-[#05ABC4] checked:border-[#05ABC4] transition-all cursor-pointer"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                        Acepto los{' '}
                        <Link href="/terminos" className="text-[#05ABC4] hover:underline">
                          términos y condiciones
                        </Link>
                        {' '}y la{' '}
                        <Link href="/privacidad" className="text-[#05ABC4] hover:underline">
                          política de privacidad
                        </Link>
                        . Autorizo el uso de mis datos para contacto. <span className="text-red-400">*</span>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#05ABC4] to-[#1C75BC] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:shadow-2xl hover:shadow-[#05ABC4]/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Solicitud
                          <div><FiSend /></div>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      Al enviar este formulario, recibirás una respuesta de nuestro equipo en las próximas 24 horas hábiles.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="py-32 px-6 bg-[#0D3A66]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
              <span className="text-[#05ABC4] font-black uppercase text-xs tracking-[0.3em]">FAQ</span>
              <div className="w-8 h-1 bg-[#05ABC4] rounded-full"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Preguntas <span className="text-[#05ABC4] italic">Frecuentes</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                pregunta: '¿Cuánto tiempo toma iniciar mi proyecto?',
                respuesta: 'Después de recibir tu solicitud, nos pondremos en contacto en las próximas 24 horas para agendar una videollamada de estrategia. El inicio formal del proyecto puede ser tan rápido como 2-3 días después de la llamada.'
              },
              {
                pregunta: '¿Trabajan con empresas de cualquier tamaño?',
                respuesta: 'Sí, trabajamos con emprendimientos, PyMEs y grandes empresas. Adaptamos nuestros servicios y presupuestos según las necesidades específicas de cada cliente.'
              },
              {
                pregunta: '¿Cuál es su forma de pago?',
                respuesta: 'Trabajamos con un sistema flexible: 50% al inicio del proyecto y 50% al finalizar. Para proyectos grandes, podemos estructurar pagos por hitos. Aceptamos transferencias bancarias y pagos internacionales.'
              },
              {
                pregunta: '¿Ofrecen contratos mensuales o solo proyectos únicos?',
                respuesta: 'Ofrecemos ambas modalidades. Tenemos proyectos puntuales (branding, sitios web) y servicios recurrentes como community management, producción de contenido mensual y mantenimiento web.'
              },
              {
                pregunta: '¿Qué pasa después de completar mi proyecto?',
                respuesta: 'Todos nuestros proyectos incluyen capacitación para que puedas gestionar tus activos. Además, ofrecemos soporte post-entrega y planes de mantenimiento para asegurar que tu inversión siga generando resultados.'
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className="bg-[#0A1F33] border border-white/10 rounded-2xl p-6 hover:border-[#05ABC4] transition-all group"
              >
                <summary className="font-black uppercase cursor-pointer text-lg flex items-center justify-between group-hover:text-[#05ABC4] transition-colors">
                  {faq.pregunta}
                  <div className="text-[#05ABC4] transform group-open:rotate-45 transition-transform">
                    <FiArrowUpRight size={24} />
                  </div>
                </summary>
                <p className="text-slate-400 mt-4 leading-relaxed">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA ALTERNATIVO */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#05ABC4] via-[#175A8C] to-[#1C75BC] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0A1F33] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 text-white leading-tight">
            ¿Prefieres una<br />
            <span className="italic">Conversación Directa?</span>
          </h2>
          <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Agenda una videollamada de 30 minutos sin costo para explorar cómo podemos ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center">
            <a 
              href="https://wa.me/3182602764?text=Hola,%20quiero%20agendar%20una%20videollamada%20para%20hablar%20sobre%20mi%20proyecto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0A1F33] px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-[#0A1F33] hover:text-white transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              Agendar Videollamada
              <div><FiArrowUpRight /></div>
            </a>
            <a 
              href="https://wa.me/3182602764"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0A1F33] text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-wider hover:bg-white hover:text-[#0A1F33] transition-all shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-3"
            >
              WhatsApp Directo
              <div><FiPhone /></div>
            </a>
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

        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </main>
  );
}