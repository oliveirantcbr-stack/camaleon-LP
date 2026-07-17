'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      className="border border-zinc-800/80 rounded-lg overflow-hidden transition-all duration-300"
      style={{
        background: 'rgba(9, 9, 11, 0.55)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left text-white hover:text-red-400 transition-colors duration-300 focus:outline-none"
      >
        <span className="font-semibold text-sm md:text-base tracking-wide pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-zinc-500 group-hover:text-red-400 flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5 pt-0 border-t border-zinc-900/60 text-xs md:text-sm text-zinc-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Como funciona a criação da influenciadora virtual?",
      answer: "O Camaleon utiliza modelos avançados de Inteligência Artificial para gerar rostos e corpos consistentes. Você pode definir a personalidade, estilo e biografia da sua influenciadora, e nossa plataforma cuidará de gerar fotos e vídeos realistas mantendo sempre a mesma identidade facial em diferentes cenários."
    },
    {
      question: "Eu preciso de conhecimento técnico ou habilidades de design?",
      answer: "Absolutamente não! O Camaleon foi projetado para ser intuitivo. Com nossa biblioteca de prompts secreta e ferramentas simplificadas, você cria conteúdos profissionais com apenas alguns cliques, sem precisar programar ou saber usar softwares complexos."
    },
    {
      question: "Como posso monetizar minha influenciadora?",
      answer: "Existem várias formas validadas: fechando parcerias de publicidade (publis) com marcas no Instagram, promovendo produtos físicos/digitais no TikTok Shop, ou criando uma comunidade privada e vendendo pacotes de conteúdos exclusivos de forma automatizada através do nosso Bot integrado no Telegram."
    },
    {
      question: "O rosto da influenciadora realmente permanece o mesmo em todas as fotos?",
      answer: "Sim! Esse é um dos nossos maiores diferenciais. Contamos com um sistema exclusivo de consistência facial que 'trava' as feições da sua influenciadora, garantindo que ela seja reconhecível e mantenha a consistência de marca em qualquer roupa, pose ou cenário."
    },
    {
      question: "Quais redes sociais posso dominar com o Camaleon?",
      answer: "Sua influenciadora virtual pode atuar em qualquer canal digital, incluindo Instagram, TikTok, YouTube (Shorts), Pinterest e Telegram. A geração de imagens e vídeos rápidos permite manter uma consistência diária de postagens."
    },
    {
      question: "Como funciona o Bot do Telegram incluso?",
      answer: "Nós fornecemos uma integração pronta para um bot automatizado no Telegram. Você pode usá-lo para vender acesso a grupos VIP ou pacotes de fotos de forma 100% automatizada, onde o cliente paga via Pix/cartão e o bot entrega o conteúdo imediatamente."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        backgroundColor: '#000000',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 border border-red-500/20 bg-red-950/10 text-[9px] font-mono tracking-widest text-red-300 uppercase mb-6">
            <div className="absolute -top-[2px] -left-[2px] w-[4px] h-[4px] bg-red-500" />
            <div className="absolute -top-[2px] -right-[2px] w-[4px] h-[4px] bg-red-500" />
            <div className="absolute -bottom-[2px] -left-[2px] w-[4px] h-[4px] bg-red-500" />
            <div className="absolute -bottom-[2px] -right-[2px] w-[4px] h-[4px] bg-red-500" />
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dúvidas Frequentes</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Perguntas{' '}
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
              Frequentes
              <span
                className="absolute -bottom-[3px] left-0 w-full h-[2px] rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #ef4444, #b91c1c, #f43f5e)',
                  opacity: 0.6,
                }}
              />
            </span>
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Esclareça suas principais dúvidas sobre o Camaleon e comece a faturar com sua influenciadora virtual.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
