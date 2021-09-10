<template>
  <div class="home">
    <Toolbar />
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center" @drop="handleDrop"  @dragover="handleDragover">
        <div class="content" >
            <Editor />
        </div>
      </section>
      <!-- 右侧属性列表 -->
        <section class="right">
            <el-tabs v-model="activeName">
                <el-tab-pane label="属性" name="attr">
                    <AttrList v-if="Object.keys(curComponent).length" />
                    <p v-else class="placeholder">请选择组件</p>
                </el-tab-pane>
            </el-tabs>
        </section>
    </main>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar' // @ is an alias to /src
import ComponentList from '@/components/ComponentList' // @ is an alias to /src
import AttrList from '@/components/AttrList' // @ is an alias to /src
import Editor from '@/components/Editor' // @ is an alias to /src
import { deepCopy } from '@/utils/utils'
import generateID from '@/utils/generateID'
import componentList from '@/utils/componentList'
import { mapState } from 'vuex'

export default {
  components: {
    ComponentList,
    Toolbar,
    Editor,
    AttrList
  },
  data () {
    return {
      activeName: 'attr'
    }
  },
  computed: mapState([
    'curComponent'
  ]),
  methods: {
    handleDrop (e) {
      e.preventDefault()
      e.stopPropagation()
      const index = e.dataTransfer.getData('index')
      if (index) {
        const component = deepCopy(componentList[index])
        component.id = generateID()
        console.log('=>component', component)
        this.$store.commit('addComponent', { component })
      }
    },
    handleDragover (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }
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
                overflow: auto;
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
