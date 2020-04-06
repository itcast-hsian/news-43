<template>
    <div class="container">
        <div class="main">
            <!-- 头部 -->
            <div class="header">
                <div class="left">
                    <span class="iconfont iconjiantou2"></span>
                    <span class="iconfont iconnew"></span>
                </div>
                <!-- active表示红色的 -->
                <span class="follow active">
                    已关注
                </span>
            </div>
            <h2 class="title">车主注意啦！9月下旬部分临时泊位进行清洁保养</h2>
            <p class="author">火星时报    2019-10-10</p>
            <div class="content">
                为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：
            </div>
            <!-- 按钮列表 -->
            <div class="actions">
                <div class="actions-item">
                    <span class="iconfont icondianzan"></span> 
                    <i>122</i>
                </div>
                <div class="actions-item">
                    <span class="iconfont iconweixin"></span> 
                    <i>微信</i>
                </div>
            </div>
        </div>

        <!-- 固定在底部的底部栏 -->
        <div class="footer">
            <!-- 点击跳转到评论页 -->
            <div class="comment-input">发布评论</div>
            <div class="icons">
                <span class="iconfont iconpinglun-"></span>
                <i>102</i>
            </div>
            <!-- 如果当前是收藏的状态显示一个红色的按钮 -->
            <div class="icons">
                <span class="iconfont iconshoucang active"></span>
            </div>
            <!-- 这个按钮是一个装饰用的，微信分享需要企业的资质 -->
            <div class="icons">
                <span class="iconfont iconfenxiang"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.main{
    padding: 20/360*100vw;
    border-bottom: 5px #eee solid;

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20/360*100vw;

        .left{
            display: flex;
            align-items: center;
        }
        .iconnew{
            display: inline-block;
            transform: scale(3.5);
            margin-left: 30px;
        }
        .follow{
            padding: 3px 10px;
            border: 1px #999 solid;
            border-radius: 50px;
            font-size: 12px;
        }
    }

    .title{
        font-size: 18px;
    }
    .author{
        line-height: 2;
        color: #999;
        font-size: 14px;
        margin-top: 10/360*100vw
    }

    .content{
        line-height: 1.8;
        margin-top: 10/360*100vw;
    }

    .actions{
        display: flex;
        justify-content: space-around;
        margin-top: 30/360*100vw;
        padding: 0 50/360*100vw;

        .actions-item{
            display: flex;
            align-items: center;
            border: 1px #999 solid;
            padding: 3px 10px;
            border-radius: 50px;
            font-size: 12px;

            span{
                margin-right: 5px;
            }

            .iconweixin{
                color: #00c800;
            }
        }
    }
}

.footer{
    position: fixed;
    width: 100%;
    bottom:0;
    left:0;
    background: #fff;
    padding: 10/360*100vw 20/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .comment-input{
        flex: 1;
        margin-right: 20/360*100vw;
        height: 30/360*100vw;
        padding: 0 20/360*100vw;
        line-height: 30/360*100vw;
        border-radius: 50px;
        background: #eee;
    }

    .icons{
        position: relative;
        margin: 0 8/360*100vw;
        .iconfont{
            font-size: 23px;
        }
        i{
            position: absolute;
            right: -10px;
            top:-5px;
            display: block;
            padding: 1px 2px;
            background: red;
            color: #fff;
            font-size: 10px;
            line-height: 1;
            border-radius: 50px;
        }
    }
}
</style>