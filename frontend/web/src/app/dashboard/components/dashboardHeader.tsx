'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="w-full h-16 bg-[#0A1F33] flex items-center justify-between px-6 shadow-md">
      {/* Logo + Nombre */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        <Image
          src="/logo-fjonic.png"
          alt="FJONIC Studio"
          width={40}
          height={40}
          priority
        />
        <span className="text-white font-semibold tracking-wide">
          FJONIC Studio
        </span>
      </div>

      {/* Espacio futuro: usuario / logout */}
      <div className="text-sm text-blue-200">
        Plataforma Web
      </div>
    </header>
  );
}
