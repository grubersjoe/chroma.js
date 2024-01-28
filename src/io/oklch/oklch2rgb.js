import { unpack } from '../../utils/unpack';
import { lch2lab } from '../lch/lch2lab';
import { oklab2rgb } from '../oklab/oklab2rgb';
import { assertValidArgs } from '../validate';

export const oklch2rgb = (...args) => {
  args = unpack(args, 'lch');
  assertValidArgs(args, 3);

  const [l, c, h] = args;
  const [L, a, b_] = lch2lab(l, c, h);
  const [r, g, b] = oklab2rgb(L, a, b_);

  return [r, g, b, args.length > 3 ? args[3] : 1];
};
