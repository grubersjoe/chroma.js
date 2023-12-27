import { last } from '../../utils/last';
import { unpack } from '../../utils/unpack';
import { rgb2hsl } from '../hsl/rgb2hsl';
import { hsl2css } from './hsl2css';

const { round } = Math;

/*
 * supported arguments:
 * - rgb2css(r,g,b)
 * - rgb2css(r,g,b,a)
 * - rgb2css([r,g,b], mode)
 * - rgb2css([r,g,b,a], mode)
 * - rgb2css({r,g,b,a}, mode)
 */
export const rgb2css = (...args) => {
  const rgba = unpack(args, 'rgba');
  let mode = last(args) || 'rgb';
  if (mode.substring(0, 3) === 'hsl') {
    return hsl2css(rgb2hsl(rgba), mode);
  }
  rgba[0] = round(rgba[0]);
  rgba[1] = round(rgba[1]);
  rgba[2] = round(rgba[2]);
  if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1)) {
    rgba[3] = rgba.length > 3 ? rgba[3] : 1;
    mode = 'rgba';
  }
  return `${mode}(${rgba.slice(0, mode === 'rgb' ? 3 : 4).join(' ')})`;
};
