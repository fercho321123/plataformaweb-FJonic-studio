'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat, Open_Sans } from 'next/font/google';
import { FiMenu, FiX, FiHome, FiLayers, FiUsers, FiFileText, FiDollarSign, FiUserPlus, FiLifeBuoy, FiLogOut } from 'react-icons/fi';

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { usuario, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !usuario) router.push('/login');
    if (!loading && usuario && usuario.rol === 'cliente') {
      logout();
      router.push('/login');
    }
  }, [usuario, loading, router, logout]);

  // Cerrar sidebar al cambiar de ruta (móvil)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (loading || !usuario) return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
       <div className="w-12 h-12 border-2 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full animate-spin" />
    </div>
  );

  const esAdmin = usuario.rol === 'admin';
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const NavItem = ({ href, icon: Icon, label, color = "primary" }: any) => {
    const active = isActive(href);
    const themes = {
      primary: active ? 'bg-gradient-to-r from-[#05ABCA]/20 to-[#1C75BC]/10 text-white border-[#05ABCA]/40 shadow-[0_0_15px_rgba(5,171,202,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent',
      amber: active ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/10 text-amber-500 border-amber-500/40' : 'text-slate-400 hover:text-amber-500 hover:bg-amber-500/5 border-transparent'
    };

    return (
      <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${themes[color as keyof typeof themes]}`}>
        <Icon className={`text-lg ${active ? 'animate-pulse' : 'group-hover:scale-110'}`} />
        <span className={`text-sm font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>
      </Link>
    );
  };

  return (
    <div className={`${montserrat.variable} ${openSans.variable} font-open-sans min-h-screen bg-[#020617] flex flex-col`}>
      
      {/* HEADER SUPERIOR */}
      <header className="h-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-[60]">
        <div className="flex items-center gap-4">
          {/* BOTÓN MENÚ MÓVIL */}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-white bg-white/5 rounded-lg border border-white/10">
            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
            <Image src="/prototipo.png" alt="FJONIC" width={35} height={35} className="brightness-125" />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white font-black text-xl tracking-tighter font-montserrat uppercase">FJONIC</span>
              <span className="text-[#05ABCA] text-[9px] font-black uppercase tracking-[0.3em]">Control Hub</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-white font-bold text-xs">{usuario.nombre}</p>
            <p className="text-[#05ABCA] text-[10px] uppercase font-black tracking-widest">{usuario.rol}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(5,171,202,0.3)]">
            {usuario.nombre?.charAt(0)}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* OVERLAY MÓVIL */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* SIDEBAR */}
        <aside className={`
          fixed lg:sticky top-20 left-0 z-50 h-[calc(100vh-5rem)] 
          w-72 bg-[#020617] border-r border-white/5 transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full p-6 overflow-y-auto custom-scrollbar">
            
            <div className="space-y-8">
              {/* SECCION 1 */}
              <section>
                <p className="text-[10px] font-black text-[#05ABCA] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#05ABCA] rounded-full animate-ping" /> Terminal
                </p>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={FiHome} label="Tablero Principal" />
                </div>
              </section>

              {/* SECCION 2 */}
              <section>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Operaciones</p>
                <div className="space-y-1">
                  <NavItem href="/dashboard/proyectos" icon={FiLayers} label="Proyectos" />
                  <NavItem href="/dashboard/clientes" icon={FiUsers} label="Clientes" />
                  <NavItem href="/dashboard/facturacion" icon={FiFileText} label="Facturación" />
                </div>
              </section>

              {/* SECCION ADMIN */}
              {esAdmin && (
                <section>
                  <p className="text-[10px] font-black text-amber-500/70 uppercase tracking-[0.2em] mb-4">Sistemas Críticos</p>
                  <div className="space-y-1">
                    <NavItem href="/dashboard/admin/finanzas" icon={FiDollarSign} label="Finanzas Global" color="amber" />
                    <NavItem href="/dashboard/admin/usuarios" icon={FiUserPlus} label="Gestión Staff" color="amber" />
                    <NavItem href="/dashboard/soporte" icon={FiLifeBuoy} label="Centro Soporte" color="amber" />
                  </div>
                </section>
              )}
            </div>

            {/* BOTÓN SALIR INFERIOR */}
            <div className="mt-auto pt-8">
              <button 
                onClick={() => { logout(); router.push('/login'); }}
                className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 font-black text-[11px] uppercase tracking-widest group"
              >
                <span>Desconectar</span>
                <FiLogOut className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">FJONIC STUDIO ERP</p>
                <p className="text-[8px] text-slate-700 mt-1 uppercase">V 4.0.2 - 2026</p>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 w-full overflow-x-hidden relative">
          {/* Fondo de Grilla para el contenido */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}