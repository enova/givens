const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.equal(getContextInfo().allowed, true);

describe('getContextInfo', () => {
  assert.equal(getContextInfo().allowed, true);

  before(() => {
    assert.equal(getContextInfo().allowed, false);
  });

  beforeEach(() => {
    assert.equal(getContextInfo().allowed, false);
  });

  afterEach(() => {
    assert.equal(getContextInfo().allowed, false);
  });

  after(() => {
    assert.equal(getContextInfo().allowed, false);
  });

  it('inside it', () => {
    assert.equal(getContextInfo().allowed, false);
  });
});
