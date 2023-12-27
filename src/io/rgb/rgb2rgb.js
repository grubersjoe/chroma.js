import { unpack } from '../../utils/unpack';

export const rgb2rgb = (...args) => {
  const rgba = unpack(args, 'rgba');
  if ((args.length < 3 && args.length > 4) || (args.length === 4 && (args[3] < 0 || args[3] > 1))) {
    throw new Error(`invalid arguments: ${args}`);
  }

  if (rgba[3] === undefined) {
    rgba[3] = 1;
  }
  return rgba;
};
