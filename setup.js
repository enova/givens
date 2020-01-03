/* eslint-disable no-undef */
const getGiven = require('./dist/getGiven').default;

// register global object
if (typeof global !== 'undefined') {
  global.given = getGiven();
}

if (typeof window !== 'undefined') {
  window.given = getGiven();
}
