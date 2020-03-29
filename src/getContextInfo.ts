// much of this file uses istanbul ignores.
// this is because this file behaves differently in different test runners
// meaning that it's impossible to get code coverage for those routes in jest alone.

interface AllowedContextInfo {
  allowed: true;
}
interface DisallowedContextInfo {
  allowed: false;
  message: string;
}
type ContextInfo = AllowedContextInfo | DisallowedContextInfo;

function jestContextMatcher(rawStack: string): ContextInfo | undefined {
  if (/Object\.asyncJestLifecycle/.test(rawStack)) {
    return {
      allowed: false,
      message: 'cannot call givens from a lifecycle hook',
    };
  }
  if (/Object\.asyncJestTest/.test(rawStack)) {
    return {
      allowed: false,
      message: 'cannot call givens from a test',
    };
  }
  /* istanbul ignore else */
  if (/jest-jasmine2/.test(rawStack)) {
    return { allowed: true };
  }
  /* istanbul ignore next */
  return undefined;
}

/* istanbul ignore next */
function mochaContextMatcher(rawStack: string): ContextInfo | undefined {
  if (/Test\.Runnable\.run/.test(rawStack)) {
    return {
      allowed: false,
      message: 'cannot call givens from a test',
    };
  }
  if (/Hook\.Runnable\.run/.test(rawStack)) {
    return {
      allowed: false,
      message: 'cannot call givens from a lifecycle hook',
    };
  }
  if (/Mocha/.test(rawStack)) {
    return { allowed: true };
  }
  return undefined;
}

/* istanbul ignore next */
function jasmineContextMatcher(rawStack: string): ContextInfo | undefined {
  if (/jasmine\.js/.test(rawStack)) {
    if (!/Env\.describe/.test(rawStack)) {
      return {
        allowed: false,
        message: 'given must be called inside a describe',
      };
    }
    return { allowed: true };
  }
  return undefined;
}

export default function getContextInfo(ssf: Function): ContextInfo {
  let rawStack: string;
  try {
    const err = new Error();
    /* istanbul ignore else */
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(err, ssf);
    }
    throw err;
  } catch (e) {
    rawStack = e.stack;
  }
  let context: ContextInfo | undefined;
  context = jestContextMatcher(rawStack);

  /* istanbul ignore else */
  if (context !== undefined) { return context; }

  /* istanbul ignore next */
  context = mochaContextMatcher(rawStack);
  /* istanbul ignore next */
  if (context !== undefined) { return context; }

  /* istanbul ignore next */
  context = jasmineContextMatcher(rawStack);
  /* istanbul ignore next */
  if (context !== undefined) { return context; }

  /* istanbul ignore next */
  return { allowed: true };
}
