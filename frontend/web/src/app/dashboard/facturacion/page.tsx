'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';

export default function FacturacionPage() {
  const [cliente, setCliente] = useState({ nombre: '', nit: '', direccion: '', telefono: '' });
  const [invoice, setInvoice] = useState({ numero: '', fecha: '', vencimiento: '', ciudad: 'Ubaté' });
  const [items, setItems] = useState([{ descripcion: '', cantidad: 1, valor: 0 }]);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + (item.cantidad * item.valor), 0);
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const agregarItem = () => setItems([...items, { descripcion: '', cantidad: 1, valor: 0 }]);

  const generarPDF = () => {
    setLoading(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    const logoPath = '/logos/logonegro.png';
    const azulFjonic = [10, 31, 51];
    const cyanFjonic = [5, 171, 202];

    // 1. LOGO (Superior Izquierda)
    try {
      doc.addImage(logoPath, 'PNG', 15, 10, 60, 20); 
    } catch (error) {
      console.error("Error al cargar logo:", error);
    }

    // 2. INFO EMPRESA (Superior Derecha)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("FJONIC STUDIO", 195, 15, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text("NIT: 1.003.924.724", 195, 19, { align: "right" });
    doc.text("Dirección: Ubaté, Cundinamarca", 195, 23, { align: "right" });
    doc.text("fjonicStudio@gmail.com", 195, 27, { align: "right" });

    // 3. LÍNEA DECORATIVA
    doc.setDrawColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]);
    doc.setLineWidth(0.8);
    doc.line(15, 35, 195, 35);

    // 4. TÍTULO
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURA", 105, 52, { align: "center" });

    // 5. BLOQUES DE INFORMACIÓN
    doc.setFontSize(9);
    doc.text("INFORMACIÓN DE FACTURA", 15, 65);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text(`Número: ${invoice.numero || '---'}`, 15, 71);
    doc.text(`Fecha: ${invoice.fecha || '---'}`, 15, 76);
    doc.text(`Vencimiento: ${invoice.vencimiento || '---'}`, 15, 81);

    // Recuadro Cliente
    doc.setFillColor(245, 247, 249);
    doc.roundedRect(110, 65, 85, 25, 1, 1, 'F');
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL CLIENTE", 115, 71);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8.5);
    doc.text(`Nombre: ${(cliente.nombre || '---').toUpperCase()}`, 115, 77);
    doc.text(`NIT/CC: ${cliente.nit || '---'}`, 115, 82);
    doc.text(`Dirección: ${cliente.direccion || '---'}`, 115, 87);

    // 6. TABLA DE ITEMS
    let yStart = 100;
    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]);
    doc.rect(15, yStart, 180, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("DESCRIPCIÓN", 20, yStart + 5.5);
    doc.text("CANT.", 145, yStart + 5.5, { align: "center" });
    doc.text("TOTAL", 190, yStart + 5.5, { align: "right" });

    let yRow = yStart + 8;
    doc.setFont("helvetica", "normal");
    items.forEach((item) => {
      doc.setTextColor(0, 0, 0);
      doc.text((item.descripcion || 'Servicio').toUpperCase(), 20, yRow + 6);
      doc.text(item.cantidad.toString(), 145, yRow + 6, { align: "center" });
      doc.text(`$${(item.cantidad * item.valor).toLocaleString()}`, 190, yRow + 6, { align: "right" });
      doc.setDrawColor(230, 230, 230);
      doc.line(15, yRow + 10, 195, yRow + 10);
      yRow += 10;
    });

   // 7. TOTALES (Corregido para evitar sobreposición)
yRow += 10;
doc.setTextColor(0, 0, 0);
doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.text("Subtotal:", 140, yRow);
doc.text(`$${subtotal.toLocaleString()}`, 195, yRow, { align: "right" });

doc.text("IVA (19%):", 140, yRow + 6);
doc.text(`$${iva.toLocaleString()}`, 195, yRow + 6, { align: "right" });

// Ajuste específico para TOTAL A PAGAR
doc.setTextColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]);
doc.setFontSize(12);
doc.setFont("helvetica", "bold");

// Dibujamos la etiqueta un poco más a la izquierda (130) 
// y el valor a la derecha (195) para que no se choquen
doc.text("TOTAL A PAGAR:", 130, yRow + 15); 
doc.text(`$${total.toLocaleString()}`, 195, yRow + 15, { align: "right" });
    // 8. PIE DE PÁGINA
    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]);
    doc.rect(0, 275, 210, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text("Gracias por confiar en FJONIC STUDIO. Documento equivalente a factura.", 105, 287, { align: "center" });

    doc.save(`Factura_${invoice.numero || 'FJONIC'}.pdf`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-slate-200">
        
        {/* ENCABEZADO */}
        <div className="p-8 border-b-4 border-[#05ABCA] flex justify-between items-start bg-white">
          <div className="w-48 h-24 flex items-center justify-start">
            <img 
              src="/logos/logonegro.png" 
              alt="Logo FJONIC" 
              className="h-full w-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-[#0A1F33] tracking-widest uppercase leading-none">Factura</h2>
            <p className="text-[10px] tracking-[0.4em] text-[#05ABCA] font-bold mt-2">FJONIC STUDIO</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* DATOS GENERALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-[#05ABCA] border-b border-slate-100 pb-2 uppercase tracking-widest">Información</h3>
              <div className="grid grid-cols-1 gap-3">
                <input type="text" placeholder="Número de Factura" className="border-b-2 border-slate-200 outline-none py-1 font-bold text-sm focus:border-[#05ABCA]" onChange={e => setInvoice({...invoice, numero: e.target.value})} />
                <input type="date" className="border-b-2 border-slate-200 outline-none py-1 font-bold text-sm focus:border-[#05ABCA]" onChange={e => setInvoice({...invoice, fecha: e.target.value})} />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
              <h3 className="text-xs font-black text-[#05ABCA] uppercase tracking-widest mb-2">Datos del Cliente</h3>
              <input type="text" placeholder="Nombre o Razón Social" className="w-full bg-transparent border-b border-slate-800 outline-none py-1 text-sm font-bold text-slate-900" onChange={e => setCliente({...cliente, nombre: e.target.value})} />
              <input type="text" placeholder="NIT / CC" className="w-full bg-transparent border-b border-slate-800 outline-none py-1 text-sm font-bold text-slate-900" onChange={e => setCliente({...cliente, nit: e.target.value})} />
              <input type="text" placeholder="Dirección" className="w-full bg-transparent border-b border-slate-800 outline-none py-1 text-sm font-bold text-slate-900" onChange={e => setCliente({...cliente, direccion: e.target.value})} />
            </div>
          </div>

          {/* TABLA DE ITEMS */}
          <div className="space-y-4">
            <div className="bg-[#0A1F33] text-white grid grid-cols-12 p-3 rounded-t-lg text-[10px] font-black tracking-widest">
              <div className="col-span-8">DESCRIPCIÓN</div>
              <div className="col-span-2 text-center">CANT.</div>
              <div className="col-span-2 text-right">VALOR UNIT.</div>
            </div>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 border-b border-slate-100 pb-3 items-center px-2">
                <input 
                  className="col-span-8 text-sm font-bold outline-none focus:text-[#05ABCA]" 
                  placeholder="Ej: Producción Audiovisual" 
                  onChange={(e) => { const n = [...items]; n[index].descripcion = e.target.value; setItems(n); }} 
                />
                <input 
                  type="number" 
                  className="col-span-2 text-center text-sm font-bold outline-none" 
                  placeholder="1" 
                  onChange={(e) => { const n = [...items]; n[index].cantidad = Number(e.target.value); setItems(n); }} 
                />
                <input 
                  type="number" 
                  className="col-span-2 text-right text-sm font-bold outline-none" 
                  placeholder="0" 
                  onChange={(e) => { const n = [...items]; n[index].valor = Number(e.target.value); setItems(n); }} 
                />
              </div>
            ))}
            <button onClick={agregarItem} className="text-[10px] font-black text-[#05ABCA] hover:underline uppercase tracking-widest">+ AGREGAR ITEM</button>
          </div>

          {/* TOTALES */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-6 border-t border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold max-w-xs uppercase">
              Formato oficial FJONIC STUDIO - IVA del 19%
            </div>
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>SUBTOTAL:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#05ABCA] font-black">
                <span>TOTAL:</span>
                <span className="text-xl">${total.toLocaleString()}</span>
              </div>
              <button 
                onClick={generarPDF}
                disabled={loading}
                className="w-full bg-[#0A1F33] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#05ABCA] transition-all shadow-xl mt-4"
              >
                {loading ? 'Generando...' : 'Exportar Factura'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}