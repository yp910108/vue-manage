module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    indent: 'off',
    'arrow-parens': 1
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
