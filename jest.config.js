module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/unit/jest',
    '<rootDir>/test/integration/jest',
  ],
  setupFiles: [
    './setup.js',
  ],
};
