<template>
  <div class="app-container home">
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox></HeaderBox>
    </el-header>
    <el-main style="width: 100%;float: left;background-color: #E5ECF5;height: calc( 100vh - 60px);">
      <LeftBox></LeftBox>
      <div class="mapBox">
<!--        <BMap></BMap>-->
        <TMap></TMap>
      </div>
      <RightBox></RightBox>
    </el-main>
    <el-footer class="footerBox" v-if="false">
      <BottomBox></BottomBox>
    </el-footer>
  </div>
</template>

<script>
import LeftBox from '@/views/home/LeftBox.vue'
import RightBox from '@/views/home/RightBox.vue'
import BMap from '@/views/home/BMap.vue'
import TMap from '@/views/home/TMap.vue'
import BottomBox from '@/views/home/BottomBox.vue'
import HeaderBox from '@/views/home/HeaderBox.vue'
export default {
  name: 'Index',
  components:{
    LeftBox,
    RightBox,
    BMap,
    TMap,
    BottomBox,
    HeaderBox,
  },

  mounted() {

  },

}
</script>

<style scoped lang="scss">

.footerBox{
  width: 100%;
  float: left;
  //background-color: #6191C9;
  border-bottom: 25px solid #196ABC;
  border-right: 30px solid transparent;
  border-left: 30px solid transparent;
}
</style>

