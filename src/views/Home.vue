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
    </main>
  </div>
</template>

<script>
import ComponentList from '@/components/ComponentList' // @ is an alias to /src
import Editor from '@/components/Editor' // @ is an alias to /src
import { deepCopy } from '@/utils/utils'
import generateID from '@/utils/generateID'
import componentList from '@/utils/componentList'

export default {
  components: {
    ComponentList,
    Editor
  },
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
            width: 262px;
            right: 0;
            top: 0;
        }

        .center {
            margin-left: 200px;
            margin-right: 262px;
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
