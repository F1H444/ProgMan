'use client';

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getReviewsAction } from '@/app/actions/reviews';
import { submitReview } from '@/app/actions/reviews';
import { X, Send, Plus, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Review {
  id?: number;
  name: string;
  role: string;
  text: string;
}

export function TestimonialsSection() {
  const [dynamicReviews, setDynamicReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data } = await getReviewsAction();
    
    if (data) {
      setDynamicReviews(data as any[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-slide every 5 seconds
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dynamicReviews.length);
    }, 5000);
  }, [dynamicReviews.length]);

  useEffect(() => {
    if (dynamicReviews.length > 0) {
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [dynamicReviews.length, startAutoPlay]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startAutoPlay(); // Reset timer on manual navigation
  };

  const goPrev = () => {
    goTo((activeIndex - 1 + dynamicReviews.length) % dynamicReviews.length);
  };

  const goNext = () => {
    goTo((activeIndex + 1) % dynamicReviews.length);
  };

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await submitReview(formData);
    setIsSubmitting(false);

    if (result.error) {
      alert(result.error);
    } else {
      alert('Terima kasih! Ulasan Anda telah berhasil dikirim.');
      setShowModal(false);
      fetchReviews();
    }
  };

  // Color accents for cards
  const cardAccents = [
    'hover:border-green-500/30',
    'hover:border-purple-500/30',
    'hover:border-blue-500/30',
    'hover:border-cyan-500/30',
    'hover:border-yellow-500/30',
  ];

  const activeAccentBorders = [
    'border-green-500/20',
    'border-purple-500/20',
    'border-blue-500/20',
    'border-cyan-500/20',
    'border-yellow-500/20',
  ];

  // Calculate visible cards (show 3 at a time on desktop)
  const getCardStyle = (index: number) => {
    const total = dynamicReviews.length;
    if (total === 0) return { position: 0, isActive: false, isVisible: false };
    
    // Calculate relative position from active
    let diff = index - activeIndex;
    // Wrap around for infinite effect
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isActive = diff === 0;
    const isVisible = Math.abs(diff) <= 2;

    return { position: diff, isActive, isVisible };
  };

  return (
    <section id="testimonials" className="min-h-screen py-24 flex items-center bg-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-[0.4em] mb-4 md:mb-6">Cerita Klien</h2>
            <h3 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Apa Kata Mereka? <br /> <span className="text-blue-500 italic">Bukti Nyata</span> Kualitas.
            </h3>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="h-12 md:h-14 px-6 md:px-8 flex items-center gap-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white group w-fit"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Tulis Ulasan</span>
          </button>
        </div>

        {/* Carousel */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 w-80 bg-zinc-900 animate-pulse rounded-[2.5rem] flex-shrink-0" />
            ))}
          </div>
        ) : dynamicReviews.length > 0 ? (
          <div className="relative">
            {/* Cards Container */}
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative h-[340px] md:h-[380px] flex items-center justify-center overflow-hidden"
            >
              {dynamicReviews.map((review, index) => {
                const { position, isActive, isVisible } = getCardStyle(index);
                if (!isVisible) return null;

                return (
                  <motion.div
                    key={review.id || index}
                    initial={false}
                    animate={{
                      x: `${position * 105}%`,
                      scale: isActive ? 1.08 : 0.85,
                      opacity: isActive ? 1 : Math.abs(position) === 1 ? 0.5 : 0.2,
                      zIndex: isActive ? 10 : 5 - Math.abs(position),
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    onClick={() => goTo(index)}
                    className={cn(
                      "absolute w-[85%] sm:w-[380px] md:w-[420px] p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border flex flex-col justify-between cursor-pointer transition-colors duration-500 shadow-[0_0_40px_-15px_rgba(255,255,255,0.05)]",
                      isActive
                        ? activeAccentBorders[index % 5]
                        : "border-white/5",
                      !isActive && cardAccents[index % 5]
                    )}
                    style={{ minHeight: '280px' }}
                  >
                    {/* Quote icon */}
                    <div className="mb-4">
                      <svg className={cn("w-8 h-8 transition-colors duration-500", isActive ? "text-blue-500/40" : "text-white/5")} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className={cn(
                      "text-sm leading-relaxed mb-8 transition-colors duration-500",
                      isActive ? "text-zinc-300" : "text-zinc-500"
                    )}>
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div>
                      <h4 className={cn(
                        "font-bold text-sm tracking-tight transition-colors duration-500",
                        isActive ? "text-white" : "text-zinc-400"
                      )}>
                        {review.name}
                      </h4>
                      <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mt-1">
                        {review.role}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-10">
              {/* Prev Button */}
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {dynamicReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={cn(
                      "rounded-full transition-all duration-500",
                      index === activeIndex
                        ? "w-8 h-2 bg-blue-500"
                        : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                    )}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-20">
            <p className="text-lg">Belum ada ulasan. Jadilah yang pertama!</p>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit p-6 bg-zinc-950 border border-white/10 rounded-2xl z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Berikan Ulasan</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 block">Nama</label>
                  <input 
                    name="name"
                    required
                    placeholder="Nama Anda"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 block">Role / Jurusan</label>
                  <input 
                    name="role"
                    required
                    placeholder="Contoh: Pemilik Bisnis"
                    defaultValue="Pemilik Bisnis"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-2 block">Ulasan</label>
                  <textarea 
                    name="text"
                    required
                    rows={4}
                    placeholder="Bagaimana pengalaman Anda menggunakan jasa kami?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Ulasan</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
