<template>
    <div class="editor" id="editor"
        :class="{ edit: isEdit }"
        :style="{
            width: changeStyleWithScale(canvasStyleData.width) + 'px',
            height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
    >
        <!-- 网格线 -->
        <Grid />

        <Shape v-for="item in componentData" :key="item.id" :data="item">
          <Charts
            :data="item"
          />
        </Shape>

        <!-- 右击菜单 -->
        <!-- <ContextMenu /> -->
        <!-- 标线 -->
        <!-- <MarkLine /> -->
        <!-- 选中区域 -->
        <!-- <Area :start="start" :width="width" :height="height" v-show="isShowArea" /> -->
    </div>
</template>

<script>
import Charts from '@/components/Charts'
import Grid from './Grid'
import Shape from './Shape'
import { mapState } from 'vuex'
import { changeStyleWithScale } from '@/utils/translate'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  components: { Grid, Shape, Charts },
  data () {
    return {
      editorX: 0,
      editorY: 0,
      start: { // 选中区域的起点
        x: 0,
        y: 0
      },
      width: 0,
      height: 0,
      isShowArea: false
    }
  },
  computed: mapState([
    'canvasStyleData',
    'componentData'
  ]),
  mounted () {
    console.log('=>111', this.canvasStyleData)
    console.log('=>componentData', this.componentData)
  },
  methods: {
    changeStyleWithScale
  }
}
</script>

<style lang="scss" scoped>
.editor {
    position: relative;
    background: #fff;
    margin: auto;

    .lock {
        opacity: .5;

        &:hover {
            cursor: not-allowed;
        }
    }
}
.edit {
    .component {
        outline: none;
        width: 100%;
        height: 100%;
    }
}
</style>
