import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-cream)]/90 backdrop-blur-md border-b border-[var(--color-royal-gold)]/10 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--color-royal-red)]/20 flex items-center justify-center bg-[var(--color-royal-red)]/5">
                <span className="font-serif text-[var(--color-royal-red)] font-bold text-lg">A</span>
              </div>
              <span className="font-serif text-2xl tracking-tighter text-[var(--color-ink)] hidden sm:block">
                Priya <span className="text-[var(--color-royal-red)]">&</span> Arjun
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-[var(--color-ink)]/70 hover:text-[var(--color-royal-red)] font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300"
                >
                  {item.label}
                </motion.a>
              ))}
              <a href="#rsvp" className="btn-royal py-2 px-6 text-sm">RSVP Now</a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[var(--color-royal-red)] p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          y: isMobileMenuOpen ? 0 : -20,
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div className="absolute inset-0 bg-[var(--color-cream)]/98 backdrop-blur-2xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-10">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-serif text-[var(--color-ink)] hover:text-[var(--color-royal-red)] transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <a 
            href="#rsvp" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-royal mt-4 text-xl py-4 px-12"
          >
            RSVP Now
          </a>
        </div>
      </motion.div>
    </>
  );
}
