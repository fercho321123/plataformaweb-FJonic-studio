'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext'; // Importamos tu hook de auth

export default function RegistroStaffPage() {
  // Extraemos el token directamente del contexto global
  const { token } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      // Usamos el puerto 3001 según tu main.ts
      const response = await fetch('http://localhost:3001/usuarios/crear-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Enviamos el token que extrajimos de useAuth()
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejo específico para el 401
        if (response.status === 401) {
          throw new Error('No tienes permisos o tu sesión expiró. Reingresa al sistema.');
        }
        throw new Error(data.message || 'Error al crear empleado');
      }

      setMensaje({ 
        tipo: 'success', 
        texto: `¡Cuenta de ${data.nombre} creada con éxito!` 
      });
      
      setFormData({ nombre: '', email: '', password: '' }); 

    } catch (error: any) {
      setMensaje({ 
        tipo: 'error', 
        texto: error.message || 'Error de conexión con el servidor' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 font-open-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-black font-montserrat text-[#0D3A66]">
          Gestión de Usuarios
        </h1>
        <p className="text-slate-500 mt-2">
          Registrar nuevo personal para <span className="text-[#05ABCA] font-bold">FJONIC Studio</span>.
        </p>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-blue-900/5 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                <input
                  required
                  type="text"
                  placeholder="Nombre del empleado"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#05ABCA] focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-black"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Corporativo</label>
                <input
                  required
                  type="email"
                  placeholder="empleado@fjonic.com"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#05ABCA] focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-black"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contraseña Temporal</label>
              <input
                required
                type="password"
                placeholder="Asigna una clave segura"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#05ABCA] focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-black"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {mensaje.texto && (
              <div className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 ${
                mensaje.tipo === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {mensaje.texto}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#0D3A66] hover:bg-[#05ABCA] text-white rounded-2xl font-black transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Registrar Empleado Staff'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}