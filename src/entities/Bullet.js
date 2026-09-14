const BULLET_SPEED = 640;
const BULLET_LIFESPAN = 1.1;

export function createBullet(x, y, angle) {
  return {
    x,
    y,
    vx: Math.cos(angle) * BULLET_SPEED,
    vy: Math.sin(angle) * BULLET_SPEED,
    radius: 4,
    life: BULLET_LIFESPAN,
    alive: true,
  };
}

export function updateBullet(bullet, dt) {
  bullet.x += bullet.vx * dt;
  bullet.y += bullet.vy * dt;
  bullet.life -= dt;
  if (bullet.life <= 0) bullet.alive = false;
}

export function renderBullet(ctx, bullet) {
  ctx.fillStyle = '#ffe066';
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#7a5c00';
  ctx.lineWidth = 1;
  ctx.stroke();
}
