// vue构造函数
import Vue from 'vue'
// App组件（以.vue结尾的文件都是组件）
import App from './App.vue'
// 路由对象
import router from './router'
// 引入vant ui组件库
import Vant, {Toast} from 'vant';
// 导入axios
import axios from "axios";

// 保存根实例对象的
let app;

// 绑定到原型，加上之后以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;
// 给axios添加基准路径，添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = "http://127.0.0.1:3000"
//axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"

// 注册vant插件 （vue.use都是用来注册插件）
Vue.use(Vant);

// 上线环境是否提示信息(忽略)
Vue.config.productionTip = false

// 添加路由的守卫
// to: 代表你即将要访问的页面
// from：代表你即将要离开的页面
// next：必须要调用，next就类似于你nodejs的中间件，调用才会加载后面的内容
router.beforeEach((to, from, next) => {

	// 需要验证的页面
	if (to.meta.authorization) {
		// 判断是否是登录状态，时候有token
		// 如果本地的数据是空会返回null，null是没有token属性，会导致js报错，
		// 所以可以加个判断，如果本地的数据空的，等于空的对象
		const userJson = JSON.parse(localStorage.getItem('userInfo')) || {};

		// 有token可以正常访问
		if (userJson.token) {
			next();
		} else {
			// 跳转到登录页,next这个函数可以传递路径，并且会跳转该路径
			next("/login");
		}
	} else {
		// 非个人中心页
		next();
	}
})

// axios的响应拦截器 文档地址：https://github.com/axios/axios#interceptors
axios.interceptors.response.use(res => {
	return res;
}, error => {
	// 如果请求返回的结果是错误的，会进入到错误的处理函数中
	// error是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
	const {statusCode, message} = error.response.data;

	if(statusCode === 400){
		Toast.fail(message);
	}

	// 如果状态码是403，就表示token是错的或者没有传token
	if(statusCode === 403){
		// 提示
		Toast.fail(message);

		// 跳转到登录页, push方法的参数除了可以直接写一个字符串还可以写一个对象
		// 对象里面的path属性表示路径，query表单问号的参数
		// 比如这完整的路径其实 /login?return_url=/posts/8
		app.$router.push({
			path: "/login",
			query: {
				return_url: app.$route.path
			}
		});
	}

	return Promise.reject(error)
})


// 创建一个根实例
// .$mount('#app') 相当于el配置，指定id为app的元素作为模板
app = new Vue({
	// 路由对象
	router,
	// 加载第一个子组件，最底层的组件，（写法是固定的）
	render: h => h(App)
}).$mount('#app')
