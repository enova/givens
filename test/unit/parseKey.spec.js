// eslint-disable-next-line no-undef
given = undefined; // don't allow given in unit tests.
const parseKey = require('../../src/parseKey.js');

describe('parseKey', () => {
  describe.each([
    ['regular', 'key'],
    ['immediate', '!key'],
    ['no-cache', '@key'],
  ])('with %s key', (type, key) => {
    it('is valid', () => {
      expect(parseKey(key).valid).toEqual(true);
    });

    it('passes type through', () => {
      expect(parseKey(key).type).toEqual(type);
    });

    it('gets the correct key', () => {
      expect(parseKey(key).key).toEqual('key');
    });
  });

  describe.each([
    ['non string', 0, '"0" is not a valid key; must be a string'],
    ['empty', '', 'key must not be empty'],
    ['"__" preceded', '__key', '"__key" is not a valid key; cannot start with "__"'],
    ['"__" suffixed', 'key__', '"key__" is not a valid key; cannot end with "__"'],
    ['!', '!', '"!" is not a valid key'],
    ['@', '@', '"@" is not a valid key'],
  ])('with %s key', (title, key, message) => {
    it('is not valid', () => {
      expect(parseKey(key).valid).toEqual(false);
    });

    it('passes type through', () => {
      expect(parseKey(key).message).toEqual(message);
    });
  });
});
