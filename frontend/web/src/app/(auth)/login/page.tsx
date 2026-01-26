'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      login(data.access_token, data.usuario);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error de conexión con la API de FJonic');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#0A1F33]" />;

  return (
    // Cambiamos 'fixed' y 'overflow-hidden' por 'relative' y 'min-h-screen'
    <div className="relative min-h-screen w-full flex flex-col justify-center bg-[#0A1F33]">
      
      {/* FONDO: Se mantiene fijo para que no se mueva al hacer scroll */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url('/utilidades/empresadefrente.png')",
            animation: 'slowZoom 20s infinite alternate'
          }}
        />
        {/* Overlay protector */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#0A1F33]/95 via-[#0A1F33]/80 to-[#0A1F33]/50" />
      </div>

      {/* CONTENIDO SCROLLABLE: Añadimos padding vertical (py-12) para que el contenido no pegue a los bordes */}
      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center p-6 py-12 md:p-12 gap-12 lg:gap-24">
        
        {/* COLUMNA IZQUIERDA: BIENVENIDA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:flex-1 text-center md:text-left text-white space-y-6"
        >
          <img 
            src="/logoblanco.png" 
            alt="Logo FJonic" 
            className="w-20 md:w-28 mx-auto md:mx-0 mb-4 md:mb-8 drop-shadow-[0_0_15px_rgba(5,171,202,0.6)]" 
          />
          <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter">
            Bienvenido <br />
            <span className="text-[#05ABCA]">de nuevo</span>
          </h1>
          <p className="text-slate-200 max-w-md mx-auto md:mx-0 text-base md:text-lg leading-relaxed font-medium">
            Impulsa tu presencia digital con la tecnología de FJonic Studio.
          </p>
          
          <div className="flex justify-center md:justify-start gap-6 pt-4">
            <FiFacebook className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all" />
            <FiTwitter className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all" />
            <FiInstagram className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all" />
            <FiYoutube className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all" />
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#0A1F33]/70 backdrop-blur-3xl border border-white/20 p-8 md:p-10 rounded-[2rem] shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Iniciar Sesión</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#05ABCA] uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#05ABCA] transition-all"
                  placeholder="usuario@agencia.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#05ABCA] uppercase tracking-[0.2em] ml-1">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#05ABCA] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#05ABCA]" />
                  <span>Recordarme</span>
                </label>
                <button type="button" className="hover:text-[#05ABCA] transition-colors">¿Olvidaste tu contraseña?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#05ABCA] hover:bg-[#1C75BC] text-[#0A1F33] font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group uppercase tracking-widest text-xs"
              >
                {loading ? 'Cargando...' : (
                  <>
                    Ingresar ahora
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-6 border-t border-white/10 text-center">
                <p className="text-[9px] text-slate-400 leading-relaxed uppercase tracking-tighter">
                  Al ingresar, aceptas nuestros <br />
                  <span className="text-[#05ABCA] cursor-pointer">Términos</span> y <span className="text-[#05ABCA] cursor-pointer">Privacidad</span>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      <style jsx global>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        /* Aseguramos que el body permita scroll si el contenido crece */
        body {
          overflow-y: auto !important;
          background-color: #0A1F33;
        }
      `}</style>
    </div>
  );
}