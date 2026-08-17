import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
  rotation: string;
  type: 'blush' | 'rose' | 'leaf';
}

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 12 : 28; // Limit count on mobile for performance

    const generatedPetals: Petal[] = Array.from({ length: petalCount }).map((_, i) => {
      const types: ('blush' | 'rose' | 'leaf')[] = ['blush', 'rose', 'leaf'];
      const type = types[Math.floor(Math.random() * (isMobile ? 2 : 3))]; // less leaves on mobile

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * -15}s`, // Negative delay so they are already falling on mount
        duration: `${10 + Math.random() * 15}s`,
        size: `${8 + Math.random() * 12}px`,
        opacity: 0.3 + Math.random() * 0.4,
        rotation: `${Math.random() * 360}deg`,
        type,
      };
    });

    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => {
        let fill = 'var(--color-blush-medium)';
        let borderRadius = '50% 0 50% 50%'; // Rose petal shape
        
        if (petal.type === 'rose') {
          fill = 'var(--color-dusty-rose)';
          borderRadius = '50% 0 50% 50%';
        } else if (petal.type === 'leaf') {
          fill = 'var(--color-sage)';
          borderRadius = '100% 0 100% 0'; // Leaf shape
        }

        return (
          <div
            key={petal.id}
            className="absolute animate-petal-fall"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size,
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation})`,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: fill,
                borderRadius: borderRadius,
                transform: 'rotate(45deg)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FloatingPetals;
