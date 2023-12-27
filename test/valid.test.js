import { isValidCmyk, isValidHex } from '../src/valid.js';

// TODO: add way more tests for all color models
describe('isValidHex()', () => {
  test('"red" is valid', () => expect(isValidHex('red')).toBe(false));
  test('"#fff" is valid', () => expect(isValidHex('#fff')).toBe(true));
  test('"bread" is invalid hex', () => expect(isValidHex('bread')).toBe(false));
});

describe('isValidCmyk()', () => {
  test('"red" is invalid', () => expect(isValidCmyk('red')).toBe(false));
});
