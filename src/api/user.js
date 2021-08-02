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
        mobile: '13793186354',
        menus: [
          {
            name: '示例',
            icon: 'example',
            path: 'example',
            children: [
              {
                name: '下拉框',
                path: 'select'
              },
              {
                name: '下拉树',
                path: 'select-tree'
              },
              {
                name: '下拉多选树',
                path: 'check-tree'
              },
              {
                name: '级联选择',
                path: 'cascader'
              },
              {
                name: '上传',
                path: 'upload'
              },
              {
                name: '字典',
                path: 'dict'
              },
              {
                name: '用户信息',
                path: 'user-info'
              },
              {
                name: '常量',
                path: 'constants'
              },
              {
                name: 'Loading',
                path: 'loading'
              }
            ]
          },
          {
            name: '示例-下拉框',
            icon: 'example',
            path: 'example-select'
          }
        ]
      })
    }, 500)
  })
}
