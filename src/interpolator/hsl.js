import { interpolateHsx } from './_hsx';

export const hsl = (col1, col2, f) => {
  return interpolateHsx(col1, col2, f, 'hsl');
};
