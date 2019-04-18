module.exports = {
  verbose: true,
  browser: true,
  testEnvironment: "ivi-jest/env/jsdom",
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
    },
  },
  moduleNameMapper: {
    "ivi-html": "<rootDir>/packages/ivi-html/src",
    "ivi-svg": "<rootDir>/packages/ivi-svg/src",
    "ivi-jest": "<rootDir>/packages/ivi-jest/src",
    "ivi-test": "<rootDir>/packages/ivi-test/src",
    "ivi-portal": "<rootDir>/packages/ivi-portal/src",
    "ivi-state": "<rootDir>/packages/ivi-state/src",
    "ivi-router": "<rootDir>/packages/ivi-router/src",
    "ivi": "<rootDir>/packages/ivi/src",
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
    "!packages/ivi-test/**",
    "!packages/ivi-router/**",
  ],
  coveragePathIgnorePatterns: ["/__tests__/", "/node_modules/"],
  cacheDirectory: ".jest/cache",
};
