export function limit(x, min = 0, max = 1) {
  return Math.min(Math.max(x, min), max);
}
