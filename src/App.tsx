import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingData as initialWeddingData, WeddingConfig } from './lib/weddingData';
import CustomCursor from './components/CustomCursor';
import FloatingPetals from './components/FloatingPetals';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import BismillahSection from './components/BismillahSection';
import CoupleSection from './components/CoupleSection';
import CountdownSection from './components/CountdownSection';
import EventsSection from './components/EventsSection';
import LocationSection from './components/LocationSection';
import RSVPSection from './components/RSVPSection';
import ShareSection from './components/ShareSection';
import Footer from './components/Footer';

export const App: React.FC = () => {
  // Centralized configuration state
  const [config, setConfig] = useState<WeddingConfig>(initialWeddingData);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    // Smooth scroll down to the main invitation body
    setTimeout(() => {
      const bismillahEl = document.getElementById('bismillah');
      bismillahEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-pearl-ivory text-deep-olive selection:bg-blush-medium selection:text-deep-olive overflow-x-hidden">
      
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Petals and Leaves */}
      <FloatingPetals />

      {/* Ambient Music Player */}
      <MusicPlayer />

      {/* Cinematic Fullscreen Hero Opening */}
      <Hero onOpenInvitation={handleOpenInvitation} />

      {/* Main Invitation Content - Animates in smoothly once unlocked/scrolled */}
      <div className="relative">
        {/* Navigation hidden per request */}

        {/* Opening Bismillah & Blessings */}
        <BismillahSection />

        {/* The Bride & Groom Bios */}
        <CoupleSection />

        {/* Live Countdown Timer */}
        <CountdownSection />

        {/* Event Timeline (Nikah & Walima) */}
        <EventsSection />

        {/* Interactive Google Venue Maps */}
        <LocationSection />

        {/* RSVP Interactive Form */}
        <RSVPSection />

        {/* Share Invitation & QR Code */}
        <ShareSection />

        {/* Footer with Love & Gratitude */}
        <Footer />
      </div>

    </div>
  );
};

export default App;
