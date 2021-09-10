<template>
  <div class="shape" :class="{active}" @click="selectChart">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
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
.shape{
  padding: 0 10px;
}
.active {
    outline: 1px solid #70c0ff;
    user-select: none;
}
</style>
