<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--chatter数据-->
      <el-col :span="24" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px">
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

        <el-table v-loading="loading" :data="chatterHourCountList" height="680">
          <el-table-column label="chatter名称" align="center" key="chatterName" prop="chatterName"/>
          <el-table-column v-for="item in timeList" align="center" :label="item" :key="item" :prop="item"/>
        </el-table>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {listAllChatter} from "../../../api/system/chatterBindName";
import {groupChatterHourCountMsg} from "../../../api/system/chatter";

export default {
  name: "Chatter",
  components: {Treeselect},
  data() {
    return {
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
      timeList: [],
      // 用户表格数据
      chatterHourCountList: null,
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
      allChatters: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        startDate: undefined,
        endDate: undefined
      },
      // 列信息
      columns: [],
    };
  },
  created() {
    // this.getList();
    this.getChatterList()
  },
  methods: {
    /** 查询chatter列表 */
    getChatterList() {
      listAllChatter().then(response => {
          this.allChatters = response.data;
        }
      );
    },
    getList() {
      this.loading = true;
      groupChatterHourCountMsg(this.queryParams).then(response => {
          if (response.code === 200) {
            let chatters = Object.keys(response.data)
            if (chatters.length > 0) {
              this.timeList = Object.keys(response.data[chatters[0]])
            }
            let list = []
            if(chatters.includes('total')){
              let totalData = response.data.total
              let countMsg = {chatterName:'总分单量'}
              for (let i = 0; i < this.timeList.length; i++) {
                let key = this.timeList[i]
                countMsg[key.toString()] = totalData[key].countMsg
              }
              list.push(countMsg)
            }
            chatters.splice(chatters.indexOf('total'),1)
            for (let i = 0; i < chatters.length; i++) {
              let chatterName = chatters[i]
              let chatterObj = response.data[chatterName]
              let countMsg = {}
              let effectiveMsg = {}
              let active = {}
              for (let j = 0; j < this.timeList.length; j++) {
                let key = this.timeList[j]
                let data = chatterObj[key]
                if (data) {
                  countMsg.chatterName = chatterName + '分单量'
                  countMsg[key.toString()] = data.countMsg ? data.countMsg : 0
                  effectiveMsg.chatterName = chatterName + '有效接单率'
                  effectiveMsg[key.toString()] = data.effectiveMsg ? data.effectiveMsg : 0
                  active.chatterName = chatterName + '活跃时间'
                  active[key.toString()] = data.active ? data.active : 0
                } else {
                  countMsg[key.toString()] = 0
                  effectiveMsg[key.toString()] = 0
                  active[key.toString()] = 0
                }

                // obj[key.toString()] = JSON.stringify(data)
              }
              list.push(countMsg)
              list.push(effectiveMsg)
              list.push(active)
            }
            this.chatterHourCountList = list;
            this.loading = false;
          }
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      if (this.dateRange.length > 0) {
        this.queryParams.startDate = new Date(this.dateRange[0]).getTime()
        this.queryParams.endDate = new Date(this.dateRange[1]).getTime()
      } else {
        this.$message.error('请选择开始结束时间')
        return false
      }
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.queryParams.deptId = undefined;
      this.$refs.tree.setCurrentKey(null);
      // this.handleQuery();
    }
  }
};
</script>
