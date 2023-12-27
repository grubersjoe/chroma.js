import { Color } from '../../color';
import { to } from '../to';
import { rgb2rgb } from './rgb2rgb';

export const rgb = (...args) => new Color(rgb2rgb(...args));

export const toRgb = (c, round = true) =>
  to(c, c => {
    const rgb = c._rgb.slice(0, 3);
    return round ? rgb.map(Math.round) : rgb;
  });

export const toRgba = (c, round = true) =>
  to(c, c =>
    c._rgb.slice(0, 4).map((v, i) => {
      return i < 3 ? (round ? Math.round(v) : v) : v;
    }),
  );
