<p align="center">
  <img src="/documentation/logo-light.png" alt="givens" width="300">
  <br />
  <br />
  <a href='https://www.npmjs.com/package/givens'><img alt="npm" src="https://img.shields.io/npm/v/givens"></a>
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/enova/givens/CD?label=build">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/enova/givens/CI?label=tests">
  <a href='https://coveralls.io/github/enova/givens?branch=master'><img src='https://coveralls.io/repos/github/enova/givens/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href='https://github.com/enova/givens/blob/master/LICENSE'><img alt="MIT License" src="https://img.shields.io/github/license/enova/givens"></a>
</p>

Easy test setup without side effects.

For use with [jest](https://github.com/facebook/jest), [mocha](https://github.com/mochajs/mocha), and [jasmine](https://github.com/jasmine/jasmine.github.io).
Behavior based on [rspec](https://github.com/enova/givens/blob/master), syntax inspired by [given2](https://github.com/tatyshev/given2)

---

## Why?

If you or your team have ruby and rspec experience, and are moving to a javascript based library, this will make the experience of writing javascript tests very similar to that of writing rspec tests.

Even if you don't come from a ruby background, givens can help you write maintainable tests quickly, while avoiding many of the side effects traditional JavaScript testing often has, such as:

- testing different methods on the same object in multiple tests can result in cross-contamination.
- tests can depend on order; and break when reordered.
- Running only some tests in a single file (like via jest’s `.skip` or `.only`) can make tests behave unpredictably.

Givens, when used correctly solves all of these, dries up your tests, and might even make them more readable, while still letting you use `beforeEach` and `afterEach`.

---

## What does it do?

when you call `getGiven()`, givens calls `afterEach` with a callback that clears the cache. Because this `afterEach` hook is declared first, it will run after every other `afterEach` in every scope.

when you call `given(key, callback)`, givens calls the following lifecycle functions:

- `beforeAll`, with a hook which pushes `callback` onto a stack of functions for `key` and makes sure there is an accessor present for key, which simply calls the topmost function on the stack and returns the result.
- `afterAll`, with a hook which pops `callback` back off the stack of functions for `key`, and deletes the accessor if the stack is now empty.

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
  setupFilesAfterEnv: [ // this CANNOT be setupFiles
    'givens/setup.js',
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

When you call `given(myKey, callback)`, givens stores the callback function you give it. When you go to retrieve the key (via `given.myKey`) givens will execute the most recent callback you have given for the key, and cache the value. Additionally, if you call `given()` inside a describe, the callback will revert to the previous one given for `myKey` after executing all tests in the describe, allowing you to override a given value for a set of tests. The cache is cleared after every test.

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
