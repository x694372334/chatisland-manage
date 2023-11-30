<template>
  <div>
    <hr>
    <h3 style="color: black;text-align: left">profile产看转化</h3>
    <hr>
  <div class="home">
    <div class="barChart" ref="barChart"></div>
  </div>

    <hr>
    <h3 style="color: black;text-align: left">swip卡点转化</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart1"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石建联转化1</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart2"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石建联转化2</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart3"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石内容解锁转化</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart4"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">钻石赠送转化</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart5"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">闪聊转化1</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart6"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">闪聊转化2</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart7"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化1</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart8"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化2</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart9"></div>
    </div>

    <hr>
    <h3 style="color: black;text-align: center">功能转化3</h3>
    <hr>
    <div class="home">
      <div class="barChart" ref="barChart10"></div>
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
      myChartDataKey:['最终付费用户', '有点击客态profile查看的用户到上限的UV', '有点击客态profile查看的用户UV'],
      myChartDataValue: {},
      myChartDataKey1:['最终付费用户', '付费卡点用户UV','主页曝光UV'],
      myChartDataValue1: {},
      myChartDataKey2:['最终付费用户', '有点击客态profile查看的用户到上限的UV', '有点击客态profile查看的用户UV'],
      myChartDataValue2: {},
      myChartDataKey3:['最终进行付费','钻石不足情况', '点击钻石进行建联', '点击对方chatisland','客态profile页面曝光'],
      myChartDataValue3: {},
      myChartDataKey4:['最终进行付费', '钻石不足情况','点击钻石解锁', '锁定的高级chatisland曝光'],
      myChartDataValue4: {},
      myChartDataKey5:['最终进行付费', '钻石不足情况','点击赠礼按钮的UV', '有聊天行为的用户UV'],
      myChartDataValue5: {},
      myChartDataKey6:['最终进行付费', '钻石不足情况','点击闪聊进行建联', '主页曝光UV'],
      myChartDataValue6: {},
      myChartDataKey7:['最终进行付费', '道具不足情况','点击闪聊进行建联', 'WLM曝光UV'],
      myChartDataValue7: {},
      myChartDataKey8:['最终进行付费', '选择高级chatisland', '点击底bar上的发布'],
      myChartDataValue8: {},
      myChartDataKey9:['最终进行付费', '选择高级头像', '切换头像的UV'],
      myChartDataValue9: {},
      myChartDataKey10:['最终进行付费','选择阅后即焚', '聊天框选择发布图片', '有聊天行为的用户'],
      myChartDataValue10: {},
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
              { value: 80, name: 'profile的用户UV' },
              { value: 40, name: 'profile的用户上限的UV' },
              { value: 10, name: '最终付费用户' }
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
              { value: 80, name: '主页曝光UV' },
              { value: 60, name: '付费卡点用户UV' },
              { value: 30, name: '最终付费用户' }
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
              { value: 80, name: '主页曝光UV' },
              { value: 60, name: '点击钻石进行建联' },
              { value: 40, name: '钻石不足情况' },
              { value: 20, name: '最终付费用户' }
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
              { value: 80, name: '客态profile页面曝光' },
              { value: 60, name: '查看对方chatisland' },
              { value: 40, name: '钻石进行建联' },
              { value: 20, name: '钻石不足情况' },
              { value: 10, name: '最终进行付费' }
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
              { value: 80, name: '锁定的高级chatisland曝光' },
              { value: 50, name: '点击钻石解锁' },
              { value: 40, name: '钻石不足情况' },
              { value: 20, name: '最终进行付费' }
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
              { value: 80, name: '有聊天行为的用户UV' },
              { value: 80, name: '点击赠礼按钮的UV' },
              { value: 80, name: '钻石不足情况' },
              { value: 100, name: '最终付费用户' }
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
              { value: 100, name: '主页曝光UV' },
              { value: 55, name: '点击闪聊进行建联' },
              { value: 40, name: '钻石不足情况' },
              { value: 45, name: '最终进行付费' }
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
              { value: 50, name: 'WLM曝光UV' },
              { value: 25, name: '点击闪聊进行建联' },
              { value: 23, name: '道具不足情况' },
              { value: 2, name: '最终付费用户' }
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
              { value: 35, name: '点击底bar上的发布' },
              { value: 20, name: '选择高级chatisland' },
              { value: 5, name: '最终付费用户' }
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
              { value: 20, name: '切换头像的UV' },
              { value: 15, name: '选择高级头像' },
              { value: 5, name: '最终付费用户' }
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
              { value: 100, name: '有聊天行为的用户' },
              { value: 40, name: '聊天框选择发布图片' },
              { value: 20, name: '选择阅后即焚' },
              { value: 10, name: '最终进行付费' }
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

