'use client';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarTickets = async () => {
      try {
        const data = await apiFetch('/soporte/admin/tickets');
        setTickets(data || []);
      } catch (error) {
        console.error("Error cargando tickets", error);
      } finally {
        setLoading(false);
      }
    };
    cargarTickets();
  }, []);

  if (loading) return <p className="p-10">Cargando tickets...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Panel de Soporte Técnico</h1>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Asunto</th>
              <th className="p-4 font-semibold text-slate-700">Mensaje</th>
              <th className="p-4 font-semibold text-slate-700">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t: any) => (
              <tr key={t.id} className="border-b hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-blue-600">{t.titulo}</td>
                <td className="p-4 text-slate-600">{t.mensaje}</td>
                <td className="p-4 text-slate-400 text-sm">
                  {new Date(t.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-400">
                  No hay tickets registrados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}