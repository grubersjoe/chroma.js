import { unpack } from '../../utils/unpack';
import { LAB } from './lab-constants';

const { pow } = Math;

export const rgb2lab = (...args) => {
  const [r, g, b] = unpack(args, 'rgb');
  const [x, y, z] = rgb2xyz(r, g, b);
  const l = 116 * y - 16;
  return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
};

const rgb_xyz = r => {
  if ((r /= 255) <= 0.04045) return r / 12.92;
  return pow((r + 0.055) / 1.055, 2.4);
};

const xyz_lab = t => {
  if (t > LAB.t3) return pow(t, 1 / 3);
  return t / LAB.t2 + LAB.t0;
};

const rgb2xyz = (r, g, b) => {
  r = rgb_xyz(r);
  g = rgb_xyz(g);
  b = rgb_xyz(b);
  const x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB.Xn);
  const y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.072175 * b) / LAB.Yn);
  const z = xyz_lab((0.0193339 * r + 0.119192 * g + 0.9503041 * b) / LAB.Zn);
  return [x, y, z];
};
