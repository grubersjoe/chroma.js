import { Color } from '../../color';
import { to } from '../to';
import { hsl2rgb } from './hsl2rgb';
import { rgb2hsl } from './rgb2hsl.js';

export const hsl = (...args) => new Color(hsl2rgb(...args));
export const toHsl = c => to(c, c => rgb2hsl(c._rgb));
