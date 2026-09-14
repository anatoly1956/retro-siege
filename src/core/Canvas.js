export const CANVAS_WIDTH = 960;
export const CANVAS_HEIGHT = 640;

export function getCanvas() {
  const canvas = document.getElementById('gameCanvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
}
