import getContextInfo from '../../../src/getContextInfo';

// we need to use node's assert to test the integrations with jest
// this is unfortunately unavoidable to test this behavior
const assert = require('assert');

assert.equal(getContextInfo(), 'normal');

describe('getContextInfo', () => {
  assert.equal(getContextInfo(), 'normal');

  beforeAll(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  beforeEach(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  afterEach(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  afterAll(() => {
    assert.equal(getContextInfo(), 'lifecycle');
  });

  it('inside it', () => {
    assert.equal(getContextInfo(), 'test');
  });

  test('inside test', () => {
    assert.equal(getContextInfo(), 'test');
  });
});
