export type DinoPose = 
  | 'waving' 
  | 'peeking' 
  | 'heart-eyes' 
  | 'blowing' 
  | 'celebrating' 
  | 'sleepy';

export type SoundEffectType = 
  | 'pop' 
  | 'confetti' 
  | 'whoosh' 
  | 'chime' 
  | 'swipe' 
  | 'click' 
  | 'victory';

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  note?: string;
  rotation: number;
}

export interface ReasonItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  tag: string;
  bgColor: string;
  borderColor: string;
}

export interface SiteConfig {
  recipient: {
    name: string;
    nickname: string;
    birthDate: string;        // e.g. "2002-09-02T00:00:00"
    knownSinceDate: string;   // e.g. "2022-02-14T00:00:00"
    heroSubtitle: string;
  };
  sender: {
    name: string;
    signature: string;
  };
  music: {
    title: string;
    artist: string;
    audioUrl?: string; // Optional custom MP3 URL
  };
  photos: PhotoItem[];
  reasons: ReasonItem[];
  loveLetter: {
    paragraphs: string[];
    postscript?: string;
  };
  miniGame: {
    targetScore: number;
    title: string;
    description: string;
    winMessage: string;
  };
}

export interface AppContextType {
  isUnlocked: boolean;
  unlockGift: () => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  gameScore: number;
  incrementScore: () => void;
  isGameWon: boolean;
  isCandleBlown: boolean;
  blowCandle: () => void;
  resetExperience: () => void;
  playSound: (type: SoundEffectType) => void;
}
