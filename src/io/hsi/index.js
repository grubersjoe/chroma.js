import { Color } from '../../color';
import { to } from '../to';
import { hsi2rgb } from './hsi2rgb';
import { rgb2hsi } from './rgb2hsi.js';

export const hsi = (...args) => new Color(hsi2rgb(...args));
export const toHsi = c => to(c, c => rgb2hsi(c._rgb));
