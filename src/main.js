// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import qs from 'qs'


axios.interceptors.request.use(
  config => {
    // 这里写死一个token，你需要在这里取到你设置好的token的值
    const token = sessionStorage.getItem('userId')
    if (token) {
      // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
      config.headers.token = token
      // if(config.params){
      //   config.params.token=token
      // }else{
      //   config.params={}
      //   config.params.token=token
      // }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (sessionStorage.getItem('userId')) { // 查询本地存储信息是否已经登陆
      next()
    } else {
      next({
        path: '/login', // 未登录则跳转至login页面
        query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      })
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
