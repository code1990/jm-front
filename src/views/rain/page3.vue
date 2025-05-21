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
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择月" size="small" style="float: left;margin-left: 20px;" @change="handleQuery">
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
                  label="1日">
              </el-table-column>
              <el-table-column
                  prop="v2"
                  align="center"
                  label="2日">
              </el-table-column>
              <el-table-column
                  prop="v3"
                  align="center"
                  label="3日">
              </el-table-column>
              <el-table-column
                  prop="v4"
                  align="center"
                  label="4日">
              </el-table-column>
              <el-table-column
                  prop="v5"
                  align="center"
                  label="5日">
              </el-table-column>
              <el-table-column
                  prop="v6"
                  align="center"
                  label="6日">
              </el-table-column>
              <el-table-column
                  prop="v7"
                  align="center"
                  label="7日">
              </el-table-column>
              <el-table-column
                  prop="v8"
                  align="center"
                  label="8日">
              </el-table-column>
              <el-table-column
                  prop="v9"
                  align="center"
                  label="9日">
              </el-table-column>
              <el-table-column
                  prop="v10"
                  align="center"
                  label="10日">
              </el-table-column>
              <el-table-column
                  prop="v11"
                  align="center"
                  label="11日">
              </el-table-column>
              <el-table-column
                  prop="v12"
                  align="center"
                  label="12日">
              </el-table-column>
              <el-table-column
                  prop="v13"
                  align="center"
                  label="13日">
              </el-table-column>
              <el-table-column
                  prop="v14"
                  align="center"
                  label="14日">
              </el-table-column>
              <el-table-column
                  prop="v15"
                  align="center"
                  label="15日">
              </el-table-column>
              <el-table-column
                  prop="v16"
                  align="center"
                  label="16日">
              </el-table-column>
              <el-table-column
                  prop="v17"
                  align="center"
                  label="17日">
              </el-table-column>
              <el-table-column
                  prop="v18"
                  align="center"
                  label="18日">
              </el-table-column>
              <el-table-column
                  prop="v19"
                  align="center"
                  label="19日">
              </el-table-column>
              <el-table-column
                  prop="v20"
                  align="center"
                  label="20日">
              </el-table-column>
              <el-table-column
                  prop="v21"
                  align="center"
                  label="21日">
              </el-table-column>
              <el-table-column
                  prop="v22"
                  align="center"
                  label="22日">
              </el-table-column>
              <el-table-column
                  prop="v23"
                  align="center"
                  label="23日">
              </el-table-column>
              <el-table-column
                  prop="v24"
                  align="center"
                  label="24日">
              </el-table-column>
              <el-table-column
                  prop="v25"
                  align="center"
                  label="25日">
              </el-table-column>
              <el-table-column
                  prop="v26"
                  align="center"
                  label="26日">
              </el-table-column>
              <el-table-column
                  prop="v27"
                  align="center"
                  label="27日">
              </el-table-column>
              <el-table-column
                  prop="v28"
                  align="center"
                  label="28日">
              </el-table-column>
              <el-table-column
                  prop="v29"
                  align="center"
                  label="29日">
              </el-table-column>
              <el-table-column
                  prop="v30"
                  align="center"
                  label="30日">
              </el-table-column>
              <el-table-column
                  prop="v31"
                  align="center"
                  label="31日">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
  </div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import Sidebar2 from '@/layout/components/Sidebar/SideBar2.vue'
import * as echarts from 'echarts';
import { query2, dict } from '@/api/rain/rain'
import LeftBox from '@/views/rain/LeftBox.vue'
export default {
  name: "Page-3",
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
        type: 2,
        dateStr: null,
        deviceName: null,
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
        v25: 25,
        v26: 26,
        v27: 27,
        v28: 28,
        v29: 29,
        v30: 30,
        v31: 31,
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
        v25: 25,
        v26: 26,
        v27: 27,
        v28: 28,
        v29: 29,
        v30: 30,
        v31: 31,
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
        v25: 25,
        v26: 26,
        v27: 27,
        v28: 28,
        v29: 29,
        v30: 30,
        v31: 31,
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
        v25: 25,
        v26: 26,
        v27: 27,
        v28: 28,
        v29: 29,
        v30: 30,
        v31: 31,
      }]
    }
  },
  mounted() {
    // this.drawLineChart();
    //console.log(this.$route.params.deviceId)
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
    query2({  }).then(response => {
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
          type: 2,
          dateStr: null,
          deviceName: null,
      };
      this.handleQuery();
    },
    handleQuery() {
      this.loading = true;
      query2(this.queryParams).then(response => {
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
          data.push(obj.v25);
          data.push(obj.v26);
          data.push(obj.v27);
          data.push(obj.v28);
          data.push(obj.v29);
          data.push(obj.v30);
          data.push(obj.v31);
          break;
        }
        this.drawLineChart(data);
        this.loading = false;
      });
    },
    drawLineChart(data) {
      var chartDom = document.getElementById('lineChart');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
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
            // data: [2,0,2,0,0,0,1,3,1,3,2,3,2,2,3,1,2,3,2,0,0,3,3,3,0,2,1,1,2,1,1],
            data: data,
            type: 'bar',
            itemStyle: {
              color: '#8270FD', // 线条颜色
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
