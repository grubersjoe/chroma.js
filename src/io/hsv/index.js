import { Color } from '../../color';
import { to } from '../to';
import { hsv2rgb } from './hsv2rgb';
import { rgb2hsv } from './rgb2hsv.js';

export const hsv = (...args) => new Color(hsv2rgb(...args));
export const toHsv = c => to(c, c => rgb2hsv(c._rgb));
