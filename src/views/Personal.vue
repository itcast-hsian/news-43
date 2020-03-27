<template>
    <div class="container">
		<!-- 头部 -->
		<div class="header">
			<!-- 头像 -->
			<div class="avatar">
				<img src="https://www.baidu.com/img/bd_logo1.png" alt="">
			</div>
			<!-- 姓名 -->
			<div class="profile">
				<div>
					<span class="iconfont iconxingbienan"></span>
					火星网友
				</div>
				<p>2020-03-27</p>
			</div>
			<!-- 右侧的箭头图标 -->
			<span class="arrow iconfont iconjiantou1"></span>
		</div>

		<!-- 组件的调用，单双标签都可以 -->
		<!-- :key不是报错，可以不加，
		但是vue希望给循环的元素指定“唯一的key”，所以推荐我们在循环时候都加上 -->
		<Listbar v-for="(item, index) in rows" :key="index"
		:label="item.label" 
		:tips="item.tips"/>
	</div>
</template>

<script>
// 导入列表按钮栏的组件，import后面接上的组件变量名（变量就意味着可以随便改名字）
// @代表src目录
import Listbar from "@/components/Listbar"

export default {
	data(){
		return {
			// 组织一个列表按钮栏的数据
			rows: [
				{ label: "我的关注", tips: "关注的用户" },
				{ label: "我的跟帖", tips: "跟帖回复" },
				{ label: "我的收藏", tips: "文章视频" },
				{ label: "设置", tips: "" },
			]
		}
	},
	// 注册组件,导入的子组件都必须注册才可以再模板渲染
	components: {
		Listbar
	},
	// 组件加载完毕后触发，类似window.onload
	mounted(){
		// 从本地获取token和id
		const jsonStr = localStorage.getItem("userInfo");
		// 把字符串转成对象,userJson就是用户的信息对象
		// userJson.token和userJson.user.id 这两个值是接口需要的
		const userJson = JSON.parse(jsonStr);

		// 发起异步的请求
		this.$axios({
			url: "/user/" +   userJson.user.id,
			// 添加头信息
			headers: {
				Authorization: userJson.token
			}
		}).then(res => {
			console.log(res)
		})
	}
};
</script>

<style scoped lang="less">
.header{
	padding: 20 / 360 * 100vw;
	display: flex;
	justify-content: space-between;
	align-items:center;
	border-bottom: 5px #eee solid;

	.avatar{
		img{
			display: block;
			width:70 / 360 * 100vw;
			height: 70 / 360 * 100vw;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	.profile{
		flex:1;
		padding-left: 20 / 360 * 100vw;
		line-height: 1.5;
		p{
			color: #999;
		}
	}
}
</style>