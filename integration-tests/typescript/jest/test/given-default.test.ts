import assert from 'assert';
import getGiven from 'givens';

const given = getGiven();

describe('basic overriding behavior', () => {
  given('var1', () => 'initial value');

  given('var2', () => `the value is: ${given.var1}`);

  it('has initial value', () => {
    expect(given.var2).toEqual('the value is: initial value');
  });

  describe('with new value', () => {
    given('var1', () => 'overridden value');

    it('has overridden value', () => {
      expect(given.var2).toEqual('the value is: overridden value');
    });
  });

  it('has initial value again', () => {
    expect(given.var2).toEqual('the value is: initial value');
  });
});

describe('basic caching behavior', () => {
  given('var', () => ({ value: 'initial' }));
  given('random', () => Math.random());

  test('it caches value', () => {
    given.var.value = 'new';
    expect(given.var.value).toBe('new');
  });

  test('random cache test', () => {
    expect(given.random).toEqual(given.random);
  });

  describe('with beforeEach', () => {
    beforeEach(() => {
      given.var.value = 'new';
    });

    test('it caches value', () => {
      expect(given.var.value).toBe('new');
    });
  });

  describe('with afterEach', () => {
    afterEach(() => {
      assert.equal(given.var.value, 'new');
    });

    test('it caches value', () => {
      expect(given.var.value).toBe('initial');
      given.var.value = 'new';
    });
  });
});
