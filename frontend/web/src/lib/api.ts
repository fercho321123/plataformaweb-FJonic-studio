export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // 1. Obtener el token de forma segura
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 2. Construir headers de forma limpia
  const headers = new Headers(options.headers);
  
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // 3. Validar y limpiar la URL (Evita el 301 Redirect que rompe el CORS)
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const baseUrl = rawBaseUrl.replace(/\/$/, ""); // Quita barra al final de la base
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`; // Asegura barra al inicio del endpoint
  
  const url = `${baseUrl}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      mode: "cors", // Forzamos modo CORS
      cache: "no-store", // Evitamos respuestas cacheadas viejas
    });

    // 4. Manejo de errores robusto
    if (!res.ok) {
      let errorMessage = `Error HTTP: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        try {
          const errText = await res.text();
          errorMessage = errText || errorMessage;
        } catch {
          // Si todo falla, mantenemos el mensaje por defecto
        }
      }
      
      console.error("❌ ERROR API:", res.status, errorMessage);
      throw new Error(errorMessage);
    }

    // 5. Manejo de respuestas vacías (ej. 204 No Content)
    if (res.status === 204) return null;

    return await res.json();
  } catch (error) {
    // Si el error es de red (CORS, DNS, etc.)
    console.error("❌ FETCH FAILED:", error);
    throw error;
  }
}