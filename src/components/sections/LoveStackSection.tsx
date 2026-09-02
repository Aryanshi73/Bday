import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.92,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 26,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -180 : 180,
    opacity: 0,
    scale: 0.92,
    rotate: direction > 0 ? -5 : 5,
    transition: {
      duration: 0.22,
    },
  }),
};

export const LoveStackSection: React.FC = () => {
  const { playSound } = useApp();
  const [cards] = useState(siteConfig.reasons);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    playSound('swipe');
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    playSound('swipe');
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    playSound('chime');
    setDirection(1);
    setCurrentIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * cards.length);
      } while (cards.length > 1 && next === prev);
      return next;
    });
  };

  const currentCard = cards[currentIndex];

  return (
    <section id="reasons" className="relative py-16 sm:py-24 px-4 z-10 select-none">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badgeText="Why You're Irreplaceable"
          badgeEmoji="💖"
          title="Me kyu?? 🙈💖"
          subtitle="Chalo btati hun kyu.... 🤭💌✨"
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-4">
          {/* Character Cutout Sticker */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            <motion.div
              onClick={() => playSound('pop')}
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.94 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="cursor-pointer relative filter drop-shadow-[0_12px_24px_rgba(139,92,246,0.3)]"
            >
              <img
                src="/images/girl_bouquet_sticker.png"
                alt="Flower Bouquet Character Sticker"
                className="w-40 h-auto sm:w-48 object-contain pointer-events-none drop-shadow-md"
              />
            </motion.div>
          </div>

          {/* Reason Card Deck Container with Stack Depth */}
          <div className="order-1 md:order-2 relative w-full max-w-md sm:max-w-lg min-h-[440px] sm:min-h-[470px] flex items-center justify-center">
            {/* Background Stacked Visual Cards */}
            <div className="absolute inset-0 rounded-3xl bg-purple-200/50 border border-purple-200/60 transform translate-y-3 scale-[0.95] pointer-events-none -z-10 shadow-lg" />
            <div className="absolute inset-0 rounded-3xl bg-indigo-200/40 border border-indigo-200/40 transform translate-y-6 scale-[0.90] pointer-events-none -z-20 shadow-md" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 60) {
                    handlePrev();
                  } else if (info.offset.x < -60) {
                    handleNext();
                  }
                }}
                className="w-full h-full p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl border-2 border-purple-200/90 flex flex-col justify-between cursor-grab active:cursor-grabbing bg-white relative overflow-hidden"
              >
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8] opacity-80" />

                {/* Card Body */}
                <div className="my-auto py-3 overflow-y-auto max-h-[340px] pr-2.5 space-y-3 [scrollbar-width:thin] [scrollbar-color:#DDD6FE_transparent]">
                  <h3 className="text-2xl sm:text-3xl font-black text-gradient mb-3">
                    {currentCard.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                    {currentCard.description}
                  </p>
                </div>

                {/* Card Footer: Dynamic Tracker */}
                <div className="flex items-center justify-between pt-3.5 border-t border-purple-100 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span className="font-extrabold text-[#7C3AED]">
                      Message {currentIndex + 1} of {cards.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-purple-600/70">Swipe or tap arrows 👈 👉</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Deck Navigation Controls: Prev, Shuffle, Next */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8">
          <button
            onClick={handlePrev}
            aria-label="Previous Message"
            className="w-12 h-12 rounded-full bg-white border-2 border-purple-200 text-[#7C3AED] hover:bg-purple-50 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleShuffle}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white font-black text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Shuffle className="w-4 h-4 animate-pulse" />
            <span>Shuffle 🔀✨</span>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Message"
            className="w-12 h-12 rounded-full bg-white border-2 border-purple-200 text-[#7C3AED] hover:bg-purple-50 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
