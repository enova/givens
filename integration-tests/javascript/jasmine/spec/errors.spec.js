const assert = require('assert');

const getGiven = require('givens').default;

describe('error behavior', () => {
  const given = getGiven();

  describe('illegal prop', () => {
    assert.throws(
      () => given('__props__', () => 'value'),
      (err) => err.message === 'givens: key "__props__" is not allowed',
    );

    it('does stuff', () => {
      expect(true);
    });
  });

  describe('illegal call location', () => {
    describe('in beforeEach method', () => {
      beforeEach(() => {
        assert.throws(
          () => given('test', () => 'foo'),
          (err) => err.message === 'givens: given must be called inside a describe',
        );
      });

      it('breaks', () => {});
    });

    describe('in afterEach method', () => {
      afterEach(() => {
        assert.throws(
          () => given('test', () => 'foo'),
          (err) => err.message === 'givens: given must be called inside a describe',
        );
      });

      it('breaks', () => {});
    });

    describe('in beforeAll method', () => {
      beforeAll(() => {
        assert.throws(
          () => given('test', () => 'foo'),
          (err) => err.message === 'givens: given must be called inside a describe',
        );
      });

      it('breaks', () => {});
    });

    describe('in afterAll method', () => {
      afterAll(() => {
        assert.throws(
          () => given('test', () => 'foo'),
          (err) => err.message === 'givens: given must be called inside a describe',
        );
      });

      it('breaks', () => {});
    });

    describe('in test', () => {
      it('breaks', () => {
        expect(() => given('test', () => 'foo')).toThrowError('givens: given must be called inside a describe');
      });
    });
  });

  describe('with recursive given variables', () => {
    given('recursive1', () => {
      const string1 = 'recursive1 => ';
      const string2 = given.recursive2;
      return string1 + string2;
    });
    given('recursive2', () => {
      const string1 = 'recursive2 => ';
      const string2 = given.recursive1;
      return string1 + string2;
    });
    given('nonRecursive', () => given.recursive1);

    it('blows up', () => {
      expect(() => given.nonRecursive).toThrowError('givens: recursive variable recursive1 detected\ntrace: recursive1 => recursive2 => recursive1');
    });
  });
});
