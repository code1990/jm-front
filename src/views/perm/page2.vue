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
      <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 40px; ">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="用户名称" prop="userName" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber" style="margin-left: 20px;">
            <el-input
              v-model="queryParams.phonenumber"
              placeholder="请输入手机号码"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
<!--          <el-form-item label="状态" prop="status" style="margin-left: 20px;">-->
<!--            <el-select-->
<!--              v-model="queryParams.status"-->
<!--              placeholder="用户状态"-->
<!--              clearable-->
<!--              style="width: 240px"-->
<!--            >-->
<!--              <el-option-->
<!--                v-for="dict in dict.type.sys_normal_disable"-->
<!--                :key="dict.value"-->
<!--                :label="dict.label"-->
<!--                :value="dict.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="创建时间"  style="margin-left: 20px;">
            <el-date-picker
              v-model="dateRange"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery()">查询</el-button>
            <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery()">重置</el-button>
            <el-button
              type="warning"
              plain
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
              v-hasPermi="['system:user:add']"
              style="margin-left: 20px;"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 30px;margin-left:20px;">
        <el-table
          :data="userList"
          stripe
          :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100"
          >
          </el-table-column>
<!--          <el-table-column label="用户编号" align="center" key="userId" prop="userId" v-if="columns[0].visible" />-->
          <el-table-column label="用户名称" align="center" key="userName" prop="userName" v-if="columns[1].visible" :show-overflow-tooltip="true" />
<!--          <el-table-column label="用户昵称" align="center" key="nickName" prop="nickName" v-if="columns[2].visible" :show-overflow-tooltip="true" />-->
          <el-table-column label="角色名" align="center" key="roleName" prop="roleName" v-if="columns[3].visible" :show-overflow-tooltip="true" />
          <el-table-column label="部门" align="center" key="remark" prop="remark" v-if="columns[3].visible" :show-overflow-tooltip="true" />
          <el-table-column label="联系电话" align="center" key="phonenumber" prop="phonenumber" v-if="columns[4].visible"  />
<!--          <el-table-column label="状态" align="center" key="status" v-if="columns[5].visible">-->
<!--            <template slot-scope="scope">-->
<!--              <el-switch-->
<!--                v-model="scope.row.status"-->
<!--                active-value="0"-->
<!--                inactive-value="1"-->
<!--                @change="handleStatusChange(scope.row)"-->
<!--              ></el-switch>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[6].visible" >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope" v-if="scope.row.userId !== 1">
              <el-button
                size="small"
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >修改</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
              >删除</el-button>
<!--              <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:user:resetPwd', 'system:user:edit']">-->
<!--                <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item command="handleResetPwd" icon="el-icon-key"-->
<!--                                    v-hasPermi="['system:user:resetPwd']">重置密码</el-dropdown-item>-->
<!--                  <el-dropdown-item command="handleAuthRole" icon="el-icon-circle-check"-->
<!--                                    v-hasPermi="['system:user:edit']">分配角色</el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--              </el-dropdown>-->
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
      <!-- 添加或修改用户配置对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body  style="text-align: center;font-weight: bold;">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名称" maxlength="30" />
          </el-form-item>
          <el-form-item label="角色名称" prop="nickName">
            <el-select v-model="form.roleIds" multiple placeholder="请选择角色" style="width: 100%;">
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
                :disabled="item.status == 1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称" prop="remark">
            <el-input v-model="form.remark"  placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11" />
          </el-form-item>
          <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码" type="password" maxlength="20" show-password/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -30px;text-align: center;">
          <el-button type="primary" @click="submitForm">保 存</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </el-main>
</div>
</template>
<script>
import HeaderBox from '@/views/home/HeaderBox.vue'
import LeftBox from '@/views/perm/LeftBox.vue'
import { listUser, getUser, delUser, addUser, updateUser, resetUserPwd, changeUserStatus, deptTreeSelect } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: 'page-2',
  components: { HeaderBox,LeftBox },
  dicts: ['sys_normal_disable', 'sys_user_sex'],
  data() {
    return {
      active:'8',
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
      value: '1',
      date: '',
      tableData: [],
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
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
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
      // 列信息
      columns: [
        { key: 0, label: `用户编号`, visible: true },
        { key: 1, label: `用户名称`, visible: true },
        { key: 2, label: `用户昵称`, visible: true },
        { key: 3, label: `部门`, visible: true },
        { key: 4, label: `手机号码`, visible: true },
        { key: 5, label: `状态`, visible: true },
        { key: 6, label: `创建时间`, visible: true }
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        // nickName: [
        //   { required: true, message: "用户昵称不能为空", trigger: "blur" }
        // ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
          { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {
    this.handleQuery();
  },
  created() {
    this.getList();
    this.getDeptTree();
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
  },
  methods:{
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      deptTreeSelect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.handleQuery();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.userName + '"用户吗？').then(function() {
        return changeUserStatus(row.userId, row.status);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.status = row.status === "0" ? "1" : "0";
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: []
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
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.deptId = undefined;
      this.$refs.tree.setCurrentKey(null);
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // // 更多操作触发
    // handleCommand(command, row) {
    //   switch (command) {
    //     case "handleResetPwd":
    //       this.handleResetPwd(row);
    //       break;
    //     case "handleAuthRole":
    //       this.handleAuthRole(row);
    //       break;
    //     default:
    //       break;
    //   }
    // },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getUser().then(response => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = "用户管理-新增";
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.$set(this.form, "postIds", response.postIds);
        this.$set(this.form, "roleIds", response.roleIds);
        this.open = true;
        this.title = "用户管理-修改";
        this.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
        inputValidator: (value) => {
          if (/<|>|"|'|\||\\/.test(value)) {
            return "不能包含非法字符：< > \" ' \\\ |"
          }
        },
      }).then(({ value }) => {
        resetUserPwd(row.userId, value).then(response => {
          this.$modal.msgSuccess("修改成功，新密码是：" + value);
        });
      }).catch(() => {});
    },
    /** 分配角色操作 */
    handleAuthRole: function(row) {
      const userId = row.userId;
      this.$router.push("/system/user-auth/role/" + userId);
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != undefined) {
            this.form.nickName=this.form.userName;
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.nickName=this.form.userName;
            addUser(this.form).then(response => {
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
      const userIds = row.userId || this.ids;
      this.$modal.confirm('是否确认删除用户编号为"' + userIds + '"的数据项？').then(function() {
        return delUser(userIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/user/importTemplate', {
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
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
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
::v-deep .searchBox .el-form-item__label{
  font-weight: normal;
}
</style>
