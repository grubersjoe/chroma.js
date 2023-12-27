import { unpack } from '../../utils/unpack';
import { lab2rgb } from '../lab/lab2rgb';
import { assertArgsLength } from '../validate';
import { lch2lab } from './lch2lab';

export const lch2rgb = (...args) => {
  args = unpack(args, 'lch');
  assertArgsLength(3, args);

  const [l, c, h] = args;
  const [L, a, b_] = lch2lab(l, c, h);
  const [r, g, b] = lab2rgb(L, a, b_);

  return [r, g, b, args.length > 3 ? args[3] : 1];
};
