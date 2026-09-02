import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft Lavender Sphere Top Left */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[34rem] sm:h-[34rem] rounded-full bg-gradient-to-br from-[#DDD6FE]/40 to-[#C4B5FD]/25 blur-[95px]"
      />

      {/* Soft Sky Blue Sphere Top Right */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-32 w-96 h-96 sm:w-[32rem] sm:h-[32rem] rounded-full bg-gradient-to-bl from-[#BAE6FD]/40 to-[#E0E7FF]/30 blur-[100px]"
      />

      {/* Periwinkle & Cloud Blue Sphere Bottom Center */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/3 w-80 h-80 sm:w-[30rem] sm:h-[30rem] rounded-full bg-gradient-to-tr from-[#C7D2FE]/30 via-[#E0F2FE]/40 to-[#DDD6FE]/25 blur-[95px]"
      />

      {/* Gentle Floating Flight Path Lines SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M-100 200 C 300 100, 700 400, 1400 150"
          stroke="#A78BFA"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          fill="none"
        />
        <path
          d="M0 600 C 400 500, 800 800, 1600 550"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          fill="none"
        />
      </svg>
    </div>
  );
};
