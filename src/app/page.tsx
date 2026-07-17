'use client';

import { useRef } from 'react';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import CTAAndSlider from '@/components/CTAAndSlider';
import FloatingNav from '@/components/FloatingNav';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const section2Ref = useRef<HTMLElement>(null);

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <FloatingNav triggerRef={section2Ref} />
      <Hero />
      <FeaturesGrid ref={section2Ref} />
      <CTAAndSlider />
      <FAQ />
      <Footer />
    </main>
  );
}
