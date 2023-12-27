import { random } from '../src/generator/random';
import { toHex } from '../src/io/hex';

describe('random()', () => {
  test('returns random color', () => {
    expect(toHex(random())).toMatch(/^#[0-9a-f]{6}$/);
  });
});
