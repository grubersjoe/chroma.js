import { Color } from '../../color';
import { to } from '../to';
import { rgb2temp } from './rgb2temp.js';
import { temp2rgb } from './temp2rgb';

export const temp = arg => new Color(temp2rgb(arg));
export const toTemp = c => to(c, c => rgb2temp(c._rgb));
