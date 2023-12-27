import { Color } from '../../color';
import { to } from '../to';
import { cmyk2rgb } from './cmyk2rgb';
import { rgb2cmyk } from './rgb2cmyk.js';

export const cmyk = (...args) => new Color(cmyk2rgb(...args));
export const toCmyk = c => to(c, c => rgb2cmyk(c));
