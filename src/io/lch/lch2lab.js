import { DEG2RAD } from '../../utils';
import { unpack } from '../../utils/unpack';

/**
 * Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
 * These formulas were invented by David Dalrymple to obtain maximum contrast without going
 * out of gamut if the parameters are in the range 0-1.
 *
 * A saturation multiplier was added by Gregor Aisch.
 */
export const lch2lab = (...args) => {
  let [l, c, h] = unpack(args, 'lch');
  if (isNaN(h)) h = 0;
  h = h * DEG2RAD;
  return [l, Math.cos(h) * c, Math.sin(h) * c];
};
