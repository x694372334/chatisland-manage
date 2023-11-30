<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">基础App数据</h3>
    <hr>
    <el-row style="margin-top:30px">
      <el-col :span="12" style="text-align: center">
        <el-date-picker
          v-model="dataRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @blur=""
          @change="handleChange">
        </el-date-picker>
      </el-col>
    </el-row>
    <div class="home" style="margin-top:30px">
      <div class="barChart" ref="barChart" ></div>
    </div>
  </div>
</template>

<script>
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
      reportRange:[1, 6, 12, 18, 34, 57, 64],
      legendRange:['DNU', 'WNU', 'MNU', 'DAU', 'WAU','MAU','次留','3留','7留','14留','30留'],
      xAxisRange:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
    handleChange() {
      console.log(this.dataRange)
      console.log(this.dataRange[0])
      console.log(this.dataRange[1])
      this.reportRange[0]=123;
      this.reportRange[1]=244;
      console.log(this.reportRange[0])
      console.log(this.reportRange)
      console.log(this.legendRange)
      this.legendRange[0]="aaa";
      this.xAxisRange[0]="data";
      console.log(this.legendRange)
      this.initBarChart();
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
            data: this.reportRange
          },
          {
            name: 'WNU',
            type: 'line',
            stack: 'Total',
            data: [1, 10, 50, 60, 75, 80, 105]
          },
          {
            name: 'MNU',
            type: 'line',
            stack: 'Total',
            data: [5, 10, 15, 20, 40, 50, 65]
          },
          {
            name: 'DAU',
            type: 'line',
            stack: 'Total',
            data: [6, 12, 22, 24, 35, 42, 48]
          },
          {
            name: 'WAU',
            type: 'line',
            stack: 'Total',
            data: [1, 6, 12, 18, 34, 57, 64]
          },
          {
            name: 'MAU',
            type: 'line',
            stack: 'Total',
            data: [6, 15, 24, 32, 46, 58, 66]
          },
          {
            name: '次留',
            type: 'line',
            stack: 'Total',
            data: [1, 5, 6, 6, 7, 10, 12]
          },
          {
            name: '3留',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 1, 2, 3, 4]
          },
          {
            name: '7留',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 1, 2, 2]
          },
          {
            name: '14留',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 0, 1, 1]
          },
          {
            name: '30留',
            type: 'line',
            stack: 'Total',
            data: [0, 0, 0, 0, 0, 0, 1]
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

