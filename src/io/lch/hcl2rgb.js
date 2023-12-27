import { unpack } from '../../utils/unpack';
import { lch2rgb } from './lch2rgb';

export const hcl2rgb = (...args) => {
  args = unpack(args, 'hcl').reverse();
  if (args.length !== 3) {
    throw new Error(`invalid arguments: ${args}`);
  }

  return lch2rgb(...args);
};
