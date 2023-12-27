import { Color } from '../../color';
import { to } from '../to';
import { gl2rgb } from './gl2rgb';

export const gl = (...args) => new Color(gl2rgb(...args));
export const toGl = c => to(c, c => rgb2gl(c));

const rgb2gl = c => [c._rgb[0] / 255, c._rgb[1] / 255, c._rgb[2] / 255, c._rgb[3]];
