import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
// import axios from 'axios'
import axios from './utils/axios.config'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 全局注册自定义组件
// Vue.use(axios) //用Vue.use的方法去执行axios的注册

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
