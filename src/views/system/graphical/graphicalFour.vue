<template>
  <div>
    <h3 style="color: black;text-align: left">人设维度</h3>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">消耗深度</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="dataRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="search">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="barChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">内容消费</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="contentDataRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchContent">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="contentBarChart"></div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import {consumeDepth, contentConsume} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
    this.initContentBarChart();
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      dataRange: [],
      userIdList: [],
      contactCountList: [],
      unLockCountList: [],
      giftCountList: [],
      contentDataRange: [],
      contentUserIdList: [],
      contentUnLockCountList: [],
      chatislandConversionRateList: [],
    };
  },
  methods: {
    search() {
      let startDate = this.dataRange[0]
      let endDate = this.dataRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }
      this.consumeDepth(data)
    },
    consumeDepth(data) {
      this.userIdList = []
      this.contactCountList = []
      this.unLockCountList = []
      this.giftCountList = []
      consumeDepth(data).then(response => {
        if (response.data.list) {
          for (let i = 0; i < response.data.list.length; i++) {
            let obj = response.data.list[i]
            this.userIdList.push(obj.userId)
            this.contactCountList.push(obj.contactCount)
            this.unLockCountList.push(obj.unLockCount)
            this.giftCountList.push(obj.giftCount)
          }
          let myChart = this.$echarts.init(this.$refs.barChart);
          myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: this.userIdList
              }
            ],
            series: [
              {
                name: '建联',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.contactCountList
              },
              {
                name: '解锁',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: this.unLockCountList
              },
              {
                name: '赠送',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: this.giftCountList
              }
            ]
          }, false);
        }
      });
    },
    initBarChart() {
      consumeDepth({}).then(response => {
        if (response.data.list) {
          for (let i = 0; i < response.data.list.length; i++) {
            let obj = response.data.list[i]
            this.userIdList.push(obj.userId)
            this.contactCountList.push(obj.contactCount)
            this.unLockCountList.push(obj.unLockCount)
            this.giftCountList.push(obj.giftCount)
          }
          // 通过 $ref 进行挂载
          let myChart = this.$echarts.init(this.$refs.barChart);
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: this.userIdList,
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    return value.split('').join('\n')
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '建联',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.contactCountList
              },
              {
                name: '解锁',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: this.unLockCountList
              },
              {
                name: '赠送',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: this.giftCountList
              }
            ]
          };
          myChart.setOption(option);
        }
      });
    },
    searchContent() {
      let startDate = this.contentDataRange[0]
      let endDate = this.contentDataRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }
      this.contentConsume(data)
    },
    contentConsume(data) {
      this.contentUserIdList = []
      this.contentUnLockCountList = []
      this.chatislandConversionRateList = []
      contentConsume(data).then(response => {
        if (response.data.list) {
          for (let i = 0; i < response.data.list.length; i++) {
            let obj = response.data.list[i]
            this.userIdList.push(obj.userId)
            this.contentUnLockCountList.push(obj.unLockCount)
            this.chatislandConversionRateList.push(obj.chatislandConversionRate)
          }
          let myChart = this.$echarts.init(this.$refs.contentBarChart);
          myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: this.contentUserIdList,
                axisPointer: {
                  type: 'shadow'
                },
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    return value.split('').join('\n')
                  }
                }
              }
            ],
            series: [
              {
                name: '消耗绝对值',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                },
                data: this.contentUnLockCountList
              },
              {
                name: '解锁高级转化率',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' %';
                  }
                },
                data: this.chatislandConversionRateList
              }
            ]
          }, false);
        }
      });
    },
    initContentBarChart() {
      contentConsume({}).then(response => {
        if (response.data.list) {
          console.log(response.data.list)
          for (let i = 0; i < response.data.list.length; i++) {
            let obj = response.data.list[i]
            this.contentUserIdList.push(obj.userId)
            this.contentUnLockCountList.push(obj.unLockCount)
            this.chatislandConversionRateList.push(obj.chatislandConversionRate)
          }
          // 通过 $ref 进行挂载
          let myChart = this.$echarts.init(this.$refs.contentBarChart);
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
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            legend: {},
            xAxis: [
              {
                type: 'category',
                data: this.contentUserIdList,
                axisPointer: {
                  type: 'shadow'
                },
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    return value.split('').join('\n')
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '消耗绝对值',
                min: 0,
                interval: 5,
                axisLabel: {
                  formatter: '{value} 个'
                }
              },
              {
                type: 'value',
                name: '解锁高级转化率',
                min: 0,
                max: 100,
                interval: 5,
                axisLabel: {
                  formatter: '{value} %'
                }
              }
            ],
            series: [
              {
                name: '消耗绝对值',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                },
                data: this.contentUnLockCountList
              },
              {
                name: '解锁高级转化率',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' %';
                  }
                },
                data: this.chatislandConversionRateList
              }
            ]
          };
          myChart.setOption(option);
        }
      });
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
  width: 90%;
  height: 800px;
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

