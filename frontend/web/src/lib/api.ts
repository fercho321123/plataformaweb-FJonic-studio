export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001")
    .replace(/\/$/, "");

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const headers = new Headers(options.headers);

  // ✅ SOLO poner Content-Type si hay body
  if (options.body && !headers.has("Content-Type")) {
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

    if (!res.ok) {
      let errorMessage = `Error HTTP: ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = await res.text();
      }
      throw new Error(errorMessage);
    }

    if (res.status === 204) return null;
    return await res.json();
  } catch (error) {
    console.error(`❌ FETCH FAILED a la URL: ${url}`, error);
    throw error;
  }
}
