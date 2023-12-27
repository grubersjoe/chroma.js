import { interpolateHsx } from './_hsx';

export const oklch = (col1, col2, f) => {
  return interpolateHsx(col1, col2, f, 'oklch');
};
