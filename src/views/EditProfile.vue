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
            userInfo: {},
            // 本地的用户数据
            userJson: {}
        }
    },
    components: {
        NavigateBar,
        Listbar
    },
    mounted(){
        // 只要能进入这个页面就表示肯定已经登陆
        const userJson = JSON.parse(localStorage.getItem('userInfo'));

        // 保存到data，就可以在methods的方法是调用了
        this.userJson = userJson;

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
        // 图片上传的方法，file是对文件对象（认为它是不可读的）
        afterRead(file){
            // 创建一个表单对象，上传图片资源必须是表单类型,不能用json
            // 大家不用去纠结json还是表单的头信息，axios会自动设置的
            const formData = new FormData();

            // 通过原有的方法append给表单添加元素
            // 第一个字符串的file表示接口接收的属性，第二个 file.file是文件对象
            formData.append('file', file.file)

            // 开始上传
            this.$axios({
                url: "/upload",
                // post请求
                method: "POST",
                // 添加头信息
                headers: {
                    Authorization: this.userJson.token
                },
                data: formData
            }).then(res => {
                // url就是图片的路径
                const {url} = res.data.data;
                // 替换掉当前的头像路径
                this.userInfo.head_img = url;
                // 图片上传成功之后调用编辑用户信息的方法
                this.handleEdit({
                    head_img: url
                })
            })
        },

        // 编辑用户信息的函数
        // data就是请求的参数
        handleEdit(data){
            this.$axios({
                url: '/user_update/' + this.userInfo.id,
                method: "POST",
                // 添加头信息
                headers: {
                    Authorization: this.userJson.token
                },
                data,
            }).then(res => {
                // console.log(res)
                this.$toast.success("头像修改成功")
            })
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
        opacity: 0;
    }
}
</style>