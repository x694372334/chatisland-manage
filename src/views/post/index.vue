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
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键Id" align="center" prop="postId"/>
      <el-table-column label="post标题" align="center" prop="postTitle"/>
      <el-table-column label="post标签" align="center" prop="postLabel"/>
      <el-table-column label="备注" align="center" prop="description"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleFileUpdate(scope.row)"
          >修改文件位置
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

    <!-- 添加或修改post列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="post标题" prop="postTitle">
          <el-input v-model="form.postTitle" placeholder="请输入标题" maxlength="40"/>
        </el-form-item>
        <el-form-item label="post标签" prop="postLabel">
          <el-checkbox-group v-model="chooseTag" @change="changeLabel">
            <el-checkbox v-for="item in tagList" :value="item" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="fileType">
            <el-option :key="'0'" :value="'0'" label="图片"></el-option>
            <el-option :key="'1'" :value="'1'" label="视频"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="fileType !==''" label="post文件" prop="postFiles">
          <el-row>
            <el-col :span="12" v-if="fileType==='0'" v-for="item in postFiles">
              <img style="max-width: 100%;" :src="item.fileRoute">
            </el-col>
            <el-col v-if="fileType==='1'" v-for="item in postFiles">
              <video style="max-width: 100%;" :src="item.fileRoute"></video>
            </el-col>
          </el-row>
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

    <el-dialog title="修改文件顺序" :visible.sync="fileUpdate" width="500px" append-to-body>
      <el-row>
        <draggable v-model="postFiles" @end="onEnd">
          <el-col :span="12" v-if="fileType==='0'" v-for="item in postFiles">
            <el-row>
              <img style="max-width: 100%;" :src="item.fileRoute">
            </el-row>
            <el-row>
              <span>{{ item.fileName }}</span>
            </el-row>
          </el-col>
          <el-col v-if="fileType==='1'" v-for="item in postFiles">
            <video style="max-width: 100%;" :src="item.fileRoute"></video>
          </el-col>
        </draggable>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="buttonLoading" type="primary" @click="updateFileSort">确 定</el-button>
        <el-button @click="fileUpdate=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listPost, getPost, delPost, addPost, updatePost, uploadFiles, updatePostFileSort} from "@/api/chatislandApi/post";
import draggable from 'vuedraggable'

export default {
  components: {draggable},
  name: "Post",
  data() {
    return {
      fileUpdate: false,
      userId: undefined,
      chooseTag: [],
      fileType: '',
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
      files: [],
      fileList: [],
      postId: undefined,
      postFiles: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postId: [
          {required: true, message: "主键Id不能为空", trigger: "blur"}
        ],
        postTitle: [
          {required: true, message: "post标题不能为空", trigger: "blur"}
        ],
        postLabel: [
          {required: true, message: "post标签不能为空", trigger: "blur"}
        ],
        description: [
          {required: true, message: "备注不能为空", trigger: "blur"}
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
      if (this.$route.query.form) {
        this.areaObj = JSON.parse(this.$route.query.form);
        console.log(this.areaObj, "areaObj-------------")
      }
      if (null != this.$route.query.userId) {
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
      this.chooseTag = []
      this.files = []
      this.fileList = []
      this.postFiles = []
      this.fileType = ''
      this.postId = undefined
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
        if (this.form.postLabel !== undefined && this.form.postLabel !== '' && this.form.postLabel !== null) {
          this.chooseTag = JSON.parse(this.form.postLabel)
        }
        if (this.form.postFiles) {
          this.postFiles = this.form.postFiles
          this.fileType = this.postFiles[0].fileType
        }
        this.open = true;
        this.title = "修改post列";
      });
    },
    handleFileUpdate(row) {
      const postId = row.postId
      getPost(postId).then(response => {
        if (response.data.postFiles) {
          this.postId = postId
          this.postFiles = response.data.postFiles
          if (this.postFiles) {
            this.fileType = this.postFiles[0].fileType
          }
        }
        this.fileUpdate = true;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.files.length > 0) {
            let formData = new FormData();
            let images = []
            let videos = []
            let imagesTypes = ['jpg', 'jpeg', 'png', 'bmp', 'gif']
            let videosTypes = ['mp4', 'avi', 'wmv', 'mov']
            for (const file of this.files) {//多个文件全部都放到files
              if (file.raw) {
                let fileType = file.raw.name.substr(file.raw.name.lastIndexOf('.') + 1)
                if (this.fileType === '0') {
                  if (imagesTypes.includes(fileType.toLowerCase())) {
                    if (images.length <= 8) {
                      images.push(file.raw.name)
                      formData.append('files', file.raw)
                    } else {
                      this.$modal.msgError("图片文件最多只能上传9个")
                      this.buttonLoading = false
                      return false
                    }
                  }
                } else if (this.fileType === '1') {
                  if (videosTypes.includes(fileType.toLowerCase())) {
                    if (videos.length === 0) {
                      videos.push(file.raw.name)
                      formData.append('files', file.raw)
                    } else {
                      this.$modal.msgError("视频文件最多只能上传1个")
                      this.buttonLoading = false
                      return false
                    }
                  }
                }
              }
            }
            uploadFiles(formData).then(response => {
              console.log(response.data)
              let files = []
              for (let i = 0; i < response.data.length; i++) {
                let fileObj = {}
                let obj = response.data[i]
                fileObj.fileName = obj.fileName
                fileObj.fileRoute = obj.fileRoute
                fileObj.sort = i
                fileObj.fileType = this.fileType
                files.push(fileObj)
              }
              if (files.length > 0) {
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
          } else {
            if (this.form.postId != null) {
              if (this.postFiles.length > 0) {
                this.form.postFileList = this.postFiles
              }
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
        this.getList();
        this.loading = false;
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
    changeLabel() {
      this.form.postLabel = JSON.stringify(this.chooseTag)
    },
    handleChange(file, fileList) {
      //TODO 校验文件类型，视频文件只能上传一个，图片类型不限
      this.files = fileList;
    },
    onEnd(e) {
      console.log(e)
      console.log(this.postFiles)
      for (let i = 0; i < this.postFiles.length; i++) {
        let obj = this.postFiles[i]
        obj.sort = i
      }
      console.log(this.postFiles)
    },
    updateFileSort() {
      console.log(this.postFiles)
      updatePostFileSort(this.postFiles).then(response => {
        if(response.data){
          this.$modal.msgSuccess("修改文件顺序成功");
          this.fileUpdate = false;
          this.getList()
        }
      }).finally(() => {
        this.buttonLoading = false;
      });
    }
  }
};
</script>
