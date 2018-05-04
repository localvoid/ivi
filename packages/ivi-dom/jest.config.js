module.exports = {
  ...require("../../tools/jest/config.js"),
  browser: true,
  moduleNameMapper: {
    "ivi-scheduler": "ivi-test-scheduler",
  },
};
