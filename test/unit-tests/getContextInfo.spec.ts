import getContextInfo from '../../src/getContextInfo';

jest.unmock('../../src/getContextInfo');

function exampleFn() {
  return getContextInfo(exampleFn);
}

// we need to use node's assert to test the interactions with jest
// this is unfortunately unavoidable to test this behavior
// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert');

assert.equal(exampleFn().allowed, true);

describe('getContextInfo', () => {
  assert.equal(exampleFn().allowed, true);

  beforeAll(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a lifecycle hook');
  });

  beforeEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a lifecycle hook');
  });

  afterEach(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a lifecycle hook');
  });

  afterAll(() => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a lifecycle hook');
  });

  it('inside it', () => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a test');
  });

  test('inside test', () => {
    assert.equal(exampleFn().allowed, false);
    assert.equal((exampleFn() as any).message, 'cannot call given from a test');
  });
});
