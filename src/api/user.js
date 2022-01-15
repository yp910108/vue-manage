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
        username: 'admin',
        mobile: '13793186354',
        menus: [
          {
            title: '组件示例',
            icon: 'example',
            path: 'example',
            isMenu: 1,
            children: [
              {
                title: '下拉框',
                path: 'select',
                isMenu: 1
              },
              {
                title: '下拉树',
                path: 'tree-select',
                isMenu: 1
              },
              {
                title: '下拉多选树',
                path: 'tree-checkbox',
                isMenu: 1
              },
              {
                title: '级联选择',
                path: 'cascader',
                isMenu: 1
              },
              {
                title: '上传',
                path: 'upload',
                isMenu: 1
              },
              {
                title: '字典',
                path: 'dict',
                isMenu: 1
              },
              {
                title: '用户信息',
                path: 'user-info',
                isMenu: 1
              },
              {
                title: '常量',
                path: 'constants',
                isMenu: 1
              },
              {
                title: 'Loading',
                path: 'loading',
                isMenu: 1
              },
              {
                title: 'Table',
                path: 'table',
                isMenu: 1,
                children: [{ path: 'add' }, { path: 'edit' }, { path: 'delete' }]
              }
            ]
          },
          {
            title: '嵌套的路由',
            icon: 'nested',
            path: 'nested',
            children: [
              {
                title: '子路由1',
                path: 'child1',
                isMenu: 1
              },
              {
                title: '子路由2',
                path: 'child2',
                isMenu: 1
              }
            ]
          }
        ]
      })
    }, 500)
  })
}
