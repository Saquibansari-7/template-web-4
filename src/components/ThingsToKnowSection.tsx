import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { CloudSun, Shirt, Hotel, Phone, Car, Gift } from 'lucide-react';
import { InfoItem } from '../App';
import { Reveal, SectionHeading, Blob, WavyDivider } from './Decor';
import { useT } from '../context/LanguageContext';

const icons = [<CloudSun />, <Shirt />, <Hotel />, <Phone />, <Car />, <Gift />];
const iconByName: Record<string, ReactNode> = {
  Weather: <CloudSun />,
  'Dress Code': <Shirt />,
  Accommodation: <Hotel />,
  Contact: <Phone />,
  Transportation: <Car />,
  Gifts: <Gift />,
};
const chipColors = [
  'var(--color-blush)',
  'var(--color-sage)',
  'var(--color-peach)',
  'var(--color-lilac)',
  'var(--color-sky)',
  'var(--color-rose)',
];

interface ThingsToKnowSectionProps {
  thingsToKnow: InfoItem[];
}

export default function ThingsToKnowSection({ thingsToKnow }: ThingsToKnowSectionProps) {
  const { t } = useT();
  return (
    <section id="info" className="relative py-32 bg-[var(--color-cream)] overflow-hidden">
      <Blob color="var(--color-sky)" className="w-[30rem] h-[30rem] -top-16 -left-24 opacity-40 floaty" />
      <Blob color="var(--color-blush)" className="w-[28rem] h-[28rem] bottom-16 -right-24 opacity-40 floaty" style={{ animationDelay: '2.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading eyebrow={t("info.eyebrow")} title={t("info.title")} />

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {thingsToKnow.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -10, rotate: index % 2 ? 0.6 : -0.6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="card-royal p-8 h-full"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[var(--color-royal-red)] mb-6 shadow-sm border border-[var(--color-royal-gold)]/30"
                  style={{ background: chipColors[index % chipColors.length] }}
                >
                  <span className="w-7 h-7">{iconByName[item.title] ?? icons[index % icons.length]}</span>
                </motion.div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-[var(--color-ink)] mb-3">{item.title}</h3>
                <p className="text-[var(--color-ink)]/60 text-sm leading-relaxed whitespace-pre-line font-medium">{item.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Sacred Mantra */}
        <Reveal delay={0.1}>
          <div className="mt-24 text-center max-w-3xl mx-auto">
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
                <div className="w-44 mx-auto my-6">
                  <WavyDivider />
                </div>
                <p className="text-[var(--color-ink)]/50 text-base md:text-lg italic font-serif leading-relaxed">
                  "May we be protected together, may we be nourished together,<br /> may we work together with great energy."
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
