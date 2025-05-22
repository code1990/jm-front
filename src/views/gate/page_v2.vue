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
              <el-button size="small" :class="{'active':index1===0,'default':index1!==0}" @click="getInfo(0)" v-show="check0===0">闸门1</el-button>
              <el-button size="small" :class="{'active':index1===1,'default':index1!==1}" @click="getInfo(1)" v-show="check0===1">闸门2</el-button>
            </div>
            <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
              <div style="float: left;">
                当前状态：<span :class="{'activeStatus':status1===1||status1===2,'defaultStatus':status1===0}">{{status1 === 1?'上升':(status1===2?'下降':'停止')}}</span>
              </div>
              <div style="float: left;margin-left: 30px;">
                <div v-if="status1===1">
                  <div class="active2">上升</div>
                  <div class="default2" @click="handleClose('下降',1,2)">下降</div>
                  <div class="default2" @click="handleClose('停止',1,0)">停止</div>
                </div>
                <div v-if="status1===2">
                  <div class="default2" @click="handleClose('上升',1,1)">上升</div>
                  <div class="active2">下降</div>
                  <div class="default2" @click="handleClose('停止',1,0)">停止</div>
                </div>
                <div v-if="status1===0">
                  <div class="default2" @click="handleClose('上升',1,1)">上升</div>
                  <div class="default2" @click="handleClose('下降',1,2)">下降</div>
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
                prop="alarmType"
                label="报警内容"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div style="width: calc( 72% - 20px);background-color: white;float: left;margin-left: 20px;border-start-end-radius: 5px;border-start-start-radius: 5px;height: 55vh">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">监测视频</div>
        </div>
        <div style="calc( 72% - 20px);background-color: white;float: left;padding: 20px;height: 48vh;width: 100%;">
          <div class="videoBox">
            <video controls
                   autoplay
                   muted
                   style="width: 100%; height: 100%; object-fit: fill"
                   id="myVideoFlv" />

          </div>
        </div>
      </div>
      <div style="width: calc( 72% - 20px);background-color: white;float: left;margin-left: 20px;border-end-end-radius: 5px;border-end-start-radius: 5px;height: 34.4vh">
        <div class="videoDetail2"  >
          <video
            id="videoElement11"
            ref="videoElement11"
            controls
            muted
            poster="../../assets/video_conver.png"
            width="100%"
            height="100%"
          ></video>
          <div class="videoTitle">{{ vTitle2 }}</div>
        </div>
        <div class="videoDetail2"  >
          <video
            id="videoElement12"
            ref="videoElement12"
            controls
            muted
            poster="../../assets/video_conver.png"
            width="100%"
            height="100%"
          ></video>
          <div class="videoTitle">{{ vTitle3 }}</div>
        </div>
        <div class="videoDetail2"  >
          <video
            id="videoElement21"
            ref="videoElement22"
            controls
            muted
            poster="../../assets/video_conver.png"
            width="100%"
            height="100%"
          ></video>
          <div class="videoTitle">{{ vTitle4 }}</div>
        </div>
        <div class="videoDetail2" v-if="false" >
          <video
            id="videoElement22"
            ref="videoElement22"
            controls
            muted
            poster="../../assets/video_conver.png"
            width="100%"
            height="100%"
          ></video>
          <div class="videoTitle">{{ vTitle5 }}</div>
        </div>
      </div>
      <div style="width: 100%;background-color: white;float: left;margin-top: 20px;border-radius: 5px;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">监测数据</div>
        </div>
        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 120px;border-bottom:1px solid #D6E7F7; ">
          <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="监测要素" prop="deviceId"  style="margin-left: 20px;">
              <el-checkbox-group v-model="checkList" @change="handleChange">
                <el-checkbox label="1">耗能信息</el-checkbox>
                <el-checkbox label="2">内河水位</el-checkbox>
                <el-checkbox label="3">外河水位</el-checkbox>
                <el-checkbox label="4">雨量信息</el-checkbox>
                <el-checkbox label="5">开启时间</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="deviceId"  style="width: 40%;">
            </el-form-item>
            <!--            <el-form-item label="设备名称" prop="deviceId"  style="margin-left: 20px;">-->
            <!--              <el-select v-model="queryParams1.deviceId" placeholder="请选择设备" size="small" style="float: left;margin-left: 20px;" @change="handleQuery1">-->
            <!--                <el-option-->
            <!--                  v-for="item in options1"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value">-->
            <!--                </el-option>-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->
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
              <el-button type="warning"  plain icon="el-icon-download" size="small" style="float: left;margin-left: 20px;"
                         @click="handleExport" v-if="false"
              >导出
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="overflow-y: auto;overflow-x: hidden;">
          <div v-show="check1" id="main1" style="width: 100%;height: 200px;float: left"></div>
          <div v-show="check2" id="main2" style="width: 100%;height: 200px;float: left;"></div>
          <div v-show="check3" id="main3" style="width: 100%;height: 200px;float: left;"></div>
          <div v-show="check4" id="main4" style="width: 100%;height: 200px;float: left;"></div>
          <div v-show="check4" id="main5" style="width: 100%;height: 200px;float: left;"></div>
          <div v-show="check5" id="main6" style="width: 100%;height: 200px;float: left;"></div>
        </div>


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
import { getCamera, getCameraBack, getCameraList, listAlarm, sendCommand } from '@/api/history/alarm'
import { getSiteDay } from '@/api/history/site'
import { getVideoDict } from '@/api/video/video'
import VideoControl from '@/views/video/VideoControl.vue'
import * as echarts from 'echarts'
// import LivePlayer from '@liveqing/liveplayer'
// import EZUIKitJs from '@/views/gate/EZUIKitJs.vue'

// import EZUIKit from 'ezuikit-js';

export default {
  name: 'manage',
  components: { VideoControl, HeaderBox,LeftBox },
  data() {
    return {
      flvPlayer1: null,
      flvPlayer2: null,
      flvPlayer3: null,
      flvPlayer4: null,
      flvPlayer5: null,
      flvPlayer21: null,
      flvPlayer31: null,
      flvPlayer41: null,
      flvPlayer51: null,
      deviceId1:null,
      deviceId2:null,
      deviceId3:null,
      deviceId4:null,
      deviceId5:null,
      show1:false,
      webrtcUrl: "",
      date1:'',
      date2:'',
      vDate1:null,
      vDate2:null,
      vDate3:null,
      vDate4:null,
      vTitle1:null,
      vTitle2:null,
      vTitle3:null,
      vTitle4:null,
      vTitle5:null,
      checkList: ["1","2","3","4","5"],
      gateList:[{"name":"闸门1","value":"2d6d051613bb4762ac822b05f1a1337b"},{"name":"闸门2","value":"893f70b39c2541d89f06edad12bcc863"}],
      check0:0,
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
      check1:true,
      check2:true,
      check3:true,
      check4:true,
      check5:true,
      videoList:[],
      videoList2:[],
      deviceIdList:[],
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
        startTime:null,
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
      //this.queryParams1.siteId = this.id+"";
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
          let obj = response.data;
          this.drawRightChart(obj);
        });
      });
      // getVideoDict(this.id+"","2").then(response => {
      //   this.options2 = response.data;
      //   this.videoId = response.data[0].value;
      //   //this.queryParams2.deviceId=response.data[0].value;
      //   //console.error(response.data)
      //   this.videoList = response.data;
      //   this.videoList2 =response.data;
      // });
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
    console.log(this.id)
    queryLast(this.id+"").then(response => {
      let array = response.data;
      this.getDetailInfo(array);
      this.loading = false;
    });
    this.queryParams1.siteId = this.id+"";

    getDict(this.id+"").then(response=>{
      this.options1 = response.data;
      this.deviceId = response.data[0].value;
      this.queryParams1.deviceId=response.data[0].value;
      getSiteDay(this.queryParams1).then(response => {
        let obj = response.data;
        // let array = response.data;
        this.drawRightChart(obj);
      });
      //this.queryParams1.siteType=null;
      listAlarm(this.queryParams1).then(response => {
        this.alarmList = response.rows;
      });
      let info = this.id+"_"+this.deviceId;
      //console.log(info)
      getCamera(info).then(response => {
        //console.log(response.data);
        this.vTitle1 = response.data.deviceName;
        let url = response.data.url;
        this.webrtcPlay(this.flvPlayer1,'myVideoFlv',url);
      });
    });
    // getVideoDict(this.id+"","2").then(response => {
    //   this.options2 = response.data;
    //   this.videoId = response.data[0].value;
    //   //this.queryParams2.deviceId=response.data[0].value;
    //   //console.error(response.data)
    //   this.videoList = response.data;
    //   this.videoList2 =response.data;
    // });
    // let token = 'at.ag4kfxlucl9x3h684l22ntyk39h86y64-41y1sh64op-0pi9w5d-ugiu2j8tk';
    // let url ='ezopen://open.ys7.com/AH0137737/1.hd.live';
    // this.videoPlayer(token,url);
    //this.webrtcPlay();
    getCameraList(this.id,"5").then(response => {
      let array = response.data;
      // this.webrtcPlay(this.flvPlayer2,'videoElement11',array[0].url);
      // this.webrtcPlay(this.flvPlayer3,'videoElement12',array[1].url);
      // this.webrtcPlay(this.flvPlayer4,'videoElement21',array[2].url);
      // this.webrtcPlay(this.flvPlayer5,'videoElement22',array[3].url);
      this.deviceId2 = array[0].deviceId;
      this.deviceId3 = array[1].deviceId;
      this.deviceId4 = array[2].deviceId;
      this.deviceId5 = array[3].deviceId;
      this.vTitle2 = array[0].deviceName;
      this.vTitle3 = array[1].deviceName;
      this.vTitle4 = array[2].deviceName;
      this.vTitle5 = array[3].deviceName;
      this.deviceIdList.push(array[0].deviceId);
      this.deviceIdList.push(array[1].deviceId);
      this.deviceIdList.push(array[2].deviceId);
      this.deviceIdList.push(array[3].deviceId);
      console.log(response.data)
    });
  },
  activated() {
    console.error(this.$route.params.id)
  },
  beforeDestroy() {
    this.destoryVideo()
  },
  methods:{
    setValueName(data){
      console.error(data)
    },
    webrtcPlay(flvPlayer1,id,webrtcUrl){
      if (flvjs.isSupported()) {
        if (flvPlayer1) {
          flvPlayer1.pause()
          flvPlayer1.unload()
          flvPlayer1.detachMediaElement()
          flvPlayer1.destroy()
        }
        flvPlayer1 = flvjs.createPlayer(
          {
            type: 'flv',
            url: webrtcUrl,
            isLive: false,
            hasAudio: false,
          }
        )
          // {
          //   cors: true,  //是否跨域
          //   enableWorker: true,  //是否多线程工作
          //   anableStashBuffer: false,  //是否启用缓存
          //   stashInitialSize: 384,  //缓存大小(kb) 默认384kb
          //   autoCleanupSourceBuffer: true  //是否自动缓存
          // }
        flvPlayer1.attachMediaElement(document.getElementById(id))  // 在这里绑定元素
        flvPlayer1.load()
        flvPlayer1.play()
        //报错重连
        flvPlayer1.on(flvjs.Events.ERROR, (errType, errDetail) => {
          console.log('errType:', errType)
          console.log('errorDetail:', errDetail)
          if(flvPlayer1){
            this.destoryVideo(flvPlayer1)
            this.webrtcPlay(flvPlayer1)
          }
        })
      }
    },
    destoryVideo(flvPlayer1){
      if (flvPlayer1) {
        flvPlayer1.pause()
        flvPlayer1.unload()
        flvPlayer1.detachMediaElement()
        flvPlayer1.destroy()
        flvPlayer1 = null
      }
    },
    // videoPlayer: function(token, url) {
    //   //var domain = "http://127.0.0.1/js";
    //   var width = document.documentElement.clientWidth;
    //   var height = document.documentElement.clientWidth * 9 / 16;
    //   new EZUIKit.EZUIKitPlayer({
    //     id: 'ezuikit-player',
    //     width: width,
    //     height: height,
    //     template: "mobileLive",
    //     staticPath: "/ezuikit_static/v65",
    //     url: url,
    //     accessToken: token
    //   });
    // },
    handleClose(title,index,index2) {
      this.$confirm('此操作将'+title+'该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass:'del-model',
        type: 'warning'
      }).then(() => {
        sendCommand(this.deviceId,index2,'2');
        this.$message({
          type: 'success',
          message: '该设备已经'+title+'!'
        });
        if (index === 1 ){
          this.status1 = index2;
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });

    },
    drawRightChart(obj){
      this.drawChart(obj.data,obj.date);
      this.drawChart2('main2','内河水位','内河水位(mm)',obj.data[4],obj.date,'#96D379');
      this.drawChart2('main3','外河水位','外河水位(mm)',obj.data[5],obj.date,'#FBCF5A');
      this.drawChart2('main4','雨量信息','瞬时雨量(mm)',obj.data[6],obj.date,'#5674CD');
      this.drawChart2('main5','累计雨量','累计雨量(mm)',obj.data[7],obj.date,'#E62100');
      this.drawChart2('main6','开启时间','开启时间(小时)',obj.data[3],obj.date,'#41B682');
    },
    handleExport(){
      this.download('tool/rain/export', {
        ...this.queryParams1
      }, `month_${new Date().getTime()}.xlsx`)
    },
    handleChange(val){
      let array =val;
      for (let i = 1; i < 6; i++) {
        let flag = false;
        if (array.indexOf(''+i) !== -1){
          flag = true;
        }
        if (i === 1){
          this.check1 = flag;
        }
        if (i === 2){
          this.check2 = flag;
        }
        if (i === 3){
          this.check3 = flag;
        }
        if (i === 4){
          this.check4 = flag;
        }
        if (i === 5){
          this.check5 = flag;
        }
      }
      // for(let i=0;i<array.length;i++){
      //    let v = parseInt(array[i]);
      //
      // }
      // console.log(val)
    },
    resetQuery1(){
      this.date1=null;
      this.queryParams1.deviceId = this.deviceId;
      this.queryParams1.startTime = '';
      this.queryParams1.endTime = '';
      this.handleQuery1();
    },
    handleQuery1(){
      if (this.date1){
        if (this.date1){
          let v = this.date1[0]
          v = v.replace("00:00:00","").trim();
          this.queryParams1.startTime=v;
          v = this.date1[1];
          v = v.replace("00:00:00","").trim();
          this.queryParams1.endTime=v;
        }
      }
      // console.error(this.deviceId);
      // console.error(this.queryParams1);
      //this.queryParams1.deviceId = this.deviceId;
      getSiteDay(this.queryParams1).then(response => {
        console.error(response.data)
        let obj = response.data;
        this.drawRightChart(obj);
      });
    },
    resetQuery2(){
      this.date2=null;
      this.queryParams2.startTime='';
      this.queryParams2.endTime='';
      this.videoList =this.videoList2;
    },
    handleQuery2(index){
      if (index === 0){
        if (this.vDate1){
          let v = this.vDate1[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate1[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }else if (index === 1){
        if (this.vDate2){
          let v = this.vDate2[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate2[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }else if (index === 2){
        if (this.vDate3){
          let v = this.vDate3[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate3[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }else {
        if (this.vDate4){
          let v = this.vDate4[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate4[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }

      if (this.deviceIdList[index]){
        this.queryParams2.deviceId = this.deviceIdList[index];
        getCameraBack(this.queryParams2.deviceId,this.queryParams2.startTime,this.queryParams2.endTime).then(response=>{
          let data = response.data;
          console.error(data);
          if (index === 0){
            //this.show1=true;
            //回放的时间 还是当前时间 视频没有加水印
            this.webrtcPlay(this.flvPlayer21,'videoElement11',data.url);
          }else if(index === 1){
            this.webrtcPlay(this.flvPlayer31,'videoElement12',data.url);
          }else if(index === 2){
            this.webrtcPlay(this.flvPlayer41,'videoElement21',data.url);
          }else{
            this.webrtcPlay(this.flvPlayer51,'videoElement22',data.url);
          }

        });
      }

      // let id = this.queryParams2.deviceId;
      // if (this.queryParams2.deviceId){
      //   let array = this.videoList2;
      //   let array3 = [];
      //   for(let i =0;i<array.length;i++){
      //     let obj = array[i];
      //     if (obj.value === id){
      //       array3.push(obj);
      //     }
      //   }
      //   //console.log(array3)
      //   this.videoList =array3;
      // }
    },
    drawChart(array,date){
      echarts.dispose(document.getElementById('main1'));
      var chartDom = document.getElementById('main1');
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
          top:'20%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          name:'天',
          data: date
        },
        yAxis: {
          type: 'value',
          name:'耗能(a/v/kwh)',
          axisTick: {
            inside: true
          },
          scale: true
        },
        series: [
          {
            name: '电流',
            type: 'line',
            stack: 'Total',
            data: array[0]
          },
          {
            name: '电压',
            type: 'line',
            stack: 'Total',
            data: array[1]
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
    drawChart2(id,type,yTitle,array,date,color){
      echarts.dispose(document.getElementById(id));
      var chartDom = document.getElementById(id);
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
          data: [type]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'20%',
          containLabel: true
        },
        color:[color],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name:'天',
          data: date
        },
        yAxis: {
          type: 'value',
          name:yTitle
        },
        series: [
          {
            name: type,
            type: 'line',
            stack: 'Total',
            data: array
          },
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
        if (name.indexOf('1号工作闸') !== -1) {
          this.v1List[0] = obj;
          if (obj.status){
            this.status1 = parseInt(obj.status);
          }
        }
        if (name.indexOf('2号工作闸') !== -1) {
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
      this.check0=key;
      this.getInfo(key);
      this.deviceId = this.gateList[key].value;
      this.queryParams1.deviceId = this.deviceId;
      this.handleQuery1();
      // this.queryParams1.siteType=null;
      // this.queryParams1.siteId=null;
      listAlarm(this.queryParams1).then(response => {
        //console.log(this.queryParams1)
        this.alarmList = response.rows;
      });
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
  float: left;
  height: 102%;
}
.videoBox2{
  width: 100%;
  float: left;
  background-color: red;
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
  width: 98%;
  height: 300px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: black;
}
.videoDetail2{
  padding-top: 20px;
  width: 30.7%;
  height: 300px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: black;
}
.controlBox{
  width: 200px;
  height: 300px;
  margin-top: 70px;
  float: left;
  padding: 50px 30px;
}
</style>
