export function createAnimator(frames, fps) {
  let t = 0;
  let index = 0;
  const frameTime = 1 / fps;

  return {
    update(dt) {
      t += dt;
      while (t >= frameTime) {
        t -= frameTime;
        index = (index + 1) % frames.length;
      }
    },
    currentFrame() {
      return frames[index];
    },
    reset() {
      t = 0;
      index = 0;
    },
  };
}
