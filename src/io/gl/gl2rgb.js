import { unpack } from '../../utils/unpack';
import { assertArgsLength } from '../validate';

export const gl2rgb = (...args) => {
  const rgb = unpack(args, 'rgba');
  assertArgsLength(3, args);

  rgb[0] *= 255;
  rgb[1] *= 255;
  rgb[2] *= 255;

  return rgb;
};
