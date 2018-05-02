module.exports = {
  ...require("../jest.config.js"),
  browser: true,
  moduleNameMapper: {
    "ivi-scheduler": "ivi-test-scheduler",
  }
};
