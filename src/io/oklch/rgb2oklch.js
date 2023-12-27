import { unpack } from '../../utils/unpack';
import { lab2lch } from '../lch/lab2lch';
import { rgb2oklab } from '../oklab/rgb2oklab';

export const rgb2oklch = (...args) => {
  const [r, g, b] = unpack(args, 'rgb');
  const [l, a, b_] = rgb2oklab(r, g, b);
  return lab2lch(l, a, b_);
};
