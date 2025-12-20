'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <>
      <h1 className="text-2xl font-bold text-center text-[#0D3A66] mb-6">
        Crear cuenta
      </h1>

      {mensaje && (
        <p className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center text-sm">
          {mensaje}
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full p-3 rounded border border-gray-300
                     bg-white text-black placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#1C75BC]"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 rounded border border-gray-300
                     bg-white text-black placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#1C75BC]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 8 caracteres)"
          className={`w-full p-3 rounded border
            ${passwordFuerte ? 'border-green-500' : 'border-gray-300'}
            bg-white text-black placeholder-gray-500
            focus:outline-none focus:ring-2
            ${passwordFuerte ? 'focus:ring-green-500' : 'focus:ring-[#1C75BC]'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p
          className={`text-xs ${
            passwordFuerte ? 'text-green-600' : 'text-gray-500'
          }`}
        >
          {passwordFuerte
            ? 'Contraseña segura'
            : 'Usa al menos 8 caracteres'}
        </p>

        <button
          type="submit"
          disabled={loading || !passwordFuerte}
          className="w-full bg-[#0D3A66] text-white py-3 rounded font-semibold
                     hover:bg-[#175A8C] transition
                     disabled:opacity-60"
        >
          {loading ? 'Creando cuenta…' : 'Registrarse'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        ¿Ya tienes cuenta?
        <a
          href="/login"
          className="text-[#1C75BC] font-medium ml-1 hover:underline"
        >
          Iniciar sesión
        </a>
      </p>
    </>
  );
}

