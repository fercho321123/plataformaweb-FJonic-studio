'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiShield, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordFuerte = password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register-cliente`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      setMensaje('Cuenta creada exitosamente. Redirigiendo…');

      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A1F33] via-[#0d2640] to-[#0A1F33] overflow-hidden flex items-center justify-center p-6">
      
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
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#1C75BC]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* LÍNEAS TECNOLÓGICAS ANIMADAS */}
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent"
        style={{ width: '100%', top: '30%' }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-px bg-gradient-to-b from-transparent via-[#1C75BC]/50 to-transparent"
        style={{ height: '100%', left: '70%' }}
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute h-px bg-gradient-to-r from-transparent via-[#05ABCA]/30 to-transparent"
        style={{ width: '100%', bottom: '20%' }}
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative bg-gradient-to-br from-[#0d2640]/80 to-[#0A1F33]/80 backdrop-blur-xl rounded-3xl border border-[#05ABCA]/20 overflow-hidden shadow-2xl">
          
          {/* GLOW TOP */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA] to-transparent" />
          
          <div className="p-8">
            
            {/* LOGO Y TÍTULO */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#05ABCA] to-[#1C75BC] flex items-center justify-center shadow-lg shadow-[#05ABCA]/30">
                <FiShield className="text-white" size={36} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Crear Cuenta
              </h1>
              <p className="text-slate-400 text-sm">
                Únete a la plataforma FJONIC
              </p>
            </motion.div>

            {/* SUCCESS MESSAGE */}
            {mensaje && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium text-center flex items-center justify-center gap-2"
              >
                <FiCheck size={18} />
                {mensaje}
              </motion.div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium text-center flex items-center justify-center gap-2"
              >
                <FiAlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {/* FORMULARIO */}
            <div className="space-y-5">
              
              {/* NOMBRE */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                  <FiUser size={12} />
                  Nombre Completo
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Juan Pérez"
                    className="w-full bg-[#0A1F33]/50 border border-[#05ABCA]/20 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-[#05ABCA] focus:bg-[#0A1F33]/80 transition-all"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
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

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#05ABCA] uppercase tracking-wider flex items-center gap-2">
                  <FiLock size={12} />
                  Contraseña
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    className={`w-full bg-[#0A1F33]/50 border rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:bg-[#0A1F33]/80 transition-all ${
                      passwordFuerte 
                        ? 'border-emerald-500/50 focus:border-emerald-500' 
                        : 'border-[#05ABCA]/20 focus:border-[#05ABCA]'
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {/* INDICADOR DE SEGURIDAD */}
                <div className="flex items-center gap-2 mt-2">
                  {passwordFuerte ? (
                    <>
                      <FiCheck className="text-emerald-500" size={14} />
                      <span className="text-xs text-emerald-500 font-medium">
                        Contraseña segura
                      </span>
                    </>
                  ) : (
                    <>
                      <FiAlertCircle className="text-slate-500" size={14} />
                      <span className="text-xs text-slate-500">
                        Usa al menos 8 caracteres
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* BOTÓN SUBMIT */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading || !passwordFuerte}
                className="w-full bg-gradient-to-r from-[#05ABCA] to-[#1C75BC] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-[#05ABCA]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    Registrarse
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-[#05ABCA]/10 text-center">
              <p className="text-sm text-slate-400">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-[#05ABCA] font-bold hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </div>

          {/* GLOW BOTTOM */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#05ABCA]/50 to-transparent" />
        </div>

        {/* DECORACIÓN EXTERIOR */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#05ABCA]/5 to-[#1C75BC]/5 rounded-3xl blur-xl -z-10" />
      </motion.div>

      {/* CORNER DECORATIONS */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#05ABCA]/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#05ABCA]/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#05ABCA]/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#05ABCA]/20" />

      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </div>
  );
}