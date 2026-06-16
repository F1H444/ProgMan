'use client';

import { motion, useScroll, useTransform, useVelocity, useSpring, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function InfiniteMarquee() {
  const items = [
    { text: 'WEB DEVELOPMENT', color: 'text-blue-500' },
    { text: 'APP DESIGN', color: 'text-purple-500' },
    { text: 'TECH SOLUTIONS', color: 'text-cyan-500' },
    { text: 'WEBSITE & APLIKASI', color: 'text-yellow-500' },
    { text: 'SECURITY LOGIC', color: 'text-green-500' },
    { text: 'DATABASE ARCH', color: 'text-blue-400' },
    { text: 'UI/UX MASTERY', color: 'text-purple-400' },
  ];

  const baseX = useMotionValue(0);
  
  // Constant automatic scroll
  useAnimationFrame((t, delta) => {
    const moveBy = -1.5 * (delta / 1000); // Ultra-crawl speed for max readability
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  return (
    <div className="relative w-full overflow-hidden py-32 bg-black skew-y-[-1deg] z-20">
      <div className="flex whitespace-nowrap will-change-transform">
        <motion.div style={{ x }} className="flex gap-20 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-20">
                  <span 
                    className={cn(
                      "text-8xl md:text-[15vw] font-black uppercase tracking-tighter transition-all duration-700 cursor-default select-none",
                      item.color,
                      "hover:scale-105 hover:text-white"
                    )}
                  >
                    {item.text}
                  </span>

                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative Gradients */}
      <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
