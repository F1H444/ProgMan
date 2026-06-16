'use client';

import { motion } from 'framer-motion';
import { Layout, Shield, Zap, Globe, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    title: "Pemrograman Web",
    description: "Bikin website dari nol dengan fitur yang disesuaikan sama kebutuhanmu. Pasti cepat, fungsional, dan keren di HP maupun laptop.",
    icon: Globe,
    color: "text-blue-500",
    hoverBg: "group-hover:bg-blue-500/10",
    num: "01"
  },
  {
    title: "Solusi Lengkap",
    description: "Gak cuma nulis kode, kita bantu dari konsep awal sampai aplikasinya bener-benar siap rilis.",
    icon: Zap,
    color: "text-yellow-500",
    hoverBg: "group-hover:bg-yellow-500/10",
    num: "02"
  },
  {
    title: "UI/UX & Desain",
    description: "Desain website yang kekinian, gampang dipakai, dan pastinya bikin bisnismu keliatan lebih pro.",
    icon: Layout,
    color: "text-purple-500",
    hoverBg: "group-hover:bg-purple-500/10",
    num: "03"
  },
  {
    title: "Keamanan Sistem",
    description: "Sistem keamanan yang kuat biar data kamu aman dan gak gampang kebobolan.",
    icon: Shield,
    color: "text-green-500",
    hoverBg: "group-hover:bg-green-500/10",
    num: "04"
  },
  {
    title: "Konsultasi Santai",
    description: "Masih bingung mau bikin apa? Ngobrol santai aja dulu, gratis kok!",
    icon: Cpu,
    color: "text-cyan-500",
    hoverBg: "group-hover:bg-cyan-500/10",
    num: "05"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-32 relative z-10 bg-black">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12"
        >
          <div>
            <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] mb-6">Keuntungan</h2>
            <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-tight">
              Fast Results, High Grades,<br /><span className="text-blue-500 italic">Low Costs.</span>
            </h3>
          </div>
          <p className="text-zinc-500 text-lg max-w-sm leading-relaxed">
            Semua yang kamu butuhin untuk go digital, ada di sini.
          </p>
        </motion.div>

        {/* Service Rows */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-10 md:py-14 border-b border-white/5 cursor-default transition-all duration-500 rounded-2xl px-6 md:px-10 -mx-6 md:-mx-10",
                service.hoverBg
              )}
            >
              {/* Number */}
              <span className="text-zinc-800 font-mono text-sm tracking-widest md:w-16 shrink-0">
                {service.num}
              </span>
              
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110",
                service.color
              )}>
                <service.icon size={26} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h4 className="text-2xl md:text-3xl font-medium text-white tracking-tight md:flex-1 transition-colors group-hover:text-white">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed md:max-w-sm md:text-right group-hover:text-zinc-400 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
