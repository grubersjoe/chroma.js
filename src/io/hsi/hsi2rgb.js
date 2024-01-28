import { PITHIRD, TWOPI } from '../../utils';
import { limit } from '../../utils/limit';
import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';

const { cos } = Math;

/*
 * hue [0..360]
 * saturation [0..1]
 * intensity [0..1]
 */
export const hsi2rgb = (...args) => {
  args = unpack(args, 'hsi');
  assertValidArgs(args, 3);

  let [h, s, i] = args;
  let r, g, b;

  if (isNaN(h)) h = 0;
  if (isNaN(s)) s = 0;
  // normalize hue
  if (h > 360) h -= 360;
  if (h < 0) h += 360;
  h /= 360;
  if (h < 1 / 3) {
    b = (1 - s) / 3;
    r = (1 + (s * cos(TWOPI * h)) / cos(PITHIRD - TWOPI * h)) / 3;
    g = 1 - (b + r);
  } else if (h < 2 / 3) {
    h -= 1 / 3;
    r = (1 - s) / 3;
    g = (1 + (s * cos(TWOPI * h)) / cos(PITHIRD - TWOPI * h)) / 3;
    b = 1 - (r + g);
  } else {
    h -= 2 / 3;
    g = (1 - s) / 3;
    b = (1 + (s * cos(TWOPI * h)) / cos(PITHIRD - TWOPI * h)) / 3;
    r = 1 - (g + b);
  }
  r = limit(i * r * 3);
  g = limit(i * g * 3);
  b = limit(i * b * 3);

  return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};
