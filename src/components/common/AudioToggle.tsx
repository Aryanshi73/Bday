import React from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AudioToggle: React.FC = () => {
  const { isPlayingMusic, toggleMusic, isMuted, toggleMute, playSound } = useApp();

  const handleToggle = () => {
    playSound('click');
    if (isMuted) {
      toggleMute();
    } else {
      toggleMusic();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2"
    >
      <button
        onClick={handleToggle}
        aria-label={isPlayingMusic ? 'Mute Music' : 'Play Music'}
        className="glass-card flex items-center gap-2 px-3.5 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group border border-purple-200/80"
      >
        {isMuted || !isPlayingMusic ? (
          <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-[#8B5CF6] transition-colors" />
        ) : (
          <Music className="w-4 h-4 text-[#8B5CF6] animate-bounce" />
        )}

        {/* Animated Sound Waves when playing */}
        <div className="flex items-end gap-0.5 h-3.5 px-0.5">
          {[0.6, 1, 0.4, 0.8].map((_, idx) => (
            <motion.span
              key={idx}
              animate={
                isPlayingMusic && !isMuted
                  ? {
                      height: ['20%', '100%', '30%', '80%', '20%'],
                    }
                  : { height: '20%' }
              }
              transition={{
                duration: 0.8 + idx * 0.15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.1,
              }}
              className={`w-0.5 rounded-full ${
                isPlayingMusic && !isMuted
                  ? 'bg-gradient-to-t from-[#8B5CF6] to-[#38BDF8]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-bold text-gray-700 hidden sm:inline">
          {isPlayingMusic && !isMuted ? 'Birthday Melody 🎂' : 'Sound Off'}
        </span>
      </button>
    </motion.div>
  );
};
