// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import "babel-polyfill"
import { Message } from 'element-ui';
import Router from './router'
import '../static/css/wuye.css'

axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('userId')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    // console.log(response)
    const data = response.data
    if (data.status === 603) {
      Message({
        message: '您的账号在另一设备上登录',
        type: 'error',
        duration: 5 * 1000
      })
      Router.push('/login')
    } else if (data.status === 403) {
      Message({
        message: '权限不足',
        type: 'error'
      })
    }else if (data.status === 506) {
      Message({
        message: data.message,
        type: 'error'
      })
      Router.push('/login')
    }else{
      return response
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '权限不足'
          break
        case 404:
          error.message = (process.env.NODE_ENV === 'production' ? `请求地址出错` : `请求地址出错: ${error.response.config.url}`)
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      Router.push('/login')
    }
    return Promise.reject(error)
  }
)

axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  const userKey = sessionStorage.getItem('userId')
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (!userKey && to.path !== '/login') { // 查询本地存储信息是否已经登陆
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if (userKey && to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
