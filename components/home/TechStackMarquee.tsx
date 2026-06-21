'use client';

import { motion, useTransform, useAnimationFrame, useMotionValue, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { 
  SiJavascript, SiPhp, SiMysql, SiNextdotjs, SiLaravel, 
  SiGreensock, SiTailwindcss, SiBootstrap, SiPython, 
  SiCplusplus, SiDart, SiC, SiGit, SiGithub, SiGitlab,
  SiLaragon, SiPostman, SiFigma
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { BsLayers } from 'react-icons/bs';
import { TbBrandCSharp, TbBrandVscode } from 'react-icons/tb';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function TechStackMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const techStacks = [
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400 group-hover:text-yellow-300' },
    { name: 'PHP', icon: SiPhp, color: 'text-indigo-400 group-hover:text-indigo-300' },
    { name: 'MySQL', icon: SiMysql, color: 'text-blue-500 group-hover:text-blue-400' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-white group-hover:text-gray-200' },
    { name: 'Laravel', icon: SiLaravel, color: 'text-red-500 group-hover:text-red-400' },
    { name: 'GSAP', icon: SiGreensock, color: 'text-green-500 group-hover:text-green-400' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-cyan-400 group-hover:text-cyan-300' },
    { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-500 group-hover:text-purple-400' },
    { name: 'AOS', icon: BsLayers, color: 'text-gray-300 group-hover:text-white' },
    { name: 'Python', icon: SiPython, color: 'text-blue-400 group-hover:text-blue-300' },
    { name: 'Java', icon: FaJava, color: 'text-orange-500 group-hover:text-orange-400' },
    { name: 'C++', icon: SiCplusplus, color: 'text-blue-600 group-hover:text-blue-500' },
    { name: 'Dart', icon: SiDart, color: 'text-teal-400 group-hover:text-teal-300' },
    { name: 'C', icon: SiC, color: 'text-blue-500 group-hover:text-blue-400' },
    { name: 'C#', icon: TbBrandCSharp, color: 'text-purple-600 group-hover:text-purple-500' },
    { name: 'Git', icon: SiGit, color: 'text-orange-600 group-hover:text-orange-500' },
    { name: 'GitHub', icon: SiGithub, color: 'text-white group-hover:text-gray-200' },
    { name: 'GitLab', icon: SiGitlab, color: 'text-orange-500 group-hover:text-orange-400' },
    { name: 'VS Code', icon: TbBrandVscode, color: 'text-blue-500 group-hover:text-blue-400' },
    { name: 'Laragon', icon: SiLaragon, color: 'text-blue-400 group-hover:text-blue-300' },
    { name: 'Postman', icon: SiPostman, color: 'text-orange-500 group-hover:text-orange-400' },
    { name: 'Figma', icon: SiFigma, color: 'text-pink-500 group-hover:text-pink-400' },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Dynamic Scroll Values tied to scroll position (creates a scrubbing effect)
  const titleY = useTransform(scrollYProgress, [0, 0.4], [150, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  
  const marqueeRotateX = useTransform(scrollYProgress, [0.1, 0.5], [45, 0]);
  const marqueeY = useTransform(scrollYProgress, [0.1, 0.5], [200, 0]);
  const marqueeOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const marqueeScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  const bgY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  const baseX = useMotionValue(0);
  
  // Constant automatic scroll
  useAnimationFrame((t, delta) => {
    const moveBy = -2.0 * (delta / 1000); // Speed
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -50, v)}%`);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden py-32 bg-black z-20" 
      id="tech-stack"
      style={{ perspective: "1200px" }}
    >
      <motion.div 
        style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        className="max-w-7xl mx-auto px-4 mb-20 text-center relative z-20 will-change-transform"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          <span className="text-blue-500">Tech Stack</span> & Tools
        </h2>
        <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto">
          Teknologi, bahasa pemrograman, dan framework yang saya kuasai dalam membangun solusi digital yang optimal.
        </p>
      </motion.div>

      <motion.div 
        style={{ 
          rotateX: marqueeRotateX, 
          y: marqueeY, 
          opacity: marqueeOpacity,
          scale: marqueeScale
        }}
        className="flex whitespace-nowrap will-change-transform mt-8 relative transform-gpu"
      >
        <motion.div style={{ x }} className="flex gap-16 md:gap-24 items-center pl-16 md:pl-24">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 md:gap-24 items-center">
              {techStacks.map((tech, index) => (
                <div key={index} className="flex items-center gap-4 group cursor-default">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <tech.icon className={cn("w-10 h-10 md:w-14 md:h-14 transition-colors duration-500 relative z-10", tech.color)} />
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-white/30 group-hover:text-white transition-colors duration-500">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Decorative Gradients for Marquee Edges */}
      <div className="absolute inset-y-0 left-0 w-[15%] md:w-[20%] bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none mt-40" />
      <div className="absolute inset-y-0 right-0 w-[15%] md:w-[20%] bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none mt-40" />
    </section>
  );
}
