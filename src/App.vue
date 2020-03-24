<template>
    <div id="app">
        <!-- 匹配的组件的坑 -->
        <router-view />
    </div>
</template>

<style lang="less">
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
