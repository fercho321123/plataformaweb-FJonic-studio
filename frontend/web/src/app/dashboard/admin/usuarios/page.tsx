'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { 
  FiUserPlus, 
  FiUsers, 
  FiTrash2, 
  FiDollarSign,
  FiSearch,
  FiTrendingUp,
  FiActivity,
  FiShield,
  FiLayers
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegistroStaffPage() {
  const { token } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    especialidad: 'Diseñador Creativo',
    costoHora: '',
  });

  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [busqueda, setBusqueda] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('todos');

  const formatoCOP = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  });

  const cargarStaff = async () => {
    try {
      const data = await apiFetch('/usuarios/lista');
      if (data) setStaff(data);
    } catch (error) {
      console.error("Error cargando personal", error);
    }
  };

  useEffect(() => {
    if (token) cargarStaff();
  }, [token]);

  const eliminarMiembro = async (id: string) => {
    if (!confirm('¿Desvincular este activo del sistema? Esta acción es irreversible.')) return;

    try {
      await apiFetch(`/usuarios/${id}`, { method: 'DELETE' });
      setStaff((prevStaff) => prevStaff.filter(miembro => miembro.id !== id));
      setMensaje({ tipo: 'success', texto: 'Activo desvinculado con éxito' });
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      const data = await apiFetch('/usuarios/crear-staff', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          costoHora: Number(formData.costoHora)
        }),
      });

      setMensaje({ tipo: 'success', texto: `¡Agente ${data.nombre} activado!` });
      setFormData({ nombre: '', email: '', password: '', especialidad: 'Diseñador Creativo', costoHora: '' }); 
      cargarStaff();
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  const staffFiltrado = staff.filter(miembro => {
    const nombre = miembro.nombre?.toLowerCase() || "";
    const email = miembro.email?.toLowerCase() || "";
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase()) || email.includes(busqueda.toLowerCase());
    const coincidenEspecialidad = filtroEspecialidad === 'todos' || miembro.especialidad === filtroEspecialidad;
    return coincideBusqueda && coincidenEspecialidad;
  });

  const costoTotalHora = staff.reduce((acc, m) => acc + (Number(m.costoHora) || 0), 0);
  const promedioHora = staff.length > 0 ? costoTotalHora / staff.length : 0;

  const especialidadesConfig: any = {
    'Diseñador Creativo': '🎨',
    'Especialista en Anuncios': '📊',
    'Creador de Contenido': '📝',
    'Desarrollador Web': '💻'
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <div className="max-w-[1600px] mx-auto px-8 py-12 space-y-12 relative overflow-hidden">
        
        {/* EFECTO DE LUZ DE FONDO */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#05ABCA]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HEADER TÁCTICO */}
        <header className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-1.5 h-16 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full shadow-[0_0_15px_rgba(5,171,202,0.5)]" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiShield className="text-[#05ABCA] text-xs" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#05ABCA]/60">Staff Management System</span>
                </div>
                <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                  Agentes <span className="text-[#05ABCA]">Fjonic</span>
                </h1>
              </div>
            </div>
            <div className="bg-[#0d2640] border border-[#05ABCA]/20 px-8 py-4 rounded-[2rem] text-center min-w-[200px]">
              <div className="text-4xl font-black text-white italic">{staff.length}</div>
              <div className="text-[9px] font-black text-[#05ABCA] uppercase tracking-widest mt-1">Activos en Red</div>
            </div>
          </div>
        </header>

        {/* DASHBOARD DE MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Fuerza Laboral', val: staff.length, icon: FiUsers, sub: 'Miembros operativos', color: 'blue' },
            { label: 'Costo Operativo/H', val: formatoCOP.format(costoTotalHora), icon: FiDollarSign, sub: 'Inversión total', color: 'emerald' },
            { label: 'Eficiencia Media', val: formatoCOP.format(promedioHora), icon: FiTrendingUp, sub: 'Promedio por agente', color: 'amber' }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group hover:border-[#05ABCA]/30 transition-all">
              <item.icon className="absolute right-8 top-8 text-white/5 text-6xl group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">{item.label}</p>
              <p className="text-3xl font-black text-white italic mb-1">{item.val}</p>
              <p className="text-[10px] font-bold text-[#05ABCA] uppercase">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10">
          
          {/* TERMINAL DE REGISTRO */}
          <div className="xl:col-span-4">
            <div className="sticky top-12 bg-[#0d2640]/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-lg shadow-[#05ABCA]/20">
                  <FiUserPlus className="text-white text-xl" />
                </div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Reclutamiento</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Nombre del Agente</label>
                  <input required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#05ABCA]/50 outline-none transition-all"
                    placeholder="Escriba el nombre completo..." value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Credenciales (Email)</label>
                  <input required type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#05ABCA]/50 outline-none"
                    placeholder="agente@fjonic.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Código de Acceso</label>
                  <input required type="password" minLength={6} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:border-[#05ABCA]/50 outline-none"
                    placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">Especialización</label>
                    <select className="w-full bg-[#0d2640] border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white outline-none focus:border-[#05ABCA]/50 appearance-none"
                      value={formData.especialidad} onChange={(e) => setFormData({...formData, especialidad: e.target.value})}>
                      {Object.keys(especialidadesConfig).map(esp => <option key={esp} value={esp}>{esp}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest text-[#05ABCA]">Costo por Hora (COP)</label>
                    <input required type="number" className="w-full bg-white/[0.05] border border-[#05ABCA]/20 rounded-2xl py-4 px-6 text-lg font-black text-white focus:border-[#05ABCA] outline-none"
                      placeholder="50000" value={formData.costoHora} onChange={(e) => setFormData({...formData, costoHora: e.target.value})} />
                  </div>
                </div>

                <AnimatePresence>
                  {mensaje.texto && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className={`p-4 rounded-2xl text-[10px] font-black text-center uppercase tracking-widest border ${mensaje.tipo === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                      {mensaje.texto}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" disabled={loading} className="w-full bg-[#05ABCA] text-[#020617] py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#05ABCA]/20 italic disabled:opacity-50">
                  {loading ? 'Sincronizando...' : 'Confirmar Alta de Agente'}
                </button>
              </form>
            </div>
          </div>

          {/* LISTADO DE PERSONAL */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* BUSCADOR INTELIGENTE */}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 relative group">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#05ABCA] transition-colors" size={20} />
                <input type="text" placeholder="Localizar agente por nombre o email..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm text-white focus:border-[#05ABCA]/30 outline-none transition-all" />
              </div>
              <div className="flex items-center bg-white/[0.02] border border-white/5 rounded-2xl px-4">
                <FiLayers className="text-[#05ABCA] mr-3" />
                <select value={filtroEspecialidad} onChange={(e) => setFiltroEspecialidad(e.target.value)}
                  className="bg-transparent py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest outline-none cursor-pointer">
                  <option value="todos">Todos los roles</option>
                  {Object.keys(especialidadesConfig).map(esp => <option key={esp} value={esp}>{esp}</option>)}
                </select>
              </div>
            </div>

            {/* GRID DE AGENTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {staffFiltrado.map((miembro) => (
                  <motion.div key={miembro.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.03] hover:border-[#05ABCA]/30 transition-all group relative overflow-hidden">
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center text-white font-black text-2xl italic shadow-lg shadow-[#05ABCA]/20">
                        {miembro.nombre?.charAt(0)}
                      </div>
                      <button onClick={() => eliminarMiembro(miembro.id)} 
                        className="p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all">
                        <FiTrash2 size={20} />
                      </button>
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-black text-white text-xl uppercase italic tracking-tighter mb-1">{miembro.nombre}</h4>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">{miembro.email}</p>
                      
                      <div className="flex items-center gap-2 mb-8">
                        <span className="text-lg">{especialidadesConfig[miembro.especialidad] || '👤'}</span>
                        <span className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-[#05ABCA] uppercase tracking-widest">
                          {miembro.especialidad}
                        </span>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                        <div>
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Costo por Hora</p>
                          <p className="text-2xl font-black text-white italic tracking-tighter">{formatoCOP.format(miembro.costoHora || 0)}</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg">
                          <FiActivity size={10} />
                          <span className="text-[9px] font-black uppercase">Online</span>
                        </div>
                      </div>
                    </div>

                    {/* DECO WATERMARK */}
                    <div className="absolute -bottom-6 -right-6 text-white/[0.02] font-black text-8xl italic pointer-events-none select-none">
                      FJ
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {staffFiltrado.length === 0 && (
              <div className="py-40 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem]">
                <FiUsers className="mx-auto text-white/5 mb-6" size={60} />
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">No se detectaron agentes en el sector</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}