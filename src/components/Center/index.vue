<template>
    <div class="editor" id="editor"
        :style="{
            width: changeStyleWithScale(canvasStyleData.width) + 'px',
        }"
    >
    <IndexHead class="head">
      <el-input v-model="mTitle" placeholder="请输入内容" class="head-in"></el-input>
    </IndexHead>
        <Draggable :set-data="setData" :list="componentData" group="article" class="dragArea">
          <transition-group type="transition" name="flip-list">
            <Shape
                v-for="(item, index) in componentData"
                :key="item.id"
                class="item-css"
                :data="item"
                :ind="index"
                :active="item.id === (curComponent || {}).id"
              >
                <!-- <Charts
                  :options="item.options"
                /> -->
                <component
                  :is="item.component"
                  :id="'component' + item.id"
                  :options="item.options"
                  :ind="index + 1"
                />
            </Shape>
          </transition-group>
        </Draggable>

        <!-- 右击菜单 -->
        <!-- <ContextMenu /> -->
        <!-- 标线 -->
        <!-- <MarkLine /> -->
        <!-- 选中区域 -->
        <!-- <Area :start="start" :width="width" :height="height" v-show="isShowArea" /> -->
    </div>
</template>

<script>
// import Charts from '@/chartComponent/Charts'
import Shape from './Shape'
import { mapState } from 'vuex'
import { changeStyleWithScale } from '@/utils/translate'
import Draggable from 'vuedraggable'
import IndexHead from './appHead'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  components: { Shape, Draggable, IndexHead },
  data () {
    return {
      mTitle: '12321',
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
    'componentData',
    'curComponent'
  ]),
  mounted () {
  },
  methods: {
    changeStyleWithScale,
    setData (dataTransfer) {
      dataTransfer.setData('Text', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
    position: relative;
    background: #fff;
    margin: auto;
    padding-bottom: 20px;
    height: calc(100vh - 100px);
    overflow-y: scroll;
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
.item-css{
  position: relative;
  box-sizing: content-box;
    // border: 2px dashed #ccc;
    // margin-bottom: 10px;
  box-shadow: 0px 7px 9px 0px #d9f5ed;
  margin: 10px 10px;
  padding: 5px 10px 10px;
  cursor: pointer;
  transition: all 0.5s;
  cursor: move;
  .tool{
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
  }
}
::v-deep .el-input__inner {
  display: block;
  height: 30px;
  width: 100%;
  color: #fff;
  background: #000;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 5px;
  cursor: pointer;
  text-align: center;
}
</style>
