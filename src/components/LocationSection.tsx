import React from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, MapPin } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-24 md:py-32 px-4 bg-pearl-ivory overflow-hidden">
      {/* Background Soft Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blush-soft/30 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">The Venues</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            How to Get There
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-warm-gold">
            <div className="h-[1px] w-12 bg-warm-gold/30" />
            <MapPin className="w-4 h-4 fill-warm-gold/10" />
            <div className="h-[1px] w-12 bg-warm-gold/30" />
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">

          {weddingData.events.map((venue, index) => {
            // Encode address for embed map iframe
            const embedQuery = encodeURIComponent(`${venue.venueName}, ${venue.address}`);
            const embedUrl = `https://maps.google.com/maps?q=${embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

            return (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col rounded-3xl liquid-glass border border-white/60 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Embedded Interactive Map Preview */}
                <div className="w-full h-64 md:h-80 relative bg-pearl-dark overflow-hidden border-b border-white/40">
                  <iframe
                    title={`Map preview for ${venue.venueName}`}
                    width="100%"
                    height="100%"
                    className="border-0 opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    allowFullScreen
                    src={embedUrl}
                  />
                  {/* Subtle glass overlay tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full liquid-glass text-[10px] font-bold tracking-wider text-botanical-green border border-white/80">
                    EVENT 0{index + 1}
                  </div>
                </div>

                {/* Venue Details */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-cinzel text-xl md:text-2xl font-bold text-botanical-green mb-2 tracking-wide">
                      {venue.venueName}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-warm-gold-dark font-bold mb-4">
                      {venue.title} VENUE
                    </p>
                    <p className="text-sm text-deep-olive/80 leading-relaxed mb-6 font-light">
                      {venue.address}
                    </p>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex flex-wrap items-center gap-4 border-t border-warm-gold/10 pt-6">
                    <a
                      href={venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 bg-botanical-green text-white rounded-full font-medium text-xs tracking-wider shadow-sm hover:bg-sage-dark hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      GET DIRECTIONS
                    </a>

                    <a
                      href={venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 bg-white/70 hover:bg-white text-deep-olive border border-warm-gold/20 rounded-full font-medium text-xs tracking-wider hover:border-warm-gold/40 transition-all duration-300 cursor-pointer"
                    >
                      <Map className="w-3.5 h-3.5 text-dusty-rose" />
                      VIEW ON MAP
                    </a>
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default LocationSection;
