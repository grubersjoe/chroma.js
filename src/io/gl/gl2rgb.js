import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';

export const gl2rgb = (...args) => {
  args = unpack(args, 'rgba');
  assertValidArgs(args, 3);
  const [r, g, b, a] = args;
  return [r * 255, g * 255, b * 255, a ?? 1];
};
