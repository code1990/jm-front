<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div  style="width: 100%;height: 100%;float: left;margin-left: 0px;"  v-loading="loading">
      <div class="" style="width: 28%;height: 100%;float: left;">
        <div style="width: 100%;background-color: white;border-radius: 5px;height: 60%;float: left;">
          <div class="tipBox">
            <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
            <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">闸门信息</div>
          </div>
          <div class="gateBox">
            <img src="../../assets/gate_03.gif" style="width: 100%;">
          </div>
          <div class="tipContent" style="margin-top: 10px;">
            <div class="tipButton">
              <el-button size="small" :class="{'active':index1===0,'default':index1!==0}" @click="getInfo(0)">闸门1</el-button>
              <el-button size="small" :class="{'active':index1===1,'default':index1!==1}" @click="getInfo(1)">闸门2</el-button>
            </div>
            <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
              <div style="float: left;">
                当前状态：<span :class="{'activeStatus':status1===1||status1===2,'defaultStatus':status1===0}">{{status1 === 1?'上升':(status1===2?'下降':'停止')}}</span>
              </div>
              <div style="float: left;margin-left: 30px;">
                <div v-if="status1===1">
                  <div class="active2">上升</div>
                  <div class="default2">下降</div>
                  <div class="default2">停止</div>
                </div>
                <div v-if="status1===2">
                  <div class="default2">上升</div>
                  <div class="active2">下降</div>
                  <div class="default2">停止</div>
                </div>
                <div v-if="status1===0">
                  <div class="default2">上升</div>
                  <div class="default2">下降</div>
                  <div class="active3">停止</div>
                </div>
              </div>
              <div style="float: left;margin-left: -15px;">
                  <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">A相电流：{{v1List[index1].a1}}(A)</el-col>
                  <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">B相电流：{{v1List[index1].a2}}(A)</el-col>
                  <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">C相电流：{{v1List[index1].a3?v1List[index1].a3.toFixed(2):'0'}}(A)</el-col>
                  <el-col :span="9" style="margin-left: 20px;margin-top: 15px;height: 20px;">电压：{{v1List[index1].v1}}(V)</el-col>
                  <el-col :span="9" style="margin-left: 15px;margin-top: 15px;height: 20px;">总功率：{{v1List[index1].kw}}(W)</el-col>
                  <el-col :span="9" style="margin-left: 15px;margin-top: 15px;height: 20px;">总电量：{{v1List[index1].kwh?v1List[index1].kwh.toFixed(2):'0'}}(kwh)</el-col>
              </div>
            </div>

          </div>
        </div>
        <div style="width: 100%;height: calc( 40% - 20px);background-color: white;float: left;margin-top: 20px;border-radius: 5px;">
          <div class="tipBox">
            <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
            <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">故障报警</div>
          </div>
          <div class="tableBox">
            <el-table
              :data="alarmList"
              :header-cell-style="{'background-color': '#F2FAFF','text-align':'center'}"
              stripe
              style="width: 100%;">
              <el-table-column
                prop="siteName"
                label="名称"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="alarmTime"
                label="报警时间"
                align="center"
                show-overflow-tooltip
                >
              </el-table-column>
              <el-table-column
                prop="alarmTime"
                label="报警内容"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div style="width: calc( 72% - 20px);background-color: white;float: left;margin-left: 20px;border-radius: 5px;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">闸门监控</div>
        </div>
        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 75px;border-bottom:1px solid #D6E7F7; ">
          <el-form :model="queryParams2" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="设备名称" prop="roleName"  style="margin-left: 20px;">
              <el-select v-model="queryParams2.deviceId" placeholder="请选择设备" size="small" style="float: left;margin-left: 20px;" @change="handleQuery2">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回放时间" prop="repairTime"  style="margin-left: 20px;">
              <el-date-picker
                v-model="date2"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="回放开始日期"
                end-placeholder="回放结束日期"  size="small"  @change="handleQuery2"></el-date-picker>
            </el-form-item>
            <el-form-item  >
              <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery2()">查询</el-button>
              <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery2()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="videoBox">
          <div class="videoDetail" v-for="(item,index) in videoList" :key="index" >
            <video
              :id="`videoElement${index}`"
              :ref="`videoElement${index}`"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ item.label }}</div>
          </div>
          <!--          <div class="videoDetail" >-->
          <!--            <video-->
          <!--              id="videoElement2"-->
          <!--              ref="videoElement2"-->
          <!--              poster="../../assets/video_conver.png"-->
          <!--              controls-->
          <!--              muted-->
          <!--              width="100%"-->
          <!--              height="100%"-->
          <!--            ></video>-->
          <!--            <div class="videoTitle">闸门1后置监控点</div>-->
          <!--          </div>-->
          <!--          <div class="videoDetail" >-->
          <!--            <video-->
          <!--              id="videoElement3"-->
          <!--              ref="videoElement3"-->
          <!--              controls-->
          <!--              muted-->
          <!--              poster="../../assets/video_conver.png"-->
          <!--              width="100%"-->
          <!--              height="100%"-->
          <!--            ></video>-->
          <!--            <div class="videoTitle">闸门2前置监控点</div>-->
          <!--          </div>-->
          <!--          <div class="videoDetail" >-->
          <!--            <video-->
          <!--              id="videoElement4"-->
          <!--              ref="videoElement4"-->
          <!--              poster="../../assets/video_conver.png"-->
          <!--              controls-->
          <!--              muted-->
          <!--              width="100%"-->
          <!--              height="100%"-->
          <!--            ></video>-->
          <!--            <div class="videoTitle">闸门2后置监控点</div>-->
          <!--          </div>-->
        </div>
      </div>
      <div style="width: 100%;background-color: white;float: left;margin-top: 20px;border-radius: 5px;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">监测数据</div>
        </div>
        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 75px;border-bottom:1px solid #D6E7F7; ">
          <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="设备名称" prop="deviceId"  style="margin-left: 20px;">
              <el-select v-model="queryParams1.deviceId" placeholder="请选择设备" size="small" style="float: left;margin-left: 20px;" @change="handleQuery1">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="监测时间" prop="repairTime"  style="margin-left: 20px;">
              <el-date-picker
                v-model="date1"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="监测开始日期"
                end-placeholder="监测结束日期"  size="small"  @change="handleQuery1"></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left: 20px;">
              <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery1()">查询</el-button>
              <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery1()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div id="main" style="width: 50%;height: 300px;float: left"></div>
        <div id="main2" style="width: 50%;height: 300px;float: left"></div>
      </div>

    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import LeftBox from '@/views/gate/LeftBox.vue'
import flvjs from 'flv.js'
import { queryLast,getDict} from "@/api/gate/gate";
import { listAlarm} from "@/api/history/alarm";
import { getSiteDay } from '@/api/history/site'
import { getVideoDict } from '@/api/video/video'

export default {
  name: 'manage',
  components: { HeaderBox,LeftBox },
  data() {
    return {
      date1:'',
      date2:'',
      showSearch: true,
      options1:[],
      options2:[],
      loading:false,
      active:'3',
      id:null,
      index1:0,
      status1:0,
      deviceId:'',
      videoId:'',
      v1:0,
      videoList:[],
      videoList2:[],
      v1List:[{
        a1:null,
        a2:null,
        a3:null,
        v1:null,
        v2:null,
        v3:null,
        kw:null,
        kwh:null,
        status:null,
      },{}],
      alarmList:[{alarmTime:'1'},{alarmTime:'1'},{alarmTime:'1'},{alarmTime:'1'},{alarmTime:'1'}],
      queryParams1: {
        siteId: null,
        deviceId: null,
        statTime:null,
        endTime:null,
        siteType:'2',
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'2',
      },
    }
  },
  watch: {
    $route(to, from) {
      let id = to.params.id;
      this.id = id;
      this.loading = true;
      queryLast(this.id+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
        this.loading = false;
      });
      this.queryParams1.siteId = this.id+"";
      this.deviceId = this.id+"";
      listAlarm(this.queryParams1).then(response => {
        this.alarmList = response.rows;
      });
      getDict(this.id+"").then(response=>{
        this.options1 = response.data;
        // console.log(response.data)
      });
      getDict(this.id+"").then(response=>{
        this.options1 = response.data;
        this.deviceId = response.data[0].value;
        this.queryParams1.deviceId=response.data[0].value;
        getSiteDay(this.queryParams1).then(response => {
          let array = response.data;
          this.drawChart(array);
          this.drawChart2(array);
        });
      });
      getVideoDict(this.id+"","2").then(response => {
        this.options2 = response.data;
        this.videoId = response.data[0].value;
        //this.queryParams2.deviceId=response.data[0].value;
        //console.error(response.data)
        this.videoList = response.data;
        this.videoList2 =response.data;
      });
      console.error('路由变化了',id)
    }
  },
  mounted() {
    this.id = this.$route.params.id
    // let obj = this.$refs.videoElement1
    // console.error(obj);
    // console.error(this.$route.params.id)
    // this.createFlv("videoElement1");
    // this.createFlv("videoElement2");
    // this.createFlv("videoElement3");
    // this.createFlv("videoElement4");
    this.loading = true;
    queryLast(this.id+"").then(response => {
      let array = response.data;
      this.getDetailInfo(array);
      this.loading = false;
    });
    this.queryParams1.siteId = this.id+"";
    listAlarm(this.queryParams1).then(response => {
      this.alarmList = response.rows;
    });
    getDict(this.id+"").then(response=>{
      this.options1 = response.data;
      this.deviceId = response.data[0].value;
      this.queryParams1.deviceId=response.data[0].value;
      getSiteDay(this.queryParams1).then(response => {
        let obj = response.data;
        // let array = response.data;
        this.drawChart(obj.data,obj.date);
        this.drawChart2(obj.data,obj.date);
      });
    });
    getVideoDict(this.id+"","2").then(response => {
      this.options2 = response.data;
      this.videoId = response.data[0].value;
      //this.queryParams2.deviceId=response.data[0].value;
      //console.error(response.data)
      this.videoList = response.data;
      this.videoList2 =response.data;
    });
  },
  activated() {
    console.error(this.$route.params.id)
  },
  methods:{
    resetQuery1(){
      this.date1=null;
      this.queryParams1.deviceId = this.deviceId;
      this.queryParams1.statTime = '';
      this.queryParams1.endTime = '';
      this.handleQuery1();
    },
    handleQuery1(){
      //this.queryParams1.deviceId = this.deviceId;
      getSiteDay(this.queryParams1).then(response => {
        console.error(response.data)
        let obj = response.data;
        // let array = response.data;
        this.drawChart(obj.data,obj.date);
        this.drawChart2(obj.data,obj.date);
      });
    },
    resetQuery2(){
      this.date2=null;
      this.queryParams2.startTime='';
      this.queryParams2.endTime='';
      this.videoList =this.videoList2;
    },
    handleQuery2(){
      if (this.date2){
        let v = this.date2[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams2.startTime=v;
        v = this.date2[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams2.endTime=v;
      }
      let id = this.queryParams2.deviceId;
      if (this.queryParams2.deviceId){
        let array = this.videoList2;
        let array3 = [];
        for(let i =0;i<array.length;i++){
          let obj = array[i];
          if (obj.value === id){
            array3.push(obj);
          }
        }
        console.log(array3)
        this.videoList =array3;
      }
    },
    drawChart(array,date){
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['电流', '电压', '总功率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '电流',
            type: 'line',
            stack: 'Total',
            data: array[1]
          },
          {
            name: '电压',
            type: 'line',
            stack: 'Total',
            data: array[0]
          },
          {
            name: '总功率',
            type: 'line',
            stack: 'Total',
            data: array[2]
          },
        ]
      };
      option && myChart.setOption(option);
    },
    drawChart2(array,date){
      var chartDom = document.getElementById('main2');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['当前雨量', '上游水位', '下游水位']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '当前雨量',
            type: 'line',
            stack: 'Total',
            data: array[3]
          },
          {
            name: '上游水位',
            type: 'line',
            stack: 'Total',
            data: array[4]
          },
          {
            name: '下游水位',
            type: 'line',
            stack: 'Total',
            data: array[5]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    getInfo(val){
      this.index1 = val;
      let obj = this.v1List[val];
      if (obj.status) {
        this.status1 = parseInt(obj.status);
      }
    },
    queryStationList(){

    },
    getDetailInfo(array) {
      for(let i=0;i<array.length;i++) {
        let obj = array[i];
        let name = obj.deviceName;
        if (name.indexOf('1号自排闸') !== -1) {
          this.v1List[0] = obj;
          if (obj.status){
            this.status1 = parseInt(obj.status);
          }
        }
        if (name.indexOf('2号自排闸') !== -1) {
          this.v1List[1] = obj;
        }
        // if (name.indexOf('3号电机') !== -1) {
        //   this.v1List[2] = obj;
        // }
        // if (name.indexOf('4号电机') !== -1) {
        //   this.v1List[3] = obj;
        // }
      }
    },
    //创建flv视频实例
    createFlv(id) {
      let url="rtmp://192.168.2.12:1935/live/home";
      // let url="@/assets/demo.flv";
      if (flvjs.isSupported()) {
        let videoElement = document.getElementById(id);
        this.flvPlayer = flvjs.createPlayer({
          type: "flv",
          isLive: false,
          hasAudio: false,
          url
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
      }
    },
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
.tipBox{
  padding: 20px 20px 15px 20px;
  border-bottom:1px solid #D6E7F7;
}
.gateBox{
  width: calc( 100% - 40px);
  margin-left: 20px;
  margin-top: 20px;
  height: 165px;
}
.tipContent{
  float: left;
  width: 400px;
}
.active{
  background-color: #1C72CA;
  color: white;
  margin-left: 20px;margin-top: 15px;
}
.default{
  border: 1px solid #3481D0;
  background-color: white;
  color: #3481D0;
  margin-left: 20px;margin-top: 15px;
}
.tipButton{
  width: 100%;
  float: left;
}
.active2{
  background-color: #56C911;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
  color: white;
}
.active3{
  background-color: #F67D7D;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
  color: white;
}
.default2{
  background-color: #F2F2F2;
  width: 60px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
}
.activeStatus{
  font-weight: bold;
  color:#56C911;
  font-size: 18px;
}
.defaultStatus{
  font-weight: bold;
  color:#F67D7D;
  font-size: 18px;
}
.tableBox{
  padding: 20px 20px;
  height: calc( 100% - 90px);
  overflow-y: auto;
}
.videoBox {
  width: 100%;
  //height: 500px;
  //height: calc( 100% - 140px);
  float: left;
  margin-top: 20px;
  height: 73vh;
  overflow: auto;
  //background-color: pink;
  //padding: 15px 10px;
}
.leftBox{
  width: calc( 25% - 25px );
  float: left;
  height: 22vh;
  margin-left: 20px;
  background-color: black;
  padding-top: 20px;
  margin-bottom: 20px;
}
.rightBox{
  width: calc( 25% - 25px );
  float: left;
  height: 22vh;
  margin-left: 20px;
  background-color: black;
  padding-top: 20px;
  margin-bottom: 20px;
}
.videoTitle{
  color: white;
  width: 95%;
  left: 5%;
  top: -109%;
  position: relative;
}
.videoDetail{
  padding-top: 20px;
  width: 47%;
  height: 34.5vh;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: black;
}
</style>
