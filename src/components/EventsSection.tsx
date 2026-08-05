import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { WeddingData, EventData } from '../App';

export default function EventsSection({ weddingData }: { weddingData: WeddingData }) {
  const events = weddingData.events || [];

  if (events.length === 0) return null;

  return (
    <section id="events" className="relative py-32 bg-[var(--color-cream)]">
      {/* Decorative filigree at section start */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-12 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-royal-gold) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="section-subtitle">THE CELEBRATIONS</p>
          <h2 className="section-title">Event Schedule</h2>
          <div className="w-16 h-px bg-[var(--color-royal-gold)] mx-auto mt-6 opacity-30" />
        </motion.div>

        {/* Events Grid */}
        <div className="space-y-10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard event={event} isMain={event.id === 'shaadi'} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, isMain }: { event: EventData; isMain: boolean }) {
  return (
    <div
      className={`card-royal overflow-hidden p-6 md:p-10 ${isMain ? 'ring-2 ring-[var(--color-royal-red)]/10 ring-offset-4 ring-offset-[var(--color-cream)]' : ''
        }`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-8">
        {/* Icon & Name */}
        <div className="flex-shrink-0 flex items-center md:flex-col gap-4 text-center md:w-32">
          <div className={`w-25 h-25 rounded-full flex items-center justify-center text-lg font-serif shadow-inner ${isMain ? 'bg-[var(--color-royal-red)] text-white' : 'bg-[var(--color-surface-low)] text-[var(--color-royal-red)]'
            }`}>
            {event.name}
          </div>
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
                  <Calendar size={18} />
                  <span className="font-medium text-sm md:text-base uppercase tracking-wider">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-royal-gold)]">
                  <Clock size={18} />
                  <span className="font-medium text-sm md:text-base uppercase tracking-wider">{event.time}</span>
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
