import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { MascotDino } from '../common/MascotDino';
import { useApp } from '../../context/AppContext';
import { fireFireworks } from '../../utils/confettiHelpers';

export const OutroSection: React.FC = () => {
  const { resetExperience } = useApp();

  const handleReplay = () => {
    fireFireworks();
    resetExperience();
  };

  return (
    <footer id="outro" className="relative py-20 sm:py-28 px-4 z-10 text-center select-none">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Celebrating Mascot Dino */}
        <MascotDino
          pose="celebrating"
          size={160}
          speechText="Happy birthday Vivek, may all your dreams come true ✨🎂"
        />

        {/* Sender Closing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card mt-6 p-8 rounded-3xl shadow-xl w-full border-2 border-purple-200/90 bg-white"
        >
          <h3 className="text-3xl sm:text-4xl font-black text-gradient mb-2">
            Have the Best Birthday Ever! 💖✨
          </h3>

          <p className="text-sm sm:text-base font-semibold text-gray-700 mt-3 mb-6 max-w-lg mx-auto leading-relaxed">
            {siteConfig.sender.signature}
          </p>

          {/* Replay Experience Button */}
          <div className="flex justify-center">
            <button
              onClick={handleReplay}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Birthday Journey ↺</span>
            </button>
          </div>
        </motion.div>

        {/* Signature Bottom */}
        <div className="mt-8 flex items-center gap-2 text-xs font-bold text-purple-900/60">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-[#FF3EA5] fill-[#FF3EA5] animate-pulse" />
          <span>for V • Happy Birthday!</span>
        </div>
      </div>
    </footer>
  );
};
