'use client';

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { usuario } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Panel Principal</h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
        <p className="mb-2">
          <strong>Usuario:</strong> {usuario?.nombre}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {usuario?.email}
        </p>
        <p>
          <strong>Rol:</strong> {usuario?.rol}
        </p>
      </div>
    </div>
  );
}
