<template>
    <div>
        <!-- 头部导航组件 -->
        <NavigateBar title="精彩跟帖"/>

        <!-- 跟帖评论列表 -->
        <div class="comment">
            <div class="comment-top">
                <div class="user">
                    <img src="https://img12.360buyimg.com/img/s100x100_jfs/t2770/142/2313361897/493911/1e5ea1db/575fd5f7N1cfc4411.jpg!cc_100x100.webp" alt="">
                    <div class="user-info">
                        <p>火星网友</p>
                        <span>2小时前</span>
                    </div>
                </div>
                <span class="reply">回复</span>
            </div>
            <div class="content">
                文章说的很有道理！
            </div>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"

export default {
    components: {
        NavigateBar
    }
};
</script>

<style scoped lang="less">
.comment{
    padding: 20/360*100vw;
    border-bottom: 1px #eee solid;
    .comment-top{
        display: flex;
        justify-content: space-between;
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
}
</style>