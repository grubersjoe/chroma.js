import { rgb2hex } from './io/hex/rgb2hex';
import { clipRgb } from './utils/clip';

export class Color {
  /**
   * @param rgb number[]
   */
  constructor(rgb) {
    this._rgb = clipRgb(rgb);

    // add alpha channel
    if (this._rgb[3] === undefined) {
      this._rgb[3] = 1;
    }
  }

  toString() {
    return mode => rgb2hex(this._rgb, mode);
  }
}
