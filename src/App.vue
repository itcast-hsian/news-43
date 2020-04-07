<template>
    <div id="app">
        <!-- keep-alive会缓存组件，如果不加include会缓存所有的组件，
        但是include需要指定缓存哪个页面组件，取的是页面组件的name值 -->
        <!-- include千万不能使用空格 -->
        <keep-alive include="index,search">
            <!-- 匹配的组件的坑 -->
            <router-view />
        </keep-alive>
    </div>
</template>

<style lang="less">
// css 原生的写法
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
@import url('../node_modules/vant/lib/index.css');

// 公共的样式
*{
    margin: 0;
    padding: 0;
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover{
    color: inherit;
}

ul, li, ol{
    list-style: none;
}

i, em{
    font-style: normal;
}
</style>
