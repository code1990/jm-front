<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div class="" style="width: 28%; height: 100%; float: left;">
      <div class="machineBox"  v-if="checkType===1">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">水泵机组</div>
        </div>
        <div class="gateBox">
          <img src="../../assets/s_1.jpg" style="width: 100%;height: 100%;">
        </div>
        <div class="tipContent">
          <div class="tipButton">
            <el-button size="small" :class="{'active':index1===0,'default':index1!==0}" @click="getInfo(1,0)" v-show="checkType == 1 && check0==0 ">水泵机1</el-button>
            <el-button size="small" :class="{'active':index1===1,'default':index1!==1}" @click="getInfo(1,1)" v-show="checkType == 1 && check0==1 ">水泵机2</el-button>
            <el-button size="small" :class="{'active':index1===2,'default':index1!==2}" @click="getInfo(1,2)" v-show="checkType == 1 && check0==2 ">水泵机3</el-button>
            <el-button size="small" :class="{'active':index1===3,'default':index1!==3}" @click="getInfo(1,3)" v-show="checkType == 1 && check0==3 ">水泵机4</el-button>
          </div>
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status1===1,'defaultStatus':status1===0}">{{status1 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status1===1">
                <div class="active2" >启动</div>
                <div class="default2" @click="handleClose('停止',1,index1)">停止</div>
              </div>
              <div v-if="status1===0">
                <div class="default2" @click="handleClose('启动',1,index1)">启动</div>
                <div class="active3" >停止</div>
              </div>
            </div>
          </div>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">A相电流：{{v1List[index1].a1}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">B相电流：{{v1List[index1].a2}}(A)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">C相电流：{{v1List[index1].a3}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">电压：{{v1List[index1].v1}}(V)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">总功率：{{v1List[index1].kw}}(W)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">总电量：{{v1List[index1].kwh}}(kwh)</el-col>
        </div>
      </div>
      <div class="machineBox"  v-if="checkType===2">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">清污机组</div>
        </div>
        <div class="gateBox">
          <img src="../../assets/s_2.png" style="width: 100%;height: 100%;">
        </div>
        <div class="tipContent">
          <div class="tipButton">
            <el-button size="small" :class="{'active':index2===0,'default':index2!==0}" @click="getInfo(2,0)" v-show="checkType == 2 && check0==0 ">清污机1</el-button>
            <el-button size="small" :class="{'active':index2===1,'default':index2!==1}" @click="getInfo(2,1)" v-show="checkType == 2 && check0==1 ">清污机2</el-button>
            <el-button size="small" :class="{'active':index2===2,'default':index2!==2}" @click="getInfo(2,2)" v-show="checkType == 2 && check0==2 ">清污机3</el-button>
            <el-button size="small" :class="{'active':index2===3,'default':index2!==3}" @click="getInfo(2,3)" v-show="checkType == 2 && check0==3 ">清污机4</el-button>
          </div>
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status2===1,'defaultStatus':status2===0}">{{status2 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status2===1">
                <div class="active2" >启动</div>
                <div class="default2"  @click="handleClose('停止',2,index2)">停止</div>
              </div>
              <div v-if="status2===0">
                <div class="default2"  @click="handleClose('启动',2,index2)">启动</div>
                <div class="active3" >停止</div>
              </div>
            </div>
          </div>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">A相电流：{{v2List[index2].a1}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">B相电流：{{v2List[index2].a2}}(A)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">C相电流：{{v2List[index2].a3}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">电压：{{v2List[index2].v1}}(V)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">总功率：{{v2List[index2].kw}}(W)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">总电量：{{v2List[index2].kwh}}(kwh)</el-col>
        </div>
      </div>
      <div class="machineBox"   v-if="checkType===3">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">皮带机组</div>
        </div>
        <div class="gateBox">
          <img src="../../assets/s_3.png" style="width: 100%;height: 100%;">
        </div>
        <div class="tipContent">
          <div style="width: 100%;float: left;margin-left: 20px;margin-top: 15px;">
            <div style="float: left;">
              当前状态：<span :class="{'activeStatus':status3===1,'defaultStatus':status3===0}">{{status3 === 1?'启动':'停止'}}</span>
            </div>
            <div style="float: left;margin-left: 30px;">
              <div v-if="status3===1">
                <div class="active2" >启动</div>
                <div class="default2"  @click="handleClose('停止',3,0)">停止</div>
              </div>
              <div v-if="status3===0">
                <div class="default2"  @click="handleClose('启动',3,0)">启动</div>
                <div class="active3" >停止</div>
              </div>
            </div>
          </div>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">A相电流：{{v3.a1}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">B相电流：{{v3.a2}}(A)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">C相电流：{{v3.a3}}(A)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">电压：{{v3.v1}}(V)</el-col>
          <el-col :span="9" style="margin-left: 20px;margin-top: 11px;height: 20px;">总功率：{{v3.kw}}(W)</el-col>
          <el-col :span="9" style="margin-left: 15px;margin-top: 11px;height: 20px;">总电量：{{v3.kwh}}(kwh)</el-col>
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
<!--      <div class="machineBox" style="margin-left: 20px;width: 16%;">-->
<!--        <div class="tipBox">-->
<!--          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>-->
<!--          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">水位信息</div>-->
<!--        </div>-->
<!--        <div>-->
<!--          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;">当前雨量：{{v3.v4?v3.v4.toFixed(2):'0'}}(m)</el-col>-->
<!--          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;">上游水位：{{v3.v5?v3.v5.toFixed(2):'0'}}(M)</el-col>-->
<!--          <el-col :span="24" style="margin-left: 20px;margin-top: 11px;height: 20px;">下游水位：{{v3.v6}}(M)</el-col>-->
<!--          <el-col :span="24" style="margin-left: 20px;margin-top: 12px;height: 20px;">水位差：{{v3.v7}}(M)</el-col>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div  style="width: calc(72% - 20px); background-color: white; float: left; margin-left: 20px; border-radius: 5px; height: 89.4vh;"  v-loading="loading">
      <div class="tipBox">
        <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
        <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">监控数据</div>
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
          <el-form-item  prop="deviceId"  style="width: 200px;"></el-form-item>
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
      <div  style="overflow-y: auto;height: 70vh;">
        <div id="main1" v-show="check1" style="width: 100%;height: 200px;float: left;"></div>
        <div id="main2" v-show="check2" style="width: 100%;height: 200px;float: left;"></div>
        <div id="main3" v-show="check3" style="width: 100%;height: 200px;float: left;"></div>
        <div id="main4" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
        <div id="main5" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
        <div id="main6" v-show="check5" style="width: 100%;height: 200px;float: left;"></div>
      </div>
    </div>
    <div  style="width: 100%;float: left;margin-left: 0px;background-color: white;margin-top: 20px;border-radius: 5px;"  v-loading="loading">
      <div class="tipBox">
        <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
        <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">泵站监控</div>
      </div>

      <div class="videoBox">
        <div   style="width: 33%;float: left;">
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
          <div class="videoDetail"  >
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
        </div>
        <div class="controlBox" ><VideoControl :deviceSerial="deviceId2" @setValueName="setValueName"></VideoControl></div>

        <div   style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
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
          <div class="videoDetail"  >
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
        </div>
        <div class="controlBox" ><VideoControl :deviceSerial="deviceId3" @setValueName="setValueName"></VideoControl></div>
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
      <div class="videoBox">
        <div   style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
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
          <div class="videoDetail"  >
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
        <div class="controlBox" ><VideoControl :deviceSerial="deviceId4" @setValueName="setValueName"></VideoControl></div>
        <div   style="width: 33%;float: left;">
          <div class="searchInfo" style="width: 100%;height: 70px;padding: 20px 20px;">
            <div class="searchBox" style="background-color: white;width: 100%;border-bottom:1px solid #D6E7F7; ">
              <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
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
          <div class="videoDetail"  >
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
        <div class="controlBox" ><VideoControl :deviceSerial="deviceId5" @setValueName="setValueName"></VideoControl></div>
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
import { getCameraBack, getCameraList, listAlarm, sendCommand } from '@/api/history/alarm'
import { queryLast,getDict} from "@/api/station/station";
import { getSiteDay} from "@/api/history/site";
import { getVideoDict } from '@/api/video/video'
import VideoControl from '@/views/video/VideoControl.vue'
import * as echarts from 'echarts'
export default {
  name: 'manage',
  components: { VideoControl, HeaderBox,LeftBox },
  data() {
    return {
      date1:'',
      date2:'',
      showSearch:true,
      dialogVisible:false,
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
      vDate1:null,
      vDate2:null,
      vDate3:null,
      vDate4:null,
      vTitle1:null,
      vTitle2:null,
      vTitle3:null,
      vTitle4:null,
      vTitle5:null,
      deviceIdList:[],
      loading:false,
      active:'2',
      radio: 0,
      alarmList:[],
      stationList:[{"name":"水泵机1号","type":1,"value":"3f79a090a42c4eb4a1779892a46fc5ca"},{"name":"水泵机2号","type":1,"value":"7f28017c77b846da9130303004ab5e42"},{"name":"水泵机3号","type":1,"value":"74bd441aa7f44956926623007577ea71"},{"name":"水泵机4号","type":1,"value":"051635b9aa4c47af935f71fb62828f42"},{"name":"1号清污机","type":2,"value":"7e68efbe921a42d0821debad06a32da6"},{"name":"2号清污机","type":2,"value":"8a0cea1d39d4443899a739abd19cee3d"},{"name":"3号清污机","type":2,"value":"932a1813d0894555af2e02fc9c44e04a"},{"name":"4号清污机","type":2,"value":"9e4a3236ca4040d98e9b959347372a25"},{"name":"皮带机","type":3,"value":"94e5e2e891a34cdd94be3e6e18e26377"}],
      checkList: ["1","2","3","4","5"],
      flvPlayer: null,
      title:'水泵机组',
      status:1,
      id:'',
      index1:0,
      index2:0,
      status1:0,
      status2:0,
      status3:0,
      check0:0,
      checkType:1,
      check1:true,
      check2:true,
      check3:true,
      check4:true,
      check5:true,
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
      },

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
      //console.error('路由变化了',id)
      queryLast(this.id+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
      this.deviceId = this.id+"";
      listAlarm(this.queryParams1).then(response => {
        this.alarmList = response.rows;
      });
      getDict(this.id+"").then(response=>{
        this.options1 = response.data;
        this.deviceId = response.data[0].value;
        this.queryParams1.deviceId=response.data[0].value;
        //console.log(this.queryParams1)
        getSiteDay(this.queryParams1).then(response => {
          let obj = response.data;
          this.loading=true;
          this.drawRightChart(obj);
          this.loading=false;
        });
      });
      // getVideoDict(this.id+"","1").then(response => {
      //   //console.error(response.data);
      //   this.options2 = response.data;
      //   this.videoId = response.data[0].value;
      //   //this.queryParams2.deviceId=response.data[0].value;
      //   //console.error(response.data)
      //   this.videoList = response.data;
      //   this.videoList2 =response.data;
      // });
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
        this.drawRightChart(obj);
      });
      //this.queryParams1.siteType=null;
      listAlarm(this.queryParams1).then(response => {
        this.alarmList = response.rows;
      });
    });
    // getVideoDict(this.id+"","1").then(response => {
    //   this.options2 = response.data;
    //   this.videoId = response.data[0].value;
    //   //this.queryParams2.deviceId=response.data[0].value;
    //   //console.error(response.data)
    //   this.videoList = response.data;
    //   this.videoList2 =response.data;
    // });
    getCameraList(this.id,"6").then(response => {
      let array = response.data;
      this.webrtcPlay(this.flvPlayer2,'videoElement11',array[0].url);
      this.webrtcPlay(this.flvPlayer3,'videoElement12',array[1].url);
      this.webrtcPlay(this.flvPlayer4,'videoElement21',array[2].url);
      this.webrtcPlay(this.flvPlayer5,'videoElement22',array[3].url);
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
      //console.log(response.data)
    });
  },
  activated() {
    //console.error(this.$route.params.id)
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
    handleClose(title,index,index2) {
      this.$confirm('此操作将'+title+'该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass:'del-model',
        type: 'warning'
      }).then(() => {
        sendCommand(this.deviceId,index2,'1');
        this.$message({
          type: 'success',
          message: '该设备已经'+title+'!'
        });
        if (index === 1 ){
          if (this.status1){
            this.status1=0;
          }else{
            this.status1=1;
          }
        }else if (index === 2){
          if (this.status2){
            this.status2=0;
          }else{
            this.status2=1;
          }
        }else {
          if (this.status3){
            this.status3=0;
          }else{
            this.status3=1;
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     console.log(this.status1)
      //     if (this.status1){
      //       this.status1 = 0;
      //     }else {
      //       this.status1 = 1;
      //     }
      //     //done();
      //   })
      //   .catch(_ => {});
    },
    drawRightChart(obj){
      this.drawChart(obj.data,obj.date);
      this.drawChart2('main2','内河水位','内河水位(mm)',obj.data[4],obj.date,'#96D379');
      this.drawChart2('main3','外河水位','外河水位(mm)',obj.data[5],obj.date,'#FBCF5A');
      this.drawChart2('main4','雨量信息','瞬时雨量(mm)',obj.data[6],obj.date,'#5674CD');
      this.drawChart2('main5','累计雨量','累计雨量(mm)',obj.data[7],obj.date,'#E62100');
      this.drawChart2('main6','开启时间','开启时间(小时)',obj.data[3],obj.date,'#41B682');
      // this.drawLineBar('main6',obj.data[3],obj.date);
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
    },
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
      //console.error(this.queryParams1)
      getSiteDay(this.queryParams1).then(response => {
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
      //console.log(value)
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
      this.deviceId = this.stationList[key].value;
      if (key<=3 && key>=0){
        this.checkType = 1;
        this.title = '水泵机组';
      }else if (key<=7 && key>=4){
        this.checkType = 2;
        this.title = '清污机组';
        key = key - 4;
      }else {
        this.checkType = 3;
        this.title = '皮带机组';
      }
      this.check0=key;
      this.getInfo(this.checkType,key);
      this.queryParams1.deviceId = this.deviceId;
      this.handleQuery1();
      //this.queryParams1.siteType=null;
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
  width: 100%;
  height: 60%;
  float: left;
  border-radius: 5px;
  background-color: white;
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
  cursor: pointer;
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
  cursor: pointer;
}
.default2{
  background-color: #F2F2F2;
  width: 70px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  float: left;
  border-radius: 3px;
  cursor: pointer;
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
  width: 98%;
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
