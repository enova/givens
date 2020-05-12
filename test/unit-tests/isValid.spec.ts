import isValid from '../../src/isValid';

jest.unmock('../../src/isValid');

describe('isValid', () => {
  describe.each([
    ['__props__'],
    ['__cache__'],
    ['__trace__'],
    ['length'],
    ['bind'],
    ['toString'],
    ['__proto__'],
    ['constructor'],
  ])('with key "%p"', (key) => {
    it('is not valid', () => {
      expect(isValid(key)).toBe(false);
    });
  });
  describe.each([
    ['key'],
    ['otherKey'],
    ['blahblah'],
  ])('with key "%p"', (key) => {
    it('is valid', () => {
      expect(isValid(key)).toBe(true);
    });
  });
});
