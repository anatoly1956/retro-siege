import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/Canvas.js';
import { drawButton, isInsideRect } from './Button.js';

const NEXT_BUTTON = { x: CANVAS_WIDTH / 2 - 100, y: CANVAS_HEIGHT / 2 + 30, w: 200, h: 56 };

export function renderLevelComplete(ctx, game) {
  ctx.fillStyle = 'rgba(10, 10, 20, 0.85)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffe066';
  ctx.font = 'bold 42px monospace';
  ctx.fillText(`LEVEL ${game.levelIndex + 1} COMPLETE`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

  ctx.fillStyle = '#8fd3ff';
  ctx.font = '22px monospace';
  ctx.fillText(`Score: ${game.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

  drawButton(ctx, NEXT_BUTTON, 'NEXT LEVEL');
}

export function isNextButtonClicked(x, y) {
  return isInsideRect(NEXT_BUTTON, x, y);
}
