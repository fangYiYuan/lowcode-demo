<template>
  <div class="home">
    <Toolbar />
    <main>
      <section class="left">
        <Left />
      </section>
      <section class="center" @drop="handleDrop"  @dragover="handleDragover">
        <div class="content" >
            <Center />
        </div>
      </section>
      <!-- 右侧属性列表 -->
        <section class="right">
            <el-tabs v-model="activeName">
                <el-tab-pane label="属性" name="attr">
                    <Right v-if="Object.keys(curComponent).length && curComponent.label !== 'Card'" />
                    <p v-else class="placeholder">请选择组件</p>
                </el-tab-pane>
                <el-tab-pane label="data" name="data" style="width: 100%;height: 100%;">
                    <Editor
                      v-if="activeName === 'data'"
                      v-model="mData"
                      @init="editorInit"
                      lang="javascript"
                      theme="chrome"
                      @input="editChange"
                    />
                </el-tab-pane>
            </el-tabs>
        </section>
    </main>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar' // @ is an alias to /src
import Left from '@/components/Left' // @ is an alias to /src
import Right from '@/components/Right' // @ is an alias to /src
import Center from '@/components/Center' // @ is an alias to /src
import { deepCopy } from '@/utils/utils'
import generateID from '@/utils/generateID'
import componentList from '@/utils/componentList'
import { mapState } from 'vuex'
function debounce (fn, wait = 1000) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export default {
  components: {
    Left,
    Toolbar,
    Center,
    Right,
    Editor: require('vue2-ace-editor')
  },
  data () {
    return {
      activeName: 'attr',
      mData: null
    }
  },
  computed: mapState([
    'curComponent'
  ]),
  watch: {
    curComponent: {
      handler (n) {
        console.log('=>nnnn', n)
        this.mData = JSON.stringify(n, null, 2)
      },
      deep: true
    }
  },
  methods: {
    handleDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      const index = e.dataTransfer.getData('index')
      if (index) {
        const data = deepCopy(componentList[index])
        data.id = generateID()
        console.log('=>component', data)
        this.$store.commit('addComponent', { data })
      }
    },
    handleDragover (e) {
      e.preventDefault()
      e.stopPropagation()
      // e.dataTransfer.dropEffect = 'copy'
    },
    editorInit: function () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/chrome')
      require('brace/snippets/javascript') // snippet
    },
    editChange: debounce(function (e) {
      if (!e) return
      const data = JSON.parse(e)
      let params = { data, index: this.$store.state.curComponentIndex }
      this.$store.commit('setCurComponent', params)
      this.$store.commit('changeComponent', params)
    })
  }
}
</script>

<style lang="scss">
.home {
    height: 100vh;
    background: #fff;

    main {
        height: calc(100% - 64px);
        position: relative;
        display: flex;
        .left {
            // position: absolute;
            height: 100%;
            width: 200px;
            // left: 0;
            // top: 0;
            padding-top: 10px;
        }
        .center {
            width: 500px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;
            text-align: center;
            .content {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            // position: absolute;
            height: 100%;
            flex: 1;
            // width: 60%;
            // right: 0;
            // top: 0;
            background: #fff;
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
