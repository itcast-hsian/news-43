<template>
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
        <div class="icons" @click="handleStar">
            <!-- 如果当前是收藏的，就添加active这个class，显示一个红色的按钮 -->
            <span class="iconfont iconshoucang" :class="post.has_star ? `active`: ''"></span>
        </div>
        <!-- 这个按钮是一个装饰用的，微信分享需要企业的资质 -->
        <div class="icons">
            <span class="iconfont iconfenxiang"></span>
        </div>
    </div>
</template>

<script>
export default {
    // post 文章详情
    props: ['post'],
    methods: {
        // 收藏
        handleStar(){
            // 本地的token
            const {token} = JSON.parse(localStorage.getItem("userInfo")) || {};

            this.$axios({
                url: "/post_star/" + this.post.id,
                headers: {
                    Authorization: token
                }
            }).then(res => {
                // 收藏状态取反
                this.post.has_star = !this.post.has_star;
                // 弹窗提示
                this.$toast.success(res.data.message);
            })
        }
    }
};
</script>

<style scoped lang="less">
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