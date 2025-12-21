'use client';

import { useState } from 'react';

// --- TIPADO DE LEADS ---
interface Lead {
  id: string;
  nombre: string;
  empresa: string;
  email: string;
  whatsapp: string;
  servicio: 'Web' | 'Branding' | 'Social Media' | 'Sistemas';
  estado: 'Nuevo' | 'Contactado' | 'Propuesta' | 'Cerrado' | 'Perdido';
  fecha: string;
  nota: string;
}

// --- DATA DE EJEMPLO (Esto luego vendrá de tu Base de Datos) ---
const LEADS_INICIALES: Lead[] = [
  {
    id: '1',
    nombre: 'Ricardo Gómez',
    empresa: 'Restaurante El Faro',
    email: 'ricardo@faro.com',
    whatsapp: '573001234567',
    servicio: 'Web',
    estado: 'Nuevo',
    fecha: '2025-12-20',
    nota: 'Interesado en menú digital y reserva online.'
  },
  {
    id: '2',
    nombre: 'Marina Soler',
    empresa: 'Glow Estética',
    email: 'marina@glow.com',
    whatsapp: '573119876543',
    servicio: 'Branding',
    estado: 'Contactado',
    fecha: '2025-12-18',
    nota: 'Quiere rediseño de logo y paleta de colores.'
  },
  {
    id: '3',
    nombre: 'Juan Valdés',
    empresa: 'Café Premium',
    email: 'juan@cafe.com',
    whatsapp: '573224445566',
    servicio: 'Social Media',
    estado: 'Propuesta',
    fecha: '2025-12-15',
    nota: 'Enviamos cotización de manejo de Instagram por 3 meses.'
  }
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(LEADS_INICIALES);
  const [filtro, setFiltro] = useState('Todos');

  const leadsFiltrados = filtro === 'Todos' 
    ? leads 
    : leads.filter(l => l.estado === filtro);

  // Colores por estado
  const getBadgeColor = (estado: string) => {
    switch (estado) {
      case 'Nuevo': return 'bg-blue-100 text-blue-600';
      case 'Contactado': return 'bg-amber-100 text-amber-600';
      case 'Propuesta': return 'bg-purple-100 text-purple-600';
      case 'Cerrado': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-montserrat text-[#0A1F33]">Gestión de Leads</h1>
          <p className="text-slate-500 text-sm">Controla el flujo de ventas de FJONIC Studio.</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
          {['Todos', 'Nuevo', 'Contactado', 'Propuesta'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filtro === f ? 'bg-[#0A1F33] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasa de Conversión</p>
          <p className="text-2xl font-black text-[#0A1F33] mt-1">24.5%</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads este mes</p>
          <p className="text-2xl font-black text-[#05ABCA] mt-1">{leads.length} prospectos</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiempo de respuesta</p>
          <p className="text-2xl font-black text-amber-500 mt-1">1.2 horas</p>
        </div>
      </div>

      {/* TABLA DE LEADS */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prospecto / Empresa</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Servicio</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leadsFiltrados.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-black text-[#0A1F33] text-sm">{lead.nombre}</p>
                    <p className="text-xs text-slate-400 font-medium">{lead.empresa}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                      {lead.servicio}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full ${getBadgeColor(lead.estado)}`}>
                      {lead.estado}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs text-slate-500 font-medium">
                    {new Date(lead.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={`https://wa.me/${lead.whatsapp}`} 
                        target="_blank"
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.4 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                      </a>
                      <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-[#0A1F33] hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {leadsFiltrados.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-slate-400 font-montserrat font-bold">No hay prospectos en este estado.</p>
          </div>
        )}
      </div>

    </div>
  );
}