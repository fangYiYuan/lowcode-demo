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
    setCurComponent (state, { data }) {
      state.curComponent = data
    }
  },
  actions: {

  }
})
