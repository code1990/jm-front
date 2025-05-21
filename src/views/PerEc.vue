<template>
  <div class="waterBox">
    <div class="leftBox">
      <div class="upBox">
        <div class="optionBox">
          <div class="titleBar"></div>
          <div class="titleBox">王杠子挡水闸</div>
        </div>
        <div class="swapBox">
          <el-button icon="el-icon-arrow-left" class="swapArrow" circle @click="swapImage"></el-button>
          <img src="../assets/sluice.png" style="float: left;">
          <el-button icon="el-icon-arrow-right" class="swapArrow" circle></el-button>
        </div>
        <div class="selectBox">
          <div style="float: left;width: 100%">
            <el-col :span="12">
              闸门
              <el-select v-model="value" placeholder="请选择闸门" style="width: 150px;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12" style="margin-top: 5px;">
              状态：<span style="color:#67C23A">运行中</span>
            </el-col>
          </div>
          <div style="float: left;width: 100%;margin-top: 15px;">
            <el-col :span="8" style="margin-top: 5px;">修改闸门状态<i class="el-icon-sunny"></i></el-col>
            <el-col :span="4"><el-button @click="changeDevice(1)">开启</el-button>  </el-col>
            <el-col :span="4"><el-button @click="changeDevice(1)">关闭</el-button></el-col>
            <el-col :span="4"><el-button @click="changeDevice(2)">急停</el-button></el-col>
          </div>
        </div>
      </div>
      <div class="midBox">
        <div class="">
          <div class="optionBox">
            <div class="titleBar"></div>
            <div class="titleBox">闸门信息</div>
          </div>
        </div>
        <div style="float: left;width: 100%;padding:  0 0 10px 10px;">
          <el-col :span="10">&nbsp;&nbsp;闸门高度：<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{h0}}</span>&nbsp;(cm)</el-col>
          <el-col :span="10">&nbsp;闸门限高：<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{h1}}</span>&nbsp;(cm)</el-col>
        </div>
      </div>
      <div class="downBox">
        <div style="width: 48%;height: 100%;float: left;">
          <div class="whiteBox" >
            <div class="">
              <div class="optionBox" style="width: 90%;">
                <div class="titleBar"></div>
                <div class="titleBox">水文信息</div>
              </div>
            </div>
          </div>
          <div class="whiteBox" >
            <el-col :span="24">&nbsp;&nbsp;&nbsp;闸后水位&nbsp;&nbsp;<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{waterObj.v1}}</span><span style="font-weight: bold">&nbsp;(cm)</span></el-col>
            <el-col :span="24"  style="margin-top: 10px;">&nbsp;&nbsp;&nbsp;闸前水位&nbsp;&nbsp;<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{waterObj.v2}}</span><span style="font-weight: bold">&nbsp;(cm)</span></el-col>
            <el-col :span="24"  style="margin-top: 10px;">&nbsp;&nbsp;&nbsp;瞬时流量&nbsp;&nbsp;<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{waterObj.v3}}</span><span style="font-weight: bold">&nbsp;(m³/s)</span></el-col>
            <el-col :span="24"  style="margin-top: 10px;">&nbsp;&nbsp;&nbsp;流速&nbsp;&nbsp;<span style="font-size: 18px;color: #409eff;font-weight: bold;">{{waterObj.v4}}</span><span style="font-weight: bold">&nbsp;(m³/h)</span></el-col>
            <el-col :span="24" style="margin-top: 10px;margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;警戒水位&nbsp;&nbsp;<el-input type="text" v-model="waterObj.v5" style="color: #F56C6C;height: 30px;width: 60px;"></el-input><span style="font-weight: bold">&nbsp;(cm)</span></el-col>
          </div>
          <div class="whiteBox" style="margin-top: 15px;">
            <div class="" style="background-color: white">
              <div class="optionBox" style="width: 90%;">
                <div class="titleBar"></div>
                <div class="titleBox">气象信息</div>
              </div>
            </div>
          </div>
          <div class="whiteBox">
            <div style="width: 60%;float: left;">
              <el-col :span="24"  >&nbsp;&nbsp;&nbsp;风速<span style="font-weight: bold;">&nbsp;&nbsp;东风1级</span></el-col>
              <el-col :span="24"  style="margin-top: 10px;">&nbsp;&nbsp;&nbsp;温度&nbsp;&nbsp;{{waterObj.v1}}<span style="font-weight: bold;">&nbsp;&nbsp;(℃)</span></el-col>
              <el-col :span="24"  style="margin-top: 10px;margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;湿度&nbsp;&nbsp;{{waterObj.v1}}<span style="font-weight: bold;">&nbsp;&nbsp;(RH)</span></el-col>
            </div>
            <div style="width: 40%;float: left;">
              <span style="font-size: 14px;">当前降雨量</span>
              <i class ="icon ">
                <img src="../assets/zhenyu.png" class="rainBox">
              </i>
              <span style="font-size: 14px;">&nbsp;0.0(mm)</span>

            </div>
          </div>
        </div>
        <div style="width: 48.4%;height: 100%;background-color: white;float: left;margin-left:15px;border-radius: 5px;">
          <div class="">
            <div class="optionBox" style="width: 90%;">
              <div class="titleBar"></div>
              <div class="titleBox">市电信息</div>
            </div>
          </div>
          <div>
            <el-col :span="24" >&nbsp;&nbsp;&nbsp;<span style="font-size: 16px;">A</span>相电流&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v1}}(A)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 18px;">B</span>相电流&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v2}}(A)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 16px;">C</span>相电流&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v3}}(A)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 13px;">N</span>相电流&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v4}}(A)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 16px;">A</span>相电压&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v5}}(V)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 18px;">B</span>相电压&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v6}}(V)</span></el-col>
            <el-col :span="24" style="margin-top: 20px;margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;<span style="font-size: 16px;">C</span>相电压&nbsp;&nbsp;<span style="font-weight: bold;">{{currentObj.v7}}(V)</span></el-col>
          </div>
        </div>
        <div style="width: 48.4%;height: 100%;background-color: white;float: left;margin-left:15px;border-radius: 5px;margin-top: 13px;text-align: center;padding: 5px 0;">
          <el-col :span="24"><span style="color: #409eff;font-size: 14px;">更新时间</span></el-col>
          <el-col :span="24"><span style="color: #409eff;font-size: 14px;">2021-09-22 16:30:18</span></el-col>
        </div>
      </div>
    </div>

    <div class="rightBox">
      <div class="optionBox">
        <div class="titleBar"></div>
        <div class="titleBox">视频监控</div>
      </div>
      <div class="videoBox">
        <video width="100%" height="98%" controls>
<!--          <source src="../../assets/test.mp4" type="video/mp4" >-->
          <source :src="url" type="video/mp4" >
        </video>
        <video
            id="videoElement1"
            ref="videoElement1"
            controls
            muted
            width="100%"
            height="98%"
            v-if="false"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from "flv.js";
// import url from '@assets/test.mp4';
export default {
  name: "PerEc",
  data() {
    return {
      radio: 0,
      stationList: [],
      flvPlayer: null,
      status: 1,
      options: [{
        value: '1',
        label: '闸门1'
      }, {
        value: '2',
        label: '闸门2'
      }, {
        value: '3',
        label: '闸门3'
      }, {
        value: '4',
        label: '闸门4'
      }, {
        value: '5',
        label: '闸门5'
      }, {
        value: '6',
        label: '闸门6'
      }, {
        value: '7',
        label: '闸门7'
      }
      ],
      value: '',
      h0:480,
      h1:490,
      waterObj:{
        v1:0.0,
        v2:0.0,
        v3:0.0,
        v4:0.0,
        v5:0.0,
      },
      currentObj:{
        v1:0.0,
        v2:0.0,
        v3:0.0,
        v4:0.0,
        v5:0.0,
        v6:0.0,
        v7:0.0,
      },
      weatherObj:{
        v1:0.0,
        v2:0.0,
        v3:0.0,
      },
      url:null,//require('../../assets/test.mp4'),
    };
  },
  created() {
    this.queryStationList();

  },
  mounted() {
    // this.createFlv("videoElement1");
  },
  methods: {
    changeDevice(value){
      console.log(1);
    },
    swapImage(){
      console.log(1)
    },
    queryStationList() {

    },
    //创建flv视频实例
    createFlv(id) {

      let url = "http://127.0.0.1:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2R3Zy90ZXN0LmZsdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPVAwM0g0UklUSzdFSTVaTzVSUUQ5JTJGMjAyNDA3MjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzI1VDAxNTgxMVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSlFNRE5JTkZKSlZFczNSVWsxV2s4MVVsRkVPU0lzSW1WNGNDSTZNVGN5TVRreE5EazVNeXdpY0dGeVpXNTBJam9pYldsdWFXOWhaRzFwYmlKOS5CNHFwbWxTZzFhMUxZWV9pUGxyTXJ4VW9fOTh3SWQtNVRNUlVZNHRsV0JCVXFjRldWM19jcWNlUW1saVowbzBLUHA3ZUlONXFTVmluMldQNmYwbkpZZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPWQxZmU4YThlMDRiNWQ1NmM3OGFiZTU3YTdmNWFmYzIzYjQ0NmVmOWI0NGZmODM3NjE1ZGVjOTYyZTQwNTYwZTQ=";
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
.waterBox {
  width: 100%;
  //height: 500px;
  float: left;
}

.leftBox {
  width: 30%;
  height: 100%;
  float: left;


}
.upBox{
  width: 100%;
  float: left;
  border-radius: 5px;
  background-color: white;
}
.midBox{
  width: 100%;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
  background-color: white;
}
.downBox{
  width: 100%;
  float: left;
  border-radius: 5px;
  margin-top: 15px;
}
.siteBox{
  width: 30%;
  height: 100%;
  float: left;
  background-color: white;
  border-radius: 5px;
}
.rightBox {
  width: 68%;
  height: 100%;
  margin-left: 2%;
  background-color: white;
  float: left;
  border-radius: 5px;
}

.titleBox {
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
  width: 95%;
  float: left;
  border-bottom: 1px solid #606266;
  margin-bottom: 10px;
  padding: 15px 10px;
}

.videoBox {
  width: 96%;
  margin-left: 2%;
  height: 795px;
  float: left;
  margin-top:-30px;
}

.selectBox{
  padding: 15px 15px;
  float: left;
  width: 100%;
}
.swapBox{
  float: left;
  margin-left: 5%;
  margin-top: 1%;
}
.swapArrow{
  border: none;
  background-color: #409eff;
  color: white;
  float: left;
  margin-top: 35px;
}
.whiteBox{
  float: left;
  background-color: white;
  width: 100%;
}

.rainBox{
  width: 30px;
  height: 30px;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
