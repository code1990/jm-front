<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div  style="width: 100%;float: left;margin-left: 0px;background-color: white;"  v-loading="loading">
<!--      <div class="tipBox">-->
<!--        <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>-->
<!--        <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">视频总览</div>-->
<!--      </div>-->
      <div class="videoBox" style="padding-top: 0px;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">泵站视频</div>
        </div>

        <div  v-show="check1" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate1"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(0)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement11"
              ref="videoElement11"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle1 }}</div>

          </div>

        </div>
        <div class="controlBox" v-show="check1"><VideoControl :deviceSerial="deviceId1" @setValueName="setValueName"></VideoControl></div>
        <div  v-show="check2" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams2" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate2"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(1)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement12"
              ref="videoElement12"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle2 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="check2"><VideoControl :deviceSerial="deviceId2" @setValueName="setValueName"></VideoControl></div>
        <div  v-show="check3" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams3" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate3"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(2)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement13"
              ref="videoElement13"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle3 }}</div>

          </div>
        </div>
        <div class="controlBox" v-show="check3"><VideoControl :deviceSerial="deviceId3" @setValueName="setValueName"></VideoControl></div>
      </div>

      <div class="videoBox"  style="padding-top: 0px;" v-show="check10">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">闸门视频</div>
        </div>
        <div  v-show="check4" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams11" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate4"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(3)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement21"
              ref="videoElement21"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle4 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="check4"><VideoControl :deviceSerial="deviceId4"></VideoControl></div>
        <div  v-show="check5" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams12" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate5"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(4)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
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
        <div class="controlBox" v-show="check5"><VideoControl :deviceSerial="deviceId5"></VideoControl></div>
        <div  v-show="check6" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams13" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate6"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(5)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement23"
              ref="videoElement23"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle6 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="check6"><VideoControl :deviceSerial="deviceId6" @setValueName="setValueName"></VideoControl></div>
      </div>
      <div class="videoBox" v-show="check11" style="padding-top: 0px;">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">枪机视频</div>
        </div>
        <div  v-show="check7" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams11" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate7"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(6)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement31"
              ref="videoElement31"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle7 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="false"><VideoControl :deviceSerial="deviceId7" @setValueName="setValueName"></VideoControl></div>
        <div  v-show="check8" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams12" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate8"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(7)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement32"
              ref="videoElement32"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle8 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="false"><VideoControl :deviceSerial="deviceId8" @setValueName="setValueName"></VideoControl></div>
        <div  v-show="check9" style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams13" ref="queryForm" size="small" :inline="true" v-show="showSearch">
                <el-form-item label="" prop="repairTime"  style="">
                  <el-date-picker
                    v-model="vDate9"
                    type="daterange"
                    range-separator="至"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="回放开始日期"
                    end-placeholder="回放结束日期"  size="small"  @change="handleQuery2" style="width: 260px;margin-left: 20px;"></el-date-picker>
                  <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 10px;" @click="handleQuery2(8)">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="videoDetail">
            <video
              id="videoElement33"
              ref="videoElement33"
              controls
              muted
              poster="../../assets/video_conver.png"
              width="100%"
              height="100%"
            ></video>
            <div class="videoTitle">{{ vTitle9 }}</div>
          </div>
        </div>
        <div class="controlBox" v-show="false"><VideoControl :deviceSerial="deviceId9" @setValueName="setValueName"></VideoControl></div>
      </div>
    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import LeftBox from '@/views/video/LeftBox.vue'
import VideoControl from '@/views/video/VideoControl.vue'
import { getVideoDict } from '@/api/video/video'
import flvjs from "flv.js";
import { getCameraAll, getCameraBack, getCameraList } from '@/api/history/alarm'
export default {
  name: 'manage',
  components: { HeaderBox,LeftBox,VideoControl },
  data() {
    return {
      flvPlayer1:null,
      flvPlayer2:null,
      flvPlayer3:null,
      flvPlayer4:null,
      flvPlayer5:null,
      flvPlayer6:null,
      flvPlayer7:null,
      flvPlayer8:null,
      flvPlayer9:null,
      flvPlayer11:null,
      flvPlayer21:null,
      flvPlayer31:null,
      flvPlayer41:null,
      flvPlayer51:null,
      flvPlayer61:null,
      flvPlayer71:null,
      flvPlayer81:null,
      flvPlayer91:null,
      deviceId1:null,
      deviceId2:null,
      deviceId3:null,
      deviceId4:null,
      deviceId5:null,
      deviceId6:null,
      deviceId7:null,
      deviceId8:null,
      deviceId9:null,
      vTitle1:null,
      vTitle2:null,
      vTitle3:null,
      vTitle4:null,
      vTitle5:null,
      vTitle6:null,
      vTitle7:null,
      vTitle8:null,
      vTitle9:null,
      vDate1:null,
      vDate2:null,
      vDate3:null,
      vDate4:null,
      vDate5:null,
      vDate6:null,
      vDate7:null,
      vDate8:null,
      vDate9:null,
      options:[],
      showSearch:true,
      loading:false,
      active:'9',
      videoList:[],
      videoList2:[],
      options2:[],
      videoId:'',
      date1:'',
      date2:'',
      date3:'',
      date11:'',
      date12:'',
      date13:'',
      check1:true,
      check2:false,
      check3:false,
      check4:false,
      check5:false,
      check6:false,
      check7:false,
      check8:false,
      check9:false,
      check10:false,
      check11:false,
      deviceIdList:[],
      count:0,
      count3:0,
      flvPlayer: null,
      queryParams1:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'1',
      },
      queryParams11:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
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
      },
      queryParams12:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'1',
      },
      queryParams3:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'1',
      },
      queryParams13:{
        pageNum: 1,
        pageSize: 100,
        siteId: null,
        deviceId: null,
        startTime:null,
        endTime:null,
        siteType:'1',
      }
    }
  },
  mounted() {
    // for (let i = 0; i < this.videoList.length; i++) {
    //   this.createFlv("videoElement"+i);
    // }
    // getVideoDict(this.id+"","0").then(response => {
    //   console.error(response.data);
    //   this.options2 = response.data;
    //   this.videoId = response.data[0].value;
    //   //this.queryParams2.deviceId=response.data[0].value;
    //   //console.error(response.data)
    //   this.videoList = response.data;
    //   this.videoList2 =response.data;
    // });
    getCameraAll().then(response => {
      //console.log(response.data)
      let array = response.data;
      this.webrtcPlay(this.flvPlayer1,'videoElement11',array[0].url);
      this.webrtcPlay(this.flvPlayer2,'videoElement12',array[1].url);
      this.webrtcPlay(this.flvPlayer3,'videoElement13',array[2].url);
      this.webrtcPlay(this.flvPlayer4,'videoElement21',array[3].url);
      this.webrtcPlay(this.flvPlayer5,'videoElement22',array[4].url);
      this.webrtcPlay(this.flvPlayer6,'videoElement23',array[5].url);
      this.webrtcPlay(this.flvPlayer7,'videoElement31',array[6].url);
      this.webrtcPlay(this.flvPlayer8,'videoElement32',array[7].url);
      this.webrtcPlay(this.flvPlayer9,'videoElement33',array[8].url);
      this.deviceId1 = array[0].deviceId;
      this.deviceId2 = array[1].deviceId;
      this.deviceId3 = array[2].deviceId;
      this.deviceId4 = array[3].deviceId;
      this.deviceId5 = array[4].deviceId;
      this.deviceId6 = array[5].deviceId;
      this.deviceId7 = array[6].deviceId;
      this.deviceId8 = array[7].deviceId;
      this.deviceId9 = array[8].deviceId;
      this.vTitle1 = array[0].deviceName;
      this.vTitle2 = array[1].deviceName;
      this.vTitle3 = array[2].deviceName;
      this.vTitle4 = array[3].deviceName;
      this.vTitle5 = array[4].deviceName;
      this.vTitle6 = array[5].deviceName;
      this.vTitle7 = array[6].deviceName;
      this.vTitle8 = array[7].deviceName;
      this.vTitle9 = array[8].deviceName;
      this.deviceIdList.push(array[0].deviceId);
      this.deviceIdList.push(array[1].deviceId);
      this.deviceIdList.push(array[2].deviceId);
      this.deviceIdList.push(array[3].deviceId);
      this.deviceIdList.push(array[4].deviceId);
      this.deviceIdList.push(array[5].deviceId);
      this.deviceIdList.push(array[6].deviceId);
      this.deviceIdList.push(array[7].deviceId);
      this.deviceIdList.push(array[8].deviceId);
    });
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
      }else if (index === 3){
        if (this.vDate4){
          let v = this.vDate4[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate4[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      } else if (index === 4){
        if (this.vDate5){
          let v = this.vDate5[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate5[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      } else if (index === 5){
        if (this.vDate6){
          let v = this.vDate6[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate6[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      } else if (index === 6){
        if (this.vDate7){
          let v = this.vDate7[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate7[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      } else if (index === 7){
        if (this.vDate8){
          let v = this.vDate8[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate8[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }else {
        if (this.vDate9){
          let v = this.vDate9[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams2.startTime=v;
          v = this.vDate9[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams2.endTime=v;
        }
      }

      if (this.deviceIdList[index]){
        this.queryParams2.deviceId = this.deviceIdList[index];
        getCameraBack(this.queryParams2.deviceId,this.queryParams2.startTime,this.queryParams2.endTime).then(response=>{
          let data = response.data;
          console.error(data);
          if(index === 0){
            this.webrtcPlay(this.flvPlayer11,'videoElement11',data.url);
          }
          else if(index === 1){
            this.webrtcPlay(this.flvPlayer21,'videoElement21',data.url);
          }
          else if(index === 2){
            this.webrtcPlay(this.flvPlayer31,'videoElement31',data.url);
          }
          else if(index === 3){
            this.webrtcPlay(this.flvPlayer41,'videoElement21',data.url);
          }
          else if(index === 4){
            this.webrtcPlay(this.flvPlayer51,'videoElement22',data.url);
          }
          else if(index === 5){
            this.webrtcPlay(this.flvPlayer61,'videoElement23',data.url);
          }
          else if(index === 6){
            this.webrtcPlay(this.flvPlayer71,'videoElement31',data.url);
          }
          else if(index === 7){
            this.webrtcPlay(this.flvPlayer81,'videoElement32',data.url);
          }
          else if(index === 8){
            this.webrtcPlay(this.flvPlayer91,'videoElement33',data.url);
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
      //   console.log(array3)
      //   this.videoList =array3;
      // }
    },
    getChildMsg(key){
      // let array = key.split("_");
      // let checked = parseInt(array[0]);
      // let index = parseInt(array[1]);
      //console.log(index);
      console.error(key)
      //let count3 = 0;
      if (key === "1_1"){
        this.check1 = true;
      }else  if (key === "1_2"){
        this.check2 = true;
      }else  if (key === "1_3"){
        this.check3 = true;
      }else  if (key === "1_4"){
        this.check4 = true;
        this.count++;
      }else  if (key === "1_5"){
        this.check5 = true;
        this.count++;
      }else  if (key === "1_6"){
        this.check6 = true;
        this.count++;
      }else  if (key === "1_7"){
        this.check7 = true;
        this.count3++;
      }else  if (key === "1_8"){
        this.check8 = true;
        this.count3++;
      }else  if (key === "1_9"){
        this.check9 = true;
        this.count3++;
      }
      if (key === "0_1"){
        this.check1 = false;
      }else  if (key === "0_2"){
        this.check2 = false;
      }else  if (key === "0_3"){
        this.check3 = false;
      }else  if (key === "0_4"){
        this.check4 = false;
        this.count--;
      }else  if (key === "0_5"){
        this.check5 = false;
        this.count--;
      }else  if (key === "0_6"){
        this.check6 = false;
        this.count--;
      }else  if (key === "0_7"){
        this.check7 = false;
        this.count3--;
      }else  if (key === "0_8"){
        this.check8 = false;
        this.count3--;
      }else  if (key === "0_9"){
        this.check9 = false;
        this.count3--;
      }
      // console.log(this.count)
      if (this.count === 0){
        this.check10 = false;
      }else {
        this.check10 = true;
      }
      if (this.count3 === 0){
        this.check11 = false;
      }else {
        this.check11 = true;
      }
      //console.error(key)
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
  padding: 30px 20px 15px 20px;
  border-bottom:1px solid #D6E7F7;
}
.videoBox{
  padding-top: 20px;
  width: 100%;
  float: left;
  //height: calc( 100% - 70px );
  //overflow-y: auto;
}
.videoDetail{
  padding-top: 20px;
  width: 96%;
  height: 300px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: black;
}

.videoTitle{
  color: white;
  width: 95%;
  left: 5%;
  top: -109%;
  position: relative;
}

::v-deep .el-form-item__label{
  font-weight: normal;
}
.searchInfo{

}
.controlBox{
  width: 200px;
  height: 300px;
  margin-top: 70px;
  float: left;
  padding: 50px 30px;
}

</style>
