// `ssfi` stands for "start stack function". It is the reference to the
// starting point for removing irrelevant frames from the stack trace
export default class GivenError extends Error {
  constructor(message: string, ssf?: Function) {
    // 'Error' breaks prototype chain here
    super(`given-test: ${message}`);

    // restore prototype chain
    const actualProto = new.target.prototype;
    Object.setPrototypeOf(this, actualProto);

    // If a start stack function (ssf) was provided we capture the current stack trace and pass
    // it to the `captureStackTrace` function so we can remove frames that come after it
    if (ssf && (Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ssf);
    } else {
      // If no start stack function was provided we just use the original stack property
      try {
        throw new Error();
      } catch (e) {
        this.stack = e.stack;
      }
    }
  }
}
