<template>
  <div class="test-vue">
    test
    <ul class="list1">
      <li @click="setCurrent(item)" v-for="(item, index) in list" :key="index">{{item.value}}</li>
    </ul>

    <ul class="list2">
      <li @click="setCurrent2(item)" v-for="(item, index) in list2" :key="index">{{item}}</li>
    </ul>

    <child-demo :dataSource="dataSource"></child-demo>

    <button @click="handleClick">click1</button>

    <button @click="handleClick2">click2</button>

    <button @click="handleClick3">click3</button>
  </div>
</template>

<script>
import ChildDemo from './child'
import { sample, times, random } from 'lodash'

const list = times(10, index => {
  return { value: random(1, 10) }
})

const list2 = times(10, index => {
  return random(1, 10)
})

let index = 0
export default {
  name: 'TestDemo',
  components: {
    ChildDemo,
  },
  data() {
    return {
      dataSource: {},
      list,
      list2,
      current: {},
      current2: null,
      dataSource2: {},
    }
  },
  watch: {
    current(val, oldVal) {
      console.log('watch current', val, index++)
    },
    current2(val, oldVal) {
      console.log('watch current2', val, index++)
    },
    dataSource2(val, oldVal) {
      console.log('watch dataSource2', val, index++)
    },
  },
  // 总结一下 val ==== oldVal 不会触发 watch 事件
  // this.$set 会触发整个对象的change, 随之触发整个对象的 watch 事件，也能触发子组件的 watch 事件
  methods: {
    setCurrent(item) {
      console.log('setCurrent', index++)
      // this.current = {...item}
      this.current = item
    },
    setCurrent2(item) {
      console.log('setCurrent2', index++)
      // this.current = {...item}
      this.current2 = item
    },
    handleClick() {
      console.log('handleClick', index++)
      this.$set(this.dataSource, 'test', 123)
    },
    handleClick2() {
      console.log('handleClick2', index++)
      this.dataSource = { test2: 123 }
    },
    handleClick3() {
      console.log('handleClick3', index++)
      this.$set(this.dataSource2, 'hahah', 123)
    },
  },
}
</script>

<style lang="less" scoped>
.test-vue {
  .list1 > li {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: aqua;
  }

  ul {
    margin-top: 30px;
  }

  .list2 > li {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: antiquewhite;
  }

  button {
    background-color: beige;
    height: 20px;
    padding: 20px;
  }
}
</style>
