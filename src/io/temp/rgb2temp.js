import { unpack } from '../../utils/unpack';
import { temp2rgb } from './temp2rgb';

export const rgb2temp = (...args) => {
  const rgb = unpack(args, 'rgb');
  const r = rgb[0],
    b = rgb[2];
  let minTemp = 1000;
  let maxTemp = 40000;
  const eps = 0.4;
  let temp;
  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    const rgb = temp2rgb(temp);
    if (rgb[2] / rgb[0] >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }
  return Math.round(temp);
};
