module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ["error", "windows"],
    'no-param-reassign': ["error", { "props": false }],
    'arrow-parens': 'off',
    'no-tabs': 'off',
    'no-param-reassign': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    '__CLIENT_ID__': true,
    '__ACCOUNT_API__': true,
    '__API_HOST__': true,
    '__PROD__': true,
    '__AMAP_API_KEY__': true,
    'AMap': true,
  },
};
