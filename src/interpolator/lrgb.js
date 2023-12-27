import { rgb } from '../io/rgb';

const { sqrt, pow } = Math;

export const lrgb = (col1, col2, f) => {
  const [x1, y1, z1] = col1._rgb;
  const [x2, y2, z2] = col2._rgb;
  return rgb(
    sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f),
    sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f),
    sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f),
  );
};
