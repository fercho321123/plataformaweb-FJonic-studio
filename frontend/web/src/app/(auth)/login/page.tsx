'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      if (!res.ok) throw new Error('Credenciales incorrectas');

      const data = await res.json();
      login(data.access_token, data.usuario);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-[#0D3A66] mb-6">
        Iniciar sesión
      </h1>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="Contraseña"
          className="w-full p-3 rounded border border-gray-300
                     bg-white text-black placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-[#1C75BC]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0D3A66] text-white py-3 rounded font-semibold
                     hover:bg-[#175A8C] transition
                     disabled:opacity-60"
        >
          {loading ? 'Ingresando…' : 'Entrar'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        ¿No tienes cuenta?
        <a
          href="/register"
          className="text-[#1C75BC] font-medium ml-1 hover:underline"
        >
          Crear cuenta
        </a>
      </p>
    </>
  );
}
