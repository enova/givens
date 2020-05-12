import GivenError from '../../src/givenError';

jest.unmock('../../src/givenError');

describe('GivenError', () => {
  it('appends "givens: " to the beginning of the message', () => {
    const err = new GivenError('message', () => undefined);
    expect(err.message).toEqual('givens: message');
  });

  it('correctly captures stack trace to ssi', () => {
    function myFunction() {
      throw new GivenError('message', myFunction);
    }
    function myParentFunction() {
      myFunction();
    }
    try {
      myParentFunction();
    } catch (err) {
      expect(err.stack).toMatch('myParentFunction');
      expect(err.stack).not.toMatch('myFunction');
    }
  });
});
