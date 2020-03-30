<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="我的关注"/>

        <!-- 要循环的结构 -->
        <div class="user-item" v-for="(item, index) in follows" :key="index">
            <img :src="$axios.defaults.baseURL + item.head_img">
            <div class="user-info">
                <div>{{item.nickname}}</div>
                <p>{{ moment(item.create_date).format("YYYY-MM-DD hh:mm:ss") }}</p>
            </div>
            <span class="cancel">取消关注</span>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"
import moment from "moment"

export default {
    data(){
        return {
            //我的关注列表
            follows: [],
            // 把moment挂载到data
            moment
        }
    },
    // 注册组件
    components: {
        NavigateBar
    },
    mounted(){
        // 获取token
        const localUserJson = JSON.parse(localStorage.getItem('userInfo'));

        // 请求列表数据
        this.$axios({
            url: "/user_follows",
            headers: {
                Authorization: localUserJson.token
            }
        }).then(res => {
            // data就是我的关注的用户列表
            const {data} = res.data;
            // 保存到data中的关注列表
            this.follows = data;
        })
    },
};
</script>

<style scoped lang="less">
    .user-item{
        padding: 20 / 360*100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #eee solid;

        img{
            width: 40/360*100vw;
            height: 40/360*100vw;
            display:block;
            margin-right:20 / 360*100vw;
            border-radius: 50%;
            object-fit: cover; // 防止图片变形
        }

        .user-info{
            flex: 1;
            margin-right: 20 / 360*100vw;

            p{
                font-size: 14px;
                color:#999;
            }
        }

        .cancel{
            padding: 5px 15px;
            font-size: 12px;
            background: #eee;
            border-radius: 50px; 
        }
    }
</style>