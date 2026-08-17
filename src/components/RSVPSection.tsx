import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send, Sparkles, Users, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RSVPSection: React.FC = () => {
  const [attendance, setAttendance] = useState<'accept' | 'decline' | null>(null);
  const [name, setName] = useState('');
  const [guests, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAttendanceChange = (status: 'accept' | 'decline') => {
    setAttendance(status);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attendance) {
      setError("Please select whether you will attend.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate backend submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger gorgeous luxury confetti celebration if they accept!
    if (attendance === 'accept') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        // Gold and rose-colored confetti
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#c5a86a', '#c89d9c', '#f5e6e3', '#4d5d3b'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#c5a86a', '#c89d9c', '#f5e6e3', '#4d5d3b'],
        });
      }, 250);
    }
  };

  return (
    <section id="rsvp" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-pearl-ivory to-pearl-dark overflow-hidden">
      {/* Background Soft Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blush-soft/30 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-dusty-rose-dark font-semibold">RSVP</span>
          <h2 className="font-cinzel text-3xl md:text-5xl font-medium text-botanical-green mt-2 tracking-wide">
            Will You Join Us?
          </h2>
          <div className="h-[1px] w-16 bg-warm-gold/30 mx-auto mt-4" />
        </div>

        {/* RSVP Card Container - Liquid Glass */}
        <div className="relative p-8 md:p-12 rounded-3xl liquid-glass-dark border border-white/80 shadow-xl overflow-hidden">
          
          {/* Subtle floral pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              /* RSVP FORM */
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative z-10 space-y-8"
              >
                {/* Attendance Buttons */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-[0.2em] text-deep-olive/70 font-semibold text-center mb-4">
                    Kindly respond by September 1st, 2026
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* JOYFULLY ACCEPT */}
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange('accept')}
                      className={`relative py-4 px-6 rounded-2xl border font-cinzel text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        attendance === 'accept'
                          ? 'bg-botanical-green text-white border-botanical-green shadow-md scale-[1.02]'
                          : 'bg-white/40 text-botanical-green border-warm-gold/20 hover:bg-white/60 hover:border-warm-gold/40'
                      }`}
                    >
                      {attendance === 'accept' && <Check className="w-4 h-4" />}
                      JOYFULLY ACCEPT
                    </button>

                    {/* REGRETFULLY DECLINE */}
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange('decline')}
                      className={`relative py-4 px-6 rounded-2xl border font-cinzel text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        attendance === 'decline'
                          ? 'bg-dusty-rose-dark text-white border-dusty-rose-dark shadow-md scale-[1.02]'
                          : 'bg-white/40 text-dusty-rose-dark border-warm-gold/20 hover:bg-white/60 hover:border-warm-gold/40'
                      }`}
                    >
                      {attendance === 'decline' && <Check className="w-4 h-4" />}
                      REGRETFULLY DECLINE
                    </button>
                  </div>
                </div>

                {/* Form Fields - slide down when attendance is selected */}
                <AnimatePresence>
                  {attendance && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 overflow-hidden pt-2"
                    >
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label htmlFor="rsvp-name" className="block text-xs font-semibold uppercase tracking-wider text-deep-olive/80">
                          Your Full Name
                        </label>
                        <input
                          id="rsvp-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Salim &amp; Family"
                          className="w-full px-4 py-3 rounded-xl bg-white/50 border border-warm-gold/20 focus:border-botanical-green focus:bg-white outline-none text-sm text-deep-olive transition-all duration-300"
                        />
                      </div>

                      {/* Guest Count (Only visible if accepting) */}
                      {attendance === 'accept' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-1.5"
                        >
                          <label htmlFor="rsvp-guests" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-deep-olive/80">
                            <Users className="w-3.5 h-3.5 text-warm-gold" />
                            Number of Guests
                          </label>
                          <select
                            id="rsvp-guests"
                            value={guests}
                            onChange={(e) => setGuestCount(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-warm-gold/20 focus:border-botanical-green focus:bg-white outline-none text-sm text-deep-olive transition-all duration-300"
                          >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}

                      {/* Optional Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="rsvp-message" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-deep-olive/80">
                          <MessageSquare className="w-3.5 h-3.5 text-warm-gold" />
                          Wishes / Message (Optional)
                        </label>
                        <textarea
                          id="rsvp-message"
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Send your warm wishes or special notes..."
                          className="w-full px-4 py-3 rounded-xl bg-white/50 border border-warm-gold/20 focus:border-botanical-green focus:bg-white outline-none text-sm text-deep-olive transition-all duration-300 resize-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-100"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !attendance}
                  className={`w-full py-4 px-6 bg-botanical-green text-white rounded-xl font-cinzel text-xs font-bold tracking-widest hover:bg-sage-dark hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    !attendance ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SUBMIT RESPONSE
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* SUCCESS STATE */
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-botanical-green/10 rounded-full flex items-center justify-center text-botanical-green mb-6 border border-botanical-green/20">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                
                <h3 className="font-cinzel text-2xl font-bold text-botanical-green mb-3">
                  Thank You, {name}!
                </h3>
                
                <p className="font-serif text-base text-deep-olive/90 italic max-w-md mb-8 leading-relaxed">
                  {attendance === 'accept'
                    ? `"Your response has been lovingly received. We are overjoyed and look forward to celebrating with you!"`
                    : `"Thank you for letting us know. Your prayers and warm wishes are deeply appreciated."`}
                </p>

                {/* Reset Button (allows modifying RSVP) */}
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setAttendance(null);
                    setName('');
                    setGuestCount('1');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-white/70 hover:bg-white text-deep-olive border border-warm-gold/20 rounded-full font-medium text-xs tracking-wider hover:border-warm-gold/40 transition-all duration-300 cursor-pointer"
                >
                  Change Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default RSVPSection;
