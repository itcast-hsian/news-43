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
</style>