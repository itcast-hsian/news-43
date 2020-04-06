<template>
    <div>
        <!-- 红色的头部 -->
        <div class="header">
            <span class="iconfont iconjiantou2"></span>
            <!-- 中间的搜索框 -->
            <div class="search-wrapper">
                <span class="iconfont iconsearch"></span>
                <!-- keyup.enter是键盘事件，keyup就是原生的onkeyup，enter就是确认键 -->
                <input placeholder="请输入搜索关键字" v-model="value" @keyup.enter="handleSearch"/>
                <!-- 点击搜索按钮和按回车都会触发搜索 -->
            </div>
            <span @click="handleSearch">搜索</span>
        </div>

        <!-- 历史记录 -->
        <div class="record">
            <div class="title">
                <strong>历史记录</strong>
                <span class="iconfont iconicon-test"></span>
            </div>
            <div class="record-list">
                <span class="record-item" v-for="(item, index) in history" :key="index">
                    {{item}}
                </span>
            </div>
        </div>

        <!-- 搜索结果的浮层 -->
        <div class="result-layer" v-if="false">
            <div class="result-item">
                <p>搜索结果的浮层搜索结果的浮层搜索结果的浮层搜索结果的浮层搜索结果的浮层搜索结果的浮层</p>
                <span class="iconfont iconjiantou1"></span>
            </div>
            <div class="result-item">
                <p>搜索结果的浮层搜索结果的浮层</p>
                <span class="iconfont iconjiantou1"></span>
            </div>
            <div class="result-item">
                <p>搜索结果的浮层搜索结果的浮层</p>
                <span class="iconfont iconjiantou1"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 输入框的值
            value: "",
            // 历史记录,先获取本地的搜索记录，如果没有就是等于一个空数组
            history: JSON.parse(localStorage.getItem("history")) || []
        }
    },
    methods: {
        // 点击搜索或者按钮回车按钮触发的事件
        handleSearch(){
            // 把当前的搜索关键添加到数组中
            this.history.unshift(this.value);
            // 数组去重
            this.history = [...new Set(this.history)]
            // 把搜索关键字添加到本地
            localStorage.setItem("history", JSON.stringify(this.history));
        }
    }
};
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

.result-layer{
    position: absolute;
    // 在定位中如果同时设置top和bottom，那么这个元素高度取这两个定位的距离!
    top: 58/360*100vw;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow-y: auto;
    padding: 20/360*100vw;
    box-sizing: border-box;

    .result-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10/360*100vw 0;
        border-bottom:1px #eee solid;

        p{
            flex: 1;
            margin-right: 10px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        span{
            color: #999;
        }
    }
}
</style>