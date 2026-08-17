import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

export const CoupleSection: React.FC = () => {
  return (
    <section id="couple" className="relative py-24 md:py-32 px-4 bg-pearl-ivory overflow-hidden">
      {/* Soft ambient light */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blush-soft/50 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-sage/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">Introducing the Couple</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            The Bride &amp; Groom
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-warm-gold">
            <div className="h-[1px] w-12 bg-warm-gold/30" />
            <Heart className="w-4 h-4 fill-warm-gold/10" />
            <div className="h-[1px] w-12 bg-warm-gold/30" />
          </div>
        </div>

        {/* Couple Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-3xl liquid-glass border border-white/60 shadow-lg group hover:shadow-xl transition-all duration-500"
          >
            {/* Groom Avatar Frame */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full p-1.5 bg-gradient-to-tr from-warm-gold/60 via-dusty-rose/40 to-warm-gold/60 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-pearl-ivory shadow-inner relative">
                  <img
                    src="/images/groom_avatar.png"
                    alt="Groom Mohammed Fardeen Avatar"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Avatar Label Badge */}
              <span className="mt-3 px-4 py-1 rounded-full bg-botanical-green/90 text-pearl-ivory font-cinzel text-xs tracking-widest uppercase shadow-sm border border-warm-gold/30">
                THE GROOM
              </span>
            </div>

            {/* Groom Details */}
            <div className="flex flex-col text-center md:text-left">
              <h3 className="font-cinzel text-2xl font-bold text-botanical-green tracking-wide">
                {weddingData.groomName}
              </h3>
              <span className="text-xs uppercase tracking-[0.2em] text-warm-gold-dark font-semibold mt-1 mb-4">

              </span>
              <p className="text-sm text-deep-olive/80 leading-relaxed font-sans font-light">
                {weddingData.groomBio}
              </p>
              {/* Small decorative branch */}
              <div className="mt-6 text-sage/40 self-center md:self-start">
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 80C30 80 50 70 60 50C70 30 90 20 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M60 50C50 45 40 45 35 50C30 55 35 60 45 55C55 50 60 50 60 50Z" fill="currentColor" opacity="0.4" />
                  <path d="M40 65C35 60 30 60 25 65C20 70 25 75 35 70C45 65 40 65 40 65Z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row-reverse items-center gap-8 p-6 md:p-8 rounded-3xl liquid-glass border border-white/60 shadow-lg group hover:shadow-xl transition-all duration-500"
          >
            {/* Bride Avatar Frame */}
            <div className="relative shrink-0 flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full p-1.5 bg-gradient-to-tr from-warm-gold/60 via-dusty-rose/40 to-warm-gold/60 shadow-xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-pearl-ivory shadow-inner relative">
                  <img
                    src="/images/bride_avatar.png"
                    alt="Bride Shagufa Anjum Avatar"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Avatar Label Badge */}
              <span className="mt-3 px-4 py-1 rounded-full bg-botanical-green/90 text-pearl-ivory font-cinzel text-xs tracking-widest uppercase shadow-sm border border-warm-gold/30">
                THE BRIDE
              </span>
            </div>

            {/* Bride Details */}
            <div className="flex flex-col text-center md:text-right">
              <h3 className="font-cinzel text-2xl font-bold text-botanical-green tracking-wide">
                {weddingData.brideName}
              </h3>
              <span className="text-xs uppercase tracking-[0.2em] text-warm-gold-dark font-semibold mt-1 mb-4">

              </span>
              <p className="text-sm text-deep-olive/80 leading-relaxed font-sans font-light">
                {weddingData.brideBio}
              </p>
              {/* Small decorative branch */}
              <div className="mt-6 text-sage/40 self-center md:self-end">
                <svg className="w-8 h-8 scale-x-[-1]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 80C30 80 50 70 60 50C70 30 90 20 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M60 50C50 45 40 45 35 50C30 55 35 60 45 55C55 50 60 50 60 50Z" fill="currentColor" opacity="0.4" />
                  <path d="M40 65C35 60 30 60 25 65C20 70 25 75 35 70C45 65 40 65 40 65Z" fill="currentColor" opacity="0.4" />
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
