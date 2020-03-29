export type givenProps<T> = {
  [K in keyof T]?: (() => T[K])[];
};

export type givenCache<T> = Partial<T>;

export type givenTrace<T> = (keyof T)[];

/* eslint-disable-next-line @typescript-eslint/class-name-casing */
export interface givenFunc<T> {
  <K extends keyof T>(key: K, func: () => T[K]): void;
}

export type given<T> = givenFunc<T> & T;
