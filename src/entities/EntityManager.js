import { updateEnemy, renderEnemy } from './Enemy.js';
import { updateBullet, renderBullet } from './Bullet.js';

export function createEntityManager() {
  return {
    enemies: [],
    bullets: [],
  };
}

export function updateAll(manager, dt, player) {
  for (const enemy of manager.enemies) {
    updateEnemy(enemy, dt, player);
  }
  for (const bullet of manager.bullets) {
    updateBullet(bullet, dt);
  }
}

export function renderAll(manager, ctx) {
  for (const bullet of manager.bullets) {
    renderBullet(ctx, bullet);
  }
  for (const enemy of manager.enemies) {
    renderEnemy(ctx, enemy);
  }
}

export function pruneDead(manager) {
  manager.enemies = manager.enemies.filter((e) => e.alive);
  manager.bullets = manager.bullets.filter((b) => b.alive);
}
