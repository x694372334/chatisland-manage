<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">人设维度 - 建联转化</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(1)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart"></div>
    </div>
  </div>
</template>

<script>

import {constructionUnionChangeRate} from "@/api/system/graphical";

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
      dataRange: [],
      countAbs: [],
      countRatio: [],
      countUserName: []

    };
  },
  methods: {
    handleChange() {
      this.countAbs= []
      this.countRatio= []
      this.countUserName=[]
      let startDate = this.dataRange[0]
      let endDate = this.dataRange[1]
      let data = {
        startDate: startDate,
        endDate: endDate
      }
      constructionUnionChangeRate(data).then(response => {
        this.countAbs = response.data.countAbs;
        this.countRatio = response.data.countRatio;
        this.countUserName = response.data.countUserName;
        this.initBarChart();
      })
    },
    goTarget(href) {
      window.open(href, "_blank");

    },
    initBarChart() {
      // 通过 $ref 进行挂载
      let myChart = this.$echarts.init(this.$refs.barChart);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['建联消耗绝对值', '健联率']
        },
        xAxis: [
          {
            type: 'category',
            data: this.countUserName,
            // data: ['WineConnoisseur30', 'satterlee', 'brnca', 'CreativeSoul22', 'FilmBuffAmy', 'lauramaire', 'NatureExplorer27'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            min: 0,
            max: 150,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '建联消耗绝对值',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + '';
              }
            },
            data: this.countAbs
            // data: [
            //   3, 6, 5, 4, 3, 6, 5
            // ]
          },
          {
            name: '健联率',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + '%';
              }
            },
            data: this.countRatio
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
  border: 0px solid lightcoral;
  background-color: #FCFCFC;

  //  宽高是必须给的，可以给百分比、具体的像素等....
  .barChart {
    width: 100%;
    height: 100%;
  }

  //  宽高是必须给的，可以给百分比、具体的像素等....
  .barChart1 {
    width: 100%;
    height: 100%;
  }
}
</style>

