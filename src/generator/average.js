import { fromMode } from '../io/mode';
import { rgb } from '../io/rgb/index';
import { alpha } from '../ops/alpha';
import { get } from '../ops/get';
import { clipRgb } from '../utils/clip';

const { pow, sqrt, PI, cos, sin, atan2 } = Math;

/**
 * @param colors Color[]
 * @param mode string
 * @param weights number[]
 */
export const average = (colors, mode = 'lrgb', weights = null) => {
  const l = colors.length;
  if (!weights) {
    weights = Array.from(new Array(l)).map(() => 1);
  }

  // normalize weights
  const k = l / weights.reduce((a, b) => a + b);

  weights.forEach((w, i) => {
    weights[i] *= k;
  });

  if (mode === 'lrgb') {
    return averageLrgb(colors, weights);
  }

  const first = colors.shift();
  const xyz = get(first, mode);
  const cnt = [];
  let dx = 0;
  let dy = 0;

  // initial color
  for (let i = 0; i < xyz.length; i++) {
    xyz[i] = (xyz[i] || 0) * weights[0];
    cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
    if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
      const A = (xyz[i] / 180) * PI;
      dx += cos(A) * weights[0];
      dy += sin(A) * weights[0];
    }
  }

  let a = alpha(first) * weights[0];
  colors.forEach((c, ci) => {
    const xyz2 = get(c, mode);
    a += alpha(c) * weights[ci + 1];
    for (let i = 0; i < xyz.length; i++) {
      if (!isNaN(xyz2[i])) {
        cnt[i] += weights[ci + 1];
        if (mode.charAt(i) === 'h') {
          const A = (xyz2[i] / 180) * PI;
          dx += cos(A) * weights[ci + 1];
          dy += sin(A) * weights[ci + 1];
        } else {
          xyz[i] += xyz2[i] * weights[ci + 1];
        }
      }
    }
  });

  for (let i = 0; i < xyz.length; i++) {
    if (mode.charAt(i) === 'h') {
      let A = (atan2(dy / cnt[i], dx / cnt[i]) / PI) * 180;
      while (A < 0) A += 360;
      while (A >= 360) A -= 360;
      xyz[i] = A;
    } else {
      xyz[i] = xyz[i] / cnt[i];
    }
  }
  a /= l;
  a = a > 0.99999 ? 1 : a;
  const c = fromMode(xyz, mode);

  return alpha(c, a, true);
};

const averageLrgb = (colors, weights) => {
  const l = colors.length;
  const rgba = [0, 0, 0, 0];

  for (let i = 0; i < colors.length; i++) {
    const col = colors[i];
    const f = weights[i] / l;
    const rgb = col._rgb;
    rgba[0] += pow(rgb[0], 2) * f;
    rgba[1] += pow(rgb[1], 2) * f;
    rgba[2] += pow(rgb[2], 2) * f;
    rgba[3] += rgb[3] * f;
  }

  rgba[0] = sqrt(rgba[0]);
  rgba[1] = sqrt(rgba[1]);
  rgba[2] = sqrt(rgba[2]);

  if (rgba[3] > 0.9999999) {
    rgba[3] = 1;
  }

  return rgb(clipRgb(rgba));
};
