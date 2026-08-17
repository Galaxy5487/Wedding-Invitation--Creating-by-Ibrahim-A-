import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../lib/weddingData';

export const BismillahSection: React.FC = () => {
  return (
    <section 
      id="bismillah" 
      className="relative py-20 md:py-28 px-4 bg-gradient-to-b from-pearl-ivory to-pearl-dark flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Soft Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blush-soft rounded-full filter blur-[80px] opacity-60 pointer-events-none" />

      {/* Decorative botanical line art background (faded) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-96 h-96 text-botanical-green">
          <path d="M50,10 C60,30 80,40 50,90 C20,40 40,30 50,10 Z" fill="currentColor" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl w-full text-center px-6 flex flex-col items-center"
      >
        {/* Arabic Calligraphy Style Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-warm-gold-dark tracking-wide mb-8 font-semibold"
          dir="rtl"
        >
          {weddingData.bismillahText}
        </motion.div>

        {/* Elegant divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-warm-gold/40" />
          <div className="w-2 h-2 rounded-full border border-warm-gold/60 bg-transparent rotate-45" />
          <div className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-warm-gold/40" />
        </div>

        {/* Welcome Quote */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-deep-olive italic leading-relaxed max-w-2xl text-center"
        >
          "{weddingData.welcomeQuote}"
        </motion.p>

        {/* Botanical ornament bottom */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 flex justify-center text-sage"
        >
          <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20C50 20 53 35 65 40C53 45 50 60 50 60C50 60 47 45 35 40C47 35 50 20 50 20Z" fill="currentColor" opacity="0.4" />
            <path d="M50 10V90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BismillahSection;
