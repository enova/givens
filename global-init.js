/* global window:readonly */

const given = require('./index.js');

// register global object
if (typeof global !== 'undefined') {
  global.given = given;
}

if (typeof window !== 'undefined') {
  window.given = given;
}
