import { unpack } from '../../utils/unpack';
import { assertValidArgs } from '../validate';
import { LAB } from './lab-constants';

/*
 * L [0..100]
 * a [-100..100]
 * b [-100..100]
 */
export const lab2rgb = (...args) => {
  args = unpack(args, 'lab');
  assertValidArgs(args, 3);

  const [l, a, b] = args;
  let x, y, z, r, g, b_;

  y = (l + 16) / 116;
  x = isNaN(a) ? y : y + a / 500;
  z = isNaN(b) ? y : y - b / 200;

  y = LAB.Yn * lab_xyz(y);
  x = LAB.Xn * lab_xyz(x);
  z = LAB.Zn * lab_xyz(z);

  r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
  g = xyz_rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z);
  b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

  return [r, g, b_, args[3] ?? 1];
};

const xyz_rgb = r => {
  return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055);
};

const lab_xyz = t => {
  return t > LAB.t1 ? Math.pow(t, 3) : LAB.t2 * (t - LAB.t0);
};
