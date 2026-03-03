export default {
  bracketSpacing: false,
  bracketSameLine: true,
  quoteProps: 'consistent',
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
