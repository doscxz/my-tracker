import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  // 1. Игнорируемые файлы
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'dist/**'],
  },

  // 2. Базовые расширения от Next.js
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/strict',
    'plugin:unicorn/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier' // должен идти последним
  ),

  // 3. Переопределения и кастомные правила
  {
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },

    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      'unused-imports': (await import('eslint-plugin-unused-imports')).default,
      'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
      unicorn: (await import('eslint-plugin-unicorn')).default,
      import: (await import('eslint-plugin-import')).default,
    },

    rules: {
      // === Базовые правила ===
      'no-console': 'warn', // console.log только через явное отключение
      'no-debugger': 'error',
      'no-alert': 'error',

      // === TypeScript ===
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error', // отключаем, вместо него ниже
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // === Импорты ===
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'error',

      // === React / Next ===
      'react/jsx-sort-props': [
        'warn',
        { callbacksLast: true, shorthandFirst: true, reservedFirst: true },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],

      // === Unicorn ===
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-array-for-each': 'off', // по желанию
      'unicorn/prefer-top-level-await': 'off', // если не используете
      'unicorn/no-null': 'off', // React часто использует null
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];
