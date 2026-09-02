import React from 'react';
import { motion } from 'framer-motion';
import type { DinoPose } from '../../types';
import { useApp } from '../../context/AppContext';

interface MascotDinoProps {
  pose?: DinoPose;
  size?: number;
  className?: string;
  speechText?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const MascotDino: React.FC<MascotDinoProps> = ({
  pose = 'waving',
  size = 140,
  className = '',
  speechText,
  onClick,
  interactive = true,
}) => {
  const { playSound } = useApp();

  const handleClick = () => {
    if (interactive) {
      playSound('pop');
    }
    if (onClick) onClick();
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-2 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-purple-200 text-xs sm:text-sm font-bold text-gray-800 relative max-w-[220px] text-center z-20"
        >
          <span>{speechText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-r border-b border-purple-200 rotate-45" />
        </motion.div>
      )}

      {/* Chibi Green Kawaii Dino SVG Character */}
      <motion.div
        onClick={handleClick}
        whileHover={interactive ? { scale: 1.08, rotate: [0, -3, 3, 0] } : undefined}
        whileTap={interactive ? { scale: 0.92 } : undefined}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className={`${interactive ? 'cursor-pointer' : ''}`}
        style={{ width: size, height: size * 1.15 }}
      >
        <svg
          viewBox="0 0 200 230"
          className="w-full h-full drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SPINES / DORSAL PLATES (Green with dark olive outline) */}
          <g stroke="#484E34" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            {/* Top Head Spine 1 */}
            <path
              d="M 85 30 C 90 8 110 8 118 30 Z"
              fill="#6CB82D"
            />
            {/* Top-Right Head Spine 2 */}
            <path
              d="M 135 45 C 158 35 168 52 154 75 Z"
              fill="#6CB82D"
            />
            {/* Mid-Right Head Spine 3 */}
            <path
              d="M 158 85 C 182 86 182 110 156 118 Z"
              fill="#6CB82D"
            />
            {/* Lower-Right Spine 4 */}
            <path
              d="M 148 130 C 168 135 168 155 142 160 Z"
              fill="#6CB82D"
            />
            {/* Body/Back Spine 5 */}
            <path
              d="M 125 170 C 140 170 140 185 125 188 Z"
              fill="#6CB82D"
            />
            {/* Tail Spine 6 */}
            <path
              d="M 135 186 C 148 184 148 196 136 198 Z"
              fill="#6CB82D"
            />
            {/* Tail Tip Spine 7 */}
            <path
              d="M 150 196 C 160 195 160 204 150 205 Z"
              fill="#6CB82D"
            />
          </g>

          {/* TAIL (Sitting on Right) */}
          <path
            d="M 115 180 C 145 180 168 195 158 210 C 145 220 115 210 100 195 Z"
            fill="#C3E171"
            stroke="#484E34"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* CHUBBY LOWER BODY */}
          <path
            d="M 52 160 C 45 195 60 215 95 215 C 130 215 145 195 138 160 C 120 155 70 155 52 160 Z"
            fill="#C3E171"
            stroke="#484E34"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* SITTING FEET WITH HEART PADS */}
          {/* Left Foot */}
          <g>
            <path
              d="M 50 178 C 50 170 60 170 65 178 C 70 170 80 170 85 178 C 90 186 85 210 68 210 C 50 210 46 195 50 178 Z"
              fill="#C3E171"
              stroke="#484E34"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Foot Heart Pad */}
            <path
              d="M 68 196 C 68 191 63 188 59 191 C 55 188 50 191 50 196 C 50 203 68 209 68 209 C 68 209 68 203 68 196 Z"
              fill="#62A827"
              transform="rotate(-15 62 198)"
            />
          </g>

          {/* Right Foot */}
          <g>
            <path
              d="M 105 178 C 105 170 115 170 120 178 C 125 170 135 170 140 178 C 144 186 140 210 122 210 C 105 210 101 195 105 178 Z"
              fill="#C3E171"
              stroke="#484E34"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Foot Heart Pad */}
            <path
              d="M 122 196 C 122 191 127 188 131 191 C 135 188 140 191 140 196 C 140 203 122 209 122 209 C 122 209 122 203 122 196 Z"
              fill="#62A827"
              transform="rotate(15 128 198)"
            />
          </g>

          {/* ARMS (Pose specific) */}
          {pose === 'celebrating' ? (
            <g stroke="#484E34" strokeWidth="4" strokeLinecap="round" fill="#C3E171">
              {/* Left Arm Raised */}
              <path d="M 52 145 Q 35 125 40 110" />
              {/* Right Arm Raised */}
              <path d="M 138 145 Q 155 125 150 110" />
            </g>
          ) : pose === 'waving' ? (
            <g stroke="#484E34" strokeWidth="4" strokeLinecap="round" fill="none">
              {/* Left Resting Arm */}
              <path d="M 72 152 Q 82 160 70 166" />
              {/* Right Waving Arm */}
              <path d="M 125 150 Q 148 135 152 118" />

              {/* Cute Floating Heart Balloon in Hand */}
              <path
                d="M 152 118 Q 160 95 158 68"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              <ellipse cx="158" cy="52" rx="14" ry="18" fill="#FF70A6" stroke="#484E34" strokeWidth="2.5" />
              <ellipse cx="154" cy="48" rx="4" ry="7" fill="#FFF" opacity="0.6" />
              <polygon points="156,70 160,70 158,73" fill="#E11D48" />
            </g>
          ) : (
            <g stroke="#484E34" strokeWidth="4" strokeLinecap="round" fill="none">
              {/* Tiny Cute Resting Stubby Arms */}
              <path d="M 72 152 Q 82 160 70 166" />
              <path d="M 118 152 Q 108 160 120 166" />
            </g>
          )}

          {/* BIG ROUND CHIBI HEAD */}
          <ellipse
            cx="96"
            cy="90"
            rx="68"
            ry="65"
            fill="#C3E171"
            stroke="#484E34"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* ROSY PINK BLUSH CHEEKS */}
          <ellipse cx="48" cy="108" rx="11" ry="8" fill="#F48B8B" />
          <ellipse cx="144" cy="108" rx="11" ry="8" fill="#F48B8B" />

          {/* EYES & MOUTH BASED ON POSE */}
          {pose === 'heart-eyes' ? (
            <g>
              {/* Left Heart Eye */}
              <path
                d="M 68 95 C 68 89 61 84 55 88 C 49 84 42 89 42 95 C 42 104 68 112 68 112 C 68 112 68 104 68 95 Z"
                fill="#E11D48"
              />
              {/* Right Heart Eye */}
              <path
                d="M 138 95 C 138 89 131 84 125 88 C 119 84 112 89 112 95 C 112 104 138 112 138 112 C 138 112 138 104 138 95 Z"
                fill="#E11D48"
              />
              {/* Sweet Open Smile */}
              <path
                d="M 85 105 Q 96 116 107 105"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : pose === 'sleepy' ? (
            <g>
              {/* Sleepy Curved Eyes */}
              <path
                d="M 48 98 Q 58 106 68 98"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 118 98 Q 128 106 138 98"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Small Smile */}
              <path
                d="M 90 108 Q 96 113 102 108"
                stroke="#362C24"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : pose === 'blowing' ? (
            <g>
              {/* Happy squinted eyes */}
              <path
                d="M 48 98 Q 58 90 68 98"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 118 98 Q 128 90 138 98"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {/* Round blowing mouth */}
              <ellipse cx="96" cy="108" rx="6" ry="7" fill="#362C24" />
              <ellipse cx="96" cy="107" rx="3.5" ry="4.5" fill="#F48B8B" />
              {/* Air blow stream puffs */}
              <path
                d="M 108 105 Q 120 100 132 105"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 4"
                fill="none"
              />
            </g>
          ) : (
            <g>
              {/* Solid Big Kawaii Dark Brown Eyes (From Reference) */}
              <circle cx="58" cy="98" r="14" fill="#362C24" />
              <circle cx="134" cy="98" r="14" fill="#362C24" />

              {/* Sweet Kawaii Curved Smile (From Reference) */}
              <path
                d="M 85 104 Q 96 111 107 104"
                stroke="#362C24"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Party Hat (Only if waving or celebrating) */}
          {(pose === 'waving' || pose === 'celebrating') && (
            <g>
              <path
                d="M 80 40 L 96 5 L 112 38 Z"
                fill="#8B5CF6"
                stroke="#484E34"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="96" cy="4" r="5" fill="#FFE066" stroke="#484E34" strokeWidth="2" />
              <path
                d="M 82 38 Q 96 44 110 38"
                stroke="#FFE066"
                strokeWidth="3"
                fill="none"
              />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
