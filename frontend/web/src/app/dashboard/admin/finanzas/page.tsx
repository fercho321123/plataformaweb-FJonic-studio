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
  { label: 'Servicios',    color: '#0D3A66' },
  { label: 'Publicidad',   color: '#1C75BC' },
  { label: 'Herramientas', color: '#175A8C' },
  { label: 'Nómina',       color: '#0D3A66' },
  { label: 'Operacional',  color: '#175A8C' },
  { label: 'Otro',         color: '#4a7a9b' },
];

const METODOS = [
  { label: 'Transferencia', desc: 'Bancaria / PSE' },
  { label: 'Efectivo',      desc: 'Pago en mano' },
  { label: 'Tarjeta',       desc: 'Débito o crédito' },
];

function formatCOP(v: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(v);
}

function getFechaStr() {
  return new Date().toLocaleDateString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ── SVG Icons ──────────────────────────────────────────
function IconUp({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 13V3M3 8l5-5 5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconDown({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8l5 5 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPlus({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 2v12M2 8h12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}
function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5L13 5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTrash({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconBank({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="2.5" y="9" width="17" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 9V8l5.5-5 5.5 5v1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="5.5" y="12" width="2.5" height="4" rx=".5" fill="currentColor"/>
      <rect x="9.75" y="12" width="2.5" height="4" rx=".5" fill="currentColor"/>
      <rect x="14" y="12" width="2.5" height="4" rx=".5" fill="currentColor"/>
    </svg>
  );
}
function IconCash({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="1.5" y="6" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 9v4M16.5 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconCard({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="1.5" y="5" width="19" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M1.5 9h19" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="4" y="12.5" width="5" height="2" rx=".5" fill="currentColor"/>
    </svg>
  );
}
function IconServices() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="9.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="1.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}
function IconAds() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 10.5V5.5l9-3v11l-9-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M11 6.5c1 .5 1.5 2 1.5 2S12 11 11 11M4.5 10.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconTools() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 3a3.5 3.5 0 00-3 5.3L2.5 13.5l1 1L8.7 10A3.5 3.5 0 1010 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IconPayroll() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 13.5c0-2.2 1.8-4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10 10l1.5 1.5L14 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconOps() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconOther() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M6 9.5h4M8 7.5v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconEmpty() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="8" y="14" width="36" height="28" rx="5" stroke="#175A8C" strokeWidth="1.6"/>
      <path d="M17 24h18M17 31h11" stroke="#05ABC4" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M26 8v6" stroke="#175A8C" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

const catIcons: Record<string, React.ReactNode> = {
  Servicios:    <IconServices />,
  Publicidad:   <IconAds />,
  Herramientas: <IconTools />,
  Nómina:       <IconPayroll />,
  Operacional:  <IconOps />,
  Otro:         <IconOther />,
};

// ── Main Component ─────────────────────────────────────
export default function FinanzasPage() {
  const [txns, setTxns]             = useState<Transaccion[]>([]);
  const [tipo, setTipo]             = useState<'ingreso' | 'gasto'>('ingreso');
  const [categoria, setCategoria]   = useState('Servicios');
  const [metodo, setMetodo]         = useState('Transferencia');
  const [filtro, setFiltro]         = useState<'todos' | 'ingreso' | 'gasto'>('todos');
  const [concepto, setConcepto]     = useState('');
  const [monto, setMonto]           = useState('');
  const [conceptoError, setConceptoError] = useState(false);
  const [montoError, setMontoError]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [successAnim, setSuccessAnim]     = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTxns(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(txns)); } catch {}
  }, [txns]);

  const ingresos = txns.filter(t => t.tipo === 'ingreso').reduce((a, t) => a + t.monto, 0);
  const gastos   = txns.filter(t => t.tipo === 'gasto').reduce((a, t) => a + t.monto, 0);
  const balance  = ingresos - gastos;

  const handleSubmit = () => {
    let err = false;
    if (!concepto.trim()) { setConceptoError(true); err = true; }
    const val = parseFloat(monto);
    if (!monto || isNaN(val) || val <= 0) { setMontoError(true); err = true; }
    if (err) { setTimeout(() => { setConceptoError(false); setMontoError(false); }, 1800); return; }
    setTxns(prev => [{
      id: Date.now().toString(36),
      concepto: concepto.trim(), monto: val,
      tipo, categoria, metodoPago: metodo, fecha: getFechaStr(),
    }, ...prev]);
    setConcepto(''); setMonto('');
    setSuccessAnim(true);
    setTimeout(() => setSuccessAnim(false), 1100);
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
    <div style={s.page}>

      {/* TOPBAR */}
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2.5" y="2.5" width="17" height="17" rx="4" stroke="#fff" strokeWidth="1.8"/>
              <path d="M7 11l3 3.5L15 7.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Módulo de Flujo de Caja</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div>
            <div style={s.heroEyebrow}>Balance actual</div>
            <div style={{ ...s.heroAmount, color: balance >= 0 ? '#fff' : '#ff8080' }}>
              {formatCOP(balance)}
            </div>
            <div style={s.heroHint}>
              {balance >= 0 ? 'Tus finanzas están en positivo' : 'Tus egresos superan los ingresos'}
            </div>
          </div>
          <div style={s.heroCards}>
            <HeroCard label="Total ingresos" value={formatCOP(ingresos)} accent="#05ABC4" />
            <HeroCard label="Total egresos"  value={formatCOP(gastos)}   accent="#ff8080" />
            <HeroCard label="Movimientos"    value={String(txns.length)} accent="#1C75BC" />
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={s.body}>

        {/* FORM */}
        <aside style={s.form}>
          <div style={s.formHeader}>
            <div style={s.formHeaderBar} />
            <span style={s.formHeaderTitle}>Registrar movimiento</span>
          </div>

          {/* Tipo */}
          <Field label="¿Qué tipo de movimiento es?">
            <div style={s.tipoRow}>
              <TipoBtn
                active={tipo === 'ingreso'}
                onClick={() => setTipo('ingreso')}
                icon={<IconUp size={24} color={tipo === 'ingreso' ? '#fff' : '#0D3A66'} />}
                label="Ingreso"
                desc="Dinero que entra"
                activeBg="#0D3A66"
              />
              <TipoBtn
                active={tipo === 'gasto'}
                onClick={() => setTipo('gasto')}
                icon={<IconDown size={24} color={tipo === 'gasto' ? '#fff' : '#b83232'} />}
                label="Egreso"
                desc="Dinero que sale"
                activeBg="#b83232"
              />
            </div>
          </Field>

          {/* Descripción */}
          <Field label="¿De qué trata este movimiento?">
            <input
              style={{ ...s.input, ...(conceptoError ? s.inputErr : {}) }}
              placeholder="Ej: Campaña Meta Ads, Suscripción Figma..."
              value={concepto}
              onChange={e => { setConcepto(e.target.value); setConceptoError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            {conceptoError
              ? <Msg type="error">Por favor escribe una descripción del movimiento.</Msg>
              : <Msg type="hint">Sé específico para entender el historial fácilmente.</Msg>
            }
          </Field>

          {/* Monto */}
          <Field label="Valor en pesos colombianos">
            <div style={{ ...s.montoBox, ...(montoError ? { borderColor: '#b83232' } : {}) }}>
              <span style={s.montoSign}>$</span>
              <input
                style={s.montoInput}
                type="number" min="0" placeholder="0"
                value={monto}
                onChange={e => { setMonto(e.target.value); setMontoError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
              <span style={s.montoCOP}>COP</span>
            </div>
            {montoError
              ? <Msg type="error">Ingresa un valor mayor a cero.</Msg>
              : <Msg type="hint">Solo números, sin puntos ni comas.</Msg>
            }
          </Field>

          {/* Categoría */}
          <Field label="Selecciona una categoría">
            <div style={s.catGrid}>
              {CATEGORIAS.map(c => (
                <button
                  key={c.label}
                  style={{
                    ...s.catBtn,
                    ...(categoria === c.label
                      ? { background: c.color, borderColor: c.color, color: '#fff' }
                      : {}),
                  }}
                  onClick={() => setCategoria(c.label)}
                >
                  <span style={{ color: categoria === c.label ? '#fff' : c.color, display: 'flex' }}>
                    {catIcons[c.label]}
                  </span>
                  <span style={s.catLabel}>{c.label}</span>
                  {categoria === c.label && (
                    <span style={s.checkmark}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 6.5l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Field>

          {/* Método */}
          <Field label="¿Cómo se realizó el pago?">
            <div style={s.methodCol}>
              {METODOS.map(m => (
                <button
                  key={m.label}
                  style={{
                    ...s.methodBtn,
                    ...(metodo === m.label
                      ? { background: '#0A1F33', borderColor: '#0A1F33' }
                      : {}),
                  }}
                  onClick={() => setMetodo(m.label)}
                >
                  <span style={{ color: metodo === m.label ? '#05ABC4' : '#175A8C', display: 'flex' }}>
                    {m.label === 'Transferencia' ? <IconBank size={24} />
                     : m.label === 'Efectivo'    ? <IconCash size={24} />
                     : <IconCard size={24} />}
                  </span>
                  <div>
                    <div style={{ ...s.methodLabel, color: metodo === m.label ? '#fff' : '#0A1F33' }}>
                      {m.label}
                    </div>
                    <div style={{ ...s.methodDesc, color: metodo === m.label ? 'rgba(255,255,255,0.55)' : '#4a7a9b' }}>
                      {m.desc}
                    </div>
                  </div>
                  {metodo === m.label && (
                    <span style={{ ...s.checkmark, marginLeft: 'auto' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5 6.5-7" stroke="#05ABC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Field>

          {/* Guardar */}
          <button
            style={{ ...s.saveBtn, ...(successAnim ? s.saveBtnOk : {}) }}
            onClick={handleSubmit}
          >
            {successAnim
              ? <><IconCheck size={20} /><span>Guardado correctamente</span></>
              : <><IconPlus size={20} /><span>Guardar movimiento</span></>
            }
          </button>

          {/* Resumen por canal */}
          {Object.keys(byMethod).length > 0 && (
            <div style={s.canalBox}>
              <div style={s.canalTitle}>Resumen por método de pago</div>
              {Object.entries(byMethod).map(([k, v]) => (
                <div key={k} style={s.canalRow}>
                  <div style={s.canalKey}>
                    <span style={{ color: '#175A8C', display: 'flex' }}>
                      {k === 'Transferencia' ? <IconBank size={14} />
                       : k === 'Efectivo'    ? <IconCash size={14} />
                       : <IconCard size={14} />}
                    </span>
                    {k}
                  </div>
                  <span style={s.canalIn}>+{formatCOP(v.i)}</span>
                  <span style={s.canalOut}>−{formatCOP(v.g)}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* LIST */}
        <section style={s.listPanel}>

          {/* Stat row */}
          <div style={s.statRow}>
            <StatCard icon={<IconUp size={20} color="#0D3A66" />}    label="Ingresos totales" value={formatCOP(ingresos)} color="#0D3A66" bg="rgba(13,58,102,0.08)" />
            <StatCard icon={<IconDown size={20} color="#b83232" />}  label="Egresos totales"  value={formatCOP(gastos)}   color="#b83232" bg="rgba(184,50,50,0.08)" />
            <StatCard icon={<IconServices />}                        label="Operaciones"      value={String(txns.length)} color="#1C75BC" bg="rgba(28,117,188,0.08)" />
          </div>

          {/* Filtro */}
          <div style={s.filterBar}>
            <span style={s.filterBarLabel}>Mostrar:</span>
            <div style={s.filterTabs}>
              {[
                { key: 'todos',   label: 'Todos los registros' },
                { key: 'ingreso', label: 'Ingresos' },
                { key: 'gasto',   label: 'Egresos' },
              ].map(f => (
                <button
                  key={f.key}
                  style={{ ...s.ftab, ...(filtro === f.key ? s.ftabActive : {}) }}
                  onClick={() => setFiltro(f.key as any)}
                >
                  {f.label}
                  {f.key !== 'todos' && (
                    <span style={{
                      ...s.ftabBadge,
                      background: f.key === 'ingreso' ? '#0D3A66' : '#b83232',
                    }}>
                      {txns.filter(t => t.tipo === f.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div style={s.txnList}>
            {filtered.length === 0 ? (
              <div style={s.empty}>
                <div style={s.emptyIconBox}><IconEmpty /></div>
                <div style={s.emptyTitle}>No hay registros aún</div>
                <div style={s.emptyDesc}>
                  Usa el formulario de la izquierda para agregar tu primer ingreso o egreso.
                  Los registros se guardan automáticamente en este dispositivo.
                </div>
              </div>
            ) : (
              filtered.map((t, i) => (
                <div key={t.id} style={{ ...s.txnItem, background: i % 2 === 0 ? '#fff' : '#fafbfd' }}>
                  <div style={{ ...s.txnStripe, background: t.tipo === 'ingreso' ? '#0D3A66' : '#b83232' }} />
                  <div style={{
                    ...s.txnIconBox,
                    background: t.tipo === 'ingreso' ? 'rgba(13,58,102,0.08)' : 'rgba(184,50,50,0.08)',
                  }}>
                    {t.tipo === 'ingreso'
                      ? <IconUp size={18} color="#0D3A66" />
                      : <IconDown size={18} color="#b83232" />}
                  </div>
                  <div style={s.txnBody}>
                    <div style={s.txnConcept}>{t.concepto}</div>
                    <div style={s.txnMeta}>
                      <span style={s.txnDate}>{t.fecha}</span>
                      <span style={{ ...s.txnTag, background: 'rgba(28,117,188,0.1)', color: '#1C75BC' }}>
                        {t.categoria}
                      </span>
                      <span style={{ ...s.txnTag, background: 'rgba(5,171,196,0.1)', color: '#086f80' }}>
                        {t.metodoPago}
                      </span>
                    </div>
                  </div>
                  <div style={s.txnRight}>
                    <div style={{ ...s.txnAmount, color: t.tipo === 'ingreso' ? '#0D3A66' : '#b83232' }}>
                      {t.tipo === 'ingreso' ? '+' : '−'}{formatCOP(t.monto)}
                    </div>
                    {confirmDelete === t.id ? (
                      <div style={s.confirmRow}>
                        <span style={s.confirmQ}>¿Eliminar?</span>
                        <button style={s.confirmYes} onClick={() => handleDelete(t.id)}>Sí</button>
                        <button style={s.confirmNo} onClick={() => setConfirmDelete(null)}>Cancelar</button>
                      </div>
                    ) : (
                      <button style={s.delBtn} onClick={() => setConfirmDelete(t.id)}>
                        <IconTrash size={14} />
                        <span>Eliminar</span>
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

// ── Sub-components ──────────────────────────────────────

function HeroCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...s.heroCard, borderTop: `3px solid ${accent}` }}>
      <div style={s.heroCardLabel}>{label}</div>
      <div style={s.heroCardVal}>{value}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={s.field}>
      <label style={s.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function Msg({ type, children }: { type: 'error' | 'hint'; children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, marginTop: 4, color: type === 'error' ? '#b83232' : '#4a7a9b', fontWeight: type === 'error' ? 500 : 400 }}>
      {children}
    </div>
  );
}

function TipoBtn({ active, onClick, icon, label, desc, activeBg }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        ...s.tipoBtn,
        background: active ? activeBg : '#f4f7fb',
        borderColor: active ? activeBg : '#d0dce8',
        transform: active ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      {icon}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: active ? '#fff' : '#0A1F33', lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 12, color: active ? 'rgba(255,255,255,0.6)' : '#4a7a9b', marginTop: 2 }}>{desc}</div>
      </div>
      {active && (
        <div style={{ marginLeft: 'auto' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, color, bg }: any) {
  return (
    <div style={{ ...s.statCard, borderTop: `3px solid ${color}` }}>
      <div style={{ ...s.statIconBox, background: bg, color }}>{icon}</div>
      <div>
        <div style={s.statLabel}>{label}</div>
        <div style={{ ...s.statVal, color }}>{value}</div>
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#eef2f7', fontFamily: "'DM Sans','Segoe UI',sans-serif", color: '#0A1F33' },

  topbar:       { background: '#0A1F33', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, borderBottom: '3px solid #0D3A66' },
  topbarLeft:   { display: 'flex', alignItems: 'center', gap: 14 },
  logo:         { width: 42, height: 42, background: '#05ABC4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  topbarName:   { fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' },
  topbarModule: { fontSize: 11, color: '#05ABC4', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 1 },
  topbarDate:   { fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' as const },

  hero:       { background: 'linear-gradient(135deg,#0A1F33 0%,#0D3A66 55%,#175A8C 100%)', padding: '2.25rem 2rem 2rem', borderBottom: '1px solid #0D3A66' },
  heroInner:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' as const },
  heroEyebrow:{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 6 },
  heroAmount: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', lineHeight: 1, transition: 'color .3s' },
  heroHint:   { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  heroCards:  { display: 'flex', gap: 10, flexWrap: 'wrap' as const },
  heroCard:   { background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 20px', minWidth: 148 },
  heroCardLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 },
  heroCardVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: '#fff' },

  body: { display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: 'calc(100vh - 200px)' },

  form:            { background: '#fff', borderRight: '1px solid #d0dce8', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column' as const, gap: '1.3rem', overflowY: 'auto' as const },
  formHeader:      { display: 'flex', alignItems: 'center', gap: 10, paddingBottom: '1rem', borderBottom: '2px solid #eef2f7' },
  formHeaderBar:   { width: 14, height: 14, borderRadius: 4, background: '#05ABC4', flexShrink: 0 },
  formHeaderTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: '#0A1F33', letterSpacing: '-0.01em' },

  field:      { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: 700, color: '#0A1F33', letterSpacing: '-0.01em' },

  tipoRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  tipoBtn: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 14px', border: '2px solid #d0dce8',
    borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
    transition: 'all .18s', textAlign: 'left' as const,
  },

  input:    { padding: '13px 15px', fontSize: 15, fontFamily: 'inherit', background: '#f4f7fb', border: '1.5px solid #d0dce8', borderRadius: 10, color: '#0A1F33', outline: 'none', width: '100%', transition: 'border .15s' },
  inputErr: { borderColor: '#b83232 !important', background: '#fff8f8' },

  montoBox:   { display: 'flex', alignItems: 'center', background: '#f4f7fb', border: '1.5px solid #d0dce8', borderRadius: 10, overflow: 'hidden', transition: 'border .15s' },
  montoSign:  { padding: '13px 13px 13px 16px', fontSize: 22, fontWeight: 700, color: '#0D3A66', background: '#e8f0f7', borderRight: '1px solid #d0dce8', lineHeight: 1 },
  montoInput: { flex: 1, padding: '13px 12px', fontSize: 26, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: '#0A1F33', background: 'transparent', border: 'none', outline: 'none' },
  montoCOP:   { padding: '0 14px', fontSize: 12, color: '#4a7a9b', letterSpacing: '0.06em', fontWeight: 700 },

  catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  catBtn: {
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '11px 12px', border: '1.5px solid #d0dce8',
    borderRadius: 9, cursor: 'pointer', background: '#f4f7fb',
    transition: 'all .15s', fontFamily: 'inherit',
    position: 'relative' as const, color: '#0A1F33',
  },
  catLabel:  { fontSize: 13, fontWeight: 600, flex: 1, textAlign: 'left' as const },
  checkmark: { display: 'flex', alignItems: 'center', justifyContent: 'center' },

  methodCol: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  methodBtn: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '13px 15px', border: '1.5px solid #d0dce8',
    borderRadius: 10, cursor: 'pointer', background: '#f4f7fb',
    transition: 'all .15s', fontFamily: 'inherit',
  },
  methodLabel: { fontSize: 15, fontWeight: 700, lineHeight: 1.2 },
  methodDesc:  { fontSize: 12, marginTop: 2 },

  saveBtn: {
    width: '100%', padding: '17px', background: '#1C75BC', color: '#fff',
    border: 'none', borderRadius: 12,
    fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 700, fontSize: 16,
    cursor: 'pointer', transition: 'all .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 4px 18px rgba(28,117,188,0.28)', letterSpacing: '-0.01em',
  },
  saveBtnOk: { background: '#0D3A66', boxShadow: '0 4px 18px rgba(13,58,102,0.3)' },

  canalBox:   { background: '#f4f7fb', border: '1px solid #d0dce8', borderRadius: 12, padding: '15px 16px', display: 'flex', flexDirection: 'column' as const, gap: 10 },
  canalTitle: { fontSize: 12, fontWeight: 700, color: '#175A8C', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 2 },
  canalRow:   { display: 'flex', alignItems: 'center', gap: 8 },
  canalKey:   { flex: 1, fontSize: 13, fontWeight: 600, color: '#175A8C', display: 'flex', alignItems: 'center', gap: 6 },
  canalIn:    { fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: '#0D3A66', fontWeight: 700 },
  canalOut:   { fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: '#b83232', fontWeight: 700 },

  listPanel: { background: '#eef2f7', display: 'flex', flexDirection: 'column' as const },

  statRow:   { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: '#fff', borderBottom: '1px solid #d0dce8' },
  statCard:  { display: 'flex', alignItems: 'center', gap: 14, padding: '1.2rem 1.5rem', borderRight: '1px solid #d0dce8' },
  statIconBox: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statLabel: { fontSize: 11, color: '#4a7a9b', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.07em' },
  statVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700 },

  filterBar:      { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 1.5rem', background: '#fff', borderBottom: '1px solid #d0dce8', flexWrap: 'wrap' as const },
  filterBarLabel: { fontSize: 14, fontWeight: 600, color: '#4a7a9b' },
  filterTabs:     { display: 'flex', gap: 8, flexWrap: 'wrap' as const },
  ftab: { padding: '9px 18px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: '1.5px solid #d0dce8', background: '#f4f7fb', color: '#175A8C', transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' },
  ftabActive:  { background: '#0A1F33', color: '#fff', borderColor: '#0A1F33' },
  ftabBadge:   { color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100 },

  txnList: { flex: 1, overflowY: 'auto' as const },
  txnItem: { display: 'flex', alignItems: 'center', gap: 14, padding: '15px 20px', borderBottom: '1px solid #e4ecf3', transition: 'background .1s' },
  txnStripe:  { width: 4, height: 48, borderRadius: 4, flexShrink: 0 },
  txnIconBox: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  txnBody:    { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 6 },
  txnConcept: { fontSize: 15, fontWeight: 600, color: '#0A1F33', letterSpacing: '-0.01em' },
  txnMeta:    { display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' as const },
  txnDate:    { fontSize: 12, color: '#4a7a9b', fontFamily: "'JetBrains Mono',monospace" },
  txnTag:     { fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 5, letterSpacing: '0.02em' },
  txnRight:   { display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 7, flexShrink: 0 },
  txnAmount:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700 },

  delBtn: { display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', border: '1px solid #d0dce8', borderRadius: 7, background: '#f4f7fb', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: '#4a7a9b', transition: 'all .15s', fontFamily: 'inherit' },

  confirmRow: { display: 'flex', alignItems: 'center', gap: 6 },
  confirmQ:   { fontSize: 13, color: '#b83232', fontWeight: 700 },
  confirmYes: { padding: '6px 12px', background: '#b83232', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  confirmNo:  { padding: '6px 12px', background: '#e8f0f7', color: '#0A1F33', border: 'none', borderRadius: 7, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' },

  empty:       { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', gap: 16, textAlign: 'center' as const, background: '#fff', flex: 1 },
  emptyIconBox: { width: 88, height: 88, borderRadius: 22, background: 'rgba(28,117,188,0.07)', border: '1.5px solid #d0dce8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  emptyTitle:  { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 22, color: '#0A1F33' },
  emptyDesc:   { fontSize: 15, color: '#4a7a9b', maxWidth: 360, lineHeight: 1.7 },
};