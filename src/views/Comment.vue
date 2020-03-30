<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="我的跟帖"/>

        <!-- 要循环的结构 -->
        <div class="comment-item">
            <div class="date">2019-20-20 20:20</div>
            <!-- 有回复的评论需要展示的, 就是我回复了谁 -->
            <div class="parent">
                <div class="parent-user">回复：火星网友</div>   
                <div class="parent-content">
                    有回复的评论需要展示的, 就是我回复了谁有回复的评论需要展示的, 就是我回复了谁
                </div>
            </div>

            <!-- 自己发布的内容 -->
            <div class="comment-content">
                自己发布的内容自己发布的内容自己发布的内容自己发布的内容自己发布的内容自己发布的内容自己发布的内容自己发布的内容
            </div>

            <router-link to="#" class="link-post">
                原文：发布评论的新闻文章的标题
            </router-link>
        </div>

    </div>
</template>

<script>
// 引入头部导航组件
import NavigateBar from "@/components/NavigateBar"

export default {
    // 注册组件
    components: {
        NavigateBar
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
        color:#999;
    }
}
</style>