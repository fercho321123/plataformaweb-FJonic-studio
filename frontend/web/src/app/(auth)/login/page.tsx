'use client';

import { useState, useEffect } from 'react'; // 1. Agregado useEffect
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // 2. Estado para control de hidratación

  // 3. Efecto para confirmar que el cliente está listo
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const data = await res.json();
      login(data.access_token, data.usuario);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  // 4. Evita el renderizado hasta que el cliente esté montado
  if (!mounted) {
    return <div className="min-h-screen bg-[#0A1F33]" />;
  }

  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-[#0A1F33] via-[#0d2640] to-[#0A1F33] overflow-hidden flex items-center justify-center p-6"
      suppressHydrationWarning // 5. Atributo de seguridad para atributos dinámicos
    >
      
      {/* GRID ANIMADO DE FONDO */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#05ABCA 1px, transparent 1px), linear-gradient(90deg, #05ABCA 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* CÍRCULOS GRADIENTES ANIMADOS */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-[#05ABCA]/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-3xl border border-[#05ABCA]/20 overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
          
          <div className="p-8">
            
            {/* LOGO FJONIC STUDIO ACTUALIZADO */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-center mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src="/logoblanco.png" 
                  alt="FJonic Studio Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(5,171,202,0.5)]"
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                FJonic Studio
              </h1>
              <p className="text-slate-400 text-sm">
                Plataforma Web Integral
              </p>
            </motion.div>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                  <FiMail size={12} />
                  Correo Electrónico
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                  <FiLock size={12} />
                  Contraseña
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Validando...
                  </>
                ) : (
                  <>
                    Entrar
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#05ABCA]/10 text-center">
              <p className="text-sm text-slate-400">
                ¿No tienes cuenta?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-[#05ABCA] font-bold hover:underline"
                >
                  Contactar Soporte
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
      `}</style>
    </div>
  );
}