import { interpolate } from '../generator/mix';
import { rgb } from '../io/rgb';

const EPS = 1e-7;
const MAX_ITER = 20;

export const luminance = (color, lum) => {
  if (lum !== undefined && typeof lum === 'number') {
    if (lum === 0) {
      // return pure black
      return rgb([0, 0, 0, color._rgb[3]]);
    }
    if (lum === 1) {
      // return pure white
      return rgb([255, 255, 255, color._rgb[3]]);
    }
    // compute new color using...
    let cur_lum = luminance(color);
    let mode = 'rgb';
    let max_iter = MAX_ITER;

    const test = (low, high) => {
      const mid = interpolate(low, high, 0.5, mode);
      const lm = luminance(mid);
      if (Math.abs(lum - lm) < EPS || !max_iter--) {
        // close enough
        return mid;
      }
      return lm > lum ? test(low, mid) : test(mid, high);
    };
    const _rgb = (
      cur_lum > lum ? test(rgb([0, 0, 0]), color) : test(color, rgb([255, 255, 255]))
    ).rgb();
    return rgb([..._rgb, color._rgb[3]]);
  }
  return rgb2luminance(...color._rgb.slice(0, 3));
};

const rgb2luminance = (r, g, b) => {
  // relative luminance
  // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  r = luminance_x(r);
  g = luminance_x(g);
  b = luminance_x(b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const luminance_x = x => {
  x /= 255;
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};
