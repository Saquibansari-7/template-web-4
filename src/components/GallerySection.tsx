import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { SectionHeading, Blob } from './Decor';
import { GalleryImage } from '../App';
import { useT } from '../context/LanguageContext';

export default function GallerySection({ gallery }: { gallery: GalleryImage[] }) {
  const { t } = useT();
  const photos = gallery && gallery.length ? gallery : [];
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 bg-[var(--color-cream)] overflow-hidden">
      <Blob color="var(--color-peach)" className="w-[34rem] h-[34rem] top-10 left-1/2 -translate-x-1/2 opacity-40 floaty" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow={t("gallery.eyebrow")} title={t("gallery.title")} />

        {/* Photo Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[220px] md:auto-rows-[250px]">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30, rotate: index % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.08, type: 'spring', stiffness: 60, damping: 13 }}
                whileHover={{ y: -8, rotate: -1, scale: 1.02 }}
                onClick={() => setSelectedPhoto(index)}
                className={`group relative overflow-hidden card-royal cursor-pointer p-2 ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : index === 3 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[calc(var(--radius-royal)-10px)]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-royal-red)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[calc(var(--radius-royal)-10px)] pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--color-ink)]/40 font-serif italic text-lg">{t("gallery.empty")}</p>
        )}

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
            <div className="w-16 h-16 rounded-full border-2 border-[var(--color-royal-gold)] flex items-center justify-center text-[var(--color-royal-red)] transition-all duration-300 group-hover:bg-[var(--color-royal-red)] group-hover:text-white group-hover:border-[var(--color-royal-red)] group-hover:rotate-12">
              <Instagram className="w-6 h-6" />
            </div>
            <span className="font-sans text-sm tracking-[0.4em] text-[var(--color-ink)] uppercase font-bold group-hover:text-[var(--color-royal-red)] transition-colors">{t("tag.instagram")}</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox (logic preserved) */}
      <AnimatePresence>
        {selectedPhoto !== null && photos[selectedPhoto] && (
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
              key={selectedPhoto}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-[4/3] md:aspect-auto md:h-full flex items-center justify-center p-4 md:p-8 bg-white/5 rounded-[var(--radius-royal)]"
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
