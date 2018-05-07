module.exports = {
  resetMocks: true,
  verbose: true,
  browser: true,
  globals: {
    "DEBUG": true,
    "TARGET": "browser",
    "ts-jest": {
      "tsConfigFile": "tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "ivi-scheduler": "ivi-test-scheduler",
  },
  transform: {
    "\\.ts$": "ts-jest",
  },
  testRegex: "/__tests__/.*\\.spec\\.ts$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "\\.snap$",
    "/coverage/",
  ],
  moduleFileExtensions: ["ts", "js", "json"],
  coverageReporters: ["text", "json", "lcov", "html"],
  collectCoverageFrom: [
    "packages/**/src/**/*.ts",
    "!**/node_modules/**",
    "!packages/ivi-scheduler/**",
    "!packages/ivi-test-scheduler/**",
    "!packages/ivi-test/**",
    "!packages/ivi-router/**",
    "!packages/ivi-math/**",
    "!packages/ivi-gestures/**",
  ],
  coveragePathIgnorePatterns: ["/__tests__/", "/node_modules/"],
  cacheDirectory: ".jest/cache",
};
