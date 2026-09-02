import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  shape: string;
}

const COLORS = ['#FF3EA5', '#8B5CF6', '#38BDF8', '#FFE066', '#5EEAD4'];
const SHAPES = ['✨', '💖', '⭐', '🌸'];

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);

  useEffect(() => {
    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (distance < 24) return; // Throttle by distance

      lastX = e.clientX;
      lastY = e.clientY;

      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      };

      setParticles((prev) => [...prev.slice(-14), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 0.6, x: p.x - 8, y: p.y - 8 }}
            animate={{
              opacity: 0,
              scale: 1.2,
              y: p.y - 30,
              x: p.x + (Math.random() * 20 - 10),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              color: p.color,
              fontSize: '14px',
            }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
          >
            {p.shape}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
