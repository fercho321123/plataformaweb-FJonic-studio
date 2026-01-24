/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esto le dice a Next.js que no se detenga por errores de TypeScript o Lint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;