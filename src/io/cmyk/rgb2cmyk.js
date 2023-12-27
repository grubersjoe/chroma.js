import { unpack } from '../../utils/unpack';

export const rgb2cmyk = (...args) => {
  let [r, g, b] = unpack(args, 'rgb');
  r = r / 255;
  g = g / 255;
  b = b / 255;
  const k = 1 - Math.max(r, Math.max(g, b));
  const f = k < 1 ? 1 / (1 - k) : 0;
  const c = (1 - r - k) * f;
  const m = (1 - g - k) * f;
  const y = (1 - b - k) * f;
  return [c, m, y, k];
};
