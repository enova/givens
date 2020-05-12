import assert from 'assert';
import getGiven from 'givens';

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
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in afterEach method', () => {
    afterEach(() => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in beforeAll method', () => {
    beforeAll(() => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in afterAll method', () => {
    afterAll(() => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in test', () => {
    it('breaks', () => {
      expect(() => given('test', () => 'foo')).toThrowErrorMatchingSnapshot();
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
    expect(() => given.nonRecursive).toThrowErrorMatchingSnapshot();
  });
});
