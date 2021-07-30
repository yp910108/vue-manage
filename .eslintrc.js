module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'import/no-cycle': 0,
    'consistent-return': 0,
    'no-else-return': 0,
    'no-nested-ternary': 0,
    'object-curly-newline': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'max-len': 0, // 每行最多可以显示几个字符
    'guard-for-in': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-async-promise-executor': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0
  }
}
