import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppContextType, SoundEffectType } from '../types';
import { synth } from '../utils/audioSynth';
import { siteConfig } from '../config/siteConfig';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);

  const isGameWon = gameScore >= siteConfig.miniGame.targetScore;

  const playSound = (type: SoundEffectType) => {
    synth.playSound(type, isMuted);
  };

  const unlockGift = () => {
    setIsUnlocked(true);
    playSound('confetti');
    if (!isMuted && !isPlayingMusic) {
      synth.startLofiAmbientBgm();
      setIsPlayingMusic(true);
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      synth.stopLofiAmbientBgm();
      setIsPlayingMusic(false);
    } else {
      synth.startLofiAmbientBgm();
      setIsPlayingMusic(true);
      if (isMuted) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next && isPlayingMusic) {
        synth.stopLofiAmbientBgm();
        setIsPlayingMusic(false);
      }
      return next;
    });
  };

  const incrementScore = () => {
    if (gameScore < siteConfig.miniGame.targetScore) {
      const nextScore = gameScore + 1;
      setGameScore(nextScore);
      playSound('pop');
      if (nextScore === siteConfig.miniGame.targetScore) {
        setTimeout(() => playSound('victory'), 150);
      }
    }
  };

  const blowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
      playSound('whoosh');
      setTimeout(() => playSound('chime'), 300);
    }
  };

  const resetExperience = () => {
    setIsUnlocked(false);
    setGameScore(0);
    setIsCandleBlown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click');
  };

  useEffect(() => {
    return () => {
      synth.stopLofiAmbientBgm();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isUnlocked,
        unlockGift,
        isPlayingMusic,
        toggleMusic,
        isMuted,
        toggleMute,
        gameScore,
        incrementScore,
        isGameWon,
        isCandleBlown,
        blowCandle,
        resetExperience,
        playSound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
