<template>
  <div class="shape" @click="selectChart">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectChart () {
      this.$store.commit('setCurComponent', { data: this.data })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
