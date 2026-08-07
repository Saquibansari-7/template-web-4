import { motion, useScroll, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

/* Decorative randomness precomputed once at module load (no randomness during render) */
type PetalCfg = { left: number; size: number; duration: number; delay: number; drift: number };
type StarCfg = { size: number; duration: number; delay: number; left: number; top: number };

const PETAL_POOL: PetalCfg[] = Array.from({ length: 80 }, () => ({
  left: Math.random() * 100,
  size: 12 + Math.random() * 16,
  duration: 9 + Math.random() * 9,
  delay: Math.random() * 8,
  drift: (Math.random() - 0.5) * 160,
}));

const STAR_POOL: StarCfg[] = Array.from({ length: 160 }, () => ({
  size: 1 + Math.random() * 2.5,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

/* ---- Reveal: bouncy scroll-in animation ---- */
export function Reveal({
  children,
  delay = 0,
  y = 44,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, type: 'spring', stiffness: 55, damping: 13 }}
    >
      {children}
    </motion.div>
  );
}

/* ---- SectionHeading ---- */
export function SectionHeading({
  eyebrow,
  title,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="text-center mb-16">
        <span className="section-subtitle">{eyebrow}</span>
        <h2 className="section-title">{title}</h2>
        <div className="mx-auto mt-5 w-44">
          <WavyDivider />
        </div>
      </div>
    </Reveal>
  );
}

/* ---- Wavy hand-drawn divider ---- */
export function WavyDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`w-full h-6 ${className}`} fill="none" aria-hidden>
      <path
        d="M2 12 C 22 2, 42 22, 62 12 S 102 2, 122 12 S 162 22, 182 12 S 222 2, 238 12"
        stroke="var(--color-royal-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="120" cy="12" r="4.5" fill="var(--color-royal-red)" />
    </svg>
  );
}

/* ---- Petals: drifting flower confetti ---- */
export function Petals({ count = 16, className = '' }: { count?: number; className?: string }) {
  const petals = PETAL_POOL.slice(0, count);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          } as React.CSSProperties}
        >
          <FlowerSVG />
        </span>
      ))}
    </div>
  );
}

/* ---- Sparkles: twinkling stars for night scenes ---- */
export function Sparkles({ count = 60, className = '' }: { count?: number; className?: string }) {
  const stars = STAR_POOL.slice(0, count);
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star absolute rounded-full bg-[#f6e7b8]"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(246,231,184,0.8)',
          }}
        />
      ))}
    </div>
  );
}

/* ---- Blob: decorative organic shape ---- */
export function Blob({
  color = 'var(--color-blush)',
  className = '',
  style,
}: {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-[42%_58%_55%_45%/45%_42%_58%_55%] blur-2xl opacity-60 ${className}`}
      style={{ background: color, ...style }}
    />
  );
}

/* ---- Flower SVG ---- */
export function FlowerSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <g fill="var(--color-rose)" stroke="var(--color-royal-gold)" strokeWidth="1">
        <ellipse cx="20" cy="9" rx="6" ry="9" />
        <ellipse cx="20" cy="31" rx="6" ry="9" />
        <ellipse cx="9" cy="20" rx="9" ry="6" />
        <ellipse cx="31" cy="20" rx="9" ry="6" />
        <ellipse cx="12" cy="12" rx="7" ry="7" transform="rotate(45 12 12)" />
        <ellipse cx="28" cy="28" rx="7" ry="7" transform="rotate(45 28 28)" />
      </g>
      <circle cx="20" cy="20" r="5.5" fill="var(--color-royal-gold)" />
    </svg>
  );
}

/* ---- Scroll progress bar (decorative, non-breaking) ---- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1.5 origin-left z-[120] bg-gradient-to-r from-[var(--color-royal-red)] via-[var(--color-royal-gold)] to-[var(--color-royal-red)]"
    />
  );
}
