# 🎂 Birthday Website — Project Context

## 1. Overview
Build a single-page, mobile-first **interactive birthday website** to surprise someone special. The vibe is **Gen-Z bright + lovey-dovey**: playful, colorful, meme-aware, emoji-heavy, with soft romantic undertones — not a stiff greeting card. Think *"TikTok aesthetic meets love letter."*

> [!IMPORTANT]
> **Goal:** The recipient opens the link, feels delighted within 3 seconds, and keeps scrolling/clicking because every section has a small interactive surprise.

---

## 2. Tech Stack (for Antigravity)
- **Framework:** React (Vite) — single page app, component-based
- **Styling:** Tailwind CSS (utility-first, fast iteration)
- **Animation:** Framer Motion (page/section transitions, hover/tap micro-interactions), `canvas-confetti` (bursts)
- **Icons:** `lucide-react`
- **Fonts:** Google Fonts — a bubbly display font for headings + a clean rounded sans for body (see Typography)
- **Deployment target:** Static build (Vercel/Netlify-friendly), no backend required
- **Optional:** Howler.js or `<audio>` tag for background music toggle

---

## 3. Design Language

### Color Palette (Gen-Z Bright)
- **Primary Gradient:** Hot pink (`#FF3EA5`) → Violet (`#8B5CF6`) → Sky blue (`#38BDF8`)
- **Accent:** Lemon yellow (`#FFE066`), Mint (`#5EEAD4`)
- **Background:** Soft cream (`#FFF9F0`) or dark "cozy night" mode (`#1A1025`) with neon accents
- Use **gradient blobs**, not flat blocks — soft, glowy, blurred shapes floating in background

### Typography
- **Headings:** Rounded/bubble display font (e.g., *Baloo 2*, *Fredoka*, or *Poppins ExtraBold*)
- **Body:** *Inter* or *Nunito* for readability
- Big oversized text for hero (*"HAPPY BIRTHDAY [NAME] 🎉"*)

### Illustration Style — Cute Cartoons 🎨
- Use **original, cute-doodle-style cartoon illustrations** throughout — think kawaii/chibi characters, rounded shapes, big eyes, soft outlines *(NOT copyrighted characters like Disney/Sanrio/Pixar — generate original mascots instead)*
- **Ideas for recurring cartoon elements:**
  - Tiny chibi couple/mascot pair reacting to scroll/clicks (waving, blushing, holding a balloon)
  - Cartoon cake, balloons, gift boxes, party hats as floating decorative stickers
  - Doodle hearts, stars, and squiggles as background texture
  - A cute animal mascot (cat/bear/bunny) that "guides" the user through sections with speech-bubble captions
- **Style reference:** Flat-vector kawaii illustration (like sticker packs) — bold outlines, pastel-meets-neon fills, slight bounce animation on idle
- Use these as **SVG or Lottie/animated stickers** where possible so they can wiggle, blink, or bounce — static PNGs as fallback
- Sprinkle cartoons contextually: mascot celebrates at confetti moment, peeks out during gallery, "blows" candle with user in wish section

### Mascot / Illustration Style — Cute Dinos 🦕🦖
- Use a **chibi/kawaii cartoon dino** as a recurring mascot character throughout the site — rounded bodies, big sparkly eyes, tiny arms, blush cheeks
- **Suggested sources:** Open-license kawaii dino illustration/sticker packs (e.g., from unDraw, Storyset, Freepik, or Flaticon — flat/cute vector style matching color palette), or custom dino art matching the pink/violet/mint palette
- **Give the dino small "jobs" across the site:**
  - **Hero section:** Dino holding a balloon or birthday hat, waving to say hi
  - **Loading/transition states:** Dino doing a little bounce/spin animation
  - **Countdown section:** Dino peeking from behind number flip cards
  - **Gallery:** Small dino sticker in the corner of a couple photo cards
  - **Wish/candle section:** Dino blowing the candle out alongside the user
  - **Outro:** Dino holding a "Thanks for visiting!" sign, waving goodbye
- Keep expressions varied (excited, blushing/in love with heart eyes, sleepy, celebrating) and reuse character design across sections for consistency
- Dino can also appear as a subtle repeating pattern/background motif (small line-art dino footprints or silhouettes) at low opacity behind sections

### Motion & Feel
- Everything should feel **bouncy** — spring-based transitions, not linear
- **Hover states:** Wiggle, scale-up, tilt
- Scroll-triggered reveals (fade + slide up) per section
- Confetti/heart bursts on key interactions (button clicks, countdown hitting zero, etc.)
- Sparkle/heart cursor trail *(optional, desktop only)*

---

## 4. Site Structure & Interactive Sections

1. **Landing / Hero**
   - Full-screen gradient background, floating emojis (🎈🎂💖✨) drifting slowly
   - Big animated headline + subheading
   - *"Tap to open your gift 🎁"* button → triggers confetti + reveals rest of site (scroll unlock)

2. **Countdown / Special Moment Counter**
   - Live counter: *"We've known each other for X days"* or countdown to the exact birthday moment
   - Animated flipping numbers

3. **Photo / Memory Gallery**
   - Interactive polaroid-style photo grid, cards tilt/flip on hover/tap
   - Each photo has a short caption/inside joke on flip-back

4. **"Reasons I Love You" / Message Wall**
   - Scrollable stack of cute cards (like a stack of sticky notes) — swipe or tap to cycle through custom messages
   - Randomized order for replay value

5. **Interactive Mini-Game (Gen-Z fun factor)**
   - Simple, low-effort game: e.g., *"pop the hearts,"* a birthday-themed quiz about the person, or a *"click to reveal surprise"* scratch-card effect
   - Keeps it playful, not just passive reading

6. **Wish / Button Section**
   - Big glowing *"Make a Wish 🕯️"* button → blows out candle animation + confetti + final message reveal

7. **Final Love Letter**
   - Slow-reveal, typewriter-effect personal message
   - Background music toggle (soft romantic/lofi track) starts here if not already on

8. **Outro / Signature**
   - Signed with sender's name, animated hearts floating up, replay button to restart experience

---

## 5. Copy Tone
- Playful, warm, a little chaotic-cute — emojis mixed into real sentences
- Mix of genuine romantic lines with Gen-Z humor/slang (used naturally, not forced)
- Personalize every placeholder: `[Their Name]`, `[Inside Joke]`, `[How We Met]`, `[Number of Years/Days]`, `[Your Name]`

---

## 6. Interactivity Checklist
- [ ] Recurring kawaii dino mascot appears in at least 4 sections with a different pose/expression each time
- [ ] Confetti/heart burst on at least 2 key actions
- [ ] At least one flip/tilt/hover card interaction
- [ ] Scroll-triggered animations throughout
- [ ] One mini-game or "surprise reveal" mechanic
- [ ] Background music toggle
- [ ] Fully responsive (mobile-first — most gifts get opened on phone)
- [ ] Replay/reset option at the end

---

## 7. Personalization Slots to Fill Before Launch
Replace all bracketed placeholders with real content:
- [ ] Recipient's name
- [ ] 5–10 photos + captions
- [ ] 5–8 "reasons I love you" lines
- [ ] Final love letter paragraph
- [ ] Sender's name/signature
- [ ] Optional: song choice for background music

---

## 8. Notes for Antigravity Build
- Keep everything in one scrollable page with anchor-based section transitions (no multi-page routing needed)
- Prioritize mobile viewport testing first
- Keep bundle light — compress images, lazy-load gallery section
- Ship with placeholder content wired in so the structure can be previewed immediately, then swapped with real photos/text
