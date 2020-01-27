const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.equal(exampleFn().allowed, false);
assert.equal(exampleFn().message, 'given must be called inside a describe');

describe('getContextInfo', () => {
  assert.equal(exampleFn().allowed, true);

  beforeAll(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'given must be called inside a describe');
  });

  beforeEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'given must be called inside a describe');
  });

  afterEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'given must be called inside a describe');
  });

  afterAll(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'given must be called inside a describe');
  });

  it('inside it', () => {
    assert.equal(exampleFn().allowed, false);
    assert.equal(exampleFn().message, 'given must be called inside a describe');
  });
});
