'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch } from '@/lib/api';

export default function ProyectosPage() {
  const { usuario, token } = useAuth();
  const router = useRouter();
  const esAdminOStaff = usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [proyectos, setProyectos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]); // Para el selector del formulario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para creación (Siguiendo la lógica de Clientes)
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [clienteId, setClienteId] = useState('');

  const cargarDatos = async () => {
    if (!usuario || !token) return;
    try {
      setLoading(true);
      // Cargar Proyectos
      const endpoint = usuario.rol === 'admin' ? '/proyectos' : '/proyectos/mis-proyectos';
      const dataProyectos = await apiFetch(endpoint);
      if (dataProyectos) {
        setProyectos(Array.isArray(dataProyectos) ? dataProyectos : []);
      }

      // Cargar Clientes (Solo si es admin/staff para el formulario)
      if (esAdminOStaff) {
        const dataClientes = await apiFetch('/clientes');
        if (dataClientes) setClientes(dataClientes);
      }
    } catch (err) {
      setError('Error al sincronizar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [usuario, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/proyectos', {
        method: 'POST',
        body: JSON.stringify({ 
          nombre, 
          descripcion, 
          clienteId: Number(clienteId),
          estado: 'Iniciado' // Valor por defecto
        }),
      });
      
      if (res) {
        setNombre(''); setDescripcion(''); setClienteId('');
        cargarDatos();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eliminarProyecto = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar este proyecto?')) return;
    try {
      await apiFetch(`/proyectos/${id}`, { method: 'DELETE' });
      setProyectos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('No se pudo eliminar el proyecto');
    }
  };

  if (loading && proyectos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#05ABCA] rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-black uppercase tracking-widest text-[10px]">Cargando Proyectos...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      {/* Cabecera Unificada */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-5xl font-black text-[#0A1F33] tracking-tight uppercase">
            {usuario?.rol === 'admin' ? 'Gestión de' : 'Mis'} <span className="text-[#05ABCA]">Proyectos</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium italic">
            {usuario?.rol === 'admin' ? 'Panel administrativo central' : `Bienvenido, ${usuario?.nombre}.`}
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Total Activos</span>
          <span className="text-2xl font-black text-[#0A1F33]">{proyectos.length}</span>
        </div>
      </header>

      {/* Formulario de Creación (Diseño idéntico al de Clientes pero con estilo Proyectos) */}
      {esAdminOStaff && (
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 max-w-4xl">
          <h2 className="text-lg font-bold text-[#0A1F33] mb-6 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#05ABCA] rounded-full"></span>
            Crear nuevo proyecto
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border-none bg-slate-50 p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-[#05ABCA] text-sm" placeholder="Nombre del Proyecto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <select className="border-none bg-slate-50 p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-[#05ABCA] text-sm" value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                <option value="">Seleccionar Cliente</option>
                {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} ({c.empresa})</option>)}
              </select>
            </div>
            <textarea className="w-full border-none bg-slate-50 p-4 rounded-xl text-black outline-none focus:ring-2 focus:ring-[#05ABCA] text-sm h-24" placeholder="Descripción técnica..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            <button className="bg-[#0A1F33] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#05ABCA] transition-all shadow-lg active:scale-95">
              Registrar Proyecto
            </button>
            {error && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">{error}</p>}
          </form>
        </section>
      )}

      {/* Listado de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {proyectos.length === 0 ? (
            <p className="text-slate-400 italic">No hay proyectos registrados.</p>
          ) : proyectos.map((p) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 bg-[#05ABCA]/10 text-[#05ABCA] text-[9px] font-black uppercase tracking-widest rounded-full">
                  {p.estado}
                </span>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-300 uppercase">Avance</p>
                  <p className="text-xl font-black text-[#0A1F33]">{p.progreso || 0}%</p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-[#0A1F33] leading-tight mb-2 group-hover:text-[#05ABCA] transition-colors uppercase tracking-tighter">
                {p.nombre}
              </h3>
              
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 italic font-medium">
                {p.descripcion || 'Sin descripción.'}
              </p>

              {/* Barra de progreso */}
              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden mb-8">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progreso || 0}%` }}
                  className="h-full bg-[#05ABCA] shadow-[0_0_8px_rgba(5,171,202,0.4)]"
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <button 
                  onClick={() => router.push(`/dashboard/proyectos/${p.id}/actualizaciones`)}
                  className="flex items-center gap-2 bg-[#0A1F33] hover:bg-[#05ABCA] text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                >
                  Bitácora
                </button>
                
                {esAdminOStaff && (
                  <button 
                    onClick={() => eliminarProyecto(p.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}