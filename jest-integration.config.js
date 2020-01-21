module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/integration/jest',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'dist/**/*.js',
  ],
  setupFilesAfterEnv: [
    './setup.js',
  ],
};
