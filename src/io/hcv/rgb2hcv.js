import { unpack } from '../../utils/unpack';
import { rgb2gl } from '../gl/rgb2gl';

export const rgb2hcv = (...args) => {
  args = unpack(args, 'rgba');
  const [r, g, b] = rgb2gl(...args);
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = max - min;

  let grayscale;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }

  let hue;
  if (chroma > 0) {
    if (max === r) {
      hue = ((g - b) / chroma) % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue = hue % 1;
  } else {
    hue = 0;
  }
  return [hue * 360, chroma, grayscale];
};
