<template>
    <div>
        <!-- 红色的头部 -->
        <div class="header">
            <span class="iconfont iconnew"></span>
            <router-link to="/search" class="search">
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
        <van-tabs v-model="active" sticky swipeable @scroll="handelScroll">
            <van-tab v-for="(item, index) in categories" 
            v-if="item.is_top === 1 || item.name === `∨`"
            :key="index" 
            :title="item.name">

                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                    <!-- van的列表组件 -->
                    <!-- @load 滚动到底部时候触发的函数 -->
                    <!-- immediate-check关闭list加载后触发一次 load 事件 -->
                    <van-list
                        immediate-check
                        v-model="item.loading"
                        :finished="item.finished"
                        finished-text="我也是有底线的"
                        @load="onLoad"
                    >

                        <!-- 假设list是后台返回的数组，里有10个元素 -->
                        <div v-for="(subItem, subIndex) in item.list" :key="subIndex">
                            <!-- 只有单张图片的 -->
                            <PostItem1 :data="subItem" v-if="subItem.type === 1 && subItem.cover.length < 3"/> 
                            <!-- 大于等于3张图片 -->
                            <PostItem2 :data="subItem" v-if="subItem.type === 1 && subItem.cover.length >= 3"/> 
                            <!-- 视频 -->
                            <PostItem3 :data="subItem" v-if="subItem.type === 2"/>
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
    name: "index",
    data(){
        return {
            // 菜单的数据
            categories: [],
            // 记录当前tab的切换的索引
            active: 0,
            refreshing: false , // 是否正在下拉加载
            token: "",
        }
    },
    // 监听属性
    watch: {
        // 监听tab栏的切换
        active(){
            // 先过滤出is_top等于1的或者是v图标的栏目
            const arr = this.categories.filter(v => {
                return v.is_top || v.name === "∨"
            })

            // 如果点击的是最后一个图标，就需要跳转到栏目管理页
            if(this.active === arr.length - 1){
                this.$router.push("/category")
            }

            // 当栏目切换时候，需要重新的请求当前栏目的数据
            this.getList();
            // 我们需要等待文章数据的渲染，渲染完成了之后才进行滚动
            // 时间可以随便写
            setTimeout(() => {
                // 页面滚动到当前栏目下的scrollY值
                window.scrollTo(0, this.categories[this.active].scrollY);
            }, 20)
        }
    },
    components: {
        PostItem1,
        PostItem2,
        PostItem3
    },
    // activated只对keep-alive的组件有用，当组件每次被渲染时候才会执行
    // 和mounted不一样，mounded只会执行一次
    // activated(){},
    mounted(){
        // 把方法封装到reload这个函数里面
        this.reload();
    },
    // 组件内的守卫，每次进入页面时候都会触发
    beforeRouteEnter(to, from, next){
        // 如果是来自栏目管理页
        if(from.path === "/category"){
            // vm就是this
            next(vm => {
                vm.active = 0;
                // 如果是从栏目管理回来的，避免栏目管理的数据有更新，所以重新的初始化页面
                vm.reload();
            })
        }else{
            next();
        }
    },
    methods: {
        // 初始化页面的方法
        reload(){
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
        },
        // 循环处理栏目的数据
        handleCategories(){
            this.categories = this.categories.map(v => {
                v.pageIndex = 1; // 给每个栏目都添加了一个pageIndex属性
                v.list = []; // 给每个栏目都拥有自己的文章列表
                v.loading = false;  // 给每个栏目都添加是否正在请求的状态
                v.finished = false; // 给每个栏目都添加一个文章是否全部加载完毕的状态
                v.scrollY = 0; // 给每个栏目添加一个滚动条的高度
                v.isload = false; // 当前栏目是否正在请求，跟上面的loading不一样，loading是组件控制的，isload我们要自己控制
                return v;
            })

            // 请求文章列表数据,是一定要放到栏目处理之后执行；
            this.getList()
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
            // 当前栏目的id,pageIndex,finished
            const {id, pageIndex, finished, name, isload} = this.categories[this.active];
            // 如果当前正在加载，直接返回,比如等待上一次的请求完成才执行下一次的请求
            if(isload) return;
            // 表示开始加载
            this.categories[this.active].isload = true;
            // 给当前栏目的页数加1
            this.categories[this.active].pageIndex += 1;

            //  如果数据已经加载完毕到了最后一页，就直接return；
            if(finished) return;
            // 请求文章的配置
            const config = {
                url: "/post",
                params: {
                    pageIndex, // 每个栏目页数是不一样的
                    pageSize: 5, //  请求数据的条数
                    category: id
                }
            }
            // 判断当前栏目是否是关注栏目
            if(name === "关注"){
                // 如果是的话就需要加上token
                config.headers = {
                    Authorization: this.token
                }
            }

            // 请求文章列表
            this.$axios(
                config
            ).then(res => {
                const {data, total} = res.data;
                // 把data新数组和当前栏目的文章列表合并
                this.categories[this.active].list = [...this.categories[this.active].list, ...data];
                // 用赋值的方式触发页面刷新
                this.categories = [...this.categories];

                // 告诉组件当前的请求加载完毕
                this.categories[this.active].loading = false;
                
                // 如果当前文章的条数等于total总条数，说明数据已经加载完毕
                if(this.categories[this.active].list.length === total){
                    this.categories[this.active].finished = true;
                }

                // 加载完毕之后把isload的状态设置为false
                this.categories[this.active].isload = false;
            })
        },

        // 请求下一页的数据
        onLoad() {
            // 请求文章列表
            this.getList();
        },

        // 监听tab滚动的事件
        handelScroll(data){
            // 因为栏目不管是从本地获取或者请求接口也好，都是需要时间，
            // 所以需要等this.categories有值时候才设置滚动条的高度s
            if(this.categories.length === 0) return;
            // scrollTop是滚动条的距离
            const {scrollTop} = data;
            // 把滚动条的高度赋值给当前栏目下的scrollY
            this.categories[this.active].scrollY = scrollTop;
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