'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Code2,
  Zap,
  Globe,
  Lock,
} from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
    title: 'Textos & Copys Criativas',
    description: 'Escreva artigos, posts para redes sociais, emails e copys de alta conversão em segundos com inteligência avançada.',
    gradient: 'from-indigo-500/20 to-purple-500/10',
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-purple-400" />,
    title: 'Geração de Imagens Hyper',
    description: 'Transforme descrições em imagens ultra-realistas, ilustrações 3D e artes conceituais fantásticas instantaneamente.',
    gradient: 'from-purple-500/20 to-pink-500/10',
  },
  {
    icon: <Video className="w-6 h-6 text-pink-400" />,
    title: 'Vídeos Inteligentes',
    description: 'Crie pequenos vídeos, animações cinematográficas e avatares falantes a partir de prompts simples.',
    gradient: 'from-pink-500/20 to-rose-500/10',
  },
  {
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    title: 'Programação Assistida',
    description: 'Gere código limpo, debugue erros e aprenda novas frameworks com o suporte de nosso copiloto avançado.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: 'Automação de Fluxos',
    description: 'Integre tarefas repetitivas, configure agentes autônomos e multiplique a produtividade da sua equipe.',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: 'Conexão Global Web',
    description: 'Pesquise dados atualizados na internet em tempo real com fontes citadas de forma transparente e segura.',
    gradient: 'from-blue-500/20 to-indigo-500/10',
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden z-20">
      {/* Glowing top transition gradient to blend sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(165,180,252,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" /> Recursos Integrados
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Tudo o que você precisa,<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              em uma única interface.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Esqueça o pagamento de múltiplas assinaturas. O Camaleon reúne os principais modelos gerativos do mercado em um ecossistema integrado.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 p-8 hover:border-zinc-700/60 transition-colors group`}
            >
              {/* Highlight layer */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-900/50 transition-colors mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
