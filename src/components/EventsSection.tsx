import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, ChevronDown, Check } from 'lucide-react';
import { weddingData, EventData } from '../lib/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile, CalendarEvent } from '../lib/calendarHelper';

export const EventsSection: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleAddToCalendar = (event: EventData, type: 'google' | 'ics') => {
    // Construct CalendarEvent
    const isAllDay = event.isTimeFlexible || event.time === "After Isha";
    
    const calEvent: CalendarEvent = {
      title: event.calendarTitle,
      description: event.description,
      location: `${event.venueName}, ${event.address}`,
      startDate: isAllDay ? "2026-09-10" : event.calendarStart,
      isAllDay: isAllDay,
    };

    if (!isAllDay && event.calendarStart) {
      const start = new Date(event.calendarStart);
      const end = new Date(start.getTime() + event.calendarDurationHours * 60 * 60 * 1000);
      calEvent.endDate = end.toISOString();
    }

    if (type === 'google') {
      window.open(getGoogleCalendarUrl(calEvent), '_blank');
    } else {
      downloadIcsFile(calEvent);
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <section id="events" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-pearl-ivory to-pearl-dark overflow-hidden">
      {/* Background Blooms */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sage/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-blush-soft/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">The Celebrations</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            Wedding Events
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-warm-gold">
            <div className="h-[1px] w-12 bg-warm-gold/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-warm-gold/60" />
            <div className="h-[1px] w-12 bg-warm-gold/30" />
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="relative flex flex-col gap-16 md:gap-24">
          
          {/* Vertical Timeline Line (Desktop only) */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-warm-gold/10 via-warm-gold/30 to-warm-gold/10 -translate-x-1/2 hidden md:block" />

          {weddingData.events.map((event, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-[45%]">
                  <div className="relative p-8 md:p-10 rounded-3xl liquid-glass border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    {/* Subtle Top Accent Bar */}
                    <div className="absolute top-0 inset-x-8 h-[3px] bg-gradient-to-r from-warm-gold/20 via-dusty-rose to-warm-gold/20 rounded-b-full" />

                    {/* Card Label / Index */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-cinzel text-xs tracking-[0.2em] text-warm-gold-dark font-bold">
                        0{index + 1} — {event.title}
                      </span>
                      <div className="p-2 rounded-full bg-white/50 text-sage-dark border border-white/80">
                        {event.icon === 'nikah' ? (
                          <svg className="w-5 h-5 text-botanical-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.996 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-dusty-rose-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-4 mb-8">
                      {/* Date */}
                      <div className="flex items-center gap-3 text-deep-olive/90 text-sm">
                        <Calendar className="w-4 h-4 text-warm-gold shrink-0" />
                        <span className="font-semibold">{event.date} &bull; {event.day}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center gap-3 text-deep-olive/90 text-sm">
                        <Clock className="w-4 h-4 text-warm-gold shrink-0" />
                        <span className="font-semibold">
                          {event.time}
                          {event.isTimeFlexible && <span className="text-xs font-normal text-deep-olive/60 ml-1.5">(Approximate)</span>}
                        </span>
                      </div>
                      
                      {/* Venue */}
                      <div className="flex items-center gap-3 text-deep-olive/95 text-sm">
                        <MapPin className="w-4 h-4 text-warm-gold shrink-0" />
                        <div>
                          <p className="font-bold text-botanical-green">{event.venueName}</p>
                          <p className="text-xs text-deep-olive/70 font-light mt-0.5">{event.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quote Description */}
                    <p className="font-serif italic text-sm text-deep-olive/80 border-l-2 border-dusty-rose/40 pl-4 py-1 mb-8">
                      "{event.description}"
                    </p>

                    {/* Buttons Row */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Get Directions */}
                      <a
                        href={event.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-botanical-green text-white rounded-full font-medium text-xs tracking-wider shadow-sm hover:bg-sage-dark hover:shadow-md transition-all duration-300 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        GET DIRECTIONS
                      </a>

                      {/* Add to Calendar Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(event.id)}
                          className="flex items-center gap-1.5 px-4 py-2.5 bg-white/70 hover:bg-white text-deep-olive border border-warm-gold/20 rounded-full font-medium text-xs tracking-wider hover:border-warm-gold/40 transition-all duration-300 cursor-pointer"
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-dusty-rose" />
                          ADD TO CALENDAR
                          <ChevronDown className={`w-3 h-3 text-deep-olive/50 transition-transform duration-300 ${activeDropdown === event.id ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === event.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 mt-2 w-48 rounded-2xl liquid-glass-dark border border-white/80 shadow-lg py-2 z-30"
                            >
                              <button
                                onClick={() => handleAddToCalendar(event, 'google')}
                                className="w-full text-left px-4 py-2 text-xs font-medium text-deep-olive hover:bg-blush-soft transition-colors cursor-pointer"
                              >
                                Google Calendar
                              </button>
                              <button
                                onClick={() => handleAddToCalendar(event, 'ics')}
                                className="w-full text-left px-4 py-2 text-xs font-medium text-deep-olive hover:bg-blush-soft transition-colors cursor-pointer"
                              >
                                Download iCal / ICS
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Center Timeline Node (Desktop only) */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-pearl-ivory border-2 border-warm-gold flex items-center justify-center shadow-md z-20 hidden md:flex">
                  <div className="w-4 h-4 rounded-full bg-dusty-rose animate-pulse" />
                </div>

                {/* Empty Spacer Column for layout balancing (Desktop only) */}
                <div className="w-[45%] hidden md:block" />

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default EventsSection;
