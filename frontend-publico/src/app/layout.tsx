// src/app/layout.tsx
import Navbar from '@/src/components/Navbar'; // Ajusta la ruta si es necesario
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-[#0A1F33]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}