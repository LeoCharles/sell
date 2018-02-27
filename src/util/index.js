import axios from 'axios'

export default {
  install (Vue, options) {
    // 将 axios 挂载到Vue实例
    Vue.prototype.$http = axios

    // 接口host
    Vue.prototype.serverPath = 'https://www.easy-mock.com/mock/5a3cd49ae4ff93383f3b01d9/api'
  }
}
