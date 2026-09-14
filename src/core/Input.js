export const InputState = {
  keys: new Set(),
  mouseX: 0,
  mouseY: 0,
  mouseClicked: false,
};

function toCanvasCoords(canvas, clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

export function initInput(canvas, onClick) {
  window.addEventListener('keydown', (e) => {
    if (e.key.startsWith('Arrow')) e.preventDefault();
    InputState.keys.add(e.key);
  });

  window.addEventListener('keyup', (e) => {
    InputState.keys.delete(e.key);
  });

  canvas.addEventListener('mousemove', (e) => {
    const { x, y } = toCanvasCoords(canvas, e.clientX, e.clientY);
    InputState.mouseX = x;
    InputState.mouseY = y;
  });

  canvas.addEventListener('click', (e) => {
    const { x, y } = toCanvasCoords(canvas, e.clientX, e.clientY);
    InputState.mouseX = x;
    InputState.mouseY = y;
    InputState.mouseClicked = true;
    if (onClick) onClick(x, y);
  });
}
