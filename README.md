# 🎂 Interactive Birthday Website

A single-page, mobile-first **interactive birthday experience** built with **React 19, Vite, Tailwind CSS, Framer Motion, and Web Audio API**.

---

## ✨ Features & Interactive Mechanics

1. **Gatekeeper Hero Section:** Oversized gradient headline, waving Dino mascot, and an interactive 3D pulsing gift box. Tapping triggers a 360° multi-stage confetti explosion and smoothly unlocks the full experience.
2. **Moments & Relationship Counter:** Real-time ticking counter measuring days, hours, minutes, and seconds since you met, with peeking Dino mascot.
3. **3D Polaroid Memory Gallery:** Responsive photo grid with 3D cursor tilt on desktop, tap-to-flip 180° secret notes/inside jokes on mobile/desktop, and fullscreen lightbox view.
4. **"Reasons Why You're Irreplaceable" Card Stack:** Swipeable/draggable deck of reasons with swipe gestures, shuffle button, and cheering heart-eyes Dino.
5. **"Pop the Birthday Hearts" Mini-Game:** Interactive 10-heart popping challenge with instant sound effects, dynamic score tracking, victory trophy banner, and fireworks.
6. **Make a Wish & Candle Blowout:** 2-tier illustrated birthday cake with glowing animated flame. Tapping blows out the flame into rising smoke puffs, dims the ambiance, and triggers a heart shower.
7. **Typewriter Love Letter:** Soft-reveal letter that animates line-by-line as the recipient reaches the section, with ambient Lo-Fi background music integration.
8. **Celebration Outro & Replay:** Farewell celebratory mascot, sender signature, and "Replay Experience ↺" button that resets all states and scrolls back to the top.
9. **Zero-Dependency Web Audio Synth:** Instant pop, chime, whoosh, swipe, and victory sound effects with live equalizer visualizer and mute/unmute toggle.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Personalization (Single File Configuration)

All recipient details, photos, reasons, dates, letter paragraphs, and audio settings are centralized in **[`src/config/siteConfig.ts`](file:///c:/Users/mbbha/OneDrive/Desktop/Case%20Study/Bday/src/config/siteConfig.ts)**:

```typescript
export const siteConfig = {
  recipient: {
    name: 'Sarah',
    nickname: 'Cutie Pie',
    birthDate: '2001-09-02T00:00:00',
    knownSinceDate: '2022-03-15T18:30:00',
    heroSubtitle: 'Another 365 days of being the brightest star in my universe ✨',
  },
  sender: {
    name: 'Alex',
    signature: 'Forever & Always Your Biggest Fan 💖',
  },
  // Photos, reasons, and love letter paragraphs can all be edited directly in siteConfig.ts!
};
```
