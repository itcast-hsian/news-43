<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="我的跟帖"/>

        <!-- 要循环的结构 -->
        <div class="comment-item" v-for="(item, index) in comments" :key="index">
            <div class="date">{{ moment(item.create_date).format("YYYY-MM-DD hh:mm") }}</div>
            <!-- 有回复的评论需要展示的, 就是我回复了谁 -->
            <div class="parent" v-if="item.parent">
                <div class="parent-user">回复：{{item.parent.user.nickname}}</div>   
                <div class="parent-content">
                    {{item.parent.content}}
                </div>
            </div>

            <!-- 自己发布的内容 -->
            <div class="comment-content">
                {{item.content}}
            </div>

            <!-- 回复的文章标题 -->
            <router-link to="#" class="link-post">
                <div>原文：{{item.post.title}}</div>
                <span class="iconfont iconjiantou1"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
// 引入头部导航组件
import NavigateBar from "@/components/NavigateBar"
// 日期处理的工具库
import moment from "moment";

export default {
    data(){
        return {
            // 评论列表
            comments: [],
            // 日期处理的工具库
            moment
        }
    },
    // 注册组件
    components: {
        NavigateBar
    },

    mounted(){
        // 本地的数据
        const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
        // 请求评论列表
        this.$axios({
            url: "/user_comments",
            // 添加头信息
			headers: {
				Authorization: localUserJson.token
			}
        }).then(res => {
            const {data} = res.data;
            // 把评论列表保存到data
            this.comments = data;
        })
    }
};
</script>

<style scoped lang="less">
.comment-item{
    padding: 20/360*100vw;
    border-bottom: 1px #eee solid;

    .date{
        color:#999;
        margin-bottom: 15/360*100vw;
    }

    .parent{
        padding:10/360*100vw;
        background: #eee;
    }

    .comment-content{
        margin: 15/360*100vw 0;
    }

    .link-post{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#999;
        
        div{
            flex: 1;
            // 文字超出出现省略号一定是块元素才有作用
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }

        span{
            margin-left: 5px;
        }
    }
}
</style>