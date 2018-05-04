module.exports = {
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
  collectCoverageFrom: ["src/**/*.ts"],
  resetMocks: true,
  verbose: true,
  globals: {
    "DEBUG": true,
    "TARGET": "browser",
    "ts-jest": {
      "tsConfigFile": "./tsconfig.json",
    },
  },
};
