module.exports = {
  automock: true,
  verbose: true,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
};
