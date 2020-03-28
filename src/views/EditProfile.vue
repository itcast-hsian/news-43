<template>
    <div>
        <!-- 头部导航组件 -->
        <NavigateBar title="编辑资料"/>

        <!-- 头像 -->
        <div class="avatar">
            <img src="https://www.baidu.com/img/bd_logo1.png"/>
        </div>

        <!-- 按钮列表 -->
        <Listbar label="昵称" tips="火星网友"/>
        <Listbar label="密码" tips="******"/>
        <Listbar label="性别" tips="男"/>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";

export default {
    components: {
        NavigateBar,
        Listbar
    }
};
</script>

<style scoped lang="less">
.avatar{
    display: flex;
    padding: 20 / 360 * 100vw;
    justify-content: center;
    align-items: center;

    img{
        width:100 / 360 * 100vw;
        height:100 / 360 * 100vw;
        border-radius: 50%;
    }
}
</style>