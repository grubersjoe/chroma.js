import { Color } from '../../color';
import { to } from '../to';
import { hcv2rgb } from './hcv2rgb';
import { rgb2hcv } from './rgb2hcv.js';

export const hcv = (...args) => new Color(hcv2rgb(...args));
export const toHcv = c => to(c, c => rgb2hcv(c._rgb));
