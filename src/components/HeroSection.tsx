import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { WeddingData } from '../App';
import royalEmblem from '../assets/royal-emblem.png';
import { Blob } from './Decor';

export default function HeroSection({ weddingData }: { weddingData: WeddingData }) {
  const [showInvitation, setShowInvitation] = useState(false);

  // Format date for display
  const dateObj = new Date(weddingData.weddingDate);
  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, '.');

  // Determine emblem source - use uploaded emblem if available, otherwise default
  const emblemSrc = weddingData.emblem && weddingData.emblem.trim() !== ''
       ? weddingData.emblem
    : royalEmblem;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-cream)]"
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }}
      />

      {/* Soft pastel blobs */}
      <Blob color="var(--color-blush)" className="w-[42rem] h-[42rem] -top-40 -left-32 floaty" />
      <Blob color="var(--color-sky)" className="w-[36rem] h-[36rem] -bottom-40 -right-32 floaty" style={{ animationDelay: '2s' }} />
      <Blob color="var(--color-peach)" className="w-[28rem] h-[28rem] top-1/3 right-10 opacity-40 floaty" style={{ animationDelay: '4s' }} />

      {/* Decorative Corner Ornaments */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-[var(--color-royal-gold)] opacity-40 rounded-tl-[var(--radius-royal)]" />
      <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-[var(--color-royal-gold)] opacity-40 rounded-tr-[var(--radius-royal)]" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-[var(--color-royal-gold)] opacity-40 rounded-bl-[var(--radius-royal)]" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-[var(--color-royal-gold)] opacity-40 rounded-br-[var(--radius-royal)]" />

      {/* Main Content Container */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto ornate-border p-12 md:p-24 shadow-2xl shadow-[var(--color-royal-red)]/5">
        {/* Royal Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-10 floaty"
        >
          <img
            src={emblemSrc}
            alt="Royal Wedding Emblem"
            className="mx-auto w-44 h-44 md:w-60 md:h-60 object-contain drop-shadow-2xl"
            style={{ mixBlendMode: 'multiply' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              const parent = target.parentElement;
              if (parent && !target.classList.contains('fallback-shown')) {
                target.classList.add('fallback-shown');
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'flex items-center justify-center w-44 h-44 md:w-60 md:h-60 text-gray-300';
                fallback.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="12" cy="12" r="3"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>';
                parent.appendChild(fallback);
              }
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-[var(--color-royal-gold)] tracking-[0.5em] text-xs md:text-sm mb-8 font-sans font-semibold"
        >
          THE ROYAL UNION OF
        </motion.p>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 mb-6">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[var(--color-royal-red)] leading-tight drop-shadow-sm">
              {weddingData.brideName}
            </h1>
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 120, damping: 9 }}
              className="text-[var(--color-royal-gold)] font-serif text-4xl md:text-5xl italic"
            >
              &
            </motion.span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[var(--color-royal-red)] leading-tight drop-shadow-sm">
              {weddingData.groomName}
            </h1>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60%', opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-[var(--color-royal-gold)] to-transparent mx-auto my-10"
        />

        {/* Invitation Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-[var(--color-ink)] font-serif text-xl md:text-2xl italic mb-4">
            Save the Date
          </p>
          <p className="text-[var(--color-royal-red)] font-serif text-2xl md:text-3xl tracking-widest font-semibold">
            {formattedDate}
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 120, damping: 10 }}
          className="mt-12"
        >
          <button onClick={() => setShowInvitation(true)} className="btn-royal">
            View Invitation
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-[var(--color-royal-red)] w-8 h-8 opacity-60" />
      </motion.div>

      {/* Invitation Modal */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInvitation(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-[var(--radius-royal)] shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowInvitation(false)}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="p-8">
                {weddingData.invitationImage ? (
                  <img
                    src={weddingData.invitationImage}
                    alt="Wedding Invitation"
                    className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-300 mb-4">
                      <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-serif text-gray-400 mb-2">No Invitation Image</h3>
                    <p className="text-gray-500">Please upload an invitation image in the admin panel.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
