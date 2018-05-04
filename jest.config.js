module.exports = {
  projects: ["packages/*"],
  coverageReporters: ["text", "json", "lcov", "html"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coveragePathIgnorePatterns: ["/__tests__/", "/node_modules/"],
  cacheDirectory: ".jest/cache",
};
