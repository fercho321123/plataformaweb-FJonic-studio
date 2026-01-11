'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
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

  // CARGAR CLIENTES DESDE LA BASE DE DATOS
  const cargarClientes = async () => {
    try {
      setCargando(true);
      const res = await fetch('http://localhost:3001/clientes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setClientes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setError('Error al conectar con la base de datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarClientes();
  }, [token]);

  // GUARDAR NUEVO CLIENTE
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosFormulario),
      });

      if (res.ok) {
        setDatosFormulario({ 
          nombre: '', email: '', empresa: '', sitioWeb: '', 
          presupuesto: '', objetivo: 'Ventas', instagram: '' 
        });
        cargarClientes();
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Error al guardar el cliente');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ELIMINAR CLIENTE
  const eliminarCliente = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cliente? Se borrará de forma permanente.')) return;
    
    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setClientes(prev => prev.filter(c => c.id !== id));
      } else {
        alert('No se pudo eliminar el registro en el servidor');
      }
    } catch (err) {
      alert('Error de conexión al intentar eliminar');
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
                  Gestión estratégica de cuentas
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
          
          {/* FORMULARIO FUTURISTA */}
          <section className="xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-6"
            >
              <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden">
                
                {/* GLOW TOP */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
                
                {/* HEADER */}
                <div className="relative p-6 border-b border-[#05ABCA]/10">
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

                {/* FORMULARIO */}
                <div className="p-6">
                  <div className="space-y-5">
                    
                    {/* Nombre */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                        <FiUser size={12} />
                        Nombre del Contacto
                      </label>
                      <input 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all" 
                        placeholder="Juan Pérez..." 
                        value={datosFormulario.nombre} 
                        onChange={(e) => setDatosFormulario({...datosFormulario, nombre: e.target.value})} 
                        required 
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                        <FiMail size={12} />
                        Correo Electrónico
                      </label>
                      <input 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all" 
                        placeholder="correo@empresa.com" 
                        type="email" 
                        value={datosFormulario.email} 
                        onChange={(e) => setDatosFormulario({...datosFormulario, email: e.target.value})} 
                        required 
                      />
                    </div>

                    {/* Empresa */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                        <FiBriefcase size={12} />
                        Marca o Empresa
                      </label>
                      <input 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all" 
                        placeholder="Nombre comercial..." 
                        value={datosFormulario.empresa} 
                        onChange={(e) => setDatosFormulario({...datosFormulario, empresa: e.target.value})} 
                        required 
                      />
                    </div>

                    {/* Web + Instagram */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-1">
                          <FiGlobe size={10} />
                          Web
                        </label>
                        <input 
                          className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all" 
                          placeholder="sitio.com" 
                          value={datosFormulario.sitioWeb} 
                          onChange={(e) => setDatosFormulario({...datosFormulario, sitioWeb: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-1">
                          <FiInstagram size={10} />
                          Instagram
                        </label>
                        <input 
                          className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-3 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all" 
                          placeholder="@usuario" 
                          value={datosFormulario.instagram} 
                          onChange={(e) => setDatosFormulario({...datosFormulario, instagram: e.target.value})} 
                        />
                      </div>
                    </div>

                    {/* Objetivo */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                        <FiTarget size={12} />
                        Objetivo Estratégico
                      </label>
                      <select 
                        className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all cursor-pointer" 
                        value={datosFormulario.objetivo} 
                        onChange={(e) => setDatosFormulario({...datosFormulario, objetivo: e.target.value})}
                      >
                        <option value="Ventas" className="bg-[#0A1F33]">Ventas / ROAS</option>
                        <option value="Leads" className="bg-[#0A1F33]">Captación de Leads</option>
                        <option value="Branding" className="bg-[#0A1F33]">Branding / Alcance</option>
                        <option value="Engagement" className="bg-[#0A1F33]">Interacción Social</option>
                      </select>
                    </div>

                    {/* Presupuesto */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                        <FiDollarSign size={12} />
                        Inversión Mensual
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#05ABCA] font-bold">$</span>
                        <input 
                          className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all" 
                          type="number" 
                          placeholder="5000000" 
                          value={datosFormulario.presupuesto} 
                          onChange={(e) => setDatosFormulario({...datosFormulario, presupuesto: e.target.value})} 
                        />
                      </div>
                    </div>

                    {/* Botón Submit */}
                    <button 
                      type="button"
                      onClick={manejarEnvio}
                      className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#05ABCA]/20 hover:shadow-[#05ABCA]/40 transition-all"
                    >
                      <FiCheck size={16} />
                      Registrar en Sistema
                    </button>
                    
                    {error && (
                      <p className="text-red-400 text-xs font-medium text-center bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                        {error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* GRID DE CLIENTES */}
          <section className="xl:col-span-8">
            <div className="grid grid-cols-1 gap-6">
              <AnimatePresence mode="popLayout">
                {clientes.map((c, index) => {
                  const infoObjetivo = configuracionObjetivo[c.objetivo] || configuracionObjetivo['Ventas'];
                  
                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden hover:border-[#05ABCA]/40 transition-all group"
                    >
                      {/* GLOW TOP */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                          
                          {/* INFO PRINCIPAL */}
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] text-white flex items-center justify-center font-bold text-2xl uppercase shadow-lg shadow-[#05ABCA]/30 flex-shrink-0">
                              {c.empresa?.charAt(0) || 'C'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-white text-xl mb-1 truncate">
                                {c.empresa}
                              </h3>
                              <p className="text-slate-300 text-sm font-medium truncate">
                                {c.nombre}
                              </p>
                              <p className="text-slate-400 text-xs mt-1 truncate">
                                {c.email}
                              </p>
                            </div>
                          </div>

                          {/* BOTÓN ELIMINAR */}
                          <button 
                            onClick={() => eliminarCliente(c.id)} 
                            className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>

                        {/* DETALLES */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#05ABCA]/10">
                          
                          {/* Objetivo */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-[#05ABCA] font-semibold uppercase tracking-wider">
                              <FiTarget size={12} />
                              Objetivo
                            </div>
                            <p className="text-sm font-semibold text-white">
                              {infoObjetivo.etiqueta}
                            </p>
                          </div>

                          {/* Presupuesto */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-[#05ABCA] font-semibold uppercase tracking-wider">
                              <FiDollarSign size={12} />
                              Inversión
                            </div>
                            <p className="text-sm font-bold text-[#05ABCA]">
                              ${Number(c.presupuesto || 0).toLocaleString('es-CO')}
                            </p>
                          </div>

                          {/* Redes */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-[#05ABCA] font-semibold uppercase tracking-wider">
                              <FiGlobe size={12} />
                              Digital
                            </div>
                            <div className="flex items-center gap-2">
                              {c.sitioWeb && (
                                <span className="text-xs text-slate-300 bg-[#05ABCA]/10 px-2 py-1 rounded-md border border-[#05ABCA]/20">
                                  Web
                                </span>
                              )}
                              {c.instagram && (
                                <span className="text-xs text-slate-300 bg-[#05ABCA]/10 px-2 py-1 rounded-md border border-[#05ABCA]/20">
                                  IG
                                </span>
                              )}
                              {!c.sitioWeb && !c.instagram && (
                                <span className="text-xs text-slate-500">—</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* EMPTY STATE */}
            {clientes.length === 0 && !cargando && (
              <div className="text-center py-32 bg-gradient-to-br from-[#0d2640]/40 to-[#0A1F33]/40 backdrop-blur-xl rounded-3xl border-2 border-dashed border-[#05ABCA]/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#05ABCA]/20 to-[#1C75BC]/20 border border-[#05ABCA]/30 flex items-center justify-center mx-auto mb-6"
                >
                  <FiBriefcase className="text-[#05ABCA]" size={36} />
                </motion.div>
                <p className="text-slate-400 font-medium text-lg mb-2">
                  Sin clientes registrados
                </p>
                <p className="text-slate-500 text-sm">
                  Comienza agregando tu primera cuenta
                </p>
              </div>
            )}

            {/* LOADING STATE */}
            {cargando && (
              <div className="text-center py-32">
                <div className="w-12 h-12 border-4 border-[#05ABCA]/20 border-t-[#05ABCA] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-400 text-sm">Cargando clientes...</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}