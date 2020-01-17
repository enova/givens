import getContextInfo from '../../../src/getContextInfo';

// we need to use node's assert to test the integrations with jest
// this is unfortunately unavoidable to test this behavior
const assert = require('assert');

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
