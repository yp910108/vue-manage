'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '基础后台管理系统' // 浏览器标题

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
      '/': {
        target: 'http://10.112.2.10',
        changeOrigin: true,
        ws: false
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/base/icon'))
      .end()
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
