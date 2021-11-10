<template>
  <div>
    <p class="t-title" v-if="options.viewName">{{ options.viewName || '' }}</p>
    <div class="numCard">
      <div
        class="numCardItem"
        v-for="(item, index) in cardData"
        :key="item.describe"
        :style="{
          backgroundColor: colorList[index] || '#ffffff',
          width: item.width || '',
          flex: item.width ? '' : 1
        }"
      >
        <p class="describe">{{ item.describe }}</p>
        <p class="num" :style="{ color: numColor(item) }">{{ numColor(item) ? setIsAdd(item.num) : item.num || 0 }}</p>

        <p v-if="item.other !== '' && item.other !== undefined && item.other !== null && item.other !== false">
          <span class="describe">{{ otherDes }}</span
          >：<span :style="{ color: item.other < 0 ? 'green' : 'red' }" v-if="otherDes === '昨日'">{{
            item.other | isAdd
          }}</span>
          <span :style="{ color: 'red' }" v-else>{{ item.other }}</span>
        </p>
      </div>
      <div class="tip">
        <slot name="tip"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    isAdd (data) {
      if (parseInt(data) >= 0) {
        return '+' + data
      } else {
        return data
      }
    }
  },
  props: {
    options: {
      type: [Object],
      default () {
        return []
      }
    },
    colorList: {
      type: Array,
      default () {
        return []
      }
    },
    otherDes: {
      type: String,
      default () {
        return '昨日'
      }
    }
  },
  data () {
    return {
      cardData: []
    }
  },
  watch: {
    'options.data': {
      handler (n) {
        console.log('=>nnn', n)
        const data = n
        const numKey = Object.keys(data).filter(
          item => item.includes('_value') && !item.includes('o_')
        )
        this.cardData = numKey.map((item, index) => {
          let num
          const describe = data[numKey[index].replace('_value', '')]
          console.log('=>describe', describe)
          if (!describe) return
          if (describe.includes('金额')) {
            num = data[item] + '万'
          } else if (describe.includes('率') || describe.includes('占比')) {
            num = data[item] + '%'
          } else {
            num = data[item]
          }
          let otherVal = 'o_' + numKey[index]
          console.log('=>otherVal', data[otherVal])
          return {
            width: data.length < 3 ? '50%' : '33.3%',
            num,
            describe,
            other: data[otherVal] && data[otherVal]
          }
        })
        console.log('=>gg', this.cardData)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    numColor (data) {
      if (data.numColor) {
        if (parseInt(data.num) > 0) {
          return 'red'
        } else {
          return 'green'
        }
      } else {
        return ''
      }
    },
    setIsAdd (data) {
      if (parseInt(data) >= 0) {
        return '+' + data
      } else {
        return data
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.numCard {
  display: flex;
  flex-wrap: wrap;
  // padding-bottom: 30px;
  position: relative;
  background: #ffffff;
  .numCardItem {
    // margin-right: 5px;
    padding: 12px 0;
    text-align: center;
    color: #333333;
    .num {
      font-size: 16px;
      font-weight: 500;
    }
    .describe {
      font-size: 12px;
      color: #999999;
    }
  }
  .numCardItem:last-of-type {
    margin-right: 0px !important;
  }
  .tip {
    position: absolute;
    right: 6px;
    top: 2px;
  }
  .noData {
    width: 100%;
    text-align: center;
  }
}
.t-title {
  font-weight: 600;
  font-size: 15px;
  padding: 5px;
  color: #2c3e50;
  background: #ffffff;
}
</style>
