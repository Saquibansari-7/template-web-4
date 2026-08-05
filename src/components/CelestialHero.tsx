import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CelestialHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-[150vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/uploads/wed-img-try.jpg')" }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B2135]/70 via-[#0d2a47]/60 to-[#1a3a5c]/80" />
      
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 60 + '%',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Mandala Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='80' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='60' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3Ccircle cx='100' cy='100' r='40' fill='none' stroke='%23D4AF37' stroke-width='0.5'/%3E%3Cpath d='M100 20 L100 180 M20 100 L180 100 M35 35 L165 165 M165 35 L35 165' stroke='%23D4AF37' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
        }}
      />

      {/* Moon */}
      <motion.div
        className="absolute right-[10%] top-[8%]"
        style={{ y: scrollY * 0.1 }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef9e7" />
              <stop offset="70%" stopColor="#f5e6c8" />
              <stop offset="100%" stopColor="#D4AF37" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="50" fill="url(#moonGlow)" />
          <path d="M80 30 Q95 60 80 90 Q100 60 80 30" fill="rgba(212,175,55,0.3)" />
        </svg>
      </motion.div>

      {/* Floating Castle */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[15%]"
        style={{ y: scrollY * 0.15 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <FloatingCastle />
      </motion.div>

      {/* Diamond Ring in Clouds */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[25%] z-20"
        style={{ y: scrollY * 0.2 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <DiamondRing />
      </motion.div>

      {/* Hot Air Balloons */}
      <motion.div
        className="absolute left-[15%] top-[20%]"
        style={{ y: scrollY * 0.08 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <HotAirBalloon color="#D4AF37" size={50} />
      </motion.div>
      <motion.div
        className="absolute right-[20%] top-[30%]"
        style={{ y: scrollY * 0.12 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <HotAirBalloon color="#B2AC88" size={35} />
      </motion.div>
      <motion.div
        className="absolute left-[25%] top-[35%]"
        style={{ y: scrollY * 0.06 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <HotAirBalloon color="#c9a96e" size={28} />
      </motion.div>

      {/* Mountain Layers */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Far Mountains */}
        <motion.div
          style={{ y: scrollY * 0.05 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg viewBox="0 0 1440 400" className="w-full h-auto">
            <path
              d="M0 400 L0 250 Q100 200 200 250 Q300 180 400 220 Q500 150 600 200 Q700 120 800 180 Q900 100 1000 160 Q1100 80 1200 140 Q1300 100 1440 120 L1440 400 Z"
              fill="#0f2d4a"
            />
          </svg>
        </motion.div>

        {/* Mid Mountains */}
        <motion.div
          style={{ y: scrollY * 0.1 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg viewBox="0 0 1440 350" className="w-full h-auto">
            <path
              d="M0 350 L0 200 Q80 150 160 200 Q240 100 320 180 Q400 80 500 150 Q600 60 700 130 Q800 40 900 100 Q1000 30 1100 80 Q1200 50 1300 90 Q1380 70 1440 100 L1440 350 Z"
              fill="#0a1f33"
            />
          </svg>
        </motion.div>

        {/* Near Mountains */}
        <motion.div
          style={{ y: scrollY * 0.15 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg viewBox="0 0 1440 300" className="w-full h-auto">
            <path
              d="M0 300 L0 180 Q60 130 120 170 Q180 80 260 140 Q340 50 440 110 Q540 30 640 90 Q740 20 840 70 Q940 10 1040 60 Q1140 20 1240 70 Q1340 40 1440 80 L1440 300 Z"
              fill="#061422"
            />
          </svg>
        </motion.div>

        {/* Trees Silhouette */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <path
              d="M0 200 L0 150 L20 150 L20 120 L30 100 L40 120 L40 150 L60 150 L60 130 L70 110 L80 130 L80 150 L100 150 L100 140 L110 120 L120 140 L120 150 L140 150 L140 130 L150 100 L160 130 L160 150 L180 150 L180 135 L190 115 L200 135 L200 150 L220 150 L220 140 L230 125 L240 140 L240 150 L260 150 L260 145 L270 130 L280 145 L280 150 L300 150 L300 140 L310 120 L320 140 L320 150 L340 150 L340 145 L350 130 L360 145 L360 150 L380 150 L380 140 L390 125 L400 140 L400 150 L420 150 L420 135 L430 110 L440 135 L440 150 L460 150 L460 140 L470 125 L480 140 L480 150 L500 150 L500 145 L510 130 L520 145 L520 150 L540 150 L540 140 L550 120 L560 140 L560 150 L580 150 L580 135 L590 115 L600 135 L600 150 L620 150 L620 145 L630 130 L640 145 L640 150 L660 150 L660 140 L670 125 L680 140 L680 150 L700 150 L700 145 L710 130 L720 145 L720 150 L740 150 L740 140 L750 120 L760 140 L760 150 L780 150 L780 135 L790 115 L800 135 L800 150 L820 150 L820 145 L830 130 L840 145 L840 150 L860 150 L860 140 L870 125 L880 140 L880 150 L900 150 L900 145 L910 130 L920 145 L920 150 L940 150 L940 140 L950 120 L960 140 L960 150 L980 150 L980 135 L990 115 L1000 135 L1000 150 L1020 150 L1020 145 L1030 130 L1040 145 L1040 150 L1060 150 L1060 140 L1070 125 L1080 140 L1080 150 L1100 150 L1100 145 L1110 130 L1120 145 L1120 150 L1140 150 L1140 140 L1150 120 L1160 140 L1160 150 L1180 150 L1180 135 L1190 115 L1200 135 L1200 150 L1220 150 L1220 145 L1230 130 L1240 145 L1240 150 L1260 150 L1260 140 L1270 125 L1280 140 L1280 150 L1300 150 L1300 145 L1310 130 L1320 145 L1320 150 L1340 150 L1340 140 L1350 120 L1360 140 L1360 150 L1380 150 L1380 135 L1390 115 L1400 135 L1400 150 L1420 150 L1420 145 L1430 130 L1440 145 L1440 150 L1440 200 Z"
              fill="#030a12"
            />
          </svg>
        </div>
      </div>

      {/* Names Title */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-[55%] text-center z-30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="relative">
          <p className="font-sans text-[#B2AC88] tracking-[0.5em] text-sm md:text-base mb-4">TOGETHER WITH THEIR FAMILIES</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#D4AF37] leading-tight">
            <span className="block">Priya</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl my-2 font-light italic text-[#f5e6c8]">&</span>
            <span className="block">Arjun</span>
          </h1>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <p className="font-sans text-[#B2AC88] tracking-[0.3em] text-xs md:text-sm">REQUEST THE PLEASURE OF YOUR COMPANY</p>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#B2AC88] text-xs tracking-[0.3em] font-sans">SCROLL TO EXPLORE</p>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}

function FloatingCastle() {
  return (
    <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]">
      {/* Main Tower */}
      <rect x="120" y="80" width="60" height="100" fill="#1a3a5c" stroke="#D4AF37" strokeWidth="1" />
      <rect x="130" y="60" width="40" height="30" fill="#1a3a5c" stroke="#D4AF37" strokeWidth="1" />
      {/* Tower Top */}
      <path d="M150 30 L170 60 L130 60 Z" fill="#0d2a47" stroke="#D4AF37" strokeWidth="1" />
      {/* Windows */}
      <rect x="135" y="90" width="10" height="15" rx="5" fill="#D4AF37" opacity="0.6" />
      <rect x="155" y="90" width="10" height="15" rx="5" fill="#D4AF37" opacity="0.6" />
      <rect x="145" y="120" width="10" height="15" rx="5" fill="#D4AF37" opacity="0.6" />
      {/* Side Towers */}
      <rect x="80" y="100" width="35" height="80" fill="#15304d" stroke="#D4AF37" strokeWidth="0.5" />
      <rect x="185" y="100" width="35" height="80" fill="#15304d" stroke="#D4AF37" strokeWidth="0.5" />
      <path d="M97 75 L115 100 L80 100 Z" fill="#0d2a47" stroke="#D4AF37" strokeWidth="0.5" />
      <path d="M202 75 L220 100 L185 100 Z" fill="#0d2a47" stroke="#D4AF37" strokeWidth="0.5" />
      {/* Flags */}
      <line x1="150" y1="30" x2="150" y2="15" stroke="#D4AF37" strokeWidth="1" />
      <path d="M150 15 L165 22 L150 29" fill="#D4AF37" />
      {/* Clouds */}
      <ellipse cx="60" cy="70" rx="30" ry="15" fill="#0d2a47" opacity="0.5" />
      <ellipse cx="240" cy="60" rx="35" ry="18" fill="#0d2a47" opacity="0.5" />
    </svg>
  );
}

function DiamondRing() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]">
      <defs>
        <linearGradient id="diamondShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#fef9e7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ring Band */}
      <circle cx="50" cy="55" r="30" fill="none" stroke="#D4AF37" strokeWidth="3" filter="url(#glow)" />
      {/* Diamond */}
      <path
        d="M50 15 L65 30 L50 45 L35 30 Z"
        fill="url(#diamondShine)"
        filter="url(#glow)"
      />
      <path d="M35 30 L50 35 L65 30" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
      {/* Sparkles */}
      <circle cx="30" cy="20" r="2" fill="#D4AF37" opacity="0.8" />
      <circle cx="70" cy="25" r="1.5" fill="#D4AF37" opacity="0.6" />
      <circle cx="25" cy="45" r="1" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}

function HotAirBalloon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 50 65">
      <defs>
        <linearGradient id={`balloon-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#0d2a47" />
        </linearGradient>
      </defs>
      {/* Balloon */}
      <ellipse cx="25" cy="22" rx="20" ry="22" fill={`url(#balloon-${color})`} stroke={color} strokeWidth="0.5" />
      {/* Stripes */}
      <path d="M10 22 Q25 0 40 22" fill="none" stroke={color} strokeWidth="0.3" opacity="0.5" />
      <path d="M7 28 Q25 8 43 28" fill="none" stroke={color} strokeWidth="0.3" opacity="0.5" />
      {/* Basket Lines */}
      <line x1="18" y1="44" x2="15" y2="55" stroke={color} strokeWidth="0.5" />
      <line x1="32" y1="44" x2="35" y2="55" stroke={color} strokeWidth="0.5" />
      {/* Basket */}
      <rect x="14" y="55" width="22" height="8" rx="2" fill="#0d2a47" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}
