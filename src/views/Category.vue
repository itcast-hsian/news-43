<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="栏目管理"/>
        <div class="content">
            <p class="desc">点击删除一下频道</p>
            <div class="list">
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
            </div>
            <p class="desc">点击添加一下频道</p>
            <div class="list">
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
                <span class="item">推荐</span>
            </div>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"

export default {
    // 注册组件
    components: {
        NavigateBar
    },
};
</script>

<style scoped lang="less">
.content{
    padding: 10/360*100vw;
    .desc{
        font-size: 14px;
        margin: 10/360*100vw;
    }

    .list{
        display: flex;
        flex-wrap: wrap;
        .item{
            border: 1px #999 solid;
            padding: 5px 10px;
            font-size: 16px;
            margin: 5/360*100vw 10/360*100vw;
        }
    }
}
</style>