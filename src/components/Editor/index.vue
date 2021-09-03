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

        <!--页面组件列表展示-->
        <!-- <Shape v-for="(item, index) in componentData"
            :defaultStyle="item.style"
            :style="getShapeStyle(item.style)"
            :key="item.id"
            :active="item.id === (curComponent || {}).id"
            :element="item"
            :index="index"
            :class="{ lock: item.isLock }"
        >
            <component
                v-if="item.component != 'v-text'"
                class="component"
                :is="item.component"
                :style="getComponentStyle(item.style)"
                :propValue="item.propValue"
                :element="item"
                :id="'component' + item.id"
            />

            <component
                v-else
                class="component"
                :is="item.component"
                :style="getComponentStyle(item.style)"
                :propValue="item.propValue"
                @input="handleInput"
                :element="item"
                :id="'component' + item.id"
            />
        </Shape> -->
        <!-- 右击菜单 -->
        <!-- <ContextMenu /> -->
        <!-- 标线 -->
        <!-- <MarkLine /> -->
        <!-- 选中区域 -->
        <!-- <Area :start="start" :width="width" :height="height" v-show="isShowArea" /> -->
    </div>
</template>

<script>
import Grid from './Grid'
import { mapState } from 'vuex'
import { changeStyleWithScale } from '@/utils/translate'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  components: { Grid },
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
    'canvasStyleData'
  ]),
  mounted () {
    console.log('=>111', this.canvasStyleData)
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
