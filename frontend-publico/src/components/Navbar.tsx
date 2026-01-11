'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiChevronRight } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Método', href: '/metodo' },
    { name: 'Planes', href: '/planes' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${
      scrolled ? 'top-2' : 'top-0'
    }`}>
      <div className={`max-w-7xl mx-auto transition-all duration-300 rounded-[2rem] border ${
        scrolled 
        ? 'bg-[#0A1F33]/80 backdrop-blur-md border-white/10 shadow-2xl py-3 px-8' 
        : 'bg-transparent border-transparent py-5 px-4'
      }`}>
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="group">
            <span className="text-2xl font-black tracking-tighter italic">
              FJONIC <span className="text-[#05ABCA] group-hover:text-white transition-colors underline decoration-2 underline-offset-4">STUDIO</span>
            </span>
          </Link>

          {/* LINKS ESCRITORIO */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all hover:text-[#05ABCA] ${
                  pathname === link.href ? 'text-[#05ABCA]' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="https://wa.me/3103058864" 
              target="_blank"
              className="bg-[#05ABCA] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#05ABCA]/20"
            >
              Contacto
            </Link>
          </div>

          {/* BOTÓN MÓVIL CORREGIDO */}
          <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
            <span className="flex items-center justify-center">
              {isOpen ? <FiX /> : <FiMenu />}
            </span>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL CORREGIDO */}
      <div className={`fixed inset-0 bg-[#0A1F33] z-[-1] transition-transform duration-500 md:hidden flex flex-col justify-center px-12 gap-8 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsOpen(false)}
            className="text-4xl font-black italic flex items-center justify-between group"
          >
            <span className={pathname === link.href ? 'text-[#05ABCA]' : 'text-white'}>
              {link.name}
            </span>
            <span className="opacity-0 group-hover:opacity-100 text-[#05ABCA] transition-all transform translate-x-[-10px] group-hover:translate-x-0">
              <FiChevronRight />
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}