import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';

export const rgb2rgb = (...args) => {
  const rgba = unpack(args, 'rgba');
  assertValidArgs(rgba, 3);

  return rgba;
};
