module.exports = {
  verbose: true,
  roots: [
    '<rootDir>/test/unit',
    '<rootDir>/test/integration/jest',
  ],
  setupFiles: [
    './global-init.js',
  ],
};
