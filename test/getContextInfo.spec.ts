import getContextInfo from '../src/getContextInfo';

jest.unmock('../src/getContextInfo');

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to use node's assert to test the interactions with jest
// this is unfortunately unavoidable to test this behavior
const assert = require('assert');

assert.equal(exampleFn().allowed, true);

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

  test('inside test', () => {
    assert.equal(exampleFn().allowed, false);
  });
});
