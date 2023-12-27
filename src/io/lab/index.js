import { Color } from '../../color';
import { to } from '../to';
import { lab2rgb } from './lab2rgb';
import { rgb2lab } from './rgb2lab.js';

export const lab = (...args) => new Color(lab2rgb(...args));
export const toLab = c => to(c, c => rgb2lab(c._rgb));
