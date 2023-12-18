<template>
  <div>

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

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">付费深度分布</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="paymentDepthRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchPaymentDepth">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="paymentDepthChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">充值分布</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="paymentOrderRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchPaymentOrder">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="paymentOrderChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">消耗倾向分布</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="diamondConsumeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchDiamondConsume">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="diamondConsumeChart"></div>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-row style="text-align: center;font-size:24px; font-weight: bold;">消费人设集中度分布</el-row>
          <el-row style="text-align: center;margin: 30px 0;">
            <el-date-picker
              v-model="characterConsumeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @blur="">
            </el-date-picker>

            <el-button @click="searchCharacterConsume">查询</el-button>
          </el-row>
        </div>
        <div class="home">
          <div class="barChart" ref="characterConsumeRangeChart"></div>
        </div>
      </el-card>
    </el-row>

    <hr>
    <h3 style="color: black;text-align: left">用户分布 - 基础标签信息 - 性别分布</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: left">用户分布 - 基础标签信息 - 年龄分布</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart1"></div>
    </div>


    <hr>
    <h3 style="color: black;text-align: left">用户分布 - 基础标签信息 - label分布</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart2"></div>
    </div>

    <!--    <hr>-->
    <!--    <h3 style="color: black;text-align: left">用户分布 - 消耗倾向分布</h3>-->
    <!--    <hr>-->
    <!--    <div class="home">-->
    <!--      <div class="barChart" ref="barChart3"></div>-->
    <!--    </div>-->

  </div>
</template>

<script>

import {
  userGenderReport,
  userAgeReport,
  userLabelReport,
  paymentDepthDistribution,
  payOrderDistribution,
  diamondConsumeCount,
  characterConsumeConcentrationRatio,
  revenueData
} from "@/api/system/graphical";

export default {
  mounted() {
    // 初始化 echarts
    this.initBarChart();
    this.initPaymentDepthChart();
    this.initPaymentOrderChart();
    this.initDiamondConsume();
    this.initRevenueDataBarChart();
    this.initCharacterConsumeChart();
  },

  name: "Index",
  data() {
    return {
      // 版本号
      version: "4.8.0",
      revenueDataRange: [],
      revenueDateList: [],
      paymentDepthRange: [],
      paymentDepthDateList: [],
      paymentDepthZeroPaidList: [],
      paymentDepthSmallList: [],
      paymentDepthMiddleList: [],
      paymentDepthLargeList: [],
      paymentOrderRange: [],
      paymentOrderDateList: [],
      diamondConsumeRange: [],
      diamondConsumeDateList: [],
      diamondConsumeGiftList: [],
      diamondConsumeContactList: [],
      diamondConsumeContactedList: [],
      characterConsumeRange:[],
      characterConsumeDateList:[],
      queryParam: {
        startDate: undefined,
        endDate: undefined
      },
      gender: {"boy": 0, "girl": 0, "other": 0},
      age: {"<22": 0, "22-28": 0, "28-32": 0, "32-38": 0, "38-42": 0, "42-48": 0, ">48": 0},
      label: {
        "flirt": 0,
        "submissive": 0,
        "dominate": 0,
        "foreplay": 0,
        "dates": 0,
        "friendship": 0,
        "sensual": 0,
        "watching": 0,
        "texting": 0,
        "bdsm": 0,
        "couples": 0,
        "singles": 0,
        "kink": 0,
        "poly": 0,
        "group": 0,
        "threeway": 0,
        "relationship": 0,
        "advice": 0,
        "confession": 0,
        "novelty": 0,
        "lifestyle": 0,
        "cooking": 0,
        "sports": 0,
        "singing": 0,
        "reading": 0,
        "dancing": 0,
        "drawing": 0,
        "other": 0
      }
    };
  },
  created() {
    // 在此处编写需要在页面进入时执行的代码
    userGenderReport().then(response => {
      this.gender = response.data
      this.initBarChart();
    })
    userAgeReport().then(response => {
      this.age = response.data
      this.initBarChart();
    })
    userLabelReport().then(response => {
      this.label = response.data
      this.initBarChart();
    })
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
      // let myChart3 = this.$echarts.init(this.$refs.barChart3);
      let option = {
        title: {
          text: '基础标签信息',
          subtext: '性别分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.gender.boy, name: '男'},
              {value: this.gender.girl, name: '女'},
              {value: this.gender.other, name: '其他'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);

      let option1 = {
        title: {
          text: '基础标签信息',
          subtext: '年龄分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.age["<22"], name: '<22'},
              {value: this.age["22-28"], name: '22-28'},
              {value: this.age["28-32"], name: '28-32'},
              {value: this.age["32-38"], name: '32-38'},
              {value: this.age["38-42"], name: '38-42'},
              {value: this.age["42-48"], name: '42-48'},
              {value: this.age[">48"], name: '>48'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart1.setOption(option1);

      let option2 = {
        title: {
          text: '基础标签信息',
          subtext: 'label分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.label.flirt, name: 'flirt'},
              {value: this.label.submissive, name: 'submissive'},
              {value: this.label.dominate, name: 'dominate'},
              {value: this.label.foreplay, name: 'foreplay'},
              {value: this.label.dates, name: 'dates'},
              {value: this.label.friendship, name: 'friendship'},
              {value: this.label.sensual, name: 'sensual'},
              {value: this.label.watching, name: 'watching'},
              {value: this.label.texting, name: 'texting'},
              {value: this.label.bdsm, name: 'bdsm'},
              {value: this.label.couples, name: 'couples'},
              {value: this.label.singles, name: 'singles'},
              {value: this.label.kink, name: 'kink'},
              {value: this.label.poly, name: 'poly'},
              {value: this.label.group, name: 'group'},
              {value: this.label.threeway, name: 'threeway'},
              {value: this.label.relationship, name: 'relationship'},
              {value: this.label.advice, name: 'advice'},
              {value: this.label.confession, name: 'confession'},
              {value: this.label.novelty, name: 'novelty'},
              {value: this.label.lifestyle, name: 'lifestyle'},
              {value: this.label.cooking, name: 'cooking'},
              {value: this.label.sports, name: 'sports'},
              {value: this.label.singing, name: 'singing'},
              {value: this.label.reading, name: 'reading'},
              {value: this.label.dancing, name: 'dancing'},
              {value: this.label.drawing, name: 'drawing'},
              {value: this.label.other, name: 'other'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart2.setOption(option2);


      let option3 = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
          ]
        },
        xAxis: [
          {type: 'category', gridIndex: 0},
          {type: 'category', gridIndex: 1}
        ],
        yAxis: [{gridIndex: 0}, {gridIndex: 1}],
        grid: [{bottom: '55%'}, {top: '55%'}],
        series: [
          // These series are in the first grid.
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
          {type: 'bar', seriesLayoutBy: 'row'},
          // These series are in the second grid.
          {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
          {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
          {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
          {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
        ]
      };
      // myChart3.setOption(option3);
    },
    searchRevenueData(){
      let startDate = this.revenueDataRange[0]
      let endDate = this.revenueDataRange[1]
      let data = {
        startDate: new Date(startDate).getTime()+8*3600000,
        endDate: new Date(endDate).getTime()+8*3600000
      }
      this.revenueData(data)
    },
    revenueData(data){
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
              data: ['会员渗透', '付费渗透', '付费深度-arpu', '付费深度-arpPu',
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
                name: '付费深度-arpPu',
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
    searchPaymentDepth() {
      let startDate = this.paymentDepthRange[0]
      let endDate = this.paymentDepthRange[1]
      let data = {
        startDate: new Date(startDate).getTime()+8*3600000,
        endDate: new Date(endDate).getTime()+8*3600000
      }
      this.paymentDepth(data)
    },
    paymentDepth(data) {
      paymentDepthDistribution(data).then(response => {
        if (response.data.dateMap) {
          this.paymentDepthDateList = Object.keys(response.data.dateMap)
          let myChart = this.$echarts.init(this.$refs.paymentDepthChart);
          if (this.paymentDepthDateList.length === 1) {
            //饼图
            let key = this.paymentDepthDateList[0]
            let data = response.data.dateMap[key]
            let option = {
              title: {
                text: '付费深度分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '付费深度分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.zeroPaid, name: '0付费'},
                    {value: data.small, name: '小R(等于4.99)'},
                    {value: data.middle, name: '中R(大于4.99小于等于29.99)'},
                    {value: data.large, name: '大R(大于29.99)'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          } else {
            //柱状图
            this.paymentDepthZeroPaidList = []
            this.paymentDepthSmallList = []
            this.paymentDepthMiddleList = []
            this.paymentDepthLargeList = []
            for (let i = 0; i < this.paymentDepthDateList.length; i++) {
              let key = this.paymentDepthDateList[i]
              let data = response.data.dateMap[key]
              console.log(data)
              this.paymentDepthZeroPaidList.push(data.zeroPaid)
              this.paymentDepthSmallList.push(data.small)
              this.paymentDepthMiddleList.push(data.middle)
              this.paymentDepthLargeList.push(data.large)
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
                  data: this.paymentDepthDateList
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '0付费',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: this.paymentDepthZeroPaidList
                },
                {
                  name: '小R(等于4.99)',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: this.paymentDepthSmallList
                },
                {
                  name: '中R(大于4.99小于等于29.99)',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: this.paymentDepthMiddleList
                },
                {
                  name: '大R(大于29.99)',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: this.paymentDepthLargeList
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    initPaymentDepthChart() {
      paymentDepthDistribution({}).then(response => {
        if (response.data.dateMap) {
          this.paymentDepthDateList = Object.keys(response.data.dateMap)
          if (this.paymentDepthDateList.length === 1) {
            //饼图
            let key = this.paymentDepthDateList[0]
            let data = response.data.dateMap[key]
            let myChart = this.$echarts.init(this.$refs.paymentDepthChart);
            let option = {
              title: {
                text: '付费深度分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '付费深度分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.zeroPaid, name: '0付费'},
                    {value: data.small, name: '小R(等于4.99)'},
                    {value: data.middle, name: '中R(大于4.99小于等于29.99)'},
                    {value: data.large, name: '大R(大于29.99)'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    searchPaymentOrder() {
      let startDate = this.paymentOrderRange[0]
      let endDate = this.paymentOrderRange[1]
      let data = {
        startDate: new Date(startDate).getTime()+8*3600000,
        endDate: new Date(endDate).getTime()+8*3600000
      }
      this.paymentOrder(data)
    },
    paymentOrder(data) {
      payOrderDistribution(data).then(response => {
        if (response.data.dateMap) {
          this.paymentOrderDateList = Object.keys(response.data.dateMap)
          let myChart = this.$echarts.init(this.$refs.paymentOrderChart);
          if (this.paymentOrderDateList.length === 1) {
            //饼图
            let key = this.paymentOrderDateList[0]
            let data = response.data.dateMap[key]
            let memberOrder = data.memberOrder
            let memberSkus = Object.keys(memberOrder)
            let propOrder = data.propOrder
            let propOrderSkus = Object.keys(propOrder)
            let skus = []
            for (let i = 0; i < memberSkus.length; i++) {
              let sku = memberSkus[i]
              skus.push({value: memberOrder[sku], name: sku})
            }
            for (let i = 0; i < propOrderSkus.length; i++) {
              let sku = propOrderSkus[i]
              skus.push({value: propOrder[sku], name: sku})
            }
            let option = {
              title: {
                text: '充值分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '充值分布',
                  type: 'pie',
                  radius: '50%',
                  data: skus,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          } else {
            //柱状图
            let memberSkus = []
            let propSkus = []
            let memberList = {}
            let propList = {}
            for (let i = 0; i < this.paymentOrderDateList.length; i++) {
              let key = this.paymentOrderDateList[i]
              let data = response.data.dateMap[key]
              let memberOrder = data.memberOrder
              let propOrder = data.propOrder
              if (i === 0) {
                memberSkus = Object.keys(memberOrder)
                propSkus = Object.keys(propOrder)
              }
              memberSkus.forEach(sku => {
                if (memberOrder[sku] === undefined) {
                  if (memberList[sku] === undefined) {
                    memberList[sku] = [0]
                  } else {
                    memberList[sku].push(0)
                  }
                } else {
                  if (memberList[sku] === undefined) {
                    memberList[sku] = [memberOrder[sku]]
                  } else {
                    memberList[sku].push(memberOrder[sku])
                  }
                }
              })

              propSkus.forEach(sku => {
                if (propOrder[sku] === undefined) {
                  if (propList[sku] === undefined) {
                    propList[sku] = [0]
                  } else {
                    propList[sku].push(0)
                  }
                } else {
                  if (propList[sku] === undefined) {
                    propList[sku] = [propOrder[sku]]
                  } else {
                    propList[sku].push(propOrder[sku])
                  }
                }
              })
            }

            let data = []

            memberSkus.forEach(sku => {
              data.push({
                name: sku,
                type: 'bar',
                stack: 'member',
                emphasis: {
                  focus: 'series'
                },
                data: memberList[sku]
              })
            })

            propSkus.forEach(sku => {
              data.push({
                name: sku,
                type: 'bar',
                stack: 'prop',
                emphasis: {
                  focus: 'series'
                },
                data: propList[sku]
              })
            })

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
                  data: this.paymentOrderDateList
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: data
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    initPaymentOrderChart() {
      payOrderDistribution({}).then(response => {
        if (response.data.dateMap) {
          this.paymentOrderDateList = Object.keys(response.data.dateMap)
          console.log(this.paymentOrderDateList)
          if (this.paymentOrderDateList.length === 1) {
            //饼图
            let key = this.paymentOrderDateList[0]
            console.log(key)
            let data = response.data.dateMap[key]
            console.log(data)
            let memberOrder = data.memberOrder
            let memberSkus = Object.keys(memberOrder)
            let propOrder = data.propOrder
            let propOrderSkus = Object.keys(propOrder)
            let skus = []
            for (let i = 0; i < memberSkus.length; i++) {
              let sku = memberSkus[i]
              skus.push({value: memberOrder[sku], name: sku})
            }
            for (let i = 0; i < propOrderSkus.length; i++) {
              let sku = propOrderSkus[i]
              skus.push({value: propOrder[sku], name: sku})
            }
            let myChart = this.$echarts.init(this.$refs.paymentOrderChart);
            let option = {
              title: {
                text: '充值分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '充值分布',
                  type: 'pie',
                  radius: '50%',
                  data: skus,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    searchDiamondConsume() {
      let startDate = this.diamondConsumeRange[0]
      let endDate = this.diamondConsumeRange[1]
      let data = {
        startDate: new Date(startDate).getTime()+8*3600000,
        endDate: new Date(endDate).getTime()+8*3600000
      }
      this.diamondConsume(data)
    },
    diamondConsume(data) {
      diamondConsumeCount(data).then(response => {
        if (response.data.dateMap) {
          let myChart = this.$echarts.init(this.$refs.diamondConsumeChart);
          this.diamondConsumeDateList = Object.keys(response.data.dateMap)
          if (this.diamondConsumeDateList.length === 1) {
            //饼图
            let key = this.diamondConsumeDateList[0]
            let data = response.data.dateMap[key]
            let option = {
              title: {
                text: '消耗倾向分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '消耗倾向分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.gift, name: '赠送钻石消耗'},
                    {value: data.contact, name: '钻石建联'},
                    {value: data.contacted, name: '钻石建联后'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          } else {
            let giftList = []
            let contactList = []
            let contactedList = []
            for (let i = 0; i < this.diamondConsumeDateList.length; i++) {
              let key = this.diamondConsumeDateList[i]
              let data = response.data.dateMap[key]
              giftList.push(data.gift)
              contactList.push(data.contact)
              contactedList.push(data.contacted)
            }
            //柱状图
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
                  data: this.diamondConsumeDateList
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '赠送钻石消耗',
                  type: 'bar',
                  stack: 'gift',
                  emphasis: {
                    focus: 'series'
                  },
                  data: giftList
                },
                {
                  name: '钻石建联',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: contactList
                },
                {
                  name: '钻石建联后',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: contactedList
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    initDiamondConsume() {
      diamondConsumeCount({}).then(response => {
        if (response.data.dateMap) {
          this.diamondConsumeDateList = Object.keys(response.data.dateMap)
          if (this.diamondConsumeDateList.length === 1) {
            //饼图
            let key = this.diamondConsumeDateList[0]
            let data = response.data.dateMap[key]
            let myChart = this.$echarts.init(this.$refs.diamondConsumeChart);
            let option = {
              title: {
                text: '消耗倾向分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '消耗倾向分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.gift, name: '赠送钻石消耗'},
                    {value: data.contact, name: '钻石建联'},
                    {value: data.contacted, name: '钻石建联后'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    searchCharacterConsume(){
      let startDate = this.characterConsumeRange[0]
      let endDate = this.characterConsumeRange[1]
      let data = {
        startDate: new Date(startDate).getTime()+8*3600000,
        endDate: new Date(endDate).getTime()+8*3600000
      }
      this.characterConsume(data)
    },
    characterConsume(data){
      characterConsumeConcentrationRatio(data).then(response=>{
        if(response.data.dateMap){
          this.characterConsumeDateList = Object.keys(response.data.dateMap)
          let myChart = this.$echarts.init(this.$refs.characterConsumeRangeChart);
          if (this.characterConsumeDateList.length === 1) {
            //饼图
            let key = this.characterConsumeDateList[0]
            let data = response.data.dateMap[key]
            let option = {
              title: {
                text: '消费人设集中度分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '消费人设集中度分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.gt90, name: '>90%'},
                    {value: data.gt80, name: '80-90'},
                    {value: data.gt70, name: '70-80'},
                    {value: data.gt60, name: '60-70'},
                    {value: data.gt50, name: '50-60'},
                    {value: data.lt50, name: '<50'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }else{
            let gt90List = []
            let gt80List = []
            let gt70List = []
            let gt60List = []
            let gt50List = []
            let lt50List = []
            for (let i = 0; i < this.characterConsumeDateList.length; i++) {
              let key = this.characterConsumeDateList[i]
              let data = response.data.dateMap[key]
              gt90List.push(data.gt90)
              gt80List.push(data.gt80)
              gt70List.push(data.gt70)
              gt60List.push(data.gt60)
              gt50List.push(data.gt50)
              lt50List.push(data.lt50)
            }
            //柱状图
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
                  data: this.characterConsumeDateList
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '>90%',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: gt90List
                },
                {
                  name: '80-90',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: gt80List
                },
                {
                  name: '70-80',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: gt70List
                },
                {
                  name: '60-70',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: gt60List
                },
                {
                  name: '50-60',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: gt50List
                },
                {
                  name: '<50',
                  type: 'bar',
                  stack: 'Ad',
                  emphasis: {
                    focus: 'series'
                  },
                  data: lt50List
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    },
    initCharacterConsumeChart(){
      characterConsumeConcentrationRatio({}).then(response=>{
        if(response.data.dateMap){
          this.characterConsumeDateList = Object.keys(response.data.dateMap)
          let myChart = this.$echarts.init(this.$refs.characterConsumeRangeChart);
          if (this.characterConsumeDateList.length === 1) {
            //饼图
            let key = this.characterConsumeDateList[0]
            let data = response.data.dateMap[key]
            let option = {
              title: {
                text: '消费人设集中度分布',
                left: 'center'
              },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '消费人设集中度分布',
                  type: 'pie',
                  radius: '50%',
                  data: [
                    {value: data.gt90, name: '>90%'},
                    {value: data.gt80, name: '80-90'},
                    {value: data.gt70, name: '70-80'},
                    {value: data.gt60, name: '60-70'},
                    {value: data.gt50, name: '50-60'},
                    {value: data.lt50, name: '<50'}
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            };
            myChart.clear();
            myChart.setOption(option);
          }
        }
      })
    }
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
  height: 500px;
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

