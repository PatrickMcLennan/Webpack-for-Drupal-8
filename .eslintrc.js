module.exports = {
  extends: "./docroot/core/.eslintrc.json",
  parser: "@typescript-eslint/parser",
  globals: {
    Drupal: "readonly",
  },
  plugins: [
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-jsx-react",
    "@typescript-eslint/eslint-plugin",
  ],
};
