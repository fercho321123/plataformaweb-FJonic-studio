'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1F33]">
      <motion.div
        key="auth-layout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* LOGO */}
        <img
          src="/logo-fjonic.png"
          alt="FJONIC Studio"
          className="w-40 mx-auto mb-6"
        />

        {children}
      </motion.div>
    </div>
  );
}
