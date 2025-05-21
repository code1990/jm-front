<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div  style="width: 100%;height: 100%;float: left;margin-left: 0px;background-color: white;"  v-loading="loading">
      <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 115px; ">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="站点名称" prop="siteName" style="margin-left: 20px;">
            <el-select v-model="value1" multiple placeholder="请选择站点" style="overflow-y: auto;height: 32px;" @change="getList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.deviceName"
              placeholder="请输入设备名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="告警时间" prop="alarmTime" style="margin-left: 20px;">
            <el-date-picker
              v-model="date1"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="告警开始日期"
              end-placeholder="告警结束日期"  size="small"></el-date-picker>
          </el-form-item>
          <el-form-item style="width: 100px;"></el-form-item>
          <el-form-item label="告警状态" prop="alarmStatus" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.alarmStatus"
              placeholder="请输入告警状态"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="故障类型" prop="alarmType" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.alarmType"
              placeholder="请输入故障类型"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime" style="margin-left: 20px;">
            <el-date-picker
              v-model="date2"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="更新开始日期"
              end-placeholder="更新结束日期"  size="small"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery()">查询</el-button>
            <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery()">重置</el-button>
            <el-button type="warning" icon="el-icon-download" size="small" style="float: left;margin-left: 20px;"
                       @click="handleExport"
            >导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 20px;margin-left:20px;">
        <el-table
          :data="alarmList"
          stripe
          :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column label="站点名称" align="center" prop="siteName" />
          <el-table-column label="设备名称" align="center" prop="deviceName" />
          <el-table-column label="告警时间" align="center" prop="alarmTime" />
          <el-table-column label="告警状态" align="center" prop="alarmStatus" />
          <el-table-column label="故障类型" align="center" prop="alarmType" />
          <el-table-column label="更新时间" align="center" prop="updateTime" />
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import { listAlarm,getDict} from "@/api/history/alarm";
import LeftBox from '@/views/history/LeftBox.vue'
export default {
  name: 'page-3',
  components: { LeftBox, HeaderBox },
  data() {
    return {
      options: [],
      value1:'',
      loading:false,
      active:'7',
      value: '1',
      date1: '',
      date2: '',
      // 遮罩层
      //loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 告警详情信息表格数据
      alarmList: [{
        siteName:'西村站',
        deviceName:'雨量计1',
        alarmTime:'2023-01-02 12:23:23',
        alarmStatus:'设备故障',
        alarmType:'一级告警',
        updateTime:'2023-01-02 12:23:23',
      },
        {
          siteName:'西村站',
          deviceName:'雨量计1',
          alarmTime:'2023-01-02 12:23:23',
          alarmStatus:'设备故障',
          alarmType:'一级告警',
          updateTime:'2023-01-02 12:23:23',
        },
        {
          siteName:'西村站',
          deviceName:'雨量计1',
          alarmTime:'2023-01-02 12:23:23',
          alarmStatus:'设备故障',
          alarmType:'一级告警',
          updateTime:'2023-01-02 12:23:23',
        },],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        siteName: null,
        siteId: null,
        deviceName: null,
        alarmStart:null,
        alarmEnd:null,
        alarmStatus: null,
        alarmType: null,
        updateStart:null,
        updateEnd:null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
    }
  },
  created() {
    this.getList();
    getDict().then(response => {
      this.options = response.data;
      // console.error(response.data);
    });
  },
  methods:{
    /** 查询告警详情信息列表 */
    getList() {
      this.loading = true;
      if (this.date1){
        let v = this.date1[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams.alarmStart=v;
        v = this.date1[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams.alarmEnd=v;
      }
      if (this.date2){
        let v = this.date2[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams.updateStart=v;
        v = this.date2[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams.updateEnd=v;
      }
      if (this.value1){
        this.queryParams.siteId = this.value1.toString();
      }
      listAlarm(this.queryParams).then(response => {
        this.alarmList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams =  {
        pageNum: 1,
        pageSize: 10,
        siteName: null,
        siteId:null,
        deviceName: null,
        alarmTime: null,
        alarmStart:null,
        alarmEnd:null,
        alarmStatus: null,
        alarmType: null,
        updateTime: null,
        updateStart:null,
        updateEnd:null,
      };
      this.date1 = null;
      this.date2 = null;
      this.value1 = null;
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/tool/alarm/export', {
        ...this.queryParams
      }, `alarm_${new Date().getTime()}.xlsx`)
    },
    getChildMsg(key){
      console.error(key)
    }
  }
}
</script>

<style scoped lang="scss">
.theme-picker{

}
.aside{
  float: left;
  height: calc(100vh - 60px);
  padding: 0px;
}
.main{
  float: left;
  height:calc(100vh - 60px);
  background-color: #E5ECF5;
}
::v-deep .el-form-item__label{
  font-weight: normal;
}
</style>
