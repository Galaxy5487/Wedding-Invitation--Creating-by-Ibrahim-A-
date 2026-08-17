import React, { useState, useEffect } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { ambientSynth } from '../lib/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ambientSynth.getIsPlaying());

  useEffect(() => {
    // Subscribe to state updates from global controller
    const unsubscribe = ambientSynth.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Attempt auto-start on mount
    ambientSynth.start();

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = async () => {
    const newState = await ambientSynth.toggle();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className={`relative p-3.5 rounded-full liquid-glass border border-white/80 shadow-md hover:shadow-lg transition-all duration-300 group flex items-center justify-center cursor-pointer ${
          isPlaying ? 'bg-white/60 scale-105' : 'bg-white/40 hover:bg-white/50'
        }`}
        aria-label={isPlaying ? "Mute Wedding Nasheed" : "Play Wedding Nasheed"}
      >
        {/* Animated ambient glow ring */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-dusty-rose/20 animate-ping opacity-75" />
        )}

        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-1.5">
              {/* Small music visualizer bars */}
              <div className="flex items-end gap-[2px] h-3.5 w-3.5">
                <div className="w-[2.5px] bg-botanical-green rounded-full animate-pulse" style={{ height: '60%', animationDuration: '0.6s' }} />
                <div className="w-[2.5px] bg-botanical-green rounded-full animate-pulse" style={{ height: '100%', animationDuration: '0.9s' }} />
                <div className="w-[2.5px] bg-botanical-green rounded-full animate-pulse" style={{ height: '40%', animationDuration: '0.7s' }} />
              </div>
              <Volume2 className="w-4 h-4 text-botanical-green group-hover:text-dusty-rose transition-colors" />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <VolumeX className="w-4 h-4 text-dusty-rose group-hover:text-botanical-green transition-colors" />
              <Music className="w-4 h-4 text-dusty-rose group-hover:text-botanical-green transition-colors opacity-70" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default MusicPlayer;
