<template>
  <div class="picker-wrapper">
    <template v-if="platform">

      <div class="picker-cover" ref="cover"></div>
      <div class="picker-list-wrapper" ref="wrapper">
        <div class="picker-list">

          <list class="picker-list-item">
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
            <cell v-for="(item, index) in yearState.data"
                                  :key="index" :ref="'year'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}" @click="getSelectedData(index, 'year')">
                <text class="picker-text">{{item.value}}</text>
              </div>
            </cell>
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
          </list>

          <list class="picker-list-item">
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
            <cell v-for="(item, index) in monthState.data"
                                  :key="index" :ref="'month'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}"  @click="getSelectedData(index, 'month')">
                <text class="picker-text">{{item.value}}</text>
              </div>
            </cell>
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
          </list>

          <list class="picker-list-item">
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
            <cell v-for="(item, index) in dayState.data"
                                  :key="index" :ref="'day'+index">
              <div class="picker-panel list-bg" :style="{marginTop: !!item.devide ? '30px':'0',opacity: item.current ? '1' : '.5'}"  @click="getSelectedData(index, 'day')">
                <text class="picker-text">{{item.value}}</text>
              </div>
            </cell>
            <cell><div class="picker-panel"></div></cell>
            <cell><div class="picker-panel"></div></cell>
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
  export default {
    data () {
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
          // modal.toast({ message: true, duration: 2 })
        } else {
          picker.pickDate({
            value: this.value
          }, event => {
            if (event.result === 'success') {
              this.value = event.data
              this.$emit('ok', this.value)
            }
          })
        }
      },
      initData(){
          this.yearState.data = year;
          this.monthState.data = month;
          this.dayState.data = day;
          // this.current.hour = this['hourState'].data[0]
          // this.current.minute = this['minuteState'].data[0]
          // this.current.second = this['secondState'].data[0]
          this['yearState'].data.forEach(function (item) {
            Vue.set(item, 'current', false)
            Vue.set(item, 'index', parseInt(item['value']))
          })
          this['monthState'].data.forEach(function (item) {
            Vue.set(item, 'current', false)
            Vue.set(item, 'index', parseInt(item['value']))
          })
          this['dayState'].data.forEach(function (item) {
            Vue.set(item, 'current', false)
            Vue.set(item, 'index', parseInt(item['value']))
          })
          // Vue.set(this['hourState'].data[0], 'current', true)

          // if (this['minuteState'].data[0]) {
          //   Vue.set(this['minuteState'].data[0], 'current', true)
          // }
          // if (this['secondState'].data[0]) {
          //   Vue.set(this['secondState'].data[0], 'current', true)
          // }
      },
      filterDate() {
        // this.dateState.data = date.filter((item, index) => {
        //   return item.parentId === this.provinceState.selectedId;
        // })
        // this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code;
        // this.cityState.translateY = 0;
        // this.cityState.index = 0;
      },
      pickerCurrent (currentYear, currentMonth) {
        
        let yearel = this.$refs['year'+currentYear][0]
        let monthel = this.$refs['monthe'+currentMonth][0]

        dom.scrollToElement(yearel, {offset: -200 })
        dom.scrollToElement(monthel, {offset: -200 })
        
        this.current.year = this['yearState'].data[currentYear]
        this.current.month = this['monthState'].data[currentMonth]
        Vue.set(this['yearState'].data[currentYear], 'current', true)
        Vue.set(this['monthState'].data[currentMonth], 'current', true)
        // this.current.second = this['secondState'].data[0]
      },
      getSelectedData(index, target){
          let thisData = this[target + 'State']
          thisData.data.forEach(function (item) {
            Vue.set(item, 'current', false)
          })
          Vue.set(thisData.data[index], 'current', true)
          if(target === 'year'){
              this.current.year = thisData.data[index]
          }
          if(target === 'month'){
              this.current.month = thisData.data[index]
          }
          if (target === 'day') {
              this.current.day = thisData.data[index]
          }
          this.pickerCurrent(this.current.year['index'], this.current.month['index'])
      },
      pickerCancel () {
        this.current.year = {}
        this.current.month = {}
        this.current.day = {}
        this.$emit('cancel')
      },
      pickerOk () {
        this.$emit('ok', this.current['year']['value']+':'+this.current['month']['value'])
      },
      wrapper () {
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
      cover () {
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
    mounted () {
      this.pickTime()
      this.wrapper()
      this.cover()
      this.$nextTick(function () {
        
        let currentDate = new Date()
        let currentYear = currentDate.getFullYear()
        let currentMonth = currentDate.getMonth()
        console.info(currentMonth)
        console.info(currentYear)
        this.pickerCurrent(currentYear, currentMonth)
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
  .picker-control{
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
  .borderlr{
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
