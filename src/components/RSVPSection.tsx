import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Reveal, SectionHeading, Blob } from './Decor';

interface RSVPSectionProps {
  adminPhone: string;
}

export default function RSVPSection({ adminPhone }: RSVPSectionProps) {
  const handleWhatsAppRSVP = () => {
    const cleanPhone = adminPhone.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const message = `Wedding RSVP%0A%0AHi, I'd like to RSVP for the wedding of beautiful couple. Please confirm my attendance.`;
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <section id="rsvp" className="relative py-32 bg-[var(--color-cream)] overflow-hidden">
      <Blob color="var(--color-rose)" className="w-[30rem] h-[30rem] top-1/3 left-1/2 -translate-x-1/2 opacity-30 floaty" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <SectionHeading eyebrow="WE'D LOVE TO SEE YOU" title="Kindly Respond" />

        <Reveal delay={0.1}>
          <p className="text-[var(--color-ink)]/60 text-lg mt-4 max-w-lg mx-auto mb-10">
            Please RSVP through WhatsApp for a personal confirmation and any additional details.
          </p>
        </Reveal>

        {/* WhatsApp Button */}
        <Reveal delay={0.2}>
          <motion.button
            onClick={handleWhatsAppRSVP}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="inline-flex items-center justify-center gap-4 px-9 py-5 rounded-[var(--radius-pill)] bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-colors shadow-lg shadow-green-500/30 text-lg"
          >
            <motion.span
              animate={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircle size={26} />
            </motion.span>
            RSVP via WhatsApp
          </motion.button>
        </Reveal>
      </div>
    </section>
  );
}
