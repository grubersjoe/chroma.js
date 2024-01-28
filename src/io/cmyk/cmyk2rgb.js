import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';

export const cmyk2rgb = (...args) => {
  args = unpack(args, 'cmyk');
  assertValidArgs(args, 4);

  const [c, m, y, k] = args;
  const alpha = args[4] ?? 1;

  if (k === 1) {
    return [0, 0, 0, alpha];
  }

  return [
    c >= 1 ? 0 : 255 * (1 - c) * (1 - k), // r
    m >= 1 ? 0 : 255 * (1 - m) * (1 - k), // g
    y >= 1 ? 0 : 255 * (1 - y) * (1 - k), // b
    alpha,
  ];
};
