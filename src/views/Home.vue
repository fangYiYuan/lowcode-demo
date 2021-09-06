<template>
  <div class="home">
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
                    <AttrList v-if="curComponent" />
                    <p v-else class="placeholder">请选择组件</p>
                </el-tab-pane>
            </el-tabs>
        </section>
    </main>
  </div>
</template>

<script>
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

        .left {
            position: absolute;
            height: 100%;
            width: 200px;
            left: 0;
            top: 0;
            padding-top: 10px;
        }

        .right {
            position: absolute;
            height: 100%;
            width: 400px;
            right: 0;
            top: 0;
            background: #fff;
        }

        .center {
            margin-left: 100px;
            margin-right: 100px;
            background: #f5f5f5;
            height: 100%;
            overflow: auto;
            padding: 20px;

            .content {
                width: 100%;
                height: 100%;
                overflow: auto;
            }
        }
    }

    .placeholder {
        text-align: center;
        color: #333;
    }
}
</style>
