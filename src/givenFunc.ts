import evaluate from './evaluate';
import validateKey from './validateKey';
import {
  givenProps,
  givenCache,
  givenTrace,
} from './types';

const givenFunc = <T, K extends keyof T>(key: K, func: () => T[K]): void => {
  const validation = validateKey(key as string);

  if (!validation.valid) {
    throw new Error(`given-test: ${validation.errorMessage}`);
  }

  const props = (givenFunc as any).__props__ as givenProps<T>;
  const cache = (givenFunc as any).__cache__ as givenCache<T>;
  const trace = (givenFunc as any).__trace__ as givenTrace<T>;

  // add a getter with this key to the global given object if it is missing
  if (!givenFunc.hasOwnProperty(key)) {
    props[key] = [];
    Object.defineProperty(givenFunc, key, {
      get: () => evaluate<T, K>(key, props, cache, trace),
    });
  }

  // push function onto prop stack
  const push = () => {
    props[key]!.push(func);
    delete cache[key];
  };

  // pop function off prop stack
  const pop = () => {
    props[key]!.pop();

    if (props[key]!.length === 0) {
      delete props[key];
      delete (givenFunc as any)[key];
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

export default givenFunc;
