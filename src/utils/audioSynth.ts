import type { SoundEffectType } from '../types';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public playSound(type: SoundEffectType, isMuted: boolean = false): void {
    if (isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case 'pop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'chime': {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.2, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.45);
        });
        break;
      }

      case 'confetti':
      case 'victory': {
        const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major arpeggio
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0.25, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.55);
        });
        break;
      }

      case 'whoosh': {
        // Soft wind / candle extinguish sound
        const bufferSize = ctx.sampleRate * 0.35;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 0.35);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.35);
        break;
      }

      case 'swipe': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.06);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'click':
      default: {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
    }
  }

  public startLofiAmbientBgm(): void {
    const ctx = this.getContext();
    if (!ctx || this.isBgmPlaying) return;

    this.isBgmPlaying = true;
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.18, ctx.currentTime);
    this.bgmGain.connect(ctx.destination);

    // Notes for "Happy Birthday to You" Music Box in Key of C
    // Frequencies: G4=392, A4=440, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
    interface MelodyStep {
      pitch: number;
      duration: number; // in beats (1 beat = 0.48s)
      chord?: number[];
    }

    const BEAT = 0.48; // Tempo ~ 125 BPM
    const song: MelodyStep[] = [
      // "Happy Birthday to you"
      { pitch: 392.00, duration: 0.75 },
      { pitch: 392.00, duration: 0.25 },
      { pitch: 440.00, duration: 1.0, chord: [261.63, 329.63] }, // C chord
      { pitch: 392.00, duration: 1.0 },
      { pitch: 523.25, duration: 1.0 },
      { pitch: 493.88, duration: 2.0, chord: [196.00, 246.94] }, // G chord

      // "Happy Birthday to you"
      { pitch: 392.00, duration: 0.75 },
      { pitch: 392.00, duration: 0.25 },
      { pitch: 440.00, duration: 1.0, chord: [196.00, 293.66] },
      { pitch: 392.00, duration: 1.0 },
      { pitch: 587.33, duration: 1.0 },
      { pitch: 523.25, duration: 2.0, chord: [261.63, 329.63] }, // C chord

      // "Happy Birthday dear V..."
      { pitch: 392.00, duration: 0.75 },
      { pitch: 392.00, duration: 0.25 },
      { pitch: 783.99, duration: 1.0, chord: [261.63, 392.00] },
      { pitch: 659.25, duration: 1.0 },
      { pitch: 523.25, duration: 1.0, chord: [174.61, 220.00, 261.63] }, // F chord
      { pitch: 493.88, duration: 1.0 },
      { pitch: 440.00, duration: 2.0 },

      // "Happy Birthday to you!"
      { pitch: 698.46, duration: 0.75 },
      { pitch: 698.46, duration: 0.25 },
      { pitch: 659.25, duration: 1.0, chord: [261.63, 329.63] }, // C chord
      { pitch: 523.25, duration: 1.0 },
      { pitch: 587.33, duration: 1.0, chord: [196.00, 246.94, 293.66] }, // G7 chord
      { pitch: 523.25, duration: 2.5, chord: [261.63, 329.63, 523.25] }, // C chord
      { pitch: 0, duration: 1.5 }, // Brief pause before repeat
    ];

    const playBellNote = (freq: number, startTime: number, duration: number) => {
      if (!this.ctx || !this.bgmGain || freq <= 0) return;

      // Primary Music Box Bell Tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Bell Harmonic Overtone
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.01, startTime);

      const noteDuration = Math.max(0.4, duration * BEAT * 1.4);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

      overtoneGain.gain.setValueAtTime(0.08, startTime);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration * 0.5);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      gain.connect(this.bgmGain);
      overtoneGain.connect(this.bgmGain);

      osc.start(startTime);
      osc.stop(startTime + noteDuration);
      overtone.start(startTime);
      overtone.stop(startTime + noteDuration);
    };

    const playChordPad = (frequencies: number[], startTime: number, duration: number) => {
      if (!this.ctx || !this.bgmGain) return;
      const padDuration = duration * BEAT * 1.8;

      frequencies.forEach((freq) => {
        if (!this.ctx || !this.bgmGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.04, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + padDuration);

        osc.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(startTime);
        osc.stop(startTime + padDuration);
      });
    };

    let stepIdx = 0;
    let nextNoteTime = ctx.currentTime + 0.1;

    const scheduleNextNotes = () => {
      if (!this.isBgmPlaying || !this.ctx) return;

      const step = song[stepIdx % song.length];
      stepIdx++;

      if (step.pitch > 0) {
        playBellNote(step.pitch, nextNoteTime, step.duration);
      }
      if (step.chord) {
        playChordPad(step.chord, nextNoteTime, step.duration);
      }

      nextNoteTime += step.duration * BEAT;
      const delayMs = Math.max(20, (nextNoteTime - this.ctx.currentTime - 0.05) * 1000);
      this.bgmInterval = window.setTimeout(scheduleNextNotes, delayMs);
    };

    scheduleNextNotes();
  }

  public stopLofiAmbientBgm(): void {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      window.clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const synth = new SoundSynthesizer();
