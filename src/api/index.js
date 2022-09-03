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
export function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        username: 'admin',
        mobile: '13793186354',
        menus: [
          {
            title: 'Demo 演示',
            icon: 'demo',
            path: 'demo',
            isMenu: 1,
            children: [{ path: 'add' }, { path: 'edit' }, { path: 'delete' }]
          }
        ]
      })
    }, 500)
  })
}

export function fetchDict() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('调用接口，获取字典...')
      resolve([
        { name: '字典1', code: 10001 },
        { name: '字典2', code: 10002 },
        { name: '字典3', code: 10003 },
        { name: '字典4', code: 10004 },
        { name: '字典5', code: 10005 }
      ])
    }, 1000)
  })
}
