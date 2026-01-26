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
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* IMAGEN DE FONDO PERSONALIZADA */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-110"
        style={{
          backgroundImage: "url('/utilidades/empresadefrente.png')",
          animation: 'slowZoom 20s infinite alternate'
        }}
      >
        {/* Overlay para legibilidad con los colores de tu paleta */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F33]/90 via-[#0A1F33]/70 to-[#0A1F33]/40" />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center p-6 md:p-12 gap-12">
        
        {/* COLUMNA IZQUIERDA: BIENVENIDA */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 text-white space-y-6"
        >
          <img src="/logoblanco.png" alt="Logo FJonic" className="w-24 mb-8 drop-shadow-[0_0_15px_rgba(5,171,202,0.6)]" />
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            Bienvenido <br />
            <span className="text-[#05ABCA]">de nuevo</span>
          </h1>
          <p className="text-slate-200 max-w-md text-lg leading-relaxed font-medium drop-shadow-md">
            Impulsa tu presencia digital con la tecnología de FJonic Studio. Accede a tu panel de control integral para agencias de marketing.
          </p>
          
          {/* Iconos de Redes Sociales */}
          <div className="flex gap-6 pt-6">
            <FiFacebook className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all hover:scale-110" />
            <FiTwitter className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all hover:scale-110" />
            <FiInstagram className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all hover:scale-110" />
            <FiYoutube className="text-2xl cursor-pointer hover:text-[#05ABCA] transition-all hover:scale-110" />
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#0A1F33]/60 backdrop-blur-2xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-3xl font-bold text-white mb-8">Iniciar Sesión</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#05ABCA] uppercase tracking-widest ml-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#05ABCA] focus:bg-white/20 transition-all placeholder:text-slate-400"
                  placeholder="usuario@agencia.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#05ABCA] uppercase tracking-widest ml-1">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#05ABCA] focus:bg-white/20 transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-[#05ABCA] transition-all" />
                  <span className="group-hover:text-white transition-colors">Recordarme</span>
                </label>
                <button type="button" className="hover:text-[#05ABCA] transition-colors font-semibold">¿Olvidaste tu contraseña?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#05ABCA] hover:bg-[#1C75BC] text-[#0A1F33] font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(5,171,202,0.3)]"
              >
                {loading ? 'Validando...' : (
                  <>
                    Ingresar ahora
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-6 border-t border-white/10 text-center">
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Al hacer clic en "Ingresar ahora", aceptas nuestros <br />
                  <span className="text-[#05ABCA] cursor-pointer hover:underline">Términos de Servicio</span> | <span className="text-[#05ABCA] cursor-pointer hover:underline">Política de Privacidad</span>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      <style jsx>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}