<template>
  <div class="rightBox">
    <div class="top">
      <div class="tipBox">
        <div class="optionBox2">
          <div class="titleBar"></div>
          <div class="titleBox" style="font-size: 14px;">管辖区域(km2)</div>
        </div>
        <div>
          <div class="textTip">{{obj.v4}}</div>
          <img :src="image1" class="imageTip">
        </div>
      </div>
      <div class="tipBox">
        <div class="optionBox2">
          <div class="titleBar"></div>
          <div class="titleBox" style="font-size: 14px;">拦河闸数量(个)</div>
        </div>
        <div>
          <div class="textTip">{{obj.v5}}</div>
          <img :src="image2" class="imageTip" style="margin-top: -35px;">
        </div>
      </div>
      <div class="tipBox">
        <div class="optionBox2">
          <div class="titleBar"></div>
          <div class="titleBox" style="font-size: 14px;">泵站数量(个)</div>
        </div>
        <div>
          <div class="textTip">{{obj.v6}}</div>
          <img :src="image4" class="imageTip">
        </div>
      </div>
      <div class="tipBox">
        <div class="optionBox2">
          <div class="titleBar"></div>
          <div class="titleBox" style="font-size: 14px;">测流点数量(个)</div>
        </div>
        <div>
          <div class="textTip">{{obj.v7}}</div>
          <img :src="image3" class="imageTip" style="width: 34px;">
        </div>
      </div>
    </div>
    <div class="mid">
      <div>
        <div class="optionBox">
          <div class="titleBar"></div>
          <div class="titleBox" style="width: 40%;margin-top: 0px;">泵站实时信息</div>
          <el-select v-model="value1" placeholder="请选择" size="mini" style="width: 130px;font-size: 10px;margin-top: -5px;float: right;" @change="changeStation">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="b" style="width:95%;float: left;margin-left: 5%;height: 30px;" ref="b">
        <el-radio-group v-model="index">
          <el-radio :label="0">泵1</el-radio>
          <el-radio :label="1" style="margin-left: -20px;" >泵2</el-radio>
          <el-radio :label="2" style="margin-left: -20px;" >泵3</el-radio>
          <el-radio :label="3" style="margin-left: -20px;" >泵4</el-radio>
        </el-radio-group>
      </div>
      <div class="detailBox">
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;">瞬时雨量：{{v1List[index].v8}}<span style="font-size: 12px;">mm</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;">累计雨量：{{v1List[index].v9}}<span style="font-size: 12px;">mm</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">A&nbsp;</span>相电压：{{v1List[index].v1}}<span style="font-size: 12px;">V</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">A&nbsp;</span>相电流：{{v1List[index].v2}}<span style="font-size: 12px;">A</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">B&nbsp;</span>相电压：{{v1List[index].v3}}<span style="font-size: 12px;">V</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">B&nbsp;</span>相电流：{{v1List[index].a1}}<span style="font-size: 12px;">A</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">C&nbsp;</span>相电压：{{v1List[index].a2}}<span style="font-size: 12px;">V</span></div></el-col>
        <el-col :span="12" class="tipBox3"><div class="grid-content bg-purple" style="height: 20px;"><span style="font-size: 16px;">C&nbsp;</span>相电流：{{v1List[index].a3}}<span style="font-size: 12px;">A</span></div></el-col>
        <el-col :span="24" class="tipBox3" style="margin-bottom: 10px;"><div class="grid-content bg-purple" style="height: 20px;">总有功电能：{{v1List[index].kwh}}<span style="font-size: 12px;">(kW/h)</span></div></el-col>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="optionBox">
          <div class="titleBar"></div>
          <div class="titleBox" style="width: 87%;margin-top: 0px;">测流点实时信息</div>
        </div>
      </div>
      <div style="height: 23vh;float: left;overflow-y: auto;width: 100%">
        <div v-for="(item,index) in pointList" :key="index">
          <el-col :span="24" style="padding-bottom: 10px;">
            <div  class="siteInfo">{{ index+1 }}</div>  {{ item.siteName }} <el-button type="warning" size="mini" style="background-color: #FD7625;margin-left: 20px;" @click="queryDetail(item)">查看详情</el-button>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStatCount } from "@/api/point/point";
import {queryStation,queryLast } from "@/api/station/station";
import { getLast } from "@/api/point/point";
export default {
  name: 'RightBox',
  data() {
    return {
      obj:{
        v4:1,
        v5:8,
        v6:4,
        v7:2,
      },
      image1:require('../../assets/u2_00.gif'),
      image2:require('../../assets/u2_01.gif'),
      image3:require('../../assets/u2_02.gif'),
      image4:require('../../assets/u2_03.gif'),
      index: 0,
      pointList:[],
      options: [],
      value1: '1',
      siteId:null,
      v1List:[{},{},{},{}],
      timer:null,
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
      queryParams: {
        pageNum: 1,
        pageSize: 100,
      },
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
      // this.obj = response.data;
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
    getLast().then(response => {
      this.pointList = response.data;
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
.titleBox {
  font-weight: bold;
  margin-left: 10px;
  float: left;
  width: 87%;
  margin-top: 2px;
}
.mid{
  width: 94%;
  float: left;
  height: 33%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 18px;
  margin-left: 6%;
}
.bottom{
  width: 94%;
  float: left;
  height: 36%;
  background-color: white;
  border-radius: 5px;
  margin-left: 6%;
}
.titleBar {
  float: left;
  width: 3px;
  height: 15px;
  background-color: #409EFF;
  border-radius: 3px;
  margin-top: 4px;
}

.optionBox {
  width: 100%;
  float: left;
  border-bottom: 1px solid #606266;
  margin-bottom: 10px;
  padding: 15px 10px;
}

.optionBox2 {
  width: 100%;
  float: left;
  margin-bottom: 10px;
  padding: 15px 10px;
}
.rightBox{
  width: 300px;
  float: left;
  height: calc( 100vh - 110px);
}
.tipBox{
  background-color: white;
  float: left;
  width: 43%;
  border-radius: 5px;
  margin-left: 20px;
  margin-bottom: 15px;
  height: 110px;
}
.textTip{
  font-size: 30px;
  text-align: center;
  margin-left: -10px;
  margin-top: -10px;
  color: #00afff;
}
.imageTip{
  width: 40px;
  float: right;
  margin-top: -30px;
}
.tipBox3{
  padding-top: 10px;
  padding-left: 10px;
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
  margin-top: 3px;
}
</style>
