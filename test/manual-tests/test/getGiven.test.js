/* eslint-disable @typescript-eslint/no-empty-function */
const getGiven = require('givens').default
const assert = require('assert');

global.afterEach = () => {};
global.before = () => {};
global.after = () => {};


console.log('getGiven throws when missing afterEach');
delete global.afterEach;
assert.throws(
  () => getGiven(),
  (err) => err.message === 'givens: no test runner found',
);
global.afterEach = () => {};

console.log('given throws when missing before');
delete global.before;
assert.throws(
  () => getGiven()('key', () => undefined),
  (err) => err.message === 'givens: no test runner found',
  );
global.before = () => {};

console.log('given throws when missing after');
delete global.after;
assert.throws(
  () => getGiven()('key', () => undefined),
  (err) => err.message === 'givens: no test runner found',
);
