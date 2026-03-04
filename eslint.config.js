import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // TypeScript overrides for base rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {args: 'none'}],
      '@typescript-eslint/consistent-type-imports': 'error',

      // Equality & type safety
      'eqeqeq': ['error', 'always', {null: 'never'}],
      'no-implicit-coercion': 'error',

      // Code quality
      'curly': 'error',
      'no-nested-ternary': 'error',
      'no-console': 'error',
      'no-eval': 'error',
      'no-param-reassign': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'prefer-const': 'error',
      'dot-notation': 'error',
      'default-case': 'error',
      'default-case-last': 'error',

      // Functions
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],

      // Exports
      'no-restricted-exports': ['error', {restrictDefaultExports: {direct: true}}],

      // Import ordering
      'sort-imports': ['error', {ignoreDeclarationSort: true}],
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
);
