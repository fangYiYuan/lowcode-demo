<template>
  <div class="m-head-contain">
    <div class="m-Head">
      <div class="left" >
        <!-- <img src="../images/icon/backIcon.png" alt=""> -->
      </div>
      <slot name="right"></slot>
      <div v-if="right" class="right" @click="search">
        <!-- <img src="../images/icon/search.png" alt=""> -->
      </div>
      <div class="title">
        <slot/>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'IndexHead',
  props: {
    right: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    search () {
      // this.$emit('href', this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-head-contain {
  height: 44px;
  .m-Head {
    padding: 0 30px;
    z-index: 999;
    box-sizing: border-box;
    height: 44px;
    line-height: 44px;
    width: 100%;
    font-size: 16px;
    color: #fff;
    background: #000;
    .title {
      font-size: 16px;
    }
    .right {
      position: absolute;
      right: 15px;
    }
    .left {
      position: absolute;
      left: 15px;
    }
  }
}
</style>
