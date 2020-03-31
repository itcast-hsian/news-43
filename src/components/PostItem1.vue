<template>
    <div>
        <!-- 循环的结构,少于3张图片的布局 -->
        <div class="imgText">
            <div class="imgText-left">
                <h4>林志玲穿透视黑纱裙米兰看腹部微隆显孕味</h4>
                <p>林志玲 30跟帖</p>
            </div>
            <img src="https://www.baidu.com/img/bd_logo1.png" />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.imgText{
    padding: 20/360*100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #eee solid;

    .imgText-left{
        h4{
            // 文字超出两行出现省略号
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: normal;
        }

        p{
            color: #999;
            margin-top:5px;
        }
    }

    img{
        width: 110/360*100vw;
        height: 75/360*100vw;
        display: block;
        object-fit: cover;
        margin-left: 10/360*100vw;
        flex-shrink: 0; // 防止图片在flex布局下被挤压
    }
}
</style>