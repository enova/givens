const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.strictEqual(exampleFn().allowed, false);
assert.strictEqual(exampleFn().message, 'given must be called inside a describe');

describe('getContextInfo', () => {
  assert.strictEqual(exampleFn().allowed, true);

  beforeAll(() => {
    assert.strictEqual(exampleFn().allowed, false);
    assert.strictEqual(exampleFn().message, 'given must be called inside a describe');
  });

  beforeEach(() => {
    assert.strictEqual(exampleFn().allowed, false);
    assert.strictEqual(exampleFn().message, 'given must be called inside a describe');
  });

  afterEach(() => {
    assert.strictEqual(exampleFn().allowed, false);
    assert.strictEqual(exampleFn().message, 'given must be called inside a describe');
  });

  afterAll(() => {
    assert.strictEqual(exampleFn().allowed, false);
    assert.strictEqual(exampleFn().message, 'given must be called inside a describe');
  });

  it('inside it', () => {
    assert.strictEqual(exampleFn().allowed, false);
    assert.strictEqual(exampleFn().message, 'given must be called inside a describe');
  });
});
