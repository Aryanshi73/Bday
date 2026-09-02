import { useApp } from '../context/AppContext';
import type { SoundEffectType } from '../types';

export const useAudio = () => {
  const { isPlayingMusic, toggleMusic, isMuted, toggleMute, playSound } = useApp();

  const playEffect = (type: SoundEffectType) => {
    playSound(type);
  };

  return {
    isPlayingMusic,
    toggleMusic,
    isMuted,
    toggleMute,
    playEffect,
  };
};
