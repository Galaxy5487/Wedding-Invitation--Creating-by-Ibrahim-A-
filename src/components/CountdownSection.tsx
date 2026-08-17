import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { weddingData } from '../lib/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.weddingDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeItems = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-20 px-4 bg-gradient-to-b from-pearl-dark to-pearl-ivory overflow-hidden">
      {/* Soft color blooms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-blush-soft/40 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Decorative Title */}
        <div className="mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-sage-dark font-semibold">The Countdown</span>
          <h2 className="font-cinzel text-2xl md:text-4xl font-medium text-botanical-green mt-1 tracking-wide">
            Counting Down to Forever
          </h2>
          <div className="h-[1px] w-16 bg-warm-gold/30 mx-auto mt-4" />
        </div>

        {timeLeft.isCompleted ? (
          /* Marriage Day Welcome Message */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block p-8 md:p-12 rounded-3xl liquid-glass border border-white/80 shadow-lg max-w-2xl"
          >
            <div className="flex justify-center mb-4 text-warm-gold">
              <Clock className="w-10 h-10 animate-pulse" />
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-botanical-green mb-3">
              Today is the day!
            </h3>
            <p className="font-serif text-base sm:text-lg text-deep-olive/90 italic">
              "Welcome to our celebration. Your presence and prayers are our greatest blessings."
            </p>
          </motion.div>
        ) : (
          /* Live Countdown Timer Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {timeItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl liquid-glass border border-white/60 shadow-md group hover:scale-[1.03] transition-all duration-300"
              >
                {/* Subtle gold inner border on hover */}
                <div className="absolute inset-2 border border-transparent group-hover:border-warm-gold/10 rounded-xl transition-all duration-300" />
                
                <span className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-semibold text-botanical-green tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs tracking-[0.2em] text-dusty-rose-dark font-bold mt-2">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Date Details Footer */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-deep-olive/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-warm-gold" />
            <span className="font-medium">10 September 2026 — Thursday</span>
          </div>
          <div className="hidden sm:block text-warm-gold/30">|</div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warm-gold" />
            <span className="font-medium">Asar Nikah 5:00 PM &amp; Walima After Isha</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CountdownSection;
