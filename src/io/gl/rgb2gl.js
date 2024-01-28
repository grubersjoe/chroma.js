import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';

export const rgb2gl = (...args) => {
  const rgb = unpack(args, 'rgba');
  assertValidArgs(rgb, 3);
  const [r, g, b, a] = rgb;
  return [r / 255, g / 255, b / 255, a ?? 1];
};
