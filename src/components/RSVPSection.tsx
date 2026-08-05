import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

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
    <section id="rsvp" className="relative py-32 bg-[var(--color-cream)]">
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="section-subtitle">WE'D LOVE TO SEE YOU</p>
          <h2 className="section-title">Kindly Respond</h2>
          <p className="text-[var(--color-ink)]/60 text-lg mt-4 max-w-lg mx-auto">
            Please RSVP through WhatsApp for a personal confirmation and any additional details.
          </p>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={handleWhatsAppRSVP}
            className="inline-flex items-center justify-center gap-4 px-8 py-4 rounded-[var(--radius-royal)] bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20 text-lg"
          >
            <MessageCircle size={24} />
            RSVP via WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}
