import { CANVAS_WIDTH } from '../core/Canvas.js';

export function renderHud(ctx, game) {
  ctx.textBaseline = 'top';
  ctx.font = '20px monospace';

  const filled = Math.max(game.player.hp, 0);
  const empty = Math.max(game.player.maxHp - filled, 0);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff5c5c';
  ctx.fillText('HP: ' + '#'.repeat(filled) + '-'.repeat(empty), 16, 14);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Score: ${game.score}`, CANVAS_WIDTH - 16, 14);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffe066';
  ctx.fillText(`Level ${game.levelIndex + 1} / ${game.totalLevels}`, CANVAS_WIDTH / 2, 14);

  const remaining = Math.max(game.currentLevel.totalEnemies - game.enemiesDefeated, 0);
  ctx.fillStyle = '#8fd3ff';
  ctx.fillText(`Enemies left: ${remaining}`, CANVAS_WIDTH / 2, 38);
}
