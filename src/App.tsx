import { useRef } from 'react';
import { BackgroundBlobs } from './components/common/BackgroundBlobs';
import { FloatingEmojis } from './components/common/FloatingEmojis';
import { CursorTrail } from './components/common/CursorTrail';
import { AudioToggle } from './components/common/AudioToggle';
import { HeroSection } from './components/sections/HeroSection';
import { OpenWhenSection } from './components/sections/OpenWhenSection';
import { LoveStackSection } from './components/sections/LoveStackSection';
import { MiniGameSection } from './components/sections/MiniGameSection';
import { WishSection } from './components/sections/WishSection';
import { LoveLetterSection } from './components/sections/LoveLetterSection';
import { OutroSection } from './components/sections/OutroSection';
import { AppProvider, useApp } from './context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { isUnlocked } = useApp();
  const journeyRef = useRef<HTMLDivElement>(null);

  const handleScrollToJourney = () => {
    if (journeyRef.current) {
      journeyRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF3EA5]/30 overflow-x-hidden">
      {/* Ambient Visual Layers */}
      <BackgroundBlobs />
      <FloatingEmojis />
      <CursorTrail />
      <AudioToggle />

      {/* 1. Landing Hero & Gatekeeper */}
      <HeroSection onUnlockScroll={handleScrollToJourney} />

      {/* Unlocked Full Experience Sections */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.main
            ref={journeyRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full"
          >
            {/* 1. "Open When..." Virtual Envelope Vault */}
            <OpenWhenSection />

            {/* 2. Reasons Why You're Amazing Card Stack */}
            <LoveStackSection />

            {/* 3. Heart Pop Interactive Mini-Game */}
            <MiniGameSection />

            {/* 4. Cake Candle Blowout Wish */}
            <WishSection />

            {/* 5. Birthday Love Letter */}
            <LoveLetterSection />

            {/* 6. Celebration Outro & Replay */}
            <OutroSection />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
