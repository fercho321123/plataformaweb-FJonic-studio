'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
// Asegúrate de que la ruta a apiFetch sea la correcta según tu carpeta lib
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
  FiUser
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

  // 1. CARGAR CLIENTES (Sincronizado con Vercel)
  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await apiFetch('/clientes');
      setClientes(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la base de datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarClientes();
  }, [token]);

  // 2. GUARDAR NUEVO CLIENTE
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

  // 3. ELIMINAR CLIENTE
  const eliminarCliente = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente? Se borrará de forma permanente.')) return;
    
    try {
      await apiFetch(`/clientes/${id}`, { method: 'DELETE' });
      setClientes(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert(err.message || 'No se pudo eliminar el registro');
    }
  };

  const configuracionObjetivo: any = {
    'Ventas': { etiqueta: 'Ventas / ROAS', color: 'emerald' },
    'Leads': { etiqueta: 'Captación de Leads', color: 'blue' },
    'Branding': { etiqueta: 'Branding / Alcance', color: 'purple' },
    'Engagement': { etiqueta: 'Interacción Social', color: 'amber' }
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[1600px] mx-auto px-6 py-10">
        
        {/* HEADER FUTURISTA */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                  Directorio de Clientes
                </h1>
                <p className="text-[#05ABCA]/60 text-sm font-medium">
                  Gestión estratégica de cuentas - FJonic Studio
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-[#05ABCA]">{clientes.length}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Cuentas Activas</div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#05ABCA]/50 via-[#05ABCA]/20 to-transparent" />
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* FORMULARIO */}
          <section className="xl:col-span-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-6">
              <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden">
                <div className="p-6 border-b border-[#05ABCA]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
                      <FiUserPlus className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Nueva Cuenta</h2>
                      <p className="text-xs text-[#05ABCA]/60">Registro en sistema</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <form onSubmit={manejarEnvio} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2"><FiUser size={12} /> Nombre</label>
                      <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" placeholder="Juan Pérez..." value={datosFormulario.nombre} onChange={(e) => setDatosFormulario({...datosFormulario, nombre: e.target.value})} required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2"><FiMail size={12} /> Email</label>
                      <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" type="email" placeholder="correo@empresa.com" value={datosFormulario.email} onChange={(e) => setDatosFormulario({...datosFormulario, email: e.target.value})} required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2"><FiBriefcase size={12} /> Empresa</label>
                      <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" placeholder="Nombre comercial..." value={datosFormulario.empresa} onChange={(e) => setDatosFormulario({...datosFormulario, empresa: e.target.value})} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-1"><FiGlobe size={10} /> Web</label>
                        <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="sitio.com" value={datosFormulario.sitioWeb} onChange={(e) => setDatosFormulario({...datosFormulario, sitioWeb: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-1"><FiInstagram size={10} /> IG</label>
                        <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="@usuario" value={datosFormulario.instagram} onChange={(e) => setDatosFormulario({...datosFormulario, instagram: e.target.value})} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2"><FiTarget size={12} /> Objetivo</label>
                      <select className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] cursor-pointer" value={datosFormulario.objetivo} onChange={(e) => setDatosFormulario({...datosFormulario, objetivo: e.target.value})}>
                        <option value="Ventas" className="bg-[#0A1F33]">Ventas / ROAS</option>
                        <option value="Leads" className="bg-[#0A1F33]">Captación de Leads</option>
                        <option value="Branding" className="bg-[#0A1F33]">Branding / Alcance</option>
                        <option value="Engagement" className="bg-[#0A1F33]">Interacción Social</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2"><FiDollarSign size={12} /> Inversión</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA] font-bold">$</span>
                        <input className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-8 pr-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA]" type="number" placeholder="5000000" value={datosFormulario.presupuesto} onChange={(e) => setDatosFormulario({...datosFormulario, presupuesto: e.target.value})} />
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-[#05ABCA]/40 transition-all">
                      <FiCheck size={16} /> Registrar Cuenta
                    </button>
                    
                    {error && <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/30 p-3 rounded-lg">{error}</p>}
                  </form>
                </div>
              </div>
            </motion.div>
          </section>

          {/* LISTADO */}
          <section className="xl:col-span-8">
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {clientes.map((c, index) => {
                  const infoObjetivo = configuracionObjetivo[c.objetivo] || configuracionObjetivo['Ventas'];
                  return (
                    <motion.div key={c.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.05 }} className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 p-6 hover:border-[#05ABCA]/40 transition-all group">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-[#05ABCA]/30">
                            {c.empresa?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-xl mb-1">{c.empresa}</h3>
                            <p className="text-slate-300 text-sm">{c.nombre}</p>
                            <p className="text-slate-400 text-xs">{c.email}</p>
                          </div>
                        </div>
                        <button onClick={() => eliminarCliente(c.id)} className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><FiTrash2 size={16} /></button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#05ABCA]/10">
                        <div>
                          <div className="text-[10px] text-[#05ABCA] font-bold uppercase tracking-wider mb-1">Objetivo</div>
                          <p className="text-sm font-semibold text-white">{infoObjetivo.etiqueta}</p>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#05ABCA] font-bold uppercase tracking-wider mb-1">Inversión</div>
                          <p className="text-sm font-bold text-[#05ABCA]">${Number(c.presupuesto || 0).toLocaleString('es-CO')}</p>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#05ABCA] font-bold uppercase tracking-wider mb-1">Digital</div>
                          <div className="flex gap-2">
                            {c.sitioWeb && <span className="text-[10px] bg-[#05ABCA]/10 px-2 py-0.5 rounded border border-[#05ABCA]/20 text-white">WEB</span>}
                            {c.instagram && <span className="text-[10px] bg-[#05ABCA]/10 px-2 py-0.5 rounded border border-[#05ABCA]/20 text-white">IG</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {clientes.length === 0 && !cargando && (
              <div className="text-center py-32 bg-[#0d2640]/40 rounded-3xl border-2 border-dashed border-[#05ABCA]/20">
                <FiBriefcase className="text-[#05ABCA] mx-auto mb-4" size={36} />
                <p className="text-slate-400">Sin clientes registrados en FJonic Studio</p>
              </div>
            )}

            {cargando && (
              <div className="text-center py-32">
                <div className="w-10 h-10 border-4 border-t-[#05ABCA] rounded-full animate-spin mx-auto mb-4"></div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}