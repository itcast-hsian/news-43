import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'

// 注册路由的插件，把路由关联到vue。固定要加的
Vue.use(VueRouter)

// 路由配置
const routes = [
	{
		path: "/",
		component: () => import("@/views/Index")
	},
	{
		// 登录页
		path: "/login",
		// 除了首页之外的页面都可以用懒加载,@符号代表的src这个目录
		// .vue这个扩展名可以忽略
		component: () => import("@/views/Login")
	},
	{
		// 注册页
		path: "/register",
		component: () => import("@/views/Register")
	},
	{
		// 个人中心页
		path: "/personal",
		component: () => import("@/views/Personal"),
		// 路由可以通过meta自定义数据，可以选择在路由随意加上自己的数据，
		// 它的值可以是任意的类型,
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 编辑页
		path: "/edit-profile",
		component: () => import("@/views/EditProfile"),
		// 路由可以通过meta自定义数据
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 我的关注页
		path: "/follow",
		component: () => import("@/views/Follow"),
		// 路由可以通过meta自定义数据
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 我的跟帖页
		path: "/comment",
		component: () => import("@/views/Comment"),
		// 路由可以通过meta自定义数据
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 我的收藏页
		path: "/star",
		component: () => import("@/views/Star"),
		// 路由可以通过meta自定义数据
		meta: {
			// 代表这个页面需要授权
			authorization: true
		}
	},
	{
		// 栏目管理页
		path: "/category",
		component: () => import("@/views/Category")
	},
	{
		// 栏目管理页
		path: "/search",
		component: () => import("@/views/Search")
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	//路由配置
	routes
})

export default router
