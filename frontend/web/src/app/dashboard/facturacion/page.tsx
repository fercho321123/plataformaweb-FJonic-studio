'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiFetch } from '@/lib/api'; // Ajusta la ruta según donde tengas tu apiFetch

// --- INTERFACES ---
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

  // 1. CARGAR HISTORIAL AL INICIAR USANDO APIFETCH
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

  // 2. FUNCIÓN PARA GUARDAR EN LA BASE DE DATOS (NÚMERO AUTOMÁTICO)
  const guardarEnBD = async () => {
    const nuevaFactura = {
      // El 'numero' lo genera el backend automáticamente
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
        return guardada; // Retornamos para que el PDF use el número real generado
      }
    } catch (error) {
      console.error("Error al guardar en BD:", error);
    }
    return null;
  };

  const generarPDF = async (datosDesdeHistorial: FacturaHistorial | null = null) => {
    setLoading(true);
    
    let facturaFinal = datosDesdeHistorial;

    // Si es una factura nueva, primero la guardamos para obtener el número automático
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
    <div className="min-h-screen bg-slate-100 py-10 px-4 space-y-12">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-200">
        
        {/* ENCABEZADO */}
        <div className="p-8 border-b-4 border-[#05ABCA] flex justify-between items-start bg-white">
          <div className="w-48 h-24 flex items-center justify-start">
            <img src="/logos/logonegro.png" alt="Logo FJONIC" className="h-full w-auto object-contain" />
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-[#0A1F33] tracking-widest uppercase leading-none">Factura</h2>
            <p className="text-[10px] tracking-[0.4em] text-[#05ABCA] font-bold mt-2">FJONIC STUDIO</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-[#05ABCA] border-b border-slate-100 pb-2 uppercase tracking-widest">Información</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="border-b-2 border-slate-100 py-1">
                  <span className="text-[10px] text-slate-400 font-bold block">N° FACTURA</span>
                  <span className="text-sm font-bold text-slate-400 italic">AUTOMÁTICO</span>
                </div>
                <input type="date" value={invoice.fecha} className="border-b-2 border-slate-200 outline-none py-1 font-bold text-sm focus:border-[#05ABCA]" onChange={e => setInvoice({...invoice, fecha: e.target.value})} />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
              <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-widest mb-2">Datos del Cliente</h3>
              <input type="text" placeholder="Nombre o Razón Social" className="w-full bg-transparent border-b border-slate-800 outline-none py-1 text-sm font-bold text-slate-900" onChange={e => setCliente({...cliente, nombre: e.target.value})} />
              <input type="text" placeholder="NIT / CC" className="w-full bg-transparent border-b border-slate-800 outline-none py-1 text-sm font-bold text-slate-900" onChange={e => setCliente({...cliente, nit: e.target.value})} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0A1F33] text-white grid grid-cols-12 p-3 rounded-t-lg text-[10px] font-black tracking-widest">
              <div className="col-span-8">DESCRIPCIÓN</div>
              <div className="col-span-2 text-center">CANT.</div>
              <div className="col-span-2 text-right">VALOR UNIT.</div>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 border-b border-slate-100 pb-3 items-center px-2">
                <input className="col-span-8 text-sm font-bold outline-none focus:text-[#05ABCA]" placeholder="Ej: Producción Audiovisual" onChange={(e) => { const n = [...items]; n[index].descripcion = e.target.value; setItems(n); }} />
                <input type="number" className="col-span-2 text-center text-sm font-bold outline-none" placeholder="1" value={item.cantidad} onChange={(e) => { const n = [...items]; n[index].cantidad = Number(e.target.value); setItems(n); }} />
                <input type="number" className="col-span-2 text-right text-sm font-bold outline-none" placeholder="0" value={item.valor} onChange={(e) => { const n = [...items]; n[index].valor = Number(e.target.value); setItems(n); }} />
              </div>
            ))}
            <button onClick={agregarItem} className="text-[10px] font-black text-[#05ABCA] hover:underline uppercase tracking-widest">+ AGREGAR ITEM</button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-6 border-t border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold max-w-xs uppercase">Formato oficial FJONIC STUDIO - IVA del 19%</div>
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-bold"><span>SUBTOTAL:</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-[#05ABCA] font-black"><span>TOTAL:</span><span className="text-xl">${total.toLocaleString()}</span></div>
              <button onClick={() => generarPDF()} disabled={loading} className="w-full bg-[#0A1F33] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#05ABCA] transition-all shadow-xl mt-4">
                {loading ? 'Generando...' : 'Exportar Factura'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE HISTORIAL --- */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="p-8 bg-slate-50/50 border-b flex items-center gap-4">
          <div className="bg-[#05ABCA] p-2 rounded-lg text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h2 className="text-xl font-black text-[#0D3A66]">Historial de Facturas Emitidas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">N° Factura</th>
                <th className="px-8 py-4">Cliente</th>
                <th className="px-8 py-4">Monto</th>
                <th className="px-8 py-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historial.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400 italic">No hay facturas registradas.</td></tr>
              ) : (
                historial.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-[#0D3A66]">{f.numero}</td>
                    <td className="px-8 py-4 font-medium text-slate-600">{f.clienteNombre}</td>
                    <td className="px-8 py-4 font-black text-[#0D3A66]">${f.total.toLocaleString()}</td>
                    <td className="px-8 py-4 text-center">
                      <button onClick={() => generarPDF(f)} className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-[#05ABCA] hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}