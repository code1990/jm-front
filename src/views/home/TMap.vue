<template>
  <div class="Map">
    <div id="container" class="mapComponent" ></div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import jsonData from '../../assets/data.json';
import { getLast } from "@/api/point/point";
export default {
  components: {},
  data() {
    return {
      map: null,
      address: null,
      lat_long: null,
      isShowMarkerInfo:true,
      currentInfo:null,
      pointList1:[{
        lon:112.950285,
        lat:22.731617,
        company:'1',
        name:'1',
        address:'1',
      },{
        lon:113.023155,
        lat:22.578197,
        name:'1',
        address:'1',
      }],
      pointList2:[{
        lon:113.161854,
        lat:22.678273,
        name:'1',
        address:'1',
      },{
        lon:113.22337,
        lat:22.542151,
        name:'1',
        address:'1',
      }],
      pointList3:[{
        lon:113.230844,
        lat:22.682008,
        name:'1',
        address:'1',
      },{
        lon:112.616115,
        lat:22.348144,
        name:'1',
        address:'1',
      }],
      marker1:require('../../assets/u_03.png'),
      marker2:require('../../assets/u_07.png'),
      marker3:require('../../assets/u_11.png'),
    };
  },
  mounted() {
    this.initwxMap();
    // this.initMarker(this.pointList1,this.marker1);
    // this.initMarker(this.pointList2,this.marker2);
    // this.initMarker(this.pointList3,this.marker3);
    getLast().then(response=>{
      console.log(response.data);
      let array = response.data;
      let imageArray = [];
      for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        if (obj.deviceType === '1'){
          imageArray.push(this.marker1)
        }
        if (obj.deviceType === '2'){
          imageArray.push(this.marker2)
        }
        if (obj.deviceType === '3'){
          imageArray.push(this.marker3)
        }
      }
      this.initMarker(array,imageArray);
    });
    // let obj1 ={
    //   fillOpacity:0.001
    // };
    // let obj2 = {
    //   lineWidth:3,
    //   fillOpacity:0.001
    // };
    // let obj3 = {
    //   lineWidth:0.6,
    //   fillOpacity:0.5,
    // };
    // this.getBound(obj1);
    // this.getBound(obj2);
    // this.getBound(obj3);
  },
  methods: {
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
      this.map.addEventListener("click", function (e) {
        var lng = e.lnglat.getLng();
        var lat = e.lnglat.getLat();
        // 打印到控制台
        console.log("点击坐标：经度 =", lng, "纬度 =", lat);
      })
    },
    // getBound(styleOption){
    //   let that = this;
    //   axios.get('../../../440700.gson').then(res => {
    //     console.error(res);
    //     var featureCollection = res.data.features
    //     console.error(featureCollection);
    //     let lines=that.getLinesFromGeojson(featureCollection);
    //     console.error(lines);
    //     // let styleOption = {
    //     //   lineWidth:3,
    //     //   fillOpacity:0.001
    //     // };
    //     //外围蒙层
    //     var points1 = [];
    //     //蒙层四角中国四角做标外部图层
    //     points1.push(new T.LngLat(73.0, 59.0));
    //     points1.push(new T.LngLat(73.0, 3.0)) ;
    //     points1.push(new T.LngLat(136.0, 3.0)) ;
    //     points1.push(new T.LngLat(136.0, 59.0));
    //     points1.push(new T.LngLat(73.0, 59.0));//创建面对象
    //
    //     console.log(points1.length)
    //     lines.forEach((coors)=>{
    //       let polygon=that.createPolygon(coors,styleOption,points1);
    //       that.map.addOverLay(polygon);
    //     })
    //     // console.log(countries)
    //     // var sc = countries.find(item => item.properties.name == '四川省')
    //     // console.log(sc)
    //     // var bounds = sc.geometry.coordinates[0][0]
    //     // console.log(bounds)
    //     // this.drawLine(bounds)
    //   })
    // },
    getLinesFromGeojson(featureCollection){
      console.error("2222",featureCollection)
      let lines=[];
      let geometries=featureCollection[0].geometry.coordinates;
      console.error("3333",geometries)
      let type=featureCollection[0].geometry.type;
      for(let i=0;i<geometries.length;i++){
        let geometry=geometries[i]

        console.error("1111111",geometry);
        if(type==="LineString"){
          let line=geometry.coordinates
          lines.push(line)
        }
        if(type==="MultiLineString"||type === "MultiPolygon"){
          let subLines=geometry
          console.error("1111111",geometry);
          lines=lines.concat(subLines)
        }
      }
      return lines
    },
    createPolygon(coors,option,points1) {
        let points = [];
        coors.forEach((lonlat) => {
          points.push(new T.LngLat(lonlat[0], lonlat[1]));
        })
        return new T.Polygon([points,points1], {
          color: option.lineColor || "#4DBC88",
          weight: option.lineWidth || 3,
          opacity: option.lineOpacity || 0.5,
          fillColor: option.fillColor || "#282C34",
          fillOpacity: option.fillOpacity || 1
        });
      },
      initMarker(array,imgArray){
      let that = this;
      for (let index = 0; index < array.length; index++) {
        let point = '';
        let icon = '';
        const item = array[index];

        // 1.创建坐标，通常是调取接口获得经纬度
        point = new T.LngLat(item?.longitude, item?.latitude);
        // 2.创建覆盖使用的图标
        icon = new T.Icon({
          iconUrl: imgArray[index],
          iconSize: new T.Point(36, 36), // 图标可视区域的大小
          iconAnchor: new T.Point(30, 30), // 图标的定位锚点
        });
        // 3. 创建在该坐标上的一个图像标注实例
        let marker = new T.Marker(point, { icon });
        marker.id = item.id; // 添加marker的id
        let name = item.name;
        let address =item.address;
        let lnglatArr = [item?.longitude, item?.latitude];
        let winHtml =
          `<div style="width:240px">`+
          `<div style="height:3px;width:100%;background:#129939;position:absolute;top:0;right:0;"></div>`+
          `<div style="padding:5px 5px;"><span style="width:70px;font-size:20px;font-weight:bold;">${item.deviceName}</span>`+
          `<div style="float:right;color:white;background-color:#4BA2F0;border-radius:10px 0px 0px 10px;padding:5px 5px;position: absolute;top: 20px;right: 0px;">编号：${item.id}</div></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;color:#44BA89">流速：</span><span style="line-height: 24px;font-size:14px;color:#44BA89">${item.v1.toFixed(2)}（m/s） <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;color:#44BA89">水位：</span><span style="line-height: 24px;font-size:14px;color:#44BA89">${item.v2.toFixed(2)}（m） <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;color:#44BA89">瞬时流量：</span><span style="line-height: 24px;font-size:14px;color:#44BA89">${item.v3.toFixed(2)}（m/h） <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">累计流量：</span><span style="line-height: 24px;font-size:14px">${item.v4.toFixed(2)}（m） <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">灌溉面积：</span><span style="line-height: 24px;font-size:14px">${item.v7}亩 <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">村庄数量：</span><span style="line-height: 24px;font-size:14px">${item.v8} <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">经度：</span><span style="line-height: 24px;font-size:14px">${item.longitude}  <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">纬度：</span><span style="line-height: 24px;font-size:14px">${item.latitude} <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">站点：</span><span style="line-height: 24px;font-size:14px">${item.siteName} <span></div>`+
          `<div style="padding:5px 5px;"><span style="width:100px;text-align:right;white-space: nowrap;color:#333333;font-size:14px;font-family:PingFang SC-Medium,PingFang SC;line-height: 24px;">采集时间：</span><span style="line-height: 24px;font-size:14px">${item.collectTime} <span></div>`;
        let markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true });
        //const that = this;
        marker.addEventListener('click',  ()=>{

          //
          marker.openInfoWindow(markerInfoWin);
          that.isShowMarkerInfo = true;
          that.currentInfo = item;
          // that.fromParams.projectLocation = current.lonlat.replace(",","_");
          // that.fromParams.projectName = current.name;
          //console.log(that.currentInfo)
          // console.log('添加监听', item);
          //此处巨坑，天地图api每个marker如果没有点击右上角X关掉，点击下一个marker时，地图上是存在两个html需要进行判断
          let index = 0;
          if (document.getElementsByClassName("numberInfoBtn").length == 1) {
            index = 0;
          } else if (document.getElementsByClassName("numberInfoBtn").length == 2) {
            index = 1;
          }
          if (document.getElementsByClassName("numberInfoBtn")[index]){
            document.getElementsByClassName("numberInfoBtn")[index].addEventListener('click', () => {
              that.isShowMarkerInfo = false;
            });
          }
        });
        // 4.将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
        this.map.addOverLay(marker);

        // 添加文字
        let label = new T.Label({
          text: `<b>${index+1}<b>`,
          position: marker.getLngLat(),
          offset: new T.Point(-10, -10)
        });
        label.setZindex(999)
        this.map.addOverLay(label);

        // 鼠标点击marker弹出自定义的信息窗体
        marker.addEventListener('click', e => {
          // openInfo是弹框内容，根据业务自行定义
          //this.openInfo(item, e.target);
        });
      }
    },
    // 初始化天地图 不能开代理 否则初始化异常
    initwxMap() {
      // vue项目需要先声明 T = window.T
      let T = window.T;
      this.map = new T.Map('container'); // div的id
      // 传参中心点经纬度，以及放大程度，最小1，最大18
      this.map.centerAndZoom(new T.LngLat(112.616115,22.348144), 9.6);
      // var cp = new T.CoordinatePickup(this.map, {
      //   callback: this.getLngLat
      // });
      // cp.addEvent();
      //鹰眼
      // let miniMap = new T.Control.OverviewMap({
      //   isOpen: true,
      //   size: new T.Point(150, 150)
      // });
      // this.map.addControl(miniMap);
      this.drawBoundaryMask(jsonData)
    },
    getLngLat(lnglat) {
      let T = window.T;
      const x = lnglat.lng.toFixed(6);
      const y = lnglat.lat.toFixed(6);
      this.map.clearOverLays(); // 清空原来的标注点
      let point = new T.LngLat(x, y);
      let marker = new T.Marker(point);
      this.map.addOverLay(marker); // 添加标注点
      this.getGeocoderFun(x, y);
    },
    // 根据经纬度获取地址
    async getGeocoderFun(lon, lat) {
      let T = window.T;
      let geocoder = new T.Geocoder();
      geocoder.getLocation(new T.LngLat(lon, lat), (result) => {
        this.address = result.getAddress();
        this.lat_long = lon + ',' + lat;
      });
    },
   drawLine(lines) {// 绘制边界线
    let style = {
      color: '#81a5b9',
      weight: 3,
      opacity: 1,
      lineStyle: 'solid', // 实线;dashed虚线
      fillColor: 'transprent',
      fillOpacity: 0 // 透明度
    }
    let points = []
    lines.forEach(line => { // lines是边界经纬度组成的数组
      var point = new T.LngLat(line[0], line[1])
      points.push(point)
    })
    // console.log(points)
    var poly = new T.Polygon(points, style)
    map.addOverLay(poly)
  },
  }
};
</script>

<style scoped>
.Map {
  //position: fixed;
  width: calc( 100% - 620px );
  height: calc( 100vh - 100px);
  float: left;
  margin-left: 20px;
  border-radius: 5px;
}

#container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
}
.tdt-label {
  line-height: 20px;
  padding: 0 4px;
}
.tdt-overlay-pane {
  z-index: 620;
}
>>> .tdt-infowindow{
  border-radius: 5px;
  border: 2px solid #4F8FC6;
}



>>> .tdt-infowindow{
  background-color: white;
  box-shadow:none;
}

>>> .tdt-infowindow-content-wrapper{
  box-shadow:none;
}

>>> .tdt-infowindow-tip-container{
  box-shadow:none;
}
>>> .tdt-infowindow-tip{
  box-shadow: none;
}
</style>

