import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      prettier: prettier,
    },
    rules: {
      indent: ['error', 2],
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      'prefer-const': ['error'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-indent': ['error', 2],
      'react/jsx-no-duplicate-props': ['error'],
      'react/self-closing-comp': 'error',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-key': 'error',

      'arrow-body-style': ['error', 'as-needed'],
      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-use-before-define': ['error', { functions: false, classes: true }],

      quotes: ['error', 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'max-len': ['error', { code: 125 }],
      'comma-dangle': ['error', 'always-multiline'],
      'function-paren-newline': ['error', 'consistent'],
      'eol-last': ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],

      'object-curly-newline': [
        'error',
        {
          'ObjectExpression': { 'multiline': true, 'consistent': true },
          'ObjectPattern': { 'multiline': true, 'consistent': true },
          'ImportDeclaration': { 'multiline': true, 'consistent': true },
          'ExportDeclaration': { 'multiline': true, 'consistent': true },
        },
      ],
      'object-property-newline': [
        'error',
        {
          'allowAllPropertiesOnSameLine': true,
        },
      ],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
      'array-bracket-newline': ['error', { 'multiline': true, 'minItems': null }],
      'array-element-newline': ['error', { 'multiline': true, 'minItems': null }],
    },
  },
];
