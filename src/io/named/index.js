import { Color } from '../../color';
import { to } from '../to';
import { name2rgb } from './name2rgb';
import { rgb2name } from './rgb2name';

export const named = name => new Color(name2rgb(name));
export const toName = c => to(c, c => rgb2name(c._rgb));
