import { createEnemy } from '../entities/Enemy.js';

const INITIAL_DELAY = 0.75;

export function createSpawnManager() {
  return { timer: INITIAL_DELAY, spawnedCount: 0 };
}

export function resetSpawnManager(spawner) {
  spawner.timer = INITIAL_DELAY;
  spawner.spawnedCount = 0;
}

function randRange([min, max]) {
  return min + Math.random() * (max - min);
}

export function updateSpawning(spawner, dt, level, manager, canvasWidth, canvasHeight) {
  if (spawner.spawnedCount >= level.totalEnemies) return;

  spawner.timer -= dt;
  if (spawner.timer > 0) return;

  const angle = Math.random() * Math.PI * 2;
  const spawnRadius = Math.max(canvasWidth, canvasHeight) * 0.65;
  const cx = canvasWidth / 2;
  const cy = canvasHeight / 2;
  const x = cx + Math.cos(angle) * spawnRadius;
  const y = cy + Math.sin(angle) * spawnRadius;

  manager.enemies.push(createEnemy(x, y, level));
  spawner.spawnedCount += 1;
  spawner.timer = randRange(level.spawnIntervalRange);
}

export function levelFullyCleared(spawner, level, manager) {
  return spawner.spawnedCount >= level.totalEnemies && manager.enemies.length === 0;
}
