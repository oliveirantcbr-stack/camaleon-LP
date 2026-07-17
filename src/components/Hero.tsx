'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue, useScroll, AnimatePresence, MotionValue, animate } from 'framer-motion';
import Logo from '@/components/Logo';

// --- Types ---
export type AnimationPhase = 'scatter' | 'line' | 'circle' | 'bottom-strip';

interface FlipCardProps {
  src: string;
  index: number;
  total: number;
  phase: AnimationPhase;
  morphProgress: MotionValue<number>;
  scrollRotate: MotionValue<number>;
  mouseX: MotionValue<number>;
  containerSize: { width: number; height: number };
  scatterPosition: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({
  src,
  index,
  total,
  phase,
  morphProgress,
  scrollRotate,
  mouseX,
  containerSize,
  scatterPosition,
}: FlipCardProps) {
  const minDimension = Math.min(containerSize.width, containerSize.height);
  const isMobile = containerSize.width > 0 && containerSize.width < 768;

  // A. Circle Coordinates
  const circleRadius = Math.min(minDimension * 0.35, 350);
  const circleAngle = (index / total) * 360;
  const circleRad = (circleAngle * Math.PI) / 180;
  const circleX = Math.cos(circleRad) * circleRadius;
  const circleY = Math.sin(circleRad) * circleRadius;
  const circleRotation = circleAngle + 90;

  // B. Bottom Arc Coordinates
  const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
  const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
  const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
  const arcCenterY = arcApexY + arcRadius;

  const spreadAngle = isMobile ? 100 : 130;
  const startAngle = -90 - spreadAngle / 2;
  const step = spreadAngle / (total - 1);
  const baseArcAngle = startAngle + index * step;

  // --- Local MotionValue to track initial phase animations ---
  const introProgress = useMotionValue(0);

  useEffect(() => {
    if (phase === 'scatter') {
      animate(introProgress, 0, { type: 'spring', stiffness: 45, damping: 16 });
    } else if (phase === 'line') {
      animate(introProgress, 1, { type: 'spring', stiffness: 45, damping: 16 });
    } else if (phase === 'circle') {
      animate(introProgress, 2, { type: 'spring', stiffness: 45, damping: 16 });
    }
  }, [phase, introProgress]);

  // --- Dynamic transforms using MotionValues directly ---
  const x = useTransform(
    [introProgress, morphProgress, scrollRotate, mouseX],
    ([intro, morph, sRotate, mX]) => {
      // 1. Calculate scatter position
      const scatterX = scatterPosition.x;
      
      // 2. Calculate line position
      const lineSpacing = 70;
      const lineTotalWidth = total * lineSpacing;
      const lineX = index * lineSpacing - lineTotalWidth / 2;

      // 3. Circle position is circleX

      // Determine the base position based on intro animation progress
      let basePos = 0;
      if (intro < 1) {
        basePos = lerp(scatterX, lineX, intro);
      } else {
        basePos = lerp(lineX, circleX, intro - 1);
      }

      if (intro < 2) {
        return basePos;
      }

      // 4. Calculate arc position (scroll morph active)
      const scrollProgress = Math.min(Math.max(sRotate / 360, 0), 1);
      const maxRotation = spreadAngle * 0.8;
      const boundedRotation = -scrollProgress * maxRotation;
      const currentArcAngle = baseArcAngle + boundedRotation;
      
      const arcX = Math.cos((currentArcAngle * Math.PI) / 180) * arcRadius + mX;

      return lerp(circleX, arcX, morph);
    }
  );

  const y = useTransform(
    [introProgress, morphProgress, scrollRotate],
    ([intro, morph, sRotate]) => {
      // 1. Calculate scatter position
      const scatterY = scatterPosition.y;
      
      // 2. Calculate line position
      const lineY = 0;

      // 3. Circle position is circleY

      // Determine the base position based on intro animation progress
      let basePos = 0;
      if (intro < 1) {
        basePos = lerp(scatterY, lineY, intro);
      } else {
        basePos = lerp(lineY, circleY, intro - 1);
      }

      if (intro < 2) {
        return basePos;
      }

      // 4. Calculate arc position (scroll morph active)
      const scrollProgress = Math.min(Math.max(sRotate / 360, 0), 1);
      const maxRotation = spreadAngle * 0.8;
      const boundedRotation = -scrollProgress * maxRotation;
      const currentArcAngle = baseArcAngle + boundedRotation;

      const arcY = Math.sin((currentArcAngle * Math.PI) / 180) * arcRadius + arcCenterY;

      return lerp(circleY, arcY, morph);
    }
  );

  const rotate = useTransform(
    [introProgress, morphProgress, scrollRotate],
    ([intro, morph, sRotate]) => {
      // 1. Calculate scatter position
      const scatterRot = scatterPosition.rotation;
      
      // 2. Calculate line position
      const lineRot = 0;

      // 3. Circle position is circleRotation

      // Determine the base position based on intro animation progress
      let basePos = 0;
      if (intro < 1) {
        basePos = lerp(scatterRot, lineRot, intro);
      } else {
        basePos = lerp(lineRot, circleRotation, intro - 1);
      }

      if (intro < 2) {
        return basePos;
      }

      // 4. Calculate arc position (scroll morph active)
      const scrollProgress = Math.min(Math.max(sRotate / 360, 0), 1);
      const maxRotation = spreadAngle * 0.8;
      const boundedRotation = -scrollProgress * maxRotation;
      const currentArcAngle = baseArcAngle + boundedRotation;
      const arcRotation = currentArcAngle + 90;

      return lerp(circleRotation, arcRotation, morph);
    }
  );

  const scale = useTransform(
    [introProgress, morphProgress],
    ([intro, morph]) => {
      const scatterScale = scatterPosition.scale;
      const lineScale = 1;
      const circleScale = 1;

      let basePos = 0;
      if (intro < 1) {
        basePos = lerp(scatterScale, lineScale, intro);
      } else {
        basePos = lerp(lineScale, circleScale, intro - 1);
      }

      if (intro < 2) {
        return basePos;
      }

      const arcScale = isMobile ? 1.4 : 1.8;
      return lerp(circleScale, arcScale, morph);
    }
  );

  const opacity = useTransform(
    [introProgress, morphProgress],
    ([intro, morph]) => {
      const scatterOpacity = scatterPosition.opacity;
      const lineOpacity = 1;

      if (intro < 1) {
        return lerp(scatterOpacity, lineOpacity, intro);
      }
      return 1;
    }
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform, opacity',
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={isMobile ? undefined : { rotateY: 180 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-900 border border-white/5"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`hero-${index}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-950 flex flex-col items-center justify-center p-2 border border-zinc-800"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <p className="text-[6px] font-bold text-red-500 uppercase tracking-widest mb-0.5">Ver</p>
            <p className="text-[10px] font-medium text-white">Detalhes</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;

// Local Image Assets
const IMAGES = [
  '/imgs/ex1.webp',
  '/imgs/ex2.webp',
  '/imgs/ex3.webp',
  '/imgs/ex4.webp',
  '/imgs/ex5.webp',
  '/imgs/ex6.webp',
  '/imgs/ex7.webp',
  '/imgs/ex8.webp',
  '/imgs/ex9.webp',
  '/imgs/ex10.webp',
  '/imgs/ex12.webp',
  '/imgs/ex13.webp',
  '/imgs/ex14.webp',
  '/imgs/ex15.webp',
  '/imgs/exemplo.webp',
  '/imgs/model.webp',
  '/imgs/model3.webp',
  '/imgs/model4.webp',
  '/imgs/ex1.webp', // duplicate to fill 20 items
  '/imgs/ex2.webp', // duplicate to fill 20 items
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function Hero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>('scatter');
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Resize Observer ---
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  // --- Scroll Track Config ---
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  });

  // Inertial smooth scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Transform scroll progress [0, 0.48] to the original virtual scroll domain [0, 3000]
  const virtualScroll = useTransform(smoothScrollProgress, [0, 0.48], [0, 3000]);

  // Morph & Shuffling rotations based on virtualScroll value
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);

  // --- Mouse Parallax ---
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  // --- Intro Sequence ---
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase('line'), 500);
    const timer2 = setTimeout(() => setIntroPhase('circle'), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // --- Random Scatter Positions ---
  const [scatterPositions, setScatterPositions] = useState<Array<{ x: number; y: number; rotation: number; scale: number; opacity: number }>>([]);

  useEffect(() => {
    setScatterPositions(
      IMAGES.map(() => ({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1000,
        rotation: (Math.random() - 0.5) * 180,
        scale: 0.6,
        opacity: 0,
      }))
    );
  }, []);

  // --- Content Opacity ---
  const contentOpacity = useTransform(morphProgress, [0.8, 1], [0, 1]);
  const contentY = useTransform(morphProgress, [0.8, 1], [20, 0]);

  // --- Intro Text Opacity and Blur transforms ---
  const introTextOpacity = useTransform(morphProgress, [0, 0.4], [1, 0]);
  const introTextY = useTransform(morphProgress, [0, 0.4], [0, -20]);
  const introTextBlur = useTransform(morphProgress, [0, 0.4], ['blur(0px)', 'blur(10px)']);
  const arrowOpacity = useTransform(morphProgress, [0, 0.4], [0.5, 0]);

  return (
    <div className="w-full relative bg-black">
      <div
        ref={scrollTrackRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '280vh',
          background: '#000',
        }}
      >
        {/* Sticky viewport frame */}
        <div
          ref={containerRef}
          className="hero-root"
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at 50% 40%, #0d1117 0%, #060608 60%, #000 100%)',
            userSelect: 'none',
            zIndex: 10,
            WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
            maskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(239,68,68,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Intro Text (Fades out) */}
          <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={introPhase === 'circle' ? { opacity: 1, y: 0 } : {}}
              style={{
                opacity: introPhase === 'circle' ? introTextOpacity : 0,
                y: introPhase === 'circle' ? introTextY : 20,
                filter: introPhase === 'circle' ? introTextBlur : 'blur(10px)',
                willChange: 'transform, opacity, filter',
              }}
              transition={{ duration: 1 }}
              className="text-2xl font-semibold tracking-tight text-white/95 md:text-4xl"
            >
              O futuro é construído com IA.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={introPhase === 'circle' ? { opacity: 0.5 } : {}}
              style={{
                opacity: introPhase === 'circle' ? arrowOpacity : 0,
                willChange: 'opacity',
              }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-4 flex flex-col items-center gap-1.5"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-red-500 uppercase">
                Role para explorar
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                style={{ willChange: 'transform' }}
                className="text-xs text-red-500"
              >
                ↓
              </motion.span>
            </motion.div>
          </div>

          {/* Arc Active Content (Fades in) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute top-[12%] md:top-[9%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 left-1/2 -translate-x-1/2 w-full max-w-xl"
          >
            {/* Logo Image with Native Rainbow SVG Gradient */}
            <div className="mb-4 pointer-events-auto">
              <motion.div
                className="w-12 h-12 flex items-center justify-center cursor-pointer"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.25))',
                }}
                whileHover={{ scale: 1.15, filter: 'drop-shadow(0 0 18px rgba(244, 63, 94, 0.45))' }}
                transition={{ duration: 0.3 }}
              >
                <Logo size={48} />
              </motion.div>
            </div>

            {/* Square Badge with Corner Squares */}
            <div
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1.5px solid rgba(239, 68, 68, 0.25)',
                padding: '6px 16px',
                marginBottom: 20,
                backdropFilter: 'blur(10px)',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#ffffff',
                textTransform: 'uppercase',
                borderRadius: '0px',
              }}
              className="pointer-events-auto select-none"
            >
              {/* Corner Squares */}
              <div className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-red-600 border border-red-500" />
              <div className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-red-600 border border-red-500" />
              <div className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-red-600 border border-red-500" />
              <div className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-red-600 border border-red-500" />

              {/* HUD Target Icon */}
              <svg className="w-3.5 h-3.5 text-red-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="7" strokeDasharray="3 2" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
              </svg>

              <span>
                Crie sua Influencer <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-700 bg-clip-text text-transparent font-extrabold">IA</span>
              </span>
            </div>

            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-4 max-w-md mx-auto leading-[1.2]">
              A Próxima Grande <br className="hidden md:block" />
              Influencer é <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-700 bg-clip-text text-transparent font-extrabold">IA</span>
            </h2>
            <p className="text-xs md:text-sm text-white max-w-sm leading-relaxed mb-6 font-normal">
              Crie sua Influenciadora com I.A, pronta para vender, seja no TikTok Shop, fazer publi no Insta, ou vender Pack na Internet.
            </p>

            <div className="flex gap-3 items-center justify-center pointer-events-auto">
              <a href="https://camaleonia.pro/login">
                <CTAButton primary>Começar Grátis</CTAButton>
              </a>
              <a href="#slider-section">
                <CTAButton>Ver Demo</CTAButton>
              </a>
            </div>
          </motion.div>

          {/* Main interactive viewport container for cards */}
          <div className="relative flex items-center justify-center w-full h-full">
            {(() => {
              const isMobile = containerSize.width > 0 && containerSize.width < 768;
              const activeTotalImages = isMobile ? 10 : 20;

              return IMAGES.slice(0, activeTotalImages).map((src, i) => {
                return (
                  <FlipCard
                    key={i}
                    src={src}
                    index={i}
                    total={activeTotalImages}
                    phase={introPhase}
                    morphProgress={morphProgress}
                    scrollRotate={scrollRotate}
                    mouseX={smoothMouseX}
                    containerSize={containerSize}
                    scatterPosition={scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 }}
                  />
                );
              });
            })()}
          </div>

          {/* ── Scroll progress indicator ── */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 24,
              right: 24,
              width: 40,
              height: 40,
              zIndex: 30,
              opacity: introPhase === 'circle' ? 1 : 0,
            }}
          >
            <svg viewBox="0 0 40 40" width={40} height={40}>
              <motion.circle
                cx={20} cy={20} r={16}
                fill="none"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth={2}
                strokeDasharray={100}
                strokeDashoffset={useTransform(smoothScrollProgress, [0, 1], [100, 0])}
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CTAButton({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  if (primary) {
    return (
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'relative',
          padding: '11px 26px',
          borderRadius: '0px',
          border: '1.5px solid #ffffff',
          background: '#ffffff',
          color: '#000000',
          fontFamily: 'var(--font-geist-sans), sans-serif',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          boxShadow: '0 0 24px rgba(255, 255, 255, 0.15)',
          overflow: 'hidden',
        }}
      >
        {children}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"
          initial={{ left: '-100%' }}
          animate={{ left: '200%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 1.6,
            ease: 'easeInOut',
            repeatDelay: 1.2,
          }}
          style={{ skewX: '-25deg' }}
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{
        padding: '11px 26px',
        borderRadius: '0px',
        border: '1.5px solid rgba(255,255,255,0.2)',
        background: 'rgba(255,255,255,0.05)',
        color: '#ffffff',
        fontFamily: 'var(--font-geist-sans), sans-serif',
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </motion.button>
  );
}
