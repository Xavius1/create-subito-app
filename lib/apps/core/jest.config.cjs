/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  roots: [
    './src/',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 100, // TODO: 100
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/repositories/Api/queries/MUTATION_SAMPLE.ts',
    '<rootDir>/src/repositories/Api/queries/QUERY_SAMPLE.ts',
    '<rootDir>/src/security/open-telemetry.ts', // TODO test it
    '<rootDir>/src/index.ts', // TODO test it
  ],
};
