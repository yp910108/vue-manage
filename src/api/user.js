// 登录
export function login() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'access-token'
      })
    }, 500)
  })
}

// 获取用户信息
export function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: '张三',
        mobile: '13793186354'
      })
    }, 500)
  })
}
