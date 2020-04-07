<template>
    <div>
        <video src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5b4e96b891e985e5c60d6e91eab9eaea.mp4" 
        controls="controls" 
        class="video">
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
                :class="post.has_follow ? '' : 'active'">
                    {{ post.has_follow ? '已关注' : '关注' }}
                </span>
            </div>

            <!-- 文章标题 -->
            <h2 class="title">如果关注是false，就加上active这个class</h2>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 文章的详情
            post: {}
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

.title{
    font-weight: normal;
    font-size: 16px;
    margin: 10/360*100vw 0;
}
</style>