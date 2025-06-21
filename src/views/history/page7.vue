<template>
  <div>
    <el-header style="width: 100%;float: left;background-color: #196ABC;">
      <HeaderBox :name="false"></HeaderBox>
    </el-header>
    <el-aside class="aside" style="width: 12%;">
      <LeftBox @child-msg="getChildMsg" :active="active"></LeftBox>
    </el-aside>
    <el-main class="main" style="width: 88%;">
      <div style="width: 100%;height: 95vh;float: left;margin-left: 0px;background-color: white;" v-loading="loading">
        <div class="searchBox" style="padding:20px 0px;background-color: white;width: 100%;height: 40px; ">
          <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                   label-width="68px"
                   style="background-color: white;"
          >
            <el-form-item label="设备名称" prop="deviceName" style="margin-left: 20px;">
              <el-input
                v-model="queryParams.deviceName"
                placeholder="请输入设备名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item label="设备序列号" prop="deviceSn" label-width="120px" style="margin-left: 20px;">
              <el-input
                v-model="queryParams.deviceSn"
                placeholder="请输入设备序列号"
                clearable
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['rain:device:add']"
              >新增
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableBox" style="width: calc( 100% - 40px );float: left;margin-top: 30px;margin-left:20px;">
          <el-row :gutter="10" class="mb8" v-if="false">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['rain:device:add']"
              >新增
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['rain:device:edit']"
              >修改
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['rain:device:remove']"
              >删除
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['rain:device:export']"
              >导出
              </el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
          </el-row>

          <el-table v-loading="loading" :data="deviceList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
<!--            <el-table-column label="主键ID" align="center" prop="id"/>-->
            <el-table-column label="设备名称" align="center" prop="deviceName"/>
            <el-table-column label="设备类型" align="center" prop="deviceType"/>
<!--            <el-table-column label="设备类型代码" align="center" prop="deviceTypeCode"/>-->
            <el-table-column label="序列号" align="center" prop="deviceSn" show-overflow-tooltip/>
            <el-table-column label="闸站名称" align="center" prop="stationName"/>
            <el-table-column label="安装位置" align="center" prop="location"/>
            <el-table-column label="经度" align="center" prop="longitude"/>
            <el-table-column label="纬度" align="center" prop="latitude"/>
            <el-table-column label="状态" align="center" prop="status" :formatter="formatStatus"/>
            <el-table-column label="制造商" align="center" prop="manufacturer"/>
            <el-table-column label="设备型号" align="center" prop="model"/>
            <el-table-column label="安装日期" align="center" prop="installDate" width="100">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.installDate, '{y}-{m}-{d}') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="功率kW" align="center" prop="power"/>
            <el-table-column label="转速rpm" align="center" prop="speed"/>
            <el-table-column label="流量m³/s" align="center" prop="flowRate"/>
            <el-table-column label="扬程m" align="center" prop="lift"/>
            <el-table-column label="闸门宽度" align="center" prop="gateWidth"/>
            <el-table-column label="闸门高度" align="center" prop="gateHeight"/>
            <el-table-column label="驱动类型" align="center" prop="driveType"/>
<!--            <el-table-column label="最近状态" align="center" prop="lastStatus"/>-->
<!--            <el-table-column label="状态时间" align="center" prop="lastStatusTime" width="180">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ parseTime(scope.row.lastStatusTime, '{y}-{m}-{d}') }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="备注" align="center" prop="remark"/>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['rain:device:edit']"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['rain:device:remove']"
                >删除
                </el-button>
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
        <!-- 添加或修改设备信息对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="设备编码" prop="deviceId">
              <el-input v-model="form.deviceId" placeholder="请输入设备编码"/>
            </el-form-item>
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="form.deviceName" placeholder="请输入设备名称"/>
            </el-form-item>
            <el-form-item label="设备类型代码" prop="deviceTypeCode">
              <el-input v-model="form.deviceTypeCode" placeholder="请输入设备类型代码"/>
            </el-form-item>
            <el-form-item label="设备序列号" prop="deviceSn">
              <el-input v-model="form.deviceSn" placeholder="请输入设备序列号"/>
            </el-form-item>
            <el-form-item label="所属泵站/闸站名称" prop="stationName">
              <el-input v-model="form.stationName" placeholder="请输入所属泵站/闸站名称"/>
            </el-form-item>
            <el-form-item label="设备安装位置" prop="location">
              <el-input v-model="form.location" placeholder="请输入设备安装位置"/>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度"/>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入纬度"/>
            </el-form-item>
            <el-form-item label="制造商" prop="manufacturer">
              <el-input v-model="form.manufacturer" placeholder="请输入制造商"/>
            </el-form-item>
            <el-form-item label="设备型号" prop="model">
              <el-input v-model="form.model" placeholder="请输入设备型号"/>
            </el-form-item>
            <el-form-item label="安装日期" prop="installDate">
              <el-date-picker clearable
                              v-model="form.installDate"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择安装日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="功率kW" prop="power">
              <el-input v-model="form.power" placeholder="请输入功率kW"/>
            </el-form-item>
            <el-form-item label="转速rpm" prop="speed">
              <el-input v-model="form.speed" placeholder="请输入转速rpm"/>
            </el-form-item>
            <el-form-item label="流量m³/s" prop="flowRate">
              <el-input v-model="form.flowRate" placeholder="请输入流量m³/s"/>
            </el-form-item>
            <el-form-item label="扬程m" prop="lift">
              <el-input v-model="form.lift" placeholder="请输入扬程m"/>
            </el-form-item>
            <el-form-item label="闸门宽度m" prop="gateWidth">
              <el-input v-model="form.gateWidth" placeholder="请输入闸门宽度m"/>
            </el-form-item>
            <el-form-item label="闸门高度m" prop="gateHeight">
              <el-input v-model="form.gateHeight" placeholder="请输入闸门高度m"/>
            </el-form-item>
            <el-form-item label="状态时间" prop="lastStatusTime">
              <el-date-picker clearable
                              v-model="form.lastStatusTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="请选择状态时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
            </el-form-item>
            <el-form-item label="删除标记" prop="deleteFlag">
              <el-input v-model="form.deleteFlag" placeholder="请输入删除标记"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>
  </div>
</template>

<script>
import { listDevice, getDevice, delDevice, addDevice, updateDevice } from '@/api/rain/device'
import HeaderBox from '@/views/home/HeaderBox.vue'
import LeftBox from '@/views/history/LeftBox.vue'

export default {
  name: 'Device',
  components: { LeftBox, HeaderBox },
  data() {
    return {
      active: '7',
      value: '4',
      // 遮罩层
      loading: false,
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
      // 设备信息表格数据
      deviceList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deviceName: null,
        deviceType: null,
        deviceTypeCode: null,
        deviceSn: null,
        stationName: null,
        location: null,
        longitude: null,
        latitude: null,
        status: null,
        manufacturer: null,
        model: null,
        installDate: null,
        power: null,
        speed: null,
        flowRate: null,
        lift: null,
        gateWidth: null,
        gateHeight: null,
        driveType: null,
        lastStatus: null,
        lastStatusTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deviceName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '设备类型名称不能为空', trigger: 'change' }
        ],
        deviceSn: [
          { required: true, message: '设备序列号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    formatStatus(row) {
      const map = {
        0: '异常',
        1: '正常'
      };
      return map[row.status] || '未知';
    },

    /** 查询设备信息列表 */
    getList() {
      this.loading = true
      listDevice(this.queryParams).then(response => {
        this.deviceList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        deviceId: null,
        deviceName: null,
        deviceType: null,
        deviceTypeCode: null,
        deviceSn: null,
        stationName: null,
        location: null,
        longitude: null,
        latitude: null,
        status: null,
        manufacturer: null,
        model: null,
        installDate: null,
        power: null,
        speed: null,
        flowRate: null,
        lift: null,
        gateWidth: null,
        gateHeight: null,
        driveType: null,
        lastStatus: null,
        lastStatusTime: null,
        remark: null,
        createTime: null,
        updateTime: null,
        createBy: null,
        updateBy: null,
        deleteFlag: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加设备信息'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDevice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改设备信息'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDevice(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDevice(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除设备信息编号为"' + ids + '"的数据项？').then(function() {
        return delDevice(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('rain/device/export', {
        ...this.queryParams
      }, `device_${new Date().getTime()}.xlsx`)
    },
    getChildMsg(key){
      console.error(key)
    }
  }
}
</script>
<style scoped lang="scss">
.theme-picker {

}

.aside {
  float: left;
  height: calc(100vh - 60px);
  padding: 0px;
}

.main {
  float: left;
  height: calc(100vh - 60px);
  background-color: #E5ECF5;
}

::v-deep .searchBox .el-form-item__label {
  font-weight: normal;
}
</style>
