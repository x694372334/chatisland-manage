<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: center">profile查看转化</h3>
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

    <hr>
    <h3 style="color: black;text-align: center">swip卡点转化</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(2)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart1"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石建联转化1</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(3)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart2"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石建联转化2</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(4)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart3"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石内容解锁转化</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(5)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart4"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石赠送转化</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(6)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart5"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">闪聊转化1</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(7)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart6"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">闪聊转化2</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(8)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart7"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化1</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(9)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart8"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化2</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(10)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart9"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化3</h3>
    <hr>
    <el-row style="text-align: center">
      <el-date-picker
        v-model="dataRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur=""
        @change="handleChange(11)">
      </el-date-picker>
    </el-row>
    <div class="home">
      <div class="barChart" ref="barChart10"></div>
    </div>

  </div>
</template>

<script>

import {diamondFunctionTransformThree,diamondFunctionTransformTwo,diamondFunctionTransformOne,diamondFlashTransformTwo,diamondFlashTransformOne,diamondGiftTransform,diamondUnlockTransform,diamondConstructionUnionTransformTwo,diamondConstructionUnionTransformOne,profileSelectTransform,swipeSelectTransform} from "@/api/system/graphical";

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
      myChartDataKey:['最终付费用户', '有点击客态profile查看的用户到上限的UV', '有点击客态profile查看的用户UV'],
      myChartDataValue: {"subscriber":0,"checkProfileUserLimit":2,"checkProfileUser":6},
      myChartDataKey1:['最终付费用户', '付费卡点用户UV','主页曝光UV'],
      myChartDataValue1: {"subscriber":0,"subscriberSwipe":0,"homepageExposure":5},
      myChartDataKey2:['最终付费用户', '钻石不足情况', '点击钻石进行建联','主页曝光UV'],
      myChartDataValue2: {"subscriber":0,"notEnoughDiamonds":3,"checkDiamondChat":3,"homepageExposure":6},
      myChartDataKey3:['最终进行付费','钻石不足情况', '点击钻石进行建联', '点击对方chatisland','客态profile页面曝光'],
      myChartDataValue3: {"subscriber":0,"notEnoughDiamonds":2,"checkDiamonds":2,"checkChatisland":4,"checkChatislandProfile":6},
      myChartDataKey4:['最终进行付费', '钻石不足情况','点击钻石解锁', '锁定的高级chatisland曝光'],
      myChartDataValue4: {"subscriber":0,"notEnoughDiamonds":4,"checkDiamondsUnlock":5,"lockSeniorChatisland":10},
      myChartDataKey5:['最终进行付费', '钻石不足情况','点击赠礼按钮的UV', '有聊天行为的用户UV'],
      myChartDataValue5: {"subscriber":0,"notEnoughDiamonds":2,"checkGift":2,"chatBehavior":15},
      myChartDataKey6:['最终进行付费', '钻石不足情况','点击闪聊进行建联', '主页曝光UV'],
      myChartDataValue6: {"subscriber":0,"notEnoughDiamonds":0,"checkFlashChat":6,"homepageExposure":10},
      myChartDataKey7:['最终进行付费', '道具不足情况','点击闪聊进行建联', 'WLM曝光UV'],
      myChartDataValue7: {"subscriber":0,"notEnoughDiamonds":0,"checkFlashChat":0,"exposureWLM":0},
      myChartDataKey8:['最终进行付费', '选择高级chatisland', '点击底bar上的发布'],
      myChartDataValue8: {"subscriber":0,"selectSeniorChatisland":0,"checkBar":0},
      myChartDataKey9:['最终进行付费', '选择高级头像', '切换头像的UV'],
      myChartDataValue9: {"subscriber":0,"seniorAvatar":0,"switchAvatars":0},
      myChartDataKey10:['最终进行付费','选择阅后即焚', '聊天框选择发布图片', '有聊天行为的用户'],
      myChartDataValue10: {"subscriber":0,"selectSnapchat":0,"selectPublishImages":0,"chatBehavior":0},
    };
  },
  methods: {
    handleChange(type) {
      let startDate = this.dataRange[0]
      let endDate = this.dataRange[1]
      let data = {
        startDate: startDate,
        endDate: endDate
      }
      if(type === 1){
        profileSelectTransform(data).then(response =>{
          this.myChartDataValue = response.data;
          this.initBarChart();
        })
      }else if(type === 2){
        swipeSelectTransform(data).then(response =>{
          this.myChartDataValue1 = response.data;
          console.log(this.myChartDataValue1)
          this.initBarChart();
        })
      }else if(type === 3){
        diamondConstructionUnionTransformOne(data).then(response =>{
          this.myChartDataValue2 = response.data;
          this.initBarChart();
        })
      }else if(type === 4){
        diamondConstructionUnionTransformTwo(data).then(response =>{
          this.myChartDataValue3 = response.data;
          this.initBarChart();
        })
      }else if(type === 5){
        diamondUnlockTransform(data).then(response =>{
          this.myChartDataValue4 = response.data;
          this.initBarChart();
        })
      }else if(type === 6){
        diamondGiftTransform(data).then(response =>{
          this.myChartDataValue5 = response.data;
          this.initBarChart();
        })
      }else if(type === 7){
        diamondFlashTransformOne(data).then(response =>{
          this.myChartDataValue6 = response.data;
          this.initBarChart();
        })
      }else if(type === 8){
        diamondFlashTransformTwo(data).then(response =>{
          this.myChartDataValue7 = response.data;
          this.initBarChart();
        })
      }else if(type === 9){
        diamondFunctionTransformOne(data).then(response =>{
          this.myChartDataValue8 = response.data;
          this.initBarChart();
        })
      }else if(type === 10){
        diamondFunctionTransformTwo(data).then(response =>{
          this.myChartDataValue9 = response.data;
          this.initBarChart();
        })
      }else if(type === 11){
        diamondFunctionTransformThree(data).then(response =>{
          this.myChartDataValue10 = response.data;
          this.initBarChart();
        })
      }
    },
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
      let myChart6 = this.$echarts.init(this.$refs.barChart6);
      let myChart7 = this.$echarts.init(this.$refs.barChart7);
      let myChart8 = this.$echarts.init(this.$refs.barChart8);
      let myChart9 = this.$echarts.init(this.$refs.barChart9);
      let myChart10 = this.$echarts.init(this.$refs.barChart10);
      let option = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue.checkProfileUser, name: 'profile的用户UV' },
              { value: this.myChartDataValue.checkProfileUserLimit, name: 'profile的用户上限的UV' },
              { value: this.myChartDataValue.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart.setOption(option);


      let option1 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey1
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue1.homepageExposure, name: '主页曝光UV' },
              { value: this.myChartDataValue1.subscriberSwipe, name: '付费卡点用户UV' },
              { value: this.myChartDataValue1.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart1.setOption(option1);

      let option2 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey2
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue2.homepageExposure, name: '主页曝光UV' },
              { value: this.myChartDataValue2.checkDiamondChat, name: '钻石进行建联' },
              { value: this.myChartDataValue2.notEnoughDiamonds, name: '钻石不足情况' },
              { value: this.myChartDataValue2.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart2.setOption(option2);

      let option3 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey3
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue3.checkChatislandProfile, name: '客态profile页面曝光' },
              { value: this.myChartDataValue3.checkChatisland, name: '查看对方chatisland' },
              { value: this.myChartDataValue3.checkDiamonds, name: '钻石进行建联' },
              { value: this.myChartDataValue3.notEnoughDiamonds, name: '钻石不足情况' },
              { value: this.myChartDataValue3.subscriber, name: '最终进行付费' }
            ]
          }
        ]
      };
      myChart3.setOption(option3);

      let option4 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey4
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue4.lockSeniorChatisland, name: '锁定的高级chatisland曝光' },
              { value: this.myChartDataValue4.checkDiamondsUnlock, name: '点击钻石解锁' },
              { value: this.myChartDataValue4.notEnoughDiamonds, name: '钻石不足情况' },
              { value: this.myChartDataValue4.subscriber, name: '最终进行付费' }
            ]
          }
        ]
      };
      myChart4.setOption(option4);

      let option5 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey5
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue5.chatBehavior, name: '有聊天行为的用户UV' },
              { value: this.myChartDataValue5.checkGift, name: '点击赠礼按钮的UV' },
              { value: this.myChartDataValue5.notEnoughDiamonds, name: '钻石不足情况' },
              { value: this.myChartDataValue5.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart5.setOption(option5);

      let option6 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey6
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue6.homepageExposure, name: '主页曝光UV' },
              { value: this.myChartDataValue6.checkFlashChat, name: '点击闪聊进行建联' },
              { value: this.myChartDataValue6.notEnoughDiamonds, name: '钻石不足情况' },
              { value: this.myChartDataValue6.subscriber, name: '最终进行付费' }
            ]
          }
        ]
      };
      myChart6.setOption(option6);

      let option7 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey7
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue7.exposureWLM, name: 'WLM曝光UV' },
              { value: this.myChartDataValue7.checkFlashChat, name: '点击闪聊进行建联' },
              { value: this.myChartDataValue7.notEnoughDiamonds, name: '道具不足情况' },
              { value: this.myChartDataValue7.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart7.setOption(option7);

      let option8 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey8
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue8.checkBar, name: '点击底bar上的发布' },
              { value: this.myChartDataValue8.selectSeniorChatisland, name: '选择高级chatisland' },
              { value: this.myChartDataValue8.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart8.setOption(option8);

      let option9 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey9
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue9.switchAvatars, name: '切换头像的UV' },
              { value: this.myChartDataValue9.seniorAvatar, name: '选择高级头像' },
              { value: this.myChartDataValue9.subscriber, name: '最终付费用户' }
            ]
          }
        ]
      };
      myChart9.setOption(option9);

      let option10 = {
        title: {
          text: 'Funnel'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: this.myChartDataKey10
        },
        series: [
          {
            name: 'Funnel',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: this.myChartDataValue10.chatBehavior, name: '有聊天行为的用户' },
              { value: this.myChartDataValue10.selectPublishImages, name: '聊天框选择发布图片' },
              { value: this.myChartDataValue10.selectSnapchat, name: '选择阅后即焚' },
              { value: this.myChartDataValue10.subscriber, name: '最终进行付费' }
            ]
          }
        ]
      };
      myChart10.setOption(option10);
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

