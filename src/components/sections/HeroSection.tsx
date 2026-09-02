import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, ChevronDown, PartyPopper } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useApp } from '../../context/AppContext';
import { MascotDino } from '../common/MascotDino';
import { fireGiftExplosion } from '../../utils/confettiHelpers';

interface HeroSectionProps {
  onUnlockScroll: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onUnlockScroll }) => {
  const { isUnlocked, unlockGift } = useApp();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    if (isUnlocked) {
      onUnlockScroll();
      return;
    }

    setIsOpening(true);
    fireGiftExplosion();
    unlockGift();

    setTimeout(() => {
      setIsOpening(false);
      onUnlockScroll();
    }, 900);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20 z-10 select-none overflow-hidden"
    >
      {/* Top Birthday VIP Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 shadow-md text-[#7C3AED] font-black text-xs sm:text-sm mb-6"
      >
        <PartyPopper className="w-4 h-4 text-[#8B5CF6] animate-bounce" />
        <span>Hurrraahhh!!! It's Your birthday 🥳🎉</span>
        <Sparkles className="w-4 h-4 text-[#38BDF8]" />
      </motion.div>

      {/* Main Massive Purple-to-Blue Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient tracking-tight leading-tight max-w-4xl mx-auto"
      >
        HAPPY BIRTHDAY,
        <br />
        <span className="relative inline-block mt-1 sm:mt-2">
          {siteConfig.recipient.name.toUpperCase()}! 🎉
          {/* Playful Wavy Underline */}
          <svg
            className="absolute -bottom-2 sm:-bottom-4 left-0 w-full h-3 sm:h-5 text-[#8B5CF6] drop-shadow-xs"
            viewBox="0 0 300 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12 Q 75 2 150 12 T 295 12"
              stroke="#8B5CF6"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-base sm:text-xl md:text-2xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed"
      >
        {siteConfig.recipient.heroSubtitle}
      </motion.p>

      {/* Centerpiece: Lavender & Sky Birthday Gift Box & Dino Mascot */}
      <div className="relative my-8 sm:my-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
        {/* Waving Birthday Dino */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="order-2 sm:order-1"
        >
          <MascotDino
            pose="waving"
            size={135}
            speechText={`Tap the gift to open your birthday surprise, ${siteConfig.recipient.nickname}! 🎁🦖`}
          />
        </motion.div>

        {/* 3D Animated Lavender Gift Box */}
        <motion.div
          onClick={handleOpenGift}
          whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.94 }}
          animate={
            isOpening
              ? { scale: [1, 1.25, 0.9, 1.1], rotate: [0, -10, 10, -5, 0] }
              : { y: [0, -10, 0] }
          }
          transition={{
            y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
            scale: { duration: 0.6 },
          }}
          className="order-1 sm:order-2 cursor-pointer relative group p-2"
        >
          {/* Glowing Aura in Lavender & Sky */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity" />

          {/* Kawaii Hand-Drawn Pink Gift Box SVG */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-2xl sm:w-44 sm:h-44 overflow-visible"
          >
            {/* BOW ON TOP */}
            <g stroke="#1F1924" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              {/* Back Loop Left */}
              <path
                d="M 68 35 C 55 10 92 8 100 32 Z"
                fill="#FFDEE9"
              />
              {/* Back Loop Right */}
              <path
                d="M 102 32 C 110 8 148 10 134 36 Z"
                fill="#FFDEE9"
              />
              {/* Purple/Pink Inner Shade in Right Back Loop */}
              <path
                d="M 116 22 Q 136 22 130 35"
                stroke="#C084FC"
                strokeWidth="5"
                fill="none"
              />

              {/* Front Left Big Bow Loop */}
              <path
                d="M 100 34 C 82 22 35 25 32 46 C 30 65 85 64 100 36 Z"
                fill="#FFF0F5"
              />
              {/* Front Right Big Bow Loop */}
              <path
                d="M 100 34 C 118 22 165 25 168 46 C 170 65 115 64 100 36 Z"
                fill="#FFF0F5"
              />
              {/* Inner loop folds */}
              <path
                d="M 45 42 Q 75 42 90 36"
                stroke="#1F1924"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M 155 42 Q 125 42 110 36"
                stroke="#1F1924"
                strokeWidth="5"
                fill="none"
              />
            </g>

            {/* BOX BASE CONTAINER */}
            <g stroke="#1F1924" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              {/* Main Box Body */}
              <path
                d="M 28 85 L 32 178 C 32 188 45 194 58 194 L 142 194 C 155 194 168 188 168 178 L 172 85 Z"
                fill="#FFEBF2"
              />
            </g>

            {/* Left Side Body Shadow (Candy Pink) */}
            <path
              d="M 29 88 L 32 178 C 32 185 40 190 50 192 L 85 192 C 90 150 78 100 90 88 Z"
              fill="#FFAEC5"
            />

            {/* Center Vertical Ribbon */}
            <g stroke="#1F1924" strokeWidth="6" strokeLinecap="round">
              <path
                d="M 90 85 L 90 194 L 110 194 L 110 85 Z"
                fill="#FF75A0"
              />
            </g>
            {/* Ribbon bottom shadow tip */}
            <rect x="91" y="180" width="18" height="13" fill="#FF2E7E" />

            {/* Hand-drawn Left Shadow Sketch Accents */}
            <g fill="#1F1924">
              <circle cx="44" cy="125" r="4.5" />
              <rect x="40" y="136" width="9" height="18" rx="4.5" />
              {/* L-bracket mark */}
              <path
                d="M 43 170 L 43 182 L 56 182"
                stroke="#1F1924"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* BOX LID (Animated upon unwrap) */}
            <motion.g
              animate={isOpening ? { y: -20, rotate: -10 } : { y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              {/* Lid Body */}
              <rect
                x="14"
                y="52"
                width="172"
                height="38"
                rx="18"
                fill="#FFEBF2"
                stroke="#1F1924"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lid Ribbon Segment */}
              <rect
                x="89"
                y="52"
                width="22"
                height="38"
                fill="#FF75A0"
                stroke="#1F1924"
                strokeWidth="6"
              />
              {/* Right Lid Accent Sketch Line */}
              <path
                d="M 126 70 L 160 68"
                stroke="#1F1924"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </motion.g>
          </svg>
        </motion.div>
      </div>

      {/* Main Unlock Call-to-Action Button in Lavender-Blue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-2"
      >
        <button
          onClick={handleOpenGift}
          className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white font-black text-lg sm:text-xl shadow-2xl hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          {isUnlocked ? (
            <>
              <Sparkles className="w-6 h-6 animate-bounce text-[#FFE066]" />
              <span>Scroll Down to Explore Your Surprises! ✨</span>
            </>
          ) : (
            <>
              <Gift className="w-6 h-6 animate-pulse" />
              <span>Unwrap Your Birthday Gift 🎁</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Downward Scroll Indicator (when unlocked) */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={onUnlockScroll}
            className="mt-10 sm:mt-12 cursor-pointer inline-flex flex-col items-center gap-1 text-purple-700/70 hover:text-[#7C3AED] transition-colors"
          >
            <span className="text-xs font-black uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Scroll Down</span>
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
