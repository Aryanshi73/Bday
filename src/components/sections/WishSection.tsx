import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Cake } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { fireHeartShower } from '../../utils/confettiHelpers';

export const WishSection: React.FC = () => {
  const { isCandleBlown, blowCandle, playSound } = useApp();

  const handleBlow = () => {
    if (!isCandleBlown) {
      blowCandle();
      fireHeartShower();
    }
  };

  return (
    <section id="wish" className="relative py-16 sm:py-24 px-4 z-10 select-none">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badgeText="Make a Birthday Wish"
          badgeEmoji="🎂"
          title="Make a birthday wish"
          subtitle="Close your eyes, make your biggest wish for the year ahead, and tap the candle to blow it out!"
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 mt-6">
          {/* Character Cutout Sticker with Speech Bubble */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            {/* Speech Bubble */}
            <motion.div
              key={isCandleBlown ? 'blown' : 'lit'}
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mb-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-purple-200 text-xs sm:text-sm font-bold text-gray-800 relative max-w-[220px] text-center z-20"
            >
              <span>
                {isCandleBlown
                  ? 'WISH SENT TO THE UNIVERSE! ✨💖'
                  : 'Ready? 1... 2... 3... Make a wish! 🎂✨'}
              </span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-r border-b border-purple-200 rotate-45" />
            </motion.div>

            {/* Sticker Graphic */}
            <motion.div
              onClick={() => playSound('pop')}
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.94 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="cursor-pointer relative filter drop-shadow-[0_12px_24px_rgba(139,92,246,0.3)]"
            >
              <img
                src="/images/girl_blow_kiss_sticker.png"
                alt="Winking Kiss Character Sticker"
                className="w-36 h-auto sm:w-44 object-contain pointer-events-none drop-shadow-md"
              />
            </motion.div>
          </div>

          {/* Interactive Birthday Cake in Lavender & Sky Blue */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBlow}
              className="cursor-pointer relative p-4 group"
            >
              {/* Glowing Warm Aura when Candle is Lit */}
              <AnimatePresence>
                {!isCandleBlown && (
                  <motion.div
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#8B5CF6]/35 rounded-full blur-2xl pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Cake Vector SVG in Lavender & Sky Blue */}
              <svg
                width="240"
                height="240"
                viewBox="0 0 240 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl sm:w-72 sm:h-72"
              >
                {/* Candle Stick in Lavender */}
                <rect x="114" y="55" width="12" height="42" rx="4" fill="#8B5CF6" />
                <path d="M114 62 L126 58" stroke="#F5F3FF" strokeWidth="2" />
                <path d="M114 74 L126 70" stroke="#F5F3FF" strokeWidth="2" />
                <path d="M114 86 L126 82" stroke="#F5F3FF" strokeWidth="2" />
                {/* Wick */}
                <line x1="120" y1="55" x2="120" y2="48" stroke="#333" strokeWidth="2.5" />

                {/* Flame or Smoke Puff */}
                {!isCandleBlown ? (
                  <g className="animate-candle-flicker origin-bottom">
                    {/* Outer Flame Glow */}
                    <path
                      d="M120 18 C110 32 108 42 120 48 C132 42 130 32 120 18 Z"
                      fill="#8B5CF6"
                      opacity="0.6"
                    />
                    {/* Main Flame in Sky Blue */}
                    <path
                      d="M120 24 C112 34 112 43 120 48 C128 43 128 34 120 24 Z"
                      fill="#38BDF8"
                    />
                    {/* Inner White Core */}
                    <path
                      d="M120 32 C116 38 116 43 120 46 C124 43 124 38 120 32 Z"
                      fill="#FFF"
                    />
                  </g>
                ) : (
                  <g>
                    {/* Rising Smoke Particles */}
                    <motion.circle
                      initial={{ opacity: 0.8, cy: 45, r: 3 }}
                      animate={{ opacity: 0, cy: 15, cx: 124, r: 8 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      fill="#94A3B8"
                    />
                    <motion.circle
                      initial={{ opacity: 0.8, cy: 48, r: 2.5 }}
                      animate={{ opacity: 0, cy: 20, cx: 114, r: 6 }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
                      fill="#94A3B8"
                    />
                  </g>
                )}

                {/* Top Cake Tier in Lavender */}
                <rect x="65" y="95" width="110" height="48" rx="10" fill="#A78BFA" />
                {/* Top Frosting Drips in Cloud White */}
                <path
                  d="M65 105 Q75 118 85 105 Q95 120 105 105 Q115 122 125 105 Q135 120 145 105 Q155 122 165 105 Q175 115 175 105 L175 95 L65 95 Z"
                  fill="#F8FAFF"
                />

                {/* Bottom Cake Tier in Soft Sky Blue */}
                <rect x="40" y="140" width="160" height="60" rx="12" fill="#60A5FA" />
                {/* Bottom Tier Frosting Drips */}
                <path
                  d="M40 152 Q52 168 65 152 Q78 170 90 152 Q103 172 115 152 Q128 170 140 152 Q153 172 165 152 Q178 170 190 152 Q200 165 200 152 L200 140 L40 140 Z"
                  fill="#F8FAFF"
                />

                {/* Sky & Lavender Sprinkles */}
                <circle cx="85" cy="125" r="3" fill="#BAE6FD" />
                <circle cx="115" cy="122" r="3" fill="#C4B5FD" />
                <circle cx="145" cy="126" r="3" fill="#BAE6FD" />
                <circle cx="65" cy="178" r="3.5" fill="#DDD6FE" />
                <circle cx="100" cy="182" r="3.5" fill="#93C5FD" />
                <circle cx="140" cy="180" r="3.5" fill="#DDD6FE" />
                <circle cx="175" cy="176" r="3.5" fill="#93C5FD" />

                {/* Cake Stand Base */}
                <ellipse cx="120" cy="204" rx="90" ry="14" fill="#E2E8F0" />
                <rect x="105" y="204" width="30" height="22" rx="4" fill="#CBD5E1" />
                <ellipse cx="120" cy="226" rx="55" ry="10" fill="#E2E8F0" />
              </svg>
            </motion.div>

            {/* Blow Candle CTA Button */}
            <motion.button
              onClick={handleBlow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-4 px-8 py-3.5 rounded-full font-black text-base sm:text-lg shadow-xl transition-all flex items-center gap-2 ${
                isCandleBlown
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white shadow-purple-500/30 animate-pulse'
              }`}
            >
              {isCandleBlown ? (
                <>
                  <Sparkles className="w-5 h-5 text-[#38BDF8]" />
                  <span>Wish Sent to the Universe! ✨</span>
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 fill-white" />
                  <span>Blow Out the Candle 🕯️</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Revealed Post-Blowout Special Greeting */}
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12 p-6 sm:p-8 rounded-3xl glass-card text-center max-w-xl mx-auto border border-purple-200 shadow-xl bg-white"
            >
              <div className="flex items-center justify-center gap-2 text-2xl">
                <Cake className="w-6 h-6 text-[#7C3AED]" />
                <span>🎂🎉💖</span>
              </div>
              <h3 className="text-2xl font-black text-gradient mt-2">
                May All Your Biggest Wishes Come True, V! 💖
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mt-2 font-semibold">
                Waiting for the moment you’ll finally be by my side. 💖✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
