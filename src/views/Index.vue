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

        <!-- tab栏切换 -->
        <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
        <!-- sticky：是否使用粘性定位布局 -->
        <!-- swipeable: 是否开启手势滑动切换 -->
        <van-tabs v-model="active" sticky swipeable>
            <van-tab v-for="(item, index) in categories" :key="index" :title="item.name">

                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <!-- van的列表组件 -->
                    <!-- @load 滚动到底部时候触发的函数 -->
                    <!-- immediate-check关闭list加载后触发一次 load 事件 -->
                    <van-list
                        immediate-check
                        v-model="loading"
                        :finished="finished"
                        finished-text="我也是有底线的"
                        @load="onLoad"
                    >

                        <!-- 假设list是后台返回的数组，里有10个元素 -->
                        <div v-for="(item, index) in list" :key="index">
                            <!-- 只有单张图片的 -->
                            <PostItem1 :data="item" v-if="item.type === 1 && item.cover.length < 3"/> 
                            <!-- 大于等于3张图片 -->
                            <PostItem2 :data="item" v-if="item.type === 1 && item.cover.length >= 3"/> 
                            <!-- 视频 -->
                            <PostItem3 :data="item" v-if="item.type === 2"/>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import PostItem1 from "@/components/PostItem1"
// 大于等于3张图片的组件
import PostItem2 from "@/components/PostItem2"
// 视频的列表组件
import PostItem3 from "@/components/PostItem3"

export default {
    data(){
        return {
            // 菜单的数据
            categories: [],
            // 记录当前tab的切换的索引
            active: 0,
            // 数组是后台返回的数据
            list: [], 
            loading: false, // 是否正在加载中
            finished: false, // 是否已经加载完毕
            refreshing: false , // 是否正在下拉加载

            token: "",
        }
    },
    // 监听属性
    watch: {
        // 监听tab栏的切换
        active(){
            // 判断如果点击的是最后一个图标，跳转到栏目管理页
            if(this.active === this.categories.length - 1){
                this.$router.push("/栏目管理")
            }
        }
    },
    components: {
        PostItem1,
        PostItem2,
        PostItem3
    },
    mounted(){
        // 获取本地的token,如果没有值就等于一个空对象
        const {token} = JSON.parse(localStorage.getItem('userInfo')) || {}
        // 把token保存到data
        this.token = token;
        // 本地的栏目数据
        const categories = JSON.parse(localStorage.getItem('categories'));

        if(categories){
            // 如果当前是登录的状态，但是栏目的第一项居然不是“关注”，需要重新请求
            // 如果当前未登录，但是栏目的第一项居然叫“关注”，也需要重新请求
            if( token && categories[0].name !== "关注" ||
                !token && categories[0].name === "关注"){
                // 调用请求栏目的数据,并且保存到本地
                this.getCategories();
            }else{
                this.categories = categories;
                // 调用方法给每个栏目添加新属性
                this.handleCategories();
            }
        }else{
            // 调用请求栏目的数据,并且保存到本地
            this.getCategories();
        }

        // 请求文章列表数据
        this.getList()
    },
    methods: {
        // 循环处理栏目的数据
        handleCategories(){
            this.categories = this.categories.map(v => {
                v.pageIndex = 1; // 给每个栏目都添加了一个pageIndex属性
                return v;
            })

            console.log(this.categories);
        },

        // 请求获取菜单栏目数据
        getCategories(){
            // 请求的配置
            const config = {
                url: "/category"
            }
            // 如果token有值，给请求的配置加上headers
            if(this.token){
                config.headers = {
                    Authorization: this.token
                }
            }

            this.$axios(config).then(res => {
                // 把栏目数据保存到data
                const {data} = res.data;
                // 给数组最后添加一个跳转到栏目管理的图标
                data.push({
                    name: "∨"
                })
                this.categories = data;
                // 保存到本地
                localStorage.setItem('categories', JSON.stringify(data));
                // 调用方法给每个栏目添加新属性
                this.handleCategories();
            })
        },

        // 请求文章列表
        getList(){
            // 当前栏目的id
            const {id} = this.categories[this.active];

            this.$axios({
                url: "/post",
                params: {
                    pageIndex: 1, // 每个栏目页数是不一样的
                    pageSize: 5, //  请求数据的条数
                    category: id
                }
            }).then(res => {
                const {data} = res.data;
                // 保存到data的文章列表中
                this.list = data;
            })
        },

        // 请求下一页的数据
        onLoad() {
            this.getList();
        },

        onRefresh() {
            // 表示加载完毕
            this.refreshing = false;
            console.log("正在下拉刷新")
        }
    }
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

// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav{
    background: #eee;
}

/deep/ .van-tab{
    flex-basis: 15%!important;
}

/deep/ .van-tab:nth-last-child(2){
    background: #eee;
    width: 20px!important;
    position: absolute;
    right:0; 
    top: 0;
    box-sizing:unset;
}

/deep/ .van-tabs__wrap{
    padding-right: 20px;
}

/deep/ .van-tabs__nav{
    position: static;
}

/deep/ .van-tabs__line{
    display: none;
}

/deep/ .van-tab--active{
    border-bottom: 1px #ff0000 solid;
}
</style>