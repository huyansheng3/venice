<template>
  <div ref="slider" @click="handleSliderMousedown" class="time-range-slider">
    <div class="slider-time-show" slot="slider-time">
      <span>
        {{value[0]}} - {{value[1]}}
      </span>
    </div>
    <div class="slider-silder-container" role="time-range-slider">
      <div class="slider-silder">
        <div class="slider-slider-mask">
          <div class="slider-slider-mask-item" :class="{selected: index === 1}"  :style="{flex: duration}" v-for="(duration, index) in selectedDurations" :key="index"></div>
        </div>
      </div>
      <div class="slider-tick">
        <div class="slider-tick-item" :style="{flex: tick.duration}" v-for="(tick, index) in ticks" :key="index">
          <span class="slider-tick-item-label">{{tick.label}}</span>
        </div>
      </div>
    </div>
    <div class="slider-tips" slot="slider-tip">
      <span>建议扩大发车时间段，提高预约成功率</span>
    </div>
  </div>
</template>

<script>
function addZeroForNumber(number, digit = 2) {
  if (number == null) throw Error('number不能为空')
  const addNumber = digit - String(number).length
  if (addNumber <= 0) return String(number)
  return '0'.repeat(addNumber) + String(number)
}

function generateTimeOptions(start = '00:00', end = '24:00', step = '00:15') {
  const [startHour, startMinute] = start.split(':').map(value => Number(value))
  const [endHour, endMinute] = end.split(':').map(value => Number(value))
  const [stepHour, stepMinute] = step.split(':').map(value => Number(value))

  let options = [start],
    currentHour = startHour,
    currentMinute = startMinute
  while (currentHour < endHour || currentMinute < endMinute) {
    currentHour += stepHour
    currentMinute += stepMinute
    // 处理进位
    currentHour += Math.floor(currentMinute / 60)
    currentMinute = currentMinute % 60
    options.push(`${addZeroForNumber(currentHour)}:${addZeroForNumber(currentMinute)}`)
  }

  return options
}

function checkTime(time) {
  if (/^\d{2}:\d{2}$/.test(time)) return true
  return false
}

function caclTimeDuration(before = '00:00', after = '01:30') {
  if (!(checkTime(before) || checkTime(checkTime))) return
  const [hour, minute] = before.split(':').map(value => Number(value))
  const [afterTickHour, afterTickMinute] = after.split(':').map(value => Number(value))
  return (afterTickHour - hour) * 60 + (afterTickMinute - minute)
}

// 返回数组，用于刻度渲染
function defaultTickRule(options) {
  const filterOpts = options.filter((opt, index) => index % 2 === 0)

  return filterOpts.map((opt, index) => {
    const nextOpt = filterOpts[index + 1]
    let duration
    if (nextOpt) {
      duration = caclTimeDuration(opt, nextOpt)
    } else {
      duration = 0
    }
    if (opt === '00:00' || opt === '12:00' || opt === '24:00') {
      return { time: opt, label: opt, duration }
    } else {
      return { time: opt, duration }
    }
  })
}

export default {
  name: 'TimeRangeSlider',
  props: {
    range: {
      type: Array,
      default() {
        return ['00:00', '24:00']
      },
    },
    value: {
      type: Array,
      default() {
        return ['8:00', '15:00']
      },
    },
    // 最小调整大小
    step: {
      type: String,
      default: '00:60',
    },
    // 刻度尺显示规则
    tickRule: {
      type: Function,
      default: defaultTickRule,
    },
  },
  data() {
    return {
      currentValue: this.value.slice(),
    }
  },
  computed: {
    timeOptions() {
      return generateTimeOptions(this.range[0], this.range[1], this.step)
    },
    ticks() {
      return this.tickRule(this.timeOptions)
    },
    // 从0到选中开始，选中开始到选中结束，开始到结束
    selectedDurations() {
      const [start, end] = this.range
      const [selectedStart, selectedEnd] = this.currentValue
      return [caclTimeDuration(start, selectedStart), caclTimeDuration(selectedStart, selectedEnd), caclTimeDuration(selectedEnd, end)]
    },
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    },
    value(val) {
      this.currentValue = val
    },
    min() {
      this.update()
    },
    step() {
      this.update()
    },
    max() {
      this.update()
    },
  },
  methods: {
    handleSliderMousedown(e) {
      console.log(e, this.$refs.slider.clientWidth)
    },
    update() {
      // let value = this.currentValue
      // if (value < this.min) {
      //   value = this.min
      // }
      // if (value > this.max) {
      //   value = this.max
      // }
      // this.range.reInit({
      //   min: this.min,
      //   max: this.max,
      //   step: this.step,
      //   value,
      // })
      // this.currentValue = value
      // this.range.setStart(this.currentValue)
      // this.range.setStep()
    },
  },
}
</script>

<style lang="less">
@orange: #fc9153;
@orange-light: #ffe9dd;
@gray: #f3f4f5;
@ft-gray: #999999;
@tick-color: #cccccc;

.time-range-slider {
  font-family: PingFangSC-Regular;

  text-align: center;
  .slider-time-show {
    font-size: 24px;
    color: #fc9153;
    line-height: 36px;
  }
  .slider-silder-container {
    margin-top: 16px;
    margin-bottom: 30px;
    .slider-silder {
      height: 12px;
      background-color: @gray;
      position: relative;
      .slider-slider-mask {
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        &-item {
          height: 12px;
          box-sizing: border-box;
        }
        &-item.selected {
          background-color: @orange-light;
          border-left: 3px solid @orange;
          border-right: 3px solid @orange;
          position: relative;
        }
        &-item.selected::after,
        &-item.selected::before {
          position: absolute;
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: @orange;
          top: -100%;
        }
        &-item.selected::before {
          left: -7.5px;
        }
        &-item.selected::after {
          right: -7.5px;
        }
      }
    }
    .slider-tick {
      display: flex;
      flex-direction: row;
      height: 6px;
      margin-top: 6px;

      .slider-tick-item {
        border-left: 1px solid @tick-color;
        position: relative;
        &-label {
          position: absolute;
          display: inline-block;
          margin-top: 6px;
          left: -50%;
          top: 6px;
          text-align: left;
        }
      }
      .slider-tick-item:first-child {
        .slider-tick-item-label {
          left: 0;
        }
      }
      .slider-tick-item:last-child {
        .slider-tick-item-label {
          left: initial;
          right: 0;
        }
      }
    }
  }
  .slider-tips {
    font-size: 12px;
    color: #fe4f27;
    text-align: center;
    line-height: 18px;
  }
}
</style>
