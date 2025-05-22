<template>
  <div class="rightBox">
    <div class="topBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">水利数据信息</div>
        <img :src="image2" class="rightImage">
        <div class="titleTip"></div>
      </div>
      <div style="float: left;width: 100%;height: 100%;">
        <div class="infoBox1">
          <img :src="img1" class="imgTip">
          <el-col :span="20" class="tip1">管辖区域(km2)</el-col>
          <el-col :span="12" class="tip2">{{obj.v4}}</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img2" class="imgTip">
          <el-col :span="20" class="tip1">泵站数量(个)</el-col>
          <el-col :span="12" class="tip2">{{obj.v5}}</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img3" class="imgTip">
          <el-col :span="20" class="tip1">拦河闸数量(个)</el-col>
          <el-col :span="12" class="tip2">{{obj.v6}}</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img4" class="imgTip">
          <el-col :span="20" class="tip1">测流点数量(个)</el-col>
          <el-col :span="12" class="tip2">{{obj.v7}}</el-col>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">测流点实时信息</div>
        <img :src="image2" class="rightImage">
        <div class="titleTip"></div>
      </div>
      <div class="detailBox">
        <div v-for="(item,index) in pointList" :key="index">
          <el-col :span="24" class="detailInfo">
            <div  class="siteInfo">{{ index+1 }}</div>  <span style="color: white;">{{ item.siteName }} </span>
            <el-link type="success" style="float: right;opacity: 0.6;" @click="queryDetail(item)">查看详情</el-link>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStatCount } from "@/api/point/point";
import { getLast } from "@/api/point/point";
export default {
  name: 'RightBox',
  data(){
    return{
      image1:require('../../assets/u0_13.gif'),
      image2:require('../../assets/u0_15.gif'),
      img1:require('../../assets/u01_03.gif'),
      img2:require('../../assets/u01_05.gif'),
      img3:require('../../assets/u01_12.gif'),
      img4:require('../../assets/u01_13.gif'),
      obj:{
        v4:1,
        v5:8,
        v6:4,
        v7:2,
      },
      pointList:[],
      timer:null,
    }
  },
  created() {
    this.getLastInfo();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted() {
    // getStatCount().then(response => {
    //   this.obj = response.data;
      //console.log(response.data)
    // });
    getLast().then(response => {
      this.pointList = response.data;
    });
  },
  methods:{
    getLastInfo(){
      this.timer = setInterval(() => {
        getLast().then(response => {
          this.pointList = response.data;
        });
      }, 60000);
    },
    queryDetail(row){
      this.$router.push({
        name: 'rainDay',
        params:{
          deviceId:row.deviceId,
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
.rightBox{
  width: 28%;
  float: left;
  height: calc(100vh - 90px);
  background-image: url("../../assets/u0_033.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-left: 1%;
  margin-right: 1%;
}
.topBox{
  width: 100%;
  height: 50%;
  float: left;
  padding: 15px 15px;
}

.bottomBox{
  width: 100%;
  height: 50%;
  float: left;
  padding: 15px 15px;
}
.titleBox{
  width: 100%;
  height: 40px;
  float: left;
}
.leftImage{
  float: left;
  width: 30%;
  height: 50%;
  margin-top:2%;
  border:none;
  opacity: 0.5;
}
.rightImage{
  float: left;
  width: 30%;
  height: 50%;
  margin-top:2%;
  border:none;
  opacity: 0.5;
}
.titleInfo{
  width: 40%;
  height: 100%;
  float: left;
  color:#27DBEC;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
}
.titleTip{
  float: left;
  background:repeating-linear-gradient(to right,#36D7E4,#58A8E4,#6C83E0);
  height: 5px;
  width: 30%;
  margin-left: 35%;
  border-radius: 2px;
}
.infoBox1{
  float: left;
  width: 44%;
  height: 30%;
  background:repeating-linear-gradient(to right,#1B257B,#000940,#010969);
  padding: 15px 15px;
  margin-left: 4%;
  margin-right: 2%;
  margin-top: 10%;
  color: white;
}
.imgTip{
  margin-top: 10%;
  float: left;
  width: 60px;
  height: 60px;
}
.tip1{
  float: right;
  margin-top: 10%;
  margin-right: -23%;
}
.tip2{
  font-size: 30px;
  text-align: center;
  margin-top:2%;
}
.siteInfo{
  width: 18px;
  height: 18px;
  border-radius: 8px;
  color: white;
  background-color: #68C15D;
  float: left;
  text-align: center;
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2px;
}
.detailInfo{
  background-color: #1B2048;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 10px;
}
.detailBox{
  height: 82%;
  float: left;
  overflow-y: auto;
  width: 100%;
  margin-top: 3%;
}
</style>
