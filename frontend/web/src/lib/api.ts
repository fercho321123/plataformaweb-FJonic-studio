export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // ✅ Si ya vienen headers, los mezclamos
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  // ✅ AQUÍ VA EL TOKEN DE FORMA SEGURA (SIN ROJOS)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error HTTP: ${res.status} - ${errorText}`);
  }

  return res.json();
}
