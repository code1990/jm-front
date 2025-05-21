<template>
  <div class="Map">
    <div id="container"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 10,
      model: {
        lng: '',
        lat: '',
        address: ''
      },
      map: null,
      searchLocationValue: '',
      local: null
    }
  },
  methods: {

    /**
     * 初始化地图
     */
    initMap() {
      // 创建Map实例 注意要和上面写的div的id名一样
      this.map = new BMap.Map("container");

      // 初始化地图,设置初始化位置，及地图级别
      var initPoint=new BMap.Point(113.090319,22.591391);
      this.map.centerAndZoom(initPoint, 12);
      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true);

      // 创建标注
      this.map.addOverlay(new BMap.Marker(initPoint));

      const _this = this;
      //添加地图点击事件
      this.map.addEventListener('click', function(e) {

        console.log('点击位置经纬度：' + e.point.lng + ',' + e.point.lat);
        _this.center.lng = e.point.lng;
        _this.center.lat = e.point.lat;
        //清除之前的标记
        _this.map.clearOverlays();
        // 创建点标记
        var point = new BMap.Point(_this.center.lng, _this.center.lat);
        //获取位置信息
        var geocoder = new BMap.Geocoder();
        geocoder.getLocation(point, function(geocoderResult, LocationOptions) {
          //清除之前的标记
          _this.map.clearOverlays()
          _this.map.addControl(new BMap.NavigationControl());
          var marker = new BMap.Marker(point);
          // 创建标注
          _this.map.addOverlay(marker);
          //地址定位成功
          var address = geocoderResult.address;
          console.log("所处地址", address)
        });

      });



    },
    /**
     * 获取自己的位置
     */
    fixedPosition() {
      const _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          _this.map.addOverlay(mk);
          _this.map.panTo(r.point);
          _this.center.lng = r.point.lng;
          _this.center.lat = r.point.lat;

          var city_name = r.address.province + r.address.city;
          console.log("当前位置--》", city_name);
          console.log("当前位置经纬度--》", r.point.lng,r.point.lat);
        } else {
          console.log('获取失败');
        }
      });
    },
    /**
     * 地图搜索
     */
    searchLocation() {

      this.local = new BMap.LocalSearch(this.map, {
        renderOptions: {
          map: this.map
        },
        onSearchComplete: this.searchCallback //设置回调函数

      });
      this.local.search(this.searchLocationValue); //设置搜索参数

    },
    /**
     * 搜索结果的回调函数
     */
    searchCallback() {
      var point = this.local.getResults().getPoi(0).point;
      //获取第一个智能搜索的结果
      console.log("当前位置的经纬度",point.lng, point.lat);
      this.model.lat=point.lat;
      this.model.lng=point.lng;

    },
    /**
     * 导航
     */
    navigation(){
      if(this.center.lng==0||this.center.lat==0){
        alert("请先获取您的位置")
        return
      }

      //出发地
      var p1 = new BMap.Point(this.center.lng, this.center.lat);
      //目的地
      var p2 = new BMap.Point(this.model.lng, this.model.lat);

      var driving = new BMap.DrivingRoute(this.map, {
        renderOptions: {
          map: this.map,
          autoViewport: true
        }
      });
      driving.search(p1, p2);
    }

  },


  mounted() {
    //初始化地图
    this.initMap();

  },


}
</script>

<style scoped>
#l-map {
  height: 360px;
  width: 100%;
}

#r-result {
  width: 100%;
}

.Map {
  //position: fixed;
  width: 61%;
  height: 82.5vh;
  float: left;
  margin-left: 15px;
  border-radius: 5px;
}

#container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
}


</style>

