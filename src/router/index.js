import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入组件，home是一个普通页面组件，home是首页
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    // 组件的懒加载，只有当我访问这个页面的时候，才会加载这个组件的资源
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  //路由配置
  routes
})

export default router
