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
            name: '组件示例',
            icon: 'example',
            path: 'example',
            children: [
              {
                name: '下拉框',
                path: 'select'
              },
              {
                name: '下拉树',
                path: 'tree-select'
              },
              {
                name: '下拉多选树',
                path: 'tree-checkbox'
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
              },
              {
                name: 'Table',
                path: 'table'
              }
            ]
          },
          {
            name: '嵌套的路由',
            icon: 'nested',
            path: 'nested',
            children: [
              {
                name: '子路由1',
                path: 'child1'
              },
              {
                name: '子路由2',
                path: 'child2'
              }
            ]
          },
          {
            name: '无嵌套的路由',
            icon: 'file',
            path: 'without-nested'
          }
        ]
      })
    }, 500)
  })
}
