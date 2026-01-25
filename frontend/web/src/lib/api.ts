export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 1. OBTENCIÓN DE URL CON DEBUG
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Si sigue saliendo localhost en Vercel, este log te lo confirmará en la consola del navegador
  if (!rawBaseUrl && typeof window !== "undefined") {
    console.warn("⚠️ Advertencia: NEXT_PUBLIC_API_URL no está definida. Usando localhost.");
  }

  const baseUrl = (rawBaseUrl || "http://localhost:3001").replace(/\/$/, ""); 
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`; 
  const url = `${baseUrl}${cleanEndpoint}`;

  // 2. HEADERS
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
      credentials: "include", 
      cache: "no-store",
    });

    // 3. MANEJO DE RESPUESTA
    if (!res.ok) {
      let errorMessage = `Error HTTP: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const errText = await res.text().catch(() => "");
        errorMessage = errText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (res.status === 204) return null;
    return await res.json();
  } catch (error) {
    // Si el error es "Failed to fetch", imprime la URL intentada para debuggear
    console.error(`❌ FETCH FAILED a la URL: ${url}`, error);
    throw error;
  }
}