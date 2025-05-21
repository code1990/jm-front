<template>
  <div>
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox :name="false"></HeaderBox>
    </el-header>
    <el-aside class="aside" style="width: 12%;">
      <LeftBox :active="active"></LeftBox>
    </el-aside>
      <el-main class="main">
        <div  id="mapDiv" style="width: 100%;height: 100%;float: left;margin-left: 0px;background-color: white;"  v-loading="loading">
          <div class="tipBox1">倒计时{{minute}}秒刷新</div>
          <div class="tipBox2">
            <div style="float: left;width: 100%;">
              <el-col :span="8" style="font-weight: bold;font-size: 12px;margin-top: 4px;">状态：</el-col>
              <el-col :span="8">下雨</el-col>
              <el-col :span="8" style="width: 25px;height: 5px;background-color: #1ECF68;margin-top: 10px;margin-left: 10px;"></el-col>
            </div>
            <div style="float: left;width: 100%">
              <el-col :span="8"></el-col>
              <el-col :span="8" style="margin-left: 40px;">正常</el-col>
              <el-col :span="8" style="width: 25px;height: 5px;background-color: #323232;margin-top: 10px;margin-left: 10px;"></el-col>
            </div>
          </div>
          <!--          <div style="width: 100%;height: 8%;border-radius: 5px;">-->
          <!--            <div style="float: left;width: 10%;height: 100%;background-color: red;z-index: 100;"></div>-->

          <!--          </div>-->
          <!--          <div class="tipBox2"></div>-->
          <!--          <div style="width: 100%;height: 92%;border-radius: 5px;">-->

          <!--          </div>-->
        </div>
      </el-main>
  </div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import jsonData from '../../assets/data.json';
import { query4 } from "@/api/rain/rain";
import LeftBox from '@/views/rain/LeftBox.vue'
export default {
  name: "Page-1",
  components: { LeftBox, HeaderBox },
  data() {
    return {
      //imageUrl: require('@/assets/images/avatar.jpg'),
      map:null,
      minute:60,
      loading:false,
      active:'4'
    }
  },
  mounted() {
    this.initMap();
    this.getTime();
    this.getInfo();
    //setTimeout(() => console.log("你好!"), 1000)
    this.loading = false;
  },

  methods: {
    getTime() {
      setInterval(() => {
        this.minute -= 1
        if (this.minute === 0){
          this.getInfo();
          this.minute = 60;
        }
        this.loading=false;
        //this.countDown()
      }, 1000)
    },
    getInfo(){
      this.loading = true;
      query4(null).then(response => {
        let array  = response.data;
        //console.log(array)
        let json_data = [];
        for (var i = 0; i < array.length; i++) {
            let obj = array[i];
            let arr = [];
            arr.push(obj.longitude);
            arr.push(obj.latitude);
            if(obj.v1>0){
              arr.push(require("@/assets/dw1.png"));
            }else{
              arr.push(require("@/assets/dw2.png"));
            }
            arr.push(i);
            arr.push(obj.siteName+"_"+obj.deviceName+" 雨量"+obj.v1+"mm");
            // arr.push(obj.l)
            json_data.push(arr);
        }
        this.drawMarker(json_data);
        //console.log(response)
        this.loading = false;
      });
    },
    //边界高亮及遮罩效果，arr是内部行政区边界线的geojson的坐标
    drawBoundaryMask(arr = []) {
      let T = window.T;
      //设置自定义窗格zindex层级，让它在底部层级
      // let polygonPane = this.map.createPane('polygonPane')
      // polygonPane.style.zIndex = 200
      // polygonPane.style.pointerEvents = 'none'
      //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
      const NW = { lng: 73.0, lat: 59.0 } //西北
      const NE = {lng: 136.0,  lat: 59.0 } //东北
      const SE = {lng: 136.0,  lat: 3.0 } //东南
      const SW = {lng: 73.0, lat: 3.0 } //西南
      let maskLatLngs = [NW, SW, SE, NE, NW]
      let points = []
      arr.forEach(item => {
        points.push({ lat: item[1], lng: item[0] })
      })
      maskLatLngs = maskLatLngs.concat(points)
      //maskLatLngs.push(NW) //最后再次添加西北角闭合图形
      this.polygonLayer = new T.Polygon(maskLatLngs, {
        color: 'transparent',
        fillColor: '#fff',
        fillOpacity: 1.4,
        weight:10,
        pane: 'polygonPane'
      });
      let bd = new T.Polygon(points, {
        color:  "#4DBC88",
        weight:  3,
        opacity:  1,
      });
      this.map.addOverLay(this.polygonLayer)
      this.map.addOverLay(bd)
    },
    drawMarker(json_data){
      //定义点的位置
      // let json_data = [
      //   [112.864622,22.352422, require("@/assets/dw2.png"), "1"],
      //   [113.139432,22.708148, require("@/assets/dw1.png"), "2"],
      //   [112.816329,22.537345, require("@/assets/dw2.png"), "3"],
      //   [113.056644,22.678273, require("@/assets/dw2.png"), "4"],
      //   [112.970407,22.197238, require("@/assets/dw2.png"), "5"],
      //   [112.870372,22.410171, require("@/assets/dw2.png"), "6"]
      // ];
      //let pointArray = new Array();
      for (let i = 0; i < json_data.length; i++) {
        let icon = new T.Icon({
          iconUrl: json_data[i][2],
          iconSize: new T.Point(19, 27),
          iconAnchor: new T.Point(10, 25)
        });
        let marker = new T.Marker(
          new T.LngLat(json_data[i][0], json_data[i][1]),
          {icon: icon}
        ); // 创建点
        marker.dataId = json_data[i][3];
        this.map.addOverLay(marker); //增加点
        let info = json_data[i][4];
        // 添加文字
        let label = new T.Label({
          text: `<b>${info}<b>`,
          position: marker.getLngLat(),
          offset: new T.Point(0, -15)
        });
        label.setZindex(999)
        label.setBorderLine(2);
        label.setBorderColor("#BDBDBD");
        label.setFontColor("green");
        label.setFontSize("10px");
        this.map.addOverLay(label);
        }
    },
    initMap() {
      let T = window.T;
      // let map;
      // let zoom = 14;
      // let lay;
      // let onlyMapLay;
      // //  定义卫星地图样式
      // // let imageURL =
      // //     "http://t0.tianditu.gov.cn/img_w/wmts?" +
      // //     "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      // //     "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=e29741f83fa69334779d3d1dfd33be16";
      // //创建自定义图层对象
      // lay = new T.TileLayer( {minZoom: 1, maxZoom: 18});
      // let config = {layers: [lay]};
      // const _this = this;
      //初始化地图对象
      this.map = new T.Map("mapDiv",{minZoom:9.6,maxZoom:10});
      this.map.centerAndZoom(new T.LngLat(112.616115,22.348144), 9.6);
      this.map.setMaxBounds(new T.LngLatBounds(new T.LngLat(112.616115,22.348144), new T.LngLat(112.616115,22.348144)));
      // this.map.addEventListener("click",e => {
      //   // openInfo是弹框内容，根据业务自行定义
      //   //this.openInfo(item, e.target);
      //   console.log(e.target)
      // });
      // var lo = new T.Geolocation();
      // var fn = function (e) {
      //   if (this.getStatus() == 0){
      //     //this.map.centerAndZoom(e.lnglat, 15)
      //     alert("获取定位坐标："+e.lnglat.lat + "," + e.lnglat.lng)
      //     var marker = new T.Marker(e.lnglat);
      //     this.map.addOverLay(marker);
      //
      //   }
      //   if(this.getStatus() == 1){
      //     //this.map.centerAndZoom(e.lnglat, e.level)
      //     alert("获取定位坐标："+e.lnglat.lat + "," + e.lnglat.lng)
      //     var marker = new T.Marker(e.lnglat);
      //     this.map.addOverLay(marker);
      //   }
      // }
      // lo.getCurrentPosition(fn);
      //this.drawBoundaryMask([[112.616115,22.348144],[113.76724,22.795602],[113.83623,22.024727],[112.332251,22.06332]])
      //必须是闭合的图形
      this.drawBoundaryMask(jsonData)
      // //定义点的位置
      // let json_data = [
      //   [112.864622,22.352422, require("@/assets/dw2.png"), "1"],
      //   [113.139432,22.708148, require("@/assets/dw1.png"), "2"],
      //   [112.816329,22.537345, require("@/assets/dw2.png"), "3"],
      //   [113.056644,22.678273, require("@/assets/dw2.png"), "4"],
      //   [112.970407,22.197238, require("@/assets/dw2.png"), "5"],
      //   [112.870372,22.410171, require("@/assets/dw2.png"), "6"]
      // ];
      // let pointArray = new Array();
      // for (let i = 0; i < json_data.length; i++) {
      //   let icon = new T.Icon({
      //     iconUrl: json_data[i][2],
      //     iconSize: new T.Point(19, 27),
      //     iconAnchor: new T.Point(10, 25)
      //   });
      //   let marker = new T.Marker(
      //     new T.LngLat(json_data[i][0], json_data[i][1]),
      //     {icon: icon}
      //   ); // 创建点
      //   marker.dataId = json_data[i][3];
      //   this.map.addOverLay(marker); //增加点
      //   // 添加文字
      //   let label = new T.Label({
      //     text: `<b>西村站 0mm<b>`,
      //     position: marker.getLngLat(),
      //     offset: new T.Point(0, -15)
      //   });
      //   label.setZindex(999)
      //   label.setBorderLine(2);
      //   label.setBorderColor("#BDBDBD");
      //   label.setFontColor("green");
      //   label.setFontSize("10px");
      //   this.map.addOverLay(label);
      //   pointArray[i] = new T.LngLat(json_data[i][0], json_data[i][1]);
        //marker.addEventListener("click", attribute);
      // }
    }
  }
}
</script>


<style scoped>
.tipBox2{
  width: 150px;
  height: 70px;
  background-color: white;
  position: absolute;
  border-radius: 5px;
  border:solid 2px #82BBDF;
  right: 50px;
  top: 40px;
  padding: 10px 10px;
  z-index: 9999;
  font-size: 14px;
}
.tipBox1{
  width: 150px;
  height: 30px;
  background-color: white;
  position: absolute;
  border-radius: 5px;
  left: 50px;
  top: 40px;
  z-index: 9999;
  font-size: 12px;
  padding: 10px 10px;
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
  width: 88%;
}
</style>
