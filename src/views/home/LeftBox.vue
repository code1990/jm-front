<template>
  <div class="leftBox">
    <div class="top">
      <div style="width: 100%;float: left;">
        <div class="optionBox">
          <div class="titleBar"></div>
          <div class="titleBox">年度闸泵开启统计</div>
        </div>
      </div>
      <div id="a" style="height:17vh;width:50%;float: left;" ref="a"></div>
      <div id="aa" style="height:17vh;width:50%;float: left;" ref="aa"></div>
      <el-col :span="24" style="border-top:1px solid #DEE1E8;padding-top: 5px;">
        <el-col :span="8" style="text-align: center;color: #409EFF;">{{obj.v1?obj.v1.toFixed(2):0}}%</el-col>
        <el-col :span="8" style="text-align: center;color: #409EFF;">{{obj.v2?obj.v2.toFixed(2):0}}</el-col>
        <el-col :span="8" style="text-align: center;color: #409EFF;">{{obj.v3}}</el-col>
      </el-col>
      <el-col :span="24" style="margin-bottom: 15px;">
        <el-col :span="8" style="text-align: center;font-size: 10px;">同比去年上升</el-col>
        <el-col :span="8" style="text-align: center;font-size: 10px;">闸泵开启时间</el-col>
        <el-col :span="8" style="text-align: center;font-size: 10px;">未开启站点</el-col>
      </el-col>
    </div>
    <div class="mid">
      <div>
        <div class="optionBox">
          <div class="titleBar"></div>
          <div class="titleBox">水位曲线图</div>
          <div style="float: left;margin-left:10px;">
            <div @click="query(0,1)" :class="cls1">月</div>
            <div  @click="query(0,2)"  :class="cls2">年</div>
          </div>
          <el-select v-model="value1" placeholder="请选择" size="mini" style="width: 130px;font-size: 10px;margin-top: -5px;float: right;" @change="getInfo(0)">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="b" style="height:20vh;width:100%;float: left;" ref="b"></div>
    </div>
    <div class="bottom">
      <div>
        <div class="optionBox">
          <div class="titleBar"></div>
          <span class="titleBox">流量曲线图</span>
          <div style="float: left;margin-left:10px;">
            <div @click="query(1,1)" :class="cls3">月</div>
            <div  @click="query(1,2)"  :class="cls4">年</div>
          </div>
          <el-select v-model="value2" placeholder="请选择" size="mini" style="width: 130px;font-size: 10px;margin-top: -5px;float: right;" @change="getInfo(1)">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div id="c" style="height:20vh;width:100%;float: left;" ref="c"></div>
    </div>
  </div>
</template>
<script>
import { getDict,getQuery1,getQuery2,getQuery3,getQuery4,getStatDetail,getStatCount } from "@/api/point/point";
// import * as echarts from 'echarts';
export default {
  name: 'LeftBox',
  data() {
    return {
      timeInfo: '',
      timer: null,
      userInfo: 'admin',
      v1:'241',
      v2:'242',
      v3:'0',
      cls1:'active',
      cls2:'default',
      cls3:'active',
      cls4:'default',
      options1:[],
      options2:[],
      pipeData1:[],
      pipeData2:[],
      value1: '',
      value2: '',
      type1:1,
      type2:1,
      obj:{
        v1:null,
        v2:null,
        v3:null
      },
      options: [{
        value: '1',
        label: '1王杠子挡水闸'
      },
        {
          value: '2',
          label: '2福盛庄拦河闸'
        },
        {
          value: '3',
          label: '3后周挡水闸'
        },
        {
          value: '4',
          label: '4二十里堡挡水闸'
        },
        {
          value: '5',
          label: '5王家集挡水闸'
        },
        {
          value: '6',
          label: '6黄家井挡水闸'
        },
        {
          value: '7',
          label: '7董庙挡水闸'
        },
        {
          value: '8',
          label: '8十里堡挡水闸'
        },
      ],

    }
  },
  mounted() {
    //this.drawPipe();
    // this.drawMonthLine(this.$refs.b);
    // this.drawMonthLine(this.$refs.c);
    getDict().then(response => {
      let deviceId = response.data[0].value;
      let data = response.data;
      this.options1 = data;
      this.options2 = data;
      this.value2 = deviceId;
      this.value1 = deviceId;
      getQuery1(this.value1).then(response => {
        let array = response.data;
        let lastData = this.getMonthData(array[0]);
        let currentData = this.getMonthData(array[1]);
        this.drawMonthLine(this.$refs.b,lastData,currentData);
      });
      getQuery3(this.value2).then(response => {
        let array = response.data;
        let lastData = this.getMonthData(array[0]);
        let currentData = this.getMonthData(array[1]);
        this.drawMonthLine(this.$refs.c,lastData,currentData);
      });
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
    getStatCount().then(response => {
      this.obj = response.data;
      //console.log(response.data)
    });
  },
  methods:{
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
        if (this.type1 === 1){
          getQuery1(this.value1).then(response => {
            let array = response.data;
            let lastData = this.getMonthData(array[0]);
            let currentData = this.getMonthData(array[1]);
            this.drawMonthLine(this.$refs.b,lastData,currentData);
          });
        }else{
          getQuery2(this.value1).then(response => {
            let array = response.data;
            let lastData = this.getYearData(array[0]);
            let currentData = this.getYearData(array[1]);
            this.drawYearLine(this.$refs.b,lastData,currentData);
          });
        }
      }else {
        if (this.type2 === 1){
          getQuery3(this.value2).then(response => {
            let array = response.data;
            let lastData = this.getMonthData(array[0]);
            let currentData = this.getMonthData(array[1]);
            this.drawMonthLine(this.$refs.c,lastData,currentData);
          });
        }else{
          getQuery4(this.value2).then(response => {
            let array = response.data;
            let lastData = this.getYearData(array[0]);
            let currentData = this.getYearData(array[1]);
            this.drawYearLine(this.$refs.c,lastData,currentData);
          });
        }
      }
    },
    query(type,val){
      if (type === 0){
        if (val === 1){
          if (this.cls1 === 'active'){
            this.cls1= 'default';
            this.cls2= 'active';
            this.type1 = 2;
            getQuery2(this.value1).then(response => {
              let array = response.data;
              let lastData = this.getYearData(array[0]);
              let currentData = this.getYearData(array[1]);
              this.drawYearLine(this.$refs.b,lastData,currentData);
            });
          }else {
            this.cls1= 'active';
            this.cls2= 'default';
            this.type1 = 1;
            getQuery1(this.value1).then(response => {
              let array = response.data;
              let lastData = this.getMonthData(array[0]);
              let currentData = this.getMonthData(array[1]);
              this.drawMonthLine(this.$refs.b,lastData,currentData);
            });
          }
        }else {
          if (this.cls2 === 'default'){
            this.cls1= 'default';
            this.cls2= 'active';
            this.type1 = 2;
            getQuery2(this.value1).then(response => {
              let array = response.data;
              let lastData = this.getYearData(array[0]);
              let currentData = this.getYearData(array[1]);
              this.drawYearLine(this.$refs.b,lastData,currentData);
            });
          }else {
            this.cls1= 'active';
            this.cls2= 'default';
            this.type1 = 1;
            getQuery1(this.value1).then(response => {
              let array = response.data;
              let lastData = this.getMonthData(array[0]);
              let currentData = this.getMonthData(array[1]);
              this.drawMonthLine(this.$refs.b,lastData,currentData);
            });
          }
        }
      } else if (type === 1){
        if (val === 1){
          if (this.cls3 === 'active'){
            this.cls3= 'default';
            this.cls4= 'active';
            this.type2 = 2;
            getQuery4(this.value2).then(response => {
              let array = response.data;
              let lastData = this.getYearData(array[0]);
              let currentData = this.getYearData(array[1]);
              this.drawYearLine(this.$refs.c,lastData,currentData);
            });
          }else {
            this.cls3= 'active';
            this.cls4= 'default';
            this.type2 = 1;
            getQuery3(this.value2).then(response => {
              let array = response.data;
              let lastData = this.getMonthData(array[0]);
              let currentData = this.getMonthData(array[1]);
              this.drawMonthLine(this.$refs.c,lastData,currentData);
            });
          }
        }else {
          if (this.cls4 === 'default'){
            this.cls3= 'default';
            this.cls4= 'active';
            this.type2 = 2;
            getQuery4(this.value2).then(response => {
              let array = response.data;
              let lastData = this.getYearData(array[0]);
              let currentData = this.getYearData(array[1]);
              this.drawYearLine(this.$refs.c,lastData,currentData);
            });
          }else {
            this.cls3= 'active';
            this.cls4= 'default';
            this.type2 = 1;
            getQuery3(this.value2).then(response => {
              let array = response.data;
              let lastData = this.getMonthData(array[0]);
              let currentData = this.getMonthData(array[1]);
              this.drawMonthLine(this.$refs.c,lastData,currentData);
            });
          }
        }
      }
    },
    drawMonthLine(obj,lastData,currentData){
      let myChart = this.$echarts.init(obj);
      let option = {
        xAxis: {
          type: 'category',
          name:'天',
          data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
        },
        legend: {
          data: ['上月', '本月']
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value',
          name:'单位(mm)'
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '3%',
          top:'15%',
          containLabel: true
        },
        series: [
          {
            data: lastData,
            type: 'line',
            name:'上月',
            itemStyle: {
              normal: {
                color: '#ff6f73', //改变折线点的颜色
                lineStyle: {
                  color: '#ff6f73' //改变折线颜色
                }
              }
            },
          },
          {
            data: currentData,
            type: 'line',
            name:'本月',
            itemStyle: {
              normal: {
                color: '#409EFF', //改变折线点的颜色
                lineStyle: {
                  color: '#409EFF' //改变折线颜色
                }
              }
            },
          }
        ]
      };
      myChart.setOption(option);
    },
    drawYearLine(obj,lastData,currentData){
      let myChart = this.$echarts.init(obj);
      let option = {
        xAxis: {
          type: 'category',
          name:'月',
          data: ['1','2','3','4','5','6','7','8','9','10','11','12']
        },
        legend: {
          data: ['去年', '今年']
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value',
          name:'单位(mm)'
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '3%',
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
                color: '#ff6f73', //改变折线点的颜色
                lineStyle: {
                  color: '#ff6f73' //改变折线颜色
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
                color: '#409EFF', //改变折线点的颜色
                lineStyle: {
                  color: '#409EFF' //改变折线颜色
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

      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '0%',
          left: '3%',
          //orient: 'vertical',
        },
        series: [
          {
            name: '年度闸泵开启统计',
            type: 'pie',
            left: '0%',
            center: ['45%', '50%'],
            radius: ['40%', '70%'],
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
            data:statData
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
            fontSize: 12,
            fontWeight:100,
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
            radius: ['30%', '50%'],
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
    }
  }
}
</script>

<style scoped lang="scss">
.top{
  width: 100%;
  float: left;
  height: 33%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 18px;
}
.mid{
  width: 100%;
  float: left;
  height: 33%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 18px;
}
.bottom{
  width: 100%;
  float: left;
  height: 33%;
  background-color: white;
  border-radius: 5px;
}
.titleBox {
  font-weight: bold;
  margin-left: 10px;
  float: left;
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
  width: 100%;
  float: left;
  border-bottom: 1px solid #606266;
  margin-bottom: 10px;
  padding: 15px 10px;
}
.leftBox{
  width: 300px;
  float: left;
  height: calc( 100vh - 130px);
}
.default{
  border-radius: 3px;
  cursor: pointer;
  border:1px solid #DEE1E8;
  font-size: 12px;
  text-align: center;
  float: left;
  width: 20px;
  height: 20px;
}
.active{
  border-radius: 3px;
  color: white;
  cursor: pointer;
  border:1px solid #DEE1E8;
  background-color: #409EFF;
  font-size: 12px;
  text-align: center;
  float: left;
  width: 20px;
  height: 20px;
}
</style>
