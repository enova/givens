Given Test

Lazily executed variables for jest.
heavily inspired by https://github.com/tatyshev/given2, which was inspired by rspec

usage:

```javascript
describe('basic overriding behavior', () => {
  given('var1', () => 'initial value');

  given('var2', () => `the value is: ${given.var1}`);

  it('has initial value', () => {
    expect(given.var2).toEqual('the value is: initial value');
  });

  describe('with new value', () => {
    given('var1', () => 'overridden value');

    it('has overridden value', () => {
      expect(given.var2).toEqual('the value is: overridden value');
    });
  });

  it('has initial value again', () => {
    expect(given.var2).toEqual('the value is: initial value');
  });
});
```
