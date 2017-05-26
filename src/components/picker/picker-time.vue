<template>
  <div class="picker-wrapper">
    <template v-if="platform">
  
      <div class="picker-cover" ref="cover"></div>
      <div class="picker-list-wrapper" ref="wrapper">
        <div class="picker-list">
  
          <list class="picker-list-item">
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell v-for="(item, index) in hourState.data" :key="index" :ref="'hour'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'hour')">
                <text class="picker-text">{{item.value}}</text>
              </div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
          </list>
  
          <list style="width: 10px;">
            <cell>
              <text>:</text>
            </cell>
          </list>
  
          <list class="picker-list-item">
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell v-for="(item, index) in minuteState.data" :key="index" :ref="'minute'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'minute')">
                <text class="picker-text">{{item.value}}</text>
              </div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
          </list>
        </div>
        <div class="picker-title picker-panel">
          <text @click="pickerCancel" class="picker-control">取消</text>
          <!--<text @click="pickerCurrent" class="picker-title-txt">当前</text>-->
          <text @click="pickerOk" class="picker-control">确定</text>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
const picker = weex.requireModule('picker')
const animation = weex.requireModule('animation')
const modal = weex.requireModule('modal')
const dom = weex.requireModule('dom')
import { hour, minute, second } from './time.js'
export default {
  data() {
    return {
      value: '',
      current: {
        hour: {},
        minute: {},
        second: {}
      },
      target: '',
      hourState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      minuteState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      secondState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      }
    }
  },
  computed: {
    platform: () => {
      return weex.config.env.platform.toLowerCase() == 'web'
    }
  },
  methods: {
    pickTime() {
      if (weex.config.env.platform.toLowerCase() == 'web') {
        this.initData()
        // modal.toast({ message: true, duration: 2 })
      } else {
        picker.pickTime({
          value: this.value
        }, event => {
          if (event.result === 'success') {
            this.value = event.data
            this.$emit('pickerSelect', this.value)
          }
          if (event.result === 'cancel') {
            this.value = event.data
            this.$emit('cancel')
          }
        })
      }
    },
    initData() {
      this.hourState.data = hour;
      this.minuteState.data = minute;
      this.secondState.data = second;
      this['hourState'].data.forEach(function (item) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', parseInt(item['value']))
      })
      this['minuteState'].data.forEach(function (item) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', parseInt(item['value']))
      })
      this['secondState'].data.forEach(function (item) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', parseInt(item['value']))
      })
    },
    pickerCurrent(currentHour, currentMinute) {

      let hourel = this.$refs['hour' + currentHour][0]
      let minutel = this.$refs['minute' + currentMinute][0]

      dom.scrollToElement(hourel, { offset: -200 })
      dom.scrollToElement(minutel, { offset: -200 })

      this.current.hour = this['hourState'].data[currentHour]
      this.current.minute = this['minuteState'].data[currentMinute]
      Vue.set(this['hourState'].data[currentHour], 'current', true)
      Vue.set(this['minuteState'].data[currentMinute], 'current', true)
    },
    getSelectedData(index, target) {
      let thisData = this[target + 'State']
      thisData.data.forEach(function (item) {
        Vue.set(item, 'current', false)
      })
      Vue.set(thisData.data[index], 'current', true)
      if (target === 'hour') {
        this.current.hour = thisData.data[index]
      }
      if (target === 'minute') {
        this.current.minute = thisData.data[index]
      }
      if (target === 'second') {
        this.current.second = thisData.data[index]
      }
      this.pickerCurrent(this.current.hour['index'], this.current.minute['index'])
    },
    pickerCancel() {
      this.current.hour = {}
      this.current.minute = {}
      this.current.second = {}
      this.$emit('cancel')
    },
    pickerOk() {
      this.$emit('pickerSelect', this.current['hour']['value'] + ':' + this.current['minute']['value'])
    },
    wrapper() {
      var testEl = this.$refs.wrapper;
      animation.transition(testEl, {
        styles: {
          transform: ' translate(0px, 0px)'
        },
        duration: 200, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, function () {
        // modal.toast({ message: 'animation finished.' })
      })
    },
    cover() {
      var testEl = this.$refs.cover;
      animation.transition(testEl, {
        styles: {
          opacity: '.5'
        },
        duration: 200, //ms
        timingFunction: 'ease',
        delay: 0 //ms
      }, function () {
        // modal.toast({ message: 'animation finished.' })
      })
    }
  },
  mounted() {
    this.pickTime()
    this.wrapper()
    this.cover()
    this.$nextTick(function () {

      let currentDate = new Date()
      let currentHour = currentDate.getHours()
      let currentMinute = currentDate.getMinutes()
      this.pickerCurrent(currentHour, currentMinute)
    })
  }
}

</script>
<style scoped>
.picker-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;
  align-items: center;
  justify-content: center;
}

.picker-cover {
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 1;
}

.picker-title {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
}

.picker-title-txt {
  text-align: center;
  font-size: 30px;
  line-height: 100px;
}

.picker-control {
  padding-left: 15px;
  padding-right: 15px;
  color: #008dfc;
  font-size: 30px;
  line-height: 100px;
}

.picker-list-wrapper {
  z-index: 2;
  height: 500px;
  width: 600px;
  background-color: #fff;
  transform: translate(0px, -500px);
}

.picker-list {
  height: 500px;
  overflow-y: auto;
  flex-direction: row;
  align-items: center;
}

.picker-list-item {
  flex: 1;
  height: 500px;
}

.borderlr {
  border-right-width: 1px;
  border-left-width: 1px;
  border-color: #e5e5e5;
  border-style: solid;
}

.picker-panel {
  height: 100px;
}

.list-bg {
  background-color: #fff;
}

.picker-text {
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  color: #008dfc;
  white-space: nowrap;
}
</style>
