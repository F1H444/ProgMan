'use client';

import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { Phone, Mail, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen py-32 flex items-center bg-black relative z-10 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full relative">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
          
          {/* Left Side: Typography */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] mb-8">Hubungi Kami</h2>
              
              <h3 className="text-6xl md:text-8xl lg:text-[7rem] font-medium text-white tracking-tight leading-[0.95] mb-10">
                Hubungi<br /><span className="text-blue-500 italic">Sekarang!!</span>
              </h3>

              <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed mb-12 font-light">
                Punya ide brilian atau sekadar ingin diskusi teknis? Kami siap mendengarkan dan mewujudkannya.
              </p>

              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                 <span className="text-zinc-400 text-sm font-medium">Tersedia untuk proyek baru</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Contact Cards */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Magnetic strength={0.1}>
                <a 
                  href="https://wa.me/6281216802722" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-10 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center gap-6 mb-6 sm:mb-0">
                     <div className="w-16 h-16 rounded-full bg-white/[0.05] group-hover:bg-green-500/10 flex items-center justify-center text-white group-hover:text-green-500 transition-colors duration-500">
                       <Phone size={24} strokeWidth={1.5} />
                     </div>
                     <div>
                       <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">WhatsApp</p>
                       <p className="text-white font-medium text-xl md:text-2xl tracking-tight">0812-1680-2722</p>
                     </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 sm:self-center self-end">
                    <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </a>
              </Magnetic>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Magnetic strength={0.1}>
                <a 
                  href="mailto:admin@ghostdev.co" 
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-10 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center gap-6 mb-6 sm:mb-0">
                     <div className="w-16 h-16 rounded-full bg-white/[0.05] group-hover:bg-blue-500/10 flex items-center justify-center text-white group-hover:text-blue-500 transition-colors duration-500">
                       <Mail size={24} strokeWidth={1.5} />
                     </div>
                     <div>
                       <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Email</p>
                       <p className="text-white font-medium text-xl md:text-2xl tracking-tight">admin@ghostdev.co</p>
                     </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 sm:self-center self-end">
                    <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </a>
              </Magnetic>
            </motion.div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-zinc-500 text-sm font-light">
              &copy; {new Date().getFullYear()} GhostDev. All rights reserved.
           </div>
           
           <div className="flex gap-8 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
              <span>Surabaya, ID</span>
              <span>EST. 2026</span>
           </div>
        </div>
      </div>
    </section>
  );
}
