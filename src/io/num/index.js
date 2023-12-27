import { Color } from '../../color';
import { to } from '../to';
import { num2rgb } from './num2rgb';
import { rgb2num } from './rgb2num.js';

export const num = arg => new Color(num2rgb(arg));
export const toNum = c => to(c, c => rgb2num(c._rgb));
