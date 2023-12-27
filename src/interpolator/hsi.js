import { interpolateHsx } from './_hsx';

export const hsi = (col1, col2, f) => {
  return interpolateHsx(col1, col2, f, 'hsi');
};
