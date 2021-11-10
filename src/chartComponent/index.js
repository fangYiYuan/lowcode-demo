import Vue from 'vue'
const arr = [
  'VBar',
  'VCard'
]

arr.map(item => {
  Vue.component(item, () => import(`@/chartComponent/${item}`))
})
