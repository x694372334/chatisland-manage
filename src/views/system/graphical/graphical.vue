<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">基础App数据</h3>
    <hr>

    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange">
      </el-date-picker>
    </el-row>
    <div class="home" style="margin-top:30px">
      <div class="barChart" ref="barChart"></div>
    </div>
    <el-row>
      <el-table v-loading="loading" :data="basicAppDataList" height="680">
        <el-table-column label="DATE" align="center" key="date" prop="date"/>
        <el-table-column label="WNU" align="center" key="wnu" prop="wnu"/>
        <el-table-column label="MNU" align="center" key="mnu" prop="mnu"/>
        <el-table-column label="WAU" align="center" key="wau" prop="wau"/>
        <el-table-column label="MAU" align="center" key="mau" prop="mau"/>
      </el-table>
    </el-row>
    <el-row>
      <el-card style="height: 1300px;" class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">营收数据</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="revenueDataRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchRevenueData">查询</el-button>
          </el-row>
        </div>
        <div class="home" style="height: 1100px;width: 100%;">
          <div class="barChart" ref="revenueDataChart"></div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {basicsAppData, tableBasicsAppData, revenueData} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
    this.initRevenueDataBarChart()
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      loading: false,
      basicAppDataList:[],
      dataRange: [],
      revenueDataRange: [],
      revenueDateList: [],
      reportRangeDNU: [],
      reportRangeDNUTest: [],
      reportRangeWNU: [],
      reportRangeWNUTest: [],
      legendRange: ['DNU', /*'WNU', 'MNU', */'DAU', /*'WAU','MAU',*/'次留', '3留', '7留', '14留', '30留'],
      xAxisRange: ['12-03'],
      xAxisRangeTest: [],
      systemDate: {},
      reportRangeMNU: [],
      reportRangeMNUTest: [],
      reportRangeDAU: [],
      reportRangeDAUTest: [],
      reportRangeWAU: [],
      reportRangeWAUTest: [],
      reportRangeMAU: [],
      reportRangeMAUTest: [],
      reportRangeNextLeave: [],
      reportRangeNextLeaveTest: [],
      reportRangeThreeLeave: [],
      reportRangeThreeLeaveTest: [],
      reportRangeSevenLeave: [],
      reportRangeSevenLeaveTest: [],
      reportRangeFourteenLeave: [],
      reportRangeFourteenLeaveTest: [],
      reportRangeThirtyLeave: [],
      reportRangeThirtyLeaveLeaveTest: [],
    };
  },
  methods: {
    searchRevenueData() {
      let startDate = this.revenueDataRange[0]
      let endDate = this.revenueDataRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.revenueData(data)
    },
    revenueData(data) {
      revenueData(data).then(response => {
        if (response.data.dateMap) {
          this.revenueDateList = Object.keys(response.data.dateMap)
          let memberList = []
          let payList = []
          let arPuList = []
          let arpPuList = []
          let memberSumList = []
          let flashChatSumList = []
          let diamondSumList = []
          let freeFlashChatProduceList = []
          let freeDiamondProduceList = []
          let flashChatProduceList = []
          let diamondProduceList = []
          let freeFlashChatConsumeList = []
          let freeDiamondUnblockConsumeList = []
          let freeDiamondGiftConsumeList = []
          let flashChatConsumeList = []
          let diamondUnblockConsumeList = []
          let diamondGiftConsumeList = []
          for (let i = 0; i < this.revenueDateList.length; i++) {
            let key = this.revenueDateList[i]
            let data = response.data.dateMap[key]
            console.log(data)
            memberList.push(data.member)
            payList.push(data.pay)
            arPuList.push(data.arPu)
            arpPuList.push(data.arpPu)
            memberSumList.push(data.memberSum)
            flashChatSumList.push(data.flashChatSum)
            diamondSumList.push(data.diamondSum)
            freeFlashChatProduceList.push(data.freeFlashChatProduce)
            freeDiamondProduceList.push(data.freeDiamondProduce)
            flashChatProduceList.push(data.flashChatProduce)
            diamondProduceList.push(data.diamondProduce)
            freeFlashChatConsumeList.push(data.freeFlashChatConsume)
            freeDiamondUnblockConsumeList.push(data.freeDiamondUnblockConsume)
            freeDiamondGiftConsumeList.push(data.freeDiamondGiftConsume)
            flashChatConsumeList.push(data.flashChatConsume)
            diamondUnblockConsumeList.push(data.diamondUnblockConsume)
            diamondGiftConsumeList.push(data.diamondGiftConsume)
          }

          let myChart = this.$echarts.init(this.$refs.revenueDataChart);
          let option = {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['会员渗透', '付费渗透', '付费深度-arpu', '付费深度-arpPu(单位:美分)',
                '充值流水-解锁会员', '充值流水-闪聊', '充值流水-钻石',
                '道具产出-免费闪聊', '道具产出-免费钻石', '道具产出-付费闪聊', '道具产出-付费钻石',
                '道具消耗-免费闪聊', '道具消耗-付费闪聊', '道具消耗-免费钻石解锁', '道具消耗-免费钻石赠送', '道具消耗-付费钻石解锁', '道具消耗-付费钻石赠送']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.revenueDateList
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '会员渗透',
                type: 'line',
                stack: 'Total',
                data: memberList
              },
              {
                name: '付费渗透',
                type: 'line',
                stack: 'Total',
                data: payList
              },
              {
                name: '付费深度-arpu',
                type: 'line',
                stack: 'Total',
                data: arPuList
              },
              {
                name: '付费深度-arpPu(单位:美分)',
                type: 'line',
                stack: 'Total',
                data: arpPuList
              },
              {
                name: '充值流水-解锁会员',
                type: 'line',
                stack: 'Total',
                data: memberSumList
              },
              {
                name: '充值流水-闪聊',
                type: 'line',
                stack: 'Total',
                data: flashChatSumList
              },
              {
                name: '充值流水-钻石',
                type: 'line',
                stack: 'Total',
                data: diamondSumList
              },
              {
                name: '道具产出-免费闪聊',
                type: 'line',
                stack: 'Total',
                data: freeFlashChatProduceList
              },
              {
                name: '道具产出-免费钻石',
                type: 'line',
                stack: 'Total',
                data: freeDiamondProduceList
              },
              {
                name: '道具产出-付费闪聊',
                type: 'line',
                stack: 'Total',
                data: flashChatProduceList
              },
              {
                name: '道具产出-付费钻石',
                type: 'line',
                stack: 'Total',
                data: diamondProduceList
              },
              {
                name: '道具消耗-免费闪聊',
                type: 'line',
                stack: 'Total',
                data: freeFlashChatConsumeList
              },
              {
                name: '道具消耗-付费闪聊',
                type: 'line',
                stack: 'Total',
                data: flashChatConsumeList
              },
              {
                name: '道具消耗-免费钻石解锁',
                type: 'line',
                stack: 'Total',
                data: freeDiamondUnblockConsumeList
              },
              {
                name: '道具消耗-免费钻石赠送',
                type: 'line',
                stack: 'Total',
                data: freeDiamondGiftConsumeList
              },
              {
                name: '道具消耗-付费钻石解锁',
                type: 'line',
                stack: 'Total',
                data: diamondUnblockConsumeList
              },
              {
                name: '道具消耗-付费钻石赠送',
                type: 'line',
                stack: 'Total',
                data: diamondGiftConsumeList
              }
            ]
          };
          myChart.clear();
          myChart.setOption(option);
        }
      })
    },
    initRevenueDataBarChart() {
      this.revenueData({})
    },
    searchConsumeData() {
      let startDate = this.consumeDateRange[0]
      let endDate = this.consumeDateRange[1]
      let data = {
        startDate: startDate,
        endDate: endDate
      }
      this.handleChange(data)
    },
    handleChange() {
      this.xAxisRange = [];
      this.xAxisRangeTest = [];

      let startDate = this.dataRange[0]
      let endDate = this.dataRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }

      tableBasicsAppData(data).then(response =>{
        if(response.code ===200){
          this.basicAppDataList = response.data
        }
      })

      basicsAppData(data).then(response => {
        this.reportRangeDNU = [];
        // this.reportRangeWNU =[];
        // this.reportRangeMNU =[];
        this.reportRangeDAU = [];
        // this.reportRangeWAU =[];
        // this.reportRangeMAU =[];
        this.reportRangeNextLeave = []
        this.reportRangeThreeLeave = []
        this.reportRangeSevenLeave = []
        this.reportRangeFourteenLeave = []
        this.reportRangeThirtyLeave = []
        this.xAxisRangeTest = []
        this.reportRangeDNUTest = []
        // this.reportRangeWNUTest=[]
        // this.reportRangeMNUTest=[]
        this.reportRangeDAUTest = []
        // this.reportRangeWAUTest=[]
        // this.reportRangeMAUTest=[]
        this.reportRangeNextLeaveTest = []
        this.reportRangeThreeLeaveTest = []
        this.reportRangeSevenLeaveTest = []
        this.reportRangeFourteenLeaveTest = []
        this.reportRangeThirtyLeaveLeaveTest = []
        // if(response.data.length > 7){
        //   this.$message.error("不可超过七天,否则无法展示！")
        //   return;
        // }

        for (var i = 0; i < response.data.length; i++) {
          this.systemDate = response.data[i];
          this.xAxisRangeTest.push(Object.keys(response.data[i]));
          this.reportRangeDNUTest.push(this.systemDate[Object.keys(this.systemDate)].dnu)
          // this.reportRangeWNUTest.push(this.systemDate[Object.keys(this.systemDate)].wnu)
          // this.reportRangeMNUTest.push(this.systemDate[Object.keys(this.systemDate)].mnu)
          this.reportRangeDAUTest.push(this.systemDate[Object.keys(this.systemDate)].dau)
          // this.reportRangeWAUTest.push(this.systemDate[Object.keys(this.systemDate)].wau)
          // this.reportRangeMAUTest.push(this.systemDate[Object.keys(this.systemDate)].mau)
          this.reportRangeNextLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].nextLeave)
          this.reportRangeThreeLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].threeLeave)
          this.reportRangeSevenLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].sevenLeave)
          this.reportRangeFourteenLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].fourteenLeave)
          this.reportRangeThirtyLeaveLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].thirtyLeave)
        }
        console.log(this.xAxisRangeTest)
        this.xAxisRange = this.xAxisRangeTest;
        this.reportRangeDNU = this.reportRangeDNUTest;
        // this.reportRangeWNU = this.reportRangeWNUTest;
        // this.reportRangeMNU = this.reportRangeMNUTest;
        this.reportRangeDAU = this.reportRangeDAUTest;
        // this.reportRangeWAU = this.reportRangeWAUTest;
        // this.reportRangeMAU = this.reportRangeMAUTest;
        this.reportRangeNextLeave = this.reportRangeNextLeaveTest;
        this.reportRangeThreeLeave = this.reportRangeThreeLeaveTest;
        this.reportRangeSevenLeave = this.reportRangeSevenLeaveTest;
        this.reportRangeFourteenLeave = this.reportRangeFourteenLeaveTest;
        this.reportRangeThirtyLeave = this.reportRangeThirtyLeaveLeaveTest;
        this.initBarChart();
      })
    },
    initBarChart() {
      // 通过 $ref 进行挂载
      let myChart = this.$echarts.init(this.$refs.barChart);
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendRange
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisRange
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'DNU',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeDNU
          },
          // {
          //   name: 'WNU',
          //   type: 'line',
          //   // stack: 'Total',
          //   data: this.reportRangeWNU
          // },
          // {
          //   name: 'MNU',
          //   type: 'line',
          //   // stack: 'Total',
          //   data: this.reportRangeMNU
          // },
          {
            name: 'DAU',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeDAU
          },
          // {
          //   name: 'WAU',
          //   type: 'line',
          //   // stack: 'Total',
          //   data: this.reportRangeWAU
          // },
          // {
          //   name: 'MAU',
          //   type: 'line',
          //   // stack: 'Total',
          //   data: this.reportRangeMAU
          // },
          {
            name: '次留',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeNextLeave
          },
          {
            name: '3留',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeThreeLeave
          },
          {
            name: '7留',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeSevenLeave
          },
          {
            name: '14留',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeFourteenLeave
          },
          {
            name: '30留',
            type: 'line',
            // stack: 'Total',
            data: this.reportRangeThirtyLeave
          }
        ]
      };
      myChart.setOption(option);

    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}

.home {
  width: 1000px;
  height: 400px;
  margin: auto;
  border: 0px solid #000000;

  //  宽高是必须给的，可以给百分比、具体的像素等....
  .barChart {
    width: 100%;
    height: 100%;
  }
}
</style>

