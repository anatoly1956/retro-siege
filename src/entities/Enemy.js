import { createAnimator } from '../sprites/Animator.js';
import { rasterize, drawScaled } from '../sprites/PixelSprite.js';
import {
  ENEMY_PALETTE,
  ENEMY_WALK_1,
  ENEMY_WALK_2,
  ENEMY_DEATH,
  ENEMY_ANCHOR,
  ENEMY_SCALE,
} from '../sprites/EnemySprites.js';

const walkSprites = [
  rasterize(ENEMY_WALK_1, ENEMY_PALETTE),
  rasterize(ENEMY_WALK_2, ENEMY_PALETTE),
];
const deathSprite = rasterize(ENEMY_DEATH, ENEMY_PALETTE);

const DEATH_DURATION = 0.25;

export function createEnemy(x, y, level) {
  return {
    x,
    y,
    radius: 18,
    speed: level.enemySpeed,
    hp: level.enemyHp,
    maxHp: level.enemyHp,
    angle: 0,
    dying: false,
    deathTimer: 0,
    walkAnim: createAnimator(walkSprites, 6),
    alive: true,
  };
}

export function updateEnemy(enemy, dt, player) {
  if (enemy.dying) {
    enemy.deathTimer -= dt;
    if (enemy.deathTimer <= 0) enemy.alive = false;
    return;
  }

  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const dist = Math.hypot(dx, dy) || 1;
  enemy.angle = Math.atan2(dy, dx);
  enemy.x += (dx / dist) * enemy.speed * dt;
  enemy.y += (dy / dist) * enemy.speed * dt;
  enemy.walkAnim.update(dt);
}

export function damageEnemy(enemy, amount) {
  if (enemy.dying) return false;
  enemy.hp -= amount;
  if (enemy.hp <= 0) {
    enemy.dying = true;
    enemy.deathTimer = DEATH_DURATION;
    return true;
  }
  return false;
}

export function renderEnemy(ctx, enemy) {
  const sprite = enemy.dying ? deathSprite : enemy.walkAnim.currentFrame();
  drawScaled(ctx, sprite, enemy.x, enemy.y, ENEMY_SCALE, enemy.angle, ENEMY_ANCHOR);
}
