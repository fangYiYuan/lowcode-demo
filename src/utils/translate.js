import store from '@/store'

export function changeStyleWithScale (val) {
  return val * parseInt(store.state.canvasStyleData.scale) / 100
}
