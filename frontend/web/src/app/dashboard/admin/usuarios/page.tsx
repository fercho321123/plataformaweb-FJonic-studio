'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';// 👈 Asegúrate de que la ruta sea correcta
import { 
  FiUserPlus, 
  FiUsers, 
  FiTrash2, 
  FiMail, 
  FiLock,
  FiDollarSign,
  FiBriefcase,
  FiSearch,
  FiTrendingUp,
  FiAward
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

  // ✅ CORREGIDO: Endpoint '/usuarios/lista' según tu controlador
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

  // ✅ CORREGIDO: Uso de apiFetch con método DELETE
  const eliminarMiembro = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar a este miembro del equipo?')) return;

    try {
      await apiFetch(`/usuarios/${id}`, { method: 'DELETE' });
      setStaff((prevStaff) => prevStaff.filter(miembro => miembro.id !== id));
      setMensaje({ tipo: 'success', texto: 'Miembro eliminado correctamente' });
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  };

  // ✅ CORREGIDO: Uso de apiFetch con método POST
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

      setMensaje({ tipo: 'success', texto: `¡${data.nombre} registrado con éxito!` });
      setFormData({ nombre: '', email: '', password: '', especialidad: 'Diseñador Creativo', costoHora: '' }); 
      cargarStaff();

    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  // FILTRADO
  const staffFiltrado = staff.filter(miembro => {
    const nombre = miembro.nombre?.toLowerCase() || "";
    const email = miembro.email?.toLowerCase() || "";
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase()) || email.includes(busqueda.toLowerCase());
    const coincidenEspecialidad = filtroEspecialidad === 'todos' || miembro.especialidad === filtroEspecialidad;
    return coincideBusqueda && coincidenEspecialidad;
  });

  // ESTADÍSTICAS
  const costoTotalHora = staff.reduce((acc, m) => acc + (Number(m.costoHora) || 0), 0);
  const promedioHora = staff.length > 0 ? costoTotalHora / staff.length : 0;
  const especialidades = [...new Set(staff.map(m => m.especialidad))];

  const especialidadesConfig: any = {
    'Diseñador Creativo': { color: 'purple', icon: '🎨' },
    'Especialista en Anuncios': { color: 'blue', icon: '📊' },
    'Creador de Contenido': { color: 'amber', icon: '📝' },
    'Desarrollador Web': { color: 'emerald', icon: '💻' }
  };

  return (
    <div className="min-h-screen relative bg-[#0A1F33]">
      <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-8">
        
        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-12 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Gestión de Personal</h1>
                <p className="text-[#05ABCA]/60 text-sm font-medium">Administración del talento humano FJONIC</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#05ABCA]">{staff.length}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Miembros Activos</div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#05ABCA]/50 via-[#05ABCA]/20 to-transparent" />
        </header>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="w-12 h-12 rounded-xl bg-[#05ABCA] flex items-center justify-center mb-4 shadow-lg shadow-[#05ABCA]/20">
              <FiUsers className="text-white" size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase text-[#05ABCA] tracking-widest mb-2">Personal Total</p>
            <p className="text-3xl font-black text-white">{staff.length}</p>
            <p className="text-xs text-slate-400 mt-1">{especialidades.length} especialidades</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative bg-emerald-500/5 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              <FiDollarSign className="text-white" size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase text-emerald-400 tracking-widest mb-2">Costo/Hora Total</p>
            <p className="text-3xl font-black text-white">{formatoCOP.format(costoTotalHora)}</p>
            <p className="text-xs text-emerald-400 mt-1">Suma total del equipo</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative bg-amber-500/5 backdrop-blur-xl rounded-2xl border border-amber-500/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <FiTrendingUp className="text-white" size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase text-amber-400 tracking-widest mb-2">Promedio/Hora</p>
            <p className="text-3xl font-black text-white">{formatoCOP.format(promedioHora)}</p>
            <p className="text-xs text-amber-400 mt-1">Por colaborador</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* FORMULARIO */}
          <div className="xl:col-span-4">
            <div className="sticky top-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FiUserPlus className="text-[#05ABCA]" /> Nuevo Ingreso
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#05ABCA] uppercase">Nombre Completo</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all"
                      placeholder="Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#05ABCA] uppercase">Email Corporativo</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all"
                      placeholder="email@fjonic.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#05ABCA] uppercase">Contraseña</label>
                    <input required type="password" minLength={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all"
                      placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#05ABCA] uppercase">Especialidad</label>
                    <select className="w-full bg-[#0A1F33] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA]"
                      value={formData.especialidad} onChange={(e) => setFormData({...formData, especialidad: e.target.value})}>
                      <option value="Diseñador Creativo">Diseñador Creativo</option>
                      <option value="Especialista en Anuncios">Especialista en Anuncios</option>
                      <option value="Creador de Contenido">Creador de Contenido</option>
                      <option value="Desarrollador Web">Desarrollador Web</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#05ABCA] uppercase">Costo por Hora (COP)</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA]"
                      placeholder="50000" value={formData.costoHora} onChange={(e) => setFormData({...formData, costoHora: e.target.value})} />
                  </div>

                  {mensaje.texto && (
                    <div className={`p-4 rounded-xl text-xs font-bold text-center ${mensaje.tipo === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {mensaje.texto}
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
                    {loading ? 'Procesando...' : 'Confirmar Registro'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* LISTADO */}
          <div className="xl:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Buscar por nombre o email..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" />
              </div>
              <select value={filtroEspecialidad} onChange={(e) => setFiltroEspecialidad(e.target.value)}
                className="bg-[#0A1F33] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA]">
                <option value="todos">Todos los roles</option>
                {Object.keys(especialidadesConfig).map(esp => <option key={esp} value={esp}>{esp}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {staffFiltrado.map((miembro) => (
                  <motion.div key={miembro.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#05ABCA]/40 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center text-white font-black text-xl">
                        {miembro.nombre?.charAt(0)}
                      </div>
                      <button onClick={() => eliminarMiembro(miembro.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    <h4 className="font-bold text-white text-lg">{miembro.nombre}</h4>
                    <p className="text-slate-400 text-xs mb-3">{miembro.email}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-lg bg-[#05ABCA]/10 text-[#05ABCA] text-[10px] font-bold uppercase">
                        {miembro.especialidad}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Valor Hora</p>
                      <p className="text-white font-black">{formatoCOP.format(miembro.costoHora || 0)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}