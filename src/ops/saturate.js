import { LAB } from '../io/lab/lab-constants';
import { lch } from '../io/lch';
import { alpha } from './alpha';

export const saturate = (color, amount = 1) => {
  const l = color.lch();
  l[1] += LAB.Kn * amount;
  if (l[1] < 0) l[1] = 0;
  return alpha(lch(l), alpha(color), true);
};

export const desaturate = (color, amount = 1) => saturate(color, -amount);
