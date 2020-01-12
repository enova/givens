const assert = require('assert');
const given = require('../../../dist/getGiven').default();

describe('thingToDescribe', () => {
  given('variableToLazyExecute', () => 'initial value');

  given('anotherVarToLazyExecute', () => `the value is: ${given.variableToLazyExecute}`);

  it('has initial value', () => {
    assert.equal(given.anotherVarToLazyExecute, 'the value is: initial value');
  });

  describe('with new value', () => {
    given('variableToLazyExecute', () => 'overridden value');

    it('has overridden value', () => {
      assert.equal(given.anotherVarToLazyExecute, 'the value is: overridden value');
    });
  });

  it('has initial value again', () => {
    assert.equal(given.anotherVarToLazyExecute, 'the value is: initial value');
  });
});
