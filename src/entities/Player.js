import { createAnimator } from '../sprites/Animator.js';
import { rasterize, drawScaled } from '../sprites/PixelSprite.js';
import {
  PLAYER_PALETTE,
  PLAYER_IDLE,
  PLAYER_WALK_1,
  PLAYER_WALK_2,
  PLAYER_SHOOT,
  PLAYER_ANCHOR,
  PLAYER_SCALE,
} from '../sprites/PlayerSprites.js';

const idleSprite = rasterize(PLAYER_IDLE, PLAYER_PALETTE);
const walkSprites = [
  rasterize(PLAYER_WALK_1, PLAYER_PALETTE),
  rasterize(PLAYER_WALK_2, PLAYER_PALETTE),
];
const shootSprite = rasterize(PLAYER_SHOOT, PLAYER_PALETTE);

const INVULN_DURATION = 1.0;

export function createPlayer(x, y) {
  return {
    x,
    y,
    radius: 16,
    speed: 220,
    angle: 0,
    hp: 5,
    maxHp: 5,
    invulnTimer: 0,
    shootFlashTimer: 0,
    moving: false,
    walkAnim: createAnimator(walkSprites, 10),
    alive: true,
  };
}

export function updatePlayer(player, dt, input, bounds) {
  let dx = 0;
  let dy = 0;
  if (input.keys.has('ArrowUp')) dy -= 1;
  if (input.keys.has('ArrowDown')) dy += 1;
  if (input.keys.has('ArrowLeft')) dx -= 1;
  if (input.keys.has('ArrowRight')) dx += 1;

  const len = Math.hypot(dx, dy);
  player.moving = len > 0;
  if (len > 0) {
    dx /= len;
    dy /= len;
    player.x += dx * player.speed * dt;
    player.y += dy * player.speed * dt;
    player.walkAnim.update(dt);
  }

  player.x = Math.max(bounds.minX, Math.min(bounds.maxX, player.x));
  player.y = Math.max(bounds.minY, Math.min(bounds.maxY, player.y));

  player.angle = Math.atan2(input.mouseY - player.y, input.mouseX - player.x);

  if (player.invulnTimer > 0) player.invulnTimer -= dt;
  if (player.shootFlashTimer > 0) player.shootFlashTimer -= dt;
}

export function damagePlayer(player, amount) {
  if (player.invulnTimer > 0) return;
  player.hp -= amount;
  player.invulnTimer = INVULN_DURATION;
  if (player.hp <= 0) {
    player.hp = 0;
    player.alive = false;
  }
}

export function renderPlayer(ctx, player) {
  if (player.invulnTimer > 0) {
    const blinkOff = Math.floor(player.invulnTimer * 12) % 2 === 0;
    if (blinkOff) return;
  }

  let sprite = idleSprite;
  if (player.shootFlashTimer > 0) {
    sprite = shootSprite;
  } else if (player.moving) {
    sprite = player.walkAnim.currentFrame();
  }

  drawScaled(ctx, sprite, player.x, player.y, PLAYER_SCALE, player.angle, PLAYER_ANCHOR);
}
