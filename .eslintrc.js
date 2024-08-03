module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    eqeqeq: 'error',
    curly: 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'consistent-return': 'error',
  },
};
