import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import prettierEslintConfig from 'eslint-config-prettier'

export default [
  typescriptEslintPlugin.configs.recommendedTypeChecked,
  prettierEslintConfig,
  {
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    plugins: {
      typescriptEslintPlugin
    },
    files: ['src/**/*.ts']
  }
]