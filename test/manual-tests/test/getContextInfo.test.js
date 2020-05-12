const getContextInfo = require('givens/dist/getContextInfo.js').default
const assert = require('assert');

function exampleFn() {
  return getContextInfo(exampleFn);
}

console.log('getContextInfo works with no matching test framework');
assert.deepStrictEqual(exampleFn(), { allowed: true });

delete Error.captureStackTrace

console.log('getContextInfo works with missing captureStackTrace function');
assert.deepStrictEqual(exampleFn(), { allowed: true });