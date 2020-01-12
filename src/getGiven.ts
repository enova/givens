import getGivenFunc from './getGivenFunc';
import { given } from './types';

export default function getGiven<T>(): given<T> {
  const givenFunc = getGivenFunc();

  return Object.defineProperties(givenFunc, {
    __props__: { value: {} },
    __cache__: { value: {} },
    __trace__: { value: [] },
  }) as given<T>;
}
