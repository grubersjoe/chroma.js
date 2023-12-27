import { unpack } from '../../utils/unpack';

export const rgb2num = (...args) => {
  const [r, g, b] = unpack(args, 'rgb');
  return (r << 16) + (g << 8) + b;
};
