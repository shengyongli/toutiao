import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '', // 默认的二级路由  的地址 path为空串
        component: Main
      }, {
        path: 'comment',
        component: () => import('./views/comment')
      }, {
        path: 'material',
        component: () => import('./views/material')
      },

      {
        path: 'articles',
        component: () => import('./views/articles')
      },

      // 发表文章
      {
        path: 'publish',
        component: () => import('./views/publish')
      }, // 修改文章
      {
        path: 'publish/:articleId',
        component: () => import('./views/publish')
      }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
