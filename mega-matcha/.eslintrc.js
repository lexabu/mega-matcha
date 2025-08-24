/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'dist/',
    '*.config.js',
    '*.config.ts',
    'jest.config.js',
    'next-sitemap.config.js',
    'commitlint.config.js',
  ],
  overrides: [
    {
      files: [
        '*.config.js',
        '*.config.ts',
        'jest.config.js',
        'commitlint.config.js',
        'next-sitemap.config.js',
      ],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
