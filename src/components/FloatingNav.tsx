'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNav({ triggerRef }: { triggerRef: React.RefObject<HTMLElement | null> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = triggerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show navbar once the trigger section starts entering the viewport
        setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerRef]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
          style={{ width: 'min(900px, calc(100vw - 2rem))' }}
        >
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{
              background: 'rgba(10, 10, 12, 0.8)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/camaleonai.svg"
                alt="Camaleon AI"
                width={36}
                height={36}
                priority
              />
              <span className="text-sm font-semibold tracking-wide hidden sm:block text-white">
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

            {/* CTA Button */}
            <a
              href="https://camaleonia.pro/login"
              id="floating-nav-cta"
              className="relative group inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white overflow-hidden transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 55%, #991b1b 100%)',
                boxShadow: '0 0 18px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                borderRadius: '6px',
              }}
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              <span>Criar Conta</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
