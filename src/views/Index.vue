<template>
    <div>
        <!-- 红色的头部 -->
        <div class="header">
            <span class="iconfont iconnew"></span>
            <router-link to="#" class="search">
                <span class="iconfont iconsearch"></span>
                <i>搜索新闻</i>
            </router-link>
            <router-link to="/personal">
                <span class="iconfont iconwode"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.header{
    height:50/360*100vw;
    background: #ff0000;
    display: flex;
    padding:0 20/360*100vw;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .iconnew{
        font-size:20px;
        transform: scale(3);
        position: relative;
        left: 20/360*100vw;
    }

    .search{
        flex: 1;
        height: 32/360*100vw;
        margin: 0 50/360*100vw;
        background: rgba(255,255,255,0.5);
        display: flex;
        justify-content: center;
        align-items:center;
        border-radius: 50px;
        font-size: 13px;
        line-height: 1;
        vertical-align: middle;

        span{
            margin-right: 5px;
        }
    }

    .iconwode{
        font-size: 20px;
    }
}
</style>