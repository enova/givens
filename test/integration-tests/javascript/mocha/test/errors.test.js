const assert = require('assert');
const given = require('givens').default();

describe('illegal prop', () => {
  assert.throws(
    () => given('__props__', () => 'value'),
    (err) => err.message === 'givens: key "__props__" is not allowed',
  );

  it('breaks', () => undefined);
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
    before(() => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in afterAll method', () => {
    after(() => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a lifecycle hook',
      );
    });

    it('breaks', () => undefined);
  });

  describe('in test', () => {
    it('breaks', () => {
      assert.throws(
        () => given('test', () => 'foo'),
        (err) => err.message === 'givens: cannot call given from a test',
      );
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
    assert.throws(
      () => given.nonRecursive,
      (err) => err.message === 'givens: recursive variable recursive1 detected\ntrace: recursive1 => recursive2 => recursive1',
    );
  });
});
