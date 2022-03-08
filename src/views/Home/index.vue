<template>
  <div>
  <!-- 商品分类导航 -->
  <!--列表-->
  <!--今日推荐-->
  <!-- 商品排行 -->
  <!-- 猜你喜欢 -->
  <!--楼层-->
  <!--商标-->
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <ReCommend></ReCommend>
  <Rank></Rank>
  <Like></Like>
  <!-- Floor组件自己内部没有发请求，数据是父组件给的 -->
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
  <Brand></Brand>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/views/Home/ListContainer/index.vue'
import ReCommend from '@/views/Home/ReCommend/index.vue'
import Rank from '@/views/Home/Rank/index.vue'
import Like from '@/views/Home/Like/index.vue'
import Floor from '@/views/Home/Floor/index.vue'
import Brand from '@/views//Home//Brand/index.vue'
import {mapState} from 'vuex'
export default {
  name,
  components:{
    ListContainer,
    ReCommend,
    Rank,
    Like,
    Floor,
    Brand
    },
    computed:{
      ...mapState({
        floorList:(state)=>state.home.floorList
      })
    },
    mounted(){
      this.$store.dispatch('getFloorList')
      // 获取用户信息在首页展示
      // this.$store.dispatch('getUserInfo')
    }

}
</script>

<style>

</style>