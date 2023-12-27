import { Color } from '../../color';
import { to } from '../to';
import { hcg2rgb } from './hcg2rgb';
import { rgb2hcg } from './rgb2hcg.js';

export const hcg = (...args) => new Color(hcg2rgb(...args));
export const toHcg = c => to(c, c => rgb2hcg(c._rgb));
