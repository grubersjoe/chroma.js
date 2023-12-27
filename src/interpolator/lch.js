import { interpolateHsx } from './_hsx';

export const lch = (col1, col2, f) => {
  return interpolateHsx(col1, col2, f, 'lch');
};

export const hcl = lch;
