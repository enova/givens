import getGiven from '../../src/getGiven';
import getGivenFunc from '../../src/getGivenFunc';

const mockedGetGivenFunc = getGivenFunc as unknown as jest.MockedFunction<typeof getGivenFunc>;
const originalFunc = jest.fn();
mockedGetGivenFunc.mockImplementation(() => originalFunc);
jest.unmock('../../src/getGiven');

describe('getGiven', () => {
  const myGiven = getGiven<any>();
  myGiven('key', () => undefined);

  it('passes getGivenFunc through', () => {
    expect(originalFunc).toHaveBeenCalled();
  });

  it('defines __props__', () => {
    expect(myGiven.__props__).toEqual({});
  });

  it('defines __cache__', () => {
    expect(myGiven.__cache__).toEqual({});
  });

  it('defines __trace__', () => {
    expect(myGiven.__trace__).toEqual([]);
  });
});
