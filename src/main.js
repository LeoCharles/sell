// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'common/stylus/index.styl'

// 将axios挂载到Vue原型上
Vue.prototype.$http = axios
// 请求easy-mock上的数据
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5a3cd49ae4ff93383f3b01d9/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
