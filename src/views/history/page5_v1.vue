<template>
  <div>
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox :name="false"></HeaderBox>
    </el-header>
    <el-aside class="aside" style="width: 12%;">
      <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
    </el-aside>
    <el-main class="main">
      <div  style="width: 100%; background-color: white; float: left;  border-radius: 5px; height: 89.4vh;"  v-loading="loading">
        <div class="tipBox">
          <div style="width: 3px;height: 20px;background-color: #1E7AD8;float: left;"></div>
          <div style="margin-left: 15px;font-size: 20px;font-weight: bold;margin-top: -4px;">泵站运行运行记录</div>
        </div>

        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 120px;border-bottom:1px solid #D6E7F7; ">
          <el-form :model="queryParams1" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="监测要素" prop="deviceId"  style="margin-left: 20px;">
              <el-checkbox-group v-model="checkList" @change="handleChange">
                <el-checkbox label="1">耗能信息</el-checkbox>
                <el-checkbox label="2">内河水位</el-checkbox>
                <el-checkbox label="3">外河水位</el-checkbox>
                <el-checkbox label="4">雨量信息</el-checkbox>
                <el-checkbox label="5">开启时间</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item  prop="deviceId"  style="width: 600px;"></el-form-item>
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
        <div  style="height: 130vh;background-color: white;">
          <div id="main1" v-show="check1" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main2" v-show="check2" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main3" v-show="check3" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main4" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main5" v-show="check4" style="width: 100%;height: 200px;float: left;"></div>
          <div id="main6" v-show="check5" style="width: 100%;height: 200px;float: left;"></div>
        </div>
      </div>

      </el-main>
  </div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import * as echarts from 'echarts';
import { query1, dict, query2 } from '@/api/rain/rain'
import LeftBox from '@/views/history/LeftBox.vue'
import { getSiteDay } from '@/api/history/site'

export default {
  name: "Page-4",
  components: { LeftBox, HeaderBox },
  data() {
    return {
      active:'7',
      showSearch: true,
      loading:false,
      // value: '1',
      date:'',
      date1:'',
      check1:true,
      check2:true,
      check3:true,
      check4:true,
      check5:true,
      rainList:[],
      queryParams: {
        type: 1,
        dateStr: null,
        deviceId: null,
      },
      stationList:[
        {
          "name": "水泵机1号",
          "type": 1,
          "value": "3f79a090a42c4eb4a1779892a46fc5ca"
        }, {
          "name": "水泵机2号",
          "type": 1,
          "value": "7f28017c77b846da9130303004ab5e42"
        }, {
          "name": "水泵机3号",
          "type": 1,
          "value": "74bd441aa7f44956926623007577ea71"
        }, {
          "name": "水泵机4号",
          "type": 1,
          "value": "051635b9aa4c47af935f71fb62828f42"
        }, {
          "name": "1号清污机",
          "type": 2,
          "value": "7e68efbe921a42d0821debad06a32da6"
        }, {
          "name": "2号清污机",
          "type": 2,
          "value": "8a0cea1d39d4443899a739abd19cee3d"
        }, {
          "name": "3号清污机",
          "type": 2,
          "value": "932a1813d0894555af2e02fc9c44e04a"
        }, {
          "name": "4号清污机",
          "type": 2,
          "value": "9e4a3236ca4040d98e9b959347372a25"
        }, {
          "name": "皮带机1",
          "type": 3,
          "value": "94e5e2e891a34cdd94be3e6e18e26377"
        }
        /* , {
          "name": "皮带机2",
          "type": 3,
          "value": "f9fb417ff6d54ff79d3bdb2311cd9318"
        } */
      ],
      checkList: ["1","2","3","4","5"],
      queryParams1: {
        siteId: null,
        deviceId: null,
        statTime:null,
        endTime:null,
        siteType:'1',
      },
    }
  },
  mounted() {
    let routerId = this.$route.params.deviceId;
    // console.log()
    // this.drawLineChart();
    // this.loading = true;
    // dict(null).then(response => {
    //   //console.log(response)
    //   this.options =response.data;
    //   if (routerId){
    //     this.queryParams.deviceId = routerId;
    //   }else {
    //     this.queryParams.deviceId = response.data[0].value;
    //   }
    // });
    this.queryParams1.deviceId= '3f79a090a42c4eb4a1779892a46fc5ca';
    this.handleQuery1();
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
    getChildMsg(val){
      this.queryParams1.deviceId = this.stationList[val-1].value;
      console.error(this.queryParams1.deviceId)
      this.handleQuery1();
      // console.error(val);
    },
    drawRightChart(obj){
      this.drawChart(obj.data,obj.date);
      this.drawChart2('main2','内河水位','内河水位(mm)',obj.data[4],obj.date,'#96D379');
      this.drawChart2('main3','外河水位','外河水位(mm)',obj.data[5],obj.date,'#FBCF5A');
      this.drawChart2('main4','雨量信息','瞬时雨量(mm)',obj.data[6],obj.date,'#5674CD');
      this.drawChart2('main5','累计雨量','累计雨量(mm)',obj.data[7],obj.date,'#E62100');
      this.drawChart2('main6','开启时间','开启时间(小时)',obj.data[3],obj.date,'#3FCFF7');
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
      // for(let i=0;i<array.length;i++){
      //   let v = parseInt(array[i]);
      //
      // }
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
    handleQuery(){
      this.loading = true;
      //console.log(this.queryParams)
      //console.log(this.date)
      query1(this.queryParams).then(response => {
        let array = response.data;
        let data = [];
        for(let i= 0;i<array.length;i++){
          let obj = array[i];
          data.push(obj.v1);
          data.push(obj.v2);
          data.push(obj.v3);
          data.push(obj.v4);
          data.push(obj.v5);
          data.push(obj.v6);
          data.push(obj.v7);
          data.push(obj.v8);
          data.push(obj.v9);
          data.push(obj.v10);
          data.push(obj.v11);
          data.push(obj.v12);
          data.push(obj.v13);
          data.push(obj.v14);
          data.push(obj.v15);
          data.push(obj.v16);
          data.push(obj.v17);
          data.push(obj.v18);
          data.push(obj.v19);
          data.push(obj.v20);
          data.push(obj.v21);
          data.push(obj.v22);
          data.push(obj.v23);
          data.push(obj.v24);
          break;
        }
        //this.drawLineChart(data);
        this.loading = false;
      });
    },
    drawChart(array,date){
      var chartDom = document.getElementById('main1');
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
          data: ['电流', '电压', '总功率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'20%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          name:'天',
          data: date
        },
        yAxis: {
          type: 'value',
          name:'耗能(a/v/kwh)',
        },
        series: [
          {
            name: '电流',
            type: 'line',
            stack: 'Total',
            data: array[1]
          },
          {
            name: '电压',
            type: 'line',
            stack: 'Total',
            data: array[0]
          },
          {
            name: '总功率',
            type: 'line',
            stack: 'Total',
            data: array[2]
          },
        ]
      };
      option && myChart.setOption(option);
    },
    drawChart2(id,type,yTitle,array,date,color){
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
