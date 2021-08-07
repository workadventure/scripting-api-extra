const baseConfig = require('./jest-base')

module.exports = {
  ...baseConfig,
  rootDir: '.',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['<rootDir>/src/__mocks__/*'],
  setupFilesAfterEnv: ['./test/setup-test.js'],
  cacheDirectory: '<rootDir>/.cache/unit',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [['lcov', { projectRoot: './' }], 'text'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 80,
      lines: 80,
      statements: -35,
    },
  },
}
