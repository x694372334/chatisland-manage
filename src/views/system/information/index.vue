<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="系统公告状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择系统公告状态"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        >
          <el-option :key="0" :value="0" label="未发布"></el-option>
          <el-option :key="1" :value="1" label="已发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="dateRange"
          style="width: 240px"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetFormQuery">重置</el-button>
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
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="informationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="通知主键" align="center" prop="id"/>
      <el-table-column label="通知正文" align="center" prop="content" />
      <el-table-column label="通知链接" align="center" prop="link" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
            icon="el-icon-s-promotion"
            @click="handlePublish(scope.row)"
          >发布
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

    <!-- 添加或修改道具类型配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="通知正文" prop="content">
          <el-input type="textarea" :rows="10" v-model="form.content" placeholder="请输入通知正文"/>
        </el-form-item>
        <el-form-item label="通知链接" prop="link">
          <el-input v-model="form.link" placeholder="请输入通知链接"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listInformation, getInformation, delInformation, addInformation, publishInformation} from "@/api/system/information";

export default {
  name: "Information",
  data() {
    const isHttp = (rule, value, callback) => {
      if (value) {
        const reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
        const reg2 = /(http|https):\/\/([\w.]+\/?)\S*/
        if (reg.test(value) && reg2.test(value)) {
          callback();
        } else {
          callback('请输入正确的网址');
        }
      }
    }
    return {
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
      // 道具类型表格数据
      informationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询道具类型
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: undefined
      },
      // 表单道具类型
      form: {},
      // 表单校验
      rules: {
        content: [
          {required: true, message: "通知正文不能为空", trigger: "blur"}
        ],
        link: [
          {validator: isHttp, trigger: ["blur", "change"]}
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询道具类型列表 */
    getList() {
      this.loading = true;
      listInformation(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.informationList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        typeName: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetFormQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加道具类型";
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInformation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改道具类型";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          addInformation(this.form).then(response => {
            this.$modal.msgSuccess("新增成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除通知编号为"' + ids + '"的数据项？').then(function () {
        return delInformation(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    /** 发布按钮操作 */
    handlePublish(row) {
      this.$modal.confirm('是否确认发布通知编号为"' + row.id + '"的数据项？').then(function () {
        return publishInformation(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("发布成功");
      }).catch(() => {
      });
    }
  }
};
</script>
