import { unpack } from '../../utils/unpack';
import { rgb2lab } from '../lab/rgb2lab';
import { lab2lch } from './lab2lch';

export const rgb2lch = (...args) => {
  const [r, g, b] = unpack(args, 'rgb');
  const [l, a, b_] = rgb2lab(r, g, b);
  return lab2lch(l, a, b_);
};
