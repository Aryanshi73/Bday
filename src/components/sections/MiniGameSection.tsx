import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { fireFireworks } from '../../utils/confettiHelpers';

interface TargetItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji: string;
}

interface PopFeedback {
  id: number;
  x: number;
  y: number;
  text: string;
}

const BIRTHDAY_TARGETS = ['💖', '🎂', '✨', '🎈', '🎁', '⭐', '🦖', '🥳'];
const POP_MESSAGES = [
  'Meet me soon! 💖',
  'Happy Birthday V! 🎉',
  'Sending giant hugs! 🫂',
  'Across the miles ✨',
  'Distance means nothing 🌟',
  'Counting days to see V! ⏳',
  'Best human ever 📍',
];

export const MiniGameSection: React.FC = () => {
  const { gameScore, incrementScore, isGameWon, playSound } = useApp();
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [popFeedbacks, setPopFeedbacks] = useState<PopFeedback[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnTarget = () => {
    const newTarget: TargetItem = {
      id: Date.now() + Math.random(),
      x: Math.floor(Math.random() * 75) + 10,
      y: Math.floor(Math.random() * 65) + 15,
      size: Math.floor(Math.random() * 16) + 36,
      color: '#8B5CF6',
      emoji: BIRTHDAY_TARGETS[Math.floor(Math.random() * BIRTHDAY_TARGETS.length)],
    };
    setTargets((prev) => [...prev.slice(-6), newTarget]);
  };

  useEffect(() => {
    if (isGameWon) {
      fireFireworks();
      return;
    }

    if (targets.length < 4) {
      spawnTarget();
      spawnTarget();
    }

    const interval = setInterval(() => {
      if (!isGameWon) {
        spawnTarget();
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [isGameWon, targets.length]);

  const handlePop = (item: TargetItem) => {
    setTargets((prev) => prev.filter((h) => h.id !== item.id));
    incrementScore();

    const feedback: PopFeedback = {
      id: Date.now() + Math.random(),
      x: item.x,
      y: item.y,
      text: POP_MESSAGES[Math.floor(Math.random() * POP_MESSAGES.length)],
    };
    setPopFeedbacks((prev) => [...prev.slice(-3), feedback]);
  };

  const handleResetGame = () => {
    playSound('click');
    setTargets([]);
    setPopFeedbacks([]);
    setTimeout(() => {
      spawnTarget();
      spawnTarget();
    }, 200);
  };

  return (
    <section id="game" className="relative py-16 sm:py-24 px-4 z-10 select-none">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badgeText="Birthday Fun Challenge"
          badgeEmoji="🎮"
          title={siteConfig.miniGame.title}
          subtitle={siteConfig.miniGame.description}
        />

        {/* Game Arena Box in Frosted Lavender & Sky */}
        <div
          ref={containerRef}
          className="relative w-full h-[420px] sm:h-[480px] rounded-3xl glass-card overflow-hidden shadow-2xl border-2 border-purple-200/90 flex flex-col justify-between p-6 bg-white"
        >
          {/* Top Score Bar */}
          <div className="flex items-center justify-between z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-purple-200">
              <Heart className="w-5 h-5 text-[#7C3AED] fill-[#7C3AED] animate-pulse" />
              <span className="text-sm font-extrabold text-gray-800">
                Hearts Popped: <span className="text-[#7C3AED]">{gameScore}</span> / {siteConfig.miniGame.targetScore}
              </span>
            </div>

            {/* Target Progress Bar */}
            <div className="w-36 sm:w-48 h-3.5 bg-purple-100 rounded-full overflow-hidden p-0.5 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (gameScore / siteConfig.miniGame.targetScore) * 100)}%`,
                }}
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] rounded-full"
              />
            </div>
          </div>

          {/* Floating Target Play Area */}
          <div className="relative w-full h-full my-2">
            <AnimatePresence>
              {!isGameWon &&
                targets.map((target) => (
                  <motion.button
                    key={target.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.15, 1],
                      y: [0, -15, 0],
                      opacity: 1,
                    }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.3 },
                      y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handlePop(target)}
                    className="absolute cursor-pointer select-none drop-shadow-md"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      fontSize: `${target.size}px`,
                    }}
                  >
                    {target.emoji}
                  </motion.button>
                ))}
            </AnimatePresence>

            {/* Pop Micro-Messages Floating Up */}
            <AnimatePresence>
              {popFeedbacks.map((fb) => (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -45, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute pointer-events-none z-30 px-3 py-1 rounded-full bg-white text-[#7C3AED] font-extrabold text-xs shadow-md border border-purple-200 whitespace-nowrap"
                  style={{
                    left: `${Math.min(75, Math.max(5, fb.x))}%`,
                    top: `${Math.min(80, Math.max(10, fb.y))}%`,
                  }}
                  onAnimationComplete={() => {
                    setPopFeedbacks((prev) => prev.filter((item) => item.id !== fb.id));
                  }}
                >
                  {fb.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Victory Overlay Modal */}
            <AnimatePresence>
              {isGameWon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute inset-0 bg-white/98 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center z-30 shadow-2xl border-2 border-purple-200"
                >
                  {/* Girl Cutout Sticker with Speech Bubble */}
                  <div className="flex flex-col items-center mb-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="mb-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-purple-200 text-xs sm:text-sm font-bold text-gray-800 relative max-w-[200px] text-center z-20"
                    >
                      <span>Meet me soon, V! 💖✨</span>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-r border-b border-purple-200 rotate-45" />
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                      className="filter drop-shadow-[0_8px_20px_rgba(139,92,246,0.35)]"
                    >
                      <img
                        src="/images/girl_heart_sticker.png"
                        alt="Heart Hugging Sticker"
                        className="w-28 h-auto sm:w-32 object-contain pointer-events-none"
                      />
                    </motion.div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-[#7C3AED] font-black text-xs mb-2 mt-1">
                    <Heart className="w-3.5 h-3.5 fill-[#7C3AED] text-[#7C3AED]" />
                    <span>ACROSS THE MILES • SPECIAL SURPRISE</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-gradient">
                    {siteConfig.miniGame.winMessage}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-gray-700 max-w-md font-semibold leading-relaxed">
                    Distance means so little when you mean so much. No matter how many miles separate us right now, you have my whole heart. Can't wait to celebrate in person and hug you tight! 🫂💜
                  </p>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      onClick={handleResetGame}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Play Again 🎮</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Hint */}
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500 z-20">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Tap the floating hearts and emojis to collect birthday points!</span>
            <Heart className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED]" />
          </div>
        </div>
      </div>
    </section>
  );
};
