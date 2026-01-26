'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiFetch } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, 
  FiDownload, 
  FiPlus, 
  FiUser, 
  FiCalendar,
  FiPackage,
  FiPrinter,
  FiLayers,
  FiHash
} from 'react-icons/fi';

interface ItemFactura {
  descripcion: string;
  cantidad: number;
  valor: number;
}

interface FacturaHistorial {
  id: string;
  numero: string;
  clienteNombre: string;
  fechaEmision: string;
  total: number;
  items: ItemFactura[];
}

export default function FacturacionPage() {
  const [cliente, setCliente] = useState({ nombre: '', nit: '', direccion: '', telefono: '' });
  const [invoice, setInvoice] = useState({ numero: '', fecha: new Date().toISOString().split('T')[0], vencimiento: '', ciudad: 'Ubaté' });
  const [items, setItems] = useState<ItemFactura[]>([{ descripcion: '', cantidad: 1, valor: 0 }]);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<FacturaHistorial[]>([]);

  const subtotal = items.reduce((acc, item) => acc + (item.cantidad * item.valor), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const data = await apiFetch('/facturacion');
        setHistorial(data);
      } catch (error) {
        console.error("Error cargando historial:", error);
      }
    };
    obtenerFacturas();
  }, []);

  const agregarItem = () => setItems([...items, { descripcion: '', cantidad: 1, valor: 0 }]);

  const guardarEnBD = async () => {
    const nuevaFactura = {
      clienteNombre: cliente.nombre || 'Cliente General',
      clienteNit: cliente.nit || '---',
      total: total,
      items: items
    };

    try {
      const guardada = await apiFetch('/facturacion', {
        method: 'POST',
        body: JSON.stringify(nuevaFactura),
      });
      
      if (guardada) {
        setHistorial([guardada, ...historial]);
        return guardada;
      }
    } catch (error) {
      console.error("Error al guardar en BD:", error);
    }
    return null;
  };

  const generarPDF = async (datosDesdeHistorial: FacturaHistorial | null = null) => {
    setLoading(true);
    let facturaFinal = datosDesdeHistorial;

    if (!datosDesdeHistorial) {
      facturaFinal = await guardarEnBD();
      if (!facturaFinal) {
        setLoading(false);
        return alert("Error al generar el número de factura.");
      }
    }

    const dClienteNombre = facturaFinal ? facturaFinal.clienteNombre : cliente.nombre;
    const dInvoice = facturaFinal ? { numero: facturaFinal.numero, fecha: facturaFinal.fechaEmision } : invoice;
    const dItems = facturaFinal ? facturaFinal.items : items;
    const dTotal = facturaFinal ? facturaFinal.total : total;
    const dSubtotal = dTotal / 1.19;
    const dIva = dTotal - dSubtotal;

    const doc = new jsPDF('p', 'mm', 'a4');
    const azulFjonic = [10, 31, 51];
    const cyanFjonic = [5, 171, 202];

    try { doc.addImage('/logos/logonegro.png', 'PNG', 15, 10, 60, 20); } catch (e) {}

    doc.setTextColor(0).setFontSize(8).setFont("helvetica", "bold").text("FJONIC STUDIO", 195, 15, { align: "right" });
    doc.setFont("helvetica", "normal").text("NIT: 1.003.924.724", 195, 19, { align: "right" });
    doc.setDrawColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]).setLineWidth(0.8).line(15, 35, 195, 35);
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFontSize(22).setFont("helvetica", "bold").text("FACTURA", 105, 52, { align: "center" });

    doc.setFontSize(9).text("DETALLES", 15, 65);
    doc.setTextColor(0).setFont("helvetica", "normal").text(`Número: ${dInvoice.numero || '---'}`, 15, 71);
    doc.text(`Fecha: ${new Date(dInvoice.fecha).toLocaleDateString()}`, 15, 76);

    doc.setFillColor(245, 247, 249).roundedRect(110, 65, 85, 20, 1, 1, 'F');
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFont("helvetica", "bold").text("CLIENTE", 115, 71);
    doc.setTextColor(0).setFontSize(8.5).text((dClienteNombre || 'CLIENTE GENERAL').toUpperCase(), 115, 77);

    let yStart = 95;
    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).rect(15, yStart, 180, 8, 'F');
    doc.setTextColor(255).text("DESCRIPCIÓN", 20, yStart + 5.5);
    doc.text("CANT.", 145, yStart + 5.5, { align: "center" });
    doc.text("TOTAL", 190, yStart + 5.5, { align: "right" });

    let yRow = yStart + 8;
    doc.setFont("helvetica", "normal").setTextColor(0);
    dItems.forEach((item) => {
      doc.text((item.descripcion || 'Servicio').toUpperCase(), 20, yRow + 6);
      doc.text(item.cantidad.toString(), 145, yRow + 6, { align: "center" });
      doc.text(`$${(item.cantidad * item.valor).toLocaleString()}`, 190, yRow + 6, { align: "right" });
      yRow += 10;
    });

    doc.setFont("helvetica", "bold").text("TOTAL A PAGAR:", 130, yRow + 10);
    doc.text(`$${dTotal.toLocaleString()}`, 195, yRow + 10, { align: "right" });

    doc.save(`Factura_${dInvoice.numero || 'FJONIC'}.pdf`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        
        {/* HEADER LIMPIO */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <FiPrinter className="text-slate-500" /> Facturación
            </h1>
            <p className="text-slate-500 text-sm mt-1">Gestión profesional de servicios FJonic</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Ambiente de producción</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* EDITOR DE FACTURA */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <FiFileText className="text-[#05ABCA]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Borrador de Factura</span>
                </div>
                <input 
                  type="date" 
                  value={invoice.fecha} 
                  onChange={e => setInvoice({...invoice, fecha: e.target.value})}
                  className="bg-transparent text-xs font-mono text-slate-400 outline-none border border-white/10 rounded-lg px-3 py-1"
                />
              </div>

              <div className="p-8 space-y-8">
                {/* CLIENTE INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cliente</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input 
                        placeholder="Nombre o Razón Social" 
                        onChange={e => setCliente({...cliente, nombre: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-[#05ABCA]/40 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">NIT / CC</label>
                    <div className="relative">
                      <FiHash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input 
                        placeholder="000.000.000-0" 
                        onChange={e => setCliente({...cliente, nit: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-[#05ABCA]/40 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* ITEMS LIST */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Servicios / Conceptos</span>
                    <button onClick={agregarItem} className="text-[#05ABCA] text-[10px] font-black uppercase tracking-tighter hover:underline">+ Agregar</button>
                  </div>
                  
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-center bg-white/[0.01] p-2 rounded-xl border border-white/5">
                        <input 
                          className="col-span-7 bg-transparent px-3 py-2 text-sm text-white outline-none" 
                          placeholder="Descripción del servicio..." 
                          onChange={(e) => { const n = [...items]; n[index].descripcion = e.target.value; setItems(n); }} 
                        />
                        <input 
                          type="number" 
                          className="col-span-2 bg-white/5 border border-white/10 rounded-lg py-2 text-center text-xs text-white outline-none" 
                          value={item.cantidad} 
                          onChange={(e) => { const n = [...items]; n[index].cantidad = Number(e.target.value); setItems(n); }} 
                        />
                        <input 
                          type="number" 
                          className="col-span-3 bg-white/5 border border-white/10 rounded-lg py-2 pr-3 text-right text-xs text-white outline-none" 
                          placeholder="Valor" 
                          onChange={(e) => { const n = [...items]; n[index].valor = Number(e.target.value); setItems(n); }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* TOTALES Y ACCIONES */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-[2rem] p-8 backdrop-blur-md">
              <h3 className="text-xs font-bold text-[#05ABCA] uppercase tracking-widest mb-6">Resumen Fiscal</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">IVA (19%)</span>
                  <span className="text-white font-mono">${iva.toLocaleString()}</span>
                </div>
                <div className="h-px bg-white/5 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-[#05ABCA] uppercase tracking-widest">Total Neto</span>
                  <span className="text-3xl font-bold text-white tracking-tighter">${total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => generarPDF()} 
                disabled={loading}
                className="w-full mt-8 bg-white text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#05ABCA] hover:text-white transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'Procesando...' : <><FiDownload /> Generar Factura</>}
              </button>
            </div>

            {/* MINI HISTORIAL */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6">
              <div className="flex items-center gap-2 mb-4">
                <FiLayers className="text-slate-600" size={14} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Últimos Registros</span>
              </div>
              <div className="space-y-3">
                {historial.slice(0, 3).map(f => (
                  <div key={f.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <p className="text-[10px] font-bold text-white truncate w-32">{f.clienteNombre}</p>
                      <p className="text-[9px] text-slate-500 font-mono">{f.numero}</p>
                    </div>
                    <button onClick={() => generarPDF(f)} className="p-2 text-slate-400 hover:text-[#05ABCA]">
                      <FiDownload size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}