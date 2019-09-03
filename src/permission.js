import router from './router'
// beforeEach在路由变化之前执行，to到哪去，就是routes下的某一项是{},to.path可以取到path
router.beforeEach((to, from, next) => {
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
export default router
