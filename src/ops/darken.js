import { lab } from '../io/lab';
import { LAB } from '../io/lab/lab-constants';
import { alpha } from './alpha';

export const darken = (color, amount = 1) => {
  const l = color.lab();
  l[0] -= LAB.Kn * amount;
  return alpha(lab(l), alpha(color), true);
};

export const brighten = (color, amount = 1) => darken(color, -amount);
