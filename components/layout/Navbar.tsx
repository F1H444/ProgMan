'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/ui/Magnetic';
import { useLenis } from 'lenis/react';

const navItems = [
  { name: 'Layanan', href: '/#services' },
  { name: 'Tentang', href: '/#about' }, 
  { name: 'Teknologi', href: '/#tech-stack' },
  { name: 'Project', href: '/#work' },    
  { name: 'Testimoni', href: '/#testimonials' },
  { name: 'Kontak', href: '/#contact' }, 
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const lenis = useLenis();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    const targetId = href.replace('/#', '').replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem && pathname === '/') {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(elem, { duration: 2 });
      } else {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close mobile menu on navigation
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[60] flex justify-center pt-4 md:pt-6 px-4"
      >
        <nav className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-5 md:px-6 py-3 flex items-center justify-between w-full max-w-5xl gap-8">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="text-lg md:text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
          >
            PROGMAN
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Magnetic key={item.name} strength={0.2}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors block py-2"
                >
                  {item.name}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <a
                href="https://wa.me/6281216802722"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-zinc-200 transition-colors inline-block"
              >
                Mulai Proyek
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors -mr-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-3xl font-bold tracking-tight text-zinc-400 hover:text-white transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="https://wa.me/6281216802722"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 bg-white text-black text-lg font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-colors w-full max-w-xs text-center flex items-center justify-center gap-2"
              >
                Konsultasi Sekarang
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
