'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

function IconPlus({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M9 2v14M2 9h14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></svg>);
}
function IconTrash({ size = 15, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/></svg>);
}
function IconCalendar({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke={color} strokeWidth="1.3"/><path d="M5 1.5v2M9 1.5v2M1.5 6h11" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>);
}
function IconUser({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke={color} strokeWidth="1.3"/><path d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>);
}
function IconDollar({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M7 2v10M5 4.5C5 3.4 5.9 3 7 3s2 .7 2 1.5S8.1 6 7 6 5 6.7 5 7.5 5.9 9 7 9s2-.7 2-1.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>);
}
function IconLayers({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 5l5-3 5 3-5 3-5-3z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/><path d="M2 8l5 3 5-3" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>);
}
function IconTag({ size = 13, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 13 13" fill="none"><path d="M1.5 1.5h4.5l5.5 5.5-4.5 4.5L1.5 6V1.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4" cy="4" r="0.8" fill={color}/></svg>);
}
function IconTarget({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5"/><circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5"/><circle cx="10" cy="10" r="1" fill={color}/></svg>);
}
function IconActivity({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (<svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M2 10h3l2-6 3 12 3-8 2 4 1-2h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconShield({ size = 18 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M9 1.5L16 4.5v5c0 3.5-3 6.5-7 8-4-1.5-7-4.5-7-8v-5L9 1.5z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6 9l2 2 4-4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconCheck({ size = 18 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M3 9.5l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
}
function IconSpinner({ size = 40 }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 1s linear infinite' }}><circle cx="20" cy="20" r="16" stroke="rgba(5,171,196,0.2)" strokeWidth="3"/><path d="M20 4a16 16 0 0116 16" stroke="#05ABC4" strokeWidth="3" strokeLinecap="round"/><style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style></svg>);
}

const formatCOP = (v: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(v);

function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatFecha(fecha: string) {
  if (!fecha) return '—';
  return new Date(fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
}

const PRIORIDAD_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  Alta:  { color: '#b83232', bg: 'rgba(184,50,50,0.1)',  border: 'rgba(184,50,50,0.3)' },
  Media: { color: '#d97706', bg: 'rgba(217,119,6,0.1)', border: 'rgba(217,119,6,0.3)' },
  Baja:  { color: '#059669', bg: 'rgba(5,150,105,0.1)', border: 'rgba(5,150,105,0.3)' },
};

const TIPOS = ['Marketing Digital','Diseño Gráfico','Desarrollo Web','Redes Sociales','Branding','Audiovisual'];
const PRIORIDADES = ['Alta','Media','Baja'];
const ESTADOS_PAGO = ['Pendiente','Parcial','Pagado'];

const ESTADO_PAGO_CONFIG: Record<string, { bg: string; color: string }> = {
  Pendiente: { bg: 'rgba(217,119,6,0.1)',  color: '#d97706' },
  Parcial:   { bg: 'rgba(28,117,188,0.1)', color: '#1C75BC' },
  Pagado:    { bg: 'rgba(5,150,105,0.1)',  color: '#059669' },
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div style={s.field}><label style={s.fieldLabel}>{label}</label>{children}</div>);
}

function InputIcon({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (<div style={s.inputIconWrap}><span style={s.inputIconSlot}>{icon}</span>{children}</div>);
}

function HeroCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...s.heroCard, borderTop: `3px solid ${accent}` }}>
      <div style={s.heroCardLabel}>{label}</div>
      <div style={s.heroCardVal}>{value}</div>
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: any) {
  return (
    <div style={{ ...s.statCard, borderTop: `3px solid ${color}` }}>
      <div style={{ ...s.statIconBox, background: bg, color }}>{icon}</div>
      <div><div style={s.statLabel}>{label}</div><div style={{ ...s.statVal, color }}>{value}</div></div>
    </div>
  );
}

function ProjectCard({ p, clienteNombre, confirmDelete, onDeleteRequest, onDeleteConfirm, onDeleteCancel }: any) {
  const prioridadCfg = PRIORIDAD_CONFIG[p.prioridad] || PRIORIDAD_CONFIG['Media'];
  const estadoCfg = ESTADO_PAGO_CONFIG[p.estadoPago] || ESTADO_PAGO_CONFIG['Pendiente'];
  const initials = (p.nombre || 'P').split(' ').slice(0,2).map((w: string) => w[0]).join('').toUpperCase();
  return (
    <div style={{ ...s.projectCard, borderLeft: `4px solid ${prioridadCfg.color}` }}>
      <div style={s.projectTop}>
        <div style={s.projectLeft}>
          <div style={{ ...s.projectAvatar, background: `linear-gradient(135deg, ${prioridadCfg.color}25, ${prioridadCfg.color}50)`, color: prioridadCfg.color }}>{initials}</div>
          <div style={s.projectInfo}>
            <div style={s.projectTitleRow}>
              <span style={{ ...s.prioridadBadge, background: prioridadCfg.bg, borderColor: prioridadCfg.border, color: prioridadCfg.color }}>{p.prioridad}</span>
              <span style={{ ...s.estadoBadge, background: estadoCfg.bg, color: estadoCfg.color }}>{p.estadoPago || 'Pendiente'}</span>
            </div>
            <div style={s.projectName}>{p.nombre}</div>
            <div style={s.projectMeta}>
              <span style={s.projectMetaItem}><IconUser size={11} color="#4a7a9b" />{clienteNombre}</span>
              <span style={s.projectMetaDot} />
              <span style={s.projectMetaItem}><IconTag size={11} color="#4a7a9b" />{p.tipo}</span>
              {p.liderProyecto && (<><span style={s.projectMetaDot} /><span style={s.projectMetaItem}><IconUser size={11} color="#4a7a9b" />{p.liderProyecto}</span></>)}
            </div>
          </div>
        </div>
        <div style={s.projectRight}>
          <div style={s.projectDataGrid}>
            <div style={s.projectDataItem}>
              <div style={s.projectDataLabel}>Presupuesto</div>
              <div style={s.projectDataVal}>{formatCOP(Number(p.presupuestoTotal || 0))}</div>
            </div>
            <div style={s.projectDataItem}>
              <div style={s.projectDataLabel}>Fecha de entrega</div>
              <div style={s.projectDataDate}><IconCalendar size={12} color="#1C75BC" />{formatFecha(p.fechaEntrega)}</div>
            </div>
          </div>
          <div style={s.projectActions}>
            {confirmDelete === p.id ? (
              <div style={s.confirmRow}>
                <span style={s.confirmQ}>¿Eliminar?</span>
                <button style={s.confirmYes} onClick={onDeleteConfirm}>Sí</button>
                <button style={s.confirmNo} onClick={onDeleteCancel}>No</button>
              </div>
            ) : (
              <button style={s.deleteBtn} onClick={onDeleteRequest}>
                <IconTrash size={14} color="#b83232" /><span>Eliminar</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {p.descripcion && <div style={s.projectDesc}>{p.descripcion}</div>}
      <div style={s.projectProgressWrap}><div style={{ ...s.projectProgress, background: prioridadCfg.color }} /></div>
    </div>
  );
}

export default function PaginaProyectos() {
  const { token } = useAuth();
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [clientes, setClientes]   = useState<any[]>([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState('');
  const [successAnim, setSuccessAnim]     = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const [datosForm, setDatosForm] = useState({
    nombre: '', clienteId: '', tipo: 'Marketing Digital', prioridad: 'Media',
    liderProyecto: '', fechaEntrega: '', presupuestoTotal: '', descripcion: '', estadoPago: 'Pendiente',
  });

  const set = (field: string, value: string) => setDatosForm(prev => ({ ...prev, [field]: value }));

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [dp, dc] = await Promise.all([apiFetch('/proyectos'), apiFetch('/clientes')]);
      setProyectos(Array.isArray(dp) ? dp : []);
      setClientes(Array.isArray(dc) ? dc : []);
    } catch (err: any) { setError('Error de sincronización con el servidor.'); }
    finally { setCargando(false); }
  };

  useEffect(() => { if (token) cargarTodo(); }, [token]);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      await apiFetch('/proyectos', { method: 'POST', body: JSON.stringify(datosForm) });
      setDatosForm({ nombre:'',clienteId:'',tipo:'Marketing Digital',prioridad:'Media',liderProyecto:'',fechaEntrega:'',presupuestoTotal:'',descripcion:'',estadoPago:'Pendiente' });
      setSuccessAnim(true); setTimeout(() => setSuccessAnim(false), 1100);
      cargarTodo();
    } catch (err: any) { setError(err.message || 'Error al crear el proyecto.'); }
  };

  const eliminarProyecto = async (id: string) => {
    try {
      await apiFetch(`/proyectos/${id}`, { method: 'DELETE' });
      setProyectos(prev => prev.filter(p => p.id !== id));
      setConfirmDelete(null);
    } catch (err: any) { alert(err.message); }
  };

  const obtenerNombreCliente = (clienteId: string) => clientes.find(c => c.id === clienteId)?.empresa || 'Cliente no asignado';
  const presupuestoTotal = proyectos.reduce((a, p) => a + Number(p.presupuestoTotal || 0), 0);

  return (
    <div style={s.page}>
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}><IconShield size={18} /></div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Gestión de Proyectos</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      <section style={s.hero}>
        <div style={s.heroInner}>
          <div>
            <div style={s.heroEyebrow}>Proyectos activos</div>
            <div style={s.heroAmount}>{proyectos.length}</div>
            <div style={s.heroHint}>{proyectos.length === 0 ? 'Aún no hay proyectos registrados' : `${proyectos.length} proyecto${proyectos.length !== 1 ? 's' : ''} en ejecución`}</div>
          </div>
          <div style={s.heroCards}>
            <HeroCard label="Total proyectos"  value={String(proyectos.length)} accent="#05ABC4" />
            <HeroCard label="Inversión total"  value={formatCOP(presupuestoTotal)} accent="#1C75BC" />
            <HeroCard label="Alta prioridad"   value={String(proyectos.filter(p => p.prioridad === 'Alta').length)} accent="#b83232" />
          </div>
        </div>
      </section>

      <div style={s.body}>
        <aside style={s.sidebar}>
          <div style={s.formHeader}>
            <div style={s.formHeaderIcon}><IconPlus size={20} color="#fff" /></div>
            <div>
              <div style={s.formHeaderTitle}>Nuevo proyecto</div>
              <div style={s.formHeaderSub}>Registra un proyecto en el sistema</div>
            </div>
          </div>

          <form onSubmit={manejarEnvio} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <Field label="Nombre del proyecto">
              <InputIcon icon={<IconLayers size={14} color="#4a7a9b" />}>
                <input required style={s.inputWithIcon} placeholder="Ej: Campaña Verano 2025..." value={datosForm.nombre} onChange={e => set('nombre', e.target.value)} />
              </InputIcon>
            </Field>

            <Field label="Cliente asignado">
              <div style={s.selectWrap}>
                <select required style={s.select} value={datosForm.clienteId} onChange={e => set('clienteId', e.target.value)}>
                  <option value="">Seleccionar cliente...</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.empresa}</option>)}
                </select>
                <div style={s.selectArrow}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#4a7a9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
            </Field>

            <Field label="Tipo de proyecto">
              <div style={s.selectWrap}>
                <select style={s.select} value={datosForm.tipo} onChange={e => set('tipo', e.target.value)}>
                  {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div style={s.selectArrow}><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#4a7a9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </div>
            </Field>

            <Field label="Prioridad">
              <div style={s.prioridadGrid}>
                {PRIORIDADES.map(p => {
                  const cfg = PRIORIDAD_CONFIG[p]; const active = datosForm.prioridad === p;
                  return (<button key={p} type="button" onClick={() => set('prioridad', p)} style={{ ...s.prioridadBtn, background: active ? cfg.bg : '#f4f7fb', borderColor: active ? cfg.border : '#d0dce8', color: active ? cfg.color : '#4a7a9b', fontWeight: active ? 700 : 500 }}>{p}</button>);
                })}
              </div>
            </Field>

            <div style={s.twoCol}>
              <Field label="Líder del proyecto">
                <InputIcon icon={<IconUser size={13} color="#4a7a9b" />}>
                  <input style={s.inputWithIcon} placeholder="Nombre del líder" value={datosForm.liderProyecto} onChange={e => set('liderProyecto', e.target.value)} />
                </InputIcon>
              </Field>
              <Field label="Fecha de entrega">
                <input required type="date" style={s.input} value={datosForm.fechaEntrega} onChange={e => set('fechaEntrega', e.target.value)} />
              </Field>
            </div>

            <Field label="Presupuesto total (COP)">
              <div style={s.montoBox}>
                <span style={s.montoSign}>$</span>
                <input type="number" min="0" style={s.montoInput} placeholder="0" value={datosForm.presupuestoTotal} onChange={e => set('presupuestoTotal', e.target.value)} />
                <span style={s.montoCOP}>COP</span>
              </div>
            </Field>

            <Field label="Estado de pago">
              <div style={s.estadoGrid}>
                {ESTADOS_PAGO.map(ep => {
                  const active = datosForm.estadoPago === ep;
                  return (<button key={ep} type="button" onClick={() => set('estadoPago', ep)} style={{ ...s.estadoBtn, background: active ? '#0D3A66' : '#f4f7fb', borderColor: active ? '#0D3A66' : '#d0dce8', color: active ? '#fff' : '#4a7a9b', fontWeight: active ? 700 : 500 }}>{ep}</button>);
                })}
              </div>
            </Field>

            <Field label="Descripción (opcional)">
              <textarea rows={3} style={s.textarea} placeholder="Describe el alcance del proyecto..." value={datosForm.descripcion} onChange={e => set('descripcion', e.target.value)} />
            </Field>

            {error && <div style={s.errorBox}>{error}</div>}

            <button type="submit" style={{ ...s.submitBtn, ...(successAnim ? { background: '#0D3A66' } : {}) }}>
              {successAnim ? <><IconCheck size={18} /><span>Proyecto registrado</span></> : <><IconPlus size={18} color="#fff" /><span>Crear proyecto</span></>}
            </button>
          </form>

          {proyectos.length > 0 && (
            <div style={s.summaryBox}>
              <div style={s.summaryTitle}>Proyectos por prioridad</div>
              {PRIORIDADES.map(p => {
                const count = proyectos.filter(pr => pr.prioridad === p).length;
                if (!count) return null;
                const cfg = PRIORIDAD_CONFIG[p];
                const pct = Math.round((count / proyectos.length) * 100);
                return (
                  <div key={p} style={s.summaryRow}>
                    <div style={{ ...s.summaryDot, background: cfg.color }} />
                    <span style={s.summaryLabel}>{p}</span>
                    <div style={s.summaryBarWrap}><div style={{ ...s.summaryBar, width: `${pct}%`, background: cfg.color }} /></div>
                    <span style={s.summaryCount}>{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        <section style={s.listPanel}>
          <div style={s.statRow}>
            <StatCard icon={<IconTarget size={20} color="#0D3A66" />}   label="Total proyectos" value={String(proyectos.length)}                                     color="#0D3A66" bg="rgba(13,58,102,0.08)"  />
            <StatCard icon={<IconDollar size={20} color="#1C75BC" />}   label="Inversión total" value={formatCOP(presupuestoTotal)}                                  color="#1C75BC" bg="rgba(28,117,188,0.08)" />
            <StatCard icon={<IconActivity size={20} color="#b83232" />} label="Alta prioridad"  value={String(proyectos.filter(p => p.prioridad === 'Alta').length)}  color="#b83232" bg="rgba(184,50,50,0.08)"  />
          </div>

          <div style={s.listInner}>
            {cargando && (<div style={s.loadingState}><IconSpinner size={40} /><div style={s.loadingText}>Cargando proyectos...</div></div>)}
            {!cargando && proyectos.length === 0 && (
              <div style={s.empty}>
                <div style={s.emptyIconBox}>
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none"><rect x="8" y="10" width="36" height="32" rx="5" stroke="#175A8C" strokeWidth="1.6"/><path d="M16 24h20M16 31h14" stroke="#05ABC4" strokeWidth="1.6" strokeLinecap="round"/><path d="M26 6v4" stroke="#175A8C" strokeWidth="1.6" strokeLinecap="round"/><circle cx="26" cy="6" r="2" fill="#05ABC4"/></svg>
                </div>
                <div style={s.emptyTitle}>No hay proyectos aún</div>
                <div style={s.emptyDesc}>Usa el formulario de la izquierda para registrar el primer proyecto en el sistema.</div>
              </div>
            )}
            {!cargando && proyectos.map((p, i) => (
              <ProjectCard key={p.id} p={p} index={i} clienteNombre={obtenerNombreCliente(p.clienteId)} confirmDelete={confirmDelete} onDeleteRequest={() => setConfirmDelete(p.id)} onDeleteConfirm={() => eliminarProyecto(p.id)} onDeleteCancel={() => setConfirmDelete(null)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight:'100vh', background:'#eef2f7', fontFamily:"'DM Sans','Segoe UI',sans-serif", color:'#0A1F33' },
  topbar: { background:'#0A1F33', padding:'0 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', height:64, borderBottom:'3px solid #0D3A66' },
  topbarLeft: { display:'flex', alignItems:'center', gap:14 },
  logo: { width:42, height:42, background:'#05ABC4', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  topbarName: { fontFamily:"'Syne','DM Sans',sans-serif", fontWeight:800, fontSize:18, color:'#fff', letterSpacing:'-0.02em' },
  topbarModule: { fontSize:11, color:'#05ABC4', letterSpacing:'0.1em', textTransform:'uppercase' as const, marginTop:1 },
  topbarDate: { fontSize:13, color:'rgba(255,255,255,0.4)', textTransform:'capitalize' as const },
  hero: { background:'linear-gradient(135deg,#0A1F33 0%,#0D3A66 55%,#175A8C 100%)', padding:'2.25rem 2rem 2rem', borderBottom:'1px solid #0D3A66' },
  heroInner: { display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' as const },
  heroEyebrow: { fontSize:12, color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase' as const, marginBottom:6 },
  heroAmount: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', letterSpacing:'-0.04em', lineHeight:1, color:'#fff' },
  heroHint: { fontSize:13, color:'rgba(255,255,255,0.4)', marginTop:8 },
  heroCards: { display:'flex', gap:10, flexWrap:'wrap' as const },
  heroCard: { background:'rgba(255,255,255,0.09)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:'14px 20px', minWidth:155 },
  heroCardLabel: { fontSize:11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.06em', textTransform:'uppercase' as const, marginBottom:5 },
  heroCardVal: { fontFamily:"'JetBrains Mono',monospace", fontSize:17, fontWeight:700, color:'#fff' },
  body: { display:'grid', gridTemplateColumns:'390px 1fr', minHeight:'calc(100vh - 200px)' },
  sidebar: { background:'#fff', borderRight:'1px solid #d0dce8', padding:'1.75rem 1.5rem', display:'flex', flexDirection:'column' as const, gap:'1.1rem', overflowY:'auto' as const },
  formHeader: { display:'flex', alignItems:'flex-start', gap:12, paddingBottom:'1rem', borderBottom:'2px solid #eef2f7' },
  formHeaderIcon: { width:44, height:44, borderRadius:10, background:'#1C75BC', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  formHeaderTitle: { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:17, color:'#0A1F33', letterSpacing:'-0.01em' },
  formHeaderSub: { fontSize:12, color:'#4a7a9b', marginTop:2 },
  field: { display:'flex', flexDirection:'column' as const, gap:7 },
  fieldLabel: { fontSize:13, fontWeight:700, color:'#0A1F33' },
  twoCol: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 },
  inputIconWrap: { display:'flex', alignItems:'center', background:'#f4f7fb', border:'1.5px solid #d0dce8', borderRadius:10, overflow:'hidden' },
  inputIconSlot: { padding:'0 10px 0 13px', color:'#4a7a9b', display:'flex', alignItems:'center', flexShrink:0 },
  inputWithIcon: { flex:1, padding:'11px 13px 11px 2px', fontSize:14, fontFamily:'inherit', background:'transparent', border:'none', outline:'none', color:'#0A1F33' },
  input: { padding:'11px 13px', fontSize:14, fontFamily:'inherit', background:'#f4f7fb', border:'1.5px solid #d0dce8', borderRadius:10, color:'#0A1F33', outline:'none', width:'100%' },
  textarea: { padding:'11px 13px', fontSize:14, fontFamily:'inherit', background:'#f4f7fb', border:'1.5px solid #d0dce8', borderRadius:10, color:'#0A1F33', outline:'none', width:'100%', resize:'vertical' as const, lineHeight:1.6 },
  selectWrap: { position:'relative' as const },
  select: { width:'100%', padding:'11px 38px 11px 13px', fontSize:14, fontFamily:'inherit', background:'#f4f7fb', border:'1.5px solid #d0dce8', borderRadius:10, color:'#0A1F33', outline:'none', appearance:'none' as const, WebkitAppearance:'none' as const, cursor:'pointer' },
  selectArrow: { position:'absolute' as const, right:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' as const },
  prioridadGrid: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 },
  prioridadBtn: { padding:'8px 6px', border:'1.5px solid', borderRadius:8, fontSize:12, fontFamily:'inherit', cursor:'pointer', transition:'all .15s', textAlign:'center' as const },
  estadoGrid: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6 },
  estadoBtn: { padding:'8px 4px', border:'1.5px solid', borderRadius:8, fontSize:11, fontFamily:'inherit', cursor:'pointer', transition:'all .15s', textAlign:'center' as const },
  montoBox: { display:'flex', alignItems:'center', background:'#f4f7fb', border:'1.5px solid #d0dce8', borderRadius:10, overflow:'hidden' },
  montoSign: { padding:'11px 11px 11px 14px', fontSize:20, fontWeight:700, color:'#0D3A66', background:'#e8f0f7', borderRight:'1px solid #d0dce8', lineHeight:1 },
  montoInput: { flex:1, padding:'11px 10px', fontSize:20, fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:'#0A1F33', background:'transparent', border:'none', outline:'none' },
  montoCOP: { padding:'0 13px', fontSize:12, color:'#4a7a9b', letterSpacing:'0.06em', fontWeight:700 },
  errorBox: { padding:'11px 14px', borderRadius:10, background:'rgba(184,50,50,0.08)', border:'1.5px solid #b83232', color:'#b83232', fontSize:13, fontWeight:500 },
  submitBtn: { width:'100%', padding:'15px', background:'#1C75BC', color:'#fff', border:'none', borderRadius:12, fontFamily:"'Syne','DM Sans',sans-serif", fontWeight:700, fontSize:15, cursor:'pointer', transition:'all .2s', display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 4px 18px rgba(28,117,188,0.25)', letterSpacing:'-0.01em' },
  summaryBox: { background:'#f4f7fb', border:'1px solid #d0dce8', borderRadius:12, padding:'14px 15px', display:'flex', flexDirection:'column' as const, gap:10 },
  summaryTitle: { fontSize:12, fontWeight:700, color:'#175A8C', textTransform:'uppercase' as const, letterSpacing:'0.08em', marginBottom:4 },
  summaryRow: { display:'flex', alignItems:'center', gap:8 },
  summaryDot: { width:8, height:8, borderRadius:'50%', flexShrink:0 },
  summaryLabel: { fontSize:12, color:'#4a7a9b', width:50, flexShrink:0 },
  summaryBarWrap: { flex:1, height:6, background:'#d0dce8', borderRadius:3, overflow:'hidden' },
  summaryBar: { height:'100%', borderRadius:3, transition:'width .4s' },
  summaryCount: { fontSize:13, fontWeight:700, color:'#0D3A66', width:18, textAlign:'right' as const },
  listPanel: { background:'#eef2f7', display:'flex', flexDirection:'column' as const },
  statRow: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', background:'#fff', borderBottom:'1px solid #d0dce8' },
  statCard: { display:'flex', alignItems:'center', gap:14, padding:'1.2rem 1.5rem', borderRight:'1px solid #d0dce8' },
  statIconBox: { width:44, height:44, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  statLabel: { fontSize:11, color:'#4a7a9b', fontWeight:600, marginBottom:4, textTransform:'uppercase' as const, letterSpacing:'0.07em' },
  statVal: { fontFamily:"'JetBrains Mono',monospace", fontSize:17, fontWeight:700 },
  listInner: { flex:1, padding:'1.5rem', display:'flex', flexDirection:'column' as const, gap:'1rem' },
  projectCard: { background:'#fff', border:'1px solid #d0dce8', borderRadius:14, padding:'1.25rem 1.5rem', display:'flex', flexDirection:'column' as const, gap:10, transition:'box-shadow .2s' },
  projectTop: { display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap' as const },
  projectLeft: { display:'flex', alignItems:'flex-start', gap:14, flex:1, minWidth:240 },
  projectAvatar: { width:48, height:48, borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, letterSpacing:'-0.02em' },
  projectInfo: { display:'flex', flexDirection:'column' as const, gap:5 },
  projectTitleRow: { display:'flex', alignItems:'center', gap:7, flexWrap:'wrap' as const },
  projectName: { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:17, color:'#0A1F33', letterSpacing:'-0.01em' },
  projectMeta: { display:'flex', alignItems:'center', gap:7, flexWrap:'wrap' as const },
  projectMetaItem: { display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#4a7a9b' },
  projectMetaDot: { width:3, height:3, borderRadius:'50%', background:'#c2d4e4' },
  prioridadBadge: { display:'inline-flex', alignItems:'center', padding:'3px 9px', borderRadius:6, border:'1px solid', fontSize:11, fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase' as const },
  estadoBadge: { display:'inline-flex', alignItems:'center', padding:'3px 9px', borderRadius:6, fontSize:11, fontWeight:700, letterSpacing:'0.03em' },
  projectRight: { display:'flex', alignItems:'center', gap:'1.5rem', flexShrink:0, flexWrap:'wrap' as const },
  projectDataGrid: { display:'flex', gap:'2rem', flexWrap:'wrap' as const },
  projectDataItem: { display:'flex', flexDirection:'column' as const, gap:4 },
  projectDataLabel: { fontSize:11, color:'#4a7a9b', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.07em' },
  projectDataVal: { fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:'#0D3A66' },
  projectDataDate: { display:'flex', alignItems:'center', gap:5, fontFamily:"'JetBrains Mono',monospace", fontSize:13, fontWeight:600, color:'#1C75BC' },
  projectActions: { display:'flex', alignItems:'center' },
  deleteBtn: { display:'flex', alignItems:'center', gap:5, padding:'6px 12px', border:'1px solid rgba(184,50,50,0.2)', borderRadius:8, background:'rgba(184,50,50,0.05)', fontSize:12, fontWeight:600, cursor:'pointer', color:'#b83232', fontFamily:'inherit', transition:'all .15s' },
  confirmRow: { display:'flex', alignItems:'center', gap:6 },
  confirmQ: { fontSize:12, color:'#b83232', fontWeight:700 },
  confirmYes: { padding:'5px 12px', background:'#b83232', color:'#fff', border:'none', borderRadius:7, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' },
  confirmNo: { padding:'5px 12px', background:'#e8f0f7', color:'#0A1F33', border:'none', borderRadius:7, fontSize:12, cursor:'pointer', fontFamily:'inherit' },
  projectDesc: { fontSize:13, color:'#4a7a9b', lineHeight:1.6, paddingTop:8, borderTop:'1px solid #e8f0f7' },
  projectProgressWrap: { height:3, background:'#e8f0f7', borderRadius:2, overflow:'hidden' },
  projectProgress: { height:'100%', width:'100%', borderRadius:2, opacity:0.4 },
  loadingState: { display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'5rem', gap:16 },
  loadingText: { fontSize:13, color:'#4a7a9b', fontWeight:500 },
  empty: { display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', padding:'5rem 2rem', gap:16, textAlign:'center' as const, background:'#fff', borderRadius:14, border:'1px solid #d0dce8' },
  emptyIconBox: { width:88, height:88, borderRadius:22, background:'rgba(28,117,188,0.07)', border:'1.5px solid #d0dce8', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:4 },
  emptyTitle: { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:20, color:'#0A1F33' },
  emptyDesc: { fontSize:14, color:'#4a7a9b', maxWidth:360, lineHeight:1.7 },
};