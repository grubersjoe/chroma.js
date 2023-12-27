import { colorbrewer } from '../../colors/colorbrewer';
import { hex } from '../hex/index';

export const brewer = name => {
  name = name.toLowerCase();
  if (colorbrewer[name]) {
    return colorbrewer[name].map(hex);
  }
  throw new Error(`invalid argument: ${name}`);
};
