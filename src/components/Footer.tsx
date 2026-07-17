'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 overflow-hidden border-t border-zinc-900"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#000000',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand/Logo */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/camaleonai.svg"
            alt="Camaleon AI"
            width={28}
            height={28}
          />
          <span className="text-sm font-semibold tracking-wide text-white">
            Camaleon{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #f43f5e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              IA
            </span>
          </span>
        </div>

        {/* Links & Copy */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-zinc-500">
          <a
            href="https://camaleonia.pro/termos"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-300"
          >
            Termos de Uso
          </a>
          <a
            href="https://camaleonia.pro/politicas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-300"
          >
            Políticas de Privacidade
          </a>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <p>© {currentYear} Camaleon IA. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
