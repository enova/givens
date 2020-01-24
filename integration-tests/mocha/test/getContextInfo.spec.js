const assert = require('assert');
const getContextInfo = require('givens/dist/getContextInfo').default;

// we need to assert in unusual places in this file.
// due to the nature of getContextInfo
assert.equal(getContextInfo(), 'normal');

describe('getContextInfo', () => {
  assert.equal(getContextInfo(), 'normal');

  before(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  beforeEach(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  afterEach(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  after(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  it('inside it', () => {
    assert.equal(getContextInfo(), 'test');
  });
});
