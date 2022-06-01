'use strict'
const path = require('path')
const sassLoader = require.resolve('sass-loader')
const settings = require('./src/settings')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 9000, // 本地项目端口
    proxy: {
      [process.env.VUE_APP_API_URL]: {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_URL}`]: ''
        }
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
      args[0].title = settings.title
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
