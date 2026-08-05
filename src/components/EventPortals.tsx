import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  illustration: string;
}

const events: Event[] = [
  {
    id: 'mehendi',
    name: 'Mehendi',
    date: 'December 18, 2024',
    time: '4:00 PM Onwards',
    venue: 'The Grand Haveli, Jaipur',
    description: 'An evening of traditional henna artistry and folk music',
    illustration: 'mehendi',
  },
  {
    id: 'haldi',
    name: 'Haldi',
    date: 'December 19, 2024',
    time: '10:00 AM',
    venue: 'Royal Gardens, Jaipur',
    description: 'Sacred turmeric ceremony with loved ones',
    illustration: 'haldi',
  },
  {
    id: 'shaadi',
    name: 'Shaadi',
    date: 'December 20, 2024',
    time: '6:00 PM',
    venue: 'Taj Palace, Jaipur',
    description: 'The celestial union of two souls',
    illustration: 'shaadi',
  },
  {
    id: 'reception',
    name: 'Reception',
    date: 'December 21, 2024',
    time: '7:30 PM',
    venue: 'The Grand Ballroom, Jaipur',
    description: 'A night of celebration, dance, and feast',
    illustration: 'reception',
  },
];

export default function EventPortals() {
  return (
    <section id="events" className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/uploads/wed-img-try.jpg')" }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a5c]/80 via-[#0B2135]/85 to-[#0d1f30]/90" />
      
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#B2AC88] tracking-[0.4em] text-sm mb-4 font-sans"
        >
          THE CELESTIAL JOURNEY
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#D4AF37]"
        >
          Wedding Celebrations
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
        />
      </div>

      {/* Event Portals Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <EventPortal event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventPortal({ event }: { event: Event }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Oval Portal Frame */}
      <motion.div
        className="relative w-72 h-96 md:w-80 md:h-[420px]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer Gold Frame */}
        <div className="absolute inset-0 rounded-[50%] border-4 border-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-2 rounded-[50%] border-2 border-[#D4AF37] opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 rounded-[50%] bg-[#D4AF37] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
        
        {/* Inner Content */}
        <div className="absolute inset-4 rounded-[50%] overflow-hidden bg-gradient-to-b from-[#1a3a5c] to-[#0B2135]">
          {/* Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <EventIllustration type={event.illustration} />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135] via-transparent to-transparent" />
        </div>
        
        {/* Event Name on Portal */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0B2135] px-6 py-2 rounded-full border border-[#D4AF37]/50">
          <h3 className="font-serif text-2xl text-[#D4AF37] whitespace-nowrap">{event.name}</h3>
        </div>
      </motion.div>

      {/* Event Details */}
      <div className="mt-12 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-[#B2AC88]">
          <Calendar size={16} />
          <span className="font-sans text-sm tracking-wider">{event.date}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#B2AC88]">
          <Clock size={16} />
          <span className="font-sans text-sm tracking-wider">{event.time}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-[#B2AC88]">
          <MapPin size={16} />
          <span className="font-sans text-sm tracking-wider">{event.venue}</span>
        </div>
        <p className="text-[#7a8a9a] font-sans text-sm mt-4 max-w-xs italic">
          {event.description}
        </p>
      </div>
    </div>
  );
}

function EventIllustration({ type }: { type: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    mehendi: (
      <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-80">
        {/* Hands with Mehendi */}
        <ellipse cx="90" cy="90" rx="70" ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        <path d="M60 100 Q70 70 90 60 Q110 70 120 100 Q110 130 90 140 Q70 130 60 100" fill="none" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="90" cy="90" r="25" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        <circle cx="90" cy="90" r="15" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        <circle cx="90" cy="90" r="5" fill="#D4AF37" opacity="0.5" />
        {/* Decorative dots */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={90 + 35 * Math.cos(angle)}
              cy={90 + 35 * Math.sin(angle)}
              r="2"
              fill="#D4AF37"
              opacity="0.6"
            />
          );
        })}
        <path d="M90 50 L90 40 M90 130 L90 140 M50 90 L40 90 M130 90 L140 90" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>
    ),
    haldi: (
      <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-80">
        {/* Bowl with Haldi */}
        <ellipse cx="90" cy="110" rx="50" ry="20" fill="#B2AC88" opacity="0.3" />
        <ellipse cx="90" cy="100" rx="45" ry="35" fill="#B2AC88" opacity="0.4" />
        <ellipse cx="90" cy="95" rx="40" ry="25" fill="#d4c896" opacity="0.5" />
        {/* Leaves */}
        <path d="M60 70 Q70 50 80 70" fill="none" stroke="#B2AC88" strokeWidth="2" />
        <path d="M100 70 Q110 50 120 70" fill="none" stroke="#B2AC88" strokeWidth="2" />
        <path d="M75 60 Q90 40 105 60" fill="none" stroke="#B2AC88" strokeWidth="1.5" />
        {/* Decorative elements */}
        <circle cx="90" cy="95" r="15" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
        <circle cx="90" cy="95" r="8" fill="#D4AF37" opacity="0.3" />
      </svg>
    ),
    shaadi: (
      <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-80">
        {/* Mandap */}
        <path d="M40 140 L90 60 L140 140" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <path d="M50 140 L90 75 L130 140" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        {/* Pillars */}
        <line x1="50" y1="140" x2="50" y2="160" stroke="#D4AF37" strokeWidth="2" />
        <line x1="130" y1="140" x2="130" y2="160" stroke="#D4AF37" strokeWidth="2" />
        {/* Couple silhouette */}
        <circle cx="80" cy="120" r="8" fill="#D4AF37" opacity="0.6" />
        <path d="M80 128 L80 145" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="100" cy="120" r="8" fill="#D4AF37" opacity="0.6" />
        <path d="M100 128 L100 145" stroke="#D4AF37" strokeWidth="2" />
        {/* Garland */}
        <path d="M72 125 Q90 115 108 125" fill="none" stroke="#B2AC88" strokeWidth="1" />
        {/* Stars around */}
        <circle cx="60" cy="80" r="2" fill="#D4AF37" />
        <circle cx="120" cy="85" r="2" fill="#D4AF37" />
        <circle cx="90" cy="50" r="2" fill="#D4AF37" />
      </svg>
    ),
    reception: (
      <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-80">
        {/* Chandelier */}
        <line x1="90" y1="30" x2="90" y2="50" stroke="#D4AF37" strokeWidth="1" />
        <ellipse cx="90" cy="55" rx="30" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1" />
        <ellipse cx="90" cy="65" rx="40" ry="12" fill="none" stroke="#D4AF37" strokeWidth="1" />
        {/* Hanging crystals */}
        {[...Array(5)].map((_, i) => (
          <g key={i}>
            <line
              x1={60 + i * 15}
              y1="77"
              x2={60 + i * 15}
              y2="90"
              stroke="#D4AF37"
              strokeWidth="0.5"
            />
            <polygon
              points={`${55 + i * 15},90 ${60 + i * 15},100 ${65 + i * 15},90`}
              fill="#D4AF37"
              opacity="0.5"
            />
          </g>
        ))}
        {/* Dance floor */}
        <ellipse cx="90" cy="140" rx="60" ry="20" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="90" cy="140" rx="40" ry="12" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
      </svg>
    ),
  };

  return illustrations[type] || null;
}
