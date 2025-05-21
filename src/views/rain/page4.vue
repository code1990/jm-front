<template>
  <div>
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox :name="false"></HeaderBox>
    </el-header>
    <el-aside class="aside" style="width: 12%;">
      <LeftBox :active="active"></LeftBox>
    </el-aside>
    <el-main class="main">
      <div  style="width: 100%;height: 100%;float: left;margin-left: 0px;background-color: white;"  v-loading="loading">
          <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 40px; ">
            <el-select v-model="queryParams.deviceId" placeholder="请选择" size="small" style="float: left;margin-left: 20px;" @change="handleQuery">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
                v-model="queryParams.dateStr"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择日期" size="small" style="float: left;margin-left: 20px;" @change="handleQuery">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery()">查询</el-button>
            <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery()">重置</el-button>
            <el-button type="warning"  plain icon="el-icon-download" size="small" style="float: left;margin-left: 20px;"
                       @click="handleExport"
            >导出
            </el-button>
          </div>
          <div class="lineBox"  style="float: left;width: 100%;">
            <div id="lineChart" style="width: 100%;height: 300px;"></div>
          </div>
          <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 20px;margin-left:20px;">
            <el-table
                :data="rainList"
                stripe
                :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
                style="width: 100%">
              <el-table-column
                  type="index"
                  align="center"
                  label="序号"
                  width="100">
              </el-table-column>
              <el-table-column
                  prop="deviceName"
                  label="设备名称"
                  align="center"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="v1"
                  align="center"
                  label="1时">
              </el-table-column>
              <el-table-column
                  prop="v2"
                  align="center"
                  label="2时">
              </el-table-column>
              <el-table-column
                  prop="v3"
                  align="center"
                  label="3时">
              </el-table-column>
              <el-table-column
                  prop="v4"
                  align="center"
                  label="4时">
              </el-table-column>
              <el-table-column
                  prop="v5"
                  align="center"
                  label="5时">
              </el-table-column>
              <el-table-column
                  prop="v6"
                  align="center"
                  label="6时">
              </el-table-column>
              <el-table-column
                  prop="v7"
                  align="center"
                  label="7时">
              </el-table-column>
              <el-table-column
                  prop="v8"
                  align="center"
                  label="8时">
              </el-table-column>
              <el-table-column
                  prop="v9"
                  align="center"
                  label="9时">
              </el-table-column>
              <el-table-column
                  prop="v10"
                  align="center"
                  label="10时">
              </el-table-column>
              <el-table-column
                  prop="v11"
                  align="center"
                  label="11时">
              </el-table-column>
              <el-table-column
                  prop="v12"
                  align="center"
                  label="12时">
              </el-table-column>
              <el-table-column
                  prop="v13"
                  align="center"
                  label="13时">
              </el-table-column>
              <el-table-column
                  prop="v14"
                  align="center"
                  label="14时">
              </el-table-column>
              <el-table-column
                  prop="v15"
                  align="center"
                  label="15时">
              </el-table-column>
              <el-table-column
                  prop="v16"
                  align="center"
                  label="16时">
              </el-table-column>
              <el-table-column
                  prop="v17"
                  align="center"
                  label="17时">
              </el-table-column>
              <el-table-column
                  prop="v18"
                  align="center"
                  label="18时">
              </el-table-column>
              <el-table-column
                  prop="v19"
                  align="center"
                  label="19时">
              </el-table-column>
              <el-table-column
                  prop="v20"
                  align="center"
                  label="20时">
              </el-table-column>
              <el-table-column
                  prop="v21"
                  align="center"
                  label="21时">
              </el-table-column>
              <el-table-column
                  prop="v22"
                  align="center"
                  label="22时">
              </el-table-column>
              <el-table-column
                  prop="v23"
                  align="center"
                  label="23时">
              </el-table-column>
              <el-table-column
                  prop="v24"
                  align="center"
                  label="24时">
              </el-table-column>
            </el-table>
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
export default {
  name: "Page-4",
  components: { LeftBox, HeaderBox },
  data() {
    return {
      active:'4',
      loading:false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      // value: '1',
      date:'',
      rainList:[],
      queryParams: {
        type: 1,
        dateStr: null,
        deviceId: null,
      },
      tableData: [{
        name: '西村',
        v1: 1,
        v2: 2,
        v3: 3,
        v4: 4,
        v5: 5,
        v6: 6,
        v7: 7,
        v8: 8,
        v9: 9,
        v10: 10,
        v11: 11,
        v12: 12,
        v13: 13,
        v14: 14,
        v15: 15,
        v16: 16,
        v17: 17,
        v18: 18,
        v19: 19,
        v20: 20,
        v21: 21,
        v22: 22,
        v23: 23,
        v24: 24,
      }, {
        name: '西村',
        v1: 1,
        v2: 2,
        v3: 3,
        v4: 4,
        v5: 5,
        v6: 6,
        v7: 7,
        v8: 8,
        v9: 9,
        v10: 10,
        v11: 11,
        v12: 12,
        v13: 13,
        v14: 14,
        v15: 15,
        v16: 16,
        v17: 17,
        v18: 18,
        v19: 19,
        v20: 20,
        v21: 21,
        v22: 22,
        v23: 23,
        v24: 24,
      }, {
        name: '西村',
        v1: 1,
        v2: 2,
        v3: 3,
        v4: 4,
        v5: 5,
        v6: 6,
        v7: 7,
        v8: 8,
        v9: 9,
        v10: 10,
        v11: 11,
        v12: 12,
        v13: 13,
        v14: 14,
        v15: 15,
        v16: 16,
        v17: 17,
        v18: 18,
        v19: 19,
        v20: 20,
        v21: 21,
        v22: 22,
        v23: 23,
        v24: 24,
      }, {
        name: '西村',
        v1: 1,
        v2: 2,
        v3: 3,
        v4: 4,
        v5: 5,
        v6: 6,
        v7: 7,
        v8: 8,
        v9: 9,
        v10: 10,
        v11: 11,
        v12: 12,
        v13: 13,
        v14: 14,
        v15: 15,
        v16: 16,
        v17: 17,
        v18: 18,
        v19: 19,
        v20: 20,
        v21: 21,
        v22: 22,
        v23: 23,
        v24: 24,
      }]
    }
  },
  mounted() {
    let routerId = this.$route.params.deviceId;
    // console.log()
    // this.drawLineChart();
    this.loading = true;
    dict(null).then(response => {
      //console.log(response)
      this.options =response.data;
      if (routerId){
        this.queryParams.deviceId = routerId;
      }else {
        this.queryParams.deviceId = response.data[0].value;
      }
    });
    this.handleQuery();
    query1({  }).then(response => {
      //console.log(response)
      this.rainList =response.data;
      this.loading = false;
    });

  },
  methods:{
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
        this.drawLineChart(data);
        this.loading = false;
      });
    },
    drawLineChart(data){
      echarts.dispose(document.getElementById('lineChart'))
      var chartDom = document.getElementById('lineChart');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时','24时']
          // data: xData
        },
        yAxis: {
          type: 'value',
          splitLine: {                                //网格线
            show: true,                                  //是否显示
            lineStyle: {                                //网格线样式
              color: '#D6DADD',                        //网格线颜色
              width: 1,                                //网格线的加粗程度
              type: 'dashed'                            //网格线类型
            }
          },
        },
        grid: {
          // show: true,                                 //是否显示图表背景网格
          left: '5%',                                    //图表距离容器左侧多少距离
          right: '3%',                                //图表距离容器右侧侧多少距离
          bottom: '10%',                              //图表距离容器上面多少距离
          top: '10%',                                       //图表距离容器下面多少距离
          // containLabel: true,                     //防止标签溢出
          // backgroundColor:'#555555',     //网格背景色，默认透明
        },
        series: [
          {
            // data: [3,2,1,2,2,3,1,3,0,2,2,2,3,3,3,3,1,2,1,0,3,0,3,2],
            data: data,
            type: 'line',
            itemStyle: {
              color: '#A55562', // 线条颜色
            }
          }
        ]
      };

      option && myChart.setOption(option);
    }
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
</style>
