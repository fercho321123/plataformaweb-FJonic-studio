'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import NotificationBell from './components/NotificationBell';
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
  }, [usuario, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-[#0D3A66] rounded-full animate-spin"></div>
          <p className="font-medium text-slate-500 animate-pulse font-montserrat">FJONIC Studio...</p>
        </div>
      </div>
    );
  }

  if (!usuario) return null;

  const esAdmin = usuario.rol === 'admin';
  const esStaff = usuario.rol === 'staff';
  const esAdminOStaff = esAdmin || esStaff;
  
  const isActive = (path: string) => pathname === path;

  return (
    <div className={`${montserrat.variable} ${openSans.variable} font-open-sans min-h-screen flex flex-col bg-[#F8FAFC]`}>
      
      {/* 🔵 HEADER PREMIUM */}
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/dashboard')}>
          <Image src="/prototipo.png" alt="FJONIC Studio" width={42} height={42} className="transition-transform group-hover:scale-105" priority />
          <div className="flex flex-col">
            <span className="text-[#0A1F33] font-black text-xl tracking-tighter font-montserrat leading-none">FJONIC</span>
            <span className="text-[#05ABCA] text-[10px] font-bold uppercase tracking-[0.3em] leading-none mt-1">Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <NotificationBell />
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-800 leading-none">{usuario?.nombre || usuario?.email}</p>
            <p className="text-[10px] font-black text-[#05ABCA] uppercase mt-1 tracking-widest">{usuario?.rol}</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0D3A66] to-[#0A1F33] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/10 uppercase">
            {usuario?.nombre?.charAt(0) || usuario?.email?.charAt(0)}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 🌑 SIDEBAR */}
        <aside className="w-72 bg-[#0A1F33] text-white flex flex-col shadow-2xl z-40 sticky top-20 h-[calc(100vh-5rem)]">
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto custom-scrollbar text-sm font-medium">
            
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">Menú Principal</p>
            
            <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard') ? 'bg-white/10 text-white font-bold shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Inicio
            </Link>

            {/* 💎 APARTADO DE PLANES (Accesible para todos) */}
            <Link href="/dashboard/planes" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/planes') ? 'bg-[#05ABCA] text-white font-bold shadow-lg shadow-[#05ABCA]/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              Nuestros Planes
            </Link>

            {/* 🔒 PANEL EXCLUSIVO ADMIN */}
            {esAdmin && (
              <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 ml-4">Administración</p>
                
                <Link href="/dashboard/admin/usuarios" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/admin/usuarios') ? 'bg-amber-500 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Gestión de Staff
                </Link>

                <Link href="/dashboard/admin/finanzas" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/admin/finanzas') ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Control Financiero
                </Link>

                <Link href="/dashboard/admin/editor-web" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/admin/editor-web') ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Editor de Web
                </Link>
              </div>
            )}

            {/* 🛠️ PANEL OPERATIVO (ADMIN Y STAFF) */}
            {esAdminOStaff && (
              <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
                <p className="text-[10px] font-black text-[#05ABCA] uppercase tracking-widest mb-4 ml-4">Operaciones</p>
                
                <Link href="/dashboard/proyectos" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/proyectos') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Proyectos Activos
                </Link>

                <Link href="/dashboard/clientes" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/clientes') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Directorio Clientes
                </Link>

                <Link href="/dashboard/calendario" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/calendario') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Agenda de Entregas
                </Link>

                <Link href="/dashboard/facturacion" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/facturacion') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Recibos y Facturas
                </Link>
              </div>
            )}

            {/* 👤 SECCIÓN DE CLIENTE */}
            {!esAdminOStaff && (
              <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-4">Mi Cuenta</p>
                <Link href="/dashboard/mis-pedidos" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/mis-pedidos') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Mis Pedidos
                </Link>
                <Link href="/dashboard/soporte" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive('/dashboard/soporte') ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                  Soporte Técnico
                </Link>
              </div>
            )}

            <div className="pt-8 mt-8 border-t border-white/5">
              <button 
                onClick={() => { logout(); router.push('/login'); }} 
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-bold text-sm group"
              >
                Cerrar sesión
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </nav>
          
          <div className="p-6">
            <div className="bg-[#175A8C]/20 rounded-2xl p-4 border border-white/5 text-center">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter italic leading-none">FJONIC Studio</p>
              <p className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest leading-none">Master Panel v1.2</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}