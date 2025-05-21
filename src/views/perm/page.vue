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
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
          <el-form-item label="角色名称" prop="roleName"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.roleName"
              placeholder="请输入角色名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="权限字符" prop="roleKey"  style="margin-left: 20px;">
            <el-input
              v-model="queryParams.roleKey"
              placeholder="请输入权限字符"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
<!--          <el-form-item label="状态" prop="status">-->
<!--            <el-select-->
<!--              v-model="queryParams.status"-->
<!--              placeholder="角色状态"-->
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
          <el-form-item>
<!--            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
            <el-button type="primary" icon="el-icon-search" size="small" style="float: left;margin-left: 20px;" @click="handleQuery()">查询</el-button>
            <el-button  icon="el-icon-refresh" size="small" style="float: left;margin-left: 20px;" @click="resetQuery()">重置</el-button>
            <el-button
              type="warning"
              plain
              icon="el-icon-plus"
              size="small"
              @click="handleAdd"
              v-hasPermi="['system:role:add']"
              style="margin-left: 20px;"
            >新增</el-button>
          </el-form-item>

        </el-form>

<!--        <el-row :gutter="10" class="mb8" style="margin-left: 15px;">-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              plain-->
<!--              icon="el-icon-plus"-->
<!--              size="mini"-->
<!--              @click="handleAdd"-->
<!--              v-hasPermi="['system:role:add']"-->
<!--            >新增</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="success"-->
<!--              plain-->
<!--              icon="el-icon-edit"-->
<!--              size="mini"-->
<!--              :disabled="single"-->
<!--              @click="handleUpdate"-->
<!--              v-hasPermi="['system:role:edit']"-->
<!--            >修改</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="danger"-->
<!--              plain-->
<!--              icon="el-icon-delete"-->
<!--              size="mini"-->
<!--              :disabled="multiple"-->
<!--              @click="handleDelete"-->
<!--              v-hasPermi="['system:role:remove']"-->
<!--            >删除</el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="1.5">-->
<!--            <el-button-->
<!--              type="warning"-->
<!--              plain-->
<!--              icon="el-icon-download"-->
<!--              size="mini"-->
<!--              @click="handleExport"-->
<!--              v-hasPermi="['system:role:export']"-->
<!--            >导出</el-button>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>


      <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 30px;margin-left:20px;">

        <el-table v-loading="loading" :data="roleList"
                  stripe
                  :header-cell-style="{'background-color': '#196ABC','color':'white','text-align':'center'}"
                  >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100"
          >
          </el-table-column>
<!--          <el-table-column label="角色编号" prop="roleId" width="120" />-->
          <el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true"  align="center"/>
          <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true"  align="center"/>
          <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"  align="center"/>
<!--          <el-table-column label="显示顺序" prop="roleSort" width="100" align="center"/>-->
<!--          <el-table-column label="状态" align="center" width="100">-->
<!--            <template slot-scope="scope">-->
<!--              <el-switch-->
<!--                v-model="scope.row.status"-->
<!--                active-value="0"-->
<!--                inactive-value="1"-->
<!--                @change="handleStatusChange(scope.row)"-->
<!--              ></el-switch>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope" v-if="scope.row.roleId !== 1">
              <el-button
                size="small"
                type="primary"
                plain
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:role:edit']"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:role:remove']"
              >删除</el-button>
<!--              <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:role:edit']">-->
<!--                <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                  <el-dropdown-item command="handleDataScope" icon="el-icon-circle-check"-->
<!--                                    v-hasPermi="['system:role:edit']">数据权限</el-dropdown-item>-->
<!--                  <el-dropdown-item command="handleAuthUser" icon="el-icon-user"-->
<!--                                    v-hasPermi="['system:role:edit']">分配用户</el-dropdown-item>-->
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
      <!-- 添加或修改角色配置对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body style="text-align: center;font-weight: bold;" class="addBox">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="roleName" style="font-weight: bold;">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="权限字符" prop="roleKey"  style="font-weight: bold;">
<!--          <span slot="label">-->
<!--            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">-->
<!--              <i class="el-icon-question"></i>-->
<!--            </el-tooltip>-->
<!--            权限字符-->
<!--          </span>-->
            <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
          </el-form-item>
<!--          <el-form-item label="角色顺序" prop="roleSort">-->
<!--            <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="状态">-->
<!--            <el-radio-group v-model="form.status">-->
<!--              <el-radio-->
<!--                v-for="dict in dict.type.sys_normal_disable"-->
<!--                :key="dict.value"-->
<!--                :label="dict.value"-->
<!--              >{{dict.label}}</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="菜单权限">-->
<!--            <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>-->
<!--            <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>-->
<!--            <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>-->
<!--            <el-tree-->
<!--              class="tree-border"-->
<!--              :data="menuOptions"-->
<!--              show-checkbox-->
<!--              ref="menu"-->
<!--              node-key="id"-->
<!--              :check-strictly="!form.menuCheckStrictly"-->
<!--              empty-text="加载中，请稍候"-->
<!--              :props="defaultProps"-->
<!--            ></el-tree>-->
<!--          </el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="权限控制">
            <el-col :span="24" style="margin-left: 0px;">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" style="margin-left: 20px;float: left;">全选</el-checkbox>
            </el-col>
<!--            <div style="margin: 15px 0;"></div>-->
<!--            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
<!--              <el-col :span="4"><el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox></el-col>-->
            <el-col :span="8"><el-checkbox v-model="checked1"  style="margin-left: -28px;">首页</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked2"  style="margin-left: -14px;">数据大屏</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked3"  >泵站管理</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked4" style="margin-left: 14px;">拦河闸管理</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked5" style="margin-left: -14px;">水雨情</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked6"  >视频总览</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked7" >运行记录</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked8"  >运维功能</el-checkbox></el-col>
            <el-col :span="8"><el-checkbox v-model="checked9"  >权限管理</el-checkbox></el-col>
<!--            <el-col :span="8"><el-checkbox v-model="checked10"  >运维日志</el-checkbox></el-col>-->
<!--            </el-checkbox-group>-->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: -30px;text-align: center;margin-left: 30px;">
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
import { listRole, getRole, delRole, addRole, updateRole, dataScope, changeRoleStatus, deptTreeSelect } from "@/api/system/role";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
export default {
  name: 'page-1',
  components: { HeaderBox,LeftBox },
  data() {
    return {
      // loading:false,
      active:'8',
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
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      menuExpand: false,
      menuNodeAll: false,
      deptExpand: true,
      deptNodeAll: false,
      // 日期范围
      dateRange: [],
      checkAll: false,
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      checked9: false,
      checked10:false,
      // checkedCities: [],
      // cities: ['首页', '泵站管理', '拦河闸管理', '雨情遥测', '水文信息', '视频总览', '运行记录', '权限管理', '操作日志'],
      isIndeterminate: true,
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleKey: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        // roleSort: [
        //   { required: true, message: "角色顺序不能为空", trigger: "blur" }
        // ]
      }
    }
  },
  mounted() {
    this.handleQuery();
  },
  methods:{
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.roleList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询菜单树结构 */
    // getMenuTreeselect() {
    //   menuTreeselect().then(response => {
    //     this.menuOptions = response.data;
    //   });
    // },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      //let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      //let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      //checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      if (this.checkAll){
        return [1,2,3,4,5,6,7,8,9];
      }else {
        let checkedKeys = [];
        if (this.checked1){
          checkedKeys.push(1);
        }
        if (this.checked2){
          checkedKeys.push(2);
        }
        if (this.checked3){
          checkedKeys.push(3);
        }
        if (this.checked4){
          checkedKeys.push(4);
        }
        if (this.checked5){
          checkedKeys.push(5);
        }
        if (this.checked6){
          checkedKeys.push(6);
        }
        if (this.checked7){
          checkedKeys.push(7);
        }
        if (this.checked8){
          checkedKeys.push(8);
        }
        if (this.checked9){
          checkedKeys.push(9);
        }
        // if (this.checked10){
        //   checkedKeys.push(10);
        // }
        return checkedKeys;
      }
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      return roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus;
        return response;
      });
    },
    /** 根据角色ID查询部门树结构 */
    getDeptTree(roleId) {
      return deptTreeSelect(roleId).then(response => {
        this.deptOptions = response.depts;
        return response;
      });
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$modal.confirm('确认要"' + text + '""' + row.roleName + '"角色吗？').then(function() {
        return changeRoleStatus(row.roleId, row.status);
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
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      this.menuExpand = false,
        this.menuNodeAll = false,
        this.deptExpand = true,
        this.deptNodeAll = false,
        this.form = {
          roleId: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleSort: 0,
          status: "0",
          menuIds: [],
          deptIds: [],
          menuCheckStrictly: true,
          deptCheckStrictly: true,
          remark: undefined,
          remarkId: undefined
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
      this.handleQuery();
    },
    // 多选框选中数据
    // handleSelectionChange(selection) {
    //   this.ids = selection.map(item => item.roleId)
    //   this.single = selection.length!=1
    //   this.multiple = !selection.length
    // },
    // 更多操作触发
    // handleCommand(command, row) {
    //   switch (command) {
    //     case "handleDataScope":
    //       this.handleDataScope(row);
    //       break;
    //     case "handleAuthUser":
    //       this.handleAuthUser(row);
    //       break;
    //     default:
    //       break;
    //   }
    // },
    // // 树权限（展开/折叠）
    // handleCheckedTreeExpand(value, type) {
    //   if (type == 'menu') {
    //     let treeList = this.menuOptions;
    //     for (let i = 0; i < treeList.length; i++) {
    //       this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
    //     }
    //   } else if (type == 'dept') {
    //     let treeList = this.deptOptions;
    //     for (let i = 0; i < treeList.length; i++) {
    //       this.$refs.dept.store.nodesMap[treeList[i].id].expanded = value;
    //     }
    //   }
    // },
    // // 树权限（全选/全不选）
    // handleCheckedTreeNodeAll(value, type) {
    //   if (type == 'menu') {
    //     this.$refs.menu.setCheckedNodes(value ? this.menuOptions: []);
    //   } else if (type == 'dept') {
    //     this.$refs.dept.setCheckedNodes(value ? this.deptOptions: []);
    //   }
    // },
    // // 树权限（父子联动）
    // handleCheckedTreeConnect(value, type) {
    //   if (type == 'menu') {
    //     this.form.menuCheckStrictly = value ? true: false;
    //   } else if (type == 'dept') {
    //     this.form.deptCheckStrictly = value ? true: false;
    //   }
    // },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "角色管理-新增";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const roleId = row.roleId || this.ids
      const roleMenu = this.getRoleMenuTreeselect(roleId);
      getRole(roleId).then(response => {
        this.form = response.data;
        console.log(response)
        this.open = true;
        let remarkId = this.form.remarkId;
        if (remarkId){
          let array = remarkId.split(",");
          for(let i=0;i<array.length;i++){
            let v = parseInt(array[i]);
            if (v === 1){
              this.checked1 = true;
            }
            if (v === 2){
              this.checked2 = true;
            }
            if (v === 3){
              this.checked3 = true;
            }
            if (v === 4){
              this.checked4 = true;
            }
            if (v === 5){
              this.checked5 = true;
            }
            if (v === 6){
              this.checked6 = true;
            }
            if (v === 7){
              this.checked7 = true;
            }
            if (v === 8){
              this.checked8 = true;
            }
            if (v === 9){
              this.checked9 = true;
            }
            if (v === 10){
              this.checked9 = true;
            }
          }
          if (array.length === 10){
            this.checkAll = true;
          }
        }
        // this.$nextTick(() => {
        //   roleMenu.then(res => {
        //     let checkedKeys = res.checkedKeys
        //     checkedKeys.forEach((v) => {
        //       this.$nextTick(()=>{
        //         this.$refs.menu.setChecked(v, true ,false);
        //       })
        //     })
        //   });
        // });
        this.title = "角色管理-修改";
      });
    },
    // /** 选择角色权限范围触发 */
    // dataScopeSelectChange(value) {
    //   if(value !== '2') {
    //     this.$refs.dept.setCheckedKeys([]);
    //   }
    // },
    // /** 分配数据权限操作 */
    // handleDataScope(row) {
    //   this.reset();
    //   const deptTreeSelect = this.getDeptTree(row.roleId);
    //   getRole(row.roleId).then(response => {
    //     this.form = response.data;
    //     this.openDataScope = true;
    //     this.$nextTick(() => {
    //       deptTreeSelect.then(res => {
    //         this.$refs.dept.setCheckedKeys(res.checkedKeys);
    //       });
    //     });
    //     this.title = "分配数据权限";
    //   });
    // },
    // /** 分配用户操作 */
    // handleAuthUser: function(row) {
    //   const roleId = row.roleId;
    //   this.$router.push("/system/role-auth/user/" + roleId);
    // },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            this.form.remarkId = this.form.menuIds.toString();
            updateRole(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            this.form.remarkId = this.form.menuIds.toString();
            addRole(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // /** 提交按钮（数据权限） */
    // submitDataScope: function() {
    //   if (this.form.roleId != undefined) {
    //     this.form.deptIds = this.getDeptAllCheckedKeys();
    //     dataScope(this.form).then(response => {
    //       this.$modal.msgSuccess("修改成功");
    //       this.openDataScope = false;
    //       this.getList();
    //     });
    //   }
    // },
    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.roleId || this.ids;
      this.$modal.confirm('是否确认删除角色编号为"' + roleIds + '"的数据项？').then(function() {
        return delRole(roleIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // /** 导出按钮操作 */
    // handleExport() {
    //   this.download('system/role/export', {
    //     ...this.queryParams
    //   }, `role_${new Date().getTime()}.xlsx`)
    // },
    handleCheckAllChange(val) {
      if (val){

        this.checked1= true;
        this.checked2= true;
        this.checked3= true;
        this.checked4= true;
        this.checked5= true;
        this.checked6= true;
        this.checked7= true;
        this.checked8= true;
        this.checked9= true;
        this.checked10= true;
      }else{
        this.checked1= false;
        this.checked2= false;
        this.checked3= false;
        this.checked4= false;
        this.checked5= false;
        this.checked6= false;
        this.checked7= false;
        this.checked8= false;
        this.checked9= false;
        this.checked10= false;
      }
      this.isIndeterminate = false;
    },
    // handleCheckedCitiesChange(value) {
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.cities.length;
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    // },
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
