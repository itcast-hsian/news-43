import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由配置
const routes = [
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  //路由配置
  routes
})

export default router
