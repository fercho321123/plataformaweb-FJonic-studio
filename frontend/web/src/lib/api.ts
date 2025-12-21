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

  // 3. Validar la URL base
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const url = `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    // 4. Manejo de errores robusto
    if (!res.ok) {
      // Intentamos leer el error como JSON, si falla, usamos texto plano
      let errorMessage = `Error HTTP: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const errText = await res.text();
        errorMessage = errText || errorMessage;
      }
      
      console.error("❌ ERROR API:", res.status, errorMessage);
      throw new Error(errorMessage);
    }

    // 5. Manejo de respuestas vacías (ej. 204 No Content)
    if (res.status === 204) return null;

    return await res.json();
  } catch (error) {
    console.error("❌ FETCH FAILED:", error);
    throw error;
  }
}