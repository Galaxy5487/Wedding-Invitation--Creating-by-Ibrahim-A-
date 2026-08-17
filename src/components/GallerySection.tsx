import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = ''; // Unlock scrolling
  };

  const navigatePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : weddingData.gallery.length - 1));
  };

  const navigateNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < weddingData.gallery.length - 1 ? prev + 1 : 0));
  };

  // Handle keyboard navigation in Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Handle Swipe Gestures for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe distance (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateNext(); // Swiped left -> next image
      } else {
        navigatePrev(); // Swiped right -> prev image
      }
    }
    setTouchStartX(null);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-pearl-dark to-pearl-ivory overflow-hidden">
      {/* Background Soft Bloom */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blush-soft/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">Our Moments</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            Cinematic Gallery
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-warm-gold">
            <div className="h-[1px] w-12 bg-warm-gold/30" />
            <Camera className="w-4 h-4 text-warm-gold/80" />
            <div className="h-[1px] w-12 bg-warm-gold/30" />
          </div>
        </div>

        {/* Elegant Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {weddingData.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md border-4 border-white/80 liquid-glass-card group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image */}
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.97] group-hover:brightness-100"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-cinzel text-base tracking-wider font-medium">{item.caption}</p>
                  <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase">View Fullscreen</span>
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 touch-none"
              onClick={closeLightbox}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows (Desktop only) */}
              <button
                onClick={navigatePrev}
                className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 hidden md:block cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={navigateNext}
                className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 hidden md:block cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container with Caption */}
              <div 
                className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={weddingData.gallery[lightboxIndex].url}
                  alt={weddingData.gallery[lightboxIndex].caption}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
                
                {/* Lightbox Caption */}
                <div className="mt-4 text-center text-white/90 font-serif text-sm md:text-base tracking-wide">
                  <p className="font-cinzel tracking-wider font-semibold">{weddingData.gallery[lightboxIndex].caption}</p>
                  <p className="text-[10px] md:text-xs text-white/50 tracking-[0.15em] uppercase mt-1">
                    Image {lightboxIndex + 1} of {weddingData.gallery.length} &bull; Swipe to navigate
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GallerySection;
