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

    <el-table v-loading="loading" :data="chatislandList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="主键id" align="center" prop="chatislandId"/>
      <el-table-column label="名称" align="center" prop="chatislandName"/>
      <el-table-column label="搜索Match" align="center" prop="chatislandMatch"/>
      <el-table-column label="chatisland标签" align="center" prop="chatislandLabel"/>
      <el-table-column label="chatisland封面" align="center" prop="chatislandCover">
        <template slot-scope="scope">
          <img v-if="scope.row.isSenior !== '0'" style="width: 120px;height: 180px;" v-for="cover in JSON.parse(scope.row.chatislandCover)" :src="cover" />
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='1'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_1.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='2'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_2.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='3'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_3.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='4'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_4.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='5'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_5.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='6'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_6.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='7'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_7.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='8'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_8.png">
          <img v-if="scope.row.isSenior === '0' && scope.row.chatislandCover==='9'" style="width: 120px;height: 180px;" src="../../assets/images/normal_cover/cover_9.png">
        </template>
      </el-table-column>
      <el-table-column label="chatisland描述" align="center" prop="description"/>
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
        <el-form-item label="标题" prop="chatislandName">
          <el-input v-model="form.chatislandName" placeholder="请输入标题" maxlength="120"/>
        </el-form-item>
        <el-form-item label="标签" prop="chatislandLabel">
          <el-checkbox-group v-model="chooseTag" @change="changeLabel">
            <el-checkbox v-for="item in tagList" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="isSenior">
          <el-select v-model="form.isSenior" @change="form.chatislandCover=undefined">
            <el-option label="普通" value="0"></el-option>
            <el-option v-if="isVip==='1'" label="锁定" value="1"></el-option>
            <el-option v-if="isVip==='1'" label="非锁定" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="chatislandCover">
          <el-select v-if="form.isSenior !=='1'&& form.isSenior!=='2'" v-model="form.chatislandCover">
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="1" label="cover_1.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_1.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="2" label="cover_2.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_2.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="3" label="cover_3.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_3.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="4" label="cover_4.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_4.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="5" label="cover_5.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_5.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="6" label="cover_6.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_6.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="7" label="cover_7.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_7.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="8" label="cover_8.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_8.png"/></el-option>
            <el-option style="text-align:center;height:100px;margin-top: 5px;" value="9" label="cover_9.png"><img
              style="width: 50px; height: 100px;" src="../../assets/images/normal_cover/cover_9.png"/></el-option>
          </el-select>
          <img v-for="path in covers" style="max-width: 100%;"
               v-if="form.isSenior !==undefined && form.isSenior !== '0' && form.chatislandCover!==undefined"
               :src="path"/>
          <el-upload v-if="form.isSenior !==undefined && form.isSenior !== '0'"
                     class="upload-demo"
                     drag
                     :on-success="uploadSuccess"
                     :file-list="covers"
                     :action="uploadUrl">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="form.isSenior==='1'" label="钻石数量" prop="diamondCount">
          <el-select v-model="form.diamondCount">
            <el-option value="3" label="3"></el-option>
            <el-option value="5" label="5"></el-option>
            <el-option value="10" label="10"></el-option>
            <el-option value="20" label="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            :rows="5"
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
import {
  addChatisland,
  delChatisland,
  getChatisland,
  listChatisland,
  updateChatisland
} from "@/api/chatislandApi/chatisland";
import draggable from 'vuedraggable'
export default {
  components:{draggable},
  name: "Chatisland",
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API + "/system/oss/upload", // 上传的图片服务器地址
      chooseTag: [],
      coverList: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      tagList: ['Flirt', 'Texting', 'Advice', 'Confession', 'Lifestyle', 'Other', 'Relationship', 'Cooking', 'Friendship', 'Couples', 'Watching', 'Dancing', 'Drawing', 'Dates', 'Group', 'Novelty', 'Reading', 'Singing', 'Singles', 'Sport'],
      userId: undefined,
      isVip: undefined,
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
      covers: [],
      form: {
        chatislandName: '',
        chatislandLabel: '',
        isSenior: undefined,
        chatislandCover: '',
        diamondCount: undefined
      },
      // 表单校验
      rules: {
        chatislandName: [
          {required: true, message: "名称不能为空", trigger: "blur"}
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
      if (this.$route.query.isVip) {
        this.isVip = this.$route.query.isVip;
      }
      if (null != this.$route.query.userId) {
        const userId = this.$route.query.userId;
        this.userId = userId;
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
      this.chooseTag = []
      this.covers = []
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
      this.single = selection.length !== 1
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
        if (this.form.chatislandLabel !== undefined && this.form.chatislandLabel !== '' && this.form.chatislandLabel !== null) {
          this.chooseTag = JSON.parse(this.form.chatislandLabel)
        }
        if(this.form.chatislandCover !== undefined && this.form.chatislandCover !== ''){
          if(this.form.chatislandCover.indexOf("[")>-1){
            this.covers = JSON.parse(this.form.chatislandCover)
          }else {
            this.covers.push(this.form.chatislandCover)
          }
        }
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
            console.log(this.form)
            this.form.userId = this.userId
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
    },
    changeLabel() {
      this.form.chatislandLabel = JSON.stringify(this.chooseTag)
    },
    uploadSuccess(response, file, fileList) {
      // this.form.chatislandCover = response.data.fileRoute
      this.covers.push(response.data.fileRoute)
      if (this.covers.length > 1) {
        this.form.chatislandCover = JSON.stringify(this.covers)
      } else {
        this.form.chatislandCover = response.data.fileRoute
      }
    }
  }
};
</script>
