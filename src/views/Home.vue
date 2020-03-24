<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="1 + 1"/>
  </div>
</template>

<script>
// @ 符合就是指向src的，也就是src的别名
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {}
  },
  methods: {},
  components: {
    HelloWorld
  }
}
</script>
<style lang="less">

</style>
