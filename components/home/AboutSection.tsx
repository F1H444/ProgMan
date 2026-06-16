'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const text = "Gak usah pusing mikirin koding atau error. Kamu punya ide? Sini kita yang bikinin aplikasinya sampai beres. Kamu tinggal fokus ngurusin bisnis, urusan teknis serahin ke GhostDev.";
const words = text.split(" ");

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.05, 1]);
  
  return (
    <motion.span
      style={{ opacity }}
      className="text-3xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight inline-block mr-[0.2em] mb-[0.1em]"
    >
      {word}
    </motion.span>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const footerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const footerOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-24 px-4 relative z-10 bg-black overflow-hidden" ref={containerRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10 px-6 md:px-8">
        
        <motion.div style={{ y: headerY }} className="flex flex-col items-center mb-16 md:mb-20">
          <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[1em] mb-4 text-center ml-[1em]">Filosofi Kami</h2>
          <div className="w-12 h-[1px] bg-white/10" />
        </motion.div>
        
        <div className="flex flex-wrap justify-center text-center">
          {words.map((word, i) => {
            const start = i / (words.length * 1.8);
            const end = start + 0.08;
            return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
          })}
        </div>

        <motion.p 
          style={{ y: footerY, opacity: footerOpacity }}
          className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl text-center mt-20 font-light"
        >
          Kita gak asal bikin website, tapi pastiin aplikasimu beneran aman, kenceng, dan bikin bisnismu makin maju. Santai aja, kita bantuin sampai kelar.
        </motion.p>
      </div>
    </section>
  );
}
