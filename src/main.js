import Vue from 'vue'
import store from './store'
import router from './router'

import './styles/index.scss'
import './plugins'
import './mixins'
import './filters'
import './directives'
import './permission'

import App from './App'

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
