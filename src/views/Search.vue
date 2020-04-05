<template>
    <div>
        <!-- 红色的头部 -->
        <div class="header">
            <span class="iconfont iconjiantou2"></span>
            <!-- 中间的搜索框 -->
            <div class="search-wrapper">
                <span class="iconfont iconsearch"></span>
                <input placeholder="请输入搜索关键字"/>
                <!-- 点击搜索按钮和按回车都会触发搜索 -->
            </div>
            <span>搜索</span>
        </div>

        <!-- 历史记录 -->
        <div class="record">
            <div class="title">
                <strong>历史记录</strong>
                <span class="iconfont iconicon-test"></span>
            </div>
            <div class="record-list">
                <span class="record-item">美女</span>
                <span class="record-item">美女美女</span>
                <span class="record-item">美女美</span>
                <span class="record-item">美女美</span>
                <span class="record-item">美女</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header{
    padding: 10/360*100vw 20/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items:center;

    .search-wrapper{
        flex: 1;
        margin: 0 20/360*100vw;
        border: 1px #ccc solid;
        height: 38/360*100vw;
        padding: 0 10/360*100vw;
        display: flex;
        align-items:center;
        font-size: 14px;
        line-height: 0;
        border-radius:50px;
        box-sizing: border-box;

        input{
            border:none;
            background:none;
            margin-left:5px;
        }
    }
}

.record{
    margin-top: 10/360*100vw;
    .title{
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0 20/360*100vw;
        margin-bottom: 10/360*100vw;
    }

    .record-list{
        padding: 0 10/360*100vw;
        display: flex;
        flex-wrap: wrap;
        
        .record-item{
            padding: 5px 10/360*100vw;
            border: 1px #ccc solid;
            font-size: 14px;
            margin: 5/360*100vw 10/360*100vw;
        }
    }
}
</style>