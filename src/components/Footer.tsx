import { Instagram } from 'lucide-react';
import { Reveal, WavyDivider } from './Decor';

export default function Footer({ footerDate, footerMessage, groomName, brideName }: { footerDate: string; footerMessage: string; groomName: string; brideName: string; }) {
  return (
    <footer className="relative py-24 bg-[var(--color-cream)] border-t border-[var(--color-royal-gold)]/10 overflow-hidden">
      {/* Background Filigree */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <pattern id="footerPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 5 L22 15 L32 17 L24 23 L26 33 L20 28 L14 33 L16 23 L8 17 L18 15 Z" fill="var(--color-royal-gold)" />
          </pattern>
          <rect width="100" height="100" fill="url(#footerPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Decorative Divider */}
        <Reveal>
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[var(--color-royal-gold)]/30" />
            <svg width="40" height="40" viewBox="0 0 100 100" className="text-[var(--color-royal-red)] floaty">
              <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="currentColor" />
            </svg>
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[var(--color-royal-gold)]/30" />
          </div>
        </Reveal>

        {/* Names */}
        <Reveal delay={0.05}>
          <h3 className="font-serif text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
            {brideName} <span className="gradient-text">&</span> {groomName}
          </h3>
        </Reveal>

        {/* Date */}
        <Reveal delay={0.1}>
          <p className="text-[var(--color-royal-gold)] font-sans tracking-[0.4em] text-xs font-bold mb-8 uppercase">
            {footerDate || 'APRIL 25, 2026'}
          </p>
        </Reveal>

        {/* Message */}
        <Reveal delay={0.15}>
          <p className="text-[var(--color-ink)]/60 font-serif italic text-lg leading-relaxed max-w-lg mx-auto mb-10">
            {footerMessage || "\"Two souls with but a single thought, two hearts that beat as one.\""}
            <br />
            <span className="not-italic text-sm uppercase tracking-widest mt-4 block text-[var(--color-ink)]/40 font-sans">
              We await your presence
            </span>
          </p>
        </Reveal>

        {/* Social Links */}
        <Reveal delay={0.2}>
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[var(--color-surface-low)] border border-[var(--color-royal-gold)]/30 flex items-center justify-center text-[var(--color-royal-red)] hover:bg-[var(--color-royal-red)] hover:text-white transition-all transform hover:-translate-y-1 hover:rotate-12 shadow-sm"
            >
              <Instagram size={20} />
            </a>
          </div>
        </Reveal>

        {/* Wavy divider + copyright */}
        <div className="w-40 mx-auto mb-6 opacity-70">
          <WavyDivider />
        </div>
        <p className="text-[var(--color-ink)]/20 font-sans text-[10px] uppercase tracking-widest">
          © 2026 webforwedd• All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
