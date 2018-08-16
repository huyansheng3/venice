<template>
  <div>
    child
  </div>
</template>

<script>
let index = 0
export default {
  name: 'ChildDemo',
  props: ['dataSource'],
  watch: {
    dataSource(val, oldVal) {
      console.log('watch dataSource', val, index++)
    },
  },
}
</script>

<style lang="less">
</style>
