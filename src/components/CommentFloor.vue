<template>
    <div>
        <div class="comment-floor">
            <!-- 组件在这个位置自己调用自己 -->
            <!-- <commentFloor/> -->

            <div class="floor-top">
                <div class="user">
                    <span>2</span>
                    <em>火星网友</em>
                    <span>2小时前</span>
                </div>
                <span class="reply">回复</span>
            </div>
            <div class="content">
                文章评论的回复
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 声明当前的组件名，在当前组件里面，name的值可以用于调用组件自己
    name: "commentFloor"
}
</script>

<style scoped lang="less">

.comment-floor{
    margin-bottom: 10/360*100vw;
    border: 1px #ddd solid;
    padding: 2px;
    font-size: 13px;

    .floor-top{
        display: flex;
        justify-content: space-between;
        padding: 5px;

        span{
            font-size: 12px;
            color: #999;
            margin-right:5px;
        }
        em{
            margin-right: 5px;
        }
    }

    .content{
        padding: 5px;
        padding-top: 0;
    }
}

</style>