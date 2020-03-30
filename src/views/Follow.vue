<template>
    <div>
        <!-- 头部组件 -->
        <NavigateBar title="我的关注"/>

        <!-- 要循环的结构 -->
        <div class="user-item">
            <img src="https://dss0.baidu.com/73x1bjeh1BF3odCf/it/u=4139491198,1951725334&fm=85&s=EAB0AA454A5138DC2E90D90C0100C091">
            <div class="user-info">
                <div>火星网友</div>
                <p>2020-20-20</p>
            </div>
            <span class="cancel">取消关注</span>
        </div>
    </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar"

export default {
    // 注册组件
    components: {
        NavigateBar
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