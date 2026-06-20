'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLoading } from '@/components/providers/LoadingProvider';
import Image from 'next/image';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();
  
  return (
    <section ref={containerRef} className="relative min-h-[100vh] w-full flex flex-col justify-end pb-24 pt-40 px-6 md:px-8 bg-black">
      
      {/* Background Image Container */}
      <div className="absolute top-0 left-0 w-full h-[85%] pointer-events-none overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Night Sky Landscape"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Mask to fade image into black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-auto">
        {/* Badge */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
           className="mb-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-zinc-300 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
        >
          KONSULTASI GRATIS <span className="text-zinc-500">&gt;</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="max-w-4xl mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-white tracking-tight leading-[1.05]">
            Bikin website & aplikasi, tanpa ribet.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl leading-relaxed mb-10"
        >
          Kami bantu desain, koding, sampai rilis aplikasimu. Tinggal duduk manis, biar tim ProgMan yang urus semua urusan teknisnya.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        >
          <a 
            href="https://wa.me/6281216802722" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative h-14 px-10 flex items-center justify-center overflow-hidden bg-white text-black rounded-full transition-all hover:bg-zinc-200 hover:scale-105"
          >
            <span className="relative z-10 text-sm font-semibold tracking-wide">Mulai Sekarang</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
      >
        <ArrowDown className="w-5 h-5 text-white/50" />
      </motion.div>
    </section>
  );
}
