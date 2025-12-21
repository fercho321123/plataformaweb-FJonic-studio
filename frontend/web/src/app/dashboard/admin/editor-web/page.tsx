'use client';

import { useState } from 'react';

// --- TIPOS ---
interface SeccionWeb {
  id: string;
  nombre: string;
  campos: {
    label: string;
    key: string;
    valor: string;
    tipo: 'text' | 'textarea';
  }[];
}

// --- DATA INICIAL (Simulando el contenido de tu landing) ---
const SECCIONES_INICIALES: SeccionWeb[] = [
  {
    id: 'hero',
    nombre: 'Sección Principal (Hero)',
    campos: [
      { label: 'Título Principal', key: 'title', valor: 'Creamos soluciones digitales modernas', tipo: 'text' },
      { label: 'Subtítulo', key: 'subtitle', valor: 'Potenciamos empresas con tecnología de alto impacto.', tipo: 'textarea' },
      { label: 'Texto Botón CTA', key: 'cta', valor: 'Iniciar Proyecto', tipo: 'text' },
    ]
  },
  {
    id: 'servicios',
    nombre: 'Sección Servicios',
    campos: [
      { label: 'Título Sección', key: 's_title', valor: 'Nuestros Servicios Premium', tipo: 'text' },
      { label: 'Descripción', key: 's_desc', valor: 'Soluciones integrales de branding y desarrollo.', tipo: 'textarea' },
    ]
  }
];

export default function EditorWebPage() {
  const [secciones, setSecciones] = useState(SECCIONES_INICIALES);
  const [guardando, setGuardando] = useState(false);

  const handleSave = () => {
    setGuardando(true);
    // Simulación de guardado en API
    setTimeout(() => {
      setGuardando(false);
      alert('¡Contenido actualizado correctamente en la Web!');
    }, 1500);
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[#05ABCA] font-black uppercase tracking-[0.3em] text-[10px] font-montserrat">CMS Interno</span>
          <h1 className="text-4xl font-black font-montserrat text-[#0A1F33] mt-2">Editor de Contenido</h1>
          <p className="text-slate-500 text-sm mt-1">Modifica los textos de la página principal en tiempo real.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={guardando}
          className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
            guardando 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-[#05ABCA] text-white hover:bg-[#0A1F33] shadow-blue-500/20'
          }`}
        >
          {guardando ? 'Guardando...' : 'Publicar Cambios'}
        </button>
      </div>

      {/* FORMULARIO POR SECCIONES */}
      <div className="space-y-8">
        {secciones.map((seccion) => (
          <div key={seccion.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50/50 px-8 py-4 border-b border-slate-100">
              <h3 className="text-[10px] font-black text-[#0A1F33] uppercase tracking-[0.2em]">{seccion.nombre}</h3>
            </div>
            
            <div className="p-8 space-y-6">
              {seccion.campos.map((campo, index) => (
                <div key={campo.key} className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase ml-1">
                    {campo.label}
                  </label>
                  
                  {campo.tipo === 'text' ? (
                    <input 
                      type="text" 
                      defaultValue={campo.valor}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold text-[#0A1F33] focus:ring-2 focus:ring-[#05ABCA]/20 focus:border-[#05ABCA] outline-none transition-all"
                    />
                  ) : (
                    <textarea 
                      rows={3}
                      defaultValue={campo.valor}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold text-[#0A1F33] focus:ring-2 focus:ring-[#05ABCA]/20 focus:border-[#05ABCA] outline-none transition-all resize-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MOCKUP */}
      <div className="bg-[#0A1F33] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
             <span className="text-[#05ABCA] text-[10px] font-black uppercase tracking-widest">Vista Previa</span>
             <h4 className="text-2xl font-black font-montserrat mt-2">Así se verá tu sitio</h4>
             <p className="text-blue-200/60 text-sm mt-2 font-open-sans italic">
               Los cambios aplicados en este editor se reflejan inmediatamente en la base de datos que alimenta tu Landing Page.
             </p>
          </div>
          <div className="w-full md:w-48 h-32 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#05ABCA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
        </div>
      </div>

    </div>
  );
}