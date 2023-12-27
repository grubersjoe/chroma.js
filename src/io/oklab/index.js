import { Color } from '../../color';
import { to } from '../to';
import { oklab2rgb } from './oklab2rgb';
import { rgb2oklab } from './rgb2oklab.js';

export const oklab = (...args) => new Color(oklab2rgb(...args));
export const toOklab = c => to(c, c => rgb2oklab(c._rgb));
