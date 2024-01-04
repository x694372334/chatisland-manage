<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--chatter数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
<!--          <el-form-item label="用户" prop="userId">
            <el-input
              v-model="queryParams.userId"
              placeholder="请输入用户名"
              clearable
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>-->
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
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="orderList">
<!--          <el-table-column label="订单编号" align="center" key="orderId" prop="orderId"/>
          <el-table-column label="用户编号" align="center" key="userId" prop="userId"/>-->
          <el-table-column label="用户昵称" align="center" key="userNickName" prop="userNickName"/>
          <el-table-column label="道具SKU" align="center" key="propSku" prop="propSku"/>
          <el-table-column label="道具类型" align="center" key="propTypeName" prop="propTypeName"/>
          <el-table-column label="订单价格" align="center" key="price" prop="price"/>
          <el-table-column label="支付时间" align="center" prop="payTime" width="160">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.payTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支付方式" align="center" key="payType" prop="payType"/>
          <el-table-column label="充值来源" align="center" key="rechargeSource" prop="rechargeSource"/>
          <el-table-column label="关联chatter" align="center" key="chatterName" prop="chatterName"/>
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
  </div>
</template>

<script>
import {deleteOrder, listOrder} from "../../../api/system/order";
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
      orderList: null,
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
        userId: undefined,
        propType: undefined
      },
      // 列信息
      columns: [
        {key: 0, label: `用户昵称`, visible: true},
        {key: 1, label: `道具SKU`, visible: true},
        {key: 2, label: `道具类型`, visible: true},
        {key: 3, label: `订单价格`, visible: true},
        {key: 4, label: `支付方式`, visible: true},
        {key: 5, label: `充值来源`, visible: true},
        {key: 6, label: `支付时间`, visible: true},
        {key: 7, label: `关联chatter`, visible: true}
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
          this.orderList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      if(this.dateRange.length>0){
        this.queryParams.beginTime = this.dateRange[0].getTime()
        this.queryParams.endTime = this.dateRange[1].getTime()
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
    handleDelete(row) {
      this.$modal.confirm('是否确认删除用户信息编号为"' + row.orderId + '"的订单？').then(() => {
        this.loading = true;
        return deleteOrder(row.orderId);
      }).then(() => {
        this.loading = false;
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      }).finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>
