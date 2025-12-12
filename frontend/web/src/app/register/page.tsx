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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register-cliente`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar');
      }

      setMensaje('Cuenta creada exitosamente. Ahora inicia sesión.');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h1>

        {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full p-2 mb-4 text-black"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-6 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 w-full p-2 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>

        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-400 underline">
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
}
