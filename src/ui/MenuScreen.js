import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core/Canvas.js';
import { drawButton, isInsideRect } from './Button.js';

const PLAY_BUTTON = { x: CANVAS_WIDTH / 2 - 90, y: CANVAS_HEIGHT / 2 + 30, w: 180, h: 56 };

export function renderMenu(ctx) {
  ctx.fillStyle = '#0d0d16';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#ffe066';
  ctx.font = 'bold 56px monospace';
  ctx.fillText('RETRO SIEGE', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);

  ctx.fillStyle = '#8fd3ff';
  ctx.font = '20px monospace';
  ctx.fillText('Arrows to move  |  Mouse to aim  |  Click to shoot', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
  ctx.fillText('Survive 5 waves of enemies closing in from every side.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 5);

  drawButton(ctx, PLAY_BUTTON, 'PLAY');
}

export function isPlayButtonClicked(x, y) {
  return isInsideRect(PLAY_BUTTON, x, y);
}
