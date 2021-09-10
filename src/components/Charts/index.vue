<template>
  <div class="pd15 ehcarts-css shadow" style="position: relative">
    <p class="title" v-if="options.viewName">
      {{ options.viewName.replace(/\((.+?)\)/g, '') }}
      <span style="color:#999;font-size:12px">
        {{ options.viewName.match(/\((.+?)\)/g) ? options.viewName.match(/\((.+?)\)/g)[0] : '' }}
      </span>
    </p>
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
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      myChart: ''
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.drawLine()
      }
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
      if (!this.options) return
      echarts.dispose(this.myChart)
      this.myChart = echarts.init(this.$refs.chart, null, { renderer: 'svg' })
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
      const obj = {
        legend: {},
        tooltip: {}
      }
      const options = Object.assign(obj, this.options)
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
    margin-bottom: 15px;
  }
}
</style>
