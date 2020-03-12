interface givenFunc<T> {
  <K extends keyof T>(key: K, func: () => T[K]): void
}

type given<T> = givenFunc<T> & T;

export default function getGiven<T = {[K: string]: any}>(): given<T>;
