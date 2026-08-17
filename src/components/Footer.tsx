import React from 'react';
import { Heart } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-16 px-4 bg-gradient-to-b from-pearl-dark to-pearl-ivory text-center overflow-hidden border-t border-warm-gold/10">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blush-soft/40 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        
        {/* Botanical Ornament */}
        <div className="mb-6 text-sage/60">
          <svg className="w-10 h-10 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15C50 15 53 30 65 35C53 40 50 55 50 55C50 55 47 40 35 35C47 30 50 15 50 15Z" fill="currentColor" opacity="0.4" />
            <path d="M50 5C50 5 51 10 55 12C51 14 50 19 50 19C50 19 49 14 45 12C49 10 50 5 50 5Z" fill="currentColor" opacity="0.3" />
            <circle cx="50" cy="75" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="50" cy="85" r="1.5" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Closing text */}
        <p className="font-serif text-sm tracking-wider text-deep-olive/60 uppercase mb-2">
          With Love &amp; Gratitude
        </p>
        
        <h3 className="font-cinzel text-xl md:text-2xl font-semibold text-botanical-green tracking-wide mb-6">
          {weddingData.groomName} &amp; {weddingData.brideName}
        </h3>

        {/* Heart Divider */}
        <div className="flex items-center gap-2 mb-6 text-dusty-rose">
          <div className="h-[1px] w-8 bg-warm-gold/20" />
          <Heart className="w-3 h-3 fill-dusty-rose/20" />
          <div className="h-[1px] w-8 bg-warm-gold/20" />
        </div>

        {/* Date */}
        <div className="font-cinzel text-sm tracking-[0.25em] text-warm-gold-dark font-bold mb-4">
          10 · 09 · 2026
        </div>

        {/* Copyright / Credit info */}
        <p className="text-[10px] tracking-[0.1em] text-deep-olive/40 uppercase mt-4">
          &copy; {new Date().getFullYear()} &bull; Created with love for Fardeen &amp; Shagufa
        </p>

      </div>
    </footer>
  );
};

export default Footer;
