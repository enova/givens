export type givenProps<T> = {
  [K in keyof T]?: (() => T[K])[];
};

export type givenCache<T> = Partial<T>;

export type givenTrace<T> = (keyof T)[];

interface givenFunc<T> {
  <K extends keyof T>(key: K, func: () => T[K]): void
}

export type given<T> = givenFunc<T> & T
