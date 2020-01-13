<p align="center">
  <img src="/documentation/logo-light.png" alt="givens" width="300">
</p>

Easy test setup without side effects.

For use with [jest](https://github.com/facebook/jest) and [mocha](https://github.com/mochajs/mocha).
Behavior based on [rspec](), syntax inspired by [given2](https://github.com/tatyshev/given2)

Common testing side effects include but are not limited to:
- testing the same object in multiple tests can result in cross-contamination.
- tests can depend on order; and break when reordered.
- appending "`.skip`" or "`.only`" can make tests behave unpredictably.

Givens, when used correctly solves all of these, dries up your tests, and might even make them more readable, while still letting you use standard lifecycle methods like `beforeEach`.

---
## Getting Started
### Prerequisites
This package should work fine for any javascript or typescript project that uses jest or mocha tests. Non Node environments are untested, and may not work.

### Installing
first, install from npm:
```bash
npm install --save-dev givens
```
or
```bash
yarn add --dev givens
```
#### global installation
```javascript
import 'givens/setup';
```
or add to testing framework config, for example in jest:
```javascript
{
  setupFiles: [
    'given/setup.js',
  ],
}
```
then you can use the `given` keyword without importing.
#### local installation
in the test file, use the following import:
```javascript
import getGiven from 'givens';
const given = getGiven();
```
or in typescript
```typescript
import getGiven from 'givens';
interface myVars {
  var1: number; // the keys you intend to use
  var2: string; // and their types
}
const given = getGiven<myVars>();
```

---
## Usage

When you call `given(myKey, callback)`, givens stores the callback function you give it. When you go to retrieve the key (via `given.myKey`) givens will execute the most recent callback you have given for the key, and cache the value. Additionally, if you call `given()` inside a describe, the callback will revert to the previous one given for `myKey` after executing all tests in the describe. The cache is cleared after every test.

```javascript
describe('basic overriding behavior', () => {
  given('var1', () => 'initial value');
  given('var2', () => {
    return 'the value is: ' + given.var1;
  });

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

For more examples of usage for your particular setup, read through the integration tests. They are examples of how to use the library as intended (and in some cases how it's not supposed to be used).
