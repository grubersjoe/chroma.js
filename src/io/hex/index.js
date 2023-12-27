import { Color } from '../../color';
import { to } from '../to';
import { hex2rgb } from './hex2rgb';
import { rgb2hex } from './rgb2hex.js';

export const hex = arg => new Color(hex2rgb(arg));
export const toHex = (c, mode = undefined) => to(c, c => rgb2hex(c._rgb, mode));
