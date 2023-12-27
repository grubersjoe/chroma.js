import { w3cx11 } from '../../colors/w3cx11';
import { unpack } from '../../utils/unpack';
import { rgb2hex } from '../hex/rgb2hex';

export const rgb2name = (...args) => {
  const rgb = unpack(args, 'rgba');
  const hex = rgb2hex(rgb, 'rgb');
  for (let n of Object.keys(w3cx11)) {
    if (w3cx11[n] === hex) return n.toLowerCase();
  }
  return hex;
};
