export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 1. Limpieza de URL (Tu lógica es perfecta, la mantenemos)
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const baseUrl = rawBaseUrl.replace(/\/$/, ""); 
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`; 
  const url = `${baseUrl}${cleanEndpoint}`;

  // 2. Construcción de Headers
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      mode: "cors",
      // AGREGAMOS ESTO: Ayuda a que las peticiones OPTIONS sean más estables
      credentials: options.credentials || "same-origin", 
      cache: "no-store",
    });

    // 3. Manejo de errores (Tu lógica es excelente)
    if (!res.ok) {
      let errorMessage = `Error HTTP: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const errText = await res.text().catch(() => "");
        errorMessage = errText || errorMessage;
      }
      
      console.error("❌ ERROR API:", res.status, errorMessage);
      throw new Error(errorMessage);
    }

    if (res.status === 204) return null;
    return await res.json();
  } catch (error) {
    // Si el error llega aquí y dice "TypeError: Failed to fetch"
    // es 99% seguro que es un bloqueo de CORS del navegador.
    console.error("❌ FETCH FAILED:", error);
    throw error;
  }
}