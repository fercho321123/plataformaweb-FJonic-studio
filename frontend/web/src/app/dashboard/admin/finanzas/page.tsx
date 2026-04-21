'use client';

import React, { useState, useEffect } from 'react';

interface Transaccion {
  id: string;
  concepto: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  categoria: string;
  metodoPago: string;
  fecha: string;
}

const STORAGE_KEY = 'fjonic_finanzas_v2';

const CATEGORIAS = [
  { label: 'Servicios',    icon: '💼' },
  { label: 'Publicidad',   icon: '📣' },
  { label: 'Herramientas', icon: '🛠️' },
  { label: 'Nómina',       icon: '👥' },
  { label: 'Operacional',  icon: '⚙️' },
  { label: 'Otro',         icon: '📁' },
];

const METODOS = [
  { label: 'Bancaria',  icon: '🏦', desc: 'Transferencia' },
  { label: 'Efectivo',  icon: '💵', desc: 'En mano' },
  { label: 'Tarjeta',   icon: '💳', desc: 'Débito/Crédito' },
];

function formatCOP(v: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(v);
}

function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  }).toUpperCase();
}

function getFechaStr() {
  return new Date().toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function FinanzasPage() {
  const [txns, setTxns] = useState<Transaccion[]>([]);
  const [tipo, setTipo] = useState<'ingreso' | 'gasto'>('ingreso');
  const [categoria, setCategoria] = useState('Servicios');
  const [metodo, setMetodo] = useState('Bancaria');
  const [filtro, setFiltro] = useState<'todos' | 'ingreso' | 'gasto'>('todos');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [conceptoError, setConceptoError] = useState(false);
  const [montoError, setMontoError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [successAnim, setSuccessAnim] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTxns(JSON.parse(raw));
    } catch {}
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(txns));
    } catch {}
  }, [txns]);

  const ingresos = txns.filter(t => t.tipo === 'ingreso').reduce((a, t) => a + t.monto, 0);
  const gastos   = txns.filter(t => t.tipo === 'gasto').reduce((a, t) => a + t.monto, 0);
  const balance  = ingresos - gastos;

  const handleSubmit = () => {
    let err = false;
    if (!concepto.trim()) { setConceptoError(true); err = true; }
    const val = parseFloat(monto);
    if (!monto || isNaN(val) || val <= 0) { setMontoError(true); err = true; }
    if (err) {
      setTimeout(() => { setConceptoError(false); setMontoError(false); }, 1500);
      return;
    }
    const nueva: Transaccion = {
      id: Date.now().toString(36),
      concepto: concepto.trim(),
      monto: val,
      tipo,
      categoria,
      metodoPago: metodo,
      fecha: getFechaStr(),
    };
    setTxns(prev => [nueva, ...prev]);
    setConcepto('');
    setMonto('');
    setSuccessAnim(true);
    setTimeout(() => setSuccessAnim(false), 900);
  };

  const handleDelete = (id: string) => {
    setTxns(prev => prev.filter(t => t.id !== id));
    setConfirmDelete(null);
  };

  const filtered = filtro === 'todos' ? txns : txns.filter(t => t.tipo === filtro);

  const byMethod = txns.reduce((acc, t) => {
    if (!acc[t.metodoPago]) acc[t.metodoPago] = { i: 0, g: 0 };
    if (t.tipo === 'ingreso') acc[t.metodoPago].i += t.monto;
    else acc[t.metodoPago].g += t.monto;
    return acc;
  }, {} as Record<string, { i: number; g: number }>);

  return (
    <div style={styles.wrap}>

      {/* ── TOPBAR ── */}
      <header style={styles.topbar}>
        <div style={styles.topbarBrand}>
          <div style={styles.topbarLogo}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="14" height="14" rx="3" stroke="#fff" strokeWidth="1.6"/>
              <path d="M5.5 9.5l3 3L13 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={styles.topbarName}>FJONIC Studio</div>
            <div style={styles.topbarSub}>Módulo · Flujo de Caja</div>
          </div>
        </div>
        <div style={styles.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* ── HERO BALANCE ── */}
      <section style={styles.hero}>
        <div style={styles.heroLabel}>Balance neto actual</div>
        <div style={{ ...styles.heroAmount, color: balance >= 0 ? '#fff' : '#ff6b6b' }}>
          {formatCOP(balance)}
        </div>
        <div style={styles.heroChips}>
          <Chip color="#05ABC4" label="Ingresos" value={formatCOP(ingresos)} />
          <Chip color="#ff6b6b" label="Egresos"  value={formatCOP(gastos)} />
          <Chip color="#1C75BC" label="Registros" value={String(txns.length)} />
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <div style={styles.main}>

        {/* ─── SIDEBAR FORM ─── */}
        <aside style={styles.sidebar}>

          {/* Tipo de operación */}
          <FormSection icon="⇅" title="Tipo de operación">
            <div style={styles.tipoRow}>
              <TipoBtn
                active={tipo === 'ingreso'} tipo="ingreso"
                onClick={() => setTipo('ingreso')}
                icon="↑" label="Ingreso" desc="Dinero que entra"
                activeColor="#0D3A66"
              />
              <TipoBtn
                active={tipo === 'gasto'} tipo="gasto"
                onClick={() => setTipo('gasto')}
                icon="↓" label="Egreso" desc="Dinero que sale"
                activeColor="#c0392b"
              />
            </div>
          </FormSection>

          {/* Descripción */}
          <FormSection icon="✏️" title="Descripción del movimiento">
            <input
              style={{ ...styles.input, ...(conceptoError ? styles.inputError : {}) }}
              placeholder="Ej. Campaña Meta Ads, Suscripción Figma..."
              value={concepto}
              onChange={e => setConcepto(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            {conceptoError && <span style={styles.errorMsg}>⚠ Ingresa una descripción</span>}
          </FormSection>

          {/* Monto */}
          <FormSection icon="💰" title="Monto en pesos colombianos">
            <div style={styles.montoWrap}>
              <span style={styles.montoPrefix}>COP</span>
              <input
                style={{ ...styles.montoInput, ...(montoError ? styles.inputError : {}) }}
                type="number" min="0" placeholder="0"
                value={monto}
                onChange={e => setMonto(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>
            {montoError && <span style={styles.errorMsg}>⚠ Ingresa un monto válido mayor a 0</span>}
          </FormSection>

          {/* Categoría */}
          <FormSection icon="🏷️" title="Categoría">
            <div style={styles.catGrid}>
              {CATEGORIAS.map(c => (
                <button
                  key={c.label}
                  style={{ ...styles.catBtn, ...(categoria === c.label ? styles.catBtnActive : {}) }}
                  onClick={() => setCategoria(c.label)}
                  title={c.label}
                >
                  <span style={styles.catIcon}>{c.icon}</span>
                  <span style={styles.catLabel}>{c.label}</span>
                </button>
              ))}
            </div>
          </FormSection>

          {/* Método de pago */}
          <FormSection icon="💳" title="Método de pago">
            <div style={styles.methodGrid}>
              {METODOS.map(m => (
                <button
                  key={m.label}
                  style={{ ...styles.methodBtn, ...(metodo === m.label ? styles.methodBtnActive : {}) }}
                  onClick={() => setMetodo(m.label)}
                >
                  <span style={styles.methodIcon}>{m.icon}</span>
                  <span style={styles.methodName}>{m.label}</span>
                  <span style={styles.methodDesc}>{m.desc}</span>
                </button>
              ))}
            </div>
          </FormSection>

          {/* Submit */}
          <button
            style={{ ...styles.submitBtn, ...(successAnim ? styles.submitBtnSuccess : {}) }}
            onClick={handleSubmit}
          >
            {successAnim ? (
              <>✓ <span>¡Registrado!</span></>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M2 8h12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
                <span>Registrar operación</span>
              </>
            )}
          </button>

          {/* Resumen por canal */}
          {Object.keys(byMethod).length > 0 && (
            <div style={styles.methodSummary}>
              <div style={styles.summaryTitle}>
                <span style={{ fontSize: 11 }}>📊</span> Resumen por canal
              </div>
              {Object.entries(byMethod).map(([k, v]) => (
                <div key={k} style={styles.summaryRow}>
                  <span style={styles.summaryKey}>
                    {METODOS.find(m => m.label === k)?.icon} {k}
                  </span>
                  <span style={styles.summaryIn}>+{formatCOP(v.i)}</span>
                  <span style={styles.summaryOut}>−{formatCOP(v.g)}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* ─── RIGHT PANEL ─── */}
        <section style={styles.panel}>

          {/* Stats bar */}
          <div style={styles.statsBar}>
            <StatCard label="Total ingresos" value={formatCOP(ingresos)} color="#0D3A66" icon="↑" />
            <StatCard label="Total egresos"  value={formatCOP(gastos)}   color="#c0392b" icon="↓" />
            <StatCard label="Operaciones"    value={String(txns.length)} color="#1C75BC" icon="#" />
          </div>

          {/* Filter tabs */}
          <div style={styles.filterBar}>
            <div style={styles.filterLabel}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 3h12M3 7h8M5 11h4" stroke="#175A8C" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Filtrar por:
            </div>
            <div style={styles.filterTabs}>
              {(['todos', 'ingreso', 'gasto'] as const).map(f => (
                <button
                  key={f}
                  style={{ ...styles.ftab, ...(filtro === f ? styles.ftabActive : {}) }}
                  onClick={() => setFiltro(f)}
                >
                  {f === 'todos' ? '📋 Todos' : f === 'ingreso' ? '↑ Ingresos' : '↓ Egresos'}
                  {f !== 'todos' && (
                    <span style={{ ...styles.ftabCount, background: f === 'ingreso' ? '#0D3A66' : '#c0392b' }}>
                      {txns.filter(t => t.tipo === f).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction list */}
          <div style={styles.txnList}>
            {filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="10" width="28" height="22" rx="4" stroke="#175A8C" strokeWidth="1.5"/>
                    <path d="M13 18h14M13 23h8" stroke="#175A8C" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20 6v4" stroke="#05ABC4" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={styles.emptyTitle}>Sin registros aún</div>
                <div style={styles.emptyDesc}>
                  Usa el formulario de la izquierda para agregar tu primer movimiento financiero.
                </div>
              </div>
            ) : (
              filtered.map(t => (
                <div key={t.id} style={styles.txnItem}>
                  <div style={{
                    ...styles.txnStripe,
                    background: t.tipo === 'ingreso' ? '#0D3A66' : '#c0392b',
                  }} />
                  <div style={styles.txnIconWrap}>
                    <span style={{ fontSize: 18 }}>
                      {CATEGORIAS.find(c => c.label === t.categoria)?.icon ?? '📁'}
                    </span>
                  </div>
                  <div style={styles.txnMain}>
                    <div style={styles.txnConcept}>{t.concepto}</div>
                    <div style={styles.txnMeta}>
                      <span style={styles.txnDate}>📅 {t.fecha}</span>
                      <span style={styles.txnCat}>{t.categoria}</span>
                      <span style={{
                        ...styles.txnMethod,
                        background: t.metodoPago === 'Bancaria'
                          ? 'rgba(5,171,196,0.12)'
                          : t.metodoPago === 'Efectivo'
                          ? 'rgba(13,58,102,0.1)'
                          : 'rgba(28,117,188,0.1)',
                        color: t.metodoPago === 'Bancaria' ? '#086f80'
                          : t.metodoPago === 'Efectivo' ? '#0D3A66'
                          : '#175A8C',
                      }}>
                        {METODOS.find(m => m.label === t.metodoPago)?.icon} {t.metodoPago}
                      </span>
                    </div>
                  </div>
                  <div style={styles.txnRight}>
                    <div style={{
                      ...styles.txnAmount,
                      color: t.tipo === 'ingreso' ? '#0D3A66' : '#c0392b',
                    }}>
                      {t.tipo === 'ingreso' ? '+' : '−'}{formatCOP(t.monto)}
                    </div>
                    {confirmDelete === t.id ? (
                      <div style={styles.confirmRow}>
                        <span style={styles.confirmLabel}>¿Eliminar?</span>
                        <button style={styles.confirmYes} onClick={() => handleDelete(t.id)}>Sí</button>
                        <button style={styles.confirmNo} onClick={() => setConfirmDelete(null)}>No</button>
                      </div>
                    ) : (
                      <button
                        style={styles.delBtn}
                        onClick={() => setConfirmDelete(t.id)}
                        title="Eliminar registro"
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 3h9M5 3V2h3v1M4 3v7a1 1 0 001 1h3a1 1 0 001-1V3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Chip({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div style={styles.chip}>
      <div style={{ ...styles.chipDot, background: color }} />
      <span style={styles.chipLabel}>{label}</span>
      <span style={styles.chipVal}>{value}</span>
    </div>
  );
}

function TipoBtn({ active, tipo, onClick, icon, label, desc, activeColor }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.tipoBtn,
        background: active ? activeColor : '#f0f4f8',
        border: `2px solid ${active ? activeColor : '#c2d4e4'}`,
        color: active ? '#fff' : '#175A8C',
        transform: active ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>{label}</div>
        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>{desc}</div>
      </div>
      {active && (
        <div style={styles.tipoCheck}>✓</div>
      )}
    </button>
  );
}

function FormSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={styles.formSection}>
      <div style={styles.formSectionTitle}>
        <span style={{ fontSize: 13 }}>{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: color + '18', color }}>{icon}</div>
      <div>
        <div style={styles.statLabel}>{label}</div>
        <div style={{ ...styles.statVal, color }}>{value}</div>
      </div>
    </div>
  );
}

/* ── Styles ── */

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: '100vh',
    background: '#f0f4f8',
    fontFamily: "'DM Sans', sans-serif",
    color: '#0A1F33',
  },

  // Topbar
  topbar: {
    background: '#0A1F33',
    color: '#fff',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    borderBottom: '2px solid #0D3A66',
  },
  topbarBrand: { display: 'flex', alignItems: 'center', gap: 12 },
  topbarLogo: {
    width: 34, height: 34,
    background: '#05ABC4',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  topbarName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 15,
    letterSpacing: '-0.02em', color: '#fff',
  },
  topbarSub: {
    fontSize: 10, color: '#05ABC4',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
  },
  topbarDate: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10, color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.05em',
  },

  // Hero
  hero: {
    background: 'linear-gradient(135deg,#0A1F33 0%,#0D3A66 55%,#175A8C 100%)',
    color: '#fff',
    padding: '2rem 2rem 1.75rem',
    borderBottom: '1px solid #0D3A66',
  },
  heroLabel: {
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.18em', textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.45)', marginBottom: 6,
  },
  heroAmount: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.4rem)',
    letterSpacing: '-0.04em', lineHeight: 1, transition: 'color .3s',
  },
  heroChips: { display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' as const },
  chip: {
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '6px 13px', borderRadius: 100,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
  },
  chipDot: { width: 6, height: 6, borderRadius: '50%' },
  chipLabel: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.07em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' as const,
  },
  chipVal: {
    fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600, color: '#fff',
  },

  // Main layout
  main: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    minHeight: 'calc(100vh - 185px)',
  },

  // Sidebar
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #c2d4e4',
    padding: '1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1rem',
    overflowY: 'auto' as const,
  },
  formSection: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  formSectionTitle: {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    color: '#4a7a9b', fontWeight: 600,
  },

  // Tipo buttons
  tipoRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  tipoBtn: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 14px',
    border: '2px solid #c2d4e4',
    borderRadius: 12, cursor: 'pointer',
    transition: 'all .18s', position: 'relative' as const,
    fontFamily: "'DM Sans', sans-serif",
  },
  tipoCheck: {
    position: 'absolute' as const, top: 6, right: 8,
    fontSize: 11, fontWeight: 700, opacity: 0.9,
  },

  // Input
  input: {
    width: '100%', padding: '10px 14px',
    fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    background: '#f0f4f8', border: '1.5px solid #c2d4e4',
    borderRadius: 10, color: '#0A1F33', outline: 'none',
    transition: 'border .15s',
  },
  inputError: { borderColor: '#c0392b', background: '#fff5f5' },
  errorMsg: { fontSize: 11, color: '#c0392b', marginTop: 2 },
  montoWrap: {
    display: 'flex', alignItems: 'center', gap: 0,
    background: '#f0f4f8', border: '1.5px solid #c2d4e4',
    borderRadius: 10, overflow: 'hidden',
  },
  montoPrefix: {
    padding: '12px 12px 12px 14px',
    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
    color: '#4a7a9b', letterSpacing: '0.05em', fontWeight: 600,
    borderRight: '1px solid #c2d4e4', background: '#e4ecf3',
  },
  montoInput: {
    flex: 1, padding: '12px 14px',
    fontSize: 22, fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 700, color: '#0A1F33',
    background: 'transparent', border: 'none', outline: 'none',
  },

  // Category
  catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 },
  catBtn: {
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '9px 10px',
    border: '1.5px solid #c2d4e4',
    borderRadius: 9, cursor: 'pointer',
    background: '#f0f4f8', transition: 'all .15s',
    fontFamily: "'DM Sans', sans-serif",
  },
  catBtnActive: { background: '#175A8C', borderColor: '#175A8C' },
  catIcon: { fontSize: 14 },
  catLabel: { fontSize: 11, fontWeight: 500 },

  // Method
  methodGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 },
  methodBtn: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4,
    padding: '10px 6px',
    border: '1.5px solid #c2d4e4', borderRadius: 10, cursor: 'pointer',
    background: '#f0f4f8', transition: 'all .15s',
    fontFamily: "'DM Sans', sans-serif",
  },
  methodBtnActive: { background: '#0D3A66', borderColor: '#0D3A66' },
  methodIcon: { fontSize: 18 },
  methodName: { fontSize: 10, fontWeight: 700, letterSpacing: '0.02em', color: 'inherit' },
  methodDesc: { fontSize: 9, opacity: 0.6, color: 'inherit' },

  // Submit
  submitBtn: {
    width: '100%', padding: '15px',
    background: '#1C75BC', color: '#fff',
    border: 'none', borderRadius: 12,
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
    cursor: 'pointer', transition: 'all .18s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
    boxShadow: '0 4px 14px rgba(28,117,188,0.3)',
  },
  submitBtnSuccess: { background: '#0D3A66', boxShadow: '0 4px 14px rgba(13,58,102,0.3)' },

  // Method summary
  methodSummary: {
    background: '#f0f4f8', border: '1px solid #c2d4e4',
    borderRadius: 12, padding: '12px 14px',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
  },
  summaryTitle: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    color: '#4a7a9b', fontWeight: 600,
    display: 'flex', alignItems: 'center', gap: 5,
    marginBottom: 2,
  },
  summaryRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
  },
  summaryKey: { flex: 1, color: '#175A8C', fontWeight: 600 },
  summaryIn:  { color: '#0D3A66', fontWeight: 700 },
  summaryOut: { color: '#c0392b', fontWeight: 700 },

  // Panel
  panel: { background: '#f0f4f8', display: 'flex', flexDirection: 'column' as const },

  statsBar: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
    background: '#fff', borderBottom: '1px solid #c2d4e4',
  },
  statCard: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '1rem 1.5rem', borderRight: '1px solid #c2d4e4',
  },
  statIcon: {
    width: 36, height: 36, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, flexShrink: 0,
  },
  statLabel: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    color: '#4a7a9b', marginBottom: 3,
  },
  statVal: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 15, fontWeight: 700,
  },

  filterBar: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 1.5rem',
    background: '#fff', borderBottom: '1px solid #c2d4e4',
    flexWrap: 'wrap' as const,
  },
  filterLabel: {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.06em', color: '#4a7a9b',
    textTransform: 'uppercase' as const,
  },
  filterTabs: { display: 'flex', gap: 6 },
  ftab: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 100,
    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.05em', cursor: 'pointer',
    border: '1.5px solid #c2d4e4',
    background: '#f0f4f8', color: '#175A8C',
    transition: 'all .15s',
  },
  ftabActive: { background: '#0A1F33', color: '#fff', borderColor: '#0A1F33' },
  ftabCount: {
    color: '#fff', fontSize: 10, fontWeight: 700,
    padding: '1px 6px', borderRadius: 100,
  },

  txnList: { flex: 1, overflowY: 'auto' as const, background: '#fff' },

  txnItem: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 20px',
    borderBottom: '1px solid #e4ecf3',
    transition: 'background .1s',
    position: 'relative' as const,
  },
  txnStripe: { width: 3, height: 40, borderRadius: 3, flexShrink: 0 },
  txnIconWrap: {
    width: 38, height: 38, borderRadius: 10,
    background: '#f0f4f8', border: '1px solid #c2d4e4',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  txnMain: { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 5 },
  txnConcept: { fontSize: 13, fontWeight: 500, color: '#0A1F33' },
  txnMeta: { display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' as const },
  txnDate: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    color: '#4a7a9b', letterSpacing: '0.03em',
  },
  txnCat: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    padding: '2px 7px', borderRadius: 5,
    background: 'rgba(28,117,188,0.1)', color: '#1C75BC',
  },
  txnMethod: {
    fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
    padding: '2px 7px', borderRadius: 5,
  },
  txnRight: {
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'flex-end', gap: 6, flexShrink: 0,
  },
  txnAmount: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 14, fontWeight: 700,
  },
  delBtn: {
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '4px 9px', border: '1px solid #c2d4e4',
    borderRadius: 6, background: '#f0f4f8',
    fontSize: 10, cursor: 'pointer', color: '#4a7a9b',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all .15s',
  },
  confirmRow: { display: 'flex', alignItems: 'center', gap: 5 },
  confirmLabel: { fontSize: 10, color: '#c0392b', fontWeight: 600 },
  confirmYes: {
    padding: '3px 9px', background: '#c0392b', color: '#fff',
    border: 'none', borderRadius: 5, fontSize: 10, cursor: 'pointer', fontWeight: 700,
  },
  confirmNo: {
    padding: '3px 9px', background: '#e4ecf3', color: '#0A1F33',
    border: 'none', borderRadius: 5, fontSize: 10, cursor: 'pointer',
  },

  emptyState: {
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center',
    padding: '4rem 2rem', gap: 12, textAlign: 'center' as const,
  },
  emptyIcon: {
    width: 72, height: 72, borderRadius: 20,
    background: 'rgba(28,117,188,0.07)', border: '1.5px solid #c2d4e4',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: 16, color: '#0A1F33',
  },
  emptyDesc: { fontSize: 13, color: '#4a7a9b', maxWidth: 320, lineHeight: 1.6 },
};