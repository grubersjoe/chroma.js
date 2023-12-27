import { Color } from '../../color';
import { to } from '../to';
import { oklch2rgb } from './oklch2rgb';
import { rgb2oklch } from './rgb2oklch.js';

export const oklch = (...args) => new Color(oklch2rgb(...args));
export const toOklch = c => to(c, c => rgb2oklch(c._rgb));
