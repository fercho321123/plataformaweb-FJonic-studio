'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

// ── SVG Icons ──────────────────────────────────────────────────────────────────
function IconUsers({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 22 22" fill="none"><circle cx="8" cy="7" r="3.5" stroke={color} strokeWidth="1.5"/><path d="M2 19c0-3.3 2.7-6 6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="16" cy="7" r="3.5" stroke={color} strokeWidth="1.5"/><path d="M22 19c0-3.3-2.7-6-6-6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>);
}
function IconLayers({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 22 22" fill="none"><path d="M3 8l8-5 8 5-8 5-8-5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 14l8 5 8-5M3 11l8 5 8-5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>);
}
function IconTrend({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 22 22" fill="none"><path d="M3 16l5-6 5 4 6-8" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 6h4v4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconZap({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 22 22" fill="none"><path d="M13 2L4 13h8l-3 7 9-11h-8l3-7z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/></svg>);
}
function IconClock({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke={color} strokeWidth="1.5"/><path d="M11 7v4l3 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconTarget({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.4"/><circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.4"/><circle cx="10" cy="10" r="1" fill={color}/></svg>);
}
function IconActivity({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M2 9h3l2-6 3 12 3-8 2 4 1-2h2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconMonitor({ size = 80, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 80 80" fill="none"><rect x="8" y="10" width="64" height="44" rx="5" stroke={color} strokeWidth="2"/><path d="M28 54v10M52 54v10M22 64h36" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M20 30h16M20 38h10M44 28h16M44 36h10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity=".5"/></svg>);
}
function IconCheck({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconShield({ size = 18 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M9 1.5L16 4.5v5c0 3.5-3 6.5-7 8-4-1.5-7-4.5-7-8v-5L9 1.5z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6 9l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconArrowRight({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function HeroCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...s.heroCard, borderTop: `3px solid ${accent}` }}>
      <div style={s.heroCardLabel}>{label}</div>
      <div style={s.heroCardVal}>{value}</div>
    </div>
  );
}

function MetricCard({
  title, value, icon, accent, bg, trend,
}: {
  title: string; value: string | number; icon: React.ReactNode;
  accent: string; bg: string; trend: string;
}) {
  return (
    <div style={{ ...s.metricCard, borderTop: `3px solid ${accent}` }}>
      <div style={s.metricCardTop}>
        <div style={{ ...s.metricIconBox, background: bg, color: accent }}>{icon}</div>
        <span style={{ ...s.metricTrend, background: bg, color: accent }}>{trend}</span>
      </div>
      <div style={s.metricValue}>{value}</div>
      <div style={s.metricTitle}>{title}</div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { usuario } = useAuth();

  const [stats, setStats] = useState({
    clientes: 0,
    proyectos: 0,
    campanasActivas: 0,
    roiPromedio: 0,
  });
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const [c, p] = await Promise.all([
          apiFetch('/clientes'),
          apiFetch('/proyectos'),
        ]);
        setStats({
          clientes: Array.isArray(c) ? c.length : 0,
          proyectos: Array.isArray(p) ? p.length : 0,
          campanasActivas: Array.isArray(p) ? p.filter((item: any) => item.estado === 'iniciado').length : 0,
          roiPromedio: 24.5,
        });
      } catch (error) {
        console.error('Error cargando datos de agencia', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencyData();
  }, []);

  if (loading) {
    return (
      <div style={s.loadingPage}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="28" cy="28" r="22" stroke="rgba(5,171,196,0.2)" strokeWidth="3"/>
          <path d="M28 6a22 22 0 0122 22" stroke="#05ABC4" strokeWidth="3" strokeLinecap="round"/>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </svg>
        <div style={s.loadingText}>Cargando panel de control...</div>
      </div>
    );
  }

  const metrics = [
    { title: 'Clientes activos',  value: stats.clientes,             icon: <IconUsers size={22} color="#fff" />,  accent: '#05ABC4', bg: '#05ABC4', trend: '+12%' },
    { title: 'Proyectos activos', value: stats.proyectos,            icon: <IconLayers size={22} color="#fff" />, accent: '#1C75BC', bg: '#1C75BC', trend: '+8%'  },
    { title: 'ROI promedio',      value: `${stats.roiPromedio}%`,    icon: <IconTrend size={22} color="#fff" />,  accent: '#059669', bg: '#059669', trend: '+5.2%'},
    { title: 'Campañas live',     value: stats.campanasActivas,      icon: <IconZap size={22} color="#fff" />,   accent: '#175A8C', bg: '#175A8C', trend: 'LIVE'  },
  ];

  const actividades = [
    { accion: 'Estrategia aprobada', cliente: 'TechCorp',     tiempo: 'Hace 2 min',  color: '#05ABC4' },
    { accion: 'Reporte enviado',     cliente: 'Fashion Brand', tiempo: 'Hace 15 min', color: '#059669' },
    { accion: 'Nuevo cliente',       cliente: 'StartUp Inc',   tiempo: 'Hace 1 hora', color: '#7c3aed' },
  ];

  const tareas = [
    { label: 'Google Audit',   done: true  },
    { label: 'SEO Pro',        done: true  },
    { label: 'Ads en vivo',    done: false },
  ];

  return (
    <div style={s.page}>

      {/* TOPBAR */}
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}><IconShield size={18} /></div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Panel de Control</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          {/* Welcome */}
          <div>
            <div style={s.heroEyebrow}>Panel de control</div>
            <div style={s.heroWelcome}>
              Bienvenido, <span style={{ color: '#05ABC4' }}>{usuario?.nombre || 'Usuario'}</span>
            </div>
            <div style={s.heroHint}>
              Aquí tienes un resumen en tiempo real de tu agencia.
            </div>
          </div>

          {/* Clock + hero cards */}
          <div style={s.heroRight}>
            <div style={s.clockBox}>
              <IconClock size={20} color="#05ABC4" />
              <div>
                <div style={s.clockTime}>
                  {time.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div style={s.clockLabel}>Hora del sistema</div>
              </div>
            </div>
            <div style={s.heroCards}>
              <HeroCard label="Clientes"   value={String(stats.clientes)}    accent="#05ABC4" />
              <HeroCard label="Proyectos"  value={String(stats.proyectos)}   accent="#1C75BC" />
              <HeroCard label="ROI Prom."  value={`${stats.roiPromedio}%`}   accent="#059669" />
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={s.body}>

        {/* ── METRIC CARDS ── */}
        <div style={s.metricsGrid}>
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={s.contentGrid}>

          {/* Left column */}
          <div style={s.contentLeft}>

            {/* CTA Card */}
            <div style={s.ctaCard}>
              <div style={s.ctaLeft}>
                <div style={s.ctaBadge}>
                  <div style={s.ctaBadgeDot} />
                  Operaciones activas
                </div>
                <div style={s.ctaTitle}>
                  Despliegue{'\n'}
                  <span style={{ color: '#05ABC4' }}>Estratégico</span>
                </div>
                <div style={s.ctaDesc}>
                  Gestiona proyectos, clientes y campañas desde un solo lugar.
                </div>
                <div style={s.ctaBtns}>
                  <button
                    style={s.ctaBtnPrimary}
                    onClick={() => window.location.href = '/dashboard/proyectos'}
                  >
                    <IconArrowRight size={15} color="#fff" />
                    Lanzar proyecto
                  </button>
                  <button
                    style={s.ctaBtnSecondary}
                    onClick={() => window.location.href = '/dashboard/clientes'}
                  >
                    Ver clientes
                  </button>
                </div>
              </div>
              <div style={s.ctaRight}>
                <IconMonitor size={90} color="rgba(5,171,196,0.18)" />
              </div>
            </div>

            {/* Activity feed */}
            <div style={s.feedCard}>
              <div style={s.feedHeader}>
                <div style={s.feedTitle}>
                  <div style={s.feedTitleDot} />
                  Actividad reciente
                </div>
                <IconActivity size={18} color="#05ABC4" />
              </div>
              <div style={s.feedList}>
                {actividades.map((a, i) => (
                  <div key={i} style={s.feedItem}>
                    <div style={{ ...s.feedItemBar, background: a.color }} />
                    <div style={s.feedItemBody}>
                      <div style={s.feedItemAccion}>{a.accion}</div>
                      <div style={s.feedItemCliente}>{a.cliente}</div>
                    </div>
                    <div style={s.feedItemTiempo}>{a.tiempo}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={s.contentRight}>

            {/* Goals card */}
            <div style={s.goalsCard}>
              <div style={s.goalsHeader}>
                <div style={s.goalsTitle}>
                  <IconTarget size={16} color="#05ABC4" />
                  Objetivos del mes
                </div>
              </div>

              {/* Progress bar */}
              <div style={s.progressSection}>
                <div style={s.progressLabelRow}>
                  <span style={s.progressLabel}>Performance web</span>
                  <span style={s.progressPct}>80%</span>
                </div>
                <div style={s.progressTrack}>
                  <div style={{ ...s.progressFill, width: '80%' }} />
                </div>
                <div style={s.progressLabelRow}>
                  <span style={s.progressLabel}>Captación de leads</span>
                  <span style={s.progressPct}>62%</span>
                </div>
                <div style={s.progressTrack}>
                  <div style={{ ...s.progressFill, width: '62%', background: '#1C75BC' }} />
                </div>
                <div style={s.progressLabelRow}>
                  <span style={s.progressLabel}>Retención de clientes</span>
                  <span style={s.progressPct}>91%</span>
                </div>
                <div style={s.progressTrack}>
                  <div style={{ ...s.progressFill, width: '91%', background: '#059669' }} />
                </div>
              </div>

              {/* Tasks */}
              <div style={s.tasksDivider} />
              <div style={s.tasksList}>
                <div style={s.tasksTitle}>Tareas pendientes</div>
                {tareas.map((t, i) => (
                  <div key={i} style={s.taskItem}>
                    <div style={{
                      ...s.taskCheck,
                      background: t.done ? 'rgba(5,171,196,0.12)' : '#f4f7fb',
                      borderColor: t.done ? '#05ABC4' : '#d0dce8',
                    }}>
                      {t.done && <IconCheck size={12} color="#05ABC4" />}
                    </div>
                    <span style={{ ...s.taskLabel, color: t.done ? '#4a7a9b' : '#0A1F33', textDecoration: t.done ? 'line-through' : 'none' }}>
                      {t.label}
                    </span>
                    {t.done && <span style={s.taskDoneTag}>Completado</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div style={s.quickCard}>
              <div style={s.quickTitle}>Accesos rápidos</div>
              {[
                { label: 'Gestión de personal',  href: '/dashboard/staff',       accent: '#05ABC4' },
                { label: 'Facturación',           href: '/dashboard/facturacion', accent: '#1C75BC' },
                { label: 'Finanzas',              href: '/dashboard/finanzas',    accent: '#175A8C' },
              ].map((link, i) => (
                <button
                  key={i}
                  style={{ ...s.quickLink, borderLeft: `3px solid ${link.accent}` }}
                  onClick={() => window.location.href = link.href}
                >
                  <span style={s.quickLinkLabel}>{link.label}</span>
                  <IconArrowRight size={14} color={link.accent} />
                </button>
              ))}
            </div>
          </div>
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

  // Loading
  loadingPage: {
    minHeight: '100vh', background: '#eef2f7',
    display: 'flex', flexDirection: 'column' as const,
    alignItems: 'center', justifyContent: 'center', gap: 16,
    fontFamily: "'DM Sans',sans-serif",
  },
  loadingText: { fontSize: 13, color: '#4a7a9b', fontWeight: 500, letterSpacing: '0.05em' },

  // Topbar
  topbar: {
    background: '#0A1F33', padding: '0 2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64, borderBottom: '3px solid #0D3A66',
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
  heroInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '2rem', flexWrap: 'wrap' as const,
  },
  heroEyebrow: { fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 6 },
  heroWelcome: {
    fontFamily: "'Syne',sans-serif", fontWeight: 800,
    fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff',
  },
  heroHint:   { fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  heroRight:  { display: 'flex', flexDirection: 'column' as const, gap: 12, alignItems: 'flex-end' },
  heroCards:  { display: 'flex', gap: 10, flexWrap: 'wrap' as const },
  heroCard: {
    background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '12px 18px', minWidth: 120,
  },
  heroCardLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: 4 },
  heroCardVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: '#fff' },

  // Clock
  clockBox: {
    display: 'flex', alignItems: 'center', gap: 12,
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '10px 18px',
  },
  clockTime:  { fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1 },
  clockLabel: { fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginTop: 2 },

  // Body
  body: { padding: '1.5rem', display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' },

  // Metric cards
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' },
  metricCard: {
    background: '#fff', border: '1px solid #d0dce8',
    borderRadius: 14, padding: '1.25rem 1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
    transition: 'box-shadow .2s',
  },
  metricCardTop:  { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  metricIconBox: {
    width: 46, height: 46, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  metricTrend: {
    fontSize: 11, fontWeight: 700, padding: '3px 9px',
    borderRadius: 6, letterSpacing: '0.04em',
  },
  metricValue: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, color: '#0A1F33', letterSpacing: '-0.04em', lineHeight: 1 },
  metricTitle: { fontSize: 12, fontWeight: 600, color: '#4a7a9b', textTransform: 'uppercase' as const, letterSpacing: '0.07em' },

  // Content grid
  contentGrid: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.25rem' },
  contentLeft:  { display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' },
  contentRight: { display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' },

  // CTA card
  ctaCard: {
    background: 'linear-gradient(135deg,#0A1F33 0%,#0D3A66 60%,#175A8C 100%)',
    borderRadius: 16, padding: '2.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '2rem', overflow: 'hidden', position: 'relative' as const,
    border: '1px solid rgba(5,171,196,0.2)',
  },
  ctaLeft:  { display: 'flex', flexDirection: 'column' as const, gap: 16, flex: 1 },
  ctaBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(5,171,196,0.15)', border: '1px solid rgba(5,171,196,0.3)',
    borderRadius: 100, padding: '5px 14px',
    fontSize: 11, fontWeight: 700, color: '#fff',
    textTransform: 'uppercase' as const, letterSpacing: '0.08em', alignSelf: 'flex-start',
  },
  ctaBadgeDot: { width: 6, height: 6, borderRadius: '50%', background: '#05ABC4' },
  ctaTitle: {
    fontFamily: "'Syne',sans-serif", fontWeight: 800,
    fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.04em',
    lineHeight: 1.1, color: '#fff', whiteSpace: 'pre-line' as const,
  },
  ctaDesc: { fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 360 },
  ctaBtns: { display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginTop: 4 },
  ctaBtnPrimary: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '13px 24px', background: '#1C75BC', color: '#fff',
    border: 'none', borderRadius: 10,
    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
    cursor: 'pointer', transition: 'all .18s',
    boxShadow: '0 4px 16px rgba(28,117,188,0.3)',
  },
  ctaBtnSecondary: {
    padding: '13px 24px',
    background: 'rgba(255,255,255,0.08)', color: '#fff',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10,
    fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
    cursor: 'pointer', transition: 'all .18s',
  },
  ctaRight: { opacity: 0.6, flexShrink: 0 },

  // Feed card
  feedCard: {
    background: '#fff', border: '1px solid #d0dce8',
    borderRadius: 14, padding: '1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1rem',
  },
  feedHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingBottom: '0.75rem', borderBottom: '1px solid #e8f0f7',
  },
  feedTitle: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: '#0A1F33',
  },
  feedTitleDot: { width: 10, height: 10, borderRadius: 3, background: '#05ABC4', flexShrink: 0 },
  feedList:     { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  feedItem: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 14px', background: '#f4f7fb',
    border: '1px solid #e8f0f7', borderRadius: 10,
    transition: 'background .1s',
  },
  feedItemBar:     { width: 3, height: 38, borderRadius: 3, flexShrink: 0 },
  feedItemBody:    { flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 3 },
  feedItemAccion:  { fontSize: 13, fontWeight: 600, color: '#0A1F33' },
  feedItemCliente: { fontSize: 11, color: '#4a7a9b', textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontWeight: 600 },
  feedItemTiempo:  { fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: '#05ABC4', fontWeight: 600, flexShrink: 0 },

  // Goals card
  goalsCard: {
    background: '#fff', border: '1px solid #d0dce8',
    borderTop: '3px solid #05ABC4',
    borderRadius: 14, padding: '1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1.1rem',
  },
  goalsHeader: { paddingBottom: '0.5rem', borderBottom: '1px solid #e8f0f7' },
  goalsTitle: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: '#0A1F33',
  },
  progressSection:  { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  progressLabelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel:    { fontSize: 12, fontWeight: 600, color: '#4a7a9b' },
  progressPct:      { fontSize: 12, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: '#0D3A66' },
  progressTrack:    { height: 6, background: '#e8f0f7', borderRadius: 3, overflow: 'hidden' },
  progressFill:     { height: '100%', background: '#05ABC4', borderRadius: 3, transition: 'width .4s' },
  tasksDivider:     { height: 1, background: '#e8f0f7' },
  tasksList:        { display: 'flex', flexDirection: 'column' as const, gap: 8 },
  tasksTitle:       { fontSize: 11, fontWeight: 700, color: '#175A8C', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 },
  taskItem: { display: 'flex', alignItems: 'center', gap: 10 },
  taskCheck: {
    width: 22, height: 22, borderRadius: 6, border: '1.5px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  taskLabel:   { flex: 1, fontSize: 13, fontWeight: 500 },
  taskDoneTag: { fontSize: 10, fontWeight: 700, color: '#05ABC4', background: 'rgba(5,171,196,0.1)', padding: '2px 7px', borderRadius: 5, letterSpacing: '0.04em' },

  // Quick links
  quickCard: {
    background: '#fff', border: '1px solid #d0dce8',
    borderRadius: 14, padding: '1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
  },
  quickTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: '#0A1F33', marginBottom: 4 },
  quickLink: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 14px', background: '#f4f7fb',
    border: '1px solid #e8f0f7', borderRadius: 10,
    cursor: 'pointer', transition: 'background .15s', fontFamily: 'inherit',
  },
  quickLinkLabel: { fontSize: 14, fontWeight: 600, color: '#0A1F33' },
};