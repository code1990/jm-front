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
          <el-col :span="18" class="tip1">管辖区域</el-col>
          <el-col :span="12" class="tip2">{{obj.v4}}(km2)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img2" class="imgTip">
          <el-col :span="18" class="tip1">泵站数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v5}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img3" class="imgTip">
          <el-col :span="18" class="tip1">拦河闸数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v6}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img4" class="imgTip">
          <el-col :span="18" class="tip1">测流点数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v7}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img5" class="imgTip">
          <el-col :span="18" class="tip1">清污机数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v8}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img6" class="imgTip">
          <el-col :span="18" class="tip1">皮带机数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v9}}(个)</el-col>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">泵站实时信息</div>
        <img :src="image2" class="rightImage">
        <div class="titleTip"></div>
      </div>
      <div  class="contentBox">
        <div class="optionBox">
          <el-radio-group v-model="index">
            <el-radio :label="0" style="color: white;">泵1</el-radio>
            <el-radio :label="1" style="color: white;" >泵2</el-radio>
            <el-radio :label="2" style="color: white;" >泵3</el-radio>
            <el-radio :label="3" style="color: white;" >泵4</el-radio>
          </el-radio-group>
        </div>
        <div class="detailBox">
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">A相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">A相电流：{{v1List[index].a1}}A</div></el-col>

          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">B相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">B相电流：{{v1List[index].a2}}A</div></el-col>

          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">C相电压：{{v1List[index].v3}}V</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">C相电流：{{v1List[index].a3}}A</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"> <div class="grid-content bg-purple">瞬时流量：{{v1List[index].v8}}(m³/h)</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">累计流量：{{v1List[index].v9}}m³</div></el-col>
          <el-col :span="12" style="padding: 12px 3px;"><div class="grid-content bg-purple">总有功电能：{{v1List[index].kwh}}(kW/h)</div></el-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStatCount } from "@/api/point/point";
import { getLast } from "@/api/point/point";
import { queryLast, queryStation } from '@/api/station/station'
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
      img5:require('../../assets/u_qwj.png'),
      img6:require('../../assets/u_pdj.png'),
      obj:{
        v4:1,
        v5:4,
        v6:12,
        v7:2,
        v8:4,
        v9:1,
      },
      pointList:[],
      index: 0,
      options: [],
      value1: '1',
      siteId:null,
      v1List:[{},{},{},{}],
      url: require('../../assets/data_1.png'),
      srcList: [
        require('../../assets/data_1.png'),
      ],
      v3: {
        a1:null,
        a2:null,
        a3:null,
        v1:null,
        v2:null,
        v3:null,
        kw:null,
        kwh:null,
        status:null,
      },
      timer:null,
      timer2:null,
      timeInfo: '',
      dayInfo: '',
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
    // queryStation().then(response => {
    //   let array = response.data;
    //   let siteId = array[0].id;
    //   for(let i= 0;i<array.length;i++){
    //     let obj = { value: array[i].id, label: array[i].name};
    //     array[i]=obj;
    //   }
    //   this.siteId = siteId;
    //   console.log(array)
    //   this.options=array;
    //   this.value1 = siteId;
    //   queryLast(this.siteId+"").then(response => {
    //     let array = response.data;
    //     this.getDetailInfo(array);
    //   });
    // });

    queryStation().then(response => {
      let array = response.data;
      let siteId = array[0].id;
      for(let i= 0;i<array.length;i++){
        let obj = { value: array[i].id, label: array[i].name};
        array[i]=obj;
      }
      this.siteId = siteId;
      // console.log(array)
      this.options=array;
      this.value1 = siteId;
      queryLast(this.siteId+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
    });
  },
  methods:{
    getDetailInfo(array){
      for(let i=0;i<array.length;i++){
        let obj = array[i];
        let name = obj.deviceName;
        if (name.indexOf('1号电机') !== -1){
          //this.v1List[0] = obj;
          this.$set(this.v1List, 0, obj);
        }
        if (name.indexOf('2号电机') !== -1){
          //this.v1List[1] = obj;
          this.$set(this.v1List, 1, obj);
        }
        if (name.indexOf('3号电机') !== -1){
          //this.v1List[2] = obj;
          this.$set(this.v1List, 2, obj);
        }
        if (name.indexOf('4号电机') !== -1){
          //this.v1List[3] = obj;
          this.$set(this.v1List, 3, obj);
        }
      }
      this.index=0;
    },
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
  width: 22%;
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
  margin-top:3%;
  border:none;
  opacity: 0.5;
}
.rightImage{
  float: left;
  width: 30%;
  height: 50%;
  margin-top:3%;
  border:none;
  opacity: 0.5;
}
.titleInfo{
  width: 40%;
  height: 100%;
  float: left;
  color:#27DBEC;
  font-size: 16px;
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
  margin-top: 1%;
  color: white;
}
.imgTip{
  margin-top: 10%;
  float: left;
  width: 50px;
  height: 50px;
}
.tip1{
  float: right;
  margin-top: 10%;
  margin-right: -23%;
}
.tip2{
  font-size: 16px;
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
.chartBox{
  height: 82%;
  float: left;
  overflow-y: auto;
  width: 100%;
  margin-top: 3%;
  border: 1px solid #1B2048;
}
.contentBox{
  width: 100%;
  height: 83.5%;
  float: left;
  background-image: url("../../assets/u02_08.gif") ;
  background-repeat:no-repeat;
  background-size: 100% 100%;
  margin-top: 2%;
}
.optionBox{
  margin-top: 8%;
  float: left;
  margin-left: 10%;
}
.detailBox{
  float: left;
  color: white;
  //margin-left: 8%;
  //margin-top: 5%;
}
</style>
