type matcherResult = 'lifecycle' | 'test' | 'defer';

function jestContextMatcher(rawStack: string): matcherResult {
  if (/Object\.asyncJestLifecycle/.test(rawStack)) {
    return 'lifecycle';
  }
  if (/Object\.asyncJestTest/.test(rawStack)) {
    return 'test';
  }
  return 'defer';
}

function mochaContextMatcher(rawStack: string): matcherResult {
  if (/Test\.Runnable\.run/.test(rawStack)) {
    return 'test';
  }
  if (/Hook\.Runnable\.run/.test(rawStack)) {
    return 'lifecycle';
  }
  return 'defer';
}


export default function getContextInfo(): 'normal' | 'lifecycle' | 'test' {
  let rawStack: string;
  try {
    throw new Error();
  } catch (e) {
    rawStack = e.stack;
  }
  let context: matcherResult;

  context = jestContextMatcher(rawStack);
  if (context !== 'defer') { return context; }

  context = mochaContextMatcher(rawStack);
  if (context !== 'defer') { return context; }

  return 'normal';
}