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
          <el-form-item label="站点名称" prop="siteName"   style="margin-left: 20px;">
            <el-select v-model="value1" multiple placeholder="请选择站点" style="overflow-y: auto;height: 32px;" @change="getList">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称" prop="deviceName"   style="margin-left: 20px;">
            <el-input
              v-model="queryParams.deviceName"
              placeholder="请输入设备名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="目标开度" prop="targetAngle"   style="margin-left: 20px;">
            <el-input
              v-model="queryParams.targetAngle"
              placeholder="请输入目标开度"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="结束开度" prop="endAngle"   style="margin-left: 20px;">
            <el-input
              v-model="queryParams.endAngle"
              placeholder="请输入结束开度"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="启动操作人" prop="startUser"   style="margin-left: 20px;">
            <el-input
              v-model="queryParams.startUser"
              placeholder="请输入启动操作人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="停止操作人" prop="endUser"   style="margin-left: 20px;">
            <el-input
              v-model="queryParams.endUser"
              placeholder="请输入停止操作人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
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
          :data="siteList"
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
          <el-table-column label="目标开度" align="center" prop="targetAngle" />
          <el-table-column label="结束开度" align="center" prop="endAngle" />
          <el-table-column label="启动操作人" align="center" prop="startUser" />
          <el-table-column label="停止操作人" align="center" prop="endUser" />
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
import { getDict, listSite } from '@/api/history/site'
import LeftBox from '@/views/history/LeftBox.vue'
export default {
  name: 'page-2',
  components: { LeftBox, HeaderBox },
  data() {
    return {
      options: [],
      value1:'',
      loading:false,
      active:'7',
      value: '1',
      // 遮罩层
      // loading: true,
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
      // 站点监测信息表格数据
      siteList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        siteType:'2',
        siteId:null,
        pageNum: 1,
        pageSize: 10,
        siteName: null,
        deviceName: null,
        targetAngle: null,
        endAngle: null,
        startUser: null,
        endUser: null,
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
    getDict('2').then(response => {
      this.options = response.data;
      //console.error(response.data);
    });
  },
  methods:{
    /** 查询站点监测信息列表 */

    getList() {
      this.loading = true;
      if (this.value1){
        this.queryParams.siteId = this.value1.toString();
      }
      listSite(this.queryParams).then(response => {
        this.siteList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.queryParams =  {
        siteType:'2',
        siteId:null,
        pageNum: 1,
        pageSize: 10,
        siteName: null,
        deviceName: null,
        targetAngle: null,
        endAngle: null,
        startUser: null,
        endUser: null,
      };
      this.value1 = null;
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/tool/site/export', {
        ...this.queryParams
      }, `site_${new Date().getTime()}.xlsx`)
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
  width: 86px !important;
}
</style>
