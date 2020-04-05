<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="栏目管理"/>
        <div class="content">
            <p class="desc">点击删除一下频道</p>
            <div class="list">
                <!-- 循环渲染出is_top为1的栏目数组 -->
                <span class="item" 
                v-for="(item, index) in arrUp" 
                :key="index"
                :class="['关注','头条'].includes(item.name) ? `active` : `` "
                @click="handleDel(item, index)">
                {{item.name}}
                </span>
            </div>
            <p class="desc">点击添加一下频道</p>
            <div class="list">
                <!-- 循环渲染出is_top为0的栏目数组 -->
                <span class="item"
                v-for="(item, index) in arrDown" 
                :key="index"
                @click="handleAdd(item, index)">
                {{item.name}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"

export default {
    data(){
        return {
            // 本地获取的栏目数据
            categories: [],
            // 显示在上面的数组
            arrUp: [],
            // 显示在下面的数据
            arrDown: []
        }
    },
    // 注册组件
    components: {
        NavigateBar
    },
    // 组件加载完毕之后触发
    mounted(){
        // 获取本地的栏目数据
        this.categories = JSON.parse(localStorage.getItem("categories"));
        // 拆分两个数组
        this.arrUp = this.categories.filter(v => {
            return v.is_top === 1;
        })
        
        this.arrDown = this.categories.filter(v => {
            return v.is_top === 0;
        })
    },
    // 页面销毁时候触发的事件
    destroyed(){
        // 把栏目的数据保存到本地
        this.categories = [
            ...this.arrUp, 
            ...this.arrDown, 
            this.categories[this.categories.length - 1]
        ]
        const str = JSON.stringify(this.categories);
        localStorage.setItem("categories", str);
    },
    methods: {
        // 点击删除栏目，也就是上面栏目的事件
        handleDel(item, index){
            // 如果是头条或者关注，就无效
            if(['关注','头条'].includes(item.name)) return;

            // 把当前这项从arrUp数组中删除掉
            this.arrUp.splice(index, 1);

            // 需要当前点击的栏目的is_top为0,
            item.is_top = 0;
            // 保存到下面的数组中
            this.arrDown.push(item);
        },
        // 点击添加栏目，也就是下面栏目的点击事件
        handleAdd(item, index){
            // 先从this.arrDown数组中删除这项
            this.arrDown.splice(index, 1);
            // 需要当前点击的栏目的is_top为1,
            item.is_top = 1;
            // 把当前这项追加到arrUp数组中
            this.arrUp.push(item);
        }
    }
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
        // justify-content: space-between;
        flex-wrap: wrap;
        .item{
            border: 1px #999 solid;
            padding: 5px 10px;
            font-size: 16px;
            margin: 5/360*100vw 10/360*100vw;
        }

        .active{
            border-color: #ddd;
            color:#999;
        }
    }
}
</style>