<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div class="" style="width: 100%;height: 28%;">
      <div class="machineBox" style="width: 28%;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">水泵机组</div>
        </div>
        <div class="tipContent">
          <div class="tipButton">
            <el-button size="small" :class="{'active':index1===0,'default':index1!==0}" @click="getInfo(1,0)">水泵机1</el-button>
            <el-button size="small" :class="{'active':index1===1,'default':index1!==1}" @click="getInfo(1,1)">水泵机2</el-button>
            <el-button size="small" :class="{'active':index1===2,'default':index1!==2}" @click="getInfo(1,2)">水泵机3</el-button>
            <el-button size="small" :class="{'active':index1===3,'default':index1!==3}" @click="getInfo(1,3)">水泵机4</el-button>
          </div>
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status1===1,'defaultStatus':status1===0}">{{status1 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status1===1">
                <div class="active2">启动</div>
                <div class="default2">停止</div>
              </div>
              <div v-if="status1===0">
                <div class="default2">启动</div>
                <div class="active3">停止</div>
              </div>
            </div>
          </div>
          <el-col :span="7" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">A相电流：{{v1List[index1].a1}}(A)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 11px;height: 20px;font-size: 14px;">B相电流：{{v1List[index1].a2}}(A)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 11px;height: 20px;font-size: 14px;">C相电流：{{v1List[index1].a3}}(A)</el-col>
          <el-col :span="7" style="margin-left: 20px;margin-top: 12px;height: 20px;font-size: 14px;">电压：{{v1List[index1].v1}}(V)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">总功率：{{v1List[index1].kw}}(W)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">总电量：{{v1List[index1].kwh}}(kwh)</el-col>
        </div>
      </div>
      <div class="machineBox" style="margin-left: 20px;width: 28%;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">清污机组</div>
        </div>
        <div class="tipContent">
          <div class="tipButton">
            <el-button size="small" :class="{'active':index2===0,'default':index2!==0}" @click="getInfo(2,0)">清污机1</el-button>
            <el-button size="small" :class="{'active':index2===1,'default':index2!==1}" @click="getInfo(2,1)">清污机2</el-button>
            <el-button size="small" :class="{'active':index2===2,'default':index2!==2}" @click="getInfo(2,2)">清污机3</el-button>
            <el-button size="small" :class="{'active':index2===3,'default':index2!==3}" @click="getInfo(2,3)">清污机4</el-button>
          </div>
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status2===1,'defaultStatus':status2===0}">{{status2 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status2===1">
                <div class="active2">启动</div>
                <div class="default2">停止</div>
              </div>
              <div v-if="status2===0">
                <div class="default2">启动</div>
                <div class="active3">停止</div>
              </div>
            </div>
          </div>
          <el-col :span="7" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">A相电流：{{v2List[index2].a1}}(A)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 11px;height: 20px;font-size: 14px;">B相电流：{{v2List[index2].a2}}(A)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 11px;height: 20px;font-size: 14px;">C相电流：{{v2List[index2].a3}}(A)</el-col>
          <el-col :span="7" style="margin-left: 20px;margin-top: 12px;height: 20px;font-size: 14px;">电压：{{v2List[index2].v1}}(V)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">总功率：{{v2List[index2].kw}}(W)</el-col>
          <el-col :span="7" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">总电量：{{v2List[index2].kwh}}(kwh)</el-col>
        </div>
      </div>
      <div class="machineBox" style="margin-left: 20px;width: 23%;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">皮带机组</div>
        </div>
        <div class="tipContent">
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status3===1,'defaultStatus':status3===0}">{{status3 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status3===1">
                <div class="active2">启动</div>
                <div class="default2">停止</div>
              </div>
              <div v-if="status3===0">
                <div class="default2">启动</div>
                <div class="active3">停止</div>
              </div>
            </div>
          </div>
          <el-col :span="8" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">A相电流：{{v3.a1}}(A)</el-col>
          <el-col :span="8" style="margin-left: 5px;margin-top: 11px;height: 20px;font-size: 14px;">B相电流：{{v3.a2}}(A)</el-col>
          <el-col :span="8" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">C相电流：{{v3.a3}}(A)</el-col>
          <el-col :span="8" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">电压：{{v3.v1}}(V)</el-col>
          <el-col :span="8" style="margin-left: 20px;margin-top: 12px;height: 20px;font-size: 14px;">总功率：{{v3.kw}}(W)</el-col>
          <el-col :span="8" style="margin-left: 5px;margin-top: 12px;height: 20px;font-size: 14px;">总电量：{{v3.kwh}}(kwh)</el-col>
        </div>
      </div>
      <div class="machineBox" style="margin-left: 20px;width: 16%;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">水位信息</div>
        </div>
        <div>
          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">当前雨量：{{v3.v4?v3.v4.toFixed(2):'0'}}(m)</el-col>
          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">上游水位：{{v3.v5?v3.v5.toFixed(2):'0'}}(M)</el-col>
          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;font-size: 14px;">下游水位：{{v3.v6}}(M)</el-col>
          <el-col :span="24" style="margin-left: 20px;margin-top: 12px;height: 20px;font-size: 14px;">水位差：{{v3.v7}}(M)</el-col>
        </div>
      </div>
    </div>
    <div  style="width: 100%;float: left;margin-left: 0px;background-color: white;margin-top: 20px;border-radius: 5px;"  v-loading="loading">
      <div class="tipBox">
        <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
        <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">监控数据</div>
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


      <div id="main" style="width: 50%;height: 300px;float: left;"></div>
      <div id="main2" style="width: 50%;height: 300px;float: left;"></div>
    </div>
    <div  style="width: 100%;float: left;margin-left: 0px;background-color: white;margin-top: 20px;border-radius: 5px;"  v-loading="loading">
      <div class="tipBox">
        <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
        <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">泵站监控</div>
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
<!--        <div class="optionBox">-->
<!--          <div class="titleBar"></div>-->
<!--          <div class="titleBox">视频监控</div>-->
<!--        </div>-->
<!--        <div class="leftBox2">-->
<!--          <video width="100%" height="98%" controls autoplay loop>-->
<!--            <source src="" type="video/mp4" >-->
<!--          </video>-->
<!--        </div>-->
<!--        <div class="rightBox2">-->
<!--          <video width="100%" height="98%" controls autoplay loop>-->
<!--            <source src="" type="video/mp4" >-->
<!--          </video>-->
<!--        </div>-->
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
<!--        <div class="videoDetail" >-->
<!--          <video-->
<!--            id="videoElement2"-->
<!--            ref="videoElement2"-->
<!--            poster="../../assets/video_conver.png"-->
<!--            controls-->
<!--            muted-->
<!--            width="100%"-->
<!--            height="100%"-->
<!--          ></video>-->
<!--          <div class="videoTitle">后置监控点</div>-->
<!--        </div>-->
<!--        <div class="videoDetail" >-->
<!--          <video-->
<!--            id="videoElement1"-->
<!--            ref="videoElement1"-->
<!--            controls-->
<!--            muted-->
<!--            poster="../../assets/video_conver.png"-->
<!--            width="100%"-->
<!--            height="100%"-->
<!--          ></video>-->
<!--          <div class="videoTitle">前置监控点</div>-->
<!--        </div>-->
<!--        <div class="videoDetail" >-->
<!--          <video-->
<!--            id="videoElement2"-->
<!--            ref="videoElement2"-->
<!--            poster="../../assets/video_conver.png"-->
<!--            controls-->
<!--            muted-->
<!--            width="100%"-->
<!--            height="100%"-->
<!--          ></video>-->
<!--          <div class="videoTitle">后置监控点</div>-->
<!--        </div>-->
      </div>
    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
// import Sidebar2 from '@/layout/components/Sidebar/SideBar2.vue'
import LeftBox from '@/views/station/LeftBox.vue'
import flvjs from "flv.js";
import { queryLast,getDict} from "@/api/station/station";
import { getSiteDay} from "@/api/history/site";
import { getVideoDict } from '@/api/video/video'
export default {
  name: 'manage',
  components: { HeaderBox,LeftBox },
  data() {
    return {
      date1:'',
      date2:'',
      showSearch:true,
      loading:false,
      active:'2',
      radio: 0,
      stationList:['西村站','马梪站'],
      flvPlayer: null,
      status:1,
      id:'',
      index1:0,
      index2:0,
      status1:0,
      status2:0,
      status3:0,
      isActive:true,
      isError:false,
      v1List:[{},{},{},{}],
      v2List:[{},{},{},{}],
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
      options1:[],
      options2:[],
      videoList:[],
      videoList2:[],
      deviceId:'',
      videoId:'',
      queryParams1: {
        siteId: null,
        deviceId: null,
        statTime:null,
        endTime:null,
        siteType:'1',
      },
      queryParams2:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'1',
      }
    //   // 视频播放
    //   playerOptions : {
    //     playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
    //     autoplay: false, //如果true,浏览器准备好时开始回放。
    //     muted: false, // 默认情况下将会消除任何音频。
    //     loop: false, // 导致视频一结束就重新开始。
    //     preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    //     language: 'zh-CN',
    //     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    //     techOrder: ['flash', 'html5'],      // 兼容顺序
    //     flash: {
    //
    //       hls: { withCredentials: false },
    //       swf: 'static/video-js.swf' // 引入静态文件swf
    //     },
    //     html5: { hls: { withCredentials: false } },
    //     sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
    //       type: 'rtmp/hls',
    //       src: 'rtmp://192.168.2.12:1935/live/test1'
    //     }],
    //     poster: "", //你的封面地址
    //     // width: document.documentElement.clientWidth,
    //     notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    //     controlBar: {
    //       timeDivider: true,
    //       durationDisplay: true,
    //       remainingTimeDisplay: false,
    //       fullscreenToggle: true  //全屏按钮
    //     }
    //   }
    }
  },
  watch: {
    $route(to, from) {
      let id = to.params.id;
      this.id = id;
      console.error('路由变化了',id)
      queryLast(this.id+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
      getDict(this.id+"").then(response=>{
        this.options1 = response.data;
        this.deviceId = response.data[0].value;
        this.queryParams1.deviceId=response.data[0].value;
        //console.log(this.queryParams1)
        getSiteDay(this.queryParams1).then(response => {
          let array = response.data;
          this.drawChart(array);
          this.drawChart2(array);
        });
      });
      getVideoDict(this.id+"","1").then(response => {
        //console.error(response.data);
        this.options2 = response.data;
        this.videoId = response.data[0].value;
        //this.queryParams2.deviceId=response.data[0].value;
        //console.error(response.data)
        this.videoList = response.data;
        this.videoList2 =response.data;
      });
    }
  },
  created() {
    this.queryStationList();
  },
  mounted() {
    this.id = this.$route.params.id
    // console.error(this.$route.params.id)
    // this.createFlv("videoElement1");
    // this.createFlv("videoElement2");
    queryLast(this.id+"").then(response => {
      let array = response.data;
      this.getDetailInfo(array);
    });
    getDict(this.id+"").then(response=>{
      this.options1 = response.data;
      this.deviceId = response.data[0].value;
      this.queryParams1.deviceId=response.data[0].value;
      //console.log(this.queryParams1)
      getSiteDay(this.queryParams1).then(response => {
        let obj = response.data;
        // let array = response.data;
        this.drawChart(obj.data,obj.date);
        this.drawChart2(obj.data,obj.date);
      });
    });
    getVideoDict(this.id+"","1").then(response => {
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
      if (this.date1){
        let v = this.date1[0]
        v = v.replace("00:00:00","").trim();
        this.queryParams1.startTime=v;
        v = this.date1[1];
        v = v.replace("00:00:00","").trim();
        this.queryParams1.endTime=v;
      }
      console.error(this.queryParams1)
      getSiteDay(this.queryParams1).then(response => {
        // console.log(response.data)
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
          top:'15%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
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
          top:'15%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
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
    getInfo(type,index){
      if (type===1){
        this.index1 = index;
        if (this.v1List[index].status){
          this.status1 = parseInt(this.v1List[index].status);
        }
      }else if (type === 2){
        this.index2 = index;
        if (this.v2List[index].status){
          this.status2 = parseInt(this.v2List[index].status);
        }
      }
    },
    getDetailInfo(array){
      for(let i=0;i<array.length;i++){
        let obj = array[i];
        let name = obj.deviceName;
        if (name.indexOf('1号电机') !== -1){
          this.v1List[0] = obj;
          if (obj.status){
            this.status1 = parseInt(obj.status);
          }
        }
        if (name.indexOf('2号电机') !== -1){
          this.$set(this.v1List,1,obj);
        }
        if (name.indexOf('3号电机') !== -1){
          this.$set(this.v1List,2,obj);
        }
        if (name.indexOf('4号电机') !== -1){
          this.$set(this.v1List,3,obj);
        }
        if (name.indexOf('1号清污机') !== -1){
          this.v2List[0] = obj;
          if (obj.status){
            this.status2 = parseInt(obj.status);
          }
        }
        if (name.indexOf('2号清污机') !== -1){
          this.$set(this.v2List,1,obj);
        }
        if (name.indexOf('3号清污机') !== -1){
          this.$set(this.v2List,2,obj);
        }
        if (name.indexOf('4号清污机') !== -1){
          this.$set(this.v2List,3,obj);
        }
        if (name.indexOf('皮带机') !== -1){
          this.v3 = obj;
          if (obj.status) {
            this.status3 = parseInt(obj.status);
          }
        }
      }
      this.index1=0;
      this.index2=0;
    },
    changeStation(value){
      console.log(value)
    },
    queryStationList(){
    },
    //创建flv视频实例
    createFlv(id) {
      let url="http://127.0.0.1:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2R3Zy90ZXN0LmZsdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPVAwM0g0UklUSzdFSTVaTzVSUUQ5JTJGMjAyNDA3MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzI1VDAxNTgxMVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSlFNRE5JTkZKSlZFczNSVWsxV2s4MVVsRkVPU0lzSW1WNGNDSTZNVGN5TVRreE5EazVNeXdpY0dGeVpXNTBJam9pYldsdWFXOWhaRzFwYmlKOS5CNHFwbWxTZzFhMUxZWV9pUGxyTXJ4VW9fOTh3SWQtNVRNUlVZNHRsV0JCVXFjRldWM19jcWNlUW1saVowbzBLUHA3ZUlONXFTVmluMldQNmYwbkpZZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPWQxZmU4YThlMDRiNWQ1NmM3OGFiZTU3YTdmNWFmYzIzYjQ0NmVmOWI0NGZmODM3NjE1ZGVjOTYyZTQwNTYwZTQ=";
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

.subBox {
  width: 100%;
  //height: 30px;
  float: left;
  padding: 5px 5px;
  border-radius: 5px;
  background-color: white;
}
.detailBox{
  color:#606266;
  width: 100%;
  //padding: 5px 5px;
  float: left;
}
.detailBox div{
  padding: 5px 5px;
}
.videoBox {
  width: 100%;
  //height: 500px;
  float: left;
  margin-top: 20px;
  background-color: white;
  //padding: 15px 10px;
}
.leftBox{
  width: calc( 50% - 30px );
  float: left;
  height: 51vh;
  margin-left: 20px;
  background-color: black;
  padding-top: 20px;
}
.rightBox{
  width: calc( 50% - 30px );
  float: left;
  height: 51vh;
  margin-left: 20px;
  background-color: black;
  padding-top: 20px;
}
.leftBox2{
  width: 48%;
  float: left;
  height: 570px;
  padding: 15px 15px;
  margin-top: -100px;
}
.rightBox2{
  width: 47.6%;
  float: left;
  height: 570px;
  padding: 15px 15px;
  margin-top: -100px;
}
.titleBox{
  font-weight: bold;
  margin-left: 10px;
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
  width: 97%;
  float: left;
  border-bottom: 1px solid #606266;
  margin-bottom: 10px;
  padding: 15px 10px;
}
.machineBox{
  width: calc( 32.8% - 20px);
  height: 100%;
  float: left;
  border-radius: 5px;
  background-color: white;
}
.tipBox{
  padding: 20px 20px 15px 20px;
  border-bottom:1px solid #D6E7F7;
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
  width: 70px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
  color: white;
}
.active3{
  background-color: #F67D7D;
  width: 70px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
  color: white;
}
.default2{
  background-color: #F2F2F2;
  width: 70px;
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
.videoTitle{
  color: white;
  width: 95%;
  left: 5%;
  top: -109%;
  position: relative;
}
.videoDetail{
  padding-top: 20px;
  width: 31%;
  height: 300px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: black;
}
</style>
