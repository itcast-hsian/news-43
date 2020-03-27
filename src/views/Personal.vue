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
			object-fit: contain;
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