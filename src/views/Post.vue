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
                <div class="actions-item">
                    <span class="iconfont icondianzan"></span> 
                    <!-- 点赞 -->
                    <i>{{ Number(post.has_like) }}</i>
                </div>
                <div class="actions-item">
                    <span class="iconfont iconweixin"></span> 
                    <i>微信</i>
                </div>
            </div>
        </div>

        <!-- 固定在底部的底部栏 -->
        <div class="footer">
            <!-- 点击跳转到评论页 -->
            <div class="comment-input">发布评论</div>
            <div class="icons">
                <span class="iconfont iconpinglun-"></span>
                <!-- 评论的条数,如果大于100的话就显示99+ -->
                <i>{{post.comment_length > 100 ? `99+` : post.comment_length}}</i>
            </div>
            <!-- 如果当前是收藏的状态显示一个红色的按钮 -->
            <div class="icons">
                <!-- 如果当前是收藏的，就添加active这个class，显示一个红色的按钮 -->
                <span class="iconfont iconshoucang" 
                :class="post.has_star ? `active`: ''"></span>
            </div>
            <!-- 这个按钮是一个装饰用的，微信分享需要企业的资质 -->
            <div class="icons">
                <span class="iconfont iconfenxiang"></span>
            </div>
        </div>
    </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";

export default {
    data(){
        return {
            // 文章的详情
            post: {
                // 为什么要加这个默认值，因为模板需要访问post.user.nickname
                user: {}
            },
            moment,
        }
    },
    mounted(){
        // 获取文章的id
        const {id} = this.$route.params;
        // 请求文章的详情
        this.$axios({
            url: "/post/" + id
        }).then(res => {
            // data是文章的详情
            const {data} = res.data;
            this.post = data;
        })
    },
    methods: {
        // 关注和取消关注
        handleFollow(){
            // 本地的token
            const {token} = JSON.parse(localStorage.getItem("userInfo")) || {};

            this.$axios({
                url: '/user_follows/' + this.post.user.id,
                headers: {
                    Authorization: token
                }
            }).then(res => {
                // 关注成功之后修改关注状态
                this.post.has_follow = true;

                this.$toast.success("关注成功")
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

.footer{
    position: fixed;
    width: 100%;
    bottom:0;
    left:0;
    background: #fff;
    padding: 10/360*100vw 20/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .comment-input{
        flex: 1;
        margin-right: 20/360*100vw;
        height: 30/360*100vw;
        padding: 0 20/360*100vw;
        line-height: 30/360*100vw;
        border-radius: 50px;
        background: #eee;
    }

    .icons{
        position: relative;
        margin: 0 8/360*100vw;
        .iconfont{
            font-size: 23px;
        }
        i{
            position: absolute;
            right: -10px;
            top:-5px;
            display: block;
            padding: 1px 2px;
            background: red;
            color: #fff;
            font-size: 10px;
            line-height: 1;
            border-radius: 50px;
        }

        .active{
            color: red;
        }
    }
}
</style>