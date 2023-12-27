import { Color } from '../../color';
import { to } from '../to';
import { css2rgb } from './css2rgb';
import { rgb2css } from './rgb2css.js';

export const css = arg => new Color(css2rgb(arg));
export const toCss = (c, mode = undefined) => to(c, c => rgb2css(c._rgb, mode));
