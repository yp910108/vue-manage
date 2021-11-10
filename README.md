# 基础后台管理系统 🚀🚀🚀

## 说明

> [基础后台管理系统](http://xxx.com)基于开源项目[vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/)

## 目录结构

```
├── public                     # 公共资源
│   ├── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 图片、字体等静态资源
│   ├── base                   # 基础组件（页面中无需引入可直接使用）
│   ├── components             # 公用组件
│   ├── config                 # 配置文件（一般是服务器统一入口）
│   ├── constants              # 公用常量
│   ├── directives             # 公用指令
│   ├── filters                # 公用过滤器
│   ├── layout                 # 整体页面布局
│   ├── mixins                 # 公用 mixins
│   ├── plugins                # 公用 plugins
│   ├── router                 # 路由
│   ├── store                  # vuex
│   ├── styles                 # 公用样式
│   ├── utils                  # 公用工具方法
│   ├── views                  # 业务代码
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── .env.xxx                   # 环境变量配置（一般设置开发、测试、生产环境）
├── .eslintignore              # eslintignore
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # gitignore
├── .prettierrc                # 格式化插件配置
├── .babel.config.js           # babel 配置
├── package.json               # package.json
├── postcss.config.js          # postcss 配置
├── README.md                  # README
└── vue.config.js              # vue-cli 配置
```

## 权限控制

> 注：本地`storage`只存储`token`，用户信息以及权限菜单信息都统一用`vuex`来管理，当用户已经是登录状态但是`f5`刷新页面时，根据`token`获取用户信息以及权限信息，并存入`vuex`中。

### 页面权限

> 页面权限控制逻辑在`src/permission.js`中，并且每次路由跳转都会触发`beforeEach`方法。

登录成功后，会保存当前用户的`token`至本地（`localStorage`或`sessionStorage`）。此时，如果`url`后面存在`redirect`，则会跳转至`redirect`后面的页面地址，否则，跳转至首页`/`。`src/views/user/login/index.vue`

```js
async login() {
  // 省略
  const { query } = this.$route
  this.$router.push(query.redirect || '/')
  // 省略
}
```

未登录系统的用户只能访问注册、登录等白名单页面，如果输入非白名单页面地址，则强制跳转到登录页面，此时`url`后面后会追加`?redirect=xxx`，目的在于登录后可以直接跳转至`?redirect=`后面的页面地址。

```js
/* no token */
if (whiteList.indexOf(to.path) !== -1) {
  next()
} else {
  // 否则全部重定向到登录页
  next(`/user/login?redirect=${to.path}`)
}
```

对于已登录系统的用户，不允许访问登录页面，如果输入登录页面地址，则会强行跳转至首页。

```js
/* has token */
if (to.path === '/user/login') {
  next('/')
}
```

当用户已经是登录状态但是`f5`刷新页面时，此时`vuex`并没有用户信息以及权限信息，需要请求后台接口通过`token`获取用户信息以及权限信息。对于普通的路由跳转则无需做任何处理，直接跳转即可。

```js
if (!Object.keys(store.state.user.user).length) {
  // 如果用户没有拉取完用户信息（当用户F5刷新页面时，没有用户信息）
  try {
    const user = await store.dispatch('user/getUser')
    store.dispatch('permission/generateRoutes', user)
    router.addRoutes(store.state.permission.addRoutes)
    next({ ...to, replace: true }) // hack 确保刷新页面时可以加载当前路由, set replace: true 设置之后不会留下当前路由的记录
  } catch (e) {
    console.warn(e)
    store.dispatch('user/fedLogout')
    next('/')
  }
} else {
  next()
}
```

对于已登录系统的用户，如果输入的页面地址不存在，则强制跳转到首页面（第一个页面/路由）。`src/router/index.js`

```js
// 未匹配的路由需要跳转的页面在这里配置
export const unmatchedRoute = {
  path: '*',
  redirect: '/'
}
```

### 菜单权限

> 思路：通过获取当前用户的权限信息生成路由表，通过 router.addRoute 动态挂载到 router 上。

一般前端默认会将静态路由表（一般为白名单页面和首页）维护到路由中。`src/router/index.js`

```js
// 初始路由（不需要 layout 的路由）在这里配置
const routes = [
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import('@/views/user/login')
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: ':path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

// 初始路由（需要 layout 的路由）在这里配置
export const route = {
  path: '/',
  component: Layout,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }
  ]
}
```

用户登录成功后会拉取用户信息（若用户信息中无权限信息，还会获取权限信息），前端根据后端返回的权限信息生成路由表，动态追加到路由中。`src/store/permission.js`中。

### 按钮权限

## 布局

## 侧边栏

## 基础组件

> 下面列出的基础组件都是基于[element-ui](https://element.eleme.cn/2.12/#/zh-cn/component/installation)。本着尽量不改造官方`api`的原则，对原有官方组件进行了改造。改造方面有两个：1、调用简单；2、基于业务

### 字体图标 icon（详细介绍见其他 => 字体图标）

```
<i-icon icon="home" />
```

### 表格 table

- 与官方`api`尽量保持了一致性，比官方`api`增加了`columns`属性，`columns`与`el-table-column`的属性保持一致（属性名支持驼峰和中划线两种方式）
- 简化`el-table`用法，不需要手动添加`el-table-column`
- 通过`columns`配置表格具体渲染逻辑

```js
// src/views/example/table/index.vue
// 调用方式
<i-table :columns="columns" :data="list" border @selection-change="handleSelectionChange">
  <template #action="{ row }">
    <el-button type="text" size="small" @click="handleAdd(row)">新增</el-button>
    <el-button type="text" size="small">修改</el-button>
    <el-button type="text" size="small">删除</el-button>
  </template>
</i-table>
// columns
columns: [
  { type: 'selection', width: 50, align: 'center' },
  { align: 'center', label: '姓名', prop: 'name' },
  { align: 'center', label: '性别', prop: 'sex', render: (text) => sexKeyValue[text] },
  { align: 'center', label: '手机号', prop: 'phone' },
  { align: 'center', label: '身份证号', prop: 'idCard' },
  { align: 'center', label: '出生日期', prop: 'birthDate' },
  { align: 'center', label: '操作', slot: 'action' }
]
// 数据
// const SEX = {
//   man: 1,
//   woman: 2
// }
// const sexOptions = [
//   { value: SEX.man, label: '男' },
//   { value: SEX.woman, label: '女' }
// ]
// const sexKeyValue = {
//   [SEX.man]: '男',
//   [SEX.woman]: '女'
// }
list:  new Array(10)
  .fill({
    name: '张三',
    sex: SEX.man,
    phone: '13812345678',
    idCard: '370181200022222222',
    birthDate: '1991-04-01'
  })
  .map((item, index) => ({ id: index, ...item, sex: index % 2 === 0 ? SEX.man : SEX.woman }))
```

### 下拉框 select

- 与官方`api`尽量保持了一致性，比官方`api`增加了`props`属性，默认`{ value: 'value', label: 'label' }`
- 简化`el-select`用法，不需要手动添加`el-option`
- 修改`change`事件，回调参数为当前选中的对象

```js
// src/views/example/select/index.vue
// 调用方式
<i-select
  v-model="va"
  :props="{
    value: 'id',
    label: 'name'
  }"
  :options="options"
  placeholder="请选择"
/>
// 数据
options: [
  { id: '10001', name: '黄金糕' },
  { id: '10002', name: '双皮奶' },
  { id: '10003', name: '蚵仔煎' },
  { id: '10004', name: '龙须面' },
  { id: '10005', name: '北京烤鸭' }
]
```

### 下拉树 tree-select

- 因为官方没有下拉树组件，所以基于`el-tree`封装了此组件
- 与官方`api`尽量保持了一致性，比官方 api 增加了`placeholder`、`claerable`属性，数据属性为`options`
- `props`属性比官方`api`多了一个`value`、`parentValue`，默认`{ value: 'value', label: 'label', parentValue: 'parentValue', children: 'children' }`

```js
// src/views/example/tree-select/index.vue
// 调用方式
<i-tree-select
  v-model="val"
  :props="{
    value: 'id',
    label: 'name',
    parentValue: 'parentId',
    children: 'childNode'
  }"
  :options="options"
  placeholder="请选择"
/>
// 数据略，见 example
```

### 下拉多选树 tree-checkbox

- 因为官方没有下拉树组件，所以基于`el-tree`封装了此组件
- 与官方`api`尽量保持了一致性，比官方 api 增加了`placeholder`、`claerable`属性，数据属性为`options`
- `props`属性比官方`api`多了一个`value`、`parentValue`，默认`{ value: 'value', label: 'label', parentValue: 'parentValue', children: 'children' }`

```js
// src/views/example/tree-checkbox/index.vue
// 调用方式
<i-tree-checkbox
  v-model="val"
  :props="{
    value: 'id',
    label: 'name',
    parentValue: 'parentId',
    children: 'childNode'
  }"
  :options="options"
  placeholder="请选择"
/>
// 数据略，见 example
```

### 级联选择 cascader

- 与官方`api`尽量保持了一致性，比官方`api`增加了`parentValue`属性，用于指定父节点的`value`
- `value`支持只设置最后一级
- 修改`change`事件，参数为若干对象组成的数组

```js
// src/views/example/cascader/index.vue
// 调用方式
<i-cascader
  v-model="val"
  :props="{
    value: 'id',
    label: 'name',
    parentValue: 'parentId',
    children: 'childNode'
  }"
  :options="options"
  placeholder="请选择"
/>
// 数据略，见 example
```

### 上传 upload

- 简化调用方式，直接通过`v-model`的方式调用即可
- 考虑到上传图片和上传文件用到的最多，所以基于`i-upload`封装了`upload-picture`和`upload-file`公用组件

```js
// src/views/example/upload/index.vue
// 调用方式
<upload-picture v-model="pics" />
<upload-file v-model="files" />
// 数据略，见 example
```

## 其他

### 格式化

项目中统一使用`prettier`进行格式化，配置规则在`.prettierrc`中

### 字体图标

> [原文连接](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/icon.html#%E7%94%9F%E6%88%90%E5%9B%BE%E6%A0%87%E5%BA%93%E4%BB%A3%E7%A0%81)

如果你没有在`src/base/icon/svg`文件夹中找到需要的图标，可以到 [iconfont.cn](https://www.iconfont.cn/) 上选择并生成自己的业务图标库，下载`svg`格式图标并放到`src/base/icon/svg`文件夹中就可以了。（也可以在设计图上自己下载`svg`格式的图标）

```js
// 使用方式
<i-icon icon="home" /> // icon 为 src/base/icon/svg 下图标文件的名字
```

### css

- 对`element-ui`进行的修改统一放入`src/styles/element-ui.scss`中
- 公用样式的维护放入`/src/styles/_common.scss`中

### 路由

入口文件`src/router/index.js`中可进行路由的配置

```js
// 初始路由（不需要 layout 的路由）在这里配置
const routes = []

// 初始路由（需要 layout 的路由）在这里配置（注：配置在 children 中 🙌）
export const route = {
  path: '/',
  component: Layout,
  children: []
}

// 页面级路由（一般为二级路由）在这里配置，此类路由不会出现在导航菜单中
export const pageRoutes = []

// 未匹配的路由需要跳转的页面在这里配置
export const unmatchedRoute = {
  path: '*',
  redirect: '/'
}
```

### vuex

建议为每一个模块的 `store` 都建立一个文件夹，并且使用命名空间进行区分

### 用户信息

由于用户信息使用较频繁，所以直接将用户信息放入全局`mixin`中

```js
// 使用
<template>
  <aside>
    {{ user }}
  </aside>
</template>

<script>
export default {
  created() {
    console.log(this.user)
  }
}
</script>
```

### 字典

项目中字典可以通过引入`mixin`进行使用，第一次使用会调取接口进行获取并缓存，以后使用会直接读取缓存。如果需要添加字典，只需要在`src/mixins/remotes/remotes`中进行设置，然后在需要使用的地方进行引入即可。

```js
// 设置字典名称
const caches = {
  dict: fetchDict // fetchDict 为异步获取字典的方法
}
// 使用
;<template>
  <aside>{{ dict }}</aside>
</template>
import remotes from '@/mixins/remotes'
export default {
  mixins: [remotes]
}
```

### 常量

常量的应用场景一般有：下拉框、根据`code`显示文字、设置状态颜色、逻辑判断，如果需要配置常量，可以在`src/constants`下面添加。建议分模块管理，如果想要统一出口可以添加`index.js`并在`index.js`中通过`export * from './xxx'`把全部模块导出。下面以用户状态为例演示常量的用法，假设用户状态为：1 通过、2 驳回，后台返回的数据为`{ status: 1 }`。

> 注：如果非状态常量，则无需增加`auditStatusColorCls`常量，`_variables.scss`、`_common.scss`也无需添加对应 css

```js
// src/constants/user.js
export const USER_AUDIT_STATUS = {
  pass: 1, // 通过
  back: 2 // 驳回
}
export const userAuditStatusOptions = [
  { value: USER_AUDIT_STATUS.pass, label: '通过' },
  { value: USER_AUDIT_STATUS.back, label: '驳回' }
]
export const userAuditStatusKeyValue = getKeyValue(userAuditStatusOptions)
export const auditStatusColorCls = getCls(USER_AUDIT_STATUS, 'color-status-')

// src/styles/_variables.scss
$--color-status-pass: #4c9e10; // 通过
$--color-status-back: #bf1c1c; // 驳回

// src/styles/_common.scss
.color-status-pass {
  color: $--color-status-pass; // 草稿
}
.color-status-back {
  color: $--color-status-back; // 驳回
}

// src/views/example/constants/index.vue
<aside>
  <h3>下拉框</h3>
  审核状态：<i-select v-model="status" :options="userAuditStatusOptions" />
</aside>
<aside>
  <h3>显示文字，并设置状态颜色</h3>
  审核状态：
  <span :class="auditStatusColorCls[res.status]">
    {{ userAuditStatusKeyValue[res.status] }}
  </span>
</aside>
<aside>
  <h3>逻辑判断</h3>
  <el-button v-if="res.status === USER_AUDIT_STATUS.pass">测试按钮</el-button>
</aside>
```

### 导入、导出

### element-ui

如果需要切换主题色，可到`element`[在线主题生成工具](https://element.eleme.cn/#/zh-CN/theme/preview)进行下载并将下载的文件放入`src/styles/element`文件夹中。
