<template>
  <div class="toolbar">
    <el-button @click="handleExport">保存</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    handleExport () {
      if (!this.$store.state.componentData.length) return
      const data = JSON.stringify(this.$store.state.componentData)
      localStorage.setItem('_local_componentData', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar{
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
