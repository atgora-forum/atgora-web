/**
 * Lint-staged configuration
 * @see https://github.com/lint-staged/lint-staged
 */
export default {
  '*.{ts,tsx}': [
    'prettier --write',
    'eslint --fix',
  ],
  '*.{js,jsx,mjs,cjs}': [
    'prettier --write',
    'eslint --fix',
  ],
  '*.{json,md,mdx,yml,yaml}': [
    'prettier --write',
  ],
  '*.{css,scss}': [
    'prettier --write',
  ],
}
