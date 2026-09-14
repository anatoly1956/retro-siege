import { getCanvas } from './core/Canvas.js';
import { initInput } from './core/Input.js';
import { startGameLoop } from './core/GameLoop.js';
import { createGame } from './game/Game.js';

const { canvas, ctx } = getCanvas();
const game = createGame();

initInput(canvas, (x, y) => game.handleClick(x, y));

startGameLoop(
  (dt) => game.update(dt),
  () => game.render(ctx),
);
