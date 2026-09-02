import confetti from 'canvas-confetti';

export const fireGiftExplosion = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#FF3EA5', '#FFE066', '#38BDF8'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#8B5CF6', '#5EEAD4', '#FF3EA5'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FF3EA5', '#8B5CF6', '#FFE066', '#38BDF8'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['circle'],
    colors: ['#5EEAD4', '#FF3EA5'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#FF3EA5', '#8B5CF6'],
  });
};

export const fireHeartShower = () => {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#FF3EA5', '#FF70A6', '#FF9770', '#FFD670', '#8B5CF6'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const fireFireworks = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FF3EA5', '#8B5CF6', '#38BDF8', '#FFE066'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#5EEAD4', '#FF3EA5', '#FFE066', '#8B5CF6'],
    });
  }, 250);
};
