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
    <el-row style="margin-top:30px;text-align: center;">
      <el-date-picker
        v-model="onlineDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
      >
      </el-date-picker>
      <el-button @click="searchOnlineData">查询</el-button>
    </el-row>
    <div class="home" style="height: 1000px;">
      <div class="barChart" ref="onlineBarChart"></div>
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
    <el-row style="margin-top:30px;text-align: center">
      <el-date-picker
        v-model="effectiveOrderDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
      >
      </el-date-picker>
      <el-button @click="searchEffectiveOrderData">查询</el-button>
    </el-row>
    <div class="home">
      <div class="barChart" ref="effectiveOrderBarChart"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">服务效率 - 深度会话率</h3>
    <hr>
    <el-row style="margin-top:30px;text-align: center">
      <el-date-picker
        v-model="deepSessionDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
      >
      </el-date-picker>
      <el-button @click="searchDeepSession">查询</el-button>
    </el-row>
    <div class="home">
      <div class="barChart" ref="deepSessionBarChart"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">付费转化情况 - 钻石消耗</h3>
    <hr>
    <el-row style="margin-top:30px;text-align: center">
      <el-date-picker
        v-model="diamondConsumeDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
      >
      </el-date-picker>
      <el-button @click="searchDiamondConsume">查询</el-button>
    </el-row>
    <div class="home">
      <div class="barChart" ref="diamondConsumeBarChart"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">付费转化情况 - 绑定用户</h3>
    <hr>
    <el-row style="margin-top:30px;text-align: center">
      <el-date-picker
        v-model="bindUserDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
      >
      </el-date-picker>
      <el-button @click="searchBindUser">查询</el-button>
    </el-row>
    <div class="home">
      <div class="barChart" ref="bindUserBarChart"></div>
    </div>


  </div>


</template>

<script>
import {
  chatterConsume,
  avgChatterConsume,
  diamondPaidConversion,
  chatterFireImageOrder,
  chatterOnlineDuration,
  chatterEffectiveOrder,
  chatterAvgRespTime,
  deepSession,
  chatterBindUser
} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
    this.initConsumeChart();
    this.initAvgConsumeChart();
    this.initChatterFireImageOrderChart();
    this.initChatterOnlineDuration();
    this.initChatterEffectiveOrder();
    this.initChatterDeepSession();
    this.initDiamondConsume();
    this.initBindUser();
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      dataRange: [],
      consumeDateRange: [],
      consumeChatterIdList: [],
      consumeGiftCountList: [],
      avgConsumeDateRange: [],
      avgConsumeChatterIdList: [],
      avgConsumeRateList: [],
      fireImageOrderDateRange: [],
      fireImageOrderChatterList: [],
      onlineDateRange: [],
      onlineChatterList: [],
      effectiveOrderDateRange: [],
      effectiveOrderChatterList: [],
      deepSessionDateRange: [],
      deepSessionChatterList: [],
      diamondConsumeDateRange: [],
      diamondConsumeDateChatterList: [],
      bindUserDateRange: [],
      bindUserChatterList: []
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");

    },
    initBarChart() {
      // 通过 $ref 进行挂载
      let myChart1 = this.$echarts.init(this.$refs.barChart1);

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

    },
    searchConsumeData() {
      let startDate = this.consumeDateRange[0]
      let endDate = this.consumeDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
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
          let myChart = this.$echarts.init(this.$refs.consumeBarChart);
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
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
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
          for (let i = 0; i < this.avgConsumeChatterIdList.length; i++) {
            let chatterId = this.avgConsumeChatterIdList[i]
            this.avgConsumeRateList.push(response.data[chatterId])
          }
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
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
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
    },
    searchOnlineData() {
      let startDate = this.onlineDateRange[0]
      let endDate = this.onlineDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.chatterOnlineDuration(data)
    },
    initChatterOnlineDuration() {
      this.chatterOnlineDuration({})
    },
    chatterOnlineDuration(data) {
      let myChart = this.$echarts.init(this.$refs.onlineBarChart);
      chatterOnlineDuration(data).then(response => {
        if (response.data.chatterMap) {
          this.onlineChatterList = Object.keys(response.data.chatterMap)
          console.log(this.onlineChatterList)
          let dataList = []
          for (let i = 0; i < this.onlineChatterList.length; i++) {
            let key = this.onlineChatterList[i]
            dataList.push(response.data.chatterMap[key].onlineDuration)
          }
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
                data: this.onlineChatterList,
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
                name: '在线时长/分钟',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: dataList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
    },
    initChatterEffectiveOrder() {
      this.chatterEffectiveOrder({})
    },
    searchEffectiveOrderData() {
      let startDate = this.effectiveOrderDateRange[0]
      let endDate = this.effectiveOrderDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.chatterEffectiveOrder(data)
    },
    chatterEffectiveOrder(data) {
      let myChart = this.$echarts.init(this.$refs.effectiveOrderBarChart);
      chatterEffectiveOrder(data).then(response => {
        if (response.data.chatterMap) {
          this.effectiveOrderChatterList = Object.keys(response.data.chatterMap)
          let dataList = []
          for (let i = 0; i < this.effectiveOrderChatterList.length; i++) {
            let key = this.effectiveOrderChatterList[i]
            dataList.push(response.data.chatterMap[key].effectiveOrder)
          }
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
                data: this.effectiveOrderChatterList,
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
                name: '有效接单率（%）',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: dataList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
    },
    initChatterDeepSession() {
      this.deepSession({})
    },
    searchDeepSession() {
      let startDate = this.deepSessionDateRange[0]
      let endDate = this.deepSessionDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.deepSession(data)
    },
    deepSession(data) {
      let myChart = this.$echarts.init(this.$refs.deepSessionBarChart);
      deepSession(data).then(response => {
        if (response.data.chatterMap) {
          this.deepSessionChatterList = Object.keys(response.data.chatterMap)
          let dataList = []
          for (let i = 0; i < this.deepSessionChatterList.length; i++) {
            let key = this.deepSessionChatterList[i]
            dataList.push(response.data.chatterMap[key])
          }
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
                data: this.deepSessionChatterList,
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
                name: '深度会话率（%）',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: dataList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
    },
    initDiamondConsume() {
      this.diamondConsume({})
    },
    searchDiamondConsume() {
      let startDate = this.diamondConsumeDateRange[0]
      let endDate = this.diamondConsumeDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.diamondConsume(data)
    },
    diamondConsume(data) {
      let myChart2 = this.$echarts.init(this.$refs.diamondConsumeBarChart);
      diamondPaidConversion(data).then(response => {
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

          let option2 = {
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
                interval: 1,
                axisLabel: {
                  formatter: '{value} 个'
                }
              },
              {
                type: 'value',
                name: '钻石消耗率',
                min: 0,
                max: 100,
                interval: 10,
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
          myChart2.setOption(option2);
        }
      })
    },
    initBindUser(){
      this.bindUser({})
    },
    searchBindUser() {
      let startDate = this.bindUserDateRange[0]
      let endDate = this.bindUserDateRange[1]
      let data = {
        startDate: new Date(startDate).getTime() + 8 * 3600000,
        endDate: new Date(endDate).getTime() + 8 * 3600000
      }
      this.bindUser(data)
    },
    bindUser(data) {
      let myChart = this.$echarts.init(this.$refs.bindUserBarChart);
      chatterBindUser(data).then(response => {
        if (response.data.chatterMap) {
          this.bindUserChatterList = Object.keys(response.data.chatterMap)
          let dataList = []
          for (let i = 0; i < this.bindUserChatterList.length; i++) {
            let key = this.bindUserChatterList[i]
            dataList.push(response.data.chatterMap[key])
          }
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
                data: this.bindUserChatterList,
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
                name: '绑定用户',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: dataList
              }
            ]
          };
          myChart.setOption(option);
        }
      })
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

