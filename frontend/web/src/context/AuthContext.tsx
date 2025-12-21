'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/* =========================
    TIPOS (Mejorados)
========================= */

// Definimos los roles como tipos literales para evitar errores de dedo
export type RolUsuario = 'admin' | 'staff' | 'cliente';

export interface Usuario {
  id?: string;
  email?: string;
  rol?: RolUsuario; // Ahora es tipado estricto
  nombre?: string;
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

  // Restaurar sesión al cargar
  useEffect(() => {
    const restaurarSesion = () => {
      try {
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');

        if (tokenGuardado && usuarioGuardado) {
          setToken(tokenGuardado);
          setUsuario(JSON.parse(usuarioGuardado));
        }
      } catch (error) {
        console.error('Error restaurando sesión:', error);
        localStorage.clear(); // Limpia todo si hay error de parseo
      } finally {
        setLoading(false);
      }
    };

    restaurarSesion();
  }, []);

  const login = (nuevoToken: string, nuevoUsuario?: Usuario) => {
    setToken(nuevoToken);
    localStorage.setItem('token', nuevoToken);

    if (nuevoUsuario) {
      setUsuario(nuevoUsuario);
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
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