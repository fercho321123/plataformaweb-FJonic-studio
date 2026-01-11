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
  FiDollarSign,
  FiPackage,
  FiCheckCircle
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
        return alert("Error al generar el número de factura en el servidor.");
      }
    }

    const dClienteNombre = facturaFinal ? facturaFinal.clienteNombre : cliente.nombre;
    const dInvoice = facturaFinal ? { numero: facturaFinal.numero, fecha: facturaFinal.fechaEmision } : invoice;
    const dItems = facturaFinal ? facturaFinal.items : items;
    const dTotal = facturaFinal ? facturaFinal.total : total;
    const dSubtotal = dTotal / 1.19;
    const dIva = dTotal - dSubtotal;

    const doc = new jsPDF('p', 'mm', 'a4');
    const logoPath = '/logos/logonegro.png';
    const azulFjonic = [10, 31, 51];
    const cyanFjonic = [5, 171, 202];

    try {
      doc.addImage(logoPath, 'PNG', 15, 10, 60, 20); 
    } catch (error) {
      console.error("Logo no cargado");
    }

    doc.setTextColor(0, 0, 0).setFontSize(8).setFont("helvetica", "bold").text("FJONIC STUDIO", 195, 15, { align: "right" });
    doc.setFont("helvetica", "normal").text("NIT: 1.003.924.724", 195, 19, { align: "right" });
    doc.text("fjonicStudio@gmail.com", 195, 27, { align: "right" });

    doc.setDrawColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]).setLineWidth(0.8).line(15, 35, 195, 35);
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFontSize(22).setFont("helvetica", "bold").text("FACTURA", 105, 52, { align: "center" });

    doc.setFontSize(9).text("INFORMACIÓN DE FACTURA", 15, 65);
    doc.setTextColor(0).setFont("helvetica", "normal").text(`Número: ${dInvoice.numero || '---'}`, 15, 71);
    doc.text(`Fecha: ${new Date(dInvoice.fecha).toLocaleDateString() || '---'}`, 15, 76);

    doc.setFillColor(245, 247, 249).roundedRect(110, 65, 85, 25, 1, 1, 'F');
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFont("helvetica", "bold").text("DATOS DEL CLIENTE", 115, 71);
    doc.setTextColor(0).setFontSize(8.5).text(`Nombre: ${(dClienteNombre || '---').toUpperCase()}`, 115, 77);

    let yStart = 100;
    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).rect(15, yStart, 180, 8, 'F');
    doc.setTextColor(255).text("DESCRIPCIÓN", 20, yStart + 5.5);
    doc.text("CANT.", 145, yStart + 5.5, { align: "center" });
    doc.text("TOTAL", 190, yStart + 5.5, { align: "right" });

    let yRow = yStart + 8;
    doc.setFont("helvetica", "normal");
    dItems.forEach((item) => {
      doc.setTextColor(0).text((item.descripcion || 'Servicio').toUpperCase(), 20, yRow + 6);
      doc.text(item.cantidad.toString(), 145, yRow + 6, { align: "center" });
      doc.text(`$${(item.cantidad * item.valor).toLocaleString()}`, 190, yRow + 6, { align: "right" });
      doc.setDrawColor(230, 230, 230).line(15, yRow + 10, 195, yRow + 10);
      yRow += 10;
    });

    yRow += 10;
    doc.text("Subtotal:", 140, yRow);
    doc.text(`$${dSubtotal.toLocaleString()}`, 195, yRow, { align: "right" });
    doc.text("IVA (19%):", 140, yRow + 6);
    doc.text(`$${dIva.toLocaleString()}`, 195, yRow + 6, { align: "right" });

    doc.setTextColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]).setFontSize(12).setFont("helvetica", "bold");
    doc.text("TOTAL A PAGAR:", 130, yRow + 15); 
    doc.text(`$${dTotal.toLocaleString()}`, 195, yRow + 15, { align: "right" });

    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).rect(0, 275, 210, 22, 'F');
    doc.setTextColor(255).setFontSize(7).text("Gracias por confiar en FJONIC STUDIO. Documento equivalente a factura.", 105, 287, { align: "center" });

    doc.save(`Factura_${dInvoice.numero || 'FJONIC'}.pdf`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[1600px] mx-auto px-6 py-10 space-y-8">
        
        {/* HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-[#05ABCA] to-[#1C75BC] rounded-full" />
            <div>
              <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                Sistema de Facturación
              </h1>
              <p className="text-[#05ABCA]/60 text-sm font-medium">
                Emisión y gestión de documentos tributarios
              </p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-[#05ABCA]/50 via-[#05ABCA]/20 to-transparent" />
        </header>

        {/* FORMULARIO PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
        >
          {/* GLOW TOP */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
          
          {/* ENCABEZADO FACTURA */}
          <div className="p-8 border-b border-[#05ABCA]/10 flex justify-between items-start">
            <div className="w-48 h-20 flex items-center justify-start">
              <img src="/logos/logonegro.png" alt="Logo FJONIC" className="h-full w-auto object-contain brightness-0 invert" />
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-black text-[#05ABCA] tracking-widest uppercase leading-none">Factura</h2>
              <p className="text-[10px] tracking-[0.4em] text-white/60 font-bold mt-2">FJONIC STUDIO</p>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* INFORMACIÓN Y CLIENTE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* INFO FACTURA */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full" />
                  <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-widest">Información</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FiFileText className="text-[#05ABCA]" size={14} />
                      <span className="text-[10px] text-[#05ABCA] font-bold uppercase tracking-wider">N° Factura</span>
                    </div>
                    <span className="text-sm font-bold text-white/40 italic">GENERADO AUTOMÁTICAMENTE</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiCalendar size={12} />
                      Fecha de Emisión
                    </label>
                    <input 
                      type="date" 
                      value={invoice.fecha} 
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#05ABCA] transition-all" 
                      onChange={e => setInvoice({...invoice, fecha: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              {/* DATOS CLIENTE */}
              <div className="bg-[#0A1F33]/30 border border-[#05ABCA]/10 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full" />
                  <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-widest">Datos del Cliente</h3>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                      <FiUser size={12} />
                      Nombre o Razón Social
                    </label>
                    <input 
                      type="text" 
                      placeholder="Cliente General" 
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all" 
                      onChange={e => setCliente({...cliente, nombre: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider">
                      NIT / CC
                    </label>
                    <input 
                      type="text" 
                      placeholder="000000000-0" 
                      className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] transition-all" 
                      onChange={e => setCliente({...cliente, nit: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ITEMS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-[#05ABCA] to-transparent rounded-full" />
                <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-widest flex items-center gap-2">
                  <FiPackage size={14} />
                  Conceptos y Servicios
                </h3>
              </div>
              
              {/* HEADER TABLA */}
              <div className="bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white grid grid-cols-12 p-4 rounded-xl text-[10px] font-black tracking-widest">
                <div className="col-span-7">DESCRIPCIÓN</div>
                <div className="col-span-2 text-center">CANT.</div>
                <div className="col-span-3 text-right">VALOR UNIT.</div>
              </div>
              
              {/* FILAS ITEMS */}
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-12 gap-4 bg-[#0A1F33]/30 border border-[#05ABCA]/10 rounded-xl p-4 items-center"
                  >
                    <input 
                      className="col-span-7 bg-transparent text-sm font-semibold text-white outline-none placeholder-slate-500 focus:text-[#05ABCA]" 
                      placeholder="Producción Audiovisual..." 
                      onChange={(e) => { const n = [...items]; n[index].descripcion = e.target.value; setItems(n); }} 
                    />
                    <input 
                      type="number" 
                      className="col-span-2 text-center text-sm font-bold text-white bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-lg px-2 py-2 outline-none focus:border-[#05ABCA]" 
                      placeholder="1" 
                      value={item.cantidad} 
                      onChange={(e) => { const n = [...items]; n[index].cantidad = Number(e.target.value); setItems(n); }} 
                    />
                    <div className="col-span-3 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#05ABCA] font-bold">$</span>
                      <input 
                        type="number" 
                        className="w-full text-right text-sm font-bold text-white bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-lg pl-6 pr-3 py-2 outline-none focus:border-[#05ABCA]" 
                        placeholder="0" 
                        value={item.valor} 
                        onChange={(e) => { const n = [...items]; n[index].valor = Number(e.target.value); setItems(n); }} 
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button 
                onClick={agregarItem} 
                className="flex items-center gap-2 text-xs font-bold text-[#05ABCA] hover:text-[#1C75BC] transition-colors uppercase tracking-wider px-4 py-2 bg-[#05ABCA]/10 rounded-lg hover:bg-[#05ABCA]/20"
              >
                <FiPlus size={14} />
                Agregar Item
              </button>
            </div>

            {/* TOTALES Y ACCIÓN */}
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 pt-6 border-t border-[#05ABCA]/10">
              <div className="text-xs text-slate-400 font-medium max-w-xs">
                <p className="text-[#05ABCA]/60 uppercase tracking-wider">Documento oficial FJONIC STUDIO</p>
                <p className="text-slate-500 mt-1">IVA incluido al 19% según normativa fiscal vigente</p>
              </div>
              
              <div className="w-full lg:w-80 space-y-4">
                <div className="bg-[#0A1F33]/30 border border-[#05ABCA]/10 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Subtotal:</span>
                    <span className="font-bold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>IVA (19%):</span>
                    <span className="font-bold">${iva.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#05ABCA]/30 to-transparent" />
                  <div className="flex justify-between items-center">
                    <span className="text-[#05ABCA] font-black text-sm uppercase tracking-wider">Total:</span>
                    <span className="text-2xl font-black text-[#05ABCA]">${total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => generarPDF()} 
                  disabled={loading} 
                  className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <FiDownload size={16} />
                      Exportar Factura PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* HISTORIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-2xl border border-[#05ABCA]/20 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
          
          <div className="p-6 border-b border-[#05ABCA]/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center">
              <FiFileText className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Historial de Facturas</h2>
              <p className="text-xs text-[#05ABCA]/60">Documentos emitidos y registrados</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#05ABCA]/10">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">N° Factura</th>
                  <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">Cliente</th>
                  <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">Fecha</th>
                  <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs">Monto</th>
                  <th className="px-6 py-4 font-semibold text-[#05ABCA] uppercase tracking-wider text-xs text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {historial.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-xl bg-[#05ABCA]/10 border border-[#05ABCA]/20 flex items-center justify-center">
                          <FiFileText className="text-[#05ABCA]" size={24} />
                        </div>
                        <p className="text-slate-400 font-medium">No hay facturas registradas</p>
                        <p className="text-slate-500 text-xs">Las facturas emitidas aparecerán aquí</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  historial.map((f, index) => (
                    <motion.tr
                      key={f.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#05ABCA]/5 hover:bg-[#05ABCA]/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-[#05ABCA]">{f.numero}</td>
                      <td className="px-6 py-4 font-medium text-white">{f.clienteNombre}</td>
                      <td className="px-6 py-4 text-slate-300">{new Date(f.fechaEmision).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-bold text-white">${f.total.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => generarPDF(f)} 
                          className="p-2.5 bg-[#05ABCA]/10 text-[#05ABCA] rounded-lg hover:bg-gradient-to-r hover:from-[#05ABCA] hover:to-[#1C75BC] hover:text-white transition-all border border-[#05ABCA]/20"
                        >
                          <FiDownload size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}