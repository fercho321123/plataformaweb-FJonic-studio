import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiUser, FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';

// ⚠️ NOTA: Idealmente esta lista de artículos debería estar en un archivo de datos separado (ej. `data/articulos.js`) 
// para importarla tanto en el blog principal como aquí. Por ahora, incluimos la misma estructura de ejemplo:
const articulos = [
  {
    id: 1,
    titulo: 'Deja de publicar por publicar: cómo construir una estrategia digital para tu negocio',
    slug: 'deja-de-publicar-por-publicar',
    extracto: 'En la actualidad, tener presencia en redes sociales es fundamental...',
    contenido: 'En la actualidad, tener presencia en redes sociales es fundamental para emprendedores, marcas personales y pequeñas empresas que buscan mejorar su visibilidad. Sin embargo, publicar constantemente no significa tener una estrategia digital. Cada contenido debe responder a un objetivo y estar relacionado con las necesidades del público. Una estrategia de marketing digital permite organizar los contenidos, definir los canales de comunicación y establecer acciones orientadas al posicionamiento, la interacción y la conversión. Antes de publicar, es importante conocer al público objetivo y determinar qué se quiere lograr con cada contenido. Para FJONIC Studio, el público está conformado principalmente por emprendedores, marcas personales y pequeñas empresas que buscan fortalecer su imagen, comunicación y presencia digital. El contenido digital debe aportar valor y responder a las necesidades de la audiencia. Los contenidos educativos permiten compartir conocimientos; los contenidos demostrativos muestran procesos y resultados; el contenido de interacción fortalece el engagement; y el contenido promocional presenta los servicios de la empresa. El contenido de valor ayuda a generar confianza y autoridad, mientras que el branding permite fortalecer la identidad y el reconocimiento de la marca. Una estrategia digital debe acompañar al usuario desde el primer contacto hasta una posible contratación. Primero se busca generar visibilidad y reconocimiento; posteriormente, interacción y consideración; finalmente, se facilita la conversión mediante llamados a la acción claros. También es importante medir los resultados. Indicadores como alcance, impresiones, interacciones, clics, mensajes y leads permiten conocer el desempeño de las acciones digitales. Dejar de publicar por publicar significa comenzar a comunicar con intención. Una marca necesita conocer a su público, establecer objetivos, crear contenido de valor y utilizar sus canales de manera estratégica. En FJONIC Studio, la creatividad y el marketing digital se integran para ayudar a emprendedores, marcas personales y pequeñas empresas a fortalecer su posicionamiento y construir una presencia digital profesional.',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    categoria: 'marketing',
    autor: 'FJONIC Studio',
    fecha: '18 de Enero, 2026',
    tiempoLectura: '6 min',
    tags: ['Marketing', 'Estrategia', 'Social Media', 'Conversión'],
  },
  {
    id: 2,
    titulo: 'El poder del video: cómo el contenido audiovisual puede fortalecer tu marca',
    slug: 'poder-del-video-contenido-audiovisual',
    extracto: 'El contenido audiovisual se ha convertido en una herramienta importante...',
    contenido: 'En un entorno digital donde las personas reciben constantemente información, las marcas necesitan encontrar formas atractivas de comunicar sus ideas. El contenido audiovisual se ha convertido en una herramienta importante para captar la atención, transmitir mensajes y fortalecer la identidad de una empresa. Un video puede mostrar en pocos segundos la personalidad de una marca, explicar un servicio, presentar un producto o mostrar un proceso creativo. Por esta razón, la producción audiovisual puede convertirse en un recurso estratégico dentro del marketing digital. El video permite comunicar información de una manera dinámica y cercana. Además, puede utilizarse en diferentes plataformas digitales y adaptarse a distintos objetivos. Una empresa puede crear videos educativos para compartir conocimientos, videos demostrativos para mostrar sus procesos, contenidos de branding para fortalecer su identidad o videos promocionales para presentar sus servicios. Para FJONIC Studio, la producción audiovisual forma parte de su propuesta de valor y se integra con el marketing digital para ayudar a emprendedores, marcas personales y pequeñas empresas a fortalecer su presencia digital. Un contenido audiovisual no debe enfocarse únicamente en vender. También puede ayudar a construir reconocimiento y confianza. La música, las imágenes, los colores, la edición, el mensaje y la forma de presentar la información deben mantener coherencia con la identidad visual de la marca. De esta manera, cada video contribuye al branding y al posicionamiento. Además, mostrar procesos, proyectos y detrás de cámaras permite que la audiencia conozca el trabajo que existe detrás de una marca y genere una relación más cercana con ella. Para que un video sea parte de una estrategia, debe tener un objetivo definido. Puede buscar aumentar el alcance, generar interacción, presentar un servicio o conseguir nuevos clientes potenciales. También es importante analizar indicadores como reproducciones, alcance, interacciones, clics y mensajes recibidos. Estos datos permiten conocer el rendimiento del contenido y realizar mejoras. El video no es solamente una pieza visual atractiva; es una herramienta de comunicación que puede fortalecer el posicionamiento, el branding y la conexión con la audiencia. En FJONIC Studio combinamos creatividad, comunicación visual y estrategia para desarrollar contenidos audiovisuales que permitan a las marcas comunicar sus ideas de manera profesional.',
    imagen: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=800&fit=crop',
    categoria: 'video',
    autor: 'FJONIC Studio',
    fecha: '16 de Enero, 2026',
    tiempoLectura: '6 min',
    tags: ['Video', 'Producción Audiovisual', 'Branding', 'Storytelling'],
  },
  {
    id: 3,
    titulo: 'Marca personal: cómo construir una presencia profesional en redes sociales',
    slug: 'marca-personal-presencia-profesional',
    extracto: 'Convierte tu experiencia y creatividad en una marca que conecte...',
    contenido: 'En el entorno digital, las personas no solo siguen empresas: también siguen profesionales, creadores y emprendedores con quienes se sienten identificados. Por esta razón, desarrollar una marca personal puede ser una oportunidad para diferenciarse, generar confianza y fortalecer la presencia profesional en redes sociales. Una marca personal no consiste únicamente en tener un logotipo o publicar fotografías. Se construye a partir de la forma en que una persona comunica sus conocimientos, experiencia, valores y propuesta de valor. Una presencia profesional permite que las personas reconozcan qué hace una persona, qué conocimientos posee y qué puede ofrecer. Para un emprendedor o creador de contenido, las redes sociales pueden convertirse en un espacio para compartir conocimientos, mostrar proyectos, explicar procesos y construir una comunidad. La constancia también es importante. Mantener una comunicación coherente ayuda a fortalecer el posicionamiento y permite que la audiencia identifique con mayor facilidad la personalidad y propuesta de la marca. El contenido es uno de los principales recursos para desarrollar una marca personal. Compartir consejos, experiencias, conocimientos y proyectos permite demostrar experiencia y generar contenido de valor. También es importante combinar diferentes formatos, como publicaciones, videos, historias y contenidos audiovisuales. Cada formato puede cumplir una función diferente dentro de la estrategia digital. El objetivo no debe ser publicar por publicar, sino crear contenidos que respondan a los intereses del público y ayuden a construir una relación con la audiencia. Una marca personal sólida necesita generar confianza. Para conseguirlo, es importante mostrar autenticidad, mantener una comunicación profesional y compartir información útil. Cuando una persona reconoce el valor de una marca personal, es más probable que considere sus productos, servicios o conocimientos cuando tenga una necesidad relacionada. Por eso, la estrategia debe combinar visibilidad, engagement, posicionamiento y conversión. Construir una marca personal requiere tiempo, planificación y constancia. No se trata de aparentar ser alguien diferente, sino de comunicar de manera estratégica aquello que hace única a una persona. En FJONIC Studio entendemos la marca personal como una herramienta para fortalecer la identidad, mejorar la comunicación digital y ayudar a profesionales y emprendedores a proyectar una imagen más sólida.',
    imagen: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    categoria: 'branding',
    autor: 'FJONIC Studio',
    fecha: '14 de Enero, 2026',
    tiempoLectura: '6 min',
    tags: ['Marca Personal', 'Branding', 'Redes Sociales', 'Estrategia'],
  }
];

export default async function ArticuloDetalle({ params }) {
  const { slug } = await params;
  const articulo = articulos.find((art) => art.slug === slug);

  if (!articulo) {
    return (
      <main className="min-h-screen bg-[#0A1F33] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4">Artículo no encontrado</h1>
        <p className="text-slate-400 mb-8">El artículo que buscas no existe o fue movido.</p>
        <Link href="/blog" className="bg-[#05ABC4] text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider">
          Volver al Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#0A1F33] text-white min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Botón de regreso */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#05ABC4] hover:underline mb-8">
          <FiArrowLeft /> Volver al Blog
        </Link>

        {/* Categoría y Fecha */}
        <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
          <span className="bg-[#05ABC4]/20 text-[#05ABC4] px-4 py-1.5 rounded-full font-black uppercase tracking-wider">
            {articulo.categoria}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <FiClock /> {articulo.tiempoLectura}
          </div>
          <span>•</span>
          <span>{articulo.fecha}</span>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-6">
          {articulo.titulo}
        </h1>

        {/* Autor */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#05ABC4] to-[#1C75BC] flex items-center justify-center text-white">
            <FiUser />
          </div>
          <div>
            <div className="text-sm font-bold">{articulo.autor}</div>
            <div className="text-xs text-slate-400">Redacción FJONIC Studio</div>
          </div>
        </div>

        {/* Imagen Principal */}
        <div className="rounded-3xl overflow-hidden mb-12 border border-white/10">
          <img src={articulo.imagen} alt={articulo.titulo} className="w-full aspect-[16/9] object-cover" />
        </div>

        {/* Contenido Completo */}
        <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed space-y-6">
          <p>{articulo.contenido}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-white/10">
          {articulo.tags.map((tag, i) => (
            <span key={i} className="bg-white/5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
              {tag}
            </span>
          ))}
        </div>

      </div>
    </main>
  );
}