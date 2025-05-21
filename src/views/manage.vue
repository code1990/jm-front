<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <Sidebar2 @child-msg="getChildMsg" :active="active"></Sidebar2>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div  style="width: 100%;height: 100%;float: left;margin-left: 0px;background-color: white;"  v-loading="loading">

    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import Sidebar2 from '@/layout/components/Sidebar/SideBar2.vue'
export default {
  name: 'manage',
  components: { HeaderBox,Sidebar2 },
  data() {
    return {
      loading:false,
      active:'2',
    }
  },
  methods:{
    getChildMsg(key){
      console.error(key)
    }
  }
}
</script>

<style scoped lang="scss">
.theme-picker{

}
.aside{
  float: left;
  height: calc(100vh - 60px);
  padding: 0px;
}
.main{
  float: left;
  height:calc(100vh - 60px);
  background-color: #E5ECF5;
}
</style>
