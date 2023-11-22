<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="人设用户" prop="userId">
        <el-select v-model="queryParams.userId">
          <el-option v-for="item in userList" :key="item.userId" :value="item.userId" :label="item.nickName">{{item.nickName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件名称" prop="fileName">
        <el-input
          v-model="queryParams.fileName"
          placeholder="请输入文件名称"
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
          v-hasPermi="['system:characterPicture:add']"
        >新增
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
          v-hasPermi="['system:member:deletePicture']"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键Id" align="center" prop="id"/>
      <el-table-column label="用户编号" align="center" prop="userId"/>
      <el-table-column label="文件预览" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.pictureFilePath" style="width:240px;height: 180px;">
        </template>
      </el-table-column>
      <el-table-column label="文件名称" align="center" prop="pictureFileName"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:member:deletePicture']"
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

    <!-- 添加对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item v-if="form.userId===undefined"  label="人设用户" prop="userId">
          <el-select v-model="form.userId">
            <el-option v-for="item in userList" :key="item.userId" :value="item.userId" :label="item.nickName">{{item.nickName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片/视频文件" prop="files">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleChange"
            drag
            action=""
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
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
import {selectAllSystemUserList, listPicture, uploadPictures, delPicture} from "@/api/chatislandApi/characterPicture";

export default {
  name: "Post",
  data() {
    return {
      // 按钮loading
      buttonLoading: false,
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
      // post列表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: undefined,
        fileName: undefined
      },
      // 表单参数
      form: {
        userId: undefined,
        files:[]
      },
      // 表单校验
      rules: {
        userId: [
          {required: true, message: "人设用户不能为空", trigger: "blur"}
        ],
        fileName: [
          {required: true, message: "文件名称不能为空", trigger: "blur"}
        ]
      },
      //全部人设用户列表
      userList: []
    };
  },
  created() {
    this.firstUserList();
    this.getList();
  },
  methods: {
    firstUserList() {
      selectAllSystemUserList().then(response =>{
        this.userList = response.data
        if(this.userList.length>0){
          this.queryParams.userId = new Number(this.$route.query.userId).valueOf()
        }
      })
    },
    getUserList() {
      selectAllSystemUserList().then(response =>{
        this.userList = response.data
      })
    },
    /** 查询图片列表 */
    getList() {
      this.loading = true;
      listPicture(this.queryParams).then(response => {
        this.postList = response.rows;
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
        postId: undefined,
        postTitle: undefined,
        postLabel: undefined,
        createBy: undefined,
        createTime: undefined,
        updateBy: undefined,
        updateTime: undefined,
        description: undefined
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
      this.ids = selection.map(item => item.postId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      if (this.$route.query.userId !== undefined){
        this.form.userId = new Number(this.$route.query.userId).valueOf()
      }
      this.open = true;
      this.title = "上传图片";
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.userId != null) {
            let formData = new FormData();
            for (const file of this.form.files) {//多个文件全部都放到files
              if(file.raw) {
                formData.append('files', file.raw);
              }
            }
            formData.append('userId',this.form.userId);
            uploadPictures(formData).then(response => {
              this.$modal.msgSuccess("上传成功");
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + ids + '"的数据项？').then(() => {
        this.loading = true;
        return delPicture(ids);
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
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    },
    handleChange(file, fileList){
      this.form.files = fileList;
    }
  }
};
</script>
