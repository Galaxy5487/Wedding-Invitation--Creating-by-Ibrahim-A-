import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Heart, MailOpen } from 'lucide-react';
import { weddingData } from '../lib/weddingData';
import { ambientSynth } from '../lib/audioSynth';

interface HeroProps {
  onOpenInvitation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInvitation }) => {
  const handleOpenClick = () => {
    // Play the beautiful synth music
    ambientSynth.start();
    // Call the parent handler to scroll or unlock
    onOpenInvitation();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-pearl-ivory px-4 py-12">
      {/* Background Image with elegant soft cover overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 opacity-25 filter blur-[2px]"
        style={{ backgroundImage: `url(${weddingData.gallery[2].url})` }}
      />
      
      {/* Soft color blooms for a dreamy botanical feel */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blush-medium/40 rounded-full filter blur-[100px] animate-bloom-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage/20 rounded-full filter blur-[100px] animate-bloom-pulse" style={{ animationDelay: '2s' }} />

      {/* Elegant Botanical Line Art Frame Overlay */}
      <div className="absolute inset-4 md:inset-8 border border-warm-gold/20 rounded-2xl pointer-events-none z-10">
        <div className="absolute inset-1 border border-warm-gold/10 rounded-2xl" />
        
        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-warm-gold/30 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-warm-gold/30 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-warm-gold/30 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-warm-gold/30 rounded-br-lg" />
      </div>

      {/* Main Content Card - Liquid Glass */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-2xl w-full text-center p-8 md:p-12 rounded-3xl liquid-glass-dark border border-white/80 shadow-xl flex flex-col items-center"
      >
        {/* Small header ornament */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 flex items-center gap-2 text-warm-gold"
        >
          <div className="h-[1px] w-8 bg-warm-gold/30" />
          <Heart className="w-4 h-4 fill-warm-gold/20" />
          <div className="h-[1px] w-8 bg-warm-gold/30" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-deep-olive/80 mb-6"
        >
          Together with our families
        </motion.p>

        {/* Groom & Bride Names - Cinematic Serif */}
        <div className="flex flex-col gap-1 md:gap-3 mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-botanical-green"
          >
            {weddingData.groomName.toUpperCase()}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-serif italic text-2xl md:text-3xl text-dusty-rose-dark my-1"
          >
            &amp;
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-botanical-green"
          >
            {weddingData.brideName.toUpperCase()}
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-serif text-sm sm:text-base md:text-lg italic text-deep-olive/90 max-w-lg mb-8 leading-relaxed"
        >
          "request the pleasure of your presence at the celebration of their Nikah"
        </motion.p>

        {/* Date & Day */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 border-t border-b border-warm-gold/20 py-4 px-8 mb-10 w-fit"
        >
          <div className="font-cinzel text-xl sm:text-2xl tracking-[0.2em] text-warm-gold-dark font-semibold">
            10 · 09 · 2026
          </div>
          <div className="text-xs sm:text-sm tracking-[0.3em] uppercase text-deep-olive/70 font-medium">
            {weddingData.weddingDay}
          </div>
        </motion.div>

        {/* Interactive Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center"
        >
          <button
            onClick={handleOpenClick}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-botanical-green text-white rounded-full font-medium text-sm tracking-wider shadow-md hover:bg-sage-dark hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <MailOpen className="w-4 h-4" />
            OPEN INVITATION
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById('bismillah');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-white/50 text-deep-olive border border-warm-gold/20 rounded-full font-medium text-sm tracking-wider hover:bg-white/80 hover:border-warm-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            SCROLL TO DISCOVER
            <ChevronDown className="w-4 h-4 text-dusty-rose" />
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle bottom scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-deep-olive/50 text-xs tracking-[0.2em] uppercase"
      >
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
