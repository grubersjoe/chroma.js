import { interpolator } from '../interpolator';
import { alpha } from '../ops/alpha';

/**
 *
 * @param col1 Color
 * @param col2 Color
 * @param ratio number
 * @param mode string
 */
export const mix = (col1, col2, ratio = 0.5, mode = 'lrgb') => {
  if (!interpolator[mode]) {
    throw new Error(`interpolation mode ${mode} is not defined`);
  }

  return alpha(
    interpolator[mode](col1, col2, ratio),
    alpha(col1) + ratio * (alpha(col2) - alpha(col1)),
  );
};

export const interpolate = mix;
