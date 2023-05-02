import { Identifier } from './Identifier';

describe('Identifier', () => {
  test('identifier to value returns the raw value', () => {
    const identifier = new Identifier<number>(10);
    expect(identifier.toValue()).toBe(10);
  });

  test('identifier to string returns a string', () => {
    const identifier = new Identifier<number>(2);
    expect(identifier.toString()).toBe('2');
  });
});
