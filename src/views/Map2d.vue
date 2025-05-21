<!--<template>-->
<!--  <div class="app-container">-->
<!--    <button style="position: absolute;z-index:999" @click="qx">点击</button>-->
<!--    <button style="position: absolute;margin-left:10%;z-index:999" @click="zs">展示</button>-->
<!--    &lt;!&ndash;template&ndash;&gt;-->
<!--    &lt;!&ndash; 弹框 &ndash;&gt;-->
<!--    <div ref="popup" class="popup" v-show="shopPopup">-->
<!--      <div class="info">-->
<!--        <ul>-->
<!--          <li>信息1：xxx</li>-->
<!--          <li>信息2：xxx</li>-->
<!--          <li>信息3：xxx</li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div id="map" class="map" ref="rootmap">-->

<!--    </div>-->


<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import ol from 'ol/ol.css'-->

<!--//添加坐标点-->
<!--import Feature from 'ol/Feature'-->
<!--//import Fill from 'ol/style/Fill';-->
<!--import Point from 'ol/geom/Point'-->
<!--import Style from 'ol/style/Style'-->
<!--import CircleStyle from 'ol/style/Icon'-->
<!--import Fill from 'ol/style/Fill'-->
<!--import { Stroke } from 'ol/style'-->

<!--import VectorLayer from 'ol/layer/Vector.js'-->
<!--import { Vector } from 'ol/source.js'-->
<!--import MultiPoint from 'ol/geom/MultiPoint.js'-->
<!--//import Point from "ol/geom/Point";//几何的点样式-->

<!--//添加多个点-->
<!--import VectorSource from 'ol/source/Vector'-->
<!--import { fromLonLat } from 'ol/proj'-->
<!--import { Icon, Text } from 'ol/style'-->

<!--import Map from 'ol/Map'-->
<!--import TileLayer from 'ol/layer/Tile'-->
<!--import WMTS from 'ol/source/WMTS'-->
<!--import WMTSTileGrid from 'ol/tilegrid/WMTS'-->
<!--import { get as getProjection } from 'ol/proj'-->
<!--import { getTopLeft, getWidth } from 'ol/extent'-->
<!--import View from 'ol/View'-->
<!--import ImageLayer from 'ol/layer/Image'-->
<!--import Static from 'ol/source/ImageStatic'-->
<!--//静态图片的路径-->
<!--import mapXWImg from '@/assets/u11.png'-->
<!--import mapXWImg1 from '@/assets/u11.png'-->
<!--import mapXWImg2 from '@/assets/u1_03.gif'-->

<!--//弹窗用到-->
<!--import { Overlay } from 'ol'-->

<!--export default {-->
<!--  name: 'OlMap',-->
<!--  props: ['tableData', 'targetPoint'],-->
<!--  data() {-->
<!--    return {-->
<!--      map1: null,-->
<!--      view: null,-->
<!--      vectorSource: null,-->
<!--      mousePositionControl: null,-->
<!--      /** webKey 来源于天地图的开发者密钥，个人开发者有访问限制（每天1万次），-->
<!--       * 上线项目应该使用客户的信息申请企业或政府，以解除访问限制 https://console.tianditu.gov.cn/api/traffic */-->
<!--      webKey: '67db37647052eb23e7b324f7af225727',-->
<!--      mapCenter: [118.88000, 36.09999], //底图初始中心点  118.11225, 35.41410    118.6504, 32.0143-->
<!--      projection: getProjection('EPSG:4326'),-->
<!--      pageMap: null,-->

<!--      wmtsLayer: null,-->
<!--      cvaLayer: null,-->
<!--      imageLayer: {},-->
<!--      //测试多点坐标-->
<!--      pointLayer: null,-->
<!--      featuresArr: [],-->
<!--      //控制弹出层-->
<!--      shopPopup: false,-->
<!--      popup: {}-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  activated() {-->
<!--  },-->
<!--  mounted() {-->

<!--    this.jz()-->

<!--  },-->
<!--  methods: {-->

<!--    /** 叠加图片图层 */-->
<!--    getImageLayer: function() {-->
<!--      let p = 0.0001 //图片的缩放尺寸，通过调整图片的加载尺寸和中心点位置，可以调整图片到合适的位置加载-->
<!--      /*let w = 1210, h = 1210; //图片的宽、高*/-->
<!--      let w = 12100 * 6.3, h = 12100 * 3.7-->
<!--      const imageExtent = [-->
<!--        this.mapCenter[0] - w * p / 2, this.mapCenter[1] - h * p / 2,-->
<!--        this.mapCenter[0] + w * p / 2, this.mapCenter[1] + h * p / 2-->
<!--      ]-->
<!--      return new ImageLayer({-->
<!--        className: 'image_css',-->
<!--        extent: imageExtent,-->
<!--        source: new Static({-->
<!--          url: mapXWImg2,-->
<!--          projection: this.projection,-->
<!--          imageExtent: imageExtent,-->
<!--          dragPan: false-->
<!--        })-->
<!--      })-->
<!--    },-->
<!--    //-->
<!--    qx: function() {-->

<!--      this.pageMap.removeLayer(this.imageLayer)-->

<!--    },-->
<!--    zs: function() {-->

<!--      this.imageLayer = this.getImageLayer()-->
<!--      this.imageLayer.on('change', function(event) {-->

<!--      })-->

<!--      this.pageMap.getLayers().insertAt(2, this.imageLayer)-->

<!--    },-->

<!--    jz: function() {-->
<!--      //alert("eeeeeeeeeeeeeeeeeeee1111111111")-->
<!--      const projectionExtent = this.projection.getExtent()-->
<!--      const size = getWidth(projectionExtent) / 256-->
<!--      const resolutions = new Array(19)-->
<!--      const matrixIds = new Array(19)-->
<!--      for (let z = 0; z < 19; ++z) {-->
<!--        // generate resolutions and matrixIds arrays for this WMTS-->
<!--        resolutions[z] = size / Math.pow(2, z)-->
<!--        matrixIds[z] = z-->
<!--      }-->

<!--      //影像图层-->
<!--      this.wmtsLayer = new TileLayer({-->
<!--        opacity: 1,-->
<!--        source: new WMTS({-->
<!--          attributions:-->
<!--            'Tiles © <a href="#"' +-->
<!--            ' target="_blank">skyocar</a>',-->
<!--          url: 'http://t{0-7}.tianditu.gov.cn/img_c/wmts?tk=' + this.webKey,-->
<!--          layer: 'img',-->
<!--          matrixSet: 'c',-->
<!--          format: 'image/png',-->
<!--          projection: this.projection,-->
<!--          tileGrid: new WMTSTileGrid({-->
<!--            origin: getTopLeft(projectionExtent),-->
<!--            resolutions: resolutions,-->
<!--            matrixIds: matrixIds-->
<!--          }),-->
<!--          style: 'default',-->
<!--          wrapX: true-->
<!--        })-->
<!--      })-->
<!--      // alert("eeeeeeeeeeeeeeeeeeee333333333333")-->
<!--      //这个是矢量标绘图层，标注底图中的各文字信息-->
<!--      this.cvaLayer = new TileLayer({-->
<!--        opacity: 0.7,-->
<!--        source: new WMTS({-->
<!--          url: 'http://t{0-7}.tianditu.gov.cn/cva_c/wmts?tk=' + this.webKey,-->
<!--          layer: 'cva',-->
<!--          matrixSet: 'c',-->
<!--          format: 'tiles',-->
<!--          projection: this.projection,-->
<!--          tileGrid: new WMTSTileGrid({-->
<!--            origin: getTopLeft(projectionExtent),-->
<!--            resolutions: resolutions,-->
<!--            matrixIds: matrixIds-->
<!--          }),-->
<!--          style: 'default',-->
<!--          wrapX: true-->
<!--        })-->
<!--      })-->

<!--      this.pageMap = new Map({-->
<!--        layers: [-->
<!--          this.wmtsLayer,-->
<!--          this.cvaLayer-->
<!--          //this.imageLayer,-->
<!--        ],-->
<!--        target: 'map',-->
<!--        view: new View({-->
<!--          center: this.mapCenter,-->
<!--          projection: this.projection,-->
<!--          zoom: 8-->
<!--        })-->
<!--      })-->

<!--      this.singleclick()-->
<!--      this.cs()-->
<!--      this.addOverlay()-->

<!--    },-->

<!--    //点击事件-->
<!--    singleclick() {-->
<!--      // 点击-->
<!--      this.pageMap.on('singleclick', (e) => {-->
<!--        // 判断是否点击在点上-->
<!--        let feature = this.pageMap.forEachFeatureAtPixel(-->
<!--          e.pixel,-->
<!--          (feature) => feature-->
<!--        )-->
<!--        console.log(feature)-->
<!--        if (feature) {-->
<!--          this.shopPopup = true-->
<!--          //alert("1111111111111111111111111111111111")-->
<!--          // 设置弹窗位置-->
<!--          let coordinates = feature.getGeometry().getCoordinates()-->
<!--          this.popup.setPosition(coordinates)-->
<!--        } else {-->
<!--          this.shopPopup = false-->
<!--        }-->
<!--      })-->
<!--    },-->

<!--    // 点击弹出层 script-->
<!--    addOverlay() {-->
<!--      // 创建Overlay-->
<!--      let elPopup = this.$refs.popup-->
<!--      this.popup = new Overlay({-->
<!--        element: elPopup,-->
<!--        positioning: 'bottom-center',-->
<!--        stopEvent: false,-->
<!--        offset: [0, -20]-->
<!--      })-->
<!--      this.pageMap.addOverlay(this.popup)-->
<!--    },-->

<!--    //测试-->
<!--    cs() {-->
<!--      // var back_data = [-->
<!--      //   {-->
<!--      //     'address': '五指山测试工地',-->
<!--      //     'cameraId': 'T204',-->
<!--      //     'lat': '18.77520',-->
<!--      //     'lon': '109.5170'-->
<!--      //   },-->
<!--      //   {-->
<!--      //     'address': '椰树第三工业城测试工地',-->
<!--      //     'cameraId': 'T206',-->
<!--      //     'lat': '19.9332',-->
<!--      //     'lon': '110.1424'-->
<!--      //   },-->
<!--      //   {-->
<!--      //     'address': '海南热带野生动物园测试工地',-->
<!--      //     'cameraId': 'T214',-->
<!--      //     'lat': '19.7688',-->
<!--      //     'lon': '110.2477'-->
<!--      //   },-->
<!--      //   {-->
<!--      //     'address': '白石岭测试工地',-->
<!--      //     'cameraId': 'T213',-->
<!--      //     'lat': '19.1607',-->
<!--      //     'lon': '110.3775'-->
<!--      //   },-->
<!--      //   {-->
<!--      //     'address': '海南大学测试工地',-->
<!--      //     'cameraId': 'T212',-->
<!--      //     'lat': '36.09999',-->
<!--      //     'lon': '118.88000'-->
<!--      //   }-->
<!--      //-->
<!--      // ]-->
<!--      //-->
<!--      // var new_cicy_data = []-->
<!--      // for (let i = 0; i < back_data.length; i++) {-->
<!--      //   new_cicy_data[i] = back_data[i]-->
<!--      //   back_data[i].ol = []-->
<!--      //   back_data[i].ol[0] = parseFloat(back_data[i].lon)-->
<!--      //   back_data[i].ol[1] = parseFloat(back_data[i].lat)-->
<!--      //   back_data[i].key = i-->
<!--      // }-->
<!--      //-->
<!--      // var xx = []-->
<!--      // for (let i = 0; i < new_cicy_data.length; i++) {-->
<!--      //   /* this.show_dian(new_cicy_data[i]);*/-->
<!--      //   let feature = new Feature({-->
<!--      //-->
<!--      //     geometry: new Point([new_cicy_data[i].ol[0], new_cicy_data[i].ol[1]])-->
<!--      //   })-->
<!--      //-->
<!--      //   feature.setStyle(-->
<!--      //     new Style({-->
<!--      //       image: new CircleStyle({-->
<!--      //         src: mapXWImg1   //图片路径-->
<!--      //       })-->
<!--      //     })-->
<!--      //   )-->
<!--      //   //console.log(feature)-->
<!--      //   xx.push(feature)-->
<!--      // }-->
<!--      //-->
<!--      // //-->
<!--      // let source = new Vector()-->
<!--      // source.addFeatures(xx)-->
<!--      // console.log(source.getFeatures())-->
<!--      // let layer = new VectorLayer()-->
<!--      // layer.setSource(source)-->
<!--      // /* this.pageMap.addLayer(layer)*/-->
<!--      // this.pageMap.getLayers().push(layer)-->

<!--    }-->

<!--  }-->

<!--}-->
<!--</script>-->
<!--<style lang="scss">-->

<!--.map {-->
<!--  width: 100%;-->
<!--  height: 800px;-->
<!--}-->

<!--@-webkit-keyframes rotation {-->
<!--  from {-->
<!--    -webkit-transform: rotate(0deg);-->
<!--  }-->
<!--  to {-->
<!--    -webkit-transform: rotate(360deg);-->
<!--  }-->
<!--}-->

<!--.image_css {-->
<!--  -webkit-transform: rotate(360deg);-->
<!--  animation: rotation 3s linear infinite;-->
<!--  -moz-animation: rotation 3s linear infinite;-->
<!--  -webkit-animation: rotation 3s linear infinite;-->
<!--  -o-animation: rotation 3s linear infinite;-->
<!--}-->


<!--.popup {-->
<!--  width: 200px;-->
<!--  background-color: white;-->
<!--  padding: 18px;-->
<!--  border-radius: 10px;-->
<!--  box-shadow: 0 0 15px rgb(177, 177, 177);-->

<!--  .info {-->
<!--    font-size: 14px;-->
<!--    text-align: left;-->

<!--    ul {-->
<!--      padding-left: 0;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
