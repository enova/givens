const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.equal(exampleFn().allowed, true);

describe('getContextInfo', () => {
  assert.equal(exampleFn().allowed, true);

  before(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'cannot call given from a lifecycle hook');
  });

  beforeEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'cannot call given from a lifecycle hook');
  });

  afterEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'cannot call given from a lifecycle hook');
  });

  after(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'cannot call given from a lifecycle hook');
  });

  it('inside it', () => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'cannot call given from a test');
  });
});
