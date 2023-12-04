<template>
  <div>

    <h3 style="color: black;text-align: left">Chatter维度</h3>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">赠礼消耗深度</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="consumeDateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchConsumeData">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="consumeBarChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">平均付费转化</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="avgConsumeDateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchAvgConsumeData">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="avgConsumeBarChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">阅后即焚chatter归因</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="fireImageOrderDateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchFireImageOrderData">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="fireImageOrderBarChart"></div>
        </div>
        <div class="home">
          <div class="barChart" ref="fireImageOrderBarChart1"></div>
        </div>
      </el-card>
    </el-row>

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
        >
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
        >
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
        >
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
        >
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
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart4"></div>
    </div>


  </div>


</template>

<script>
import {chatterConsume, avgChatterConsume, diamondPaidConversion, chatterFireImageOrder} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
    this.initConsumeChart();
    this.initAvgConsumeChart();
    this.initChatterFireImageOrderChart();
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      dataRange: [],
      chatterUser: ['chatter1', 'chatter2', 'chatter3', 'chatter4', 'chatter5', 'chatter6'],
      onlineLongTime: [10, 20, 10, 15, 65, 50],
      consumeDateRange: [],
      consumeChatterIdList: [],
      consumeGiftCountList: [],
      avgConsumeDateRange: [],
      avgConsumeChatterIdList: [],
      avgConsumeRateList: [],
      fireImageOrderDateRange: [],
      fireImageOrderChatterList: []
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

      diamondPaidConversion({}).then(response => {
        if (response.data.chatterMap) {
          let chatterIds = Object.keys(response.data.chatterMap)

          let giftConsumeList = []
          let giftConsumeRate = []

          let chatislandConsumeList = []
          let chatislandConsumeRate = []
          for (let i = 0; i < chatterIds.length; i++) {
            let key = chatterIds[i]
            let obj = response.data.chatterMap[key]
            giftConsumeList.push(obj.gift.consumeDiamondSum)
            giftConsumeRate.push(obj.gift.chatRecordSum > 0 ? obj.gift.consumeDiamondSum / obj.gift.chatRecordSum : 0)

            chatislandConsumeList.push(obj.chatisland.consumeDiamondSum)
            chatislandConsumeRate.push(obj.chatisland.chatRecordSum > 0 ? obj.chatisland.consumeDiamondSum / obj.chatisland.chatRecordSum : 0)
          }

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
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: ['礼物消耗', '内容解锁消耗']
            },
            xAxis: [
              {
                type: 'category',
                data: chatterIds,
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '钻石消耗',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                  formatter: '{value} 个'
                }
              },
              {
                type: 'value',
                name: '钻石消耗率',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                  formatter: '{value} %'
                }
              }
            ],
            series: [
              {
                name: '礼物消耗',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                },
                data: giftConsumeList
              },
              {
                name: '内容解锁消耗',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个';
                  }
                },
                data: chatislandConsumeList
              },
              {
                name: '礼物消耗转化率',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个/条';
                  }
                },
                data: giftConsumeRate
              },
              {
                name: '内容解锁消耗转化率',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                  valueFormatter: function (value) {
                    return value + ' 个/条';
                  }
                },
                data: chatislandConsumeRate
              }
            ]
          };
          myChart5.setOption(option5);
        }
      })


    },
    searchConsumeData() {
      let startDate = this.consumeDateRange[0]
      let endDate = this.consumeDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }
      this.chatterConsume(data)
    },
    chatterConsume(data) {
      this.consumeGiftCountList = []
      chatterConsume(data).then(response => {
        if (response.data) {
          this.consumeChatterIdList = Object.keys(response.data)
          for (let i = 0; i < this.consumeChatterIdList.length; i++) {
            let chatterId = this.consumeChatterIdList[i]
            this.consumeGiftCountList.push(response.data[chatterId])
          }
          let myChart = this.$echarts.init(this.$refs.barChart);
          myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: this.consumeChatterIdList
              }
            ],
            series: [
              {
                name: '消耗钻石总计',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.consumeGiftCountList
              }
            ]
          }, false);
        }
      })
    },
    initConsumeChart() {
      chatterConsume({}).then(response => {
        if (response.data) {
          this.consumeChatterIdList = Object.keys(response.data)
          for (let i = 0; i < this.consumeChatterIdList.length; i++) {
            let chatterId = this.consumeChatterIdList[i]
            this.consumeGiftCountList.push(response.data[chatterId])
          }
          let myChart = this.$echarts.init(this.$refs.consumeBarChart);
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
                data: this.consumeChatterIdList,
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    return value
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
                name: '消耗钻石总计',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.consumeGiftCountList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
    },
    searchAvgConsumeData() {
      let startDate = this.avgConsumeDateRange[0]
      let endDate = this.avgConsumeDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }
      this.avgChatterConsume(data)
    },
    avgChatterConsume(data) {
      this.avgConsumeRateList = []
      avgChatterConsume(data).then(response => {
        if (response.data) {
          this.avgConsumeChatterIdList = Object.keys(response.data)
          for (let i = 0; i < this.avgConsumeRateList.length; i++) {
            let chatterId = this.avgConsumeChatterIdList[i]
            this.avgConsumeRateList.push(response.data[chatterId])
          }
          let myChart = this.$echarts.init(this.$refs.avgConsumeBarChart);
          myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: this.avgConsumeChatterIdList
              }
            ],
            series: [
              {
                name: '平均付费转化',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.avgConsumeRateList
              }
            ]
          }, false);
        }
      })
    },
    initAvgConsumeChart() {
      avgChatterConsume({}).then(response => {
        if (response.data) {
          this.avgConsumeChatterIdList = Object.keys(response.data)
          console.log(this.avgConsumeChatterIdList)
          for (let i = 0; i < this.avgConsumeChatterIdList.length; i++) {
            let chatterId = this.avgConsumeChatterIdList[i]
            this.avgConsumeRateList.push(response.data[chatterId])
          }
          console.log(this.avgConsumeRateList)
          let myChart = this.$echarts.init(this.$refs.avgConsumeBarChart);
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
                data: this.avgConsumeChatterIdList,
                axisLabel: {
                  interval: 0,
                  formatter: function (value) {
                    return value
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
                name: '平均付费转化',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: this.avgConsumeRateList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
    },
    searchFireImageOrderData() {
      let startDate = this.fireImageOrderDateRange[0]
      let endDate = this.fireImageOrderDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime(),
        endDate: new Date(endDate).getTime()
      }
      this.fireImageOrder(data)
    },
    fireImageOrder(data) {
      chatterFireImageOrder(data).then(response => {
        if (response.data.chatterMap) {
          this.fireImageOrderChatterList = Object.keys(response.data.chatterMap)
          let memberSumList = []
          let memberPriceSumList = []
          for (let i = 0; i < this.fireImageOrderChatterList.length; i++) {
            let key = this.fireImageOrderChatterList[i]
            let obj = response.data.chatterMap[key]
            memberSumList.push(obj.memberSum)
            memberPriceSumList.push(obj.memberPriceSum)
          }
          let myChart = this.$echarts.init(this.$refs.fireImageOrderBarChart);
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
              data: ['开通会员UV']
            },
            xAxis: [
              {
                type: 'category',
                data: this.fireImageOrderChatterList,
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '开通会员UV',
                min: 0,
                interval: 1,
                axisLabel: {
                  formatter: '{value} 人'
                }
              }
            ],
            series: [
              {
                name: '开通会员UV',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value;
                  }
                },
                data: memberSumList
              }
            ]
          };
          myChart.clear();
          myChart.setOption(option);

          let myChart1 = this.$echarts.init(this.$refs.fireImageOrderBarChart1);
          let option1 = {
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
              data: ['开通会员价格总计']
            },
            xAxis: [
              {
                type: 'category',
                data: this.fireImageOrderChatterList,
                axisPointer: {
                  type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '开通会员价格总计',
                min: 0,
                axisLabel: {
                  formatter: '${value}'
                }
              }
            ],
            series: [
              {
                name: '开通会员价格总计',
                type: 'bar',
                tooltip: {
                  valueFormatter: function (value) {
                    return value;
                  }
                },
                data: memberPriceSumList
              }
            ]
          };
          myChart1.clear();
          myChart1.setOption(option1);
        }
      })
    },
    initChatterFireImageOrderChart() {
      this.fireImageOrder({})
    }

  }
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

