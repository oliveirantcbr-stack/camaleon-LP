'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import CTAAndSlider from '@/components/CTAAndSlider';
import FloatingNav from '@/components/FloatingNav';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function Home() {
  const section2Ref = useRef<HTMLElement>(null);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Check if device is mobile width (< 768px) on mount
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setShowPreloader(true);
      
      // 1.5s preloader timeout
      const preloaderTimer = setTimeout(() => {
        setShowPreloader(false);
      }, 1500);

      return () => {
        clearTimeout(preloaderTimer);
      };
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 select-none pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, #0d1117 0%, #060608 60%, #000 100%)'
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Soft pulsing background glow */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-red-600/10 blur-xl animate-pulse" />
              <Logo size={80} className="relative z-10" />
            </div>

            {/* Smooth progress bar */}
            <div className="w-32 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '0%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-full"
                style={{
                  background: 'linear-gradient(90deg, #ef4444, #f43f5e, #ef4444)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col min-h-screen bg-black">
        <FloatingNav triggerRef={section2Ref} />
        <Hero />
        <FeaturesGrid ref={section2Ref} />
        <CTAAndSlider />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
