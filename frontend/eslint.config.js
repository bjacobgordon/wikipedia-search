import globals from 'globals'

import eslint_js from '@eslint/js'
import eslint_ts from 'typescript-eslint'

import react        from 'eslint-plugin-react'
import reactHooks   from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default eslint_ts.config(
  { ignores: ['dist'] },
  {
    extends: [eslint_js.configs.recommended,
      ...eslint_ts.configs.strictTypeChecked,
      ...eslint_ts.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: '18.3.1' },
    },
    plugins: {
      'react'        : react,
      'react-hooks'  : reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
