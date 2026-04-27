'use client';

import React, { useState, useEffect } from 'react';
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
function IconUsers({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M1 17c0-3 2.7-5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="14" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19 17c0-3-2.7-5-6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconEdit({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTrash({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4M5 4v9a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconX({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function IconSearch({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconDollar({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 3v14M7 6.5C7 5 8.3 4 10 4s3 .9 3 2.5-1.3 2.5-3 2.5-3 1-3 2.5S8.3 14 10 14s3-.9 3-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconTrend({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 14l4-5 4 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 6h3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconShield({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5l5 2v4c0 2.5-2 4.5-5 5.5C4 12 2 10 2 7.5v-4l5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
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
function IconActivity({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M1 6h2l2-4 2 8 2-4 1 2h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', minimumFractionDigits: 0,
});

function getTodayStr() {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

const ESPECIALIDADES = [
  'Diseñador Creativo',
  'Especialista en Anuncios',
  'Creador de Contenido',
  'Desarrollador Web',
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function Field({
  label, hint, children,
}: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={s.field}>
      <label style={s.fieldLabel}>{label}</label>
      {children}
      {hint && <div style={s.fieldHint}>{hint}</div>}
    </div>
  );
}

function StatCard({
  icon, label, value, color, bg,
}: { icon: React.ReactNode; label: string; value: string | number; color: string; bg: string }) {
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

// ── Main Component ─────────────────────────────────────────────────────────────
export default function RegistroStaffPage() {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    especialidad: 'Diseñador Creativo',
    costoHora: '',
  });

  const [staff, setStaff]       = useState<any[]>([]);
  const [loading, setLoading]   = useState(false);
  const [mensaje, setMensaje]   = useState({ tipo: '', texto: '' });
  const [busqueda, setBusqueda] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('todos');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [successAnim, setSuccessAnim] = useState(false);

  const cargarStaff = async () => {
    try {
      const data = await apiFetch('/usuarios/lista');
      if (data) setStaff(data);
    } catch (error) {
      console.error('Error cargando personal', error);
    }
  };

  useEffect(() => { if (token) cargarStaff(); }, [token]);

  const activarEdicion = (miembro: any) => {
    setEditMode(miembro.id);
    setFormData({
      nombre: miembro.nombre,
      email: miembro.email,
      password: '',
      especialidad: miembro.especialidad,
      costoHora: miembro.costoHora.toString(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setEditMode(null);
    setFormData({ nombre: '', email: '', password: '', especialidad: 'Diseñador Creativo', costoHora: '' });
    setMensaje({ tipo: '', texto: '' });
  };

  const eliminarMiembro = async (id: string) => {
    try {
      await apiFetch(`/usuarios/${id}`, { method: 'DELETE' });
      setStaff(prev => prev.filter(m => m.id !== id));
      setMensaje({ tipo: 'success', texto: 'Miembro eliminado del equipo.' });
      setConfirmDelete(null);
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: '', texto: '' });
    try {
      if (editMode) {
        const payload: any = { ...formData, costoHora: Number(formData.costoHora) };
        if (!payload.password) delete payload.password;
        await apiFetch(`/usuarios/${editMode}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
        setMensaje({ tipo: 'success', texto: 'Perfil actualizado correctamente.' });
        cancelarEdicion();
      } else {
        const data = await apiFetch('/usuarios/crear-staff', {
          method: 'POST',
          body: JSON.stringify({ ...formData, costoHora: Number(formData.costoHora) }),
        });
        setMensaje({ tipo: 'success', texto: `${data.nombre} ha sido agregado al equipo.` });
        setFormData({ nombre: '', email: '', password: '', especialidad: 'Diseñador Creativo', costoHora: '' });
      }
      setSuccessAnim(true);
      setTimeout(() => setSuccessAnim(false), 1100);
      cargarStaff();
    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message });
    } finally {
      setLoading(false);
    }
  };

  const staffFiltrado = staff.filter(miembro => {
    const nombre = miembro.nombre?.toLowerCase() || '';
    const email  = miembro.email?.toLowerCase()  || '';
    const coincideBusqueda    = nombre.includes(busqueda.toLowerCase()) || email.includes(busqueda.toLowerCase());
    const coincidenEspecialidad = filtroEspecialidad === 'todos' || miembro.especialidad === filtroEspecialidad;
    return coincideBusqueda && coincidenEspecialidad;
  });

  const costoTotalHora = staff.reduce((acc, m) => acc + (Number(m.costoHora) || 0), 0);
  const promedioHora   = staff.length > 0 ? costoTotalHora / staff.length : 0;

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* TOPBAR */}
      <header style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logo}>
            <IconShield size={18} />
          </div>
          <div>
            <div style={s.topbarName}>FJONIC Studio</div>
            <div style={s.topbarModule}>Gestión de Equipo</div>
          </div>
        </div>
        <div style={s.topbarDate}>{getTodayStr()}</div>
      </header>

      {/* HERO */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div>
            <div style={s.heroEyebrow}>Personal activo</div>
            <div style={s.heroAmount}>{staff.length}</div>
            <div style={s.heroHint}>
              {staff.length === 0
                ? 'Aún no hay miembros registrados en el equipo'
                : `${staff.length} miembro${staff.length !== 1 ? 's' : ''} en el equipo`}
            </div>
          </div>
          <div style={s.heroCards}>
            <HeroCard label="Miembros activos"    value={String(staff.length)}                accent="#05ABC4" />
            <HeroCard label="Costo total / hora"  value={formatoCOP.format(costoTotalHora)}   accent="#1C75BC" />
            <HeroCard label="Promedio por agente" value={formatoCOP.format(promedioHora)}      accent="#175A8C" />
          </div>
        </div>
      </section>

      {/* BODY */}
      <div style={s.body}>

        {/* ── SIDEBAR FORM ── */}
        <aside style={{
          ...s.form,
          borderLeft: editMode ? `4px solid #05ABC4` : `4px solid transparent`,
          transition: 'border-color .25s',
        }}>
          <div style={s.formHeader}>
            <div style={{
              ...s.formHeaderIcon,
              background: editMode ? '#0D3A66' : '#05ABC4',
            }}>
              {editMode ? <IconEdit size={18} /> : <IconUserPlus size={18} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={s.formHeaderTitle}>
                {editMode ? 'Editar miembro' : 'Agregar miembro'}
              </div>
              <div style={s.formHeaderSub}>
                {editMode ? 'Modifica los datos del perfil' : 'Registra un nuevo integrante del equipo'}
              </div>
            </div>
            {editMode && (
              <button style={s.cancelBtn} onClick={cancelarEdicion} title="Cancelar edición">
                <IconX size={18} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            <Field label="Nombre completo" hint="Nombre tal como aparecerá en el sistema.">
              <input
                required
                style={s.input}
                placeholder="Ej: María García Rodríguez"
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
              />
            </Field>

            <Field label="Correo electrónico" hint="Se usará para iniciar sesión.">
              <input
                required
                type="email"
                style={s.input}
                placeholder="correo@fjonic.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Field>

            <Field
              label={editMode ? 'Contraseña (opcional al editar)' : 'Contraseña'}
              hint={editMode ? 'Déjalo vacío para conservar la contraseña actual.' : 'Mínimo 6 caracteres.'}
            >
              <input
                required={!editMode}
                type="password"
                minLength={6}
                style={s.input}
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </Field>

            <Field label="Especialización">
              <div style={s.selectWrap}>
                <select
                  style={s.select}
                  value={formData.especialidad}
                  onChange={e => setFormData({ ...formData, especialidad: e.target.value })}
                >
                  {ESPECIALIDADES.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
                <div style={s.selectArrow}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="#4a7a9b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Field>

            <Field label="Costo por hora (COP)" hint="Solo números, sin puntos ni comas.">
              <div style={s.montoBox}>
                <span style={s.montoSign}>$</span>
                <input
                  required
                  type="number"
                  min="0"
                  style={s.montoInput}
                  placeholder="0"
                  value={formData.costoHora}
                  onChange={e => setFormData({ ...formData, costoHora: e.target.value })}
                />
                <span style={s.montoCOP}>COP</span>
              </div>
            </Field>

            {/* Mensaje */}
            {mensaje.texto && (
              <div style={{
                ...s.msgBox,
                background: mensaje.tipo === 'success' ? 'rgba(5,171,196,0.08)' : 'rgba(184,50,50,0.08)',
                borderColor: mensaje.tipo === 'success' ? '#05ABC4' : '#b83232',
                color:       mensaje.tipo === 'success' ? '#0D3A66' : '#b83232',
              }}>
                {mensaje.texto}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...s.saveBtn,
                background: editMode ? '#0D3A66' : '#1C75BC',
                ...(successAnim ? { background: '#175A8C' } : {}),
              }}
            >
              {loading ? (
                'Procesando...'
              ) : successAnim ? (
                <><IconCheck size={18} /><span>Guardado correctamente</span></>
              ) : (
                <><IconUserPlus size={18} /><span>{editMode ? 'Guardar cambios' : 'Agregar al equipo'}</span></>
              )}
            </button>
          </form>

          {/* Resumen por especialidad */}
          {staff.length > 0 && (
            <div style={s.summaryBox}>
              <div style={s.summaryTitle}>Distribución del equipo</div>
              {ESPECIALIDADES.map(esp => {
                const count = staff.filter(m => m.especialidad === esp).length;
                if (count === 0) return null;
                const pct = Math.round((count / staff.length) * 100);
                return (
                  <div key={esp} style={s.summaryRow}>
                    <div style={s.summaryLabel}>{esp}</div>
                    <div style={s.summaryBarWrap}>
                      <div style={{ ...s.summaryBar, width: `${pct}%` }} />
                    </div>
                    <div style={s.summaryCount}>{count}</div>
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* ── LIST PANEL ── */}
        <section style={s.listPanel}>

          {/* Stat cards */}
          <div style={s.statRow}>
            <StatCard icon={<IconUsers size={20} />}  label="Total miembros"     value={staff.length}                       color="#0D3A66" bg="rgba(13,58,102,0.08)" />
            <StatCard icon={<IconDollar size={20} />} label="Costo total / hora" value={formatoCOP.format(costoTotalHora)}  color="#1C75BC" bg="rgba(28,117,188,0.08)" />
            <StatCard icon={<IconTrend size={20} />}  label="Promedio por hora"  value={formatoCOP.format(promedioHora)}    color="#175A8C" bg="rgba(23,90,140,0.08)" />
          </div>

          {/* Search + filter */}
          <div style={s.filterBar}>
            <div style={s.searchWrap}>
              <span style={s.searchIcon}><IconSearch size={16} /></span>
              <input
                style={s.searchInput}
                placeholder="Buscar por nombre o correo..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </div>
            <div style={s.filterTabs}>
              <button
                style={{ ...s.ftab, ...(filtroEspecialidad === 'todos' ? s.ftabActive : {}) }}
                onClick={() => setFiltroEspecialidad('todos')}
              >
                Todos
                <span style={{ ...s.ftabBadge, background: '#0A1F33' }}>{staff.length}</span>
              </button>
              {ESPECIALIDADES.map(esp => {
                const count = staff.filter(m => m.especialidad === esp).length;
                if (count === 0) return null;
                return (
                  <button
                    key={esp}
                    style={{ ...s.ftab, ...(filtroEspecialidad === esp ? s.ftabActive : {}) }}
                    onClick={() => setFiltroEspecialidad(esp)}
                  >
                    {esp.split(' ')[0]}
                    <span style={{ ...s.ftabBadge, background: '#175A8C' }}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div style={s.grid}>
            {staffFiltrado.length === 0 ? (
              <div style={s.empty}>
                <div style={s.emptyIconBox}>
                  <IconUsers size={48} />
                </div>
                <div style={s.emptyTitle}>
                  {busqueda ? 'Sin resultados para tu búsqueda' : 'No hay miembros aún'}
                </div>
                <div style={s.emptyDesc}>
                  {busqueda
                    ? 'Intenta con otro nombre o correo electrónico.'
                    : 'Usa el formulario de la izquierda para agregar el primer integrante del equipo.'}
                </div>
              </div>
            ) : (
              staffFiltrado.map(miembro => (
                <MemberCard
                  key={miembro.id}
                  miembro={miembro}
                  isEditing={editMode === miembro.id}
                  confirmDelete={confirmDelete}
                  onEdit={() => activarEdicion(miembro)}
                  onDeleteRequest={() => setConfirmDelete(miembro.id)}
                  onDeleteConfirm={() => eliminarMiembro(miembro.id)}
                  onDeleteCancel={() => setConfirmDelete(null)}
                />
              ))
            )}
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

// ── MemberCard ─────────────────────────────────────────────────────────────────
function MemberCard({
  miembro, isEditing, confirmDelete,
  onEdit, onDeleteRequest, onDeleteConfirm, onDeleteCancel,
}: {
  miembro: any;
  isEditing: boolean;
  confirmDelete: string | null;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}) {
  const initials = miembro.nombre
    ?.split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div style={{
      ...s.card,
      borderTop: `3px solid ${isEditing ? '#05ABC4' : '#1C75BC'}`,
      boxShadow: isEditing ? '0 0 0 2px rgba(5,171,196,0.2)' : 'none',
    }}>
      {/* Card header */}
      <div style={s.cardHead}>
        <div style={s.cardAvatar}>{initials}</div>
        <div style={s.cardActions}>
          <button
            style={{ ...s.actionBtn, color: isEditing ? '#05ABC4' : '#4a7a9b' }}
            onClick={onEdit}
            title="Editar miembro"
          >
            <IconEdit size={15} />
            <span style={s.actionBtnLabel}>Editar</span>
          </button>
          {confirmDelete === miembro.id ? (
            <div style={s.confirmRow}>
              <span style={s.confirmQ}>¿Eliminar?</span>
              <button style={s.confirmYes} onClick={onDeleteConfirm}>Sí</button>
              <button style={s.confirmNo}  onClick={onDeleteCancel}>No</button>
            </div>
          ) : (
            <button
              style={{ ...s.actionBtn, color: '#b83232' }}
              onClick={onDeleteRequest}
              title="Eliminar miembro"
            >
              <IconTrash size={15} />
              <span style={s.actionBtnLabel}>Eliminar</span>
            </button>
          )}
        </div>
      </div>

      {/* Name & email */}
      <div style={s.cardName}>{miembro.nombre}</div>
      <div style={s.cardEmail}>{miembro.email}</div>

      {/* Especialidad */}
      <div style={s.cardBadge}>{miembro.especialidad}</div>

      {/* Footer */}
      <div style={s.cardFooter}>
        <div>
          <div style={s.cardCostLabel}>Costo por hora</div>
          <div style={s.cardCostVal}>{formatoCOP.format(miembro.costoHora || 0)}</div>
        </div>
        <div style={s.onlinePill}>
          <IconActivity size={10} />
          <span>Activo</span>
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
    width: 42, height: 42,
    background: '#05ABC4', borderRadius: 10,
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
  heroInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '2rem', flexWrap: 'wrap' as const,
  },
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

  // Body layout
  body: { display: 'grid', gridTemplateColumns: '400px 1fr', minHeight: 'calc(100vh - 200px)' },

  // Form
  form: {
    background: '#fff',
    borderRight: '1px solid #d0dce8',
    padding: '1.75rem 1.5rem',
    display: 'flex', flexDirection: 'column' as const, gap: '1.25rem',
    overflowY: 'auto' as const,
    borderLeft: '4px solid transparent',
  },
  formHeader: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
    paddingBottom: '1rem', borderBottom: '2px solid #eef2f7',
  },
  formHeaderIcon: {
    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff',
  },
  formHeaderTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, color: '#0A1F33', letterSpacing: '-0.01em' },
  formHeaderSub:   { fontSize: 12, color: '#4a7a9b', marginTop: 2 },
  cancelBtn: {
    width: 36, height: 36, borderRadius: 8,
    border: '1px solid #d0dce8', background: '#f4f7fb',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#4a7a9b', flexShrink: 0,
  },

  // Fields
  field:      { display: 'flex', flexDirection: 'column' as const, gap: 7 },
  fieldLabel: { fontSize: 14, fontWeight: 700, color: '#0A1F33', letterSpacing: '-0.01em' },
  fieldHint:  { fontSize: 12, color: '#4a7a9b', marginTop: 2 },

  input: {
    padding: '13px 15px', fontSize: 15, fontFamily: 'inherit',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, color: '#0A1F33', outline: 'none', width: '100%',
    transition: 'border .15s',
  },

  selectWrap: { position: 'relative' as const },
  select: {
    width: '100%', padding: '13px 40px 13px 15px',
    fontSize: 14, fontFamily: 'inherit',
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 10, color: '#0A1F33', outline: 'none',
    appearance: 'none' as const, WebkitAppearance: 'none' as const,
    cursor: 'pointer',
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
    padding: '13px 12px 13px 16px', fontSize: 22, fontWeight: 700,
    color: '#0D3A66', background: '#e8f0f7',
    borderRight: '1px solid #d0dce8', lineHeight: 1,
  },
  montoInput: {
    flex: 1, padding: '13px 12px', fontSize: 22,
    fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
    color: '#0A1F33', background: 'transparent', border: 'none', outline: 'none',
  },
  montoCOP: { padding: '0 14px', fontSize: 12, color: '#4a7a9b', letterSpacing: '0.06em', fontWeight: 700 },

  msgBox: {
    padding: '12px 15px', borderRadius: 10,
    border: '1.5px solid', fontSize: 14, fontWeight: 500, lineHeight: 1.5,
  },

  saveBtn: {
    width: '100%', padding: '16px',
    color: '#fff', border: 'none', borderRadius: 12,
    fontFamily: "'Syne','DM Sans',sans-serif", fontWeight: 700, fontSize: 15,
    cursor: 'pointer', transition: 'all .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 4px 18px rgba(28,117,188,0.25)', letterSpacing: '-0.01em',
  },

  // Summary
  summaryBox: {
    background: '#f4f7fb', border: '1px solid #d0dce8',
    borderRadius: 12, padding: '15px 16px',
    display: 'flex', flexDirection: 'column' as const, gap: 10,
  },
  summaryTitle: {
    fontSize: 12, fontWeight: 700, color: '#175A8C',
    textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4,
  },
  summaryRow:     { display: 'flex', alignItems: 'center', gap: 8 },
  summaryLabel:   { fontSize: 12, color: '#4a7a9b', width: 140, flexShrink: 0 },
  summaryBarWrap: { flex: 1, height: 6, background: '#d0dce8', borderRadius: 3, overflow: 'hidden' },
  summaryBar:     { height: '100%', background: '#1C75BC', borderRadius: 3, transition: 'width .4s' },
  summaryCount:   { fontSize: 13, fontWeight: 700, color: '#0D3A66', width: 20, textAlign: 'right' as const },

  // List panel
  listPanel: { background: '#eef2f7', display: 'flex', flexDirection: 'column' as const },

  // Stat row
  statRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
    background: '#fff', borderBottom: '1px solid #d0dce8',
  },
  statCard: { display: 'flex', alignItems: 'center', gap: 14, padding: '1.2rem 1.5rem', borderRight: '1px solid #d0dce8' },
  statIconBox: { width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statLabel: { fontSize: 11, color: '#4a7a9b', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.07em' },
  statVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700 },

  // Filter bar
  filterBar: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 1.5rem', background: '#fff', borderBottom: '1px solid #d0dce8',
    flexWrap: 'wrap' as const,
  },
  searchWrap: {
    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
    background: '#f4f7fb', border: '1.5px solid #d0dce8',
    borderRadius: 100, padding: '8px 16px', minWidth: 220,
  },
  searchIcon:  { color: '#4a7a9b', display: 'flex', flexShrink: 0 },
  searchInput: { flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: '#0A1F33', fontFamily: 'inherit' },

  filterTabs: { display: 'flex', gap: 6, flexWrap: 'wrap' as const },
  ftab: {
    padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600,
    cursor: 'pointer', border: '1.5px solid #d0dce8', background: '#f4f7fb',
    color: '#175A8C', transition: 'all .15s', fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 7,
  },
  ftabActive: { background: '#0A1F33', color: '#fff', borderColor: '#0A1F33' },
  ftabBadge:  { color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 100 },

  // Grid
  grid: {
    flex: 1, padding: '1.5rem',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
    gap: '1rem', alignContent: 'start' as const,
  },

  // Card
  card: {
    background: '#fff', border: '1px solid #d0dce8',
    borderRadius: 14, padding: '1.25rem',
    display: 'flex', flexDirection: 'column' as const, gap: 8,
    transition: 'box-shadow .2s, border-color .2s',
  },
  cardHead:    { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardAvatar: {
    width: 48, height: 48, borderRadius: 12,
    background: 'linear-gradient(135deg,#0D3A66,#1C75BC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16,
    letterSpacing: '-0.02em', flexShrink: 0,
  },
  cardActions: { display: 'flex', alignItems: 'center', gap: 4 },
  actionBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '5px 10px', border: '1px solid #d0dce8',
    borderRadius: 7, background: '#f4f7fb',
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all .15s',
  },
  actionBtnLabel: { fontSize: 12 },
  cardName:   { fontSize: 16, fontWeight: 700, color: '#0A1F33', letterSpacing: '-0.01em', marginTop: 4 },
  cardEmail:  { fontSize: 12, color: '#4a7a9b', fontFamily: "'JetBrains Mono',monospace" },
  cardBadge: {
    display: 'inline-flex', alignSelf: 'flex-start' as const,
    padding: '4px 10px', borderRadius: 6,
    background: 'rgba(28,117,188,0.09)', color: '#1C75BC',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
    marginTop: 4,
  },
  cardFooter: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    marginTop: 8, paddingTop: 12, borderTop: '1px solid #e8f0f7',
  },
  cardCostLabel: { fontSize: 11, color: '#4a7a9b', textTransform: 'uppercase' as const, letterSpacing: '0.07em', marginBottom: 3 },
  cardCostVal:   { fontFamily: "'JetBrains Mono',monospace", fontSize: 17, fontWeight: 700, color: '#0D3A66' },
  onlinePill: {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '4px 10px', borderRadius: 100,
    background: 'rgba(5,171,196,0.1)', color: '#086f80',
    fontSize: 11, fontWeight: 700,
  },

  // Confirm delete
  confirmRow: { display: 'flex', alignItems: 'center', gap: 5 },
  confirmQ:   { fontSize: 12, color: '#b83232', fontWeight: 700 },
  confirmYes: { padding: '4px 9px', background: '#b83232', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' },
  confirmNo:  { padding: '4px 9px', background: '#e8f0f7', color: '#0A1F33', border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' },

  // Empty
  empty: {
    gridColumn: '1 / -1',
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center',
    padding: '5rem 2rem', gap: 16, textAlign: 'center' as const, background: '#fff',
    borderRadius: 14, border: '1px solid #d0dce8',
  },
  emptyIconBox: {
    width: 88, height: 88, borderRadius: 22,
    background: 'rgba(28,117,188,0.07)', border: '1.5px solid #d0dce8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#175A8C', marginBottom: 4,
  },
  emptyTitle: { fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, color: '#0A1F33' },
  emptyDesc:  { fontSize: 14, color: '#4a7a9b', maxWidth: 360, lineHeight: 1.7 },
};