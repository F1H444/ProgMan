'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X, ImageIcon, Trash2 } from 'lucide-react';
import { getProjectByIdAction, updateProjectAction, deleteProjectAction, uploadProjectImageAction, Project } from '@/app/actions/projects';

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Pemrograman Web',
    tech: [] as string[],
    image: '',
    longImages: [] as string[],
    description: '',
  });
  const [newTech, setNewTech] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProjectByIdAction(id as string);

      if (!data) {
        alert('Project tidak ditemukan');
        router.push('/admin/projects');
        return;
      }

      setFormData({
        title: data.title,
        slug: data.slug,
        category: data.category,
        tech: data.tech || [],
        image: data.image,
        longImages: data.longImages || [],
        description: data.description || '',
      });
      setLoading(false);
    };

    fetchProject();
  }, [id, router]);

  const addTech = () => {
    if (newTech.trim() && !formData.tech.includes(newTech.trim())) {
      setFormData({ ...formData, tech: [...formData.tech, newTech.trim()] });
      setNewTech('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, tech: formData.tech.filter(t => t !== tech) });
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setUploadingHero(true);
    const { url, error } = await uploadProjectImageAction(file, 'hero');
    if (url) {
      setFormData({ ...formData, image: url });
    } else {
      alert(`Gagal upload gambar: ${error}`);
    }
    setUploadingHero(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGallery(true);
    setUploadingGallery(true);
    const { url, error } = await uploadProjectImageAction(file, 'gallery');
    if (url) {
      setFormData({ ...formData, longImages: [...formData.longImages, url] });
    } else {
      alert(`Gagal upload gambar: ${error}`);
    }
    setUploadingGallery(false);
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      longImages: formData.longImages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.image || formData.tech.length === 0) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    setSaving(true);
    const project = await updateProjectAction(id as string, {
      ...formData,
      longImages: formData.longImages.length > 0 ? formData.longImages : null,
      description: formData.description || null,
    });

    if (project) {
      router.push('/admin/projects');
    } else {
      alert('Gagal menyimpan project');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus project "${formData.title}"?`)) {
      return;
    }

    const success = await deleteProjectAction(id as string);
    if (success) {
      router.push('/admin/projects');
    } else {
      alert('Gagal menghapus project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Project</h1>
            <p className="text-zinc-500 text-sm">{formData.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Hapus</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">
            Judul Project <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Website Bromotrail"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">
            Slug <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="website-bromotrail"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all font-mono"
          />
          <p className="text-zinc-600 text-xs">URL: /work/{formData.slug || 'slug'}</p>
        </div>

        {/* Category & Size */}
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-zinc-400 text-sm font-medium">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all"
            >
              <option value="Pemrograman Web" className="bg-zinc-900 text-white">Pemrograman Web</option>
              <option value="Mobile App" className="bg-zinc-900 text-white">Mobile App</option>
              <option value="UI/UX Design" className="bg-zinc-900 text-white">UI/UX Design</option>
              <option value="Desktop App" className="bg-zinc-900 text-white">Desktop App</option>
            </select>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">
            Tech Stack <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
              placeholder="Laravel, React, dll..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {formData.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hero Image */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">
            Gambar Hero <span className="text-red-400">*</span>
          </label>
          {formData.image ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={formData.image} alt="Hero" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: '' })}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-white/30 transition-colors">
              {uploadingHero ? (
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ImageIcon className="w-10 h-10 text-zinc-600 mb-2" />
                  <p className="text-zinc-500 text-sm">Klik untuk upload gambar</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleHeroUpload} className="hidden" />
            </label>
          )}
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Atau masukkan URL gambar..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all text-sm"
          />
        </div>

        {/* Gallery Images */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">
            Gallery Images (Long Screenshots)
          </label>
          <div className="grid grid-cols-3 gap-3">
{formData.longImages.map((img, index) => (
               <div key={index} className="relative rounded-xl overflow-hidden aspect-[3/4]">
                 <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                 <button
                   type="button"
                   onClick={() => removeGalleryImage(index)}
                   className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-lg text-white hover:bg-black/70 transition-colors"
                 >
                   <X className="w-3 h-3" />
                 </button>
               </div>
             ))}
            <label className="flex flex-col items-center justify-center aspect-[3/4] border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-white/30 transition-colors">
              {uploadingGallery ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-8 h-8 text-zinc-600" />
                  <p className="text-zinc-600 text-xs mt-1">Tambah</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-sm font-medium">Deskripsi (Opsional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Deskripsi singkat tentang project..."
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            Batal
          </Link>
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: saving ? 1 : 1.02 }}
            whileTap={{ scale: saving ? 1 : 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
