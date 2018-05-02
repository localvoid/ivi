module.exports = {
  testRegex: "(/__tests__/.*\\.spec)\\.ts$",
  transform: {
    "^.+\\.ts$": "<rootDir>/../../node_modules/ts-jest/preprocessor.js",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverageFrom: ["src/**/*.ts"],
  resetMocks: true,
  verbose: true,
  globals: {
    "DEBUG": true,
    "TARGET": "browser",
  },
};
