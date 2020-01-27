import getGiven from '../src/getGiven';
import evaluate from '../src/evaluate';
import isValid from '../src/isValid';
import GivenError from '../src/givenError';
import getContextInfo from '../src/getContextInfo';

jest.unmock('../src/getGiven');
jest.unmock('../src/getGivenFunc');
const evaluateMock = evaluate as unknown as jest.MockedFunction<typeof evaluate>;
const isValidMock = isValid as unknown as jest.MockedFunction<typeof isValid>;
const GivenErrorMock = GivenError as unknown as jest.Mock<typeof GivenError>;
const getContextInfoMock = getContextInfo as unknown as jest.MockedFunction<typeof getContextInfo>;
evaluateMock.mockReturnValue('value');
isValidMock.mockImplementation(() => true);
GivenErrorMock.mockImplementation(
  (message: string) => (new Error(message) as unknown as typeof GivenError),
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
getContextInfoMock.mockImplementation((_: Function) => ({ allowed: true }));

/* eslint-disable no-global-assign */
beforeAll = jest.fn(beforeAll);
afterAll = jest.fn(afterAll);
afterEach = jest.fn(afterEach);
beforeEach(() => {
  (beforeAll as jest.MockedFunction<jest.Lifecycle>).mockClear();
  (afterAll as jest.MockedFunction<jest.Lifecycle>).mockClear();
  (afterEach as jest.MockedFunction<jest.Lifecycle>).mockClear();
  evaluateMock.mockClear();
  isValidMock.mockClear();
  GivenErrorMock.mockClear();
  getContextInfoMock.mockClear();
});
/* eslint-enable no-global-assign */


describe('getGivenFunc', () => {
  it('calls afterEach', () => {
    getGiven();
    expect(afterEach).toHaveBeenCalled();
  });

  describe('given function', () => {
    interface test {
      key1: string,
      key2: string,
      key3: string,
    }
    const given = getGiven<test>();

    it('calls beforeAll', () => {
      given('key1', () => 'value1');
      expect(beforeAll).toHaveBeenCalled();
    });

    it('calls afterAll', () => {
      given('key1', () => 'value1');
      expect(afterAll).toHaveBeenCalled();
    });

    describe('push', () => {
      given('key2', () => 'value2');
      given('key2', () => 'value2');

      it('has an accessor', () => {
        expect(given).toHaveProperty('key2');
      });

      it('has an entry on props', () => {
        expect((given as any).__props__).toHaveProperty('key2');
      });

      it('has function in props', () => {
        expect((given as any).__props__.key2).toHaveLength(2);
      });
    });
    describe('pop', () => {
      afterAll(() => {
        expect(given).not.toHaveProperty('key3');
      });
      given('key3', () => 'value3');

      it('has an accessor', () => {
        expect(given).toHaveProperty('key3');
      });
    });

    it('throws error when context is not allowed', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getContextInfoMock.mockImplementationOnce((_: Function) => ({ allowed: false, message: 'error' }));
      expect(() => given('key1', () => 'value')).toThrowError();
      expect(GivenErrorMock).toHaveBeenCalledWith<[string, Function]>(
        'error',
        given,
      );
    });

    it('throws error when key is invalid', () => {
      isValidMock.mockImplementationOnce(() => false);
      expect(() => given('key1', () => 'value')).toThrowError();
      expect(GivenErrorMock).toHaveBeenCalledWith<[string, Function]>(
        'key "key1" is not allowed',
        given,
      );
    });
  });
});
