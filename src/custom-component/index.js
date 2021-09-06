import Vue from 'vue'

const components = [
    'VText',
]
Vue.component('VText', () => import(`@/custom-component/VText.vue`))
// components.forEach(key => {
//     Vue.component(key, () => import(`@/custom-component/${key}`))
// })