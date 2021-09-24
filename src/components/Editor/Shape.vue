<template>
  <div class="shape" :class="{active}" @click="selectChart">
    <div class="tool">
      <i class="el-icon-delete" @click.stop.prevent="handleDelete(ind)"></i>
    </div>
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
    },
    ind: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectChart () {
      this.$store.commit('setCurComponent', { data: this.data })
    },
    handleDelete (index) {
      this.$store.commit('deleteComponentData', { index })
    }
  }
}
</script>

<style lang="scss" scoped>
.shape{
  padding: 0 10px;
  position: relative;
  .tool{
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      z-index: 99;
    }
}
.active {
    border-color: #00a680 !important;
    user-select: none;
}
</style>
