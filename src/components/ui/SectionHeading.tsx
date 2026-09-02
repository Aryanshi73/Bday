import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badgeText: string;
  badgeEmoji?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  badgeEmoji = '✈️',
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center mb-10 sm:mb-14 ${className}`}>
      {/* Lavender & Sky Blue Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EDE9FE] via-[#E0E7FF] to-[#E0F2FE] border border-purple-200/80 text-[#7C3AED] font-extrabold text-xs sm:text-sm shadow-xs mb-3"
      >
        <span>{badgeEmoji}</span>
        <span>{badgeText}</span>
      </motion.div>

      {/* Main Purple-to-Blue Gradient Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient tracking-tight px-4"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-4 font-semibold leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
