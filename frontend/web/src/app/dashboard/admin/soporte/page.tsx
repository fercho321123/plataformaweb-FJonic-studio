'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function AdminSoportePage() {
  const { usuario } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS PARA EL MODAL DE RESPUESTA ---
  const [modalAbierto, setModalAbierto] = useState(false);
  const [ticketSeleccionado, setTicketSeleccionado] = useState<any>(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);

  const cargarTickets = async () => {
    try {
      const data = await apiFetch('/soporte/admin/tickets');
      if (data) setTickets(data);
    } catch (e) {
      console.error("Error al cargar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuario?.rol === 'admin') cargarTickets();
  }, [usuario]);

  // Abre el modal y guarda el ticket que queremos responder
  const manejarAperturaModal = (ticket: any) => {
    setTicketSeleccionado(ticket);
    setMensajeRespuesta('');
    setModalAbierto(true);
  };

  const enviarRespuesta = async () => {
    if (!mensajeRespuesta.trim()) return alert("Por favor escribe una respuesta.");
    
    setEnviando(true);
    try {
      // Enviamos la respuesta al backend
      // El backend debe encargarse de crear la notificación para el usuario y borrar este ticket
      await apiFetch(`/soporte/admin/tickets/${ticketSeleccionado.id}/responder`, {
        method: 'POST',
        body: JSON.stringify({ mensaje: mensajeRespuesta })
      });

      alert(`Respuesta enviada a ${ticketSeleccionado.usuarioNombre}`);
      
      // Filtramos el ticket resuelto de la lista actual
      setTickets((prev: any[]) => prev.filter((t: any) => t.id !== ticketSeleccionado.id));
      setModalAbierto(false);
    } catch (e) {
      alert("Error al enviar la respuesta.");
    } finally {
      setEnviando(false);
    }
  };

  if (usuario?.rol !== 'admin') return <div className="p-20 text-center uppercase text-xs font-bold text-slate-400">Acceso Denegado</div>;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#0A1F33]">Panel de Soporte</h1>
          <p className="text-slate-400 text-sm italic">Responde a tus clientes directamente.</p>
        </div>
        <div className="bg-[#05ABCA]/10 text-[#05ABCA] px-4 py-1 rounded-full text-[10px] font-black uppercase">
          {tickets.length} Pendientes
        </div>
      </header>
      
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Detalles del Ticket</th>
              <th className="p-6 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tickets.map((t: any) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-[#05ABCA]/10 text-[#05ABCA] px-2 py-0.5 rounded uppercase">
                        {t.usuarioNombre || "Cliente"}
                      </span>
                      <span className="font-bold text-slate-700">{t.titulo}</span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2 italic">"{t.mensaje}"</p>
                    <span className="text-[10px] text-slate-300 font-bold mt-1">
                      {new Date(t.createdAt).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={() => manejarAperturaModal(t)}
                    className="bg-[#05ABCA] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-[#0A1F33] transition-all shadow-md shadow-[#05ABCA]/20 active:scale-95"
                  >
                    Responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!loading && tickets.length === 0 && (
          <div className="p-24 text-center">
            <p className="text-slate-300 font-black uppercase text-[10px] tracking-[0.2em]">Bandeja de entrada limpia</p>
          </div>
        )}
      </div>

      {/* ==========================================
          MODAL DE RESPUESTA 
      ========================================== */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-[#0A1F33]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-[#0A1F33] mb-2">Responder Ticket</h2>
            <p className="text-slate-400 text-sm mb-6">
              Enviando respuesta a: <span className="text-[#05ABCA] font-bold">{ticketSeleccionado?.usuarioNombre}</span>
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Consulta original:</p>
              <p className="text-xs text-slate-600 italic">"{ticketSeleccionado?.mensaje}"</p>
            </div>
            
            <textarea 
              autoFocus
              className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-sm focus:ring-2 focus:ring-[#05ABCA] outline-none min-h-[150px] transition-all"
              placeholder="Escribe la solución para el cliente..."
              value={mensajeRespuesta}
              onChange={(e) => setMensajeRespuesta(e.target.value)}
            />

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setModalAbierto(false)}
                className="flex-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase py-4 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                disabled={enviando}
                onClick={enviarRespuesta}
                className="flex-1 bg-[#0A1F33] text-white text-[10px] font-black uppercase py-4 rounded-2xl shadow-xl shadow-[#0A1F33]/20 hover:bg-[#05ABCA] transition-all active:scale-95 disabled:opacity-50"
              >
                {enviando ? 'Enviando...' : 'Enviar Solución'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}