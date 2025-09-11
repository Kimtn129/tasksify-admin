export default {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser'
    }
  ]
}