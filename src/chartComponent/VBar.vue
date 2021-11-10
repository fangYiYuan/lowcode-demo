<template>
  <div class="card">
    <p class="title" v-if="options.viewName">
      <span>{{ options.viewName }}</span>
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
  padding: 0 0 0 20px;
  border-radius: 15px;
  background: #fff;
  // margin: 10px 0;
  // box-shadow: 0px 7px 9px 0px rgba(217, 245, 237, 1);
  .chart-c {
    width: 100%;
    height: 300px;
    div {
      display: inline-block;
    }
  }
  .title {
    border-bottom: 1px solid #f0ebeb;
    // padding: 0 10px 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 28px;
    text-align: left;
    span {
      // margin-left: 5px;
      color:#999;
      font-size:12px
    }
    i {
      font-size: 24px;
      color: #aea3a3;
      margin-left: 10px;
    }
  }
}
</style>
