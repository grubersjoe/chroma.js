import { unpack } from '../../utils/unpack';
import { gl2rgb } from '../gl/gl2rgb';
import { assertValidArgs } from '../validate';

export const hcv2rgb = (...args) => {
  args = unpack(args, 'hcv');
  assertValidArgs(args, 3);
  const [H, C, V] = args;

  if (C === 0) {
    return [V * 255, V * 255, V * 255, 1];
  }

  const h = ((H / 360) % 1) * 6;
  const v = h % 1;
  const w = 1 - v;

  let r, g, b;
  switch (Math.floor(h)) {
    case 0:
      [r, g, b] = [1, V, 0];
      break;
    case 1:
      [r, g, b] = [w, 1, 0];
      break;
    case 2:
      [r, g, b] = [0, 1, v];
      break;
    case 3:
      [r, g, b] = [0, w, 1];
      break;
    case 4:
      [r, g, b] = [v, 0, 1];
      break;
    default:
      [r, g, b] = [1, 0, w];
  }
  const m = (1.0 - C) * V;
  const gl = [C * r + m, C * g + m, C * b + m, args[3] ?? 1];

  return gl2rgb(gl);
};
