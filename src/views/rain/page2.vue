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
                type="year"
                value-format="yyyy"
                placeholder="请选择年" size="small" style="float: left;margin-left: 20px;" @change="handleQuery">
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
                  label="1月">
              </el-table-column>
              <el-table-column
                  prop="v2"
                  align="center"
                  label="2月">
              </el-table-column>
              <el-table-column
                  prop="v3"
                  align="center"
                  label="3月">
              </el-table-column>
              <el-table-column
                  prop="v4"
                  align="center"
                  label="4月">
              </el-table-column>
              <el-table-column
                  prop="v5"
                  align="center"
                  label="5月">
              </el-table-column>
              <el-table-column
                  prop="v6"
                  align="center"
                  label="6月">
              </el-table-column>
              <el-table-column
                  prop="v7"
                  align="center"
                  label="7月">
              </el-table-column>
              <el-table-column
                  prop="v8"
                  align="center"
                  label="8月">
              </el-table-column>
              <el-table-column
                  prop="v9"
                  align="center"
                  label="9月">
              </el-table-column>
              <el-table-column
                  prop="v10"
                  align="center"
                  label="10月">
              </el-table-column>
              <el-table-column
                  prop="v11"
                  align="center"
                  label="11月">
              </el-table-column>
              <el-table-column
                  prop="v12"
                  align="center"
                  label="12月">
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
import { query3,dict } from '@/api/rain/rain'
import LeftBox from '@/views/rain/LeftBox.vue'
export default {
  name: "Page-2",
  components: { LeftBox, HeaderBox },
  data() {
    return {
      active:'4',
      loading:false,
      options: [{
        value: '1',
        label: '西村'
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
      // date: '',
      rainList:[],
      queryParams: {
        type: 3,
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
      }]
    }
  },
  mounted() {
    //console.log(this.$route.params.deviceId)
    //this.drawLineChart();
    this.loading = true;
    dict(null).then(response => {
      //console.log(response)
      this.options =response.data;
      let v = response.data[0].value;
      if (this.$route.params.deviceId){
        v = this.$route.params.deviceId;
      }
      this.queryParams.deviceId = v;
    });
    this.handleQuery();
    query3({  }).then(response => {
      //console.log(response)
      this.rainList =response.data;
      this.loading = false;
    });
  },
  methods: {
    handleExport(){
      this.download('tool/rain/export', {
        ...this.queryParams
      }, `month_${new Date().getTime()}.xlsx`)
    },
    resetQuery() {
      this.queryParams= {
        type: 3,
        dateStr: null,
        deviceName: null,
      };
      this.handleQuery();
    },
    handleQuery() {
      this.loading = true;
      query3(this.queryParams).then(response => {
        let array = response.data;
        //console.log(array)
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
          break;
        }
        //console.log(data.length);
        this.drawLineChart(data);
        this.loading = false;
      });
    },
    drawLineChart(data) {
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
          data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
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
            // data: [8,19,20,27,37,9,3,10,2,28,6,16],
            data: data,
            type: 'bar',
            itemStyle: {
              color: '#FD7625', // 线条颜色
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
