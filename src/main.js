import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 全局注册自定义组件

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
