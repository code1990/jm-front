<template>
  <div>
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox :name="false"></HeaderBox>
    </el-header>
    <el-aside class="aside" style="width: 12%;">
      <LeftBox :active="active"></LeftBox>
    </el-aside>
    <el-main class="main">
      <div  style="width: 100%; background-color: white; float: left;  border-radius: 5px; height: 89.4vh;"  v-loading="loading">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">水雨情数据</div>
        </div>

        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 120px;border-bottom:1px solid #D6E7F7; ">
          <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="监测要素" prop="deviceId"  style="margin-left: 20px;">
              <el-checkbox-group v-model="checkList" @change="handleChange">
                <el-checkbox label="2">外河水位</el-checkbox>
                <el-checkbox label="3">内河水位</el-checkbox>
                <el-checkbox label="4">雨量信息</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="deviceId"  style="width: 50%;"></el-form-item>
            <el-form-item label="监测设备" prop="deviceId"  style="margin-left: 20px;">
              <el-select v-model="queryParams1.deviceId" placeholder="请选择设备" size="small" style="float: left;margin-left: 20px;" @change="handleQuery1">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="监测时间" prop="repairTime"  style="margin-left: 20px;">
              <el-date-picker
                v-model="date1"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="监测开始日期"
                end-placeholder="监测结束日期"  size="small"  @change="handleQuery1"></el-date-picker>
            </el-form-item>
            <el-form-item style="margin-left: 20px;">
              <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery1()">查询</el-button>
              <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery1()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div  style="overflow-y: auto;height: 100%;background-color: white;">
          <div id="main2" v-show="check2" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main3" v-show="check3" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main4" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main5" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
        </div>
      </div>

      </el-main>
  </div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import * as echarts from 'echarts';
import { query1, dict, query2 } from '@/api/rain/rain'
import LeftBox from '@/views/rain/LeftBox.vue'
import { getSiteDay } from '@/api/history/site'

export default {
  name: "Page-4",
  components: { LeftBox, HeaderBox },
  data() {
    return {
      active:'4',
      showSearch: true,
      loading:false,
      options: [],
      // value: '1',
      date:'',
      date1:'',
      check1:true,
      check2:true,
      check3:true,
      check4:true,
      check5:true,
      rainList:[],
      checkList: ["2","3","4"],
      queryParams1: {
        siteId: null,
        deviceId: null,
        statTime:null,
        endTime:null,
        siteType:'3',
      },
    }
  },
  created() {
    let routerId = this.$route.params.deviceId;
    dict(null).then(response => {
      //console.log(response)
      this.options =response.data;
      //console.error(this.options)
      if (routerId){
        this.queryParams1.deviceId = routerId;
      }else {
        this.queryParams1.deviceId = response.data[0].value;
      }
    });
  },
  mounted() {

    // console.log()
    // this.drawLineChart();
    this.loading = true;

    this.handleQuery1();
    this.loading=false;
    // query1({  }).then(response => {
    //   //console.log(response)
    //   this.rainList =response.data;
    //   this.loading = false;
    // });
    // getSiteDay(this.queryParams1).then(response => {
    //   let obj = response.data;
    //   // let array = response.data;
    //   this.drawRightChart(obj);
    // });
  },
  methods:{
    drawRightChart(obj){
      this.drawChart2('main2','外河水位','内河水位(mm)',obj.data[0],obj.date,'#FBCF5A');
      this.drawChart2('main3','内河水位','外河水位(mm)',obj.data[1],obj.date,'#96D379');
      this.drawChart2('main4','雨量信息','瞬时雨量(mm)',obj.data[2],obj.date,'#5674CD');
      this.drawChart2('main5','累计雨量','累计雨量(mm)',obj.data[3],obj.date,'#E62100');
    },
    handleChange(val){
      let array =val;
      for (let i = 1; i < 6; i++) {
        let flag = false;
        if (array.indexOf(''+i) !== -1){
          flag = true;
        }
        if (i === 1){
          this.check1 = flag;
        }
        if (i === 2){
          this.check2 = flag;
        }
        if (i === 3){
          this.check3 = flag;
        }
        if (i === 4){
          this.check4 = flag;
        }
        if (i === 5){
          this.check5 = flag;
        }
      }
      for(let i=0;i<array.length;i++){
        let v = parseInt(array[i]);

      }
      //console.log(val)
    },
    handleQuery1(){
      this.loading = true;
      if (this.date1){
        let v = this.date1[0]
        v = v.replace("00:00:00","").trim();
        this.queryParams1.startTime=v;
        v = this.date1[1];
        v = v.replace("00:00:00","").trim();
        this.queryParams1.endTime=v;
      }
      if (!this.queryParams1.deviceId && this.options.length>0 && this.options[0].value){
        this.queryParams1.deviceId = this.options[0].value;
      }
      //console.error(this.queryParams1)
      getSiteDay(this.queryParams1).then(response => {
        let obj = response.data;
        this.drawRightChart(obj);
      });
      this.loading = false;
    },
    resetQuery1(){

    },
    handleExport(){
      this.download('tool/rain/export', {
        ...this.queryParams
      }, `month_${new Date().getTime()}.xlsx`)
    },
    resetQuery(){
      this.queryParams= {
        type: 1,
        dateStr: null,
        deviceId: null,
      };
      this.handleQuery();
    },

    drawChart2(id,type,yTitle,array,date,color){
      echarts.dispose(document.getElementById(id));
      var chartDom = document.getElementById(id);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [type]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'20%',
          containLabel: true
        },
        color:[color],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name:'天',
          data: date
        },
        yAxis: {
          type: 'value',
          name:yTitle
        },
        series: [
          {
            name: type,
            type: 'line',
            stack: 'Total',
            data: array
          },
        ]
      };
      option && myChart.setOption(option);
    },
  }
}
</script>


<style scoped>
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
.tipBox{
  padding: 20px 20px 15px 20px;
  border-bottom:1px solid #D6E7F7;
}
</style>
