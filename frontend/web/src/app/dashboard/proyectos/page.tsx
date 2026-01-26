'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import {
  FiPlus, FiTrash2, FiCalendar, FiUser, FiDollarSign, 
  FiLayers, FiCheckCircle, FiZap, FiTag, FiCreditCard
} from 'react-icons/fi';

export default function PaginaProyectos() {
  const { token } = useAuth();
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [datosForm, setDatosForm] = useState({
    nombre: '', clienteId: '', tipo: 'Marketing Digital',
    prioridad: 'Media', liderProyecto: '', fechaEntrega: '',
    presupuestoTotal: '', descripcion: '', estadoPago: 'Pendiente'
  });

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [dataProyectos, dataClientes] = await Promise.all([
        apiFetch('/proyectos'),
        apiFetch('/clientes')
      ]);
      setProyectos(Array.isArray(dataProyectos) ? dataProyectos : []);
      setClientes(Array.isArray(dataClientes) ? dataClientes : []);
    } catch (err: any) {
      setError('Error de sincronización');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) cargarTodo();
  }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch('/proyectos', {
        method: 'POST',
        body: JSON.stringify(datosForm),
      });
      setDatosForm({
        nombre: '', clienteId: '', tipo: 'Marketing Digital',
        prioridad: 'Media', liderProyecto: '', fechaEntrega: '',
        presupuestoTotal: '', descripcion: '', estadoPago: 'Pendiente'
      });
      cargarTodo();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // --- FUNCIÓN DE ELIMINAR BLINDADA ---
  const eliminarProyecto = async (idOriginal: any) => {
    // 1. Extraer el valor real y convertirlo a string limpio
    const idLimpio = idOriginal?.toString().trim();

    // 2. Validación: Ahora solo verificamos que el ID NO esté vacío.
    // Quitamos la validación isNaN porque tus IDs son UUIDs (tienen letras).
    if (!idLimpio) {
      console.error("ID NO VÁLIDO DETECTADO:", idOriginal);
      alert("Error: No se pudo encontrar el identificador del proyecto.");
      return;
    }

    if (!confirm('¿Eliminar proyecto permanentemente?')) return;
    
    try {
      // 3. Enviamos la petición al backend (que ya debería aceptar strings)
      await apiFetch(`/proyectos/${idLimpio}`, { method: 'DELETE' });
      
      // 4. Actualizamos la interfaz eliminando el proyecto del estado
      setProyectos(prev => prev.filter(p => {
        const pId = (p.id || p._id)?.toString();
        return pId !== idLimpio;
      }));

    } catch (err: any) {
      // Si el backend aún tiene el ParseIntPipe, el error saldrá aquí.
      alert(`Error del servidor: ${err.message}`);
    }
  };

  const obtenerNombreCliente = (clienteId: any) => {
    const idBuscado = clienteId?.toString();
    const cliente = clientes.find(c => (c.id?.toString() || c._id?.toString()) === idBuscado);
    return cliente?.empresa || 'Sin cliente';
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 p-6">
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* FORMULARIO */}
        <aside className="xl:col-span-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sticky top-6">
            <h2 className="text-white font-black mb-6 uppercase italic">Nueva Misión</h2>
            <form onSubmit={manejarEnvio} className="space-y-4">
              <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#05ABCA]" placeholder="Nombre Proyecto" value={datosForm.nombre} onChange={(e) => setDatosForm({...datosForm, nombre: e.target.value})} required />
              
              <select className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white outline-none" value={datosForm.clienteId} onChange={(e) => setDatosForm({...datosForm, clienteId: e.target.value})} required>
                <option value="" className="bg-[#020617]">Seleccionar Cliente</option>
                {clientes.map(c => <option key={c.id || c._id} value={c.id || c._id} className="bg-[#020617]">{c.empresa}</option>)}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white" placeholder="Líder" value={datosForm.liderProyecto} onChange={(e) => setDatosForm({...datosForm, liderProyecto: e.target.value})} required />
                <input type="date" className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white" value={datosForm.fechaEntrega} onChange={(e) => setDatosForm({...datosForm, fechaEntrega: e.target.value})} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white" placeholder="Presupuesto" value={datosForm.presupuestoTotal} onChange={(e) => setDatosForm({...datosForm, presupuestoTotal: e.target.value})} required />
                <select className="bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white" value={datosForm.prioridad} onChange={(e) => setDatosForm({...datosForm, prioridad: e.target.value})}>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-sm text-white h-20" placeholder="Descripción" value={datosForm.descripcion} onChange={(e) => setDatosForm({...datosForm, descripcion: e.target.value})} required />

              <button type="submit" className="w-full bg-[#05ABCA] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#1C75BC] transition-all">
                <FiZap className="inline mr-2" /> Iniciar
              </button>
            </form>
          </div>
        </aside>

        {/* LISTADO */}
        <section className="xl:col-span-8 space-y-4">
          <AnimatePresence>
            {proyectos.map((p) => (
              <motion.div key={p.id || p._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex justify-between items-center group">
                <div>
                  <h3 className="text-white font-bold uppercase italic">{p.nombre}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{obtenerNombreCliente(p.clienteId)} | {p.tipo}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-right mr-4">
                      <p className="text-[10px] text-slate-500 uppercase">Inversión</p>
                      <p className="text-sm text-white font-black">${Number(p.presupuestoTotal).toLocaleString()}</p>
                   </div>
                   {/* EL BOTÓN IMPORTANTE: Le pasamos el ID directamente */}
                   <button 
                    onClick={() => eliminarProyecto(p.id || p._id)} 
                    className="p-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                   >
                    <FiTrash2 size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}