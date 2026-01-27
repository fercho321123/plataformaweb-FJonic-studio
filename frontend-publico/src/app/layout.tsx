// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FJONIC Studio - Agencia de Marketing Digital',
  description: 'Estudio estratégico de marketing digital y producción audiovisual. Construimos marcas coherentes, sólidas y perdurables.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0A1F33] text-white antialiased">
        {children}
      </body>
    </html>
  );
}