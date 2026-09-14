import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/Canvas.js';
import { drawButton, isInsideRect } from './Button.js';

const RETRY_BUTTON = { x: CANVAS_WIDTH / 2 - 100, y: CANVAS_HEIGHT / 2 + 30, w: 200, h: 56 };

export function renderGameOver(ctx, game) {
  ctx.fillStyle = 'rgba(30, 0, 0, 0.85)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ff5c5c';
  ctx.font = 'bold 48px monospace';
  ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

  ctx.fillStyle = '#ffffff';
  ctx.font = '22px monospace';
  ctx.fillText(`Final Score: ${game.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

  drawButton(ctx, RETRY_BUTTON, 'RETRY');
}

export function isRetryButtonClicked(x, y) {
  return isInsideRect(RETRY_BUTTON, x, y);
}
