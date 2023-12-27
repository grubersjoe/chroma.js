import { toMode } from '../io/mode';

export const get = function (color, mc) {
  const [mode, channel] = mc.split('.');
  const src = toMode(color, mode);
  if (channel) {
    const i = mode.indexOf(channel) - (mode.substring(0, 2) === 'ok' ? 2 : 0);
    if (i > -1) {
      return src[i];
    }
    throw new Error(`unknown channel ${channel} in mode ${mode}`);
  }
  return src;
};
