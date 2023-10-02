module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'no-unused-vars': 'off',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-throw-literal': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/restrict-template-expressions': ['off'],
  },
};
