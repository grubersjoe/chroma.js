module.exports = {
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
  extends: "eslint:recommended",
  globals: {},
  rules: {
    "no-sequences": "error",
  },
};
