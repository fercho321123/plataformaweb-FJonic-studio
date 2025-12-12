export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // 👉 Agregar token si existe
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ ERROR API:", res.status, errText);
    throw new Error(`Error HTTP: ${res.status} - ${errText}`);
  }

  return res.json();
}

