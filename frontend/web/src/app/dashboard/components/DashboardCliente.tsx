'use client';

import { useAuth } from '@/context/AuthContext';
import ClienteProyectos from './ClienteProyectos';

export default function DashboardCliente() {
  const { usuario } = useAuth();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        Bienvenido{usuario?.email ? `, ${usuario.email}` : ''}
      </h1>

      {/* PROYECTOS DEL CLIENTE */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Tus proyectos
        </h2>

        <ClienteProyectos />
      </div>
    </div>
  );
}
