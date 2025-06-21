<template>
  <div class="leftBox">
    <div class="topBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">开启信息统计</div>
        <img :src="image2" class="rightImage" >
        <el-button size="mini" @click="dialogVisible = true" class="dateBox" style="background-color: #1F1F51;" v-if="false">时间</el-button>
        <el-button size="mini" @click="checkData(2)" class="dateBox" style="background-color:#212052;">详情</el-button>
        <div class="titleTip"></div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini">
          </el-date-picker>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getNewData()">确 定</el-button>
        </span>
        </el-dialog>

      </div>
      <div id="a" style="height:200px;width:60%;float: left;margin-top: 20px" ref="a"></div>
      <div id="aa" style="height:200px;width:38%;float: left;margin-top: 20px" ref="aa"></div>
    </div>
    <div class="midBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo" style="font-size: 16px;">水利设备信息</div>
        <img :src="image2" class="rightImage" >
        <el-button size="mini" @click="checkData(1)" class="dateBox" style="background-color:#020B44;">详情</el-button>
        <el-button size="mini" @click="checkDate(1)" class="dateBox" v-if="false">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div style="float: left;width: 100%;height: 100%;">
        <div class="infoBox1">
          <img :src="img1" class="imgTip">
          <el-col :span="18" class="tip1">管辖区域</el-col>
          <el-col :span="12" class="tip2">{{obj.v4}}(km2)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img2" class="imgTip">
          <el-col :span="18" class="tip1">泵站数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v5}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img3" class="imgTip">
          <el-col :span="18" class="tip1">拦河闸数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v6}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img4" class="imgTip">
          <el-col :span="18" class="tip1">测流点数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v7}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img5" class="imgTip">
          <el-col :span="18" class="tip1">清污机数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v8}}(个)</el-col>
        </div>
        <div class="infoBox1">
          <img :src="img6" class="imgTip">
          <el-col :span="18" class="tip1">皮带机数量</el-col>
          <el-col :span="12" class="tip2">{{obj.v9}}(个)</el-col>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo" style="font-size: 16px;">泵站功耗信息</div>
        <img :src="image2" class="rightImage">
        <el-button size="mini" @click="checkData(2)" class="dateBox" style="background-color:#020B44;">详情</el-button>
        <el-button size="mini" @click="checkDate(2)" class="dateBox" v-if="false">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div  class="contentBox" >
        <div class="optionBox">
          <el-radio-group v-model="index">
            <el-radio :label="0" style="color: white;">泵1</el-radio>
            <el-radio :label="1" style="color: white;" >泵2</el-radio>
            <el-radio :label="2" style="color: white;" >泵3</el-radio>
            <el-radio :label="3" style="color: white;" >泵4</el-radio>
          </el-radio-group>
        </div>
        <div class="detailBox">
          <el-col :span="12" style="padding: 5px 3px;"><div class="grid-content bg-purple">A相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="12" style="padding: 5px 3px;"><div class="grid-content bg-purple">A相电流：{{v1List[index].a1}}A</div></el-col>

          <el-col :span="12" style="padding: 5px 3px;"><div class="grid-content bg-purple">B相电压：{{v1List[index].v1}}V</div></el-col>
          <el-col :span="12" style="padding: 5px 3px;"><div class="grid-content bg-purple">B相电流：{{v1List[index].a2}}A</div></el-col>

          <el-col :span="12" style="padding: 8px 3px;"><div class="grid-content bg-purple">C相电压：{{v1List[index].v3}}V</div></el-col>
          <el-col :span="12" style="padding: 8px 3px;"><div class="grid-content bg-purple">C相电流：{{v1List[index].a3}}A</div></el-col>
          <el-col :span="12" style="padding: 8px 3px;"> <div class="grid-content bg-purple">瞬时流量：{{v1List[index].v8}}(m³/h)</div></el-col>
          <el-col :span="12" style="padding: 8px 3px;"><div class="grid-content bg-purple">累计流量：{{v1List[index].v9}}m³</div></el-col>
          <el-col :span="12" style="padding: 8px 3px;"><div class="grid-content bg-purple">总有功电能：{{v1List[index].kwh}}(kW/h)</div></el-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDict, getList, getQuery2, getQuery4, getStatDetail } from '@/api/point/point'
import { getData } from '@/api/rain/rain'
import vueSeamlessScroll from 'vue-seamless-scroll'
import { queryLast, queryStation } from '@/api/station/station'
export default {
  name: 'LeftBox',
  data(){

    return{
      image1:require('../../assets/u0_13.gif'),
      image2:require('../../assets/u0_15.gif'),
      img1:require('../../assets/u01_03.gif'),
      img2:require('../../assets/u01_05.gif'),
      img3:require('../../assets/u01_12.gif'),
      img4:require('../../assets/u01_13.gif'),
      img5:require('../../assets/u_qwj.png'),
      img6:require('../../assets/u_pdj.png'),
      options: [],
      index: 0,
      radio1: '2',
      radio2: '2',
      showDate1:false,
      showDate2:false,
      datePickerKey1: 0,
      datePickerKey2: 0,
      valueDate: [],
      pickerOpened: false,
      dialogVisible: false,
      scrollKey: 0,
      timer: null,
      value1: [],
      value2: [],
      options1:[],
      options2:[],
      v1List:[{},{},{},{}],
      isOpen: false,
      myChart1: null,
      myChart2: null,
      obj:{
        v4:1,
        v5:4,
        v6:12,
        v7:2,
        v8:4,
        v9:1,
      },
      option: {
        step: 0.5,         // 滚动速度，值越小越慢
        limitMoveNum: 5,   // 数据条数小于这个数将不滚动
        hoverStop: true,   // 鼠标悬停是否停止滚动
        direction: 1,      // 0=向下，1=向上
        openWatch: true,   // 开启数据实时监听刷新
        singleHeight: 30,  // 单条数据的高度
        waitTime: 1000     // 每次滚动间隔
      },
      listData: [],
      listData1: [],
      listData2: [],
      pipeData1:[],
      pipeData2:[],
      pipeData3:[],
      optionData:[],
      pickerOptions: {
        // 可选配置，例如禁用未来日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  mounted() {
    //this.hideDatePicker();
    this.initChart();
    this.loadChart();
    getList().then(response => {
      this.listData = response.data;
      this.listData1 = this.filterAndReplaceTitle('水位计', '马梪站');
      this.listData2 =this.filterAndReplaceTitle('雨量计', '马梪站');
      // let result = []
      // for (let i = 0; i < this.listData2; i++) {
      //   let obj = this.listData2[i];
      //   console.log(obj)
      //   if (obj.title.includes('水位计')){
      //     obj.title = obj.title.replace('雨量计','');
      //   }
      //   result.push(obj)
      // }
      // this.listData2 = result;
      // console.error(this.listData2)
    });
    this.timer = setInterval(() => {
      // if (this.showDate1){
      //   this.showDate1  = false;
      // }
      // if (this.showDate2){
      //   this.showDate2  = false;
      // }
      const xData = this.generateTime(1,10)
      const result1 = []
      const water1 = window.localStorage.getItem('water1')
      const water2 = window.localStorage.getItem('water2')
      for (let i = 0; i < xData.length; i++) {
        result1.push({date:xData[i],title:" 外江水位:"+water1+"mm"})
        result1.push({date:xData[i],title:" 内江水位:"+water2+"mm"})
      }
      // this.listData1  = result1;
      this.listData1 = result1
      this.scrollKey++  // 触发组件重新渲染
      // console.error('xxxxxxxxxxxxx11111111111',result1)
    }, 6000)
    this.drawPipe();
    // this.drawLine();
    // this.drawBar();
    getDict().then(response => {
      // let deviceId = response.data[0].value;
      // let data = response.data;
      // this.options1 = data;
      // this.options2 = data;
      // this.value2 = deviceId;
      // this.value1 = deviceId;
      // getQuery2(this.value1).then(response => {
      //   let array = response.data;
      //   let lastData = this.getMonthData(array[0]);
      //   //console.error(lastData)
      //   let currentData = this.getMonthData(array[1]);
      //   //.console.error(currentData)
      //   this.drawYearLine(this.$refs.b,lastData,currentData);
      // });
      // getQuery4(this.value2).then(response => {
      //   let array = response.data;
      //   let lastData = this.getMonthData(array[0]);
      //   let currentData = this.getMonthData(array[1]);
      //   this.drawYearBar(this.$refs.c,lastData,currentData);
      // });
    });
    getStatDetail(null).then(response => {
      let data = response.data;
      let count1 = 0;
      let count2 = 0;
      let count3 = 0;
      let rs1 = [];
      let rs2 = [];
      let rs3 = [];
      for(let i=0;i<data.length;i++){
        let obj = data[i];
        //console.log(obj);
        if (obj.type === 1){
          count1+=obj.value;
          rs1.push(obj)
        }else if(obj.type === 3){
          count3+=obj.value;
          rs3.push(obj)
        } else {
          count2+=obj.value;
          rs2.push(obj)
        }
      }
      this.pipeData1=rs1;
      this.pipeData2=rs2;
      this.pipeData3=rs3;
      let rs = [{name:"泵站",value:count1},{name:"闸门",value:count2},{name:"清污机",value:count3}];
      //console.error(rs);
      this.drawPipe(rs);
      this.drawPieRight('泵站');
    });

    queryStation().then(response => {
      let array = response.data;
      let siteId = array[0].id;
      for(let i= 0;i<array.length;i++){
        let obj = { value: array[i].id, label: array[i].name};
        array[i]=obj;
      }
      this.siteId = siteId;
      // console.log(array)
      this.options=array;
      this.value1 = siteId;
      queryLast(this.siteId+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
    });
    // this.setDate(1);
    // this.getData(1);
    // this.getData(2);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods:{
    initChart() {
      this.myChart1 = this.$echarts.init(this.$refs.a);
      this.myChart2 = this.$echarts.init(this.$refs.aa);
    },
    disposeChart() {
      this.myChart1.dispose();
      this.myChart2.dispose();
    },
    loadChart(){
      let query ={}
      if (this.valueDate.length>0){
        query ={
          startTime:this.valueDate[0],
          endTime:this.valueDate[1]
        }
      }
      let that = this;
      getStatDetail(query).then(response => {
        let data = response.data;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let rs1 = [];
        let rs2 = [];
        for(let i=0;i<data.length;i++){
          let obj = data[i];
          //console.log(obj);
          if (obj.type === 1){
            count1+=obj.value;
            rs1.push(obj)
          }else {
            count2+=obj.value;
            rs2.push(obj)
          }
          if (obj.name.includes('清污机')){
            count3+=obj.value;
          }
        }
        that.pipeData1=rs1;
        that.pipeData2=rs2;
        let rs = [{name:"泵站",value:count1},{name:"闸门",value:count2},{name:"清污机",value:count3}];
        //console.error(rs);
        that.disposeChart();
        that.initChart();
        that.drawPipe(rs);
        that.drawPieRight('泵站');
      });
    },
    getNewData(){
      this.dialogVisible = false;
      console.error('xxxxx',this.valueDate)
      this.loadChart();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    checkData(type){
      if (type === 2){
        return this.$router.push('/station/59513090d3fb43c5b62a963dd5189f7c');
      }else {
        return this.$router.push('/device');
      }
    },
    getDetailInfo(array){
      for(let i=0;i<array.length;i++){
        let obj = array[i];
        let name = obj.deviceName;
        if (name.indexOf('1号电机') !== -1){
          //this.v1List[0] = obj;
          this.$set(this.v1List, 0, obj);
        }
        if (name.indexOf('2号电机') !== -1){
          //this.v1List[1] = obj;
          this.$set(this.v1List, 1, obj);
        }
        if (name.indexOf('3号电机') !== -1){
          //this.v1List[2] = obj;
          this.$set(this.v1List, 2, obj);
        }
        if (name.indexOf('4号电机') !== -1){
          //this.v1List[3] = obj;
          this.$set(this.v1List, 3, obj);
        }
      }
      this.index=0;
    },
    filterAndReplaceTitle(keyword, targetText, replacement = '') {
      return this.listData
        .filter(item => item.title.includes(keyword))
        .map(item => {
          return {
            ...item,
            title: item.title.replace(targetText, replacement)
          }
        });
    },
    generateTime(type = 1, intervalMinutes = 5) {
      const now = new Date();
      let start, end;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 今天 00:00
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 55, 0); // 今天 00:00

      const result = [];

      for (let time = new Date(start); time <= end; time.setMinutes(time.getMinutes() + intervalMinutes)) {
        result.push(this.formatDateTime(new Date(time)));
      }
      return result;
    },
    formatDateTime(date) {
      const pad = n => String(n).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
        `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    setDate(type){
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if (type===1){
        this.value1 = [this.formatDate(yesterday), this.formatDate(today)];
      }else {
        this.value2 = [this.formatDate(yesterday), this.formatDate(today)];
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    getData(type){
      if (type ===1 && this.value1.length===0){
        this.setDate(type);
      }
      if (type ===2 && this.value2.length===0){
        this.setDate(type);
      }
      let queryParam ={
        dataType: type,
        dateType: this.radio1,
        dateRange: this.value1[0]+"_"+this.value1[1],
      }
      if (type === 2) {
        this.queryParam = {
          dataType: type,
          dateType: this.radio2,
          dateRange: this.value2[0]+"_"+this.value2[1],
        }
      }
      // console.error('999',this.value1)
      getData(queryParam).then(response => {
        // console.error('xxxxx',response)
        let obj1 = this.$refs.b1;
        let obj2 = this.$refs.b2;
        if (type === 2){
          obj1 = this.$refs.c1;
          obj2 = this.$refs.c2;
        }
        let xData = response.data.date;
        let yData1 = response.data.data1;
        let yData2 = response.data.data2;
        let title1 = "泵站外江";
        let title2 = "泵站内江";
        let unit = "mm";
        if (type === 2){
          title1 = "日降雨量";
          title2 = "累计降雨量";
        }
        let color = "#1BB816";
        if (parseInt(this.radio1) ===2){
          color = "#FF1E10";
        }else if (parseInt(this.radio1) ===2){
          color = "#FFA500";
        }
        if (type === 1){
          this.drawLine3(obj1,xData,yData1,title1,unit,color);
          this.drawLine3(obj2,xData,yData2,title2,unit,color);
        }else {
          this.drawBar3(obj1,xData,yData1,title1,unit,color);
          this.drawLine3(obj2,xData,yData2,title2,unit,color);
        }
      });
    },
    updateChart(type){
      this.getData(type);
    },
    checkDate(type){
      if (type === 1) {
        this.showDate1 = !this.showDate1;
      } else if (type === 2) {
        this.showDate2 = !this.showDate2;
      }
    },
    onDateChange(value,type) {
      if (value && value.length === 2) {
        if (type === 1) {
          this.showDate1 = false;
          console.error(this.value1)
        } else if (type === 2) {
          this.showDate2 = false;
          console.error(this.value2)
        }
        this.getData(type)
      }
    },
    getMonthData(obj){
      let array = [];
      array.push(obj.v1);
      array.push(obj.v2);
      array.push(obj.v3);
      array.push(obj.v4);
      array.push(obj.v5);
      array.push(obj.v6);
      array.push(obj.v7);
      array.push(obj.v8);
      array.push(obj.v9);
      array.push(obj.v10);
      array.push(obj.v11);
      array.push(obj.v12);
      array.push(obj.v13);
      array.push(obj.v14);
      array.push(obj.v15);
      array.push(obj.v16);
      array.push(obj.v17);
      array.push(obj.v18);
      array.push(obj.v19);
      array.push(obj.v20);
      array.push(obj.v21);
      array.push(obj.v22);
      array.push(obj.v23);
      array.push(obj.v24);
      array.push(obj.v25);
      array.push(obj.v26);
      array.push(obj.v27);
      array.push(obj.v28);
      array.push(obj.v29);
      array.push(obj.v30);
      array.push(obj.v31);
      return array;
    },
    getYearData(obj){
      let array = [];
      array.push(obj.v1);
      array.push(obj.v2);
      array.push(obj.v3);
      array.push(obj.v4);
      array.push(obj.v5);
      array.push(obj.v6);
      array.push(obj.v7);
      array.push(obj.v8);
      array.push(obj.v9);
      array.push(obj.v10);
      array.push(obj.v11);
      array.push(obj.v12);
      return array;
    },
    getInfo(type){
      if (type === 0){
        getQuery2(this.value1).then(response => {
          let array = response.data;
          let lastData = this.getYearData(array[0]);
          let currentData = this.getYearData(array[1]);
          this.drawYearLine(this.$refs.b,lastData,currentData);
        });
      }else {
        getQuery4(this.value2).then(response => {
          let array = response.data;
          let lastData = this.getYearData(array[0]);
          let currentData = this.getYearData(array[1]);
          this.drawYearBar(this.$refs.c,lastData,currentData);
        });
      }
    },
    drawYearLine(obj,lastData,currentData) {
      let myChart = this.$echarts.init(obj);
      let option = {
        xAxis: {
          type: 'category',
          name:'月',
          data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
          nameTextStyle: {
            color: 'white',
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            }
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['去年', '今年'],
          x:'right',
          y:'top',
          padding:[5,15,0,0],
          textStyle:{
            fontSize: 10,//字体大小
            color: '#ffffff'//字体颜色
          },
        },
        yAxis: {
          type: 'value',
          name:'单位/cm',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#202B56',
              width: 1,
              type: 'dotted'
            }
          },
          nameTextStyle: {
            color: 'white',
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            }
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '5%',
          top:'15%',
          containLabel: true
        },
        series: [
          {
            data: lastData,
            type: 'line',
            name:'去年',
            itemStyle: {
              normal: {
                color: '#3BE6FF', //改变折线点的颜色
                lineStyle: {
                  color: '#3BE6FF' //改变折线颜色
                }
              }
            },
          },
          {
            data: currentData,
            type: 'line',
            name:'今年',
            itemStyle: {
              normal: {
                color: '#43F194', //改变折线点的颜色
                lineStyle: {
                  color: '#43F194' //改变折线颜色
                }
              }
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    drawYearBar(obj,lastData,currentData){
      let myChart = this.$echarts.init(obj);
      let option = {
        xAxis: {
          type: 'category',
          name:'月',
          data: ['1','2','3','4','5','6','7','8','9','10','11','12'],
          nameTextStyle: {
            color: 'white',
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            }
          }
        },
        legend: {
          data: ['今年', '去年'],
          x:'right',
          y:'top',
          padding:[5,15,0,0],
          textStyle:{
            fontSize: 10,//字体大小
            color: '#ffffff'//字体颜色
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value',
          name:'单位/mm',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#202B56',
              width: 1,
              type: 'dotted'
            }
          },
          nameTextStyle: {
            color: 'white',
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            }
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '5%',
          top:'15%',
          containLabel: true,
        },
        series: [
          {
            data: lastData,
            type: 'bar',
            name:'今年',
            itemStyle: {
              normal: {
                color: '#7F6FF7', //改变折线点的颜色
                lineStyle: {
                  color: '#7F6FF7' //改变折线颜色
                }
              }
            },
          },
          {
            data: currentData,
            type: 'bar',
            name:'去年',
            itemStyle: {
              normal: {
                color: '#28DFEE', //改变折线点的颜色
                lineStyle: {
                  color: '#28DFEE' //改变折线颜色
                }
              }
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    drawPipe(statData){
      // let myChart = this.$echarts.init(this.$refs.a);
      // var myChart = echarts.init(chartDom);

      const optionData = this.optionData;
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: '0%',
          orient: 'horizontal',
          textStyle:{
            fontSize: 12,//字体大小
            color: '#33AEC7'//字体颜色
          },
          // formatter(params) {
          //   console.log(optionData)
          //   for (let i = 0; i < optionData.length; i++) {
          //     let name = optionData[i].name;
          //     let value = optionData[i].value;
          //     if (params === name){
          //       return name+"   "+value;
          //     }
          //   }
          //   return params;
          // }
        },
        series: [
          {
            name: '年度闸泵开启统计',
            type: 'pie',
            left: '0%',
            center: ['45%', '50%'],
            radius: ['0%', '78%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: statData
          }
        ],
        graphic: [
          {
            type: 'text',
            left: '50%',
            top: '30%',
            z: 99999,
            style: {
              text: '水泵4台',
              textAlign: 'center',
              fill: '#27DBEC',
              fontSize: 12,
              fontWeight: 'normal'
            }
          },
          {
            type: 'text',
            left: '15%',
            top: '40%',
            z: 99999,
            style: {
              text: '清污机4台',
              textAlign: 'center',
              fill: '#27DBEC',
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          {
            type: 'text',
            left: '50%',
            bottom: '30%',
            z: 99999,
            style: {
              text: '闸门12台',
              textAlign: 'center',
              fill: '#27DBEC',
              fontSize: 12,
              fontWeight: 'bold'
            }
          }
        ]
      };

      this.myChart1.setOption(option);
      let _this = this
      this.myChart1.on('click', params => {
        _this.drawPieRight(params.name)
      })
    },
    drawPieRight(name){
      // let myChart = this.$echarts.init(this.$refs.aa);
      // var myChart = echarts.init(chartDom);
      let statData = this.pipeData1;
      if (name === '闸门'){
        statData = this.pipeData2;
      }else if (name === '清污机'){
        statData = this.pipeData3
      }
      let option = {
        title: {
          text: name+'年度开启统计',
          textStyle: {
            fontSize: 14,
            fontWeight:100,
            color: '#33AEC7'//字体颜色
          }
        },
        color:['#7CC8A4','#FD6D5F','#D7D7D7','#ef6567', '#f9c956','#3BA272'],
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   top: '0%',
        //   left: '3%',
        //   //orient: 'vertical',
        // },
        series: [
          {
            name: name+'分布明细',
            type: 'pie',
            left: '0%',
            center: ['40%', '50%'],
            radius: ['0%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:statData
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    drawLine3(obj,xData,yData,title,unit,color){
      let myChart = this.$echarts.init(obj);

      var option = {
        title: {
          text: title + '(' + unit + ')',
          left: 10,     // 靠左对齐，可调节
          top: 0,       // 顶部位置
          textStyle: {
            fontSize: 8,
            color:'#27DBEC',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            const point = params[0];
            return `${point.data}`;
          }
        },
        grid: {
          top: 10,
          bottom: 0,
          left: 10,
          right: 0,
          containLabel: true // 确保坐标轴标签不被裁剪
        },
        xAxis: {
          type: 'category',
          data: xData,
        },
        yAxis: {
          type: 'value',
          axisLabel: { show: true },       // ✅ 显示纵轴刻度值（10、20、30等）
          axisLine: { show: true },        // ✅ 显示纵轴本身
          splitLine: {
            show: false // ❗ 关键：不显示横向网格线
          }
        },
        series: [
          {
            data: yData,
            type: 'line',
            lineStyle: {
              color: color  // 线条颜色（如橙红色）
            }
          }
        ]
      };

      myChart.setOption(option);
    },
    drawBar3(obj, xData, yData, title, unit, color) {
      let myChart = this.$echarts.init(obj);

      let option = {
        title: {
          text: title + '(' + unit + ')',
          left: 10,
          top: 0,
          textStyle: {
            fontSize: 8,
            color: '#27DBEC',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 鼠标移上去显示阴影背景
          },
          formatter: function (params) {
            const point = params[0];
            return `${point.axisValue}<br/>${point.seriesName || ''} ${point.data}`;
          }
        },
        grid: {
          top: 10,
          bottom: 0,
          left: 10,
          right: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xData
        },
        yAxis: {
          type: 'value',
          axisLabel: { show: true },
          axisLine: { show: true },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: title,
            data: yData,
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              color: color
            }
          }
        ]
      };

      myChart.setOption(option);
    }
  }
}
</script>
<style scoped lang="scss">
.leftBox{
  width: 22%;
  float: left;
  height: calc(100vh - 90px);
  background-image: url("../../assets/u0_503.gif") ;
  background-repeat:no-repeat;
  background-size: 100% 100%;
  margin-left: 1%;
  margin-right: 1%;
}
.topBox{
  width: 100%;
  height: 28%;
  float: left;
  padding: 15px 15px;
}
.midBox{
  width: 100%;
  height: 32%;
  float: left;
  padding: 15px 15px;
}
.bottomBox{
  width: 100%;
  height: 32%;
  float: left;
  padding: 15px 15px;
}
.titleBox{
  width: 100%;
  height: 40px;
  float: left;
}
.leftImage{
  float: left;
  width: 30%;
  height: 50%;
  margin-top:3%;
  border:none;
  opacity: 0.5;
}
.rightImage{
  float: left;
  width: 10%;
  height: 50%;
  margin-top:3%;
  opacity: 0.5;
}
.titleInfo{
  width: 40%;
  height: 100%;
  float: left;
  color:#27DBEC;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}
.titleTip{
  float: left;
  background:repeating-linear-gradient(to right,#36D7E4,#58A8E4,#6C83E0);
  height: 5px;
  width: 30%;
  margin-left: 35%;
  border-radius: 2px;
}
.dateBox{
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  background-color: #1F1F51;
  color: #27DBE0;
}
.pink-radio-group ::v-deep .el-radio-button__inner {
  background-color: #040C35;
  border-color: #040C35;
  color: #27DBE0;
}
.pink-radio-group ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: #27DBE0;
  border-color: #27DBE0;
  color: white;
}
.dateBox{
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  background-color: #030C49;
  color: #27DBE0;
  float: left;
  position: fixed;
}
.infoBox1{
  float: left;
  width: 44%;
  height: 30%;
  background:repeating-linear-gradient(to right,#1B257B,#000940,#010969);
  padding: 15px 15px;
  margin-left: 4%;
  margin-right: 2%;
  margin-top: 2%;
  color: white;
}
.imgTip{
  margin-top: -2%;
  float: left;
  width: 50px;
  height: 50px;
}
.tip1{
  float: right;
  margin-right: -23%;
}
.tip2{
  font-size: 16px;
  text-align: center;
  margin-top:2%;
}
.contentBox{
  width: 100%;
  height: 105%;
  float: left;
  background-image: url("../../assets/u02_08.gif") ;
  background-repeat:no-repeat;
  background-size: 100% 100%;
  margin-top: 2%;
}
.optionBox{
  margin-top: 8%;
  float: left;
  margin-left: 10%;
}
.detailBox{
  float: left;
  color: white;
  margin-left: 8%;
  margin-top: 5%;
}
</style>
