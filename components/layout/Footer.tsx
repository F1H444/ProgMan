'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-8 pb-8 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white tracking-tighter mb-8">PROGMAN</h2>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Membangun masa depan digital dengan presisi artistik dan keunggulan teknis. Kami adalah mitra rahasia di balik kesuksesan brand elit.
            </p>
          </div>

          <div className="md:col-span-1"></div>

          <div>
            <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-8">Navigasi</h3>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">Tentang</Link></li>
              <li><Link href="/work" className="text-zinc-400 hover:text-white transition-colors text-sm">Project</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-sm">Kontak</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            &copy; {currentYear} ProgMan. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Dibuat Dengan</span>
            <div className="w-1 h-1 bg-white rounded-full" />
            <span className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest">Keunggulan 2026</span>
          </div>
        </div>
      </div>

      {/* Massive Brand Watermark */}
      <div className="mt-8 overflow-hidden pointer-events-none select-none opacity-[0.02] flex justify-center">
        <h2 className="text-[15vw] font-black leading-none tracking-tighter text-white whitespace-nowrap">
          PROGMAN
        </h2>
      </div>
    </footer>
  );
}
