import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal, SectionHeading, Blob } from './Decor';
import { useT } from '../context/LanguageContext';

interface CountdownSectionProps {
  weddingDate: string;
  weddingTime: string;
}

export default function CountdownSection({ weddingDate, weddingTime }: CountdownSectionProps) {
  const { t } = useT();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(`${weddingDate}T${weddingTime}:00`);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate, weddingTime]);

  const displayDate = new Date(weddingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="countdown" className="relative py-32 bg-[var(--color-cream)] overflow-hidden">
      {/* Playful pastel blobs (matches rest of site) */}
      <Blob color="var(--color-lilac)" className="w-[32rem] h-[32rem] -top-24 -right-24 opacity-50 floaty" />
      <Blob color="var(--color-blush)" className="w-[28rem] h-[28rem] bottom-8 -left-24 opacity-40 floaty" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <SectionHeading eyebrow={t("countdown.eyebrow")} title={t("countdown.title")} />

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {[
            { value: timeLeft.days, label: 'Days', labelHindi: 'दिन' },
            { value: timeLeft.hours, label: 'Hours', labelHindi: 'घंटे' },
            { value: timeLeft.minutes, label: 'Minutes', labelHindi: 'मिनट' },
            { value: timeLeft.seconds, label: 'Seconds', labelHindi: 'सेकंड' },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, rotate: index % 2 ? 2 : -2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="relative"
              >
                <div className="w-24 h-28 md:w-32 md:h-36 flex flex-col items-center justify-center rounded-[1.5rem] card-royal bg-gradient-to-b from-white to-[var(--color-peach)]">
                  <motion.span
                    key={item.value}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-serif text-4xl md:text-5xl gradient-gold"
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.span>
                  <span className="text-[var(--color-ink)]/60 text-xs md:text-sm mt-1 font-semibold tracking-wider uppercase">{item.label}</span>
                  <span className="text-[var(--color-royal-gold)]/80 text-xs">{item.labelHindi}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Save the Date */}
        <Reveal delay={0.1}>
          <div className="text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white border border-[var(--color-royal-gold)]/30 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--color-royal-red)]" />
              <span className="text-[var(--color-ink)] font-serif text-lg">{displayDate}</span>
              <div className="w-2 h-2 rounded-full bg-[var(--color-royal-red)]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
