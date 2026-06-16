'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, MessageSquare, Calendar } from 'lucide-react';
import { getReviewsAction, deleteReviewAction } from '@/app/actions/reviews';

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await getReviewsAction();

    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews((data || []) as any[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;

    const { error } = await deleteReviewAction(id);

    if (error) {
      alert('Gagal menghapus ulasan: ' + error);
    } else {
      setReviews(reviews.filter(r => r.id !== id));
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Kelola Ulasan</h1>
          <p className="text-zinc-500 text-sm">Daftar ulasan dari pengguna website</p>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5">
            <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">Belum ada ulasan yang masuk</p>
          </div>
        ) : (
          reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl hover:bg-zinc-900 transition-colors group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-white">{review.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-zinc-400">
                      {review.role}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(review.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Hapus Ulasan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
