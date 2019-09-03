// 处理axios拦截器 请求拦截器 响应拦截器
import axios from 'axios'
import jsonBigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
axios.defaults.transformResponse = [function (data) {
  // data 是响应回来的字符串
  return jsonBigInt.parse(data)
}]
axios.interceptors.request.use(function (config) {
  // config 是axios的默认请求配置和传入的配置结合出来的
  // 必须将config return， 不return 不行
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` // 统一的注入token
  return config
}, function () { })

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function () { })
export default axios
// export default {
//   install (Vue) {
//     Vue.prototype.$axios = axios
//   }
// }
