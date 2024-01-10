<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">基础App数据</h3>
    <hr>

<!--    <el-row>-->
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <el-row style="text-align: center;font-size:24px; font-weight: bold;">profile查看转化</el-row>-->
<!--          <el-row style="text-align: center;margin: 30px 0;">-->
<!--            <el-date-picker-->
<!--              v-model="dataRange"-->
<!--              type="dataRange"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              @blur="">-->
<!--            </el-date-picker>-->

<!--            <el-button @click="searchConsumeData">查询</el-button>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        <div class="home">-->
<!--          <div class="barChart" ref="barChart"></div>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-row>-->

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
      <div class="barChart" ref="barChart" ></div>
    </div>
  </div>
</template>

<script>
import {basicsAppData} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      dataRange:[],
      reportRangeDNU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeDNUTest:[],
      reportRangeWNU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeWNUTest:[],
      legendRange:['DNU', 'WNU', 'MNU', 'DAU', 'WAU','MAU','次留','3留','7留','14留','30留'],
      xAxisRange:['12-03'],
      xAxisRangeTest:[],
      systemDate:{},
      reportRangeMNU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeMNUTest:[],
      reportRangeDAU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeDAUTest:[],
      reportRangeWAU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeWAUTest:[],
      reportRangeMAU:[0, 0, 0, 0, 0, 0, 0],
      reportRangeMAUTest:[],
      reportRangeNextLeave:[0, 0, 0, 0, 0, 0, 0],
      reportRangeNextLeaveTest:[],
      reportRangeThreeLeave:[0, 0, 0, 0, 0, 0, 0],
      reportRangeThreeLeaveTest:[],
      reportRangeSevenLeave:[0, 0, 0, 0, 0, 0, 0],
      reportRangeSevenLeaveTest:[],
      reportRangeFourteenLeave:[0, 0, 0, 0, 0, 0, 0],
      reportRangeFourteenLeaveTest:[],
      reportRangeThirtyLeave:[0, 0, 0, 0, 0, 0, 0],
      reportRangeThirtyLeaveLeaveTest:[],
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
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

      basicsAppData(data).then(response =>{
        this.reportRangeDNU =[];
        this.reportRangeWNU =[];
        this.reportRangeMNU =[];
        this.reportRangeDAU =[];
        this.reportRangeWAU =[];
        this.reportRangeMAU =[];
        this.reportRangeNextLeave=[]
        this.reportRangeThreeLeave =[]
        this.reportRangeSevenLeave =[]
        this.reportRangeFourteenLeave = []
        this.reportRangeThirtyLeave = []
        this.xAxisRangeTest=[]
        this.reportRangeDNUTest=[]
        this.reportRangeWNUTest=[]
        this.reportRangeMNUTest=[]
        this.reportRangeDAUTest=[]
        this.reportRangeWAUTest=[]
        this.reportRangeMAUTest=[]
        this.reportRangeNextLeaveTest=[]
        this.reportRangeThreeLeaveTest=[]
        this.reportRangeSevenLeaveTest=[]
        this.reportRangeFourteenLeaveTest=[]
        this.reportRangeThirtyLeaveLeaveTest = []
          if(response.data.length > 7){
            this.$message.error("不可超过七天,否则无法展示！")
            return;
          }

        for (var i = 0; i < response.data.length; i++) {
          this.systemDate = response.data[i];
          this.xAxisRangeTest.push(Object.keys(response.data[i]));
          this.reportRangeDNUTest.push(this.systemDate[Object.keys(this.systemDate)].dnu)
          this.reportRangeWNUTest.push(this.systemDate[Object.keys(this.systemDate)].wnu)
          this.reportRangeMNUTest.push(this.systemDate[Object.keys(this.systemDate)].mnu)
          this.reportRangeDAUTest.push(this.systemDate[Object.keys(this.systemDate)].dau)
          this.reportRangeWAUTest.push(this.systemDate[Object.keys(this.systemDate)].wau)
          this.reportRangeMAUTest.push(this.systemDate[Object.keys(this.systemDate)].mau)
          this.reportRangeNextLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].nextLeave)
          this.reportRangeThreeLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].threeLeave)
          this.reportRangeSevenLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].sevenLeave)
          this.reportRangeFourteenLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].fourteenLeave)
          this.reportRangeThirtyLeaveLeaveTest.push(this.systemDate[Object.keys(this.systemDate)].thirtyLeave)
        }
        console.log(this.xAxisRangeTest)
        this.xAxisRange = this.xAxisRangeTest;
        this.reportRangeDNU = this.reportRangeDNUTest;
        this.reportRangeWNU = this.reportRangeWNUTest;
        this.reportRangeMNU = this.reportRangeMNUTest;
        this.reportRangeDAU = this.reportRangeDAUTest;
        this.reportRangeWAU = this.reportRangeWAUTest;
        this.reportRangeMAU = this.reportRangeMAUTest;
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
            stack: 'Total',
            data: this.reportRangeDNU
          },
          {
            name: 'WNU',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeWNU
          },
          {
            name: 'MNU',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeMNU
          },
          {
            name: 'DAU',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeDAU
          },
          {
            name: 'WAU',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeWAU
          },
          {
            name: 'MAU',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeMAU
          },
          {
            name: '次留',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeNextLeave
          },
          {
            name: '3留',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeThreeLeave
          },
          {
            name: '7留',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeSevenLeave
          },
          {
            name: '14留',
            type: 'line',
            stack: 'Total',
            data: this.reportRangeFourteenLeave
          },
          {
            name: '30留',
            type: 'line',
            stack: 'Total',
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

