<template>
  <div>
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
              { value: 5, name: '男' },
              { value: 24, name: '女' },
              { value: 2, name: '其他' }
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
              { value: 5, name: '<22' },
              { value: 24, name: '22-28' },
              { value: 2, name: '28-32' },
              { value: 21, name: '32-38' },
              { value: 23, name: '38-42' },
              { value: 5, name: '42-48' },
              { value: 2, name: '>48' }
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
              { value: 5, name: 'flirt' },
              { value: 4, name: 'submissive' },
              { value: 6, name: 'dominate' },
              { value: 9, name: 'foreplay' },
              { value: 7, name: 'dates' },
              { value: 3, name: 'friendship' },
              { value: 8, name: 'sensual' },
              { value: 6, name: 'watching' },
              { value: 5, name: 'texting' },
              { value: 2, name: 'bdsm' },
              { value: 5, name: 'couples' },
              { value: 2, name: 'singles' },
              { value: 1, name: 'kink' },
              { value: 5, name: 'poly' },
              { value: 10, name: 'group' },
              { value: 6, name: 'threeway' },
              { value: 15, name: 'relationship' },
              { value: 12, name: 'advice' },
              { value: 13, name: 'confession' },
              { value: 0, name: 'novelty' },
              { value: 0, name: 'lifestyle' },
              { value: 7, name: 'cooking' },
              { value: 8, name: 'sports' },
              { value: 9, name: 'singing' },
              { value: 6, name: 'reading' },
              { value: 4, name: 'dancing' },
              { value: 5, name: 'drawing' },
              { value: 24, name: 'other' }
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
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          { type: 'bar', seriesLayoutBy: 'row' },
          // These series are in the second grid.
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 },
          { type: 'bar', xAxisIndex: 1, yAxisIndex: 1 }
        ]
      };
      myChart3.setOption(option3);
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

