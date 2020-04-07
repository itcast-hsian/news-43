<template>
    <div class="container">
        <div class="main">
            <!-- 头部 -->
            <div class="header">
                <div class="left">
                    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
                    <span class="iconfont iconnew"></span>
                </div>
                <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
                <span class="follow" 
                :class="post.has_follow ? '' : 'active'"
                @click="handleFollow">
                    {{ post.has_follow ? '已关注' : '关注' }}
                </span>
            </div>

            <!-- 文章标题 -->
            <h2 class="title">{{post.title}}</h2>

            <!-- 文章的作者 -->
            <p class="author">
                {{post.user.nickname}}   {{moment(post.create_date).format(`YYYY-MM-DD hh:mm:ss`)}}
            </p>

            <!-- 文章的详情 -->
            <div class="content" v-html="post.content"> </div>

            <!-- 按钮列表 -->
            <div class="actions">
                <div class="actions-item" @click="handleLike">
                    <span class="iconfont icondianzan"></span> 
                    <!-- 点赞 -->
                    <i>{{ post.like_length }}</i>
                </div>
                <div class="actions-item">
                    <span class="iconfont iconweixin"></span> 
                    <i>微信</i>
                </div>
            </div>
        </div>

        <!-- 底部栏组件 -->
        <PostFooter :post="post"/>
    </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";
// 导入底部栏组件
import PostFooter from "@/components/PostFooter";

export default {
    data(){
        return {
            // 文章的详情
            post: {
                // 为什么要加这个默认值，因为模板需要访问post.user.nickname
                user: {}
            },
            moment,
            token: ""
        }
    },
    components: {
        PostFooter
    },
    mounted(){
        // 获取文章的id
        const {id} = this.$route.params;
        // 本地的token
        const {token} = JSON.parse(localStorage.getItem("userInfo")) || {};
        // 保存一份到data
        this.token = token;
        const config = {
            url: "/post/" + id
        }
        // 如果token有值给头信息加上token
        if(token){
            config.headers = { Authorization: token }
        };

        // 请求文章的详情
        this.$axios(config).then(res => {
            // data是文章的详情
            const {data} = res.data;
            // 替换文字内容里面的本地路径，把localhost:3000替换成基准路径，
            // “这个功能只对使用线上接口的同学有效果”，如果使用的是本地的后台，不替换也可以
            data.content = data.content.replace(
                /http:\/\/localhost:3000/ig, 
                this.$axios.defaults.baseURL
            )

            this.post = data;
        })
    },
    methods: {
        // 关注和取消关注
        handleFollow(){
            let url = ""
            // 先判断当前的状态如果是关注，就取消关注
            if(this.post.has_follow){
                // 取消关注
                url = "/user_unfollow/" + this.post.user.id
            }else{
                // 关注
                url = "/user_follows/" + this.post.user.id
            }

            this.$axios({
                url,
                headers: {
                    Authorization: this.token
                }
            }).then(res => {
                // 关注成功之后修改关注状态
                this.post.has_follow = !this.post.has_follow;
                this.$toast.success(this.post.has_follow ? "关注成功" : "取消关注成功")
            })
        },
        // 文章点赞
        handleLike(){
            this.$axios({
                url: "/post_like/" + this.post.id,
                headers: {
                    Authorization: this.token
                }
            }).then(res => {
                // 修改点赞的状态
                this.post.has_like = !this.post.has_like;
                // 判断当前是否点赞
                if(this.post.has_like){
                    // 如果是点赞就加1
                    this.post.like_length += 1;
                }else{
                    // 取消点赞就减1
                    this.post.like_length -= 1;
                }
                // 弹窗提示
                this.$toast.success(res.data.message);
            })
        }
    }
};
</script>

<style scoped lang="less">
.main{
    padding: 20/360*100vw;
    padding-bottom: 100/360*100vw;;
    border-bottom: 5px #eee solid;

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20/360*100vw;

        .left{
            display: flex;
            align-items: center;
        }
        .iconnew{
            display: inline-block;
            transform: scale(3.5);
            margin-left: 30px;
        }
        .follow{
            padding: 3px 10px;
            border: 1px #999 solid;
            border-radius: 50px;
            font-size: 12px;
        }

        .active{
            background: red;
            border-color: red;
            color: #fff;
        }
    }

    .title{
        font-size: 18px;
    }
    .author{
        line-height: 2;
        color: #999;
        font-size: 14px;
        margin-top: 10/360*100vw
    }

    .content{
        line-height: 1.8;
        margin-top: 10/360*100vw;

        // 不是本页面的标签或者类型，都可以通过/deep/来访问
        /deep/ img{
            max-width: 100%;
        }
    }

    .actions{
        display: flex;
        justify-content: space-around;
        margin-top: 30/360*100vw;
        padding: 0 50/360*100vw;

        .actions-item{
            display: flex;
            align-items: center;
            border: 1px #999 solid;
            padding: 3px 10px;
            border-radius: 50px;
            font-size: 12px;

            span{
                margin-right: 5px;
            }

            .iconweixin{
                color: #00c800;
            }
        }
    }
}
</style>