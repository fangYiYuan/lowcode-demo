import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    canvasStyleData: { // 页面全局数据
      width: 375,
      height: '',
      scale: 100
    },
    componentData: [], // 画布上的组件
    curComponent: {}
  },
  mutations: {
    addComponent (state, { component }) {
      state.componentData.push(component)
    },
    deleteComponentData (state, { index }) {
      if (typeof index === 'number') {
        state.componentData.splice(index, 1)
      } else {
        state.componentData = []
      }
    },
    setCurComponent (state, { data }) {
      state.curComponent = data
    }
  },
  actions: {

  }
})
