<template>
  <div class="MidBox">
    <div class="topBox">
      <TMap></TMap>
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">泵站实时信息</div>
        <el-select v-model="value1" placeholder="请选择" size="mini" style="width: 130px;font-size: 10px;margin-top: 8px;float: right;margin-right: 40px;"  @change="changeStation">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          <el-col :span="8" style="padding: 20px 10px;"> <div class="grid-content bg-purple">瞬时流量：{{v1List[index].v8}}(m³/h)</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">A相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">A相电流：{{v1List[index].a1}}A</div></el-col>

          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">累计流量：{{v1List[index].v9}}m³</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">B相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">B相电流：{{v1List[index].a2}}A</div></el-col>

          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">总有功电能：{{v1List[index].kwh}}(kW/h)</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">C相电压：{{v1List[index].v3}}V</div></el-col>
          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">C相电流：{{v1List[index].a3}}A</div></el-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStatCount } from "@/api/point/point";
import {queryStation,queryLast } from "@/api/station/station";
import TMap from '@/views/data/TMap.vue'
export default {
  name: 'MidBox',
  components:{
    TMap
  },
  data(){
    return{
      image1:require('../../assets/u0_13.gif'),
      image2:require('../../assets/u0_15.gif'),
      obj:{
        v1:null,
        v2:null,
        v3:null
      },
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
    getStatCount().then(response => {
      this.obj = response.data;
      //console.log(response.data)
    });
    queryStation().then(response => {
      let array = response.data;
      let siteId = array[0].id;
      for(let i= 0;i<array.length;i++){
        let obj = { value: array[i].id, label: array[i].name};
        array[i]=obj;
      }
      this.siteId = siteId;
      console.log(array)
      this.options=array;
      this.value1 = siteId;
      queryLast(this.siteId+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
    });
  },
  methods:{
    getLastInfo(){
      this.timer = setInterval(() => {
        queryStation().then(response => {
          let array = response.data;
          let siteId = array[0].id;
          for(let i= 0;i<array.length;i++){
            let obj = { value: array[i].id, label: array[i].name};
            array[i]=obj;
          }
          this.siteId = siteId;
          console.log(array)
          this.options=array;
          this.value1 = siteId;
          queryLast(this.siteId+"").then(response => {
            let array = response.data;
            this.getDetailInfo(array);
          });
        });
      }, 60000);
    },
    changeStation(value){
      //console.log(value)
      this.value1 = value;
      this.siteId = value;
      queryLast(this.siteId+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
    },
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
  }
}
</script>
<style scoped lang="scss">
.MidBox{
  width: 40%;
  float: left;
  height: calc(100vh - 80px);
}
.topBox{
  width: 100%;
  height: 55%;
  float: left;
}

.bottomBox{
  width: 100%;
  height: 45%;
  float: left;

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
  margin-left: 8%;
  margin-top: 5%;
}
.topBox{
  float: left;
  width: 100%;
}

.imgInfo{
  float: left;
  width: 60%;
  height: 60%;
  background-image: url("../../assets/u01_10.gif");
  background-repeat: no-repeat;
  margin-left: 26%;
  margin-top: 28%;
  //background-size: 100% 100%;
}
.topInfo{
  color: #2BC9CD;
}
.tip1{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 38%;
  top: 20%;
  text-align: center;
  line-height: 60px;
}
.tip2{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 45%;
  top: 12%;
  text-align: center;
  line-height: 60px;
}
.tip3{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 52%;
  top: 20%;
  text-align: center;
  line-height: 60px;
}
.bar1{
  background-color: #113F5C;
  height: 18px;
  width: 2px;
  position: fixed;
  left: 44.85%;
  top: 27%;
}

.bar2{
  background-color: #113F5C;
  height: 88px;
  width: 2px;
  position: fixed;
  left: 50.4%;
  top: 19%;
}
.bar3{
  background-color: #113F5C;
  height: 18px;
  width: 2px;
  position: fixed;
  left: 55.9%;
  top: 27%;
}
</style>
