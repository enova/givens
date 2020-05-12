const givenError = require('givens/dist/givenError.js').default
const assert = require('assert');

delete Error.captureStackTrace

console.log('givenError works when captureStackTrace is missing')
assert.equal(new givenError('error').message, 'givens: error');