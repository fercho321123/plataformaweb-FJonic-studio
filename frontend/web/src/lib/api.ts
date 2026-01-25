export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const baseUrl = rawBaseUrl.replace(/\/$/, ""); 
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`; 
  const url = `${baseUrl}${cleanEndpoint}`;

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
      credentials: "include", // Cambio clave para dominios distintos
      cache: "no-store",
    });

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
    console.error("❌ FETCH FAILED:", error);
    throw error;
  }
}