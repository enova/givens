import evaluate from '../src/evaluate';
import {
  givenProps,
  givenCache,
  givenTrace,
} from '../src/types';
import GivenError from '../src/givenError';

jest.unmock('../src/evaluate');
const mockedGivenError = GivenError as unknown as jest.Mock<typeof GivenError>;
mockedGivenError.mockImplementation(
  (message: string) => (new Error(message) as unknown as typeof GivenError),
);

interface TestType {
  key1: string;
  key2: string;
  key3: string;
}

let key: any;
let props: givenProps<TestType>;
let cache: givenCache<TestType>;
let trace: givenTrace<TestType>;
let ssi: Function;

beforeEach(() => {
  key = 'key1';
  props = {
    key1: [() => 'key1 value1', () => 'key1 value2'],
    key2: [() => 'key2 value1', () => 'key2 value2'],
    key3: [() => 'key3 value1'],
  };
  cache = {};
  trace = [];
  ssi = jest.fn();
});

describe('evaluate', () => {
  it('uses the top props', () => {
    expect(evaluate<TestType, 'key1'>(key, props, cache, trace, ssi)).toBe('key1 value2');
  });

  describe('trace detection', () => {
    it('throws the correct error', () => {
      trace = ['key1'];
      const f = () => {
        evaluate<TestType, 'key1'>(key, props, cache, trace, ssi);
      };
      expect(f).toThrowErrorMatchingSnapshot();
    });
    it('shows the correct sequence', () => {
      trace = ['key2', 'key1', 'key3'];
      const f = () => {
        evaluate<TestType, 'key1'>(key, props, cache, trace, ssi);
      };
      expect(f).toThrowErrorMatchingSnapshot();
    });
  });

  describe('error catching', () => {
    it('throws error', () => {
      props.key1 = [() => { throw new Error('error'); }];
      expect(() => evaluate<TestType, 'key1'>(key, props, cache, trace, ssi)).toThrowError('error');
    });

    it('resets trace', () => {
      props.key1 = [() => {
        throw new Error('error');
      }];
      trace = ['key3'];
      expect(() => evaluate<TestType, 'key1'>(key, props, cache, trace, ssi)).toThrowError('error');
      expect(trace).toHaveLength(0);
    });
  });

  describe('value caching', () => {
    it('returns cached value without calling functions', () => {
      const topFn = jest.fn(() => 'value1');
      props.key1 = [topFn];
      cache.key1 = 'cachedValue';
      expect(evaluate<TestType, 'key1'>(key, props, cache, trace, ssi)).toBe('cachedValue');
      expect(topFn).not.toHaveBeenCalled();
    });
  });
});
