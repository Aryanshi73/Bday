import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const EMOJI_LIST = ['✈️', '💌', '✨', '⭐', '🎂', '☁️', '🦕', '💜', '🩵', '💙'];

interface FloatingEmojiItem {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

export const FloatingEmojis: React.FC = () => {
  const emojis: FloatingEmojiItem[] = useMemo(() => {
    return Array.from({ length: 16 }, (_, idx) => ({
      id: idx,
      emoji: EMOJI_LIST[idx % EMOJI_LIST.length],
      left: Math.floor(Math.random() * 92) + 4,
      duration: Math.floor(Math.random() * 12) + 15,
      delay: Math.floor(Math.random() * 8),
      size: Math.floor(Math.random() * 12) + 18,
      opacity: Math.random() * 0.35 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '110vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '-15vh',
            x: [0, item.id % 2 === 0 ? 35 : -35, 0],
            opacity: [0, item.opacity, item.opacity, 0],
            rotate: [0, item.id % 2 === 0 ? 30 : -30, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};
