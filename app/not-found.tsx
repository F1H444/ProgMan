'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg relative z-10"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative mb-8"
        >
          <h1 className="text-[120px] md:text-[180px] font-bold bg-gradient-to-b from-white via-white/80 to-transparent bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-white/5">404</div>
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        {/* Description */}
        <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
          Sepertinya halaman yang Anda cari telah dipindahkan atau tidak ada. 
          Mari kita kembali ke beranda.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </motion.div>
          </Link>
          
          <Link href="/work">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>Lihat Portofolio</span>
            </motion.div>
          </Link>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke halaman sebelumnya
        </button>
      </motion.div>
    </div>
  );
}