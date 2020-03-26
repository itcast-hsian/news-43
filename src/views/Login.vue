<template>
    <div class="container">
        <!-- 返回上一页按钮 -->
        <div class="back-btn">
            <span class="iconfont iconicon-test"></span>
        </div>

        <!-- logo -->
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>

        <!-- 表单 -->
        <div class="form">
            <div class="form-item">
                <input placeholder="手机号码" v-model="form.username">
            </div>
            <div class="form-item">
                <input type="password" placeholder="请输入密码" v-model="form.password">
            </div>
            <div class="form-item">
                <button @click="handleClick">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            // 保存表单数据
            form: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        // 点击登录按钮的事件
        handleClick(){
            // 调用axios发起异步请求，类似$.ajax(类似不代表一样)
            this.$axios({
                // 接口地址
                url: "http://127.0.0.1:3000/login",
                // 声明请求的方法为post请求(一定要注册这个method没有s)
                // 跟vue的methods属性毫无关系
                method: "POST",
                // 参数
                data: this.form
                // .then方法里面的函数就是成功的回调函数
            }).then(res => {
                console.log(res)
            })

        }
    }
};
</script>

<style lang="less">
    .container{
        padding: 20 / 360 * 100vw;
    }

    // 样式会被iconfont覆盖的，所以要选中span
    .back-btn span{
        font-size: 27 / 360 * 100vw;
        line-height: 1;
    }

    .logo{
        text-align: center;
        margin-top: 20 / 360 * 100vw;
    }

    .logo span{
        font-size: 126 / 360 * 100vw;
        color: #cc3300;
    }
    
    .form-item{
         margin-top: 20 / 360 * 100vw;
    }

    .form-item input{
        width: 100%;
        height: 44 / 360 * 100vw;
        box-sizing: border-box;
        line-height: 44 / 360 * 100vw;
        background: none;
        border:none;
        border-bottom: 1px #999 solid;
        outline: none; // 输入框点击时候没有高亮状态
        font-size: 16px; // 文字大小尽量用像素，因为浏览器最低支持12px
    }

    .form-item button{
        margin-top: 50 / 360 * 100vw;
        width: 100%;
        height: 48 / 360 * 100vw;
        background: #cc3300;
        color: #fff;
        border-radius: 50px;
        border: none;
        outline: none;
        font-size: 16px;
    }
</style>