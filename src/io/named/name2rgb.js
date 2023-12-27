import { w3cx11 } from '../../colors/w3cx11';
import { hex2rgb } from '../hex/hex2rgb';

export const name2rgb = name => {
  name = name.toLowerCase();
  if (w3cx11[name]) {
    return hex2rgb(w3cx11[name]);
  }
  throw new Error(`invalid argument ${name}`);
};
