const path = require('path');

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier'],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {},
  settings: {},
};
