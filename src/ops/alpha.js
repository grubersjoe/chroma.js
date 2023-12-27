import { rgb } from '../io/rgb';

export const alpha = function (color, alpha = undefined, mutate = false) {
  if (alpha !== undefined && typeof alpha === 'number') {
    if (mutate) {
      color._rgb[3] = alpha;
      return color;
    }
    return rgb([color._rgb[0], color._rgb[1], color._rgb[2], alpha]);
  }
  return color._rgb[3];
};
