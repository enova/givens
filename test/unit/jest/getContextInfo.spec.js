const assert = require('assert');
const getContextInfo = require('../../../dist/getContextInfo').default;

assert.equal(getContextInfo(), 'normal');
describe('given inside it', () => {
  assert.equal(getContextInfo(), 'normal');
  beforeEach(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });
  it('does something', () => {
    assert.equal(getContextInfo(), 'test');
  });
});
