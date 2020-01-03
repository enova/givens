/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
/* globals before beforeAll beforeEach after afterAll afterEach */

const parseKey = require('./parseKey.js');

const given = (rawKey, func) => {
  const parsedKey = parseKey(rawKey);
  if (!parsedKey.valid) {
    throw new Error(`given-test: ${parsedKey.message}`);
  }

  const { type, key } = parsedKey;
  if (!given.__types__[key]) {
    given.__types__[key] = type;
  } else if (given.__types__[key] !== type) {
    throw new Error('given-test: inconsistent declatation type');
  }

  // add a getter with this key to the global given object if it is missing
  if (!given.hasOwnProperty(key)) {
    Object.defineProperty(given, key, {
      get: () => {
        let value;

        if (type !== 'no-cache') {
          value = given.__cache__[key];
        }

        if (!value) {
          const topFunc = given.__props__[key][given.__props__[key].length - 1];
          if (given.__trace__.includes(key)) {
            const trace = given.__trace__;
            given.__trace__.length = 0; // reset trace

            throw new Error(`
            given-test: recursive variable ${key} detected
            trace: ${trace}
            `);
          }

          given.__trace__.push(key);

          try {
            value = topFunc.call();
          } catch (err) {
            given.__trace__.length = 0;
            throw err;
          }
          given.__trace__.pop(key);

          if (type !== 'no-cache') {
            given.__cache__[key] = value;
          }
        }

        return value;
      },
    });
  }

  // push function onto prop stack
  const __up__ = () => {
    if (!given.__props__[key]) { given.__props__[key] = []; }

    given.__props__[key].push(func);
    delete given.__cache__[key];
  };

  // pop function off prop stack
  const __down__ = () => {
    given.__props__[key].pop();

    if (given.__props__[key].length === 0) {
      delete given.__props__[key];
      delete given[key];
    }
  };


  // remove cached props
  const __clear__ = () => {
    delete given.__cache__[key];
  };

  if (typeof beforeAll === 'function') {
    beforeAll(__up__);
  }
  if (typeof before === 'function') {
    before(`given-test setup ${key}`, __up__);
  }

  if (typeof afterAll === 'function') {
    afterAll(__down__);
  }
  if (typeof after === 'function') {
    after(`given-test teardown ${key}`, __down__);
  }

  if (typeof afterEach === 'function') {
    afterEach(__clear__);
  }

  if (type === 'immediate') {
    beforeEach(() => {
      // eslint-disable-next-line no-unused-vars
      const _ = given[key];
    });
  }
};


Object.defineProperty(given, '__props__', { value: {}, enumerable: false });
Object.defineProperty(given, '__types__', { value: {}, enumerable: false });
Object.defineProperty(given, '__cache__', { value: {}, enumerable: false });
Object.defineProperty(given, '__trace__', { value: [], enumerable: false });

module.exports = given;
