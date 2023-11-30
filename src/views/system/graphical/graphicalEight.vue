<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">基础指标 - 在线时长</h3>
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
  <div class="home">
    <div class="barChart" ref="barChart"></div>
  </div>

    <hr>
    <h3 style="color: black;text-align: center">服务效率 - 所有消息平均响应时间</h3>
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
    <div class="home">
      <div class="barChart" ref="barChart1"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">服务效率 - 有效接单率</h3>
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
    <div class="home">
      <div class="barChart" ref="barChart2"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">服务效率 - 深度会话率</h3>
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
    <div class="home">
      <div class="barChart" ref="barChart3"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">付费转化情况 - 钻石消耗</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart5"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">付费转化情况 - 绑定用户</h3>
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
    <div class="home">
      <div class="barChart" ref="barChart4"></div>
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
      chatterUser:['chatter1','chatter2','chatter3','chatter4','chatter5','chatter6'],
      onlineLongTime:[10,20,10,15,65,50]

    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");

    },
    initBarChart() {
      // 通过 $ref 进行挂载
      let myChart = this.$echarts.init(this.$refs.barChart);
      let myChart1 = this.$echarts.init(this.$refs.barChart1);
      let myChart2 = this.$echarts.init(this.$refs.barChart2);
      let myChart3 = this.$echarts.init(this.$refs.barChart3);
      let myChart4 = this.$echarts.init(this.$refs.barChart4);
      let myChart5 = this.$echarts.init(this.$refs.barChart5);

      let option = {
        xAxis: {
          type: 'category',
          data: this.chatterUser
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.onlineLongTime,
            type: 'bar'
          }
        ]
      };
      myChart.setOption(option);
      let option1 = {
        xAxis: {
          type: 'category',
          data: this.chatterUser
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.onlineLongTime,
            type: 'bar'
          }
        ]
      };
      myChart1.setOption(option1);
      let option2 = {
        xAxis: {
          type: 'category',
          data: this.chatterUser
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.onlineLongTime,
            type: 'bar'
          }
        ]
      };
      myChart2.setOption(option2);
      let option3 = {
        xAxis: {
          type: 'category',
          data: this.chatterUser
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.onlineLongTime,
            type: 'bar'
          }
        ]
      };
      myChart3.setOption(option3);
      let option4 = {
        xAxis: {
          type: 'category',
          data: this.chatterUser
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.onlineLongTime,
            type: 'bar'
          }
        ]
      };
      myChart4.setOption(option4);
      let option5 = {
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
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'Precipitation',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      myChart5.setOption(option5);

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
  width: 500px;
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

