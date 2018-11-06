const path = require('path');

module.exports = {
  extends: ['airbnb-base', 'prettier'],
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
