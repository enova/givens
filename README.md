Given Test

Lazily executed variables for jest.
heavily inspired by https://github.com/tatyshev/given2, which was inspired by rspec

usage:

    describe('thingToDescribe', () => {
      given('variableToLazyExecute', () => 'initial value');

      given('anotherVarToLazyExecute', () => {
        return 'the value is: ' + given.variableToLazyExecute;
      });

      it('has initial value', () => {
        expect(given.anotherVarToLazyExecute).toEqual('the value is: initial value');
      });

      describe('with new value', () => {
        given('variableToLazyExecute', () => 'overridden value');

        it('has overridden value', () => {
          expect(given.anotherVarToLazyExecute).toEqual('the value is: overridden value');
        });
      });

      it('has initial value again', () => {
        expect(given.anotherVarToLazyExecute).toEqual('the value is: initial value');
      });

      if('can be invoked by calling resolve', () => {
        given.resolve('anotherVarToLazyExecute'));
        // the value has been calculated and cached here
      });
    });
