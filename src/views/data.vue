<template>
  <div class="dataBox">
    <div class="topBox">
      <HeaderBox></HeaderBox>
    </div>
    <div class="bottomBox">
      <LeftBox></LeftBox>
      <MidBox></MidBox>
      <RightBox></RightBox>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/views/data/HeaderBox.vue'
import LeftBox from '@/views/data/LeftBox.vue'
import MidBox from '@/views/data/MidBox.vue'
import RightBox from '@/views/data/RightBox.vue'
export default {
  name: 'Data',
  components: { RightBox, MidBox, LeftBox, HeaderBox }
}
</script>
<style scoped lang="scss">
.dataBox{
  float: left;
  width: 100%;
  height: 100vh;
  background:linear-gradient(#29265B ,#000930,#050D60);
}
.topBox{
  float: left;
  width: 100%;
  height: 80px;
}
.bottomBox{
  float: left;
  width: 100%;
  height: calc(100vh-80px);
}
</style>
