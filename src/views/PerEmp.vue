<template>
  <div class="stationBox">
    <div class="subBox">
      <div class="optionBox">
        <span style="margin-right: 30px;color:#606266;margin-left: 5px; ">请选择设备</span>
        <el-radio-group v-model="radio" @change="changeStation(radio)">
          <el-radio :label="0" >泵04</el-radio>
          <el-radio :label="1" >泵10</el-radio>
        </el-radio-group>
      </div>
      <div class="detailBox">
        <el-col :span="5"><div class="grid-content bg-purple">瞬时流量：{{stationList[radio].flow}}(m³/h)</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">A相电压：{{stationList[radio].vol1}}V</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">B相电压：{{stationList[radio].vol2}}V</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">C相电压：{{stationList[radio].vol3}}V</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">累计流量：{{stationList[radio].totalFlow}}m³</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">总有功电能：{{stationList[radio].watt}}(kW/h)</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">A相电流：{{stationList[radio].current1}}A</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">B相电流：{{stationList[radio].current2}}A</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">C相电流：{{stationList[radio].current3}}A</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">水泵开关：<span style="background-color: #409EFF;color:white;">{{stationList[radio].status?'开启':'关闭'}}</span></div></el-col>
      </div>
    </div>
    <div class="videoBox">
      <div class="optionBox">
        <div class="titleBar"></div>
        <div class="titleBox">视频监控</div>
      </div>
      <div class="leftBox2">
        <video width="100%" height="98%" controls autoplay loop>
          <source src="" type="video/mp4" >
        </video>
      </div>
      <div class="rightBox2">
        <video width="100%" height="98%" controls autoplay loop>
          <source src="" type="video/mp4" >
        </video>
      </div>
      <div class="leftBox" v-if="false">
        <video
            id="videoElement1"
            ref="videoElement1"
            controls
            muted
            width="100%"
            height="100%"
            v-if="false"
        ></video>
      </div>
      <div class="rightBox" v-if="false">
        <video
            id="videoElement2"
            ref="videoElement2"
            controls
            muted
            width="100%"
            height="100%"
            v-if="false"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
// import DepMana from "@/components/sys/basic/DepMana.vue";
import flvjs from "flv.js";


export default {
  name: "PerEmp",
  // components: {DepMana},
  data() {
    return {
      radio: 0,
      stationList:[],
      flvPlayer: null,
      status:1,
    };
  },
  created() {
    this.queryStationList();
  },
  mounted() {
    // this.createFlv("videoElement1");
    // this.createFlv("videoElement2");
  },
  methods:{
    changeStation(value){
      debugger
      console.log(value)
    },
    queryStationList(){
      this.stationList = [
        {
          "flow":0.0,
          "current1":0.0,
          "current2":0.0,
          "current3":0.0,
          "totalFlow":0.0,
          "watt":0.0,
          "vol1":0.0,
          "vol2":0.0,
          "vol3":0.0,
          "status":1
        },{
          "flow":0.5,
          "current1":0.5,
          "current2":0.5,
          "current3":0.5,
          "totalFlow":0.5,
          "watt":0.5,
          "vol1":0.5,
          "vol2":0.5,
          "vol3":0.5,
          "status":0
        }
      ]
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
    }
  }
}
</script>

<style scoped>
.stationBox{
  padding: 3px 3px;
  width: 100%;
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
  width: 100.7%;
  //height: 500px;
  float: left;
  margin-top: 20px;
  background-color: white;
  //padding: 15px 10px;
}
.leftBox{
  width: 49%;
  float: left;
  height: 570px;
}
.rightBox{
  width: 48%;
  float: left;
  height: 570px;
  margin-left: 2%;
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
>>> .el-main{
  overflow-x: hidden;
}
</style>
