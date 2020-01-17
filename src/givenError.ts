// This class is heavily influenced by:
// JavaScript Errors and Stack Traces in Depth
// 17th of February, 2017 — Lucas Fernandes da Costa at Florianópolis, Brazil
// https://lucasfcosta.com/2017/02/17/JavaScript-Errors-and-Stack-Traces.html

// `ssf` stands for "start stack function". It is the reference to the
// starting point for removing irrelevant frames from the stack trace
export default class GivenError extends Error {
  constructor(message: string, ssf: Function) {
    // 'Error' breaks prototype chain here
    super(`givens: ${message}`);

    // restore prototype chain
    const actualProto = new.target.prototype;
    Object.setPrototypeOf(this, actualProto);

    // If a start stack function (ssf) was provided we capture the current stack trace and pass
    // it to the `captureStackTrace` function so we can remove frames that come after it
    /* istanbul ignore next */
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ssf);
    }
  }
}
