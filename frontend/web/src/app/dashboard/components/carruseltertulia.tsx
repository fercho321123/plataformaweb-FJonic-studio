'use client';

import { useEffect, useState } from 'react';

const empresaA = {
  nombre: 'the burger station',
  logo: '/logos/theburgerstation.png',
  imagenes: [
    '/servicios/station 1.png',
    '/servicios/station 2.png',
    '/servicios/station 3.png',
    '/servicios/station 4.png',
    '/servicios/station 5.png',
    '/servicios/station 6.png',
    '/servicios/station 7.png',
    '/servicios/station 8.png',
    '/servicios/station 9.png',
  ],
};

const empresaB = {
  nombre: 'la tertulia',
  logo: '/logos/tertulia.png',
  imagenes: [
    '/servicios/tertulia 1.png',
    '/servicios/tertulia 2.png',
    '/servicios/tertulia 3.png',
    '/servicios/tertulia 4.png',
    '/servicios/tertulia 5.png',
    '/servicios/tertulia 6.png',
    '/servicios/tertulia 7.png',
    '/servicios/tertulia 8.png',
    '/servicios/tertulia 9.png',
    '/servicios/tertulia 10.png',
    '/servicios/tertulia 11.png',
    '/servicios/tertulia 12.png',
    '/servicios/tertulia 13.png',
    '/servicios/tertulia 14.png',
    '/servicios/tertulia 15.png',
    '/servicios/tertulia 16.png',
  ],
};

function Carousel({
  imagenes,
  titulo,
  logo,
}: {
  imagenes: string[];
  titulo: string;
  logo: string;
}) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);

  useEffect(() => {
    if (hover) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [imagenes.length, hover]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-[260px]">
        {/* LOGO */}
        <img src={logo} alt={titulo} className="h-9 object-contain" />

        {/* TITULO */}
        <h3 className="text-lg font-semibold text-blue-600 uppercase tracking-wide">
          {titulo}
        </h3>

        {/* BADGE */}
        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
          Proyecto real
        </span>

        {/* IMAGEN */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setMostrarGaleria(true)}
          className="relative aspect-[3/5] w-full overflow-hidden rounded-2xl bg-black shadow-xl cursor-pointer transition-transform hover:scale-[1.03]"
        >
          {imagenes.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-[1200ms] ease-out ${
                i === index
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            />
          ))}
        </div>

        {/* INDICADORES */}
        <div className="flex gap-2 mt-2">
          {imagenes.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === index ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Click para ver galería
        </p>
      </div>

      {/* GALERÍA */}
      {mostrarGaleria && (
        <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
          <div className="relative bg-black w-full max-w-5xl max-h-[90vh] rounded-xl p-6 overflow-hidden">
            {/* BOTON CERRAR */}
            <button
              onClick={() => setMostrarGaleria(false)}
              className="absolute top-4 right-4 z-50 text-white text-2xl"
            >
              ✕
            </button>

            <h2 className="text-white text-xl font-semibold mb-4">
              {titulo} — Galería completa
            </h2>

            {/* SCROLL */}
            <div className="overflow-y-auto max-h-[75vh] pr-2 grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagenes.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-xl object-contain bg-black"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default function ServiciosDoblesCarousel() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8">
      <Carousel
        titulo={empresaA.nombre}
        logo={empresaA.logo}
        imagenes={empresaA.imagenes}
      />

      <Carousel
        titulo={empresaB.nombre}
        logo={empresaB.logo}
        imagenes={empresaB.imagenes}
      />
    </div>
  );
}
