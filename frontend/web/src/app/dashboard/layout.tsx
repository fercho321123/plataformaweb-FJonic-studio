'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, logout, loading } = useAuth();
  const router = useRouter();

  // 🔒 Protección de rutas
  useEffect(() => {
    if (!loading && !usuario) {
      router.push('/login');
    }
  }, [usuario, loading, router]);

  if (loading) {
    return <p className="p-10">Restaurando sesión...</p>;
  }

  if (!usuario) {
    return null;
  }

  const esAdminOStaff = usuario.rol === 'admin' || usuario.rol === 'staff';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* 🔵 HEADER */}
      <header className="h-16 bg-[#0A1F33] flex items-center justify-between px-6 shadow-md">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          <Image
            src="/prototipo.png"
            alt="FJONIC Studio"
            width={40}
            height={40}
            priority
          />
          <span className="text-white font-semibold tracking-wide">
            FJONIC Studio
          </span>
        </div>

        <span className="text-blue-200 text-sm">
          {usuario.email}
        </span>
      </header>

      {/* CONTENIDO GENERAL */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#0A1F33] text-white p-6 space-y-4">
          <nav className="space-y-2">
            <Link href="/dashboard" className="block hover:text-gray-300">
              Inicio
            </Link>

            {esAdminOStaff && (
              <>
                <Link href="/dashboard/clientes" className="block hover:text-gray-300">
                  Clientes
                </Link>
                <Link href="/dashboard/contenido" className="block hover:text-gray-300">
                  Contenido
                </Link>
                <Link href="/dashboard/facturacion" className="block hover:text-gray-300">
                  Facturación
                </Link>
                <Link href="/dashboard/metricas" className="block hover:text-gray-300">
                  Métricas
                </Link>
              </>
            )}

            <Link href="/dashboard/proyectos" className="block hover:text-gray-300">
              Proyectos
            </Link>

            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="mt-6 w-full text-left bg-red-600 px-3 py-2 rounded hover:bg-red-700"
            >
              Cerrar sesión
            </button>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
