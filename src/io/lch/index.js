import { Color } from '../../color';
import { to } from '../to';
import { hcl2rgb } from './hcl2rgb';
import { lch2rgb } from './lch2rgb';
import { rgb2lch } from './rgb2lch.js';

export const lch = (...args) => new Color(lch2rgb(...args));
export const hcl = (...args) => new Color(hcl2rgb(...args));

export const toLch = c => to(c, c => rgb2lch(c._rgb));
export const toHcl = c => to(c, c => rgb2lch(c._rgb).reverse());
