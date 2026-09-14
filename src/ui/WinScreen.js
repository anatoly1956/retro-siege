import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/Canvas.js';
import { drawButton, isInsideRect } from './Button.js';

const PLAY_AGAIN_BUTTON = { x: CANVAS_WIDTH / 2 - 110, y: CANVAS_HEIGHT / 2 + 30, w: 220, h: 56 };

export function renderWin(ctx, game) {
  ctx.fillStyle = 'rgba(10, 25, 10, 0.85)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#7cfc98';
  ctx.font = 'bold 48px monospace';
  ctx.fillText('YOU WIN!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

  ctx.fillStyle = '#ffffff';
  ctx.font = '22px monospace';
  ctx.fillText(`Final Score: ${game.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

  drawButton(ctx, PLAY_AGAIN_BUTTON, 'PLAY AGAIN');
}

export function isPlayAgainButtonClicked(x, y) {
  return isInsideRect(PLAY_AGAIN_BUTTON, x, y);
}
