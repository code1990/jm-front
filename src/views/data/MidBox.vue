<template>
  <div class="MidBox">
    <div class="topBox">
      <div class="timeBox">
        {{ dayInfo }} {{ timeInfo }}
      </div>
    </div>
    <div class="midBox" style="width: 100%;float: left;height: 35%;">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">水位监测曲线图</div>
        <el-button size="mini" @click="checkDate(1)" class="dateBox">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div style="float: right;z-index: 99">
        <el-date-picker
          v-if="showDate1"
          :key="'dp1-' + datePickerKey1"
          v-model="value11"
          type="daterange"
          align="right"
          size="mini"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="(val) => onDateChange(val, 1)"
          @blur="showDate1=false"
        >
        </el-date-picker>
      </div>
      <div style="float: right;">
        <el-radio-group v-model="radio1" size="mini" @change="updateChart(1)" class="pink-radio-group">
          <el-radio-button label="1" >日</el-radio-button>
          <el-radio-button label="2" >月</el-radio-button>
          <el-radio-button label="3" >年</el-radio-button>
        </el-radio-group>
      </div>
      <div id="b1" style="height:130px;width:100%;float: left;" ref="b1"></div>
      <div id="b2" style="height:120px;width:100%;float: left;" ref="b2"></div>
    </div>
    <div class="bottomBox">
      <div class="titleBox">
        <img :src="image1" class="leftImage">
        <div class="titleInfo">雨量监测柱状图</div>
        <el-button size="mini" @click="checkDate(2)" class="dateBox">请选择时间</el-button>
        <div class="titleTip"></div>
      </div>
      <div style="float: right;">
        <el-date-picker
          v-if="showDate2"
          :key="'dp2-' + datePickerKey2"
          v-model="value21"
          type="daterange"
          align="right"
          size="mini"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="(val) => onDateChange(val, 2)"
          @blur="showDate2=false"
        >
        </el-date-picker>
      </div>
      <div style="float: right;">
        <el-radio-group v-model="radio2" size="mini" @change="updateChart(2)" class="pink-radio-group">
          <el-radio-button label="1" >日</el-radio-button>
          <el-radio-button label="2" >月</el-radio-button>
          <el-radio-button label="3" >年</el-radio-button>
        </el-radio-group>
      </div>
      <div id="c1" style="height:100px;width:100%;float: left;" ref="c1"></div>
      <div id="c2" style="height:100px;width:100%;float: left;" ref="c2"></div>
    </div>
<!--    <div class="bottomBox">-->
<!--      <div class="titleBox">-->
<!--        <img :src="image1" class="leftImage">-->
<!--        <div class="titleInfo">泵站实时信息</div>-->
<!--        <el-select v-model="value1" placeholder="请选择" size="mini" style="width: 130px;font-size: 10px;margin-top: 8px;float: right;margin-right: 40px;"  @change="changeStation">-->
<!--          <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--        <div class="titleTip"></div>-->
<!--      </div>-->
<!--      <div  class="contentBox">-->
<!--        <div class="optionBox">-->
<!--          <el-radio-group v-model="index">-->
<!--            <el-radio :label="0" style="color: white;">泵1</el-radio>-->
<!--            <el-radio :label="1" style="color: white;" >泵2</el-radio>-->
<!--            <el-radio :label="2" style="color: white;" >泵3</el-radio>-->
<!--            <el-radio :label="3" style="color: white;" >泵4</el-radio>-->
<!--          </el-radio-group>-->
<!--        </div>-->
<!--        <div class="detailBox">-->
<!--          <el-col :span="8" style="padding: 20px 10px;"> <div class="grid-content bg-purple">瞬时流量：{{v1List[index].v8}}(m³/h)</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">A相电压：{{v1List[index].v1}}V</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">A相电流：{{v1List[index].a1}}A</div></el-col>-->

<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">累计流量：{{v1List[index].v9}}m³</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">B相电压：{{v1List[index].v1}}V</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">B相电流：{{v1List[index].a2}}A</div></el-col>-->

<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">总有功电能：{{v1List[index].kwh}}(kW/h)</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">C相电压：{{v1List[index].v3}}V</div></el-col>-->
<!--          <el-col :span="8" style="padding: 20px 10px;"><div class="grid-content bg-purple">C相电流：{{v1List[index].a3}}A</div></el-col>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>
import { getStatCount } from "@/api/point/point";
import {queryStation,queryLast } from "@/api/station/station";
import { getData } from '@/api/rain/rain'
// import TMap from '@/views/data/TMap.vue'
export default {
  name: 'MidBox',
  // components:{
  //   TMap
  // },
  data(){
    return{
      image1:require('../../assets/u0_13.gif'),
      image2:require('../../assets/u0_15.gif'),
      radio1: '1',
      radio2: '1',
      showDate1:false,
      showDate2:false,
      datePickerKey1: 0,
      datePickerKey2: 0,
      water1:0,
      water2:0,
      today:null,
      yesterday:null,
      rain1:0,
      timer: null,
      myChartMap:{},
      value11: [],
      value21: [],
      value1: null,
      value2: null,
      pickerOptions: {
        // 可选配置，例如禁用未来日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      obj:{
        v1:null,
        v2:null,
        v3:null
      },
      index: 0,
      options: [],
      siteId:null,
      v1List:[{},{},{},{}],
      url: require('../../assets/data_1.png'),
      srcList: [
        require('../../assets/data_1.png'),
      ],
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
      timer2:null,
      timeInfo: '',
      dayInfo: '',
    }
  },
  created() {
    this.getLastInfo();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timer2) {
      clearInterval(this.timer2)
    }
  },
  mounted() {

    getStatCount().then(response => {
      this.obj = response.data;
      // console.log(response.data)
    });

    this.setDate(1);
    this.setDate(2);
    this.getData(1);
    this.getData(2);
    this.water1 = this.getRandomValue(100,120)
    this.water2 = this.getRandomValue(60,80)
    window.localStorage.setItem('water1', this.water1)
    window.localStorage.setItem('water2', this.water2)
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    this.today = this.formatDate(today);
    this.yesterday = this.formatDate(yesterday);
  },
  methods:{
    setDate(type){
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if (type===1){
        this.value11 = [this.formatDate(yesterday), this.formatDate(today)];
      }else {
        this.value21 = [this.formatDate(yesterday), this.formatDate(today)];
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    getData(type){
      if (type ===1 && this.value11.length===0){
        this.setDate(type);
      }
      if (type ===2 && this.value21.length===0){
        this.setDate(type);
      }
      let queryParam ={
        dataType: type,
        dateType: this.radio1,
        dateRange: this.value11[0]+"_"+this.value11[1],
      }
      if (type === 2) {
        queryParam = {
          dataType: type,
          dateType: this.radio2,
          dateRange: this.value21[0]+"_"+this.value21[1],
        }
      }
      // console.error('999',this.value11)
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
          // 你应该已有 yesterday 和 today 这两个字段
          const todayKey1 = this.today + '_' + this.radio2 + '_1';
          const todayKey2 = this.today + '_' + this.radio2 + '_2';
          const yesterdayKey1 = this.yesterday + '_' + this.radio2 + '_1';
          const yesterdayKey2 = this.yesterday + '_' + this.radio2 + '_2';
          // ✅ 先删除昨天的缓存
          window.localStorage.removeItem(yesterdayKey1);
          window.localStorage.removeItem(yesterdayKey2);

          // ✅ 尝试从今天的缓存读取
          const cache1 = window.localStorage.getItem(todayKey1);
          const cache2 = window.localStorage.getItem(todayKey2);

          if (cache1 && cache2) {
            yData1 = JSON.parse(cache1);
            yData2 = JSON.parse(cache2);
          } else {
            // ✅ 没缓存则写入
            window.localStorage.setItem(todayKey1, JSON.stringify(yData1));
            window.localStorage.setItem(todayKey2, JSON.stringify(yData2));
          }
        }
        let color = "#1BB816";
        if (parseInt(this.radio1) ===2 || parseInt(this.radio2) ===2){
          color = "#FF1E10";
        }else if (parseInt(this.radio1) ===3 || parseInt(this.radio2) ===3){
          color = "#FFA500";
        }
        if (type === 1){
          if (parseInt(this.radio1) ===1){
            // console.error('xxxxxxxxxxxxxxx')
            const xData = this.generateTime(1,10)
            const ydata1 = this.generateData(1,10,100,120)
            const ydata2 = this.generateData(2,10,100,120)
            const ydata3 = this.generateData(2,10,100,120)
            this.drawLine3Days(obj1,xData,ydata1,ydata2,ydata3,title1,unit);
            const ydata11 = this.generateData(1,10,60,80)
            const ydata21 = this.generateData(2,10,60,80)
            const ydata31 = this.generateData(2,10,60,80)
            this.drawLine3Days(obj2,xData,ydata11,ydata21,ydata31,title2,unit);
          }else {
            // console.error('aaaaaaaaaaaaaaaaa')
            this.drawLine3(obj1,xData,yData1,title1,unit,color);
            this.drawLine3(obj2,xData,yData2,title2,unit,color);
          }
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
          console.error(this.value11)
        } else if (type === 2) {
          this.showDate2 = false;
          console.error(this.value21)
        }
        this.getData(type)
      }
    },
    getLastInfo(){
      this.timer = setInterval(() => {
        queryStation().then(response => {
          let array = response.data;
          let siteId = array[0].id;
          for(let i= 0;i<array.length;i++){
            let obj = { value: array[i].id, label: array[i].name};
            array[i]=obj;
          }
          this.siteId = siteId;
          console.log(array)
          this.options=array;
          this.value1 = siteId;
          queryLast(this.siteId+"").then(response => {
            let array = response.data;
            this.getDetailInfo(array);
          });
        });
      }, 60000);
      this.time2 =setInterval(()=>{
        this.dayInfo = this.getDay()
        this.timeInfo = this.getTime()
      },1000);
    },
    changeStation(value){
      //console.log(value)
      this.value1 = value;
      this.siteId = value;
      queryLast(this.siteId+"").then(response => {
        let array = response.data;
        this.getDetailInfo(array);
      });
    },
    getDay() {
      const now = new Date()
      const year = now.getFullYear()
      const month = ('0' + (now.getMonth() + 1)).slice(-2)
      const day = ('0' + now.getDate()).slice(-2)
      // const hours = ('0' + now.getHours()).slice(-2)
      // const minutes = ('0' + now.getMinutes()).slice(-2)
      // const seconds = ('0' + now.getSeconds()).slice(-2)

      return year + '-' + month + '-' + day

    },
    getTime(){
      const now = new Date()
      // const year = now.getFullYear()
      // const month = ('0' + (now.getMonth() + 1)).slice(-2)
      // const day = ('0' + now.getDate()).slice(-2)
      const hours = ('0' + now.getHours()).slice(-2)
      const minutes = ('0' + now.getMinutes()).slice(-2)
      const seconds = ('0' + now.getSeconds()).slice(-2)

      return hours + ':' + minutes + ':' + seconds
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
    formatDateTime2(date) {
      const pad = n => String(n).padStart(2, '0');
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    generateTime(type = 1, intervalMinutes = 5) {
      const now = new Date();
      let start, end;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 今天 00:00
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 55, 0); // 今天 00:00

      const result = [];

      for (let time = new Date(start); time <= end; time.setMinutes(time.getMinutes() + intervalMinutes)) {
        result.push(this.formatDateTime2(new Date(time)));
      }
      return result;
    },
    generateData(type = 1, intervalMinutes = 5,min=80,max=110) {
      const now = new Date();
      let start, end;
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); // 今天 00:00
      end = now;
      if (type!== 1){
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 55, 0); // 今天 00:00
      }
      const result = [];
      let v = this.getRandomValue(min, max)
      if (type === 1 && min === 100){
        v = this.water2;
      }
      if (type === 1 && min === 100){
        v = this.water1;
      }
      for (let time = new Date(start); time <= end; time.setMinutes(time.getMinutes() + intervalMinutes)) {
        result.push(v);
      }
      return result;
    },
    // 模拟数据值
    getRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    drawLine3Days(obj, xLabels, dataToday, dataYesterday, dataBeforeYesterday, title, unit) {
      const id = obj.id;
      if (this.myChartMap[id]) {
        this.myChartMap[id].dispose();
      }
      this.myChartMap[id] = this.$echarts.init(obj);

      const option = {
        title: {
          text: `${title} (${unit})`,
          left: 10,
          top: 0,
          textStyle: {
            fontSize: 12,
            color: '#27DBEC',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['今天', '昨天', '前天'],
          top: 0,
          right: 10,
          textStyle: {
            fontSize: 8,
            color: '#fff'
          }
        },
        grid: {
          top: 20,
          bottom: 10,
          left: 10,
          right: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xLabels,
            axisLabel: {
              show: true,
              rotate: 0,
              margin: 8,
              textStyle: {
                color: '#666',
                fontSize: '12'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#dfe6ff',
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            textStyle: {
              color: '#666',
              fontSize: '12'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',  // 虚线
                color: 'rgba(255, 255, 255, 0.2)',   // 可自定义颜色
                width: 1         // 可自定义线宽
              }
            }
          }
        ],
        series: [
          {
            name: '前天',
            type: 'line',
            data: dataBeforeYesterday,
            lineStyle: { color:  '#F50A0A' }
          },
          {
            name: '昨天',
            type: 'line',
            data: dataYesterday,
            lineStyle: { color:  '#3E98FD' }
          },
          {
            name: '今天',
            type: 'line',
            data: dataToday,
            lineStyle: { color:  '#A065FB' }
          }

        ]
      };

      this.myChartMap[id].setOption(option);
    },
    drawLine3(obj,xData,yData,title,unit,color){
      const id = obj.id;
      if (this.myChartMap[id]) {
        this.myChartMap[id].dispose();
      }
      this.myChartMap[id] = this.$echarts.init(obj);

      var option = {
        title: {
          text: `${title} (${unit})`,
          left: 10,
          top: 0,
          textStyle: {
            fontSize: 12,
            color: '#27DBEC',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: 20,
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
            show: true,
            lineStyle: {
              type: 'dashed',  // 虚线
              color: 'rgba(255, 255, 255, 0.2)',   // 可自定义颜色
              width: 1         // 可自定义线宽
            }
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

      this.myChartMap[id].setOption(option);
    },
    drawBar3(obj, xData, yData, title, unit, color) {
      const id = obj.id;
      if (this.myChartMap[id]) {
        this.myChartMap[id].dispose();
      }
      this.myChartMap[id] = this.$echarts.init(obj);

      let option = {
        title: {
          text: `${title} (${unit})`,
          left: 10,
          top: 0,
          textStyle: {
            fontSize: 12,
            color: '#27DBEC',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: 20,
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

      this.myChartMap[id].setOption(option);
    }
  }
}
</script>
<style scoped lang="scss">
.MidBox{
  width: 52%;
  float: left;
  height: calc(100vh - 80px);
}
.topBox{
  width: 100%;
  height: 30%;
  float: left;
  background-image: url("../../assets/mdz.png");
  background-repeat:no-repeat;
  background-size: 100% 100%;
}

.bottomBox{
  width: 100%;
  height: 35%;
  float: left;

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
  margin-top:2%;
  border:none;
  opacity: 0.5;
}
.rightImage{
  float: left;
  width: 30%;
  height: 50%;
  margin-top:2%;
  border:none;
  opacity: 0.5;
}
.titleInfo{
  width: 40%;
  height: 100%;
  float: left;
  color:#27DBEC;
  font-size: 20px;
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
.contentBox{
  width: 100%;
  height: 83.5%;
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
.topBox{
  float: left;
  width: 100%;
}

.imgInfo{
  float: left;
  width: 60%;
  height: 60%;
  background-image: url("../../assets/u01_10.gif");
  background-repeat: no-repeat;
  margin-left: 26%;
  margin-top: 28%;
  //background-size: 100% 100%;
}
.topInfo{
  color: #2BC9CD;
}
.tip1{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 38%;
  top: 20%;
  text-align: center;
  line-height: 60px;
}
.tip2{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 45%;
  top: 12%;
  text-align: center;
  line-height: 60px;
}
.tip3{
  width: 10%;
  border: 2px solid #113F5C;
  position: fixed;
  left: 52%;
  top: 20%;
  text-align: center;
  line-height: 60px;
}
.bar1{
  background-color: #113F5C;
  height: 18px;
  width: 2px;
  position: fixed;
  left: 44.85%;
  top: 27%;
}

.bar2{
  background-color: #113F5C;
  height: 88px;
  width: 2px;
  position: fixed;
  left: 50.4%;
  top: 19%;
}
.bar3{
  background-color: #113F5C;
  height: 18px;
  width: 2px;
  position: fixed;
  left: 55.9%;
  top: 27%;
}
.timeBox{
  float: right;
  color: white;
  font-size: 16px;
  margin-right: 12%;
  background-color: #096EB0;
  width: 200px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  margin-top: 1px;
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
