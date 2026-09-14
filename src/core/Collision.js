export function circleIntersect(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const rSum = a.radius + b.radius;
  return dx * dx + dy * dy <= rSum * rSum;
}
