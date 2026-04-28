'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

// ── SVG Icons ──────────────────────────────────────────────────────────────────
function IconUserPlus({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="8" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M2 17c0-3.3 2.7-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M14 12v6M11 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function IconTrash({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconGlobe({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  );
}
function IconInstagram({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="11.5" cy="4.5" r="0.6" fill="currentColor"/>
    </svg>
  );
}
function IconMail({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1.5 5l5.5 3.5L12.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconUser({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconBriefcase({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="5" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 5V4a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  );
}
function IconDollar({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M5 4.5C5 3.4 5.9 3 7 3s2 .7 2 1.5S8.1 6 7 6 5 6.7 5 7.5 5.9 9 7 9s2-.7 2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconShield({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5l6 2.5v4.5c0 3-2.5 5.5-6 6.5C2.5 14 0 11.5 0 8.5V4l6-2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5L13 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconSpinner({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
      <path d="M8 2a6 6 0 016 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
function IconEmpty({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <rect x="8" y="14" width="36" height="28" rx="5" stroke="#175A8C" strokeWidth="1.6"/>
      <circle cx="26" cy="24" r="5" stroke="#05ABC4" strokeWidth="1.5"/>
      <path d="M16 42c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#175A8C" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconLoading() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
      <circle cx="20" cy="20" r="16" stroke="rgba(5,171,196,0.2)" strokeWidth="3"/>
      <path d="M20 4a16 16 0 0116 16" stroke="#05ABC4" strokeWidth="3" strokeLinecap="round"/>
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

const OBJETIVOS = ['Ventas', 'Leads', 'Branding', 'Engagement'];

const OBJETIVO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  Ventas:     { label: 'Ventas / Conversión',   color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  Leads:      { label: 'Captación de Leads',    color: '#1C75BC', bg: 'rgba(28,117,188,0.1)' },
  Branding:   { label: 'Impacto de Marca',      color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  Engagement: { label: 'Interacción Social',    color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
};

// ── Sub-components ─────────────────────────────────────────────────────────────
function Field({
  label, icon, children,
}: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={s.field}>
      <label style={s.fieldLabel}>
        {icon && <span style={{ display: 'flex', color: '#4a7a9b' }}>{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

function InputIcon({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={s.inputIconWrap}>
      <span style={s.inputIcon}>{icon}</span>
      {children}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function PaginaClientes() {
  const { token } = useAuth();

  const [clientes, setClientes]   = useState<any[]>([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState('');
  const [successAnim, setSuccessAnim] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [datosFormulario, setDatosFormulario] = useState({
    nombre:     '',
    email:      '',
    empresa:    '',
    sitioWeb:   '',
    presupuesto:'',
    objetivo:   'Ventas',
    instagram:  '',
  });

  const set = (field: string, value: string) =>
    setDatosFormulario(prev => ({ ...prev, [field]: value }));

  const cargarClientes = async () => {
    try {
      setCargando(true);
      const data = await apiFetch('/clientes');
      setClientes(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { if (token) cargarClientes(); }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiFetch('/clientes', {
        method: 'POST',
        body: JSON.stringify(datosFormulario),
      });
      setDatosFormulario({
        nombre: '', email: '', empresa: '', sitioWeb: '',
        presupuesto: '', objetivo: 'Ventas', instagram: '',
      });
      setSuccessAnim(true);
      setTimeout(() => setSuccessAnim(false), 1100);
      cargarClientes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eliminarCliente = async (id: string) => {
    try {
      await apiFetch(`/clientes/${id}`, { method: 'DELETE' });
      setClientes(prev => prev.filter(c => c.id !== id));
      setConfirmDelete(null);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el cliente');
    }
  };

  const presupuestoTotal = clientes.reduce((a, c) => a + Number(c.presupuesto || 0), 0);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* TOPBAR */}
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}><IconShield size={18} /></div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Gestión de Clientes</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div>
            <div style={s.heroEyebrow}>Cuentas activas</div>
            <div style={s.heroAmount}>{clientes.length}</div>
            <div style={s.heroHint}>
              {clientes.length === 0
                ? 'Aún no hay clientes registrados'
                : `${clientes.length} cliente${clientes.length !== 1 ? 's' : ''} en el ecosistema`}
            </div>
          </div>
          <div style={s.heroCards}>
            <HeroCard label="Clientes registrados"  value={String(clientes.length)}    accent="#05ABC4" />
            <HeroCard label="Inversión total"        value={formatCOP(presupuestoTotal)} accent="#1C75BC" />
            <HeroCard label="Objetivos activos"      value={String(new Set(clientes.map(c => c.objetivo)).size)} accent="#175A8C" />
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={s.body}>

        {/* ── SIDEBAR FORM ── */}
        <aside style={s.sidebar}>
          <div style={s.formHeader}>
            <div style={s.formHeaderIcon}><IconUserPlus size={20} /></div>
            <div>
              <div style={s.formHeaderTitle}>Nuevo cliente</div>
              <div style={s.formHeaderSub}>Registra un nuevo cliente en el sistema</div>
            </div>
          </div>

          <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <Field label="Nombre de contacto" icon={<IconUser size={13} />}>
              <InputIcon icon={<IconUser size={14} />}>
                <input
                  required
                  style={s.inputWithIcon}
                  placeholder="Ej: María García"
                  value={datosFormulario.nombre}
                  onChange={e => set('nombre', e.target.value)}
                />
              </InputIcon>
            </Field>

            <Field label="Correo electrónico" icon={<IconMail size={13} />}>
              <InputIcon icon={<IconMail size={14} />}>
                <input
                  required
                  type="email"
                  style={s.inputWithIcon}
                  placeholder="correo@empresa.com"
                  value={datosFormulario.email}
                  onChange={e => set('email', e.target.value)}
                />
              </InputIcon>
            </Field>

            <Field label="Empresa o marca" icon={<IconBriefcase size={13} />}>
              <InputIcon icon={<IconBriefcase size={14} />}>
                <input
                  required
                  style={s.inputWithIcon}
                  placeholder="Nombre de la empresa"
                  value={datosFormulario.empresa}
                  onChange={e => set('empresa', e.target.value)}
                />
              </InputIcon>
            </Field>

            <div style={s.twoColFields}>
              <Field label="Sitio web">
                <input
                  style={s.input}
                  placeholder="url.com"
                  value={datosFormulario.sitioWeb}
                  onChange={e => set('sitioWeb', e.target.value)}
                />
              </Field>
              <Field label="Instagram">
                <input
                  style={s.input}
                  placeholder="@handle"
                  value={datosFormulario.instagram}
                  onChange={e => set('instagram', e.target.value)}
                />
              </Field>
            </div>

            <Field label="Objetivo estratégico">
              <div style={s.selectWrap}>
                <select
                  style={s.select}
                  value={datosFormulario.objetivo}
                  onChange={e => set('objetivo', e.target.value)}
                >
                  <option value="Ventas">Ventas / ROAS</option>
                  <option value="Leads">Captación de Leads</option>
                  <option value="Branding">Branding / Alcance</option>
                  <option value="Engagement">Interacción Social</option>
                </select>
                <div style={s.selectArrow}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="#4a7a9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Field>

            <Field label="Presupuesto mensual (COP)" icon={<IconDollar size={13} />}>
              <div style={s.montoBox}>
                <span style={s.montoSign}>$</span>
                <input
                  type="number"
                  style={s.montoInput}
                  placeholder="0"
                  value={datosFormulario.presupuesto}
                  onChange={e => set('presupuesto', e.target.value)}
                />
                <span style={s.montoCOP}>COP</span>
              </div>
              <div style={s.fieldHint}>Solo números, sin puntos ni comas.</div>
            </Field>

            {error && (
              <div style={s.errorBox}>{error}</div>
            )}

            <button
              type="submit"
              style={{
                ...s.submitBtn,
                ...(successAnim ? { background: '#0D3A66' } : {}),
              }}
            >
              {successAnim
                ? <><IconCheck size={18} /><span>Cliente registrado</span></>
                : <><IconUserPlus size={18} /><span>Registrar cliente</span></>
              }
            </button>
          </form>

          {/* Distribución por objetivo */}
          {clientes.length > 0 && (
            <div style={s.summaryBox}>
              <div style={s.summaryTitle}>Distribución por objetivo</div>
              {OBJETIVOS.map(obj => {
                const count = clientes.filter(c => c.objetivo === obj).length;
                if (!count) return null;
                const pct = Math.round((count / clientes.length) * 100);
                const cfg = OBJETIVO_CONFIG[obj];
                return (
                  <div key={obj} style={s.summaryRow}>
                    <div style={{ ...s.summaryDot, background: cfg.color }} />
                    <span style={s.summaryLabel}>{obj}</span>
                    <div style={s.summaryBarWrap}>
                      <div style={{ ...s.summaryBar, width: `${pct}%`, background: cfg.color }} />
                    </div>
                    <span style={s.summaryCount}>{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* ── LIST PANEL ── */}
        <section style={s.listPanel}>

          {/* Stat row */}
          <div style={s.statRow}>
            <StatCard icon={<IconUser size={20} />}      label="Clientes totales"  value={String(clientes.length)}    color="#0D3A66" bg="rgba(13,58,102,0.08)" />
            <StatCard icon={<IconDollar size={20} />}    label="Inversión total"   value={formatCOP(presupuestoTotal)} color="#1C75BC" bg="rgba(28,117,188,0.08)" />
            <StatCard icon={<IconBriefcase size={20} />} label="Objetivos únicos"  value={String(new Set(clientes.map(c => c.objetivo)).size)} color="#175A8C" bg="rgba(23,90,140,0.08)" />
          </div>

          {/* Client list */}
          <div style={s.listInner}>

            {cargando && (
              <div style={s.loadingState}>
                <IconLoading />
                <div style={s.loadingText}>Cargando clientes...</div>
              </div>
            )}

            {!cargando && clientes.length === 0 && (
              <div style={s.empty}>
                <div style={s.emptyIconBox}><IconEmpty size={52} /></div>
                <div style={s.emptyTitle}>No hay clientes registrados</div>
                <div style={s.emptyDesc}>
                  Usa el formulario de la izquierda para registrar el primer cliente en el sistema.
                </div>
              </div>
            )}

            {!cargando && clientes.map((c, i) => {
              const cfg = OBJETIVO_CONFIG[c.objetivo] || OBJETIVO_CONFIG['Ventas'];
              const initials = c.empresa?.slice(0, 2).toUpperCase() || 'CL';
              return (
                <ClientCard
                  key={c.id}
                  c={c}
                  cfg={cfg}
                  initials={initials}
                  index={i}
                  confirmDelete={confirmDelete}
                  onDeleteRequest={() => setConfirmDelete(c.id)}
                  onDeleteConfirm={() => eliminarCliente(c.id)}
                  onDeleteCancel={() => setConfirmDelete(null)}
                />
              );
            })}
          </div>
        </section>
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

// ── StatCard ───────────────────────────────────────────────────────────────────
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

// ── ClientCard ─────────────────────────────────────────────────────────────────
function ClientCard({
  c, cfg, initials, index, confirmDelete,
  onDeleteRequest, onDeleteConfirm, onDeleteCancel,
}: any) {
  const formatCOP = (v: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

  return (
    <div style={{ ...s.clientCard, borderTop: `3px solid ${cfg.color}` }}>

      {/* Left: avatar + info */}
      <div style={s.clientLeft}>
        <div style={s.clientAvatar}>{initials}</div>
        <div style={s.clientInfo}>
          <div style={s.clientEmpresa}>{c.empresa}</div>
          <div style={s.clientMeta}>
            <span style={s.clientNombre}>
              <IconUser size={11} />
              {c.nombre}
            </span>
            <span style={s.clientDot} />
            <span style={s.clientEmail}>
              <IconMail size={11} />
              {c.email}
            </span>
          </div>
        </div>
      </div>

      {/* Right: data + actions */}
      <div style={s.clientRight}>

        <div style={s.clientDataGrid}>
          <div style={s.clientDataItem}>
            <div style={s.clientDataLabel}>Objetivo</div>
            <span style={{ ...s.objetivoBadge, background: cfg.bg, color: cfg.color }}>
              {cfg.label}
            </span>
          </div>
          <div style={s.clientDataItem}>
            <div style={s.clientDataLabel}>Presupuesto mensual</div>
            <div style={s.clientDataVal}>{formatCOP(Number(c.presupuesto || 0))}</div>
          </div>
        </div>

        <div style={s.clientActions}>
          {c.sitioWeb && (
            <a
              href={`https://${c.sitioWeb}`}
              target="_blank"
              rel="noopener noreferrer"
              style={s.linkBtn}
              title={`Visitar ${c.sitioWeb}`}
            >
              <IconGlobe size={14} />
              <span>Web</span>
            </a>
          )}
          {c.instagram && (
            <a
              href={`https://instagram.com/${c.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...s.linkBtn, color: '#c2185b', borderColor: 'rgba(194,24,91,0.2)' }}
              title={`Ver ${c.instagram} en Instagram`}
            >
              <IconInstagram size={14} />
              <span>{c.instagram}</span>
            </a>
          )}

          {confirmDelete === c.id ? (
            <div style={s.confirmRow}>
              <span style={s.confirmQ}>¿Eliminar?</span>
              <button style={s.confirmYes} onClick={onDeleteConfirm}>Sí</button>
              <button style={s.confirmNo}  onClick={onDeleteCancel}>No</button>
            </div>
          ) : (
            <button style={s.deleteBtn} onClick={onDeleteRequest} title="Eliminar cliente">
              <IconTrash size={14} />
              <span>Eliminar</span>
            </button>
          )}
        </div>
      </div>
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
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, color: '#fff',
  },
  topbarName:   { fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: '-0.02em' },
  topbarModule: { fontSize: 11, color: '#05ABC4', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 1 },
  topbarDate:   { fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' as const },

  // Hero
  hero: {
    background: 'linear-gradient(135deg,#0A1F33 0%,#0D3A66 55%,#175A8C 100%)',
    padding: '2.25rem 2rem 2rem',
    borderBottom: '1px solid #0D3A66',
  },
  heroInner:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' as const },
  heroEyebrow: { fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 6 },
  heroAmount:  { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' },
  heroHint:    { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  heroCards:   { display: 'flex', gap: 10, flexWrap: 'wrap' as const },
  heroCard: {
    background: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '14px 20px', minWidth: 160,
  },
  heroCardLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 5 },
  heroCardVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: '#fff' },

  // Body
  body: { display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: 'calc(100vh - 200px)' },

  // Sidebar
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #d0dce8',
    padding: '1.75rem 1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1.25rem',
    overflowY: 'auto' as const,
  },
  formHeader: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    paddingBottom: '1rem', borderBottom: '2px solid #eef2f7',
  },
  formHeaderIcon: {
    width: 44, height: 44, borderRadius: 10,
    background: '#05ABC4',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', flexShrink: 0,
  },
  formHeaderTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: '#0A1F33', letterSpacing: '-0.01em' },
  formHeaderSub:   { fontSize: 12, color: '#4a7a9b', marginTop: 2 },

  field:     { display: 'flex', flexDirection: 'column' as const, gap: 7 },
  fieldLabel:{ fontSize: 14, fontWeight: 700, color: '#0A1F33', display: 'flex', alignItems: 'center', gap: 5 },
  fieldHint: { fontSize: 12, color: '#4a7a9b', marginTop: 2 },

  twoColFields: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },

  inputIconWrap: {
    display: 'flex', alignItems: 'center',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, overflow: 'hidden',
  },
  inputIcon: {
    padding: '0 10px 0 14px', color: '#4a7a9b',
    display: 'flex', alignItems: 'center', flexShrink: 0,
  },
  inputWithIcon: {
    flex: 1, padding: '12px 14px 12px 4px',
    fontSize: 14, fontFamily: 'inherit',
    background: 'transparent', border: 'none', outline: 'none',
    color: '#0A1F33',
  },
  input: {
    padding: '12px 14px', fontSize: 14, fontFamily: 'inherit',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, color: '#0A1F33', outline: 'none', width: '100%',
  },

  selectWrap: { position: 'relative' as const },
  select: {
    width: '100%', padding: '12px 40px 12px 14px',
    fontSize: 14, fontFamily: 'inherit',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, color: '#0A1F33', outline: 'none',
    appearance: 'none' as const, WebkitAppearance: 'none' as const, cursor: 'pointer',
  },
  selectArrow: {
    position: 'absolute' as const, right: 14, top: '50%',
    transform: 'translateY(-50%)', pointerEvents: 'none' as const,
  },

  montoBox: {
    display: 'flex', alignItems: 'center',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, overflow: 'hidden',
  },
  montoSign: {
    padding: '12px 11px 12px 15px', fontSize: 20, fontWeight: 700,
    color: '#0D3A66', background: '#e8f0f7', borderRight: '1px solid #d0dce8', lineHeight: 1,
  },
  montoInput: {
    flex: 1, padding: '12px 10px',
    fontSize: 20, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
    color: '#0A1F33', background: 'transparent', border: 'none', outline: 'none',
  },
  montoCOP: { padding: '0 14px', fontSize: 12, color: '#4a7a9b', letterSpacing: '0.06em', fontWeight: 700 },

  errorBox: {
    padding: '12px 15px', borderRadius: 10,
    background: 'rgba(184,50,50,0.08)', border: '1.5px solid #b83232',
    color: '#b83232', fontSize: 13, fontWeight: 500,
  },

  submitBtn: {
    width: '100%', padding: '15px',
    background: '#1C75BC', color: '#fff', border: 'none', borderRadius: 12,
    fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 700, fontSize: 15,
    cursor: 'pointer', transition: 'all .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 4px 18px rgba(28,117,188,0.25)', letterSpacing: '-0.01em',
  },

  summaryBox: {
    background: '#f4f7fb', border: '1px solid #d0dce8',
    borderRadius: 12, padding: '15px 16px',
    display: 'flex', flexDirection: 'column' as const, gap: 10,
  },
  summaryTitle: { fontSize: 12, fontWeight: 700, color: '#175A8C', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 },
  summaryRow:   { display: 'flex', alignItems: 'center', gap: 8 },
  summaryDot:   { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  summaryLabel: { fontSize: 12, color: '#4a7a9b', width: 90, flexShrink: 0 },
  summaryBarWrap: { flex: 1, height: 6, background: '#d0dce8', borderRadius: 3, overflow: 'hidden' },
  summaryBar:     { height: '100%', borderRadius: 3, transition: 'width .4s' },
  summaryCount:   { fontSize: 13, fontWeight: 700, color: '#0D3A66', width: 18, textAlign: 'right' as const },

  // List panel
  listPanel: { background: '#eef2f7', display: 'flex', flexDirection: 'column' as const },

  statRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
    background: '#fff', borderBottom: '1px solid #d0dce8',
  },
  statCard: { display: 'flex', alignItems: 'center', gap: 14, padding: '1.2rem 1.5rem', borderRight: '1px solid #d0dce8' },
  statIconBox: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statLabel: { fontSize: 11, color: '#4a7a9b', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.07em' },
  statVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700 },

  listInner: { flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' as const, gap: '1rem' },

  // Client card
  clientCard: {
    background: '#fff',
    border: '1px solid #d0dce8',
    borderRadius: 14,
    padding: '1.25rem 1.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '1.5rem', flexWrap: 'wrap' as const,
    transition: 'box-shadow .2s',
  },
  clientLeft:   { display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 220 },
  clientAvatar: {
    width: 52, height: 52, borderRadius: 12, flexShrink: 0,
    background: 'linear-gradient(135deg,#0D3A66,#1C75BC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17,
    letterSpacing: '-0.02em',
  },
  clientInfo:   { display: 'flex', flexDirection: 'column' as const, gap: 5 },
  clientEmpresa:{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: '#0A1F33', letterSpacing: '-0.01em' },
  clientMeta:   { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const },
  clientNombre: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#4a7a9b', fontWeight: 500 },
  clientEmail:  { display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#4a7a9b' },
  clientDot:    { width: 3, height: 3, borderRadius: '50%', background: '#c2d4e4' },

  clientRight:    { display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' as const },
  clientDataGrid: { display: 'flex', gap: '2rem', flexWrap: 'wrap' as const },
  clientDataItem: { display: 'flex', flexDirection: 'column' as const, gap: 5 },
  clientDataLabel:{ fontSize: 11, color: '#4a7a9b', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.07em' },
  clientDataVal:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: '#0D3A66' },

  objetivoBadge: {
    display: 'inline-flex', padding: '4px 10px', borderRadius: 6,
    fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
  },

  clientActions:  { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const },
  linkBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', border: '1px solid #d0dce8',
    borderRadius: 8, background: '#f4f7fb',
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
    color: '#175A8C', fontFamily: 'inherit', textDecoration: 'none',
    transition: 'all .15s',
  },
  deleteBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '6px 12px', border: '1px solid rgba(184,50,50,0.2)',
    borderRadius: 8, background: 'rgba(184,50,50,0.05)',
    fontSize: 12, fontWeight: 600, cursor: 'pointer',
    color: '#b83232', fontFamily: 'inherit', transition: 'all .15s',
  },

  confirmRow: { display: 'flex', alignItems: 'center', gap: 6 },
  confirmQ:   { fontSize: 12, color: '#b83232', fontWeight: 700 },
  confirmYes: { padding: '5px 12px', background: '#b83232', color: '#fff', border: 'none', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  confirmNo:  { padding: '5px 12px', background: '#e8f0f7', color: '#0A1F33', border: 'none', borderRadius: 7, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' },

  // Loading
  loadingState: { display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '5rem', gap: 16 },
  loadingText:  { fontSize: 13, color: '#4a7a9b', fontWeight: 500, letterSpacing: '0.05em' },

  // Empty
  empty: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
    padding: '5rem 2rem', gap: 16, textAlign: 'center' as const,
    background: '#fff', borderRadius: 14, border: '1px solid #d0dce8',
  },
  emptyIconBox: {
    width: 88, height: 88, borderRadius: 22,
    background: 'rgba(28,117,188,0.07)', border: '1.5px solid #d0dce8',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4,
  },
  emptyTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: '#0A1F33' },
  emptyDesc:  { fontSize: 14, color: '#4a7a9b', maxWidth: 360, lineHeight: 1.7 },
};