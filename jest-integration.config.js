module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/integration/jest',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'dist/**/*.js',
  ],
  setupFiles: [
    './setup.js',
  ],
};
