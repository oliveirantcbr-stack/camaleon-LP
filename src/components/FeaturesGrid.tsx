'use client';

import React, { useRef, forwardRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { UserPlus, Video, ShoppingBag, Key, ShieldCheck, Send } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  index?: number;
}

function BentoCard({ title, description, icon: Icon, className = '', index = 0 }: BentoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className={`relative group overflow-hidden border border-zinc-800/80 hover:border-red-500/30 p-8 flex flex-col justify-between transition-all duration-300 bento-card ${className}`}
      style={{
        background: 'radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%), rgba(9, 9, 11, 0.55)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Soft gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-rose-500/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-rose-500/5 transition-all duration-500 pointer-events-none" />

      {/* Glowing top line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-red-500/50 transition-all duration-500" />

      <div>
        {/* Icon Box */}
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-red-400 mb-6 group-hover:text-red-300 group-hover:border-red-500/20 transition-all duration-300 shadow-inner">
          <Icon className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3 className="text-sm md:text-base font-semibold text-white mb-3 group-hover:text-red-100 transition-colors duration-300 font-sans tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[11px] md:text-[13px] text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Micro tech mark */}
      <div className="absolute bottom-3 right-3 text-[9px] font-mono text-zinc-800 group-hover:text-red-500/30 transition-colors duration-500 select-none">
        // CM.IA
      </div>
    </motion.div>
  );
}

const FeaturesGrid = forwardRef<HTMLElement>(function FeaturesGrid(_, ref) {

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 bg-black overflow-hidden"
      style={{
        /* Dot grid texture */
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#000000',
      }}
    >
      {/* Soft background red glow blob */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[650px] h-[320px] md:h-[650px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Section Header */}
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20 px-4">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative inline-flex items-center gap-2 px-4 py-1.5 border border-red-500/20 bg-red-950/10 text-[9px] font-mono tracking-widest text-red-300 uppercase mb-6"
        >
          <div className="absolute -top-[2px] -left-[2px] w-[4px] h-[4px] bg-red-500" />
          <div className="absolute -top-[2px] -right-[2px] w-[4px] h-[4px] bg-red-500" />
          <div className="absolute -bottom-[2px] -left-[2px] w-[4px] h-[4px] bg-red-500" />
          <div className="absolute -bottom-[2px] -right-[2px] w-[4px] h-[4px] bg-red-500" />
          <span>Recursos de Elite</span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-semibold text-white tracking-tight mb-4"
        >
          Ecossistema Completo de{' '}
          <span
            className="relative inline-block"
            style={{
              backgroundImage: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #f43f5e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            IA
            {/* Underline glow */}
            <span
              className="absolute -bottom-[3px] left-0 w-full h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ef4444, #b91c1c, #f43f5e)',
                opacity: 0.6,
              }}
            />
          </span>
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed"
        >
          Esqueça múltiplas assinaturas. O Camaleon reúne tudo o que você precisa para criar e monetizar sua influenciadora virtual.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        <BentoCard
          title="Crie Sua Influenciadora Exclusiva"
          description="Dê vida a modelos virtuais únicas. Escolha traços, estilo e personalidade para representar marcas ou criar seu próprio império digital."
          icon={UserPlus}
          className="md:col-span-2"
          index={0}
        />
        <BentoCard
          title="Fotos e Vídeos em Segundos"
          description="Gere conteúdos em alta definição e vídeos realistas para alimentar suas redes sociais diariamente sem precisar de câmeras ou estúdios."
          icon={Video}
          className="md:col-span-1"
          index={1}
        />
        <BentoCard
          title="Fature Alto com Publis e TikTok Shop"
          description="Domine o mercado de marketing de influência. Use suas modelos virtuais para fechar parcerias no Instagram ou vender no piloto automático no TikTok Shop."
          icon={ShoppingBag}
          className="md:col-span-1"
          index={2}
        />
        <BentoCard
          title="Consistência de Rosto e Estilo"
          description="Chega de imagens que mudam de rosto. Nosso sistema trava as feições da sua influenciadora para manter a mesma identidade visual em qualquer cenário ou roupa."
          icon={ShieldCheck}
          className="md:col-span-2"
          index={3}
        />
        <BentoCard
          title="Biblioteca de Prompts Secreta"
          description="Tenha acesso imediato a um cofre de comandos validados para extrair a máxima qualidade, realismo e poses perfeitas da inteligência artificial."
          icon={Key}
          className="md:col-span-1"
          index={4}
        />
        <BentoCard
          title="Venda Conteúdo com Bot no Telegram"
          description="Monetize de forma privada. Se preferir, use nosso sistema exclusivo integrado para vender pacotes de fotos e interagir via Bot automatizado no Telegram."
          icon={Send}
          className="md:col-span-2"
          index={5}
        />
      </div>
    </section>
  );
});

export default FeaturesGrid;
