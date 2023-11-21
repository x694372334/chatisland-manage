<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="chatislandName">
        <el-input
          v-model="queryParams.chatislandName"
          placeholder="请输入名称"
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
          v-hasPermi="['system:chatisland:add']"
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
          v-hasPermi="['system:chatisland:edit']"
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
          v-hasPermi="['system:chatisland:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:chatisland:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="chatislandList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="chatislandId" />
      <el-table-column label="名称" align="center" prop="chatislandName" />
      <el-table-column label="chatisland标签" align="center" prop="chatislandLabel" />
      <el-table-column label="chatisland封面" align="center" prop="chatislandCover" />
      <el-table-column label="chatisland描述" align="center" prop="description" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:chatisland:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:chatisland:remove']"
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

    <!-- 添加或修改chatisLand对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="chatislandName">
          <el-input v-model="form.chatislandName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="标签" prop="chatislandLabel">
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
        <el-form-item label="封面" prop="chatislandCover">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.description"
            maxlength="100"
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
import {
  addChatisland,
  delChatisland,
  getChatisland,
  listChatisland,
  updateChatisland
} from "@/api/chatislandApi/chatisland";

export default {
  name: "Chatisland",
  data() {
    return {
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
      // chatisLand表格数据
      chatislandList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        chatislandId: undefined,
        chatislandName: undefined,
        chatislandLabel: undefined,
        chatislandCover: undefined,
        description: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        chatislandId: [
          { required: true, message: "主键id不能为空", trigger: "blur" }
        ],
        chatislandName: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询chatisLand列表 */
    getList() {
      if ( this.$route.query.form) {
        this.areaObj = JSON.parse(this.$route.query.form);
        console.log(this.areaObj,"areaObj-------------")
      }
      if(null!=this.$route.query.userId){
        const userId = this.$route.query.userId;
        console.log(userId);
        this.queryParams.createBy = userId;
      }
      this.loading = true;
      listChatisland(this.queryParams).then(response => {
        this.chatislandList = response.rows;
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
        chatislandId: undefined,
        chatislandName: undefined,
        chatislandLabel: undefined,
        chatislandCover: undefined,
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
      this.ids = selection.map(item => item.chatislandId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加chatisLand";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.loading = true;
      this.reset();
      const chatislandId = row.chatislandId || this.ids
      getChatisland(chatislandId).then(response => {
        this.loading = false;
        this.form = response.data;
        this.open = true;
        this.title = "修改chatisLand";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          if (this.form.chatislandId != null) {
            updateChatisland(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            }).finally(() => {
              this.buttonLoading = false;
            });
          } else {
            addChatisland(this.form).then(response => {
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
      const chatislandIds = row.chatislandId || this.ids;
      this.$modal.confirm('是否确认删除chatisLand编号为"' + chatislandIds + '"的数据项？').then(() => {
        this.loading = true;
        return delChatisland(chatislandIds);
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
      this.download('system/chatisland/export', {
        ...this.queryParams
      }, `chatisland_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
