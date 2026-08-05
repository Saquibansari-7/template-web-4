import { motion } from 'framer-motion';
import { CloudSun, Shirt, Hotel, Phone, Car, Gift } from 'lucide-react';
import { InfoItem } from '../App';

const icons = [<CloudSun />, <Shirt />, <Hotel />, <Phone />, <Car />, <Gift />];

interface ThingsToKnowSectionProps {
  thingsToKnow: InfoItem[];
}

export default function ThingsToKnowSection({ thingsToKnow }: ThingsToKnowSectionProps) {
  return (
    <section id="info" className="relative py-32 bg-[var(--color-cream)]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="section-subtitle">GUEST INFORMATION</p>
          <h2 className="section-title">Helpful Details</h2>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {thingsToKnow.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="card-royal p-8"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-royal-red)]/5 flex items-center justify-center text-[var(--color-royal-red)] mb-6 shadow-sm border border-[var(--color-royal-red)]/10">
                {item.icon ? (
                  <span className="text-2xl">{item.icon}</span>
                ) : (
                  icons[index]
                )}
              </div>

              {/* Content */}
              <h3 className="font-serif text-2xl text-[var(--color-ink)] mb-3">{item.title}</h3>
              <p className="text-[var(--color-ink)]/60 text-sm leading-relaxed whitespace-pre-line font-medium">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Sacred Mantra */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="relative p-12 card-royal bg-[var(--color-surface-high)] overflow-hidden">
             {/* Decorative Corner Ornaments */}
             <div className="absolute top-0 left-0 w-20 h-20 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-royal-red)]">
                  <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="currentColor" />
                </svg>
             </div>
             <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 rotate-180">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--color-royal-red)]">
                  <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="currentColor" />
                </svg>
             </div>

            <div className="relative space-y-4">
              <p className="text-[var(--color-royal-red)] text-3xl md:text-4xl font-serif">ॐ सह नाववतु सह नौ भुनक्तु</p>
              <p className="text-[var(--color-royal-red)] text-3xl md:text-4xl font-serif">सह वीर्यं करवावहै</p>
              <div className="w-16 h-[1px] bg-[var(--color-royal-gold)] mx-auto my-8" />
              <p className="text-[var(--color-ink)]/50 text-base md:text-lg italic font-serif leading-relaxed">
                "May we be protected together, may we be nourished together,<br /> may we work together with great energy."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
