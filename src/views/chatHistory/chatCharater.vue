<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户昵称" prop="toUserNickName">
        <el-inputn
          v-model="queryParams.toUserNickName"
          placeholder="请输入用户账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-row style="text-align: center">
          <el-date-picker
            v-model="dataRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur=""
            @change="getList()">
          </el-date-picker>
        </el-row>
      </el-form-item>
      <!--      <el-form-item label="用户账号" prop="userName">-->
<!--        <el-input-->
<!--          v-model="queryParams.userName"-->
<!--          placeholder="请输入用户账号"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="用户昵称" prop="nickName">-->
<!--        <el-input-->
<!--          v-model="queryParams.nickName"-->
<!--          placeholder="请输入用户昵称"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否会员" prop="isVip">-->
<!--        <el-select-->
<!--          v-model="queryParams.isVip"-->
<!--          placeholder="请选择是否会员"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        >-->
<!--          <el-option value="0" label="否" key="0"></el-option>-->
<!--          <el-option value="1" label="是" key="1"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">

<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleExport()"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          plain-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['system:user:export']"-->
<!--        >导出-->
<!--        </el-button>-->
<!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="发送方ID" align="center" prop="fromUserId" v-if="true"/>
      <el-table-column label="接收方ID" align="center" prop="toUserId"/>
      <el-table-column label="发送方昵称" align="center" prop="fromUserNickName"/>
      <el-table-column label="接收方昵称" align="center" prop="toUserNickName"/>
      <el-table-column label="聊天总数" align="center" prop="chatCount"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleExport(scope.row)"
          >导出
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="showChatislandList(scope.row)"
          >列表查看
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

    <!-- 添加或修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="头像地址" prop="avatarName">
          <el-select v-model="form.avatarName" placeholder="请选择">
            <el-option v-if="form.isVip==='0'||form.isVip===undefined" style="height: 50px;"
                       v-for="item in avatarList"
                       :key="item"
                       :label="item"
                       :value="item">
              <el-row type="flex" align="middle">
                <el-col :span="12">{{ item }}.png</el-col>
                <el-col :span="12"><img style="width: 50px; height: 50px;" :src="avatarHost+item+'.png'"/></el-col>
              </el-row>
            </el-option>
            <el-option v-if="form.isVip==='1'"
                       v-for="item in vipAvatarList"
                       :key="item"
                       :label="item"
                       :value="item">
              <el-row type="flex" align="middle">
                <el-col :span="12">{{ item }}.png</el-col>
                <el-col :span="12"><img style="width: 50px; height: 50px;" :src="avatarHost+item+'.png'"/></el-col>
              </el-row>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户账号"/>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称"/>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"/>
        </el-form-item>
        <el-form-item label="karma值" prop="karma">
          <el-input v-model="form.karma" placeholder="请输入karma值" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员" prop="isVip">
          <el-select v-model="form.isVip" placeholder="请选择">
            <el-option
              v-for="item in member"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="userLabel">
          <el-checkbox-group v-model="userLabel" @change="chooseUserLabel">
            <el-checkbox v-for="item in tagList" :label="item" :key="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="个人简介" prop="aboutMe">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.aboutMe"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="人设基本信息" prop="systemUserSetting">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.systemUserSetting"
            maxlength="3000"
            :rows="8"
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

    <el-dialog title="添加钻石" :visible.sync="addDiamondDialog" width="500px" append-to-body>
      <el-form label-width="80px">
        <el-form-item label="钻石数量">
          <el-select v-model="addDiamondCount">
            <el-option v-for="item in diamondList" :value="item" :label="item +'个'" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加次数">
          <el-input-number v-model="addDiamondTime"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDiamond2User">确 定</el-button>
        <el-button @click="cancelDiamond">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加闪聊" :visible.sync="addFlashChatDialog" width="500px" append-to-body>
      <el-form label-width="80px">
        <el-form-item label="闪聊数量">
          <el-select v-model="addFlashChatCount">
            <el-option v-for="item in flashChatList" :value="item" :label="item +'个'" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加次数">
          <el-input-number v-model="addFlashChatTime"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFlashChat2User">确 定</el-button>
        <el-button @click="cancelFlashChat">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listUser, getUser, delUser, addUser, updateUser} from "@/api/system/user";
import {
  addCharacterProp,
  selectChatHistoryToUser,
  selectChatHistoryExport,
  selectChatHistoryToCharacter
} from "../../api/chatislandApi/chatislandSysUser";
import {setProdChatisland} from "@/api/chatislandApi/chatisland";
export default {
  name: "User",
  data() {
    return {
      dataRange:[],
      historyUserId:undefined,
      dataJson:{
        userId:undefined,
        toUserId:undefined
      },
      warrantName: [],
      tagList: ['Flirt', 'Texting', 'Advice', 'Confession', 'Lifestyle', 'Other', 'Relationship', 'Cooking', 'Friendship', 'Couples', 'Watching', 'Dancing', 'Drawing', 'Dates', 'Group', 'Novelty', 'Reading', 'Singing', 'Singles', 'Sport'],
      avatarHost: 'https://chat-island.s3.us-west-1.amazonaws.com/avatar/',
      avatarList: ['man_1', 'man_2', 'man_3', 'man_4', 'other_1', 'other_2', 'other_3', 'other_4', 'other_5', 'other_6', 'other_7', 'woman_1', 'woman_2', 'woman_3', 'woman_4'],
      vipAvatarList: ['man_1', 'man_2', 'man_3', 'man_4', 'other_1', 'other_2', 'other_3', 'other_4', 'other_5', 'other_6', 'other_7', 'woman_1', 'woman_2', 'woman_3', 'woman_4',
        'vip_1', 'vip_2', 'vip_3', 'vip_4', 'vip_5', 'vip_6', 'vip_7', 'vip_8', 'vip_9', 'vip_10', 'vip_11', 'vip_12', 'vip_13', 'vip_14', 'vip_15'],
      options: [{
        value: '0',
        label: '女'
      }, {
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '其他'
      }],
      member: [{
        value: '0',
        label: '否'
      }, {
        value: '1',
        label: '是'
      }],
      diamondList:[5,30,99],
      flashChatList:[1,5,10],
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        toUserNickName: undefined,
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
        fromUserId:undefined,
        vipSource: undefined,
        vipDescribeDate: undefined,
        vipExpireDate: undefined,
        isComplimentary: undefined,
        isSystem: '1',
        isBeginnerGuidance: undefined,
        beginnerGuidanceTime: undefined,
        systemUserSetting: undefined
      },
      addDiamondUserId: undefined,
      addDiamondDialog: false,
      addDiamondCount: undefined,
      addDiamondTime: undefined,
      addFlashChatUserId: undefined,
      addFlashChatDialog: false,
      addFlashChatCount: undefined,
      addFlashChatTime: undefined,
      // 表单参数
      form: {
        avatarName: '',
        userName: '',
        nickName: '',
        age: undefined,
        karma: 0,
        sex: '',
        isVip: '',
        userLabel: '',
        aboutMe: '',
        systemUserSetting: '',
        isSystem: '1'
      },
      userLabel: [],
      // 表单校验
      rules: {
        userId: [
          {required: true, message: "用户ID不能为空", trigger: "blur"}
        ],
        userName: [
          {required: true, message: "用户账号不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },

  methods: {


    // showChatisland(row, index, done) {
    //   const userId = row.userId;
    //   console.log(userId)
    //   this.$router.push({
    //     path: "/chatisland/index",
    //     query: {
    //       userId: userId,
    //       isVip: row.isVip
    //     }
    //   });
    // },

    showPost(row, index, done) {
      const userId = row.userId;
      console.log(userId)
      this.$router.push({
        path: "/post/index",
        query: {
          userId: userId,
          from: JSON.stringify(this.form)
        }
      });
    },
    showPicture(row, index, done) {
      const roleId = row.userId;
      console.log(roleId)
      this.$router.push({path: '/characterPicture/index', query: {userId: roleId}});
    },
    /** 查询用户信息列表 */
    getList() {
      console.log(this.dataRange[0])
      console.log(this.dataRange[1])
      if(undefined === this.dataRange[0]){
        this.queryParams.startDate = '2023-01-01'
      }else{
        this.queryParams.startDate = this.dataRange[0]+ ''
      }
      if(undefined === this.dataRange[1]){
        this.queryParams.endDate = '2023-01-01'
      }else{
        this.queryParams.endDate = this.dataRange[1] + ''
      }
      if (null != this.$route.query.userId) {
        this.queryParams.userId = this.$route.query.userId;
        this.historyUserId = this.$route.query.userId;
      }
      console.log(this.historyUserId)
      this.loading = true;
      selectChatHistoryToCharacter(this.queryParams).then(response => {
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
      this.userLabel = []
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
        isSystem: '1',
        isBeginnerGuidance: undefined,
        beginnerGuidanceTime: undefined,
        systemUserSetting: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.dataRange = ['',''];
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
      this.single = selection.length !== 1
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
        this.form = response.data.user;
        this.form.isVip = ''+this.form.isVip
        this.form.sex = ''+this.form.sex
        if(this.form.userLabel !== undefined && this.form.userLabel !== '' && this.form.userLabel !== null){
          this.userLabel = JSON.parse(this.form.userLabel)
        }
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
          console.log(this.form)
          this.form.isSystem = '1'
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

    showChatisland(row, index, done) {
      const userId = row.userId;
      console.log(userId)
      this.$router.push({
        path: "/chatHistory/chatUser",
        query: {
          userId: userId,
          isVip: row.isVip
        }
      });
    },

    showChatislandList(row, index, done) {
      const userId = row.userId;
      console.log(userId)
      let startDate = '2023-01-01';
      let endDate = '2023-01-01';
      if(undefined === this.dataRange[0]){
        startDate = '2023-01-01'
      }else{
        startDate = this.dataRange[0]+ ''
      }
      if(undefined === this.dataRange[1]){
        endDate = '2023-01-01'
      }else{
        endDate = this.dataRange[1] + ''
      }
      this.$router.push({
        path: "/chatHistory/chatList",
        query: {
          fromUserId: row.fromUserId,
          toUserId: row.toUserId,
          startDate: startDate,
          endDate: endDate,
        }
      });
    },

    /** 导出按钮操作 */
    handleExport(row) {
      // const userIds = row.userId || this.ids;
      let startDate = '2023-01-01';
      let endDate = '2023-01-01';
      if(undefined === this.dataRange[0]){
        startDate = '2023-01-01'
      }else{
        startDate = this.dataRange[0]+ ''
      }
      if(undefined === this.dataRange[1]){
        endDate = '2023-01-01'
      }else{
        endDate = this.dataRange[1] + ''
      }
      if(null != row.fromUserId){
        this.dataJson.toUserId = row.fromUserId
      }
      this.dataJson.startDate = startDate;
      this.dataJson.endDate = endDate;
      if(null != row.fromUserId){
        this.dataJson.toUserId = row.fromUserId
      }
      console.log(this.dataJson.toUserId)
      this.dataJson.userId = this.$route.query.userId;
      console.log(this.dataJson.userId)
      this.download('system/user/selectChatHistoryExport', {
        ...this.dataJson
      }, `history_${new Date().getTime()}.xlsx`)
    },
    handleChange(file, fileList) {
      this.form.chatislandCover = fileList;
    },
    chooseUserLabel() {
      this.form.userLabel = JSON.stringify(this.userLabel)
      console.log(this.form.userLabel)
    },
    addDiamond(row){
      this.addDiamondCount = undefined
      this.addDiamondTime = undefined
      this.addDiamondUserId = row.userId
      this.addDiamondDialog = true
    },
    cancelDiamond(){
      this.addDiamondCount = undefined
      this.addDiamondUserId = undefined
      this.addDiamondDialog = false
      this.addDiamondTime = undefined
    },
    addDiamond2User(){
      let data = {
        userId: this.addDiamondUserId,
        propType: 3,
        perCount: this.addDiamondCount,
        count: this.addDiamondTime
      }
      this.addProp(data)
    },
    addProp(data){
      addCharacterProp(data).then(response => {
        if(response.data){
          this.$message.success("添加"+(data.propType===3?"钻石":"闪聊")+(data.perCount*data.count)+"个成功")
          this.addDiamondDialog = false
          this.addFlashChatDialog = false
        }
      });
    },
    addFlashChat(row){
      this.addFlashChatCount = undefined
      this.addFlashChatTime = undefined
      this.addFlashChatUserId = row.userId
      this.addFlashChatDialog = true
    },
    cancelFlashChat(){
      this.addFlashChatCount = undefined
      this.addFlashChatTime = undefined
      this.addFlashChatUserId = undefined
      this.addFlashChatDialog = false
    },
    addFlashChat2User(){
      let data = {
        userId: this.addFlashChatUserId,
        propType: 2,
        perCount: this.addFlashChatCount,
        count: this.addFlashChatTime
      }
      this.addProp(data)
    }
  }
};


</script>
