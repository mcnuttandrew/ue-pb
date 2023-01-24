module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: 0,
    'object-curly-spacing': 0,
    'space-before-function-paren': 0
  }
};
