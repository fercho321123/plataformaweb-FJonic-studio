'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/* =========================
   TIPOS
========================= */

export interface Usuario {
  id?: string;
  email?: string;
  rol?: string;
}

interface AuthContextType {
  token: string | null;
  usuario: Usuario | null;
  login: (token: string, usuario?: Usuario) => void;
  logout: () => void;
  loading: boolean;
}

/* =========================
   CONTEXTO
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const tokenGuardado = localStorage.getItem('token');
      const usuarioGuardado = localStorage.getItem('usuario');

      if (tokenGuardado) setToken(tokenGuardado);
      if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
    } catch (error) {
      console.error('Error restaurando sesión:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token: string, usuario?: Usuario) => {
    setToken(token);
    localStorage.setItem('token', token);

    if (usuario) {
      setUsuario(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
