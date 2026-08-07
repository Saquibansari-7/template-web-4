import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { WeddingData, EventData } from '../App';
import { Reveal, SectionHeading, Blob, WavyDivider } from './Decor';

const pastels = [
  'var(--color-blush)',
  'var(--color-sage)',
  'var(--color-peach)',
  'var(--color-lilac)',
  'var(--color-sky)',
];

export default function EventsSection({ weddingData }: { weddingData: WeddingData }) {
  const events = (weddingData.events || []).filter((event) => event.visible !== false);

  if (events.length === 0) return null;

  return (
    <section id="events" className="relative py-32 bg-[var(--color-cream)] overflow-hidden">
      {/* Decorative blobs */}
      <Blob color="var(--color-lilac)" className="w-[30rem] h-[30rem] -top-20 -right-24 opacity-50 floaty" />
      <Blob color="var(--color-sage)" className="w-[26rem] h-[26rem] bottom-10 -left-24 opacity-40 floaty" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="THE CELEBRATIONS" title="Event Schedule" />

        {/* Events list */}
        <div className="space-y-10">
          {events.map((event, index) => (
            <Reveal key={event.id} delay={index * 0.08}>
              <EventCard event={event} isMain={event.id === 'shaadi'} pastel={pastels[index % pastels.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, isMain, pastel }: { event: EventData; isMain: boolean; pastel: string }) {
  return (
    <div
      className={`card-royal overflow-hidden p-6 md:p-10 relative ${
        isMain ? 'ring-2 ring-[var(--color-royal-red)]/30 ring-offset-4 ring-offset-[var(--color-cream)]' : ''
      }`}
      style={{ background: `linear-gradient(150deg, #ffffff 55%, ${pastel})` }}
    >
      {/* Little decorative flourish */}
      <div className="absolute top-4 right-4 opacity-30 floaty" aria-hidden>
        <WavyDivider className="w-20 h-5" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-8">
        {/* Icon & Name */}
        <div className="flex-shrink-0 flex items-center md:flex-col gap-4 text-center md:w-36">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className={`w-24 h-24 md:w-28 md:h-28 rounded-[2rem] flex items-center justify-center text-base font-serif shadow-inner border-2 ${
              isMain
                ? 'bg-[var(--color-royal-red)] text-white border-[var(--color-royal-gold)]'
                : 'bg-white text-[var(--color-royal-red)] border-[var(--color-royal-gold)]/50'
            }`}
            style={{ boxShadow: isMain ? '0 14px 30px -10px rgba(212,33,17,0.5)' : undefined }}
          >
            {event.name}
          </motion.div>
          <div className="text-left md:text-center">
            <span className="text-[var(--color-royal-gold)] font-serif text-lg md:block">{event.nameHindi}</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-[var(--color-ink)]/70 text-base mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-[var(--color-royal-gold)]">
                  <span className="w-9 h-9 rounded-full bg-[var(--color-royal-gold)]/15 flex items-center justify-center">
                    <Calendar size={18} />
                  </span>
                  <span className="font-semibold text-sm md:text-base uppercase tracking-wider text-[var(--color-ink)]/70">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-royal-gold)]">
                  <span className="w-9 h-9 rounded-full bg-[var(--color-royal-gold)]/15 flex items-center justify-center">
                    <Clock size={18} />
                  </span>
                  <span className="font-semibold text-sm md:text-base uppercase tracking-wider text-[var(--color-ink)]/70">{event.time}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between items-start lg:items-end gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[var(--color-surface-low)] lg:pl-10">
              <div className="flex items-start gap-3 text-[var(--color-ink)] group cursor-default">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-[var(--color-royal-red)]" />
                <div>
                  <p className="font-serif text-xl group-hover:text-[var(--color-royal-red)] transition-colors">{event.venue}</p>
                  <p className="text-sm text-[var(--color-ink)]/50 uppercase tracking-widest mt-1">{event.address}</p>
                </div>
              </div>

              <motion.a
                href={event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline-royal flex items-center gap-3 py-3 px-6 text-sm"
              >
                <ExternalLink size={16} />
                Get Directions
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
