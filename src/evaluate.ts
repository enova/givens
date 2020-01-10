import {
  givenProps,
  givenCache,
  givenTrace,
} from './types'

const evaluate = <T, K extends keyof T>(
  key: K,
  props: givenProps<T>,
  cache: givenCache<T>,
  trace: givenTrace<T>,
): T[K] => {
  let value = cache[key];

  if (value === undefined) {
    // get the most recent declaration for key
    const topFunc = props[key]![props[key]!.length - 1];

    // check for recursive definition, and error if present
    if (trace.includes(key)) {
      const t = trace;
      trace.length = 0; // reset trace

      throw new Error(`given-test: recursive variable ${key} detected\ntrace: ${t}`);
    }

    
    // try to evaluate and cache
    try {
      trace.push(key);
      value = topFunc();
      cache[key] = value;
      trace.pop();
    } catch (err) {
      trace.length = 0;
      throw err;
    }
  }
  return value!;
}

export default evaluate;