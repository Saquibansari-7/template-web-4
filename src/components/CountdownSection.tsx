import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownSectionProps {
  weddingDate: string;
  weddingTime: string;
}

export default function CountdownSection({ weddingDate, weddingTime }: CountdownSectionProps) {
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
    year: 'numeric'
  });

  return (
    <section id="countdown" className="relative py-24 overflow-hidden">
      {/* Glassmorphism */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

      {/* Decorative Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#D4AF37] text-sm tracking-[0.4em] mb-4 font-sans">COUNTING DOWN TO</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Special Day</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </motion.div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {[
            { value: timeLeft.days, label: 'Days', labelHindi: 'दिन' },
            { value: timeLeft.hours, label: 'Hours', labelHindi: 'घंटे' },
            { value: timeLeft.minutes, label: 'Minutes', labelHindi: 'मिनट' },
            { value: timeLeft.seconds, label: 'Seconds', labelHindi: 'सेकंड' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="w-24 h-28 md:w-32 md:h-36 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30">
                <motion.span
                  key={item.value}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-serif text-4xl md:text-5xl text-[#D4AF37]"
                >
                  {item.value.toString().padStart(2, '0')}
                </motion.span>
                <span className="text-white/60 text-xs md:text-sm mt-1">{item.label}</span>
                <span className="text-[#D4AF37]/60 text-xs">{item.labelHindi}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save the Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-[#D4AF37]/30">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-white font-serif text-lg">{displayDate}</span>
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
