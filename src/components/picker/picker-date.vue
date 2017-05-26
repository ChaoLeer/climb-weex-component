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
            <cell v-for="(item, index) in yearState.data" :key="index" :ref="'year'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'year')">
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
  
          <list class="picker-list-item">
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell v-for="(item, index) in monthState.data" :key="index" :ref="'month'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'month')">
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
  
          <list class="picker-list-item">
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell>
              <div class="picker-panel"></div>
            </cell>
            <cell v-for="(item, index) in dayState.data" :key="index" :ref="'day'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'day')">
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
import { year, month, day } from './date.js'
var isSmoothYear = function (year) {
  return (new Date(year, 2, 0).getDate() == 29)
}
export default {
  data() {
    return {
      value: '',
      current: {
        year: {},
        month: {},
        day: {}
      },
      target: '',
      yearState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      monthState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      dayState: {
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
      } else {
        picker.pickDate({
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
      this.yearState.data = year;
      this.monthState.data = month;
      this.dayState.data = day;
      this['yearState'].data.forEach(function (item, index) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', index)
      })
      this['monthState'].data.forEach(function (item, index) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', index)
      })
      this['dayState'].data.forEach(function (item, index) {
        Vue.set(item, 'current', false)
        Vue.set(item, 'index', index)
      })
    },
    filterDate(info) {
      switch (info) {
        case 29:
          // 为闰年
          Vue.set(this.dayState, 'data', day.filter((item, index) => {
            return index < 29
          }))
          break;
        case 28:
          Vue.set(this.dayState, 'data', day.filter((item, index) => {
            return index < 28
          }))
          break;
        case 30:
          Vue.set(this.dayState, 'data', day.filter((item, index) => {
            return index < 30
          }))
          break;
        default:
          Vue.set(this.dayState, 'data', day)
          break;
      }
    },
    pickerCurrent(currentYear, currentMonth, currentDay) {
      // console.info('month' + currentMonth)
      let yearel = this.$refs['year' + currentYear][0]
      let monthel = this.$refs['month' + currentMonth][0]
      let dayel = this.$refs['day' + currentDay][0]

      dom.scrollToElement(yearel, { offset: -200 })
      dom.scrollToElement(monthel, { offset: -200 })
      dom.scrollToElement(dayel, { offset: -200 })
      this.current.year = this['yearState'].data[currentYear]
      this.current.month = this['monthState'].data[currentMonth]
      this.current.day = this['dayState'].data[currentDay]

      Vue.set(this['yearState'].data[currentYear], 'current', true)
      Vue.set(this['monthState'].data[currentMonth], 'current', true)
      Vue.set(this['dayState'].data[currentDay], 'current', true)
    },
    getSelectedData(index, target) {
      let thisData = this[target + 'State']
      thisData.data.forEach(function (item) {
        Vue.set(item, 'current', false)
      })
      Vue.set(thisData.data[index], 'current', true)
      if (target === 'year') {
        this.current.year = thisData.data[index]
      }
      if (target === 'month') {
        this.current.month = thisData.data[index]
      }
      if (target === 'day') {
        this.current.day = thisData.data[index]
      }
      if (this.current.month.value == '02') {
        if (isSmoothYear(this.current.year.value)) {
          this.filterDate(29)
          console.info('这个是闰年')
        } else {
          this.filterDate(28)
        }
      } else {
        if (this.current.month.value == '04' || this.current.month.value == '06' || this.current.month.value == '09' || this.current.month.value == '11') {
          this.filterDate(30)
        } else {
          this.filterDate(31)
        }
      }
      this.pickerCurrent(this.current.year['index'], this.current.month['index'], this.current.day['index'])
    },
    pickerCancel() {
      this.$emit('cancel')
      this.current.year = {}
      this.current.month = {}
      this.current.day = {}
    },
    pickerOk() {
      this.$emit('pickerSelect', this.current['year']['value'] + '-' + this.current['month']['value'] + '-' + this.current['day']['value'])
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
      let currentYear = currentDate.getFullYear()
      let currentMonth = currentDate.getMonth()
      let currentDay = currentDate.getDate()
      // console.info(currentDay)
      for (let key in year) {
        if (currentYear == year[key]['value']) {
          this.pickerCurrent(key, currentMonth, currentDay - 1)
        }
      }
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






















































































































































































































/*.bdr{
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }*/

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
  /*padding-bottom: 30px;*/
  /*padding-left: 15px;
    padding-right: 15px;*/
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
  /*border-radius: 15px;*/
}

.list-bg {
  /*border-color: #e5e5e5;
    border-bottom-width: 1px;
    border-style: solid;*/
  background-color: #fff;
  /*opacity: .5;*/
}

.picker-text {
  line-height: 100px;
  font-size: 30px;
  text-align: center;
  color: #008dfc;
  white-space: nowrap;
}
</style>
