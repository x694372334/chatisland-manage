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
          <el-form-item label="是否活跃" prop="isActive">
            <el-select
              v-model="queryParams.isActive"
              placeholder="是否活跃"
              clearable
              style="width: 240px">
              <el-option key="1" label="活跃" value="1"></el-option>
              <el-option key="0" label="不活跃" value="0"></el-option>
            </el-select>
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
            >注册
            </el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="chatterList">
          <el-table-column label="chatter编号" align="center" key="chatterId" prop="chatterId"/>
          <el-table-column label="chatter用户名" align="center" key="chatterName" prop="chatterName"/>
          <el-table-column label="chatter昵称" align="center" key="nickName" prop="nickName"/>
          <el-table-column label="手机号码" align="center" key="phoneNum" prop="phoneNum" width="120"/>
          <el-table-column label="是否活跃" align="center" key="isActive">
            <template slot-scope="scope">
              <span>{{ scope.row.isActive === '1' ? '活跃' : '不活跃' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" width="160">
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
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除
              </el-button>
              <el-dropdown size="mini" @command="(command) => handleCommand(command, scope.row)">
                <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="handleResetPwd" icon="el-icon-key">重置密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
          <el-col :span="12">
            <el-form-item label="用户名" prop="chatterName">
              <el-input v-model="form.chatterName" placeholder="请输入用户名" maxlength="30"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入昵称" maxlength="30"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneNum">
              <el-input v-model="form.phoneNum" placeholder="请输入手机号码" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="userName">
              <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="changePass" width="600px" append-to-body>
      <el-form ref="form" :model="changePassForm" :rules="changePassRules" label-width="80px">
        <el-form-item label="用户名" prop="chatterName">
          <el-input v-model="changePassForm.chatterName" disabled placeholder="请输入用户名" maxlength="30"/>
        </el-form-item>
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="changePassForm.password" placeholder="请输入旧密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="changePassForm.newPassword" placeholder="请输入新密码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {listChatter, getChatter, register, updateChatter, delChatter, changePass} from "@/api/system/chatter";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Chatter",
  components: {Treeselect},
  data() {
    return {
      changePass: false,
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
      chatterList: null,
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
      changePassForm: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        chatterName: undefined,
        nickName: undefined,
        isActive: undefined
      },
      // 列信息
      columns: [
        {key: 0, label: `chatter编号`, visible: true},
        {key: 1, label: `chatter用户名`, visible: true},
        {key: 2, label: `chatter昵称`, visible: true},
        {key: 3, label: `手机号码`, visible: true},
        {key: 3, label: `是否活跃`, visible: true}
      ],
      // 表单校验
      rules: {
        chatterName: [
          {required: true, message: "用户名不能为空", trigger: "blur"},
          {min: 2, max: 20, message: '用户名长度必须介于 2 和 20 之间', trigger: 'blur'}
        ],
        nickName: [
          {required: true, message: "昵称不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "用户密码不能为空", trigger: "blur"},
          {min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur'}
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phoneNum: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      },
      changePassRules: {
        password: [
          {required: true, message: "用户密码不能为空", trigger: "blur"},
          {min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur'}
        ],
        newPassword: [
          {required: true, message: "用户密码不能为空", trigger: "blur"},
          {min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listChatter(this.queryParams).then(response => {
          this.chatterList = response.data.rows;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
      this.changePass = false;
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
      this.changePassForm = {
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
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case "handleResetPwd":
          this.handleResetPwd(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getChatter(row.chatterId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户";
        this.form.password = "";
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.changePass = true
      this.reset()
      this.changePassForm.chatterName = row.chatterName
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId !== undefined) {
            updateChatter(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            register(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户编号为"' + row.userId + '"的数据项？').then(function () {
        return delChatter(row.userId);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    changePassword() {
      changePass(this.changePassForm).then(response => {
        if (response.data) {
          this.$modal.msgSuccess("修改密码成功");
          this.changePass = false;
          this.getList();
        }else {
          this.$modal.msgError(response.msg)
        }
      });
    }
  }
};
</script>
