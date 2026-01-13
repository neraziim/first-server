import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],//_미사용변수 무시
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
