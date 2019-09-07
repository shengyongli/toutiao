import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// beforeEach在路由变化之前执行，to到哪去，就是routes下的某一项是{},to.path可以取到path
router.beforeEach((to, from, next) => {
  nprogress.start() // 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(function () {
  nprogress.done() // 关闭进度条
})
export default router
