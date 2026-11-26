import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'docs/**',
      'src/content/**',
    ],
  },
  ...astro.configs['flat/recommended'],
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['src/**/*.ts', 'tests/**/*.ts', 'playwright.config.ts'],
  })),
  {
    files: ['**/*.astro'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: { 'astro/no-set-html-directive': 'error' },
  },
];
