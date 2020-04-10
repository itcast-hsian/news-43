<template>
    <div>
        <div class="comment-floor">
            <!-- 组件在这个位置自己调用自己 -->
            <commentFloor 
            v-if="data.parent" 
            :data="data.parent" 
            @reply="handleReply"/>

            <div class="floor-top">
                <div class="user">
                    <!-- <span>{{count}}</span> -->
                    <em>{{data.user.nickname}}</em>
                    <span>{{moment(data.create_date).fromNow()}}</span>
                </div>
                <!-- 点击回复按钮时候触发父组件传递过来的回复函数 -->
                <span class="reply" @click="handleReply(data)">回复</span>
            </div>
            <div class="content">
                {{data.content}}
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    // 声明当前的组件名，在当前组件里面，name的值可以用于调用组件自己
    name: "commentFloor",

    data(){
        return {
            moment
        }
    },
    // 声明组件可以接收的数据
    props: ["data", "count"],
    methods: {
        // 组件内部的回复的事件
        handleReply(data){
            // 触发父组件传递过来的reply函数
            this.$emit("reply", data);
        }
    }
}
</script>

<style scoped lang="less">

.comment-floor{
    margin-bottom: 15/360*100vw;
    border: 1px #ddd solid;
    padding: 2px;
    font-size: 13px;

    .floor-top{
        display: flex;
        justify-content: space-between;
        padding: 10/360*100vw 5px ;

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
        padding: 10/360*100vw 5px;
        padding-top: 0;
    }
}

</style>