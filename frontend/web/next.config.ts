import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Usamos 'as any' temporalmente si la versión 16 de los @types 
  // aún no ha mapeado correctamente la propiedad, o simplemente
  // removemos el bloque si vas a manejar el lint por separado.
  ...({
    eslint: {
      ignoreDuringBuilds: true,
    },
  } as any),
};

export default nextConfig;