<template>
    <div>
        <!-- 头部导航组件 -->
        <NavigateBar title="精彩跟帖"/>

        <!-- 分页组件 -->
        <!-- v-model：是否正在加载中
        finished：数据是否加载完成
        @load：滚动到底部时候触发的事件 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >
            <!-- 跟帖评论列表,评论的最外层, 第一级 -->
            <div class="comment" v-for="(item, index) in list" :key="index">
                <div class="comment-top">
                    <div class="user">
                        <img :src="$axios.defaults.baseURL + item.user.head_img">
                        <div class="user-info">
                            <p>{{item.user.nickname}}</p>
                            <!-- moment().fromNow 就是显示距离到当前的时间 -->
                            <span>{{moment(item.create_date).fromNow()}}</span>
                        </div>
                    </div>
                    <span class="reply">回复</span>
                </div>

                <!-- 回复的列表，调用递归的组件, 第二级
                item.parent有多少层数据，CommentFloor就自调用多少次 -->
                <CommentFloor v-if="item.parent" :data="item.parent"/>

                <div class="content">
                    {{item.content}}
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"
// 回复的评论楼层组件
import CommentFloor from "@/components/CommentFloor"
// 日期转换工具库
import moment from "moment"
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale('zh-CN');

export default {
    data(){
        return {
            // 文章id
            pid: "",
            // 评论的列表
            list: [],
            moment,
            // 是否正在加载中
            loading: false,
            // 数据是否加载完毕
            finished: false,
        }
    },
    components: {
        NavigateBar,
        CommentFloor
    },
    mounted(){
        // 文章的id
        const {id} = this.$route.params;
        // 把id保存到data
        this.pid = id;
        // 请求评论列表数据
        this.getList()
    },
    methods: {
        // 请求评论列表数据
        getList(){
            this.$axios({
                url: `/post_comment/${this.pid}`
            }).then(res => {
                // data是评论的列表数组
                const {data} = res.data;
                // 保存到data的list
                this.list = data;
            })
        },
        // 滚动到底部触发的事件
        onLoad(){
            console.log(123);
        }
    }
};
</script>

<style scoped lang="less">
.comment{
    padding: 30/360*100vw 15/360*100vw;
    border-bottom: 1px #eee solid;
    font-size: 13px;
}
.comment-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15/360*100vw;

    .user{
        display: flex;
        align-items: center;
        img{
            display: block;
            width: 35/360*100vw;
            height: 35/360*100vw;
            border-radius: 50%;
            margin-right: 5px;
        }

        span{
            color: #999;
            font-size: 12px;
        }
    }

    .reply{
        font-size: 12px;
    }
}

.content{
    margin-top: 10/360*100vw;
}
</style>