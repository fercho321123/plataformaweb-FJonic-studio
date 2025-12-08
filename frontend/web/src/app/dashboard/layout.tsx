'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.push('/login');
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p className="p-10">Cargando sesión...</p>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MENÚ LATERAL */}
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">FJonic Studio</h2>

       <nav className="space-y-2">
  <Link href="/dashboard" className="block hover:text-gray-300">
    Inicio
  </Link>

  <Link href="/dashboard/clientes" className="block hover:text-gray-300">
    Clientes
  </Link>

  <Link href="/dashboard/proyectos" className="block hover:text-gray-300">
    Proyectos
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
</nav>

      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
