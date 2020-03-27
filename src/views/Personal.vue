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
		<Listbar/>

		<Listbar/>

		<Listbar/>

		<Listbar/>
	</div>
</template>

<script>
// 导入列表按钮栏的组件，import后面接上的组件变量名（变量就意味着可以随便改名字）
// @代表src目录
import Listbar from "@/components/Listbar"

export default {
	// 注册组件,导入的子组件都必须注册才可以再模板渲染
	components: {
		Listbar
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