<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--chatter数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="queryParams.chatterName"
              placeholder="请输入用户名"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              v-model="queryParams.nickName"
              placeholder="请输入chatter昵称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="真实名称" prop="name">
            <el-input
              v-model="queryParams.name"
              placeholder="请输入真实名称"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
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
            >新增绑定
            </el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="chatterBindNameList">
          <el-table-column label="chatter编号" align="center" key="chatterId" prop="chatterId"/>
          <el-table-column label="chatter用户名" align="center" key="chatterName" prop="chatterName"/>
          <el-table-column label="chatter昵称" align="center" key="nickName" prop="nickName"/>
          <el-table-column label="真实名称" align="center" key="name" prop="name"/>
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
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
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

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col>
            <el-form-item label="chatter" prop="chatterId">
              <el-select clearable placeholder="请选择chatter" v-model="form.chatterId">
                <el-option v-for="item in allChatters" :value="item.chatterId" :label="item.nickName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="真实名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入真实名称" maxlength="30"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改名称对话框 -->
    <el-dialog title="修改chatter真实名称" :visible.sync="editDialog" width="600px" append-to-body>
      <el-form ref="form" :model="editForm" :rules="editChatterRules" label-width="80px">
        <el-form-item label="用户名" prop="chatterName">
          <el-input v-model="editForm.chatterName" disabled placeholder="请输入用户名" maxlength="30"/>
        </el-form-item>
        <el-form-item label="真实名称" prop="name">
          <el-input type="text" v-model="editForm.name" placeholder="请输入真实名称"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editChatterBindName">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listChatterBindName, listAllChatter, getChatterBindName, addChatterBindName, editChatterBindName} from "@/api/system/chatterBindName";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Chatter",
  components: {Treeselect},
  data() {
    return {
      editDialog: false,
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
      chatterBindNameList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 用户名
      chatterName: undefined,
      // 默认密码
      initPassword: '123456',
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      allChatters:[],
      editForm: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        chatterName: undefined,
        nickName: undefined,
        name: undefined
      },
      // 列信息
      columns: [
        {key: 0, label: `chatter编号`, visible: true},
        {key: 1, label: `chatter用户名`, visible: true},
        {key: 2, label: `chatter昵称`, visible: true},
        {key: 3, label: `真实名称`, visible: true}
      ],
      // 表单校验
      rules: {
        chatterId: [
          {required: true, message: "chatter不能为空", trigger: "blur"}
        ],
        name: [
          {required: true, message: "真实名称不能为空", trigger: "blur"}
        ]
      },
      editChatterRules: {
        name: [
          {required: true, message: "真实名称不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getChatterList();
  },
  methods: {
    getList() {
      this.loading = true;
      listChatterBindName(this.queryParams).then(response => {
          this.chatterBindNameList = response.data.rows;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    /** 查询chatter列表 */
    getChatterList() {
      listAllChatter().then(response => {
          this.allChatters = response.data;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.editDialog = false;
    },
    // 表单重置
    reset() {
      this.form = {
        chatterName: undefined,
        nickName: undefined,
        password: undefined,
        phoneNum: undefined,
        email: undefined,
      };
      this.resetForm("form");
      this.editForm = {
        chatterName: undefined,
        password: undefined,
        newPassword: undefined
      }
      this.resetForm("changePassForm");
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getChatterBindName(row.chatterId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改chatter真实名称";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.chatterId !== undefined) {
            editChatterBindName(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addChatterBindName(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    editChatterBindName() {
      editChatterBindName(this.editForm).then(response => {
        if (response.data) {
          this.$modal.msgSuccess("修改密码成功");
          this.editDialog = false;
          this.getList();
        }else {
          this.$modal.msgError(response.msg)
        }
      });
    }
  }
};
</script>
