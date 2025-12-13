'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardCliente from './components/DashboardCliente';

export default function DashboardPage() {
  const { usuario, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!usuario) {
    return null;
  }

  // 👤 DASHBOARD CLIENTE
  if (usuario.rol === 'cliente') {
    return <DashboardCliente />;
  }

  // 🛠️ DASHBOARD ADMIN / STAFF (temporal)
  return (
    <div>
      <h1 className="text-3xl font-bold">Panel administrativo</h1>
      <p className="mt-4 text-gray-700">
        Selecciona una opción del menú lateral.
      </p>
    </div>
  );
}
