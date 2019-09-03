import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
// 所有自定义组件的插件
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册左侧导航全局组件
    Vue.component('layout-header', layoutHeader) // 注册头部全局组件
    Vue.component('bread-crumb', breadCrumb)
  }
}
