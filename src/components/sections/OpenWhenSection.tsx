import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, X, Sparkles, Heart, Gift } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { useApp } from '../../context/AppContext';
import { fireHeartShower } from '../../utils/confettiHelpers';

interface EnvelopeItem {
  id: string;
  emoji: string;
  title: string;
  tag: string;
  teaser: string;
  letter: string;
  color: string;
  bgGradient: string;
  borderColor: string;
}

const ENVELOPES: EnvelopeItem[] = [
  {
    id: 'env-1',
    emoji: '🫀',
    title: 'Open When You Wonder How I Feel',
    tag: 'Entire Universe',
    teaser: 'A quiet truth about everything I carry in my heart...',
    letter:
      'You are unaware, and I am quietly carrying an entire universe of feelings for you🫀🥹',
    color: '#8B5CF6',
    bgGradient: 'from-purple-50 via-indigo-50 to-purple-100/70',
    borderColor: 'border-purple-200/80',
  },
  {
    id: 'env-2',
    emoji: '✨',
    title: 'Open When You Think About How It Started',
    tag: 'Every Single Day',
    teaser: 'About the moment everything changed for me...',
    letter:
      "I don't know the exact day I fell for you. I only know there wasn't a day after that when I didn't.",
    color: '#0284C7',
    bgGradient: 'from-sky-50 via-blue-50 to-cyan-100/70',
    borderColor: 'border-sky-200/80',
  },
  {
    id: 'env-3',
    emoji: '🫶🏻',
    title: 'Open When You Ask What Love Means',
    tag: 'Defining Love',
    teaser: 'How you became my definition of love...',
    letter:
      'I am more than fond of you, I define love by thinking of you🫶🏻🌸',
    color: '#EC4899',
    bgGradient: 'from-pink-50 via-rose-50 to-purple-100/70',
    borderColor: 'border-pink-200/80',
  },
  {
    id: 'env-4',
    emoji: '🫂',
    title: 'Open When The Distance Feels Too Much',
    tag: 'Closest To My Heart',
    teaser: 'No matter the miles between us...',
    letter:
      'Despite the distance between us, there is no one closer to my heart than you...',
    color: '#6366F1',
    bgGradient: 'from-indigo-50 via-slate-50 to-purple-100/70',
    borderColor: 'border-indigo-200/80',
  },
  {
    id: 'env-5',
    emoji: '💫',
    title: 'Open When You Think About The Future',
    tag: 'By Your Side',
    teaser: 'My deepest and most intense wish in this life...',
    letter:
      'Never have I wished for anything so intensely as I wish to live this life by your side.',
    color: '#3B82F6',
    bgGradient: 'from-blue-50 via-indigo-50 to-sky-100/70',
    borderColor: 'border-blue-200/80',
  },
];

export const OpenWhenSection: React.FC = () => {
  const { playSound } = useApp();
  const [openedEnvelopes, setOpenedEnvelopes] = useState<string[]>([]);
  const [activeEnvelope, setActiveEnvelope] = useState<EnvelopeItem | null>(null);

  const handleOpen = (env: EnvelopeItem) => {
    playSound('chime');
    if (!openedEnvelopes.includes(env.id)) {
      setOpenedEnvelopes((prev) => [...prev, env.id]);
      fireHeartShower();
    }
    setActiveEnvelope(env);
  };

  return (
    <section id="open-when" className="relative py-16 sm:py-24 px-4 z-10 select-none">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badgeText="Birthday Capsule"
          badgeEmoji="💌"
          title="“Open When...” Letters for V"
          subtitle="Trying to pour my heart into words, hoping they carry even a fraction of what I feel for you 💖✨"
        />

        {/* Progress Tracker */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 max-w-4xl mx-auto px-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-purple-200 text-xs sm:text-sm font-bold text-gray-800">
            <Gift className="w-4 h-4 text-[#8B5CF6]" />
            <span>
              Letters Opened: <strong className="text-[#8B5CF6]">{openedEnvelopes.length}</strong> / {ENVELOPES.length}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900/70">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Special Delivery for {ENVELOPES.length} Moments</span>
          </div>
        </div>

        {/* Envelopes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {ENVELOPES.map((env, idx) => {
            const isOpened = openedEnvelopes.includes(env.id);

            return (
              <motion.div
                key={env.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpen(env)}
                className={`cursor-pointer rounded-3xl p-6 bg-gradient-to-br ${env.bgGradient} backdrop-blur-md border-2 ${env.borderColor} shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-shadow hover:shadow-2xl`}
              >
                {/* Top decorative gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8] opacity-80" />

                {/* Top Badge & Status */}
                <div className="flex items-center justify-between mt-1">
                  <div className="w-10 h-10 rounded-2xl bg-white/95 shadow-sm flex items-center justify-center text-xl border border-purple-100">
                    {env.emoji}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
                      isOpened
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white/95 text-gray-800 shadow-xs border border-purple-200/50'
                    }`}
                  >
                    {isOpened ? (
                      <>
                        <MailOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Opened</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        <span>{env.tag}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Envelope Title & Teaser */}
                <div className="my-4">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                    {env.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold mt-1 line-clamp-2">
                    {env.teaser}
                  </p>
                </div>

                {/* Bottom Action Hint */}
                <div className="pt-3 border-t border-purple-200/50 flex items-center justify-between text-xs font-bold">
                  <span className="text-purple-900/80">
                    {isOpened ? 'Tap to re-read note' : 'Tap to open envelope ✉️'}
                  </span>
                  <span className="text-purple-600">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal: Opened Letter Content */}
        <AnimatePresence>
          {activeEnvelope && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEnvelope(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card max-w-lg w-full p-8 sm:p-10 rounded-3xl relative cursor-default border-2 border-purple-200 shadow-2xl overflow-hidden bg-white"
              >
                {/* Top gradient border */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8]" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveEnvelope(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-purple-50 text-gray-600 hover:bg-purple-100 hover:text-[#7C3AED] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title & Tag */}
                <div className="text-center mt-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7C3AED] font-extrabold text-xs mb-2">
                    <Heart className="w-3.5 h-3.5 fill-[#7C3AED]" />
                    <span>{activeEnvelope.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">
                    {activeEnvelope.title}
                  </h3>
                </div>

                {/* Letter Body */}
                <div className="mt-5 p-6 rounded-2xl bg-[#F8FAFF] border border-purple-200/60 shadow-inner">
                  <p className="font-handwriting text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed text-center">
                    "{activeEnvelope.letter}"
                  </p>
                </div>

                {/* Sign-off button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setActiveEnvelope(null)}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#0284C7] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    Close Envelope 💌
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
