<template>
    <div class="container">
        <!-- 头部导航组件 -->
        <NavigateBar title="精彩跟帖"/>

        <!-- 分页组件 -->
        <!-- v-model：是否正在加载中
        finished：数据是否加载完成
        @load：滚动到底部时候触发的事件 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >
            <!-- 跟帖评论列表,评论的最外层, 第一级 -->
            <div class="comment" v-for="(item, index) in list" :key="index">
                <div class="comment-top">
                    <div class="user">
                        <img :src="$axios.defaults.baseURL + item.user.head_img">
                        <div class="user-info">
                            <p>{{item.user.nickname}}</p>
                            <!-- moment().fromNow 就是显示距离到当前的时间 -->
                            <span>{{moment(item.create_date).fromNow()}}</span>
                        </div>
                    </div>
                    <span class="reply" @click="handleReply(item)">回复</span>
                </div>

                <!-- 回复的列表，调用递归的组件, 第二级
                item.parent有多少层数据，CommentFloor就自调用多少次 -->
                <CommentFloor 
                v-if="item.parent" 
                :data="item.parent"
                @reply="handleReply"/>

                <div class="content">
                    {{item.content}}
                </div>
            </div>
        </van-list>

        <!-- 发布评论的底部 -->
        <div class="publish">
            <!-- 输入框，点击和没点击时候显示的效果是不一样的 -->
            <!-- 如果输入框获得焦点的话：
            1.需要显示出发布按钮，
            2.需要去掉输入框的自适应高度，
            3.需要添加active这个class -->
            <van-field
                v-model="message"
                :rows="rows"
                :autosize="!isFocus"
                type="textarea"
                :placeholder="reply.user ? `回复：@` + reply.user.nickname : `说点什么...`"
                class="textarea"
                :class="isFocus ? `ative` : ``"
                @focus="handleFocus"
                @blur="handleBlur"
                @keyup.enter="handleSubmit"
                ref="textarea"
                />

            <span class="submit" v-if="isFocus" @click="handleSubmit">发布</span>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"
// 回复的评论楼层组件
import CommentFloor from "@/components/CommentFloor"
// 日期转换工具库
import moment from "moment"
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale('zh-CN');

export default {
    data(){
        return {
            // 文章id
            pid: "",
            // 评论的列表
            list: [],
            moment,
            // 是否正在加载中
            loading: false,
            // 数据是否加载完毕
            finished: false,
            // 请求的页数
            pageIndex: 1,
            // 请求的条数
            pageSize: 5,
            // 发布评论的数据
            message: "",
            // 发布评论输入框的行数
            rows: 1,
            // 几率当前的输入框是否获得焦点
            isFocus: false,
            // 回复评论的对象
            reply: {},
        }
    },
    components: {
        NavigateBar,
        CommentFloor
    },
    mounted(){
        // 文章的id
        const {id} = this.$route.params;
        // 把id保存到data
        this.pid = id;
        // 请求评论列表数据
        this.getList()
    },
    methods: {
        // 请求评论列表数据
        getList(){
            this.$axios({
                url: `/post_comment/${this.pid}`,
                params: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
            }).then(res => {
                // data是评论的列表数组
                const {data} = res.data;
                // 保存到data的list
                this.list = [...this.list, ...data];
                // 请求完毕后，页数需要加1
                this.pageIndex += 1;
                // 初始化分页相关的值, 告诉van-list组件请求完毕
                this.loading = false;
                // 数据已经全部完毕
                if(data.length < this.pageSize){
                    this.finished = true;
                }
            })
        },
        // 滚动到底部触发的事件
        onLoad(){
            this.getList();
        },
        // 评论输入框获得焦点时候触发的事件
        handleFocus(){
            // 修改评论输入框的高度
            this.isFocus = true;
        },
        // 评论输入框失去焦点时候触发
        handleBlur(){
            // 失去焦点时候，不要立马就隐藏发布按钮，需要在按钮点击之后再隐藏
            setTimeout(() => {
                this.isFocus = false;

                // 失去焦点时候如果输入框的值是空的，就把回复的人清空
                if(this.message.trim() === ""){
                    this.reply = {};
                }
            }, 100)
        },
        // 发布评论
        handleSubmit(){
            // 评论的内容不能为空
            if(this.message.trim() == ""){
                return;
            }

            // 用户能够看到发布的按钮，说明当前肯定是一个登陆的状态
            const {token} = JSON.parse(localStorage.getItem('userInfo')) || {};
            
            // 评论接口的参数
            const data = {
                content: this.message
            }
            // 如果reply有值，说明当前是一条回复的评论
            if(this.reply.id){
                // parent_id 就是回复的评论的id
                data.parent_id = this.reply.id;
            }

            // 发布评论的请求
            this.$axios({
                url: "/post_comment/" + this.pid,
                method: "POST",
                headers: {
                    Authorization: token
                },
                data
            }).then(res => {
                // 清空评论的数据
                this.message = "";
                // 弹窗提示评论发布成功
                this.$toast.success("发布成功");
                // 重新请求列表数据
                this.list = []; // 必须要清空，如果不清空会合并之前的评论
                this.pageIndex = 1;
                this.getList();
                // 清空回复的数据
                this.reply = {};
            })
        },
        // 点击回复按钮触发的事件
        handleReply(item){
            // 因为点击时候失去焦点，已经触发了handleBlur事件
            setTimeout(() => {
                // 记录下来当前回复的评论信息,就是我们的评论在回复item
                this.reply = item;
                // 弹起输入框
                this.isFocus = true;
                // 输入框获得焦点
                this.$refs.textarea.focus();
            }, 200)
        }
    }
};
</script>

<style scoped lang="less">
.container{
    padding-bottom: 60/360*100vw;
}
.comment{
    padding: 30/360*100vw 15/360*100vw;
    border-bottom: 1px #eee solid;
    font-size: 13px;
}
.comment-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15/360*100vw;

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

.publish{
    position: fixed;
    width: 100%;
    left:0;
    bottom:0;
    padding: 5/360*100vw 15/360*100vw;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .textarea{
        background: #eee;
        border-radius: 50px;
        padding: 5px 15px;
    }

    .ative{
        height: 82px!important;
        border-radius: 8px;
    }

    .submit{
        margin-left:5px;
        padding: 3px 10px;
        color: #fff;
        background: red;
        border-radius: 50px;
        font-size: 12px;
        flex-shrink: 0;
    }
}
</style>