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
      <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 100px; ">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px"
        >
<!--          <el-form-item label="站点名称" prop="siteName"  style="margin-left: 20px;">-->
<!--            <el-input-->
<!--              v-model="queryParams.siteName"-->
<!--              placeholder="请输入站点名称"-->
<!--              clearable-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="设备名称" prop="deviceName">-->
<!--            <el-input-->
<!--              v-model="queryParams.deviceName"-->
<!--              placeholder="请输入设备名称"-->
<!--              clearable-->
<!--              @keyup.enter.native="handleQuery"-->
<!--            />-->
<!--          </el-form-item>-->

          <el-form-item label="操作用户" prop="operationUser"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.operationUser"
              placeholder="请输入操作用户"
              clearable
              @keyup.enter.native="handleQuery"
            />

          </el-form-item>
          <el-form-item label="角色名称" prop="roleName"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.roleName"
              placeholder="请输入角色名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="部门名称" prop="deptName"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.deptName"
              placeholder="请输入部门名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item style="width: 200px;"></el-form-item>
          <el-form-item label="操作内容" prop="deptName"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.operationContent"
              placeholder="请输入部门名称"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="操作时间" prop="operationTime"  style="margin-left: 20px;">
            <el-date-picker
              v-model="date1"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="操作开始日期"
              end-placeholder="操作结束日期"  size="small"></el-date-picker>
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
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="small"
              @click="handleExport"
              v-hasPermi="['tool:operation:export']"
            >导出</el-button>
            <el-button type="success" icon="el-icon-plus" size="small" plain style="float: left;margin-left: 20px;"
                       @click="handleAdd"
            >新建
            </el-button>
            <el-button
              type="info"
              plain
              icon="el-icon-upload2"
              size="small"
              @click="handleImport"
              v-hasPermi="['system:honor:import']"
            >导入</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 20px;margin-left:20px;">
        <el-table
          :data="operationList"
          stripe
          :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column label="操作时间" align="center" prop="operationTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.operationTime, '{y}-{m}-{d}') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作用户" align="center" prop="operationUser" />
          <el-table-column label="角色名称" align="center" prop="roleName" />
          <el-table-column label="部门名称" align="center" prop="deptName" />
          <el-table-column label="操作内容" align="center" prop="operationContent" show-overflow-tooltip  />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['tool:operation:edit']"
              >修改</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['tool:operation:remove']"
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

        <!-- 添加或修改操作日志信息对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="站点名称" prop="siteName">
              <el-select v-model="form.siteId"  placeholder="请选择站点"  style="float: left;width: 100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作时间" prop="operationTime">
              <el-date-picker clearable
                              v-model="form.operationTime"
                              type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="请选择操作时间"  style="width: 380px;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="操作用户" prop="operationUser">
              <el-select v-model="form.operationUserId" placeholder="请选择用户" style="float: left;width: 100%;">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item label="角色名称" prop="roleName">-->
<!--              <el-input v-model="form.roleName" placeholder="请输入角色名称" />-->
<!--            </el-form-item>-->
<!--            <el-form-item label="部门名称" prop="deptName">-->
<!--              <el-input v-model="form.deptName" placeholder="请输入部门名称" />-->
<!--            </el-form-item>-->
            <el-form-item label="操作内容">
              <editor v-model="form.operationContent" :min-height="192"/>
            </el-form-item>
            <el-form-item label="设备名称" prop="deviceName">
              <el-select v-model="form.deviceId" placeholder="请选择设备" style="float: left;width: 100%;">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传图片" prop="operationImage">
              <image-upload v-model="form.operationImage" />
            </el-form-item>
            <el-form-item label="上传附件" prop="operationFile">
              <file-upload v-model:value="form.operationFile" :file-size="100" :file-type="fileType"></file-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
          <el-upload
            ref="upload"
            :limit="1"
            accept=".xlsx, .xls"
            :headers="upload.headers"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
            :disabled="upload.isUploading"
            :on-progress="handleFileUploadProgress"
            :on-success="handleFileSuccess"
            :auto-upload="false"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的数据
              <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
            </div>
            <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFileForm">确 定</el-button>
            <el-button @click="upload.open = false">取 消</el-button>
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
import { listOperation, getOperation, delOperation, addOperation, updateOperation } from "@/api/operation/operation";
import { getSite, getUser } from '@/api/task/task'
import { getAllDevice } from '@/api/history/site'
import { getToken } from "@/utils/auth";

export default {
  name: 'manage',
  components: { HeaderBox,LeftBox },
  data() {
    return {
      date1:'',
      active:'10',
      // 遮罩层
      loading: false,
      fileType:["doc", "docx", "xls", "xlsx", "txt", "pdf"],
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
      // 操作日志信息表格数据
      operationList: [],
      options3:[],
      options2:[],
      options:[],
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
        operationStart: null,
        operationEnd: null,
        operationUser: null,
        operationUserId: null,
        roleName: null,
        roleId: null,
        deptName: null,
        deptId: null,
        operationContent: null,
        deviceName: null,
        deviceId: null,
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/tool/operation/importData"
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
    getUser().then(response =>{
      this.options2 = response.data;
    });
    getAllDevice().then(response =>{
      this.options3 = response.data;
      // console.error(response.data)
    });
  },
  methods:{
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "数据导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('tool/operation/exportTemplate', {
      }, `user_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    /** 查询操作日志信息列表 */
      getList() {
        this.loading = true;
        if (this.date1){
          let v = this.date1[0]
          v = v.replace("00:00:00","00:00:01");
          this.queryParams.operationStart=v;
          v = this.date1[1];
          v = v.replace("00:00:00","23:59:59");
          this.queryParams.operationEnd=v;
        }
        listOperation(this.queryParams).then(response => {
          this.operationList = response.rows;
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
          operationUser: null,
          operationUserId: null,
          roleName: null,
          roleId: null,
          deptName: null,
          deptId: null,
          operationContent: null,
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
            siteId: null,
            siteName: null,
            operationStart: null,
            operationEnd: null,
            operationUser: null,
            operationUserId: null,
            roleName: null,
            roleId: null,
            deptName: null,
            deptId: null,
            operationContent: null,
            deviceName: null,
            deviceId: null,
        };
        this.date1 = '';
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
        this.title = "添加值班登记信息";
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getOperation(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改值班登记信息";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateOperation(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addOperation(this.form).then(response => {
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
        this.$modal.confirm('是否确认删除操作日志信息编号为"' + ids + '"的数据项？').then(function() {
          return delOperation(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        }).catch(() => {});
      },
      /** 导出按钮操作 */
      handleExport() {
        this.download('tool/operation/export', {
          ...this.queryParams
        }, `operation_${new Date().getTime()}.xlsx`)
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
  //width: 86px !important;
}
</style>
