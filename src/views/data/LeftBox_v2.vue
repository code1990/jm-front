<template>
  <div class="leftBox">
    <div class="topBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">年度闸开启统计</div>
        <img :src="image2" class="rightImage">
        <div class="titleTip"></div>
      </div>
      <div id="a" style="height:200px;width:49%;float: left;margin-top: 20px" ref="a"></div>
      <div id="aa" style="height:200px;width:49%;float: left;margin-top: 20px" ref="aa"></div>
    </div>
    <div class="midBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo" style="font-size: 16px;">水位监测实时信息</div>
        <img :src="image2" class="rightImage">
        <el-button size="mini" @click="checkDate(1)" class="dateBox" v-if="false">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div style="height: 23vh;float: left;overflow-y: auto;width: 100%;margin-top: 10px;">
        <vue-seamless-scroll :data="listData1" class="scroll-box" :class-option="option" :key="scrollKey">
          <ul class="custom-list" style="margin-left: -20px;">
            <li v-for="(item, index) in listData1" :key="index" style="color:white;">
              <span class="date" v-text="item.date"></span>
              <span class="title" v-text="item.title"></span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
<!--      <div style="float: right;z-index: 99">-->
<!--        <el-date-picker-->
<!--          v-if="showDate1"-->
<!--          :key="'dp1-' + datePickerKey1"-->
<!--          v-model="value1"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          size="mini"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          :picker-options="pickerOptions"-->
<!--          @change="(val) => onDateChange(val, 1)"-->
<!--          @blur="showDate1=false"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div style="float: right;">-->
<!--        <el-radio-group v-model="radio1" size="mini" @change="updateChart(1)" class="pink-radio-group">-->
<!--          <el-radio-button label="1" >日</el-radio-button>-->
<!--          <el-radio-button label="2" >月</el-radio-button>-->
<!--          <el-radio-button label="3" >年</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </div>-->
<!--      <div id="b" style="height:100px;width:98%;float: left;" ref="b1"></div>-->
<!--      <div id="b2" style="height:100px;width:98%;float: left;" ref="b2"></div>-->
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo" style="font-size: 16px;">雨量监测实时信息</div>
        <img :src="image2" class="rightImage">
        <el-button size="mini" @click="checkDate(2)" class="dateBox" v-if="false">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div style="height: 28vh;float: left;overflow-y: auto;width: 100%;margin-top: 10px;">
        <vue-seamless-scroll :data="listData2" class="scroll-box" :class-option="option">
          <ul class="custom-list" style="margin-left: -20px;">
            <li v-for="(item, index) in listData2" :key="index" style="color:white;">
              <span class="date" v-text="item.date"></span>
              <span class="title" v-text="item.title"></span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
<!--      <div style="float: right;">-->
<!--        <el-date-picker-->
<!--          v-if="showDate2"-->
<!--          :key="'dp2-' + datePickerKey2"-->
<!--          v-model="value2"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          size="mini"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          :picker-options="pickerOptions"-->
<!--          @change="(val) => onDateChange(val, 2)"-->
<!--          @blur="showDate2=false"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--      </div>-->
<!--      <div style="float: right;">-->
<!--        <el-radio-group v-model="radio2" size="mini" @change="updateChart(2)" class="pink-radio-group">-->
<!--          <el-radio-button label="1" >日</el-radio-button>-->
<!--          <el-radio-button label="2" >月</el-radio-button>-->
<!--          <el-radio-button label="3" >年</el-radio-button>-->
<!--        </el-radio-group>-->
<!--      </div>-->
<!--      <div id="c" style="height:100px;width:98%;float: left;" ref="c1"></div>-->
<!--      <div id="c2" style="height:100px;width:98%;float: left;" ref="c2"></div>-->
    </div>
  </div>
</template>
<script>
import { getDict, getList, getQuery2, getQuery4, getStatDetail } from '@/api/point/point'
import { getData } from '@/api/rain/rain'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'LeftBox',
  data(){

    return{
      image1:require('../../assets/u0_13.gif'),
      image2:require('../../assets/u0_15.gif'),
      options: [],
      radio1: '2',
      radio2: '2',
      showDate1:false,
      showDate2:false,
      datePickerKey1: 0,
      datePickerKey2: 0,
      scrollKey: 0,
      timer: null,
      value1: [],
      value2: [],
      options1:[],
      options2:[],
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
    getStatDetail().then(response => {
      let data = response.data;
      let count1 = 0;
      let count2 = 0;
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
      }
      this.pipeData1=rs1;
      this.pipeData2=rs2;
      let rs = [{name:"泵站",value:count1},{name:"闸门",value:count2}];
      //console.error(rs);
      this.drawPipe(rs);
      this.drawPieRight('泵站');
    });
    // this.setDate(1);
    // this.getData(1);
    // this.getData(2);
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods:{
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
      let myChart = this.$echarts.init(this.$refs.a);
      // var myChart = echarts.init(chartDom);

      const optionData = this.optionData;
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: '3%',
          //orient: 'vertical',
          textStyle:{
            fontSize: 14,//字体大小
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
        ]
      };

      myChart.setOption(option);
      let _this = this
      myChart.on('click', params => {
        _this.drawPieRight(params.name)
      })
    },
    drawPieRight(name){
      let myChart = this.$echarts.init(this.$refs.aa);
      // var myChart = echarts.init(chartDom);
      let statData = this.pipeData1;
      if (name === '闸门'){
        statData = this.pipeData2;
      }
      let option = {
        title: {
          text: name+'年度开启分布明细',
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
      myChart.setOption(option);
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
  width: 30%;
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
  background-color: #040C35;
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
</style>
