<template>
    <div class="attr-list">
      <div>
        <el-form label-width="120px">
          <el-form-item v-for="item in optionsKeys.filter(key => !['dataset', 'series', 'grid'].includes(key))" :key="item" :label="item">
            <el-input v-if="item === 'viewName'" v-model="curComponent.options['viewName']"></el-input>
            <el-select v-if="item === 'xAxis'" v-model="curComponent.options.xAxis.type">
              <el-option
                  v-for="item in xAxisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-if="item === 'yAxis'" v-model="curComponent.options.yAxis.type">
              <el-option
                  v-for="item in xAxisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="X轴label偏移">
            <el-input v-model="curComponent.options.xAxis.axisLabel.rotate"></el-input>
          </el-form-item>
          <el-form-item label="y轴label偏移">
            <el-input v-model="curComponent.options.yAxis.axisLabel.rotate"></el-input>
          </el-form-item>
        </el-form>
        <el-card class="box-card">
          <div v-for="(item, index) in curComponent.options.series" :key="index">
          <el-form v-if="(index + 1) === tabPosition" label-width="120px">
            <el-form-item label="数据源">
              <el-radio-group v-model="tabPosition">
                <el-radio-button
                  v-for="(item, index) in curComponent.options.dataset.dimensions"
                  :key="index"
                  :label="index"
                  v-if="index > 0"
                >
                  <span >{{item}}</span>
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="type">
              <el-select v-model="item.type" @change="()=> item.markPoint.symbol = 'none'">
                <el-option
                    v-for="itemSub in seriesType"
                    :key="itemSub.value"
                    :label="itemSub.label"
                    :value="itemSub.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="柱条颜色">
              <el-color-picker v-model="item.itemStyle['color']"></el-color-picker>
            </el-form-item>
            <el-form-item label="label">
              <el-row type="flex" justify="start">
                <el-col :span="4">
                  <el-switch
                    v-model="item.label['show']"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-col>
                <el-col :span="6">
                  <el-color-picker v-model="item.label['color']"></el-color-picker>
                </el-col>
              </el-row>
            </el-form-item>
            <div  v-if="item.type === 'line'">
              <el-form-item label="标记">
                <el-select v-model="item.markPoint.symbol">
                  <el-option
                      v-for="item in markPointData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-if="item.markPoint.data" v-model="item.markPoint.data[0]['type']">
                  <el-option
                      v-for="item in markPointTypeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="标记类型">
              </el-form-item> -->
              <el-form-item label="取值维度">
              <el-select v-if="item.seriesLayoutBy" v-model="item.seriesLayoutBy">
                  <el-option
                      v-for="item in seriesLayoutByData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="平滑曲线">
                <el-switch
                  v-model="item.smooth"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </div>
            <el-form-item label="stack">
              <el-input v-model="item.stack"></el-input>
            </el-form-item>
          </el-form>
        </div>
        </el-card>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 1,
      xAxisOptions: [
        {
          label: 'category',
          value: 'category'
        },
        {
          label: 'value',
          value: 'value'
        }
      ],
      seriesType: [
        {
          label: 'bar',
          value: 'bar'
        },
        {
          label: 'line',
          value: 'line'
        }
      ],
      markPointData: [
        {
          label: 'none',
          value: 'none'
        },
        {
          label: 'circle',
          value: 'circle'
        },
        {
          label: 'pin',
          value: 'pin'
        },
        {
          label: 'arrow',
          value: 'arrow'
        }
      ],
      markPointTypeData: [
        {
          label: 'min',
          value: 'min'
        },
        {
          label: 'max',
          value: 'max'
        },
        {
          label: 'average',
          value: 'average'
        }
      ],
      seriesLayoutByData: [
        {
          label: 'column',
          value: 'column'
        },
        {
          label: 'row',
          value: 'row'
        }
      ],
      excludes: ['Picture', 'Group'], // 这些组件不显示内容
      textAlignOptions: [
        {
          label: '左对齐',
          value: 'left'
        },
        {
          label: '居中',
          value: 'center'
        },
        {
          label: '右对齐',
          value: 'right'
        }
      ],
      borderStyleOptions: [
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '虚线',
          value: 'dashed'
        }
      ],
      verticalAlignOptions: [
        {
          label: '上对齐',
          value: 'top'
        },
        {
          label: '居中对齐',
          value: 'middle'
        },
        {
          label: '下对齐',
          value: 'bottom'
        }
      ],
      selectKey: ['textAlign', 'borderStyle', 'verticalAlign'],
      map: {
        type: '类型',
        label: '高',
        width: '宽',
        color: '颜色',
        backgroundColor: '背景色',
        borderStyle: '边框风格',
        borderWidth: '边框宽度',
        borderColor: '边框颜色',
        borderRadius: '边框半径',
        fontSize: '字体大小',
        fontWeight: '字体粗细',
        lineHeight: '行高',
        letterSpacing: '字间距',
        opacity: '透明度',
        textAlign: '左右对齐',
        verticalAlign: '上下对齐'
      }
    }
  },
  computed: {
    optionsKeys () {
      return this.$store.state.curComponent ? Object.keys(this.$store.state.curComponent.options) : []
    },
    curComponent () {
      return this.$store.state.curComponent
    }
  },
  watch: {
    curComponent: {
      deep: true,
      handler (n) {
        console.log('=>nncccc', n)
      }
    }
  },
  methods: {
    changeType (item) {
      console.log('=>item', item)
      // ()=> item.markPoint.symbol = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
