import { blend } from '../src/generator/blend';
import { hex, toHex } from '../src/io/hex';
import { named } from '../src/io/named';

describe('blend()', () => {
  test('multiply 1', () => {
    const b = blend(named('red'), hex('#5a9f37'), 'multiply');
    expect(toHex(b)).toEqual('#5a0000');
  });
  test('multiply 2', () => {
    const b = blend(hex('#33b16f'), hex('#857590'), 'multiply');
    expect(toHex(b)).toEqual('#1b513f');
  });
  test('screen', () => {
    const b = blend(hex('#b83d31'), hex('#0da671'), 'screen');
    expect(toHex(b)).toEqual('#bcbb8c');
  });
  test('overlay 2', () => {
    const b = blend(hex('#b83d31'), hex('#0da671'), 'overlay');
    expect(toHex(b)).toEqual('#784f2b');
  });
});
