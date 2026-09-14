const MAX_DELTA = 0.05;

export function startGameLoop(update, render) {
  let lastTime = performance.now();

  function frame(now) {
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    dt = Math.min(dt, MAX_DELTA);

    update(dt);
    render();

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
