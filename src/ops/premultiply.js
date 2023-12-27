import { rgb } from '../io/rgb';

export const premultiply = (color, mutate = false) => {
  const _rgb = color._rgb;
  const a = _rgb[3];
  if (mutate) {
    color._rgb = [_rgb[0] * a, _rgb[1] * a, _rgb[2] * a, a];
    return color;
  }
  return rgb([_rgb[0] * a, _rgb[1] * a, _rgb[2] * a, a]);
};
