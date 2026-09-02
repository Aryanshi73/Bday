import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';

export const LoveLetterSection: React.FC = () => {
  const { isPlayingMusic, toggleMusic } = useApp();
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const fullParagraphs = siteConfig.loveLetter.paragraphs;
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < fullParagraphs.length) {
        setDisplayedParagraphs(fullParagraphs.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section id="letter" className="relative py-16 sm:py-24 px-4 z-10 select-none">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badgeText="Birthday Letter"
          badgeEmoji="💌"
          title="A Birthday Letter Just For You"
          subtitle="Your dinosaur loves you a lot 🦖💖✨"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasStarted(true)}
          transition={{ duration: 0.8 }}
          className="relative glass-card p-8 sm:p-12 md:p-14 rounded-3xl shadow-2xl border-2 border-purple-200/90 overflow-hidden bg-white"
        >
          {/* Top & bottom decorative gradient borders */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8]" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#38BDF8] via-[#6366F1] to-[#8B5CF6]" />

          {/* Top Wax Seal Graphic in Lavender */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] flex items-center justify-center text-white shadow-lg border-2 border-purple-100">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
          </div>

          {/* Salutation */}
          <div className="mb-6">
            <h3 className="font-handwriting text-3xl sm:text-4xl font-black text-gray-900">
              Dearest V, ❤️
            </h3>
          </div>

          {/* Letter Body (Animated Paragraphs) */}
          <div className="space-y-4 sm:space-y-6 text-gray-800 font-body text-base sm:text-lg leading-relaxed">
            {displayedParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-semibold text-gray-800"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Letter Sign-off */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-purple-100 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-handwriting text-3xl sm:text-4xl font-black text-gradient mt-1">
                Yours ❤️
              </p>
            </div>

            {/* BGM Hook if paused */}
            {!isPlayingMusic && (
              <button
                onClick={toggleMusic}
                className="px-4 py-2 rounded-full bg-purple-100 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-all text-xs font-black flex items-center gap-1.5 shadow-xs border border-purple-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Play Birthday Melody 🎶</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
