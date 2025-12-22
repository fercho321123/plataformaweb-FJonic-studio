'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  activo: boolean;
}

export default function ClientesPage() {
  const { token, usuario } = useAuth();
  const esAdminOStaff = usuario?.rol === 'admin' || usuario?.rol === 'staff';

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para creación
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');

  // Estados para edición
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [nombreEdit, setNombreEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [telEdit, setTelEdit] = useState('');
  const [empEdit, setEmpEdit] = useState('');

  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<'todos' | 'activos' | 'inactivos'>('todos');

  const cargarClientes = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/clientes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al cargar clientes');
      const data = await res.json();
      setClientes(data.map((c: any) => ({ ...c, activo: c.activo ?? true })));
    } catch (err) {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, [token]);

  const guardarEdicion = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nombreEdit,
          email: emailEdit,
          telefono: telEdit,
          empresa: empEdit,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      // Actualización local para no recargar todo
      setClientes(prev => prev.map(c => c.id === id ? { ...c, nombre: nombreEdit, email: emailEdit, telefono: telEdit, empresa: empEdit } : c));
      setEditandoId(null);
    } catch (err: any) {
      alert(err.message || 'Error al actualizar cliente');
    }
  };

  const alternarEstado = async (id: string, estadoActual: boolean) => {
    // Actualización optimista
    setClientes(prev => prev.map(c => c.id === id ? { ...c, activo: !estadoActual } : c));

    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ activo: !estadoActual }),
      });

      if (!res.ok) throw new Error();
    } catch (err) {
      alert('Error en el servidor al cambiar estado');
      cargarClientes(); // Revertir cargando de nuevo
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, email, telefono, empresa }),
      });
      
      if (!res.ok) throw new Error('No se pudo crear el cliente');
      
      setNombre(''); setEmail(''); setTelefono(''); setEmpresa('');
      cargarClientes();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // ✅ CORREGIDO: Eliminación optimista y manejo de errores 404
  const eliminarCliente = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este cliente? Se borrarán todos sus proyectos e hitos asociados.')) return;
    
    try {
      const res = await fetch(`http://localhost:3001/clientes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Si se borró con éxito (200/204) o si el servidor dice que ya no existe (404)
      if (res.ok || res.status === 404) {
        setClientes(prev => prev.filter(c => c.id !== id));
      } else {
        throw new Error('Error de integridad');
      }
    } catch (err) {
      alert('No se pudo eliminar el cliente. Verifique las dependencias en el servidor.');
    }
  };

  const clientesFiltrados = clientes.filter((c) => {
    const coincideBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             c.empresa.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = estadoFiltro === 'todos' || 
                           (estadoFiltro === 'activos' && c.activo) || 
                           (estadoFiltro === 'inactivos' && !c.activo);
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="space-y-10 p-4">
      <h1 className="text-3xl font-bold text-[#0D3A66]">Gestión de Clientes</h1>

      {esAdminOStaff && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow max-w-xl border">
          <h2 className="text-lg font-semibold text-[#0D3A66] mb-4">Crear nuevo cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input className="border p-2 rounded text-black outline-none focus:ring-1 focus:ring-blue-500" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input className="border p-2 rounded text-black outline-none focus:ring-1 focus:ring-blue-500" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="border p-2 rounded text-black outline-none focus:ring-1 focus:ring-blue-500" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            <input className="border p-2 rounded text-black outline-none focus:ring-1 focus:ring-blue-500" placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required />
          </div>
          <button className="mt-4 bg-[#0D3A66] text-white px-4 py-2 rounded hover:bg-[#175A8C] transition-colors">Crear cliente</button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        <input placeholder="Buscar por nombre o empresa..." className="border p-2 rounded flex-1 min-w-[200px] text-black" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <select className="border p-2 rounded text-black bg-white" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value as any)}>
          <option value="todos">Todos los estados</option>
          <option value="activos">Activos</option>
          <option value="inactivos">Inactivos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500">Cargando datos...</p>
        ) : clientesFiltrados.length === 0 ? (
          <p className="text-gray-400">No se encontraron clientes.</p>
        ) : clientesFiltrados.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-2xl shadow border hover:shadow-md transition-shadow">
            {editandoId === c.id ? (
              <div className="space-y-3">
                <p className="text-xs font-bold text-blue-600 uppercase">Editando Cliente</p>
                <input className="w-full border p-2 rounded text-black text-sm" placeholder="Nombre" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)} />
                <input className="w-full border p-2 rounded text-black text-sm" placeholder="Empresa" value={empEdit} onChange={(e) => setEmpEdit(e.target.value)} />
                <input className="w-full border p-2 rounded text-black text-sm" placeholder="Email" value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} />
                <input className="w-full border p-2 rounded text-black text-sm" placeholder="Teléfono" value={telEdit} onChange={(e) => setTelEdit(e.target.value)} />
                <div className="flex gap-2 pt-2">
                  <button onClick={() => guardarEdicion(c.id)} className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-xs font-semibold hover:bg-green-700">Guardar</button>
                  <button onClick={() => setEditandoId(null)} className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-xs font-semibold hover:bg-gray-300">Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-[#0D3A66] truncate pr-2">{c.nombre}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${c.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div className="text-sm space-y-1 text-gray-700">
                  <p><span className="font-medium text-gray-400">Empresa:</span> {c.empresa}</p>
                  <p><span className="font-medium text-gray-400">Email:</span> {c.email}</p>
                  <p><span className="font-medium text-gray-400">Tel:</span> {c.telefono}</p>
                </div>
                {esAdminOStaff && (
                  <div className="mt-4 flex gap-3 border-t pt-3 items-center">
                    <button onClick={() => { 
                      setEditandoId(c.id); 
                      setNombreEdit(c.nombre); 
                      setEmailEdit(c.email); 
                      setTelEdit(c.telefono); 
                      setEmpEdit(c.empresa); 
                    }} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">Editar</button>
                    
                    <button onClick={() => alternarEstado(c.id, c.activo)} className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                      {c.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    
                    <button onClick={() => eliminarCliente(c.id)} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors ml-auto">
                      Eliminar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}