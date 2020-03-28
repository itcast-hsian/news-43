<template>
    <div>
        <!-- 头部导航组件 -->
        <NavigateBar title="编辑资料"/>

        <!-- 头像 -->
        <div class="avatar">
            <img :src="$axios.defaults.baseURL + userInfo.head_img"/>

            <!-- 添加上传的组件 -->
            <van-uploader class="uploader" :after-read="afterRead" />
        </div>

        <!-- 按钮列表 -->
        <Listbar label="昵称" :tips="userInfo.nickname"/>
        <Listbar label="密码" tips="******"/>
        <Listbar label="性别" :tips="['女', '男'][userInfo.gender]"/>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";

export default {
    data(){
        return {
            // 用户详情
            userInfo: {}
        }
    },
    components: {
        NavigateBar,
        Listbar
    },
    mounted(){
        // 只要能进入这个页面就表示肯定已经登陆
        const userJson = JSON.parse(localStorage.getItem('userInfo'))
        // 请求用户详情
        this.$axios({
            url: "/user/" + userJson.user.id,
            // 添加头信息
			headers: {
				Authorization: userJson.token
			}
        }).then(res => {
            const {data} = res.data;
            // 保存到data
            this.userInfo = data;
        })
    },
    methods: {
        // 图片上传的方法
        afterRead(file){
            console.log(file)
        }
    }
};
</script>

<style scoped lang="less">
.avatar{
    display: flex;
    padding: 20 / 360 * 100vw;
    justify-content: center;
    align-items: center;
    position: relative;

    img{
        width:100 / 360 * 100vw;
        height:100 / 360 * 100vw;
        border-radius: 50%;
    }

    .uploader{
        position: absolute;
        width:100 / 360 * 100vw;
        height:100 / 360 * 100vw;
        left: 50%;
        top: 50%;
        transform: translateX(-50 / 360 * 100vw) translateY(-50 / 360 * 100vw);
    }
}
</style>