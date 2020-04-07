<template>
    <div>
        <video 
        v-if="post.content"
        :poster="$axios.defaults.baseURL + post.cover[0].url"
        :src="$axios.defaults.baseURL + post.content" 
        controls="controls" 
        class="video"
        >
        您的浏览器不支持 video 标签。
        </video>
        <div class="main">
            <div class="author">
                <div class="userinfo">
                    <img src="http://t12.baidu.com/it/u=2782147580,2038604057&fm=171&app=20&f=JPEG?w=700&h=395&s=1A15A14C147287DC065FA51A0300B09B" alt="">
                    <span>火星网友</span>
                </div>
                <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
                <span class="follow" 
                :class="post.has_follow ? '' : 'active'"
                @click="handleFollow">
                    {{ post.has_follow ? '已关注' : '关注' }}
                </span>
            </div>

            <!-- 文章标题 -->
            <h2 class="title">如果关注是false，就加上active这个class</h2>

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
// 导入底部栏组件
import PostFooter from "@/components/PostFooter";

export default {
    data(){
        return {
            // 文章的详情
            post: {
                user: {},
                cover: [{}]
            }
        }
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
            this.post = data;
        })
    },
    components: {
        PostFooter
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
        },
        // 收藏
        handleStar(){
            this.$axios({
                url: "/post_star/" + this.post.id,
                headers: {
                    Authorization: this.token
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
.video{
    width: 100%;
    display: block;
}

.main{
    padding:  10/360*100vw 20/360*100vw;
}

.author{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .userinfo{
        display: flex;
        align-items: center;
        img{
            width: 25/360*100vw;
            height: 25/360*100vw;
            border-radius: 50%;
            object-fit: cover;
            margin-right:5px;
        }
    }

    .active{
        background: red;
        border-color: red;
        color: #fff;
    }
}

.follow{
    padding: 3px 10px;
    border: 1px #999 solid;
    border-radius: 50px;
    font-size: 12px;
    
}

.title{
    font-weight: normal;
    font-size: 16px;
    margin: 10/360*100vw 0;
}

.actions{
    display: flex;
    justify-content: space-around;
    margin-top: 30/360*100vw;
    padding: 0 30/360*100vw;

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
</style>