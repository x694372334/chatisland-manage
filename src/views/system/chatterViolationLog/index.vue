<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--chatter数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
          <el-form-item label="chatter" prop="chatterId">
            <el-select clearable placeholder="请选择chatter" v-model="queryParams.chatterId">
              <el-option v-for="item in allChatters" :key="item.chatterId"  :value="item.chatterId" :label="item.nickName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间间隔" prop="dateRange">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="violationLogList">
          <el-table-column label="id" align="center" key="id" prop="id"/>
          <el-table-column label="chatterName" align="center" key="chatterName" prop="chatterName"/>
          <el-table-column label="violationDiamond" align="center" key="violationDiamond" prop="violationDiamond"/>
          <el-table-column label="violationReason" align="center" key="violationReason" prop="violationReason"/>
          <el-table-column label="violationFilePath" align="center" key="violationFilePath" prop="violationFilePath"/>
          <el-table-column label="violationTime" align="center" prop="violationTime" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.violationTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
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
      </el-col>
    </el-row>

    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-form-item label="chatter" prop="chatterId">
            <el-select clearable placeholder="请选择chatter" v-model="form.chatterId">
              <el-option v-for="item in allChatters" :key="item.chatterId" :value="item.chatterId" :label="item.nickName"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="扣除时间" prop="violationTime">
            <el-date-picker
              v-model="form.violationTime"
              type="datetime"
              placeholder="选择扣除时间">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="扣除截图上传" prop="violationFilePath">
            <el-image v-if="form.violationFilePath !== undefined" :src="form.violationFilePath"></el-image>
            <el-upload
              v-if="form.violationFilePath === undefined"
              class="upload-demo"
              drag
              :on-success="uploadSuccess"
              :action="uploadUrl">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="扣除钻石数量" prop="violationDiamond">
            <el-input v-model="form.violationDiamond" placeholder="请输入扣除钻石数量" maxlength="30"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="扣除原因" prop="violationReason">
            <el-input v-model="form.violationReason" placeholder="请输入扣除原因" maxlength="30"/>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  selectChatterViolationLogList,
  violationChatterDiamond,
  deleteViolationLog
} from "../../../api/system/chatterViolationLog";
import {listAllChatter} from "../../../api/system/chatterBindName";

export default {
  name: "Chatter",
  components: {Treeselect},
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/oss/upload", // 上传的图片服务器地址
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
      violationLogList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 用户名
      chatterName: undefined,
      // 日期范围
      dateRange: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      rules:{
        chatterId: [
          {required: true, message: "chatter不能为空", trigger: "blur"}
        ],
        violationReason: [
          {required: true, message: "扣除原因不能为空", trigger: "blur"}
        ],
        violationTime: [
          {required: true, message: "扣除时间不能为空", trigger: "blur"}
        ],
        violationDiamond: [
          {required: true, message: "扣除钻石不能为空", trigger: "blur"}
        ]
      },
      allChatters: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        chatterId: undefined,
        startDate: undefined,
        endDate: undefined
      },
      // 列信息
      columns: [
        {key: 0, label: `id`, visible: true},
        {key: 1, label: `chatterName`, visible: true},
        {key: 2, label: `violationReason`, visible: true},
        {key: 3, label: `violationDiamond`, visible: true},
        {key: 4, label: `violationFilePath`, visible: true},
        {key: 5, label: `violationTime`, visible: true}
      ],
    };
  },
  created() {
    this.getList();
    this.getChatterList()
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.form.violationFilePath = response.data.fileRoute
    },
    /** 查询chatter列表 */
    getChatterList() {
      listAllChatter().then(response => {
          this.allChatters = response.data;
        }
      );
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      selectChatterViolationLogList(this.queryParams).then(response => {
          this.violationLogList = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户信息";
    },// 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.userLabel = []
      this.form = {
        chatterId: undefined,
        violationReason: undefined,
        violationDiamond: undefined,
        violationFilePath: undefined,
        violationTime: undefined
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = this.form
          data.violationTime = new Date(this.form.violationTime).getTime()
          violationChatterDiamond(data).then(response => {
            this.$modal.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除用户信息编号为"' + row.id + '"的数据项？').then(() => {
        this.loading = true;
        return deleteViolationLog(row.id);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if (this.dateRange.length > 0) {
        this.queryParams.startDate = this.dateRange[0].getTime()
        this.queryParams.endDate = this.dateRange[1].getTime()
      }
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
    /** 删除按钮操作 */
    /*handleDelete(row) {
      this.$modal.confirm('是否确认删除订单编号为"' + row.userId + '"的数据项？').then(function () {
        return delOrder(row.userId);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    }*/
  }
};
</script>
