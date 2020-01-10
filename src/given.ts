/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
/* globals before beforeAll beforeEach after afterAll afterEach */

import { given, givenProps, givenCache, givenTrace} from './types'
import givenFunc from './givenFunc'


export default function getGiven<T>(): given<T> {
  const __props__:givenProps<T> = {};
  const __cache__:givenCache<T> = {};
  const __trace__:givenTrace<T> = [];

  return Object.assign(
    givenFunc, {
      __props__,
      __cache__,
      __trace__,
    },
  ) as unknown as given<T>
}
