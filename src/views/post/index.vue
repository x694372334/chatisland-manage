<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="标题" prop="postTitle">
        <el-input
          v-model="queryParams.postTitle"
          placeholder="请输入post标题"
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
          v-hasPermi="['system:post:add']"
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
          v-hasPermi="['system:post:edit']"
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
          v-hasPermi="['system:post:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键Id" align="center" prop="postId" />
      <el-table-column label="post标题" align="center" prop="postTitle" />
      <el-table-column label="post标签" align="center" prop="postLabel" />
      <el-table-column label="备注" align="center" prop="description" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:post:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
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

    <!-- 添加或修改post列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="post标题" prop="postTitle">
          <el-input v-model="form.postTitle" placeholder="请输入标题" maxlength="40" />
        </el-form-item>
        <el-form-item label="post标签" prop="postLabel">
          <el-checkbox-group v-model="chooseTag"  @change="changeLabel">
            <el-checkbox v-for="item in tagList" :value="item" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="post文件" prop="postFiles">
          <el-upload
            ref="uploadFile"
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleChange"
            drag
            :file-list="fileList"
            action=""
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="post内容" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.description"
            maxlength="300"
            show-word-limit
          >
          </el-input>
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
import { listPost, getPost, delPost, addPost, updatePost, uploadFiles } from "@/api/chatislandApi/post";

export default {
  name: "Post",
  data() {
    return {
      userId: undefined,
      chooseTag: [],
      tagList: ['Flirt', 'Texting', 'Advice', 'Confession', 'Lifestyle', 'Other', 'Relationship', 'Cooking', 'Friendship', 'Couples', 'Watching', 'Dancing', 'Drawing', 'Dates', 'Group', 'Novelty', 'Reading', 'Singing', 'Singles', 'Sport'],
      // 按钮loading
      buttonLoading: false,
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
        postId: undefined,
        postTitle: undefined,
        postLabel: undefined,
        description: undefined
      },
      files:[],
      fileList:[],
      fileTypes:[],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postId: [
          { required: true, message: "主键Id不能为空", trigger: "blur" }
        ],
        postTitle: [
          { required: true, message: "post标题不能为空", trigger: "blur" }
        ],
        postLabel: [
          { required: true, message: "post标签不能为空", trigger: "blur" }
        ],
        description: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询post列列表 */
    getList() {
      if ( this.$route.query.form) {
        this.areaObj = JSON.parse(this.$route.query.form);
        console.log(this.areaObj,"areaObj-------------")
      }
      if(null!=this.$route.query.userId){
        const userId = this.$route.query.userId;
        console.log(userId);
        this.userId = userId
        this.queryParams.createBy = userId;
      }
      this.loading = true;
      listPost(this.queryParams).then(response => {
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
      this.chooseTag=[]
      this.files =[]
      this.fileTypes=[]
      this.fileList=[]
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加post列";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const postId = row.postId || this.ids
      getPost(postId).then(response => {
        this.loading = false;
        this.form = response.data;
        if(this.form.postLabel !== undefined&& this.form.postLabel !== ''&& this.form.postLabel !== null){
          this.chooseTag = JSON.parse(this.form.postLabel)
        }
        this.open = true;
        this.title = "修改post列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if(this.files.length>0){
            let formData = new FormData();
            for (const file of this.files) {//多个文件全部都放到files
              if(file.raw) {
                formData.append('files', file.raw);
              }
            }
            uploadFiles(formData).then(response => {
              console.log(response.data)
              let files=[]
              for (let i = 0; i < response.data.length; i++) {
                let fileObj = {}
                let obj = response.data[i]
                fileObj.fileName = obj.fileName
                fileObj.fileRoute = obj.fileRoute
                let fileType = obj.fileName.substring(obj.fileName.lastIndexOf('.')+1)
                let imagesTypes = ['jpg', 'jpeg', 'png', 'bmp', 'gif']
                if(imagesTypes.includes(fileType.toLowerCase())){
                  fileObj.fileType = '0'
                }else {
                  fileObj.fileType = '1'
                }
                files.push(fileObj)
              }
              if(files.length>0){
                this.form.postFileList = files
              }
              if (this.form.postId != null) {
                updatePost(this.form).then(response => {
                  this.$modal.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                }).finally(() => {
                  this.buttonLoading = false;
                });
              } else {
                console.log(this.form);
                this.form.userId = this.userId
                addPost(this.form).then(response => {
                  this.$modal.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                }).finally(() => {
                  this.buttonLoading = false;
                });
              }
            }).finally(() => {
              this.buttonLoading = false;
            });
          }else {
            if (this.form.postId != null) {
              updatePost(this.form).then(response => {
                this.$modal.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }).finally(() => {
                this.buttonLoading = false;
              });
            } else {
              console.log(this.form);
              this.form.userId = this.userId
              addPost(this.form).then(response => {
                this.$modal.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }).finally(() => {
                this.buttonLoading = false;
              });
            }
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const postIds = row.postId || this.ids;
      this.$modal.confirm('是否确认删除post列编号为"' + postIds + '"的数据项？').then(() => {
        this.loading = true;
        return delPost(postIds);
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
    changeLabel(){
      this.form.postLabel = JSON.stringify(this.chooseTag)
    },
    handleChange(file, fileList){
      //TODO 校验文件类型，视频文件只能上传一个，图片类型不限
      this.files = fileList;
    }
  }
};
</script>
