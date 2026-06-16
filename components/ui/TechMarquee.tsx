'use client';

import { motion, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const tech = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Neon Database", "Framer Motion", 
  "Node.js", "Prisma", "PostgreSQL", "Three.js", "Radix UI", "Lucide Icons",
  "Python", "Laravel", "MySQL", "Docker", "Git", "Figma"
];

export function TechMarquee() {
  const baseX1 = useMotionValue(0);
  const baseX2 = useMotionValue(0);

  useAnimationFrame((t: number, delta: number) => {
    // Row 1: Left to right
    baseX1.set(baseX1.get() + 2 * (delta / 1000));
    // Row 2: Right to left
    baseX2.set(baseX2.get() - 2 * (delta / 1000));
  });

  const x1 = useTransform(baseX1, (v: number) => `${(v % 20) - 20}%`);
  const x2 = useTransform(baseX2, (v: number) => `${(v % 20) - 20}%`);

  const colors = [
    'from-blue-600/20 to-blue-900/5 text-blue-400 border-blue-500/10',
    'from-purple-600/20 to-purple-900/5 text-purple-400 border-purple-500/10',
    'from-cyan-600/20 to-cyan-900/5 text-cyan-400 border-cyan-500/10',
    'from-yellow-600/20 to-yellow-900/5 text-yellow-400 border-yellow-500/10',
    'from-green-600/20 to-green-900/5 text-green-400 border-green-500/10'
  ];

  return (
    <div className="py-40 border-y border-white/5 bg-black overflow-hidden select-none relative z-10">
      <div className="flex flex-col gap-20 relative">
        <div className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
            className="text-[10px] font-mono text-zinc-600 uppercase mb-4"
          >
            Industry Standard Technologies
          </motion.span>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </div>
        
        <div className="flex flex-col gap-12 will-change-transform">
          <motion.div style={{ x: x1 }} className="flex items-center gap-8 whitespace-nowrap px-12">
            {[...tech, ...tech, ...tech, ...tech, ...tech].map((item, i) => (
              <motion.div 
                key={i} 
                className={cn(
                  "px-10 py-5 rounded-[2rem] border bg-zinc-900/50 bg-gradient-to-br transition-all duration-500 hover:scale-110 hover:-rotate-3 cursor-default group",
                  colors[i % colors.length]
                )}
              >
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tight group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div style={{ x: x2 }} className="flex items-center gap-8 whitespace-nowrap px-12">
            {[...tech, ...tech, ...tech, ...tech, ...tech].reverse().map((item, i) => (
              <motion.div 
                key={i} 
                className={cn(
                  "px-10 py-5 rounded-[2rem] border bg-zinc-900/50 bg-gradient-to-br transition-all duration-500 hover:scale-110 hover:rotate-3 cursor-default group",
                  colors[(i + 2) % colors.length]
                )}
              >
                <span className="text-2xl md:text-4xl font-black uppercase tracking-tight group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />
    </div>
  );
}
