'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('usuario');

    if (token && user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const login = (token: string, usuario: Usuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
