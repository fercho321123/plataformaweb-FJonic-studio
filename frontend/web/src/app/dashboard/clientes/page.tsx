'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api'; 
import { 
  FiUserPlus, 
  FiTrash2, 
  FiGlobe, 
  FiDollarSign, 
  FiTarget, 
  FiInstagram,
  FiBriefcase,
  FiCheck,
  FiMail,
  FiUser,
  FiShield,
  FiExternalLink
} from 'react-icons/fi';

export default function PaginaClientes() {
  const { token } = useAuth();
  
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    empresa: '',
    sitioWeb: '',
    presupuesto: '',
    objetivo: 'Ventas',
    instagram: ''
  });

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await apiFetch('/clientes');
      setClientes(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Error de enlace con el servidor');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarClientes();
  }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(datosFormulario),
      });
      setDatosFormulario({ 
        nombre: '', email: '', empresa: '', sitioWeb: '', 
        presupuesto: '', objetivo: 'Ventas', instagram: '' 
      });
      cargarClientes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eliminarCliente = async (id: string) => {
    if (!confirm('¿Eliminar cliente del registro central?')) return;
    try {
      await apiFetch(`/clientes/${id}`, { method: 'DELETE' });
      setClientes(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error en la purga de datos');
    }
  };

  const configuracionObjetivo: any = {
    'Ventas': { etiqueta: 'ROAS / Conversión', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    'Leads': { etiqueta: 'Captación Performance', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    'Branding': { etiqueta: 'Impacto de Marca', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    'Engagement': { etiqueta: 'Social Growth', color: 'text-amber-400', bg: 'bg-amber-500/10' }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-[#05ABCA]/30">
      
      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#05ABCA]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-12 relative z-10">
        
        {/* HEADER */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#05ABCA]/10 border border-[#05ABCA]/20 text-[#05ABCA] text-[10px] font-black uppercase tracking-[0.3em] rounded">Database_V.2</span>
                <div className="w-2 h-2 rounded-full bg-[#05ABCA] animate-pulse" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                Gestión de <span className="text-[#05ABCA]">Cuentas</span>
              </h1>
            </div>
            
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 backdrop-blur-md">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Partners activos</p>
                <p className="text-4xl font-black text-[#05ABCA] leading-none">{clientes.length}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#05ABCA]/10 flex items-center justify-center">
                <FiShield className="text-[#05ABCA] text-xl" />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          
          {/* PANEL DE REGISTRO */}
          <aside className="xl:col-span-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-10">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#05ABCA]/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[#05ABCA]/10 transition-all" />
                
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-lg shadow-[#05ABCA]/20">
                    <FiUserPlus className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tight">Alta de Cliente</h2>
                    <p className="text-[10px] text-[#05ABCA] font-bold uppercase tracking-widest">Protocolo de ingreso</p>
                  </div>
                </div>

                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest group-focus-within:text-[#05ABCA] transition-colors">Nombre de Enlace</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#05ABCA]/50 outline-none transition-all" placeholder="Ej: Alex Johnson" value={datosFormulario.nombre} onChange={(e) => setDatosFormulario({...datosFormulario, nombre: e.target.value})} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Identidad Corporativa</label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-[#05ABCA]/50 outline-none transition-all" placeholder="Nombre de la marca" value={datosFormulario.empresa} onChange={(e) => setDatosFormulario({...datosFormulario, empresa: e.target.value})} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Web</label>
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-xs text-white focus:border-[#05ABCA]/50 outline-none transition-all" placeholder="url.com" value={datosFormulario.sitioWeb} onChange={(e) => setDatosFormulario({...datosFormulario, sitioWeb: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">IG User</label>
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-4 text-xs text-white focus:border-[#05ABCA]/50 outline-none transition-all" placeholder="@handle" value={datosFormulario.instagram} onChange={(e) => setDatosFormulario({...datosFormulario, instagram: e.target.value})} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Foco Estratégico</label>
                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white outline-none cursor-pointer focus:border-[#05ABCA]/50" value={datosFormulario.objetivo} onChange={(e) => setDatosFormulario({...datosFormulario, objetivo: e.target.value})}>
                      <option value="Ventas" className="bg-[#020617]">Ventas / ROAS</option>
                      <option value="Leads" className="bg-[#020617]">Captación de Leads</option>
                      <option value="Branding" className="bg-[#020617]">Branding / Alcance</option>
                      <option value="Engagement" className="bg-[#020617]">Interacción Social</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Presupuesto ($)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA]" />
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#05ABCA]/50" type="number" placeholder="Ej: 2500000" value={datosFormulario.presupuesto} onChange={(e) => setDatosFormulario({...datosFormulario, presupuesto: e.target.value})} />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-[#05ABCA]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 italic">
                    <FiCheck size={18} /> Consolidar Registro
                  </button>
                  
                  {error && <p className="text-rose-500 text-[10px] font-black text-center uppercase tracking-widest animate-pulse">{error}</p>}
                </form>
              </div>
            </motion.div>
          </aside>

          {/* LISTADO DE CLIENTES */}
          <section className="xl:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-4 mb-2">
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Cuentas en el ecosistema</h2>
              <div className="h-px flex-1 mx-8 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {clientes.map((c, index) => {
                  const infoObjetivo = configuracionObjetivo[c.objetivo] || configuracionObjetivo['Ventas'];
                  return (
                    <motion.div 
                      key={c.id} 
                      layout 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, scale: 0.9 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="group relative bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#05ABCA]/30 rounded-[2.5rem] p-8 transition-all duration-500"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        {/* Avatar y Datos Base */}
                        <div className="flex items-center gap-6 flex-1">
                          <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] text-white flex items-center justify-center font-black text-3xl shadow-2xl group-hover:scale-105 transition-transform italic">
                            {c.empresa?.charAt(0) || 'C'}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-black text-white text-2xl tracking-tighter uppercase italic group-hover:text-[#05ABCA] transition-colors">{c.empresa}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{c.nombre}</span>
                              <div className="w-1 h-1 rounded-full bg-slate-600" />
                              <span className="text-slate-500 text-xs font-medium lowercase">{c.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stats en Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:border-l lg:border-white/5 lg:pl-10">
                          <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Estrategia</p>
                            <span className={`text-[11px] font-black uppercase tracking-tighter ${infoObjetivo.color}`}>
                              {infoObjetivo.etiqueta}
                            </span>
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Inversión</p>
                            <p className="text-sm font-black text-white italic">
                              ${Number(c.presupuesto || 0).toLocaleString('es-CO')}
                            </p>
                          </div>
                          <div className="col-span-2 md:col-span-1 flex items-center justify-end lg:justify-start gap-3">
                            {c.sitioWeb && (
                              <a href={`https://${c.sitioWeb}`} target="_blank" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-[#05ABCA] hover:bg-[#05ABCA]/10 transition-all border border-transparent hover:border-[#05ABCA]/20">
                                <FiGlobe size={16} />
                              </a>
                            )}
                            {c.instagram && (
                              <a href={`https://instagram.com/${c.instagram.replace('@','')}`} target="_blank" className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all border border-transparent hover:border-pink-500/20">
                                <FiInstagram size={16} />
                              </a>
                            )}
                            <button onClick={() => eliminarCliente(c.id)} className="w-9 h-9 rounded-xl bg-rose-500/5 flex items-center justify-center text-rose-500/30 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/30">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Barra decorativa inferior */}
                      <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#05ABCA]/10 to-transparent" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* EMPTY STATE */}
            {clientes.length === 0 && !cargando && (
              <div className="text-center py-40 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
                <div className="relative inline-block mb-6">
                  <FiBriefcase className="text-white/5" size={80} />
                  <FiExternalLink className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#05ABCA]/40" size={30} />
                </div>
                <p className="text-slate-500 font-black uppercase tracking-[0.3em] italic">No hay registros en la base central</p>
              </div>
            )}

            {/* LOADING */}
            {cargando && (
              <div className="text-center py-40">
                <div className="w-12 h-12 border-2 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[10px] font-black text-[#05ABCA] uppercase tracking-widest">Sincronizando Core...</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}