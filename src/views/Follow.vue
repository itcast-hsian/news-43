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
            <!-- 点击取消关注时候把id传过去 -->
            <span class="cancel" @click="handleCancel(item.id, index)">取消关注</span>
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
            moment,
            // 本地的用户数据 token
            localUserJson: {}
        }
    },
    // 注册组件
    components: {
        NavigateBar
    },
    mounted(){
        // 获取token
        const localUserJson = JSON.parse(localStorage.getItem('userInfo'));
        // 保存到data
        this.localUserJson = localUserJson;

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
    methods: {
        // 取消关注，参数id是模板传递过来的用户id
        handleCancel(id, index){
            // 弹窗提示
            this.$dialog.confirm({
				title: '提示',
				message: '确定取消关注吗？'
			}).then(() => {
                // 根据id取消用户的关注,id是要取消的那个用户的id
                this.$axios({
                    url: "/user_unfollow/" + id,
                    headers: {
                        Authorization: this.localUserJson.token
                    }
                }).then(res => {
                    this.$toast.success("取消关注成功");
                    // 刷新页面的数据
                    this.follows.splice(index, 1);
                });
            })
        }
    }
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