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
          <el-form-item label="站点名称" prop="siteName"  style="margin-left: 20px;">
            <el-select v-model="value1" multiple placeholder="请选择站点" style="overflow-y: auto;height: 32px;" @change="handleQuery">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="故障名称" prop="errorName" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.errorName"
              placeholder="请输入故障名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="故障级别" prop="errorName" style="margin-left: 20px;">
            <el-select v-model="queryParams.errorType" placeholder="请选择故障级别" style="float: left;width: 100%;" @change="handleQuery">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态" prop="errorName" style="margin-left: 20px;">
            <el-select v-model="value2" multiple placeholder="请选择任务状态" style="overflow-y: auto;height: 32px;" @change="handleQuery">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排查时间" prop="assignTime"  style="margin-left: 20px;">
            <el-date-picker
              v-model="date1"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="排查开始日期"
              end-placeholder="排查结束日期"  size="small"  @change="handleQuery"></el-date-picker>
          </el-form-item>
          <el-form-item label="维修时间" prop="repairTime"  style="margin-left: 20px;">
            <el-date-picker
              v-model="date2"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="排查开始日期"
              end-placeholder="排查结束日期"  size="small"  @change="handleQuery"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery()">查询</el-button>
            <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery()">重置</el-button>
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="small"
              style="float: left;margin-left: 20px;"
              @click="handleAdd"
              v-if="false"
              v-hasPermi="['tool:task:add']"
            >新增</el-button>
            <el-button type="warning" plain icon="el-icon-download" size="small" style="float: left;margin-left: 20px;"
                       @click="handleExport"
            >导出
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 20px;margin-left:20px;">
        <el-table v-loading="loading" :data="repairList" stripe
                  :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column label="站点名称" align="center" prop="siteName" />
          <el-table-column label="故障名称" align="center" prop="errorName" />
          <el-table-column label="故障类别" align="center" prop="errorType" :formatter = "formatErrorType"/>
          <el-table-column label="排查时间" align="center" prop="assignTime" width="180"/>
          <el-table-column label="维修时间" align="center" prop="repairTime" />
          <el-table-column label="上传图片" align="center" prop="repairImage" width="100">
            <template slot-scope="scope">
              <image-preview :src="scope.row.repairImage" :width="50" :height="50"/>
            </template>
          </el-table-column>
          <el-table-column label="任务状态" align="center" prop="repairStatus" >
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.repairStatus === '1'"
                plain
                size="small"
                style="color: #39B861"
              >已维修</el-button>
              <el-button
                type="text"
                v-if="scope.row.repairStatus === '0'"
                plain
                size="small"
                style="color: #F54F3B"
              >未维修</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['tool:repair:edit']"
              >维修</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['tool:repair:remove']"
              >删除</el-button>
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
      <div class="dialogBox">
        <!-- 添加或修改任务维修详情对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body style="font-weight: bold;text-align: center;">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="站点名称" prop="siteName">
              <el-select v-model="value3" placeholder="请选择站点" style="float: left;width: 100%;" disabled>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障名称" prop="errorName">
              <el-input v-model="form.errorName" placeholder="请输入故障名称" disabled />
            </el-form-item>
            <el-form-item label="故障级别" prop="errorName">
              <el-input v-model="form.errorName" placeholder="请输入故障级别" disabled  />
            </el-form-item>
            <el-form-item label="排查时间" prop="assignTime">
              <el-date-picker clearable
                              v-model="form.assignTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="请选择排查时间"  style="float: left;width: 100%" disabled>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="维修时间" prop="repairTime">
              <el-date-picker clearable
                              v-model="form.repairTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="请选择维修时间" style="float: left;width: 100%" >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="上传图片" prop="repairImage">
              <image-upload v-model="form.repairImage"/>
            </el-form-item>
            <el-form-item label="上传附件" prop="repairFile">
              <file-upload v-model:value="form.repairFile" :file-size="100"></file-upload>
            </el-form-item>
            <el-form-item label="是否维修" prop="repairImage" style="text-align: left;">
              <el-radio v-model="form.repairStatus" label="1">已维修</el-radio>
              <el-radio v-model="form.repairStatus" label="0">未维修</el-radio>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>

        </el-dialog>
      </div>
    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import LeftBox from '@/views/task/LeftBox.vue'
import { listRepair, getRepair, delRepair, addRepair, updateRepair } from "@/api/task/repair";
import { getSite, getUser } from '@/api/task/task'
export default {
  name: 'manage',
  components: { HeaderBox,LeftBox },
  data() {
    return {
      date1:'',
      date2:'',
      value1:'',
      options:[],
      value2:'',
      options1:[{
        value: '1',
        label: '紧急'
      },
        {
          value: '2',
          label: '严重'
        },
        {
          value: '3',
          label: '一般'
        },
        {
          value: '4',
          label: '轻微'
        }],
      options2:[{label:'已维修',value:'1'},{label:'未维修',value:'0'}],
      value3:'',
      active:'10',
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
      // 任务维修详情表格数据
      repairList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        siteId:null,
        siteName:null,
        errorName: null,
        errorType: null,
        assignStartTime: null,
        assignEndTime: null,
        repairStartTime: null,
        repairEndTime: null,
        repairImage: null,
        repairStatus: null,
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
    getSite().then(response =>{
      this.options = response.data;
      // console.log(response.data)
    });
  },
  methods:{
    formatErrorType(row){
      let errorType = row.errorType;
      if (errorType){
          let v = parseInt(errorType);
        if (v === 1){
          return '紧急';
        }
        if (v === 2){
          return '严重';
        }
        if (v === 3){
          return '一般';
        }
        if (v === 4){
          return '轻微';
        }
      }
      return '未知';
    },
    /** 查询任务维修详情列表 */
    getList() {
      this.loading = true;
      if (this.date1){
        let v = this.date1[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams.assignStartTime=v;
        v = this.date1[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams.assignEndTime=v;
      }
      if (this.date2){
        let v = this.date2[0]
        v = v.replace("00:00:00","00:00:01");
        this.queryParams.repairStartTime=v;
        v = this.date2[1];
        v = v.replace("00:00:00","23:59:59");
        this.queryParams.repairEndTime=v;
      }
      if (this.value1){
        this.queryParams.siteId = this.value1.toString();
      }
      if (this.value2){
        this.queryParams.repairStatus=this.value2.toString();
      }
      listRepair(this.queryParams).then(response => {
        this.repairList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        siteId: null,
        siteName: null,
        errorName: null,
        errorType: null,
        assignTime: null,
        repairTime: null,
        repairImage: null,
        repairStatus: null,
        longitude: null,
        latitude: null,
        deviceName: null,
        deviceId: null,
        createTime: null,
        updateTime: null,
        createBy: null,
        updateBy: null,
        deleteFlag: null
      };
      this.resetForm("form");
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
          errorName: null,
          errorType: null,
          assignStartTime: null,
          assignEndTime: null,
          repairStartTime: null,
          repairEndTime: null,
          repairImage: null,
          repairStatus: null,
      };
      this.value1='';
      this.value2='';
      this.date1='';
      this.date2='';
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加任务维修详情";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getRepair(id).then(response => {
        this.form = response.data;
        this.value3 = this.form.siteId;
        this.open = true;
        this.title = "任务维修";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.siteId = this.value3;
          if (this.form.id != null) {
            updateRepair(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRepair(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除任务维修详情编号为"' + ids + '"的数据项？').then(function() {
        return delRepair(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tool/repair/export', {
        ...this.queryParams
      }, `repair_${new Date().getTime()}.xlsx`)
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
