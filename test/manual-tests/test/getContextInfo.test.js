const getContextInfo = require('givens/dist/getContextInfo.js').default
const assert = require('assert');

function exampleFn() {
  return getContextInfo(exampleFn);
}

console.log('getContextInfo with no matching test framework');
assert.deepStrictEqual(exampleFn(), { allowed: true });
