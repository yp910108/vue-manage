import Layout from '@/layout'

export default {
  path: '/example',
  name: 'Example',
  alwaysShow: true,
  component: Layout,
  redirect: '/example/select',
  meta: {
    title: '示例',
    icon: 'example'
  },
  children: [
    {
      path: 'select',
      name: 'ExampleSelect',
      component: () => import('@/views/example/select'),
      meta: {
        title: '下拉框'
      }
    },
    {
      path: 'select-tree',
      name: 'ExampleSelectTree',
      component: () => import('@/views/example/select-tree'),
      meta: {
        title: '下拉树'
      }
    },
    {
      path: 'check-tree',
      name: 'ExampleCheckTree',
      component: () => import('@/views/example/check-tree'),
      meta: {
        title: '下拉多选树'
      }
    },
    {
      path: 'cascader',
      name: 'ExampleCascader',
      component: () => import('@/views/example/cascader'),
      meta: {
        title: '级联选择'
      }
    },
    {
      path: 'upload',
      name: 'ExampleUpload',
      component: () => import('@/views/example/upload'),
      meta: {
        title: '上传'
      }
    },
    {
      path: 'dict',
      name: 'ExampleDict',
      component: () => import('@/views/example/dict'),
      meta: {
        title: '字典'
      }
    },
    {
      path: 'user-info',
      name: 'ExampleUserInfo',
      component: () => import('@/views/example/user-info'),
      meta: {
        title: '用户信息'
      }
    },
    {
      path: 'constants',
      name: 'ExampleConstants',
      component: () => import('@/views/example/constants'),
      meta: {
        title: '常量'
      }
    },
    {
      path: 'loading',
      name: 'ExampleLoading',
      component: () => import('@/views/example/loading'),
      meta: {
        title: 'Loading'
      }
    }
  ]
}
