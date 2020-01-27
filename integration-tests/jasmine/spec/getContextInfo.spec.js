const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.equal(exampleFn().allowed, false);

describe('getContextInfo', () => {
  assert.equal(exampleFn().allowed, true);

  beforeAll(() => {
    assert.equal(exampleFn().allowed, false);
  });

  beforeEach(() => {
    assert.equal(exampleFn().allowed, false);
  });

  afterEach(() => {
    assert.equal(exampleFn().allowed, false);
  });

  afterAll(() => {
    assert.equal(exampleFn().allowed, false);
  });

  it('inside it', () => {
    assert.equal(exampleFn().allowed, false);
  });
});
