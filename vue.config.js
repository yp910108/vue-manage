'use strict'
const path = require('path')
const sassLoader = require.resolve('sass-loader')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 前端代码打包后部署的路径
const publicPath = {
  development: '/',
  staging: '/',
  production: '/'
}[process.env.VUE_APP_ENV]

module.exports = {
  productionSourceMap: false,
  publicPath,
  devServer: {
    port: 9000, // 本地项目端口
    open: true,
    overlay: {
      errors: true,
      warnings: false
    },
    clientLogLevel: 'warning',
    proxy: {
      '/api': {
        target: 'http://49.232.208.239',
        changeOrigin: true,
        ws: false
      }
    }
  },
  configureWebpack: (config) => {
    // 解决 element-ui 字体图标乱码问题
    config.module.rules
      .filter((rule) => {
        return rule.test.toString().indexOf('scss') !== -1
      })
      .forEach((rule) => {
        rule.oneOf.forEach((oneOfRule) => {
          const sassLoaderIndex = oneOfRule.use.findIndex((item) => item.loader === sassLoader)
          oneOfRule.use.splice(sassLoaderIndex, 0, { loader: require.resolve('css-unicode-loader') })
        })
      })
  },
  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      args[0].title = '基础后台管理系统'
      return args
    })
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/base/icon')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/base/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
