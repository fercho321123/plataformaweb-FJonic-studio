'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { usuario, logout, loading } = useAuth();
  const router = useRouter();

  // Esperamos a que AuthContext termine de cargar
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
    <div className="min-h-screen flex bg-gray-100">
      {/* MENÚ LATERAL */}
      <aside className="w-64 bg-black text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">FJonic Studio</h2>

        <nav className="space-y-2">
          {/* Siempre visible */}
          <Link href="/dashboard" className="block hover:text-gray-300">
            Inicio
          </Link>

          {/* SOLO Admin y Staff */}
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

          {/* Visible para todos */}
          <Link href="/dashboard/proyectos" className="block hover:text-gray-300">
            Proyectos
          </Link>

          {/* 🔥 BOTÓN DE CERRAR SESIÓN */}
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

      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}

