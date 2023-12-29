<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--chatter数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
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
          <el-form-item label="时间间隔" prop="name">
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

        <el-table v-loading="loading" :data="chatterSalaryList" height="680">
<!--          <el-table-column label="chatter编号" align="center" key="chatterId" prop="chatterId"/>-->
          <el-table-column label="Chatter No." align="center" key="nickName" prop="nickName"/>
          <el-table-column label="Name" align="center" key="name" prop="name"/>
<!--          <el-table-column label="在线时长(分钟)" align="center" key="onlineDuration" prop="onlineDuration"/>-->
<!--          <el-table-column label="送达会话数" align="center" key="firstRecordSum" prop="firstRecordSum"/>-->
          <el-table-column label="Effective Order Acceptance Rate" align="center" key="effectiveOrder" prop="effectiveOrder"/>
          <el-table-column label="Average Response Time" align="center" key="avgRespTime" prop="avgRespTime"/>
          <el-table-column label="Deep Session Rate(%)" align="center" key="deepSession" prop="deepSession"/>
<!--          <el-table-column label="用户lock数" align="center" key="lockSum" prop="lockSum"/>-->
          <el-table-column label="Diamond Gift" align="center" key="giftDiamond" prop="giftDiamond"/>
          <el-table-column label="Card Unlocked" align="center" key="unlockChatislandSum" prop="unlockChatislandSum"/>
          <el-table-column label="Card Unlocked Diamond" align="center" key="unlockDiamond" prop="unlockDiamond"/>
<!--          <el-table-column label="VIP转化个数" align="center" key="memberSum" prop="memberSum"/>-->
          <el-table-column label="VIP Conversion" align="center" key="memberPriceSum" prop="memberPriceSum"/>
        </el-table>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {listChatterSalaryParams} from "@/api/system/chatterBindName";
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
      chatterSalaryList: null,
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
        startDate:undefined,
        endDate: undefined
      },
      // 列信息
      columns: [
        {key: 0, label: `chatter编号`, visible: true},
        {key: 1, label: `chatter用户名`, visible: true},
        {key: 2, label: `chatter昵称`, visible: true},
        {key: 3, label: `真实名称`, visible: true}
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listChatterSalaryParams(this.queryParams).then(response => {
          this.chatterSalaryList = response.data.list;
          this.loading = false;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if(this.dateRange.length>0){
        this.queryParams.startDate = new Date(this.dateRange[0]).getTime()
        this.queryParams.endDate = new Date(this.dateRange[1]).getTime()
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
    }
  }
};
</script>
