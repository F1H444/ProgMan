'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/components/providers/LoadingProvider';

// Variabel statis dipindah ke luar agar tidak menyebabkan re-render error di React Fast Refresh
const ANIM_DURATION = 1.4; // Detik (durasi efek naiknya layar hitam)
const HOLD_TIME = 2000;    // Milidetik (waktu tunggu melihat tulisan PROGMAN sebelum meluncur)

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    // Tahan preloader awal sesuai HOLD_TIME
    const timer = setTimeout(() => {
      setIsVisible(false);
      
      // Sinkronisasi state global dengan durasi exit animasi utama
      setTimeout(() => setIsLoading(false), ANIM_DURATION * 1000);
    }, HOLD_TIME);

    return () => clearTimeout(timer);
  // Array dependensi dikembalikan ke ukuran aslinya (1 item) untuk mencegah error Hook
  }, [setIsLoading]);

  const textVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 120 },
    show: { 
      opacity: 1, 
      y: 0, 
      // Easing melayang khas website elegan
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const textArray = "ProgMan".split("");

  // Jalur SVG untuk animasi jelly curve di bawah layar
  const curvePath = {
    initial: "M0 0 L1000 0 L1000 0 Q500 0 0 0 Z",
    exit: [
      "M0 0 L1000 0 L1000 0 Q500 0 0 0 Z",
      "M0 0 L1000 0 L1000 0 Q500 350 0 0 Z", // Tarikan lengkungan
      "M0 0 L1000 0 L1000 0 Q500 0 0 0 Z"
    ]
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           exit={{ 
             y: "-100vh",
             transition: { duration: ANIM_DURATION, ease: [0.76, 0, 0.24, 1] }
           }}
           className="fixed inset-0 z-[100000] bg-[#09090b] flex flex-col items-center justify-center p-4"
        >
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate="show"
            className="flex overflow-hidden pb-8" 
          >
            {textArray.map((char, index) => (
              <motion.span 
                key={index} 
                variants={letterVariants}
                className="text-[16vw] md:text-[13vw] lg:text-[11vw] font-black text-white uppercase tracking-tighter leading-none inline-block drop-shadow-2xl"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          <svg 
             className="absolute top-full left-0 w-full h-[350px] pointer-events-none" 
             viewBox="0 0 1000 350" 
             preserveAspectRatio="none"
          >
             <motion.path 
               fill="#09090b"
               initial={{ d: curvePath.initial }}
               exit={{ 
                 d: curvePath.exit,
                 transition: { duration: ANIM_DURATION, ease: [0.76, 0, 0.24, 1] }
               }}
             />
          </svg>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
