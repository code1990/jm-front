<template>
<div>
  <el-header style="width: 100%;float: left;background-color: #196ABC;">
    <HeaderBox :name="false"></HeaderBox>
  </el-header>
  <el-aside class="aside" style="width: 12%;">
    <Sidebar2 @child-msg="getChildMsg" :active="active"></Sidebar2>
  </el-aside>
  <el-main class="main" style="width: 88%;">
    <div style="width: 100%;height: 100%;float: left;margin-left: 0px;background-color: white;" v-loading="loading">
      <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 115px; ">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px"
        >
          <el-form-item label="测流点名称" prop="siteName">
<!--            <el-input-->
<!--              v-model="queryParams.siteName"-->
<!--              placeholder="请输入测流点名称"-->
<!--              clearable-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
            <el-select v-model="value1" multiple placeholder="请选择站点" style="overflow-y: auto;height: 32px;" @change="handleQuery">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流速" prop="v1">
            <el-input
              v-model="queryParams.v1"
              placeholder="请输入流速"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="水位" prop="v2">
            <el-input
              v-model="queryParams.v2"
              placeholder="请输入水位"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="瞬时流量" prop="v3">
            <el-input
              v-model="queryParams.v3"
              placeholder="请输入瞬时流量"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="累计流量" prop="v4">
            <el-input
              v-model="queryParams.v4"
              placeholder="请输入累计流量"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="采集时间" prop="collectTime">
            <el-date-picker
              v-model="date1"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="采集开始日期"
              end-placeholder="采集结束日期"  size="small"></el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;"
                       @click="handleQuery()"
            >查询
            </el-button>
            <el-button icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;"
                       @click="resetQuery()"
            >重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 20px;margin-left:20px;">
        <el-table
          :data="pointList"
          stripe
          :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column label="测流点名称" align="center" prop="siteName" />
          <el-table-column label="流速(m/s)" align="center" prop="v1" />
          <el-table-column label="水位(m)" align="center" prop="v2" />
          <el-table-column label="瞬时流量(m³/s)" align="center" prop="v3" />
          <el-table-column label="累计流量(m³)" align="center" prop="v4" />
          <el-table-column label="采集时间" align="center" prop="collectTime" width="180">
<!--            <template slot-scope="scope">-->
<!--              <span>{{ parseTime(scope.row.collectTime, '{y}-{m}-{d}') }}</span>-->
<!--            </template>-->
          </el-table-column>
          <el-table-column label="统计" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="statMonth(scope.row)"
                v-hasPermi="['tool:point:edit']"
              >月度</el-button>
              <el-button
                size="small"
                type="primary"
                @click="statYear(scope.row)"
                v-hasPermi="['tool:point:remove']"
              >年度</el-button>
            </template>
          </el-table-column>
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
import Sidebar2 from '@/layout/components/Sidebar/SideBar2.vue'
import { listPoint } from "@/api/point/point";
import { dict } from '@/api/rain/rain'
export default {
  name: 'page',
  components: { HeaderBox,Sidebar2 },
  data() {
    return {
      value1:'',
      options:[],
      date1:'',
      active:'5',
      // 遮罩层
      loading: true,
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
      // 测流点信息表格数据
      pointList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        siteId: null,
        siteName: null,
        v1: null,
        v2: null,
        v3: null,
        v4: null,
        collectStart: null,
        collectEnd: null,
        longitude: null,
        latitude: null,
        deviceName: null,
        deviceId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询测流点信息列表 */
    getList() {
      this.loading = false;
      if (this.date1){
        let v = this.date1[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams.collectStart=v;
        v = this.date1[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams.collectEnd=v;
      }
      if (this.value1){
        this.queryParams.deviceId = this.value1.toString();
      }
      listPoint(this.queryParams).then(response => {
        this.pointList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      dict(null).then(response => {
        //console.log(response)
        this.options =response.data;
        let v = response.data[0].value;
        if (this.$route.params.deviceId){
          v = this.$route.params.deviceId;
        }
        this.queryParams.deviceId = v;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
          pageSize: 10,
          siteId: null,
          siteName: null,
          v1: null,
          v2: null,
          v3: null,
          v4: null,
          collectStart: null,
          collectEnd: null,
          longitude: null,
          latitude: null,
          deviceName: null,
          deviceId: null,
      }
      this.date1 = '';
      this.value1='';
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tool/point/export', {
        ...this.queryParams
      }, `point_${new Date().getTime()}.xlsx`)
    },
    statMonth(row){
      this.$router.push({
        name: 'rainMonth',
        params:{
          deviceId:row.deviceId,
        }
      });
      console.log(row)
    },
    statYear(row){
      this.$router.push({
        name: 'rainYear',
        params:{
          deviceId:row.deviceId,
        }
      });
      console.log(row)
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
  width: 100px !important;
}
</style>
