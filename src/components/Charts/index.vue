<template>
  <div class="pd15 ehcarts-css" :class="{ shadow: showShadow }" style="position: relative">
    <!-- <p class="title" v-if="result.viewName && !hideTitle">
      {{ result.viewName.replace(/\((.+?)\)/g, '') }}
      <span style="color:#999;font-size:12px">
        {{ result.viewName.match(/\((.+?)\)/g) ? result.viewName.match(/\((.+?)\)/g)[0] : '' }}
      </span>
    </p> -->
    <div ref="chart" class="chart-c"></div>
    <slot name="tip"></slot>
  </div>
</template>

<script>
// import toolFormatter from '@/lib/echartToolFormatter';
import * as echarts from 'echarts'
export default {
  name: 'rent',
  props: {
    result: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    // 显示阴影
    showShadow: {
      type: Boolean,
      default () {
        return true
      }
    },
    dataStartAndEnd: {
      type: Object,
      default () {
        return {
          start: 0,
          end: 50
        }
      }
    },
    // 图表标注
    legend: {
      type: Array,
      default () {
        return []
      }
    },
    // x轴数据排列格式
    totate: {
      type: Object,
      default () {
        return {}
      }
    },
    // 柱状图颜色
    colors: {
      type: Array,
      default () {
        return ['#5AAEF2', '#62D9AD']
      }
    },
    // 图表类型
    type: {
      type: String,
      default () {
        return ''
      }
    },
    // 柱状图是否有Radius曲线
    borderRadius: {
      type: Boolean,
      default () {
        return true
      }
    },
    // 数组单位
    unit: {
      type: String,
      default () {
        return '%'
      }
    },
    // 柱状图数组显示
    labelShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    labelShowArr: {
      type: Array,
      default () {
        return [true, true]
      }
    },
    maxShowLabel: {
      type: Number,
      default: 6
    },
    maxLength: {
      type: [Number, String],
      default () {
        return 15
      }
    }
  },
  data () {
    return {
      myChart: ''
    }
  },
  watch: {
    result (n) {
      this.drawLine()
    }
  },
  created () {},
  beforeDestory () {
    echarts.dispose(this.myChart)
    this.myChart = null
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      if (!this.$refs.chart) return
      const {
        result = {},
        labelShow,
        labelShowArr
      } = this

      let { legend = [] } = this
      const { rowsRate = [], rows = [], columns = [] } = result
      if (!legend.length) {
        legend = result.legend || []
      }
      echarts.dispose(this.myChart)
      this.myChart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
      // if (!rows.length) {
      //   title = {
      //     show: rows && rows.length === 0,
      //     textStyle: {
      //       color: '#333',
      //       fontSize: 16
      //     },
      //     text: '暂无数据',
      //     left: 'center',
      //     top: 'center'
      //   }
      // }

      // const options = {
      //   xAxis: {
      //     type: 'category',
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //   },
      //   yAxis: {
      //     type: 'value'
      //   },
      //   series: [{
      //     data: [120, 200, 150, 80, 70, 110, 130],
      //     type: 'bar',
      //     showBackground: true,
      //     backgroundStyle: {
      //       color: 'rgba(180, 180, 180, 0.2)'
      //     }
      //   }]
      // }
      const options = {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: { type: 'category' },
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: [{ type: 'bar' }, { type: 'line' }, { type: 'bar' }]
      }
      this.myChart.setOption(options, true)
    }
  }
}
</script>

<style scoped lang="scss">
.pd15 {
  padding: 20px 15px;
}
.card {
  margin: 15px 0;
  box-shadow: 0 0 0.4rem 0.4rem hsla(0, 0%, 82%, 0.1);
  margin: 0.2rem 0;
  background: #fff;
}

.pd20{
  padding-bottom: 20px;
}
.ehcarts-css {
  margin: 15px 0;
  box-shadow: 0 0 0.4rem 0.4rem hsla(0, 0%, 82%, 0.1);
  margin: 0.2rem 0;
  background: #fff;
  .chart-c {
    width: 100%;
    height: 300px;
    div {
      display: inline-block;
    }
  }
  .title {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
