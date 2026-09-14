const cache = new Map();

function keyFor(grid, palette) {
  return JSON.stringify(grid) + '|' + JSON.stringify(palette);
}

export function rasterize(grid, palette) {
  const key = keyFor(grid, palette);
  if (cache.has(key)) return cache.get(key);

  const h = grid.length;
  const w = grid[0].length;
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const octx = off.getContext('2d');
  octx.imageSmoothingEnabled = false;

  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const idx = grid[r][c];
      if (idx === 0) continue;
      octx.fillStyle = palette[idx];
      octx.fillRect(c, r, 1, 1);
    }
  }

  cache.set(key, off);
  return off;
}

export function drawScaled(ctx, sprite, x, y, scale, rotation = 0, anchor = null) {
  const w = sprite.width;
  const h = sprite.height;
  const ax = anchor ? anchor.col : w / 2;
  const ay = anchor ? anchor.row : h / 2;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.drawImage(sprite, -ax * scale, -ay * scale, w * scale, h * scale);
  ctx.restore();
}
