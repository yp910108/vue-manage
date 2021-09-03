/**
 * 统一配置
 * development 本地环境
 * staging 开发环境
 * testing 测试环境
 * production 正式环境
 * @type {string}
 */

if (process.env.VUE_APP_ENV === 'development') {
  // 本地环境
} else if (process.env.VUE_APP_ENV === 'staging') {
  // 开发环境
} else if (process.env.VUE_APP_ENV === 'testing') {
  // 测试环境
} else if (process.env.VUE_APP_ENV === 'production') {
  // 正式环境
}

const baseUrl = '/api/' // 接口地址

export { baseUrl }
