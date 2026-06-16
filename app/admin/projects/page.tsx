'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { getProjectsAction, deleteProjectAction, Project } from '@/app/actions/projects';

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | number | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjectsAction();
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus project "${title}"?`)) {
      return;
    }
    
    setDeleting(id);
    const success = await deleteProjectAction(id);
    
    if (success) {
      setProjects(projects.filter(p => p.id !== id));
    } else {
      alert('Gagal menghapus project');
    }
    
    setDeleting(null);
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-zinc-500 mt-1">Kelola semua project Anda</p>
        </div>
        <Link
          href="/admin/projects/create"
          className="flex items-center gap-2 px-5 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Project</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari project..."
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
        />
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-zinc-400 text-sm font-medium">Project</th>
              <th className="px-6 py-4 text-left text-zinc-400 text-sm font-medium hidden md:table-cell">Category</th>

              <th className="px-6 py-4 text-right text-zinc-400 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                  {search ? 'Tidak ada project yang cocok' : 'Belum ada project'}
                </td>
              </tr>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{project.title}</p>
                        <p className="text-zinc-500 text-sm truncate md:hidden">{project.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-zinc-400 text-sm">{project.category}</span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/work/${project.slug}`}
                        target="_blank"
                        className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        disabled={deleting === project.id}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === project.id ? (
                          <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
