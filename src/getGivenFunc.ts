import {
  givenCache,
  givenProps,
  givenTrace,
} from './types';
import evaluate from './evaluate';
import isValid from './isValid';
import GivenError from './givenError';

const getGivenFunc = () => {
  const given = <T, K extends keyof T>(key: K, func: () => T[K]): void => {
    if (!isValid(key as string)) {
      throw new GivenError(`key "${key}" is not allowed`, given);
    }

    /* eslint-disable no-underscore-dangle */
    const props = (given as any).__props__ as givenProps<T>;
    const cache = (given as any).__cache__ as givenCache<T>;
    const trace = (given as any).__trace__ as givenTrace<T>;
    /* eslint-enable no-underscore-dangle */

    // push function onto prop stack
    const push = () => {
      // add a getter with this key to the global given object if it is missing
      // eslint-disable-next-line no-prototype-builtins
      if (!given.hasOwnProperty(key)) {
        props[key] = [];

        // make sure to pass the correct ssi for easier debugging
        const getter = () => evaluate<T, K>(key, props, cache, trace, getter);
        Object.defineProperty(given, key, {
          get: getter,
          configurable: true,
          enumerable: true,
        });
      }

      props[key]!.push(func);
      delete cache[key];
    };

    // pop function off prop stack
    const pop = () => {
      props[key]!.pop();

      // remove keys that no longer have values.
      if (props[key]!.length === 0) {
        delete props[key];
        delete (given as any)[key];
      }
    };

    // remove cached props
    const clearCache = () => {
      delete cache[key];
    };

    if (typeof beforeAll === 'function') {
      beforeAll(push);
    }
    if (typeof before === 'function') {
      before(`given-test setup ${key}`, push);
    }

    if (typeof afterAll === 'function') {
      afterAll(pop);
    }
    if (typeof after === 'function') {
      after(`given-test teardown ${key}`, pop);
    }

    if (typeof afterEach === 'function') {
      afterEach(clearCache);
    }
  };
  return given;
};

export default getGivenFunc;
