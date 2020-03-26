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
                <input placeholder="手机号码">
            </div>
            <div class="form-item">
                <input type="password" placeholder="请输入密码">
            </div>
            <div class="form-item">
                <button @click="handleClick">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        // 点击登录按钮的事件
        handleClick(){
            this.$toast('登录成功');
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