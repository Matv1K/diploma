import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

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
    },
    rules: {
      indent: ['error', 2, {
        SwitchCase: 1,
        VariableDeclarator: { var: 2, let: 2, const: 2 },
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
      }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      'prefer-const': ['error'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-var': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],

      // React-specific rules
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

      // Additional code style rules
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-use-before-define': ['error', { functions: false, classes: true }],

      // Formatting rules
      quotes: ['error', 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'max-len': ['error', { code: 125 }],
      'comma-dangle': ['error', 'always-multiline'],
      'function-paren-newline': ['error', 'consistent'],
      'object-curly-newline': ['error', { consistent: true }],
      'eol-last': ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
    },
  },
];
