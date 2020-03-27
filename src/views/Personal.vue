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

		<!-- 列表按钮栏 -->
		<div class="listbar">
			<router-link to="#">
				<div>我的关注</div>
				<div class="tips">
					关注的用户
					<span class="iconfont iconjiantou1"></span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {};
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

/**
	列表按钮栏的样式
*/
.listbar{
	padding-left: 20 / 360 *100vw;
	height: 48 / 360 *100vw;
	line-height: 48 / 360 *100vw;

	a{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px #eee solid;
		align-items: center;
		padding-right: 20 / 360 *100vw;
	}

	.tips{
		color: #999;
		span{
			margin-left: 5px;
		}
	}
}
</style>