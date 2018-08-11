<template>
  <div class="container">
    <time-range-slider v-model="value"></time-range-slider>
  </div>
</template>

<script>
import TimeRangeSlider from './index'

export default {
  name: 'TimeRangeSliderDemo',
  components: {
    TimeRangeSlider,
  },
  data() {
    return {
      value: ['05:00', '12:00'],
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 32px 16px;
}
</style>
