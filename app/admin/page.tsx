'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FolderKanban, 
  Plus, 
  Layers, 
  Code2, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { getProjectsAction, Project } from '@/app/actions/projects';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectsAction();
      setProjects(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Calculate stats
  const totalProjects = projects.length;
  const totalCategories = new Set(projects.map(p => p.category)).size;
  const allTech = projects.flatMap(p => p.tech);
  const totalTech = new Set(allTech).size;
  const recentProject = projects[0];

  const stats = [
    {
      label: 'Total Proyek',
      value: totalProjects,
      icon: FolderKanban,
      color: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
      change: '+12% kenaikan'
    },
    {
      label: 'Kategori Aktif',
      value: totalCategories,
      icon: Layers,
      color: 'bg-purple-500/10 text-purple-500 border border-purple-500/20',
      change: 'Portofolio beragam'
    },
    {
      label: 'Stack Teknologi',
      value: totalTech,
      icon: Code2,
      color: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20',
      change: 'Tool modern'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Pantau performa portofolio kamu di sini</p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/10"
        >
          <Plus className="w-5 h-5" />
          <span>Proyek Baru</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                {index === 0 && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    Growth
                  </span>
                )}
              </div>
              <p className="text-zinc-500 text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-xs text-zinc-600 font-medium">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Proyek Terbaru</h2>
            <Link
              href="/admin/projects"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Lihat Semua
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 border transition-all duration-500 ${
                  [
                    'border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]',
                    'border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]',
                    'border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]',
                    'border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)]'
                  ][index % 4]
                }`}
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-800">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <FolderKanban className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-opacity" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-medium text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{project.title}</h3>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(project.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-400 text-[10px] border border-white/5">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-zinc-500 text-[10px] border border-white/5">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="absolute inset-0"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Ikhtisar Cepat</h2>
          <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Aktivitas Terbaru</h3>
              {recentProject ? (
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                    <img 
                      src={recentProject.image} 
                      alt={recentProject.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium line-clamp-1">{recentProject.title}</p>
                    <p className="text-zinc-500 text-xs mt-1">Barusan ditambahin</p>
                    <Link 
                      href={`/admin/projects/${recentProject.id}/edit`}
                      className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block"
                    >
                      Edit Proyek
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">Belum ada proyek.</p>
              )}
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Status Sistem</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Database</span>
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Terhubung
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Storage</span>
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    Tersedia
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Versi</span>
                  <span className="text-zinc-300 font-mono">v1.2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

