<template>
    <div class="imgList">
        <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
        <div class="images">
            <img src="https://www.baidu.com/img/bd_logo1.png" />
            <img src="https://www.baidu.com/img/bd_logo1.png" />
            <img src="https://www.baidu.com/img/bd_logo1.png" />
        </div>
        <p>火星时报 52跟帖</p>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.imgList {
    padding: 20/360 * 100vw;
    border-bottom: 1px #eee solid;

    h4 {
        // 文字超出两行出现省略号
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-weight: normal;
    }

    .images {
        margin: 10/360 * 100vw 0;
        display: flex;
        justify-content: space-between;
        img {
            width: 33%;
            height: 75/360 * 100vw;
            object-fit: cover;
        }
    }

    p {
        color: #999;
        margin-top: 5px;
    }
}
</style>