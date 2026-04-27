'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { apiFetch } from '@/lib/api';

// ── Interfaces ─────────────────────────────────────────────────────────────────
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

// ── SVG Icons ──────────────────────────────────────────────────────────────────
function IconFile({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M4 2h7l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 2v4h4" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M6 10h6M6 13h4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconDownload({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M9 3v9M5.5 8.5L9 12l3.5-3.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15h12" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function IconPlus({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2v12M2 8h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconUser({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="3" stroke={color} strokeWidth="1.3"/>
      <path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconCalendar({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke={color} strokeWidth="1.3"/>
      <path d="M5 1.5v2M9 1.5v2M1.5 6h11" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconPackage({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5l5.5 3v6L7 13.5 1.5 10.5v-6L7 1.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M7 1.5v12M1.5 4.5l5.5 3 5.5-3" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTrash({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M4.5 3.5v7.5a1 1 0 001 1h3a1 1 0 001-1V3.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconShield({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l6 2.5v4.5c0 3-2.5 5.5-6 6.5C2.5 14 0 11.5 0 8.5V4l6-2.5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCheck({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M3 9.5l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconSpinner({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
      <path d="M8 2a6 6 0 016 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={s.field}>
      <label style={s.fieldLabel}>
        {icon && <span style={{ display: 'flex', color: '#175A8C' }}>{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div style={s.sectionTitle}>
      <div style={s.sectionTitleBar} />
      <span style={{ color: '#175A8C', display: 'flex' }}>{icon}</span>
      <span style={s.sectionTitleText}>{title}</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function FacturacionPage() {
  const [cliente, setCliente] = useState({ nombre: '', nit: '', direccion: '', telefono: '' });
  const [invoice, setInvoice]  = useState({
    numero: '',
    fecha: new Date().toISOString().split('T')[0],
    vencimiento: '',
    ciudad: 'Ubaté',
  });
  const [items, setItems]     = useState<ItemFactura[]>([{ descripcion: '', cantidad: 1, valor: 0 }]);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<FacturaHistorial[]>([]);
  const [successAnim, setSuccessAnim] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.cantidad * item.valor, 0);
  const iva      = subtotal * 0.19;
  const total    = subtotal + iva;

  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const data = await apiFetch('/facturacion');
        setHistorial(data);
      } catch (error) {
        console.error('Error cargando historial:', error);
      }
    };
    obtenerFacturas();
  }, []);

  const agregarItem = () =>
    setItems([...items, { descripcion: '', cantidad: 1, valor: 0 }]);

  const eliminarItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const guardarEnBD = async () => {
    const nuevaFactura = {
      clienteNombre: cliente.nombre || 'Cliente General',
      clienteNit: cliente.nit || '---',
      total,
      items,
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
      console.error('Error al guardar en BD:', error);
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
        return alert('Error al generar el número de factura en el servidor.');
      }
    }

    const dClienteNombre = facturaFinal ? facturaFinal.clienteNombre : cliente.nombre;
    const dInvoice       = facturaFinal ? { numero: facturaFinal.numero, fecha: facturaFinal.fechaEmision } : invoice;
    const dItems         = facturaFinal ? facturaFinal.items : items;
    const dTotal         = facturaFinal ? facturaFinal.total : total;
    const dSubtotal      = dTotal / 1.19;
    const dIva           = dTotal - dSubtotal;

    const doc        = new jsPDF('p', 'mm', 'a4');
    const logoPath   = '/logos/logonegro.png';
    const azulFjonic = [10, 31, 51];
    const cyanFjonic = [5, 171, 202];

    try { doc.addImage(logoPath, 'PNG', 15, 10, 60, 20); }
    catch (error) { console.error('Logo no cargado'); }

    doc.setTextColor(0, 0, 0).setFontSize(8).setFont('helvetica', 'bold').text('FJONIC STUDIO', 195, 15, { align: 'right' });
    doc.setFont('helvetica', 'normal').text('NIT: 1.003.924.724', 195, 19, { align: 'right' });
    doc.text('fjonicStudio@gmail.com', 195, 27, { align: 'right' });

    doc.setDrawColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]).setLineWidth(0.8).line(15, 35, 195, 35);
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFontSize(22).setFont('helvetica', 'bold').text('FACTURA', 105, 52, { align: 'center' });

    doc.setFontSize(9).text('INFORMACIÓN DE FACTURA', 15, 65);
    doc.setTextColor(0).setFont('helvetica', 'normal').text(`Número: ${dInvoice.numero || '---'}`, 15, 71);
    doc.text(`Fecha: ${new Date(dInvoice.fecha).toLocaleDateString() || '---'}`, 15, 76);

    doc.setFillColor(245, 247, 249).roundedRect(110, 65, 85, 25, 1, 1, 'F');
    doc.setTextColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).setFont('helvetica', 'bold').text('DATOS DEL CLIENTE', 115, 71);
    doc.setTextColor(0).setFontSize(8.5).text(`Nombre: ${(dClienteNombre || '---').toUpperCase()}`, 115, 77);

    let yStart = 100;
    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).rect(15, yStart, 180, 8, 'F');
    doc.setTextColor(255).text('DESCRIPCIÓN', 20, yStart + 5.5);
    doc.text('CANT.', 145, yStart + 5.5, { align: 'center' });
    doc.text('TOTAL', 190, yStart + 5.5, { align: 'right' });

    let yRow = yStart + 8;
    doc.setFont('helvetica', 'normal');
    dItems.forEach(item => {
      doc.setTextColor(0).text((item.descripcion || 'Servicio').toUpperCase(), 20, yRow + 6);
      doc.text(item.cantidad.toString(), 145, yRow + 6, { align: 'center' });
      doc.text(`$${(item.cantidad * item.valor).toLocaleString()}`, 190, yRow + 6, { align: 'right' });
      doc.setDrawColor(230, 230, 230).line(15, yRow + 10, 195, yRow + 10);
      yRow += 10;
    });

    yRow += 10;
    doc.text('Subtotal:', 140, yRow);
    doc.text(`$${dSubtotal.toLocaleString()}`, 195, yRow, { align: 'right' });
    doc.text('IVA (19%):', 140, yRow + 6);
    doc.text(`$${dIva.toLocaleString()}`, 195, yRow + 6, { align: 'right' });
    doc.setTextColor(cyanFjonic[0], cyanFjonic[1], cyanFjonic[2]).setFontSize(12).setFont('helvetica', 'bold');
    doc.text('TOTAL A PAGAR:', 130, yRow + 15);
    doc.text(`$${dTotal.toLocaleString()}`, 195, yRow + 15, { align: 'right' });

    doc.setFillColor(azulFjonic[0], azulFjonic[1], azulFjonic[2]).rect(0, 275, 210, 22, 'F');
    doc.setTextColor(255).setFontSize(7).text('Gracias por confiar en FJONIC STUDIO. Documento equivalente a factura.', 105, 287, { align: 'center' });

    doc.save(`Factura_${dInvoice.numero || 'FJONIC'}.pdf`);
    setSuccessAnim(true);
    setTimeout(() => setSuccessAnim(false), 1200);
    setLoading(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* TOPBAR */}
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}><IconShield size={18} /></div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Sistema de Facturación</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div>
            <div style={s.heroEyebrow}>Documentos tributarios</div>
            <div style={s.heroAmount}>{historial.length}</div>
            <div style={s.heroHint}>
              {historial.length === 0
                ? 'Aún no hay facturas emitidas'
                : `${historial.length} factura${historial.length !== 1 ? 's' : ''} emitida${historial.length !== 1 ? 's' : ''}`}
            </div>
          </div>
          <div style={s.heroCards}>
            <HeroCard label="Facturas emitidas" value={String(historial.length)}           accent="#05ABC4" />
            <HeroCard label="Total facturado"   value={formatCOP(historial.reduce((a, f) => a + f.total, 0))} accent="#1C75BC" />
            <HeroCard label="IVA incluido"       value="19% vigente"                        accent="#175A8C" />
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={s.body}>

        {/* ── FORM PANEL ── */}
        <div style={s.formPanel}>

          {/* Logo / header */}
          <div style={s.formHeader}>
            <div style={s.formHeaderLeft}>
              <img src="/logos/logonegro.png" alt="FJONIC Studio" style={s.formLogo} />
            </div>
            <div style={s.formHeaderRight}>
              <div style={s.formHeaderTitle}>FACTURA</div>
              <div style={s.formHeaderSub}>FJONIC STUDIO</div>
            </div>
          </div>

          {/* Info + cliente grid */}
          <div style={s.twoCol}>

            {/* Info factura */}
            <div style={s.card}>
              <SectionTitle icon={<IconFile size={14} />} title="Información de la factura" />

              <div style={s.autoNumBox}>
                <div style={s.autoNumLabel}>
                  <IconFile size={13} color="#4a7a9b" />
                  Número de factura
                </div>
                <div style={s.autoNumVal}>Se genera automáticamente</div>
              </div>

              <Field label="Fecha de emisión" icon={<IconCalendar size={13} />}>
                <input
                  type="date"
                  style={s.input}
                  value={invoice.fecha}
                  onChange={e => setInvoice({ ...invoice, fecha: e.target.value })}
                />
              </Field>
            </div>

            {/* Datos cliente */}
            <div style={s.card}>
              <SectionTitle icon={<IconUser size={14} />} title="Datos del cliente" />

              <Field label="Nombre o razón social" icon={<IconUser size={13} />}>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Cliente General"
                  onChange={e => setCliente({ ...cliente, nombre: e.target.value })}
                />
              </Field>

              <Field label="NIT / Cédula">
                <input
                  type="text"
                  style={s.input}
                  placeholder="000000000-0"
                  onChange={e => setCliente({ ...cliente, nit: e.target.value })}
                />
              </Field>
            </div>
          </div>

          {/* Items */}
          <div style={s.card}>
            <SectionTitle icon={<IconPackage size={14} />} title="Conceptos y servicios" />

            {/* Table header */}
            <div style={s.tableHead}>
              <div style={{ ...s.tableHeadCell, flex: 7 }}>Descripción del servicio</div>
              <div style={{ ...s.tableHeadCell, flex: 2, textAlign: 'center' as const }}>Cant.</div>
              <div style={{ ...s.tableHeadCell, flex: 3, textAlign: 'right' as const }}>Valor unitario</div>
              <div style={{ width: 32 }} />
            </div>

            {/* Rows */}
            {items.map((item, index) => (
              <div key={index} style={s.tableRow}>
                <input
                  style={{ ...s.tableInput, flex: 7 }}
                  placeholder="Producción audiovisual, diseño gráfico..."
                  value={item.descripcion}
                  onChange={e => {
                    const n = [...items]; n[index].descripcion = e.target.value; setItems(n);
                  }}
                />
                <input
                  type="number"
                  style={{ ...s.tableInputNum, flex: 2, textAlign: 'center' as const }}
                  placeholder="1"
                  value={item.cantidad}
                  onChange={e => {
                    const n = [...items]; n[index].cantidad = Number(e.target.value); setItems(n);
                  }}
                />
                <div style={{ ...s.montoBox, flex: 3 }}>
                  <span style={s.montoSign}>$</span>
                  <input
                    type="number"
                    style={s.montoInput}
                    placeholder="0"
                    value={item.valor}
                    onChange={e => {
                      const n = [...items]; n[index].valor = Number(e.target.value); setItems(n);
                    }}
                  />
                </div>
                <button
                  style={s.deleteRowBtn}
                  onClick={() => eliminarItem(index)}
                  title="Eliminar ítem"
                  disabled={items.length === 1}
                >
                  <IconTrash size={13} color={items.length === 1 ? '#d0dce8' : '#b83232'} />
                </button>
              </div>
            ))}

            <button style={s.addItemBtn} onClick={agregarItem}>
              <IconPlus size={14} color="#1C75BC" />
              <span>Agregar ítem</span>
            </button>
          </div>

          {/* Totales + botón */}
          <div style={s.totalesRow}>
            <div style={s.totalesNote}>
              <div style={s.totalesNoteTitle}>Documento oficial</div>
              <div style={s.totalesNoteDesc}>IVA incluido al 19% según normativa fiscal vigente colombiana.</div>
            </div>

            <div style={s.totalesBox}>
              <div style={s.totalesCard}>
                <div style={s.totalesLine}>
                  <span style={s.totalesLineLabel}>Subtotal</span>
                  <span style={s.totalesLineVal}>{formatCOP(subtotal)}</span>
                </div>
                <div style={s.totalesLine}>
                  <span style={s.totalesLineLabel}>IVA (19%)</span>
                  <span style={s.totalesLineVal}>{formatCOP(iva)}</span>
                </div>
                <div style={s.totalesDivider} />
                <div style={s.totalesTotal}>
                  <span style={s.totalesTotalLabel}>Total a pagar</span>
                  <span style={s.totalesTotalVal}>{formatCOP(total)}</span>
                </div>
              </div>

              <button
                style={{
                  ...s.pdfBtn,
                  ...(successAnim ? { background: '#0D3A66' } : {}),
                  opacity: loading ? 0.7 : 1,
                }}
                onClick={() => generarPDF()}
                disabled={loading}
              >
                {loading ? (
                  <><IconSpinner size={18} /><span>Generando PDF...</span></>
                ) : successAnim ? (
                  <><IconCheck size={18} /><span>PDF descargado</span></>
                ) : (
                  <><IconDownload size={18} color="#fff" /><span>Exportar factura PDF</span></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── HISTORIAL PANEL ── */}
        <div style={s.historialPanel}>

          <div style={s.historialHeader}>
            <div style={s.historialHeaderIcon}>
              <IconFile size={20} color="#fff" />
            </div>
            <div>
              <div style={s.historialHeaderTitle}>Historial de facturas</div>
              <div style={s.historialHeaderSub}>Documentos emitidos y registrados</div>
            </div>
          </div>

          {/* Table */}
          <div style={s.tableWrap}>
            <div style={s.historialHead}>
              {['N° Factura', 'Cliente', 'Fecha de emisión', 'Monto total', 'Acción'].map((h, i) => (
                <div
                  key={h}
                  style={{
                    ...s.historialHeadCell,
                    textAlign: i === 4 ? 'center' as const : 'left' as const,
                    flex: [2, 3, 2, 2, 1][i],
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {historial.length === 0 ? (
              <div style={s.empty}>
                <div style={s.emptyIconBox}><IconFile size={32} color="#175A8C" /></div>
                <div style={s.emptyTitle}>No hay facturas registradas</div>
                <div style={s.emptyDesc}>
                  Las facturas que emitas desde el formulario aparecerán aquí automáticamente.
                </div>
              </div>
            ) : (
              historial.map((f, index) => (
                <div
                  key={f.id}
                  style={{ ...s.historialRow, background: index % 2 === 0 ? '#fff' : '#fafbfd' }}
                >
                  <div style={{ ...s.historialCell, flex: 2 }}>
                    <span style={s.facturaNum}>{f.numero}</span>
                  </div>
                  <div style={{ ...s.historialCell, flex: 3 }}>
                    <span style={s.clienteName}>{f.clienteNombre}</span>
                  </div>
                  <div style={{ ...s.historialCell, flex: 2 }}>
                    <span style={s.fechaCell}>
                      {new Date(f.fechaEmision).toLocaleDateString('es-CO', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div style={{ ...s.historialCell, flex: 2 }}>
                    <span style={s.montoCell}>{formatCOP(f.total)}</span>
                  </div>
                  <div style={{ ...s.historialCell, flex: 1, justifyContent: 'center' as const }}>
                    <button
                      style={s.dlBtn}
                      onClick={() => generarPDF(f)}
                      title="Descargar PDF"
                    >
                      <IconDownload size={15} color="#1C75BC" />
                      <span style={s.dlBtnLabel}>PDF</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HeroCard ───────────────────────────────────────────────────────────────────
function HeroCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...s.heroCard, borderTop: `3px solid ${accent}` }}>
      <div style={s.heroCardLabel}>{label}</div>
      <div style={s.heroCardVal}>{value}</div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
    color: '#0A1F33',
  },

  // Topbar
  topbar: {
    background: '#0A1F33',
    padding: '0 2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64,
    borderBottom: '3px solid #0D3A66',
  },
  topbarLeft:   { display: 'flex', alignItems: 'center', gap: 14 },
  logo: {
    width: 42, height: 42, background: '#05ABC4', borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  topbarName:   { fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' },
  topbarModule: { fontSize: 11, color: '#05ABC4', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 1 },
  topbarDate:   { fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' as const },

  // Hero
  hero: {
    background: 'linear-gradient(135deg,#0A1F33 0%,#0D3A66 55%,#175A8C 100%)',
    padding: '2.25rem 2rem 2rem', borderBottom: '1px solid #0D3A66',
  },
  heroInner:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' as const },
  heroEyebrow: { fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 6 },
  heroAmount:  { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' },
  heroHint:    { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  heroCards:   { display: 'flex', gap: 10, flexWrap: 'wrap' as const },
  heroCard: {
    background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '14px 20px', minWidth: 160,
  },
  heroCardLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 },
  heroCardVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: '#fff' },

  // Body
  body: {
    display: 'flex', flexDirection: 'column' as const,
    gap: 0, maxWidth: 1200, margin: '0 auto',
    padding: '2rem 1.5rem', paddingTop: '1.5rem',
  },

  // Form panel
  formPanel: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #d0dce8',
    overflow: 'hidden',
    display: 'flex', flexDirection: 'column' as const, gap: 0,
  },
  formHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1.5rem 2rem',
    background: '#0A1F33',
    borderBottom: '3px solid #0D3A66',
  },
  formHeaderLeft:  { display: 'flex', alignItems: 'center' },
  formLogo:        { height: 36, width: 'auto', objectFit: 'contain' as const, filter: 'brightness(0) invert(1)' },
  formHeaderRight: { textAlign: 'right' as const },
  formHeaderTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28, color: '#05ABC4', letterSpacing: '0.08em' },
  formHeaderSub:   { fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginTop: 2 },

  twoCol: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 0, borderBottom: '1px solid #d0dce8',
  },

  card: {
    padding: '1.5rem 2rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1rem',
    borderRight: '1px solid #d0dce8',
  },

  sectionTitle: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  sectionTitleBar: { width: 3, height: 16, background: '#05ABC4', borderRadius: 2, flexShrink: 0 },
  sectionTitleText: { fontSize: 12, fontWeight: 700, color: '#175A8C', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },

  field:      { display: 'flex', flexDirection: 'column' as const, gap: 7 },
  fieldLabel: { fontSize: 13, fontWeight: 700, color: '#0A1F33', display: 'flex', alignItems: 'center', gap: 5 },

  input: {
    padding: '11px 14px', fontSize: 14, fontFamily: 'inherit',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, color: '#0A1F33', outline: 'none', width: '100%', transition: 'border .15s',
  },

  autoNumBox: {
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, padding: '11px 14px',
  },
  autoNumLabel: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#4a7a9b', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 },
  autoNumVal:   { fontSize: 13, color: '#4a7a9b', fontStyle: 'italic' as const },

  // Items table
  tableHead: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'linear-gradient(90deg,#0D3A66,#1C75BC)',
    padding: '10px 14px', borderRadius: 10,
    marginBottom: 6,
  },
  tableHeadCell: { fontSize: 10, fontWeight: 700, color: '#fff', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },

  tableRow: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 14px',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, marginBottom: 6,
  },
  tableInput: {
    border: 'none', background: 'transparent', outline: 'none',
    fontSize: 14, fontFamily: 'inherit', color: '#0A1F33',
    padding: '2px 4px',
  },
  tableInputNum: {
    border: '1px solid #d0dce8', background: '#fff', borderRadius: 7,
    fontSize: 14, fontFamily: 'inherit', color: '#0A1F33',
    padding: '6px 8px', outline: 'none',
  },

  montoBox: {
    display: 'flex', alignItems: 'center',
    background: '#fff', border: '1px solid #d0dce8', borderRadius: 7, overflow: 'hidden',
  },
  montoSign: {
    padding: '6px 8px', fontSize: 14, fontWeight: 700, color: '#0D3A66',
    background: '#e8f0f7', borderRight: '1px solid #d0dce8',
  },
  montoInput: {
    flex: 1, padding: '6px 8px', fontSize: 14,
    fontFamily: "'JetBrains Mono',monospace", fontWeight: 600,
    color: '#0A1F33', background: 'transparent', border: 'none', outline: 'none',
    textAlign: 'right' as const, minWidth: 0,
  },

  deleteRowBtn: {
    width: 32, height: 32, borderRadius: 7,
    border: '1px solid #d0dce8', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, transition: 'background .15s',
  },

  addItemBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '9px 16px', border: '1.5px dashed #1C75BC',
    borderRadius: 9, background: 'rgba(28,117,188,0.05)',
    fontSize: 13, fontWeight: 700, color: '#1C75BC',
    cursor: 'pointer', fontFamily: 'inherit', marginTop: 4,
    transition: 'background .15s',
  },

  // Totales
  totalesRow: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: '2rem', padding: '1.5rem 2rem',
    borderTop: '1px solid #d0dce8', flexWrap: 'wrap' as const,
  },
  totalesNote:      { maxWidth: 280 },
  totalesNoteTitle: { fontSize: 13, fontWeight: 700, color: '#175A8C', marginBottom: 4 },
  totalesNoteDesc:  { fontSize: 12, color: '#4a7a9b', lineHeight: 1.6 },

  totalesBox:   { display: 'flex', flexDirection: 'column' as const, gap: 12, minWidth: 300 },
  totalesCard: {
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 12, padding: '16px 18px',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
  },
  totalesLine:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  totalesLineLabel: { fontSize: 13, color: '#4a7a9b' },
  totalesLineVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 600, color: '#0A1F33' },
  totalesDivider:   { height: 1, background: '#d0dce8', margin: '4px 0' },
  totalesTotal:     { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  totalesTotalLabel:{ fontSize: 13, fontWeight: 700, color: '#0A1F33', textTransform: 'uppercase' as const, letterSpacing: '0.06em' },
  totalesTotalVal:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 800, color: '#0D3A66' },

  pdfBtn: {
    width: '100%', padding: '16px',
    background: '#1C75BC', color: '#fff', border: 'none', borderRadius: 12,
    fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 700, fontSize: 15,
    cursor: 'pointer', transition: 'all .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 4px 18px rgba(28,117,188,0.25)', letterSpacing: '-0.01em',
  },

  // Historial panel
  historialPanel: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #d0dce8', overflow: 'hidden',
  },
  historialHeader: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #d0dce8',
    background: '#fff',
  },
  historialHeaderIcon: {
    width: 44, height: 44, borderRadius: 10,
    background: 'linear-gradient(135deg,#0D3A66,#1C75BC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  historialHeaderTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: '#0A1F33', letterSpacing: '-0.01em' },
  historialHeaderSub:   { fontSize: 12, color: '#4a7a9b', marginTop: 2 },

  tableWrap:    { overflowX: 'auto' as const },
  historialHead: {
    display: 'flex', alignItems: 'center',
    padding: '10px 20px',
    background: '#f4f7fb', borderBottom: '1px solid #d0dce8',
  },
  historialHeadCell: { fontSize: 11, fontWeight: 700, color: '#4a7a9b', textTransform: 'uppercase' as const, letterSpacing: '0.08em' },

  historialRow: {
    display: 'flex', alignItems: 'center',
    padding: '13px 20px',
    borderBottom: '1px solid #e8f0f7',
    transition: 'background .1s',
  },
  historialCell: { display: 'flex', alignItems: 'center', paddingRight: 12 },

  facturaNum: { fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: '#1C75BC' },
  clienteName:{ fontSize: 14, fontWeight: 600, color: '#0A1F33' },
  fechaCell:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#4a7a9b' },
  montoCell:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: '#0D3A66' },

  dlBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', border: '1.5px solid #d0dce8',
    borderRadius: 8, background: '#f4f7fb',
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
    color: '#1C75BC', fontFamily: 'inherit', transition: 'all .15s',
  },
  dlBtnLabel: { fontSize: 12 },

  // Empty
  empty: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
    padding: '4rem 2rem', gap: 14, textAlign: 'center' as const, background: '#fff',
  },
  emptyIconBox: {
    width: 72, height: 72, borderRadius: 18,
    background: 'rgba(28,117,188,0.07)', border: '1.5px solid #d0dce8',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  emptyTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: '#0A1F33' },
  emptyDesc:  { fontSize: 14, color: '#4a7a9b', maxWidth: 360, lineHeight: 1.7 },
};