import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, src: '/uploads/upload_1.png', alt: 'Pre-wedding photo 1' },
  { id: 2, src: '/uploads/upload_2.png', alt: 'Pre-wedding photo 2' },
  { id: 3, src: '/uploads/upload_3.png', alt: 'Pre-wedding photo 3' },
  { id: 4, src: '/uploads/wed-img-try.jpg', alt: 'Pre-wedding photo 4' },
  { id: 5, src: '/uploads/upload_1.png', alt: 'Pre-wedding photo 5' },
  { id: 6, src: '/uploads/upload_2.png', alt: 'Pre-wedding photo 6' },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 bg-[var(--color-cream)]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="section-subtitle">A STORY IN PICTURES</p>
          <h2 className="section-title">Captured Moments</h2>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[250px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPhoto(index)}
              className={`group relative overflow-hidden card-royal cursor-pointer p-2 ${index === 0 ? 'md:col-span-2 md:row-span-2' :
                  index === 3 ? 'md:col-span-2' : ''
                }`}
            >
              <div className="relative w-full h-full overflow-hidden rounded-[calc(var(--radius-royal)-8px)]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--color-royal-red)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-4 group"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-royal-gold)] flex items-center justify-center text-[var(--color-royal-red)] transition-all group-hover:bg-[var(--color-royal-red)] group-hover:text-white group-hover:border-[var(--color-royal-red)]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="font-sans text-sm tracking-[0.4em] text-[var(--color-ink)] uppercase font-bold group-hover:text-[var(--color-royal-red)] transition-colors">#Tag us on instagram</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--color-ink)]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white p-2 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(prev => prev !== null ? (prev + 1) % photos.length : null);
              }}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[4/3] md:aspect-auto md:h-full flex items-center justify-center p-4 md:p-8 bg-white/5 rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 font-serif italic text-lg">
                {photos[selectedPhoto].alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
