/* global window:readonly */

const getGiven = require('./dist/given.js').default;

// register global object
if (typeof global !== 'undefined') {
  global.given = getGiven();
}

if (typeof window !== 'undefined') {
  window.given = getGiven();
}
