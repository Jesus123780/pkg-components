module.exports = {
  extends: ['plugin:storybook/recommended', 'eslint-config-next-front/.eslintrc.js'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true // Habilita la sintaxis JSX
    }
  },
  rules: {
    semi: ['error', 'never'],
    'storybook/hierarchy-separator': 'error',
    'storybook/default-exports': 'off'
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'semi': ['error', 'never'],
        'storybook/hierarchy-separator': 'error',
        'storybook/default-exports': 'off'
      }
    }
  ]
}
