<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
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
          v-hasPermi="['system:user:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:user:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:user:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="userId" v-if="true"/>
      <el-table-column label="用户账号" align="center" prop="userName" />
      <el-table-column label="用户昵称" align="center" prop="nickName" />
      <el-table-column label="用户性别" align="center" prop="sex" />
      <el-table-column label="用户标签" align="center" prop="userLabel" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button icon="el-icon-position"
                     size="small"
                     type="text"
                     @click="showChatisland(scope.row,scope.index)">chatisland
          </el-button>
          <el-button icon="el-icon-position"
                     size="small"
                     type="text"
                     @click="showPost(scope.row,scope.index)">post
          </el-button>
          <el-button icon="el-icon-position"
                     size="small"
                     type="text"
                     @click="showPicture(scope.row,scope.index)">人设图片
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:user:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:user:remove']"
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
<!--        <el-form-item label="头像地址" prop="avatar">-->
<!--          <el-input v-model="form.avatar" placeholder="请输入头像地址" />-->
<!--        </el-form-item>-->
        <el-form-item label="头像地址" prop="avatar">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="性别" prop="age">
          <el-input v-model="form.sex" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="标签" prop="userLabel">
          <el-checkbox v-model="checked">Flirt</el-checkbox>
          <el-checkbox v-model="checked">Texting</el-checkbox>
          <el-checkbox v-model="checked">Advice</el-checkbox>
          <el-checkbox v-model="checked">Confession</el-checkbox>
          <el-checkbox v-model="checked">Lifestyle</el-checkbox>
          <el-checkbox v-model="checked">Other</el-checkbox>
          <el-checkbox v-model="checked">Relationship</el-checkbox>
          <el-checkbox v-model="checked">Cooking</el-checkbox>
          <el-checkbox v-model="checked">Friendship</el-checkbox>
          <el-checkbox v-model="checked">Couples</el-checkbox>
          <el-checkbox v-model="checked">Watching</el-checkbox>
          <el-checkbox v-model="checked">Dancing</el-checkbox>
          <el-checkbox v-model="checked">Drawing</el-checkbox>
          <el-checkbox v-model="checked">Dates</el-checkbox>
          <el-checkbox v-model="checked">Group</el-checkbox>
          <el-checkbox v-model="checked">Novelty</el-checkbox>
          <el-checkbox v-model="checked">Reading</el-checkbox>
          <el-checkbox v-model="checked">Singing</el-checkbox>
          <el-checkbox v-model="checked">Singles</el-checkbox>
          <el-checkbox v-model="checked">Sport</el-checkbox>
        </el-form-item>
        <el-form-item label="个人简介" prop="aboutMe">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.aboutMe"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="会员" prop="isVip">
          <el-input v-model="form.isVip" placeholder="请输入是否是会员" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/system/user";

export default {
  name: "User",
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
      checked: false,
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
      // 用户信息表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        userType: undefined,
        email: undefined,
        phonenumber: undefined,
        sex: undefined,
        avatar: undefined,
        password: undefined,
        status: undefined,
        loginIp: undefined,
        loginDate: undefined,
        signUpWith: undefined,
        aboutMe: undefined,
        isMessage: undefined,
        isComments: undefined,
        isReply: undefined,
        userLabel: undefined,
        avatarName: undefined,
        karma: undefined,
        age: undefined,
        accid: undefined,
        language: undefined,
        onlineStatus: undefined,
        isVip: undefined,
        vipSource: undefined,
        vipDescribeDate: undefined,
        vipExpireDate: undefined,
        isComplimentary: undefined,
        isSystem: undefined,
        isBeginnerGuidance: undefined,
        beginnerGuidanceTime: undefined,
        systemUserSetting: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" }
        ],
        // nickName: [
        //   { required: true, message: "用户昵称不能为空", trigger: "blur" }
        // ],
        // sex: [
        //   { required: true, message: "用户性别不能为空", trigger: "change" }
        // ],
        // avatar: [
        //   { required: true, message: "头像地址不能为空", trigger: "blur" }
        // ],
        // aboutMe: [
        //   { required: true, message: "个人简介不能为空", trigger: "blur" }
        // ],
        // userLabel: [
        //   { required: true, message: "用户标签不能为空", trigger: "blur" }
        // ],
        // avatarName: [
        //   { required: true, message: "头像名称不能为空", trigger: "blur" }
        // ],
        // age: [
        //   { required: true, message: "年龄不能为空", trigger: "blur" }
        // ],
      }
    };
  },
  created() {
    this.getList();
  },

  methods: {

    showChatisland(row, index, done){
      const userId = row.userId;
      console.log(userId)
      this.$router.push({
        path: "/chatisland/index",
        query:{
          userId:userId,
          from:JSON.stringify(this.form)
        }});
    },

    showPost(row, index, done){
      const userId = row.userId;
      console.log(userId)
      this.$router.push({
        path: "/post/index",
        query:{
          userId:userId,
          from:JSON.stringify(this.form)
        }});
    },
    showPicture(row, index, done){
      const roleId = row.userId;
      console.log(roleId)
      this.$router.push({path: '/characterPicture/index', query: {userId: roleId}});
    },
    /** 查询用户信息列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        userType: undefined,
        email: undefined,
        phonenumber: undefined,
        sex: undefined,
        avatar: undefined,
        password: undefined,
        status: undefined,
        delFlag: undefined,
        loginIp: undefined,
        loginDate: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        remark: undefined,
        signUpWith: undefined,
        aboutMe: undefined,
        isMessage: undefined,
        isComments: undefined,
        isReply: undefined,
        userLabel: undefined,
        avatarName: undefined,
        karma: undefined,
        age: undefined,
        accid: undefined,
        language: undefined,
        onlineStatus: undefined,
        isVip: undefined,
        vipSource: undefined,
        vipDescribeDate: undefined,
        vipExpireDate: undefined,
        isComplimentary: undefined,
        isSystem: undefined,
        isBeginnerGuidance: undefined,
        beginnerGuidanceTime: undefined,
        systemUserSetting: undefined
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const userId = row.userId || this.ids
      getUser(userId).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改用户信息";
      });
    },

    // /** 修改按钮操作 */
    // chatisland(row) {
    //   this.loading = true;
    //   this.reset();
    //   const userId = row.userId || this.ids
    //   getUser(userId).then(response => {
    //     this.loading = false;
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改用户信息";
    //   });
    // },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.userId != null) {
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addUser(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$modal.confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项？').then(() => {
        this.loading = true;
        return delUser(userIds);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
