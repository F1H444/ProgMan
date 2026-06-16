'use client';

import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Cpu, Layout, Boxes, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProjectBySlug, projects as staticProjects, Project } from '@/lib/projects';
import { Magnetic } from '@/components/ui/Magnetic';

// Gallery component with navigation buttons
function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full mb-32"
    >
      {/* Navigation Controls - Only show if multiple images */}
      {hasMultiple && (
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Previous Button */}
          <Magnetic strength={0.2}>
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all group"
            >
              <ChevronLeft size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            </button>
          </Magnetic>

          {/* Page Indicators */}
          <div className="flex items-center gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Magnetic strength={0.2}>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all group"
            >
              <ChevronRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
            </button>
          </Magnetic>

          {/* Page Counter */}
          <span className="text-zinc-600 font-mono text-xs ml-4">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <img 
              src={images[currentIndex]} 
              alt={`${title} - Gambar ${currentIndex + 1}`} 
              className="w-full h-auto block select-none"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (typeof slug === 'string') {
        const data = await fetchProjectBySlug(slug);
        setProject(data);
      }
      setLoading(false);
    };
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold mb-8">Proyek Tidak Ditemukan.</h1>
        <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono uppercase tracking-widest text-xs">
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-64 px-8 md:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-4 group mb-24">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
            <ArrowLeft size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">Kembali</span>
        </Link>

        {/* Header */}
        <div className="mb-32">
          <div className="mb-16">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em] mb-8"
            >
              Studi Kasus / {project.category}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-[12vw] font-black text-white tracking-tighter leading-none"
            >
              {project.title}
            </motion.h1>
          </div>
          <div className="flex flex-col gap-12">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="space-y-6"
            >
               <p className="text-zinc-500 text-lg leading-relaxed max-w-xl">
                 Solusi teknis presisi untuk tantangan akademik Anda. Proyek {project.title} dirancang untuk memenuhi standar kompetensi industri {project.category.toLowerCase()}.
               </p>
               <div className="flex gap-4">
                  <Magnetic strength={0.3}>
                    <a href="https://wa.me/6281216802722" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white rounded-full transition-transform hover:scale-105">
                      <span className="text-black font-bold text-xs uppercase tracking-widest">Konsultasi</span>
                      <ExternalLink size={14} className="text-black" />
                    </a>
                  </Magnetic>
               </div>
            </motion.div>
          </div>
        </div>

        {/* Project Image Gallery - Supports Multiple Long Screenshots */}
        <ProjectGallery 
          images={project.longImages || [project.image]} 
          title={project.title}
        />

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
           <div className="p-12 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <Cpu className="text-zinc-600 mb-8 group-hover:text-white transition-colors" size={32} />
              <h3 className="text-white font-bold text-xl mb-4">Technology Stacks</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
           </div>
           
           <div className="p-12 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <Layout className="text-zinc-600 mb-8 group-hover:text-white transition-colors" size={32} />
              <h3 className="text-white font-bold text-xl mb-4">Hasil Akhir</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Kode yang rapi, dokumentasi lengkap, dan hasil akhir yang siap rilis untuk ngembangin bisnismu.</p>
           </div>

           <div className="p-12 border border-white/5 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <Boxes className="text-zinc-600 mb-8 group-hover:text-white transition-colors" size={32} />
              <h3 className="text-white font-bold text-xl mb-4">Layanan Lainnya</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Gratis konsultasi dan maintenance ringan hingga proyek benar-benar siap rilis dan diterima dengan baik oleh penggunamu.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
