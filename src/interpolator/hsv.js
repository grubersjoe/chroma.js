import { interpolateHsx } from './_hsx';

export const hsv = (col1, col2, f) => {
  return interpolateHsx(col1, col2, f, 'hsv');
};
