'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

const slideImages = [
  '/slide/s (1).webp',
  '/slide/s (2).webp',
  '/slide/s (3).webp',
  '/slide/s (4).webp',
  '/slide/s (5).webp',
  '/slide/s (6).webp',
  '/slide/s (7).webp',
  '/slide/s (8).webp',
  '/slide/s (9).webp',
  '/slide/s (10).webp',
  '/slide/s (11).webp',
];

// Double the array so the loop is seamless
const track1 = [...slideImages, ...slideImages];
const track2 = [...slideImages].reverse().concat([...slideImages].reverse());

function SliderTrack({
  images,
  direction = 'left',
  speed = 40,
  onImageClick,
}: {
  images: string[];
  direction?: 'left' | 'right';
  speed?: number;
  onImageClick: (src: string) => void;
}) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-36 md:w-72 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, #000000 0%, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 h-full w-36 md:w-72 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, #000000 0%, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)',
        }}
      />

      <div
        className="flex gap-4 w-max slider-track-container"
        style={{
          animation: `slider-${direction} ${speed}s linear infinite`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => onImageClick(src)}
            className="relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-xl overflow-hidden border border-zinc-800/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:brightness-110 active:scale-95 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CTAAndSlider() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="slider-section"
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#000000',
      }}
    >
      {/* Soft background red glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[600px] h-[320px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.035) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* CTA Block */}
      <div ref={ctaRef} className="relative z-10 flex flex-col items-center text-center px-4 mb-20">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-xs font-mono tracking-widest text-red-500 uppercase mb-4"
        >
          Comece hoje mesmo
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-semibold text-white tracking-tight mb-4 max-w-2xl"
        >
          Pronto para criar sua{' '}
          <span
            style={{
              backgroundImage:
                'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            influenciadora virtual?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
          className="text-sm text-zinc-400 max-w-md mb-10"
        >
          Entre para o Camaleon e comece a gerar renda com inteligência artificial em minutos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
        >
          <a
            href="https://camaleonia.pro/login"
            id="cta-main-button"
            className="relative group inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{
              background:
                'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
              boxShadow:
                '0 0 28px rgba(239, 68, 68, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              borderRadius: '4px',
            }}
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            <span>Quero Entrar no Camaleon</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Slider Tracks */}
      <div className="flex flex-col gap-4 relative z-10">
        <SliderTrack images={track1} direction="left" speed={45} onImageClick={setSelectedImage} />
        <SliderTrack images={track2} direction="right" speed={38} onImageClick={setSelectedImage} />
      </div>

      {/* Interactive Photo Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-full max-h-[85vh] w-[450px] aspect-[3/4] border border-zinc-800/80 rounded-2xl overflow-hidden cursor-default shadow-2xl shadow-red-900/10"
            >
              <Image
                src={selectedImage}
                alt="Selected virtual model"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 500px) 100vw, 450px"
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-600/80 text-white rounded-full border border-white/10 transition-colors duration-300 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Bottom Tag */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-16 flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase">
                  Influenciadora Virtual
                </span>
                <h3 className="text-base font-semibold text-white">
                  Gerada com Inteligência Artificial
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
