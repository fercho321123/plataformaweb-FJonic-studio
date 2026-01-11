'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '700', '800', '900'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
  weight: ['400', '500', '600', '700'],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !usuario) {
      router.push('/login');
    }
    // Si un cliente intenta entrar, lo mandamos fuera ya que este panel es solo interno
    if (!loading && usuario && usuario.rol === 'cliente') {
      logout();
      router.push('/login');
    }
  }, [usuario, loading, router, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1F33] via-[#0d2640] to-[#0A1F33]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full animate-spin"></div>
          <p className="font-bold text-[#05ABCA] animate-pulse font-montserrat tracking-wider">FJONIC SYSTEM</p>
        </div>
      </div>
    );
  }

  if (!usuario) return null;

  const esAdmin = usuario.rol === 'admin';
  const esStaff = usuario.rol === 'staff';
  const esAdminOStaff = esAdmin || esStaff;
  
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className={`${montserrat.variable} ${openSans.variable} font-open-sans min-h-screen flex flex-col bg-gradient-to-br from-[#0A1F33] via-[#0d2640] to-[#0A1F33] relative overflow-hidden`}>
      
      {/* GRID DE FONDO TECNOLÓGICO */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: `linear-gradient(#05ABCA 1px, transparent 1px), linear-gradient(90deg, #05ABCA 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* LÍNEAS BRILLANTES ANIMADAS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute h-px bg-gradient-to-r from-transparent via-[#05ABCA]/30 to-transparent animate-pulse"
          style={{ width: '200%', top: '20%', animationDuration: '3s' }}
        />
        <div 
          className="absolute w-px bg-gradient-to-b from-transparent via-[#1C75BC]/30 to-transparent animate-pulse"
          style={{ height: '200%', left: '70%', animationDuration: '4s' }}
        />
      </div>
      
      {/* HEADER FUTURISTA */}
      <header className="relative h-20 bg-[#0A1F33]/80 backdrop-blur-xl border-b border-[#05ABCA]/20 flex items-center justify-between px-8 sticky top-0 z-50 shadow-lg shadow-black/20">
        {/* GLOW LINE TOP */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
        
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => router.push('/dashboard')}>
          <div className="relative">
            <div className="absolute inset-0 bg-[#05ABCA]/20 blur-xl rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
            <Image 
              src="/prototipo.png" 
              alt="FJONIC Studio" 
              width={48} 
              height={48} 
              className="relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-3" 
              priority 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-2xl tracking-tighter font-montserrat leading-none text-nowrap uppercase">
              FJONIC
            </span>
            <span className="text-[#05ABCA] text-[10px] font-bold uppercase tracking-[0.35em] leading-none mt-1 text-nowrap">
              Control System
            </span>
          </div>
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-white font-semibold text-sm">{usuario.nombre}</p>
            <p className="text-[#05ABCA] text-xs uppercase tracking-wider font-medium">{usuario.rol}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center text-white font-bold shadow-lg shadow-[#05ABCA]/30">
            {usuario.nombre?.charAt(0) || 'U'}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative z-10">
        {/* SIDEBAR FUTURISTA */}
        <aside className="w-72 bg-[#0A1F33]/60 backdrop-blur-xl border-r border-[#05ABCA]/10 flex flex-col shadow-2xl z-40 sticky top-20 h-[calc(100vh-5rem)] overflow-hidden">
          
          {/* GLOW VERTICAL */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#05ABCA]/50 to-transparent" />
          
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar text-sm font-medium relative">
            
            {/* MONITOR PRINCIPAL */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full" />
                <p className="text-[10px] font-black text-[#05ABCA] uppercase tracking-widest">
                  Monitor Principal
                </p>
              </div>
              
              <Link 
                href="/dashboard" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  pathname === '/dashboard' 
                    ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white font-bold border border-[#05ABCA]/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {pathname === '/dashboard' && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#05ABCA]" />
                )}
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="relative z-10">Tablero de Resumen</span>
              </Link>
            </div>

            {/* GESTIÓN DE NEGOCIO */}
            <div className="pt-6 mt-6 border-t border-[#05ABCA]/10 space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full" />
                <p className="text-[10px] font-black text-[#05ABCA] uppercase tracking-widest">
                  Gestión de Negocio
                </p>
              </div>
              
              <Link 
                href="/dashboard/proyectos" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  isActive('/dashboard/proyectos')
                    ? 'bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white font-bold shadow-lg shadow-[#05ABCA]/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive('/dashboard/proyectos') && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-white" />
                )}
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="relative z-10">Proyectos Activos</span>
              </Link>

              <Link 
                href="/dashboard/clientes" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  isActive('/dashboard/clientes')
                    ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white font-bold border border-[#05ABCA]/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive('/dashboard/clientes') && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#05ABCA]" />
                )}
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="relative z-10">Directorio Clientes</span>
              </Link>

              <Link 
                href="/dashboard/facturacion" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                  isActive('/dashboard/facturacion')
                    ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white font-bold border border-[#05ABCA]/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive('/dashboard/facturacion') && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#05ABCA]" />
                )}
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="relative z-10">Facturación</span>
              </Link>
            </div>

            {/* ZONA ADMINISTRATIVA (SOLO ADMIN) */}
            {esAdmin && (
              <div className="pt-6 mt-6 border-t border-[#05ABCA]/10 space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-transparent rounded-full" />
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    Alta Gerencia
                  </p>
                </div>
                
                <Link 
                  href="/dashboard/admin/finanzas" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                    isActive('/dashboard/admin/finanzas')
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive('/dashboard/admin/finanzas') && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-white" />
                  )}
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="relative z-10">Control Financiero</span>
                </Link>

                <Link 
                  href="/dashboard/admin/usuarios" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                    isActive('/dashboard/admin/usuarios')
                      ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white font-bold border border-[#05ABCA]/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive('/dashboard/admin/usuarios') && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#05ABCA]" />
                  )}
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="relative z-10">Gestión de Staff</span>
                </Link>

                <Link 
                  href="/dashboard/soporte" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                    isActive('/dashboard/soporte')
                      ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white font-bold border border-[#05ABCA]/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive('/dashboard/soporte') && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-[#05ABCA]" />
                  )}
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="relative z-10">Gestión Soporte</span>
                </Link>
              </div>
            )}

            <div className="pt-8 mt-8 border-t border-[#05ABCA]/10">
              <button 
                onClick={() => { logout(); router.push('/login'); }} 
                className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-600/10 border border-rose-500/30 text-rose-400 hover:from-rose-500 hover:to-rose-600 hover:text-white transition-all font-bold text-sm group"
              >
                <span>Salir del Sistema</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </nav>
          
          <div className="p-6 relative">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-[#05ABCA]/20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
              <p className="text-[11px] font-bold text-[#05ABCA] uppercase tracking-wider leading-none">
                FJONIC Business
              </p>
              <p className="text-[9px] text-slate-400 mt-2 uppercase tracking-widest leading-none">
                Internal ERP v2.0
              </p>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-[1600px] mx-auto p-6 md:p-10 min-h-screen relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}