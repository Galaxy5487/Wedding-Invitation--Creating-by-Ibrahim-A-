import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

export const LoveStorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-24 md:py-32 px-4 bg-pearl-ivory overflow-hidden">
      {/* Background Soft Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blush-soft/20 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">Our Story</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            Two Hearts, One Beautiful Journey
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-warm-gold">
            <div className="h-[1px] w-12 bg-warm-gold/30" />
            <Sparkles className="w-4 h-4 text-warm-gold/80" />
            <div className="h-[1px] w-12 bg-warm-gold/30" />
          </div>
        </div>

        {/* Story Timeline */}
        <div className="relative space-y-12">
          
          {/* Vertical timeline connector */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-warm-gold/10 via-warm-gold/30 to-warm-gold/10 md:-translate-x-1/2" />

          {weddingData.story.map((segment, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-pearl-ivory border border-warm-gold flex items-center justify-center shadow-sm z-20">
                  <Heart className="w-3 h-3 text-dusty-rose fill-dusty-rose/20" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[45%] pl-10 md:pl-0 mt-1 md:mt-0">
                  <div className="relative p-6 md:p-8 rounded-2xl liquid-glass border border-white/60 shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    {/* Period label */}
                    <span className="text-[10px] tracking-[0.25em] uppercase text-warm-gold-dark font-bold">
                      {segment.period}
                    </span>
                    
                    {/* Title */}
                    <h3 className="font-cinzel text-xl font-bold text-botanical-green mt-1 mb-3">
                      {segment.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-deep-olive/80 leading-relaxed font-light">
                      {segment.description}
                    </p>
                  </div>
                </div>

                {/* Image Card (Desktop only) */}
                <div className="w-[45%] hidden md:block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white/85 shadow-md group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-10" />
                    <img
                      src={segment.image}
                      alt={segment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.98]"
                      loading="lazy"
                    />
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

export default LoveStorySection;
