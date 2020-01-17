module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/unit/jest',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
};
