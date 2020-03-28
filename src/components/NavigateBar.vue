<template>
    <!-- 顶部的导航条 -->
    <div class="navigate-bar">
        <!-- $router.back()是实例下的属性，可以直接在模板中渲染 -->
        <span class="iconfont iconjiantou2" @click="$router.back()"></span>
        <strong>个人中心</strong>
        <!-- $router.push()是实例下的属性，可以直接在模板中渲染 -->
        <span class="iconfont iconshouye" @click="$router.push('/')"></span>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.navigate-bar{
	line-height: 48 / 360 * 100vw;
	display: flex;
	justify-content: space-between;
	align-items:center;
	padding: 0 20 / 360 * 100vw;
	border-bottom:1px #eee solid;

	.iconshouye{
		font-size: 20px;
	}
}
</style>