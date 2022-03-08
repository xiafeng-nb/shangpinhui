<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示 ，在登陆和注册下是隐藏的-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  // APP组件是最先执行的，而且他的mounted()只执行一次
  mounted(){
    // 派发一个action 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
