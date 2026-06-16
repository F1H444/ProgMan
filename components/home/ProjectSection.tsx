'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProjects, projects as staticProjects, Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';

function EditorialProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={cn(
      "flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32 md:mb-48 group",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>
      {/* Image Side */}
      <Link href={`/work/${project.slug}`} className="w-full lg:w-3/5 block overflow-hidden rounded-3xl relative aspect-[4/3] md:aspect-[16/10]">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full h-full"
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          />
        </motion.div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-700" />
      </Link>

      {/* Text Side */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6 block">
            {String(index + 1).padStart(2, '0')} // {project.category}
          </span>
          <h4 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight mb-8 group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h4>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {project.tech.map((t, idx) => (
              <span key={idx} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-xs text-zinc-400">
                {t}
              </span>
            ))}
          </div>

          <Link 
            href={`/work/${project.slug}`}
            className="flex items-center gap-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-colors w-fit"
          >
            <span>Lihat Studi Kasus</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors bg-white/5">
              <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function ProjectSection() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <section id="work" className="relative min-h-screen py-32 bg-black z-10 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12"
        >
          <div>
            <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] mb-6">Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-medium text-white tracking-tight leading-tight">
              Best <span className="text-blue-500 italic">Projects.</span>
            </h3>
          </div>
          <p className="text-zinc-500 text-lg max-w-sm">
            Karya terbaik kami yang memadukan desain kelas atas dan performa kode yang optimal.
          </p>
        </motion.div>

        {/* Cinematic Projects List */}
        <div className="flex flex-col">
          {(isExpanded ? projects : projects.slice(0, 4)).map((project, i) => (
            <EditorialProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Show More Button */}
        {!isExpanded && projects.length > 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <button 
              onClick={() => setIsExpanded(true)}
              className="group flex flex-col items-center gap-4 cursor-pointer"
            >
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 group-hover:text-white transition-colors">
                Lihat Project Lainnya ({projects.length - 4})
              </span>
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-full text-zinc-500 group-hover:border-blue-500 group-hover:text-blue-500 transition-all bg-white/[0.03] backdrop-blur-xl"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
